export type Lang='en'|'hi';
export type Pair={en:string;hi:string};
export type ScriptureDocument={ref:string;chapter:number;verse:number;en:string;hi:string;passage:string};
export type Corpus={version:number;documents:ScriptureDocument[];passages:Record<string,Pair&{start:number;end:number}>};
export type ModelManifest={version:string;dimensions:number;rows:number;documents:number;documentVectors:number;quantization:'q4';vectorScales:string;corpusSha256:string;lexicon:string;parts:string[];scales:string;vectors:string;corpus:string};
export type SearchHit={document:ScriptureDocument;explanation:Pair&{start:number;end:number};score:number;semantic:number;lexical:number};
export type ContextSignal={id:string;label:Pair};
export type QuestionContext={signals:ContextSignal[];deadline:string;constraints:string[];clauses:string[];goal:string};
export type ActionStep={text:Pair;ref:string};
export type GuidanceAnswer={kind:'guidance'|'clarify'|'support';question:string;context:QuestionContext;hits:SearchHit[];connections:Pair[];steps:ActionStep[];reflection:Pair;followup:Pair;notice?:Pair;uncertain:boolean};
const STOP=new Set(('a an the and or but if then than that this these those i me my mine we us our you your he she they them his her their it its is am are was were be been being have has had do does did will would should could can to of in on at for from with as by about into because very really just how what why when where which who any please want need feel feeling get getting also not no never'+
' मैं मुझे मेरा मेरी मेरे हम हमें हमारा हमारी आप आपका आपकी अपने वह वो वे ये यह इस उस एक और या तो कि के की का को से में पर है हैं था थी थे हो होता होती करना करते कर रहा रही रहे लिए तक भी बहुत कुछ कोई क्या कैसे क्यों कब कहाँ नहीं न बस अब').split(/\s+/));
const ALIASES:Record<string,string>={caring:'care',caregiver:'care',caregiving:'care',colleagues:'colleague',coworker:'colleague',coworkers:'colleague',studies:'study',studying:'study',exam:'exam',exams:'exam',examination:'exam',examinations:'exam',worried:'worry',anxious:'anxiety',failed:'failure',failing:'failure',lies:'lie',lying:'lie',honesty:'truth',truthful:'truth',anger:'anger',angry:'anger',praising:'praise',comparison:'compare',comparing:'compare',responsibilities:'responsibility',deadlines:'deadline',प्रेम:'love',करुणा:'compassion',दया:'compassion',क्षमा:'forgiveness',चिंता:'worry',चिन्ता:'worry',तनाव:'stress',परीक्षा:'exam',पढ़ाई:'study',नौकरी:'work',कार्यालय:'work',काम:'work',परिवार:'family',माता:'parent',पिता:'parent',मातापिता:'parent',बच्चों:'children',बच्चे:'children',क्रोध:'anger',गुस्सा:'anger',ईर्ष्या:'jealous',तुलना:'compare',सच:'truth',सत्य:'truth',झूठ:'lie',दान:'giving',सेवा:'service',ज्ञान:'knowledge',ध्यान:'attention',अभ्यास:'practice',मित्र:'friend',सफलता:'success',असफलता:'failure',कर्तव्य:'duty',जिम्मेदारी:'responsibility',नींद:'sleep',आराम:'rest',निर्णय:'decision',गुरु:'teacher',भय:'fear',डर:'fear'};
export function normalizeWords(text:string):string[]{return text.normalize('NFKC').toLocaleLowerCase().match(/[\p{L}\p{M}\p{N}]+/gu)||[];}
function terms(text:string):string[]{return normalizeWords(text).filter(w=>!STOP.has(w)&&w.length>1).map(w=>ALIASES[w]||(w.length>5&&w.endsWith('ies')?w.slice(0,-3)+'y':w.length>4&&w.endsWith('s')&&!w.endsWith('ss')?w.slice(0,-1):w));}
function dot(a:ArrayLike<number>,b:ArrayLike<number>):number{let n=0;for(let i=0;i<a.length;i++)n+=a[i]*b[i];return n;}
function unit(value:Float32Array){const norm=Math.sqrt(dot(value,value));if(norm)for(let i=0;i<value.length;i++)value[i]/=norm;return value;}
type Trie={next:Map<string,Trie>;id?:number};
export class SemanticIndex{
 readonly corpus:Corpus;
 private dims:number;
 private weights:Int8Array;
 private scales:Float32Array;
 private vectors:Float32Array;
 private trie:Trie={next:new Map()};
 private vocabulary=new Set<string>();
 private scores:number[];
 private wordCache=new Map<string,number[]>();
 private lex:Map<string,number>[];
 private lengths:number[];
 private idf=new Map<string,number>();
 private averageLength:number;
 constructor(corpus:Corpus,manifest:ModelManifest,lexicon:[string,number][],weights:Int8Array,scales:Float32Array,vectors:Float32Array){
  if(corpus.documents.length!==701||manifest.documents!==corpus.documents.length||weights.length!==manifest.rows*manifest.dimensions/2||scales.length!==manifest.rows||vectors.length!==manifest.documents*2*manifest.dimensions||lexicon.length!==manifest.rows)throw Error('Invalid guidance index');
  this.corpus=corpus;this.dims=manifest.dimensions;this.weights=weights;this.scales=scales;this.vectors=vectors;this.scores=lexicon.map(entry=>entry[1]);
  for(let id=0;id<lexicon.length;id++){const token=lexicon[id][0];this.vocabulary.add(token);let node=this.trie;for(const char of token){let next=node.next.get(char);if(!next){next={next:new Map()};node.next.set(char,next);}node=next;}node.id=id;}
  const frequency=new Map<string,number>();
  this.lex=corpus.documents.map(doc=>{const passage=corpus.passages[doc.passage];if(!passage)throw Error('Missing passage');const tf=new Map<string,number>();for(const word of terms(doc.en+' '+doc.hi+' '+passage.en+' '+passage.hi))tf.set(word,(tf.get(word)||0)+1);for(const word of tf.keys())frequency.set(word,(frequency.get(word)||0)+1);return tf;});
  this.lengths=this.lex.map(tf=>[...tf.values()].reduce((n,count)=>n+count,0));this.averageLength=this.lengths.reduce((a,b)=>a+b,0)/this.lengths.length;
  for(const [word,count] of frequency)this.idf.set(word,Math.log(1+(this.lex.length-count+.5)/(count+.5)));
 }
 private wordIds(word:string):number[]{
  const cached=this.wordCache.get(word);if(cached)return cached;
  const value='▁'+word;const size=value.length;const best=new Float64Array(size+1).fill(-Infinity);best[0]=0;const back=new Int32Array(size+1).fill(-1);const ids=new Int32Array(size+1).fill(-1);
  for(let start=0;start<size;start++){if(best[start]===-Infinity)continue;let node=this.trie;let found=false;for(let end=start;end<size;end++){const next=node.next.get(value[end]);if(!next)break;node=next;if(node.id!==undefined){found=true;const score=best[start]+this.scores[node.id];if(score>best[end+1]){best[end+1]=score;back[end+1]=start;ids[end+1]=node.id;}}}if(!found&&best[start]-30>best[start+1]){best[start+1]=best[start]-30;back[start+1]=start;ids[start+1]=-1;}}
  const result:number[]=[];let at=size;while(at>0&&back[at]>=0){if(ids[at]>=0)result.push(ids[at]);at=back[at];}result.reverse();if(this.wordCache.size>2048)this.wordCache.clear();this.wordCache.set(word,result);return result;
 }
 encode(text:string):Float32Array{
  const result=new Float32Array(this.dims);let count=0;
  for(const word of normalizeWords(text))for(const id of this.wordIds(word)){const scale=this.scales[id];for(let col=0;col<this.dims;col++)result[col]+=((((this.weights[id*this.dims/2+(col>>1)]&255)>>((col&1)*4))&15)-7)*scale;count++;}
  if(count)for(let col=0;col<this.dims;col++)result[col]/=count;return unit(result);
 }
 private vector(index:number,language=0){return this.vectors.subarray((index*2+language)*this.dims,(index*2+language+1)*this.dims);}
 search(question:string,limit=3):SearchHit[]{
  const cleaned=question.trim().slice(0,4000);const language=(cleaned.match(/[\u0900-\u097f]/g)||[]).length>(cleaned.match(/[a-z]/gi)||[]).length?1:0;const q=this.encode(cleaned);const content=[...new Set(terms(cleaned))];const context=analyseQuestion(cleaned);
  const clauses=context.clauses.filter(x=>terms(x).length>=2).slice(0,5).map(x=>this.encode(x));
  const references=explicitReferences(cleaned);const reference=references[0]||null;
  const intents=expandedIntents(context);const intentVectors=intents.map(text=>this.encode(text));const expanded=[...new Set(intents.flatMap(terms))].filter(word=>!content.includes(word));
  const raw=this.corpus.documents.map((document,index)=>{
   let lexical=0;const tf=this.lex[index];for(const term of content){const count=tf.get(term)||0;if(count)lexical+=(this.idf.get(term)||0)*(count*2.2)/(count+1.2*(.25+.75*this.lengths[index]/this.averageLength));}
   for(const term of expanded){const count=tf.get(term)||0;if(count)lexical+=.7*(this.idf.get(term)||0)*(count*2.2)/(count+1.2*(.25+.75*this.lengths[index]/this.averageLength));}
   const vec=this.vector(index,language);const english=this.vector(index,0);const full=dot(q,vec);const part=clauses.length?Math.max(...clauses.map(c=>dot(c,vec))):full;const intent=intentVectors.length?Math.max(...intentVectors.map(c=>dot(c,english))):full;const semantic=intentVectors.length?.25*full+.10*part+.65*intent:.75*full+.25*part;
   let score=.82*semantic+.18*(lexical/(lexical+5));
   if(references.includes(document.ref))score+=2;
   const violent=/\b(?:slay|slain|kill|killed|killing|battle|warrior|weapons|blood|destroy them)\b/i.test(document.en);
   const morbid=/\b(?:death|dying|die|dead|heaven)\b|leaves? (?:the |his )?body/i.test(document.en);
   if(!reference&&(document.chapter===1||document.chapter===11))score-=.16;
   if(!reference&&(violent||(morbid&&!context.signals.some(x=>x.id==='grief'))))score-=.45;
   return {document,index,score,semantic,lexical,explanation:this.corpus.passages[document.passage]};
  }).sort((a,b)=>b.score-a.score);
  if(reference){const exact=references.map(ref=>raw.find(x=>x.document.ref===ref)).filter((x):x is (typeof raw)[number]=>Boolean(x));if(exact.length)return exact.map(({document,explanation,score,semantic,lexical})=>({document,explanation,score,semantic,lexical}));}
  const picks:typeof raw=[];const passages=new Set<string>();
  while(picks.length<limit){let chosen:(typeof raw)[number]|undefined;let best=-Infinity;
   for(const candidate of raw.slice(0,100)){if(passages.has(candidate.document.passage))continue;const similarity=picks.length?Math.max(...picks.map(p=>dot(this.vector(candidate.index,language),this.vector(p.index,language)))):0;let value=candidate.score-.12*similarity;
    if(picks.length&&clauses.length){const newCoverage=Math.max(...clauses.map(c=>dot(c,this.vector(candidate.index,language))-Math.max(...picks.map(p=>dot(c,this.vector(p.index,language))))));value+=.10*Math.max(0,newCoverage);}
    if(value>best){best=value;chosen=candidate;}}
   if(!chosen)break;picks.push(chosen);passages.add(chosen.document.passage);
  }
  return picks.map(({document,explanation,score,semantic,lexical})=>({document,explanation,score,semantic,lexical}));
 }
}

function explicitReferences(text:string):string[]{
 const normalized=text.replace(/[०-९]/g,c=>String(c.charCodeAt(0)-0x966));
 const matches=[...normalized.matchAll(/(\d{1,2})[.:/](\d{1,2})/g)];
 if(matches.length===0)return [];
 if(matches.length===1&&!/\b(?:gita|bg|verse|shloka)\b|गीता|श्लोक/i.test(normalized)&&!/^\s*\d{1,2}[.:/]\d{1,2}\s*$/.test(normalized))return [];
 const counts=[47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];
 return [...new Set(matches.filter(m=>Number(m[1])>=1&&Number(m[1])<=18&&Number(m[2])>=1&&Number(m[2])<=counts[Number(m[1])-1]).map(m=>Number(m[1])+'.'+Number(m[2])))].slice(0,4);
}
function explicitReference(text:string):string|null{return explicitReferences(text)[0]||null;}
const SIGNALS:{id:string;pattern:RegExp;label:Pair}[]=[
 {id:'leadership',pattern:/\b(?:leadership|lead a team|leading a team|role model|set an example|lead by example)\b|नेतृत्व|उदाहरण|टीम का/,label:{en:'Leading through your example',hi:'अपने आचरण से नेतृत्व'}},
 {id:'exam',pattern:/\b(?:exam|examination|studying|study|student|revision|marks|grades)\b|परीक्षा|पढ़ाई|विद्यार्थी|अंक/,label:{en:'Study or an upcoming exam',hi:'पढ़ाई या आने वाली परीक्षा'}},
 {id:'credit',pattern:/takes? credit|taking credit|steals? (?:my |the )?work|stole (?:my |the )?work|recognition|श्रेय|काम का नाम/,label:{en:'Recognition for your contribution',hi:'आपके योगदान को मान्यता'}},
 {id:'work',pattern:/\b(?:boss|manager|colleague|coworker|work|job|office|promotion|employee|career|deadline)\b|नौकरी|कार्यालय|काम|करियर|सहकर्मी|पदोन्नति/,label:{en:'Work and its expectations',hi:'काम और उससे जुड़ी अपेक्षाएँ'}},
 {id:'care',pattern:/\b(?:caregiver|caregiving|caring for|care for|look after|looking after|raising children)\b|देखभाल|सँभाल|संभाल/,label:{en:'Caring responsibilities',hi:'देखभाल की जिम्मेदारियाँ'}},
 {id:'family',pattern:/\b(?:parents?|children|child|mother|father|wife|husband|spouse|partner|family|home|marriage)\b|माता|पिता|बच्च|पति|पत्नी|परिवार|घर|रिश्त/,label:{en:'Family or a close relationship',hi:'परिवार या आत्मीय सम्बन्ध'}},
 {id:'distraction',pattern:/\b(?:scrolling|scroll|doomscroll|phone|distracted|distraction|procrastinat\w*|social media)\b|मोबाइल|फोन|भटक|टालमटोल/,label:{en:'Attention getting pulled away',hi:'बार-बार भटकता ध्यान'}},
 {id:'exhaustion',pattern:/\b(?:exhausted|exhaustion|burnout|burned out|burnt out|tired|no time|overwhelmed|overwork|sleep)\b|थक|समय नहीं|नींद|बोझ/,label:{en:'Limited energy or time',hi:'सीमित समय या ऊर्जा'}},
 {id:'grief',pattern:/\b(?:grief|grieving|died|death|bereave\w*|funeral|passed away|lost my (?:mother|father|child|partner|friend|wife|husband))\b|मृत्यु|निधन|शोक|गुज़र|गुजर/,label:{en:'Loss and grief',hi:'वियोग और शोक'}},
 {id:'decision',pattern:/\b(?:decid\w*|decision|choose|choice|weigh my options|quit|leave my job|change career)\b|निर्णय|चुन|फैसला|छोड़ूँ|छोड़ूं/,label:{en:'A decision to make',hi:'सामने खड़ा एक निर्णय'}},
 {id:'integrity',pattern:/\b(?:lie|lying|lies|cheat\w*|dishonest|honest|fraud|falsif\w*|ethical|bribe|integrity)\b|झूठ|बेईमान|ईमान|धोख|रिश्वत|सच|सत्य/,label:{en:'Honesty and values',hi:'ईमानदारी और मूल्य'}},
 {id:'comparison',pattern:/\b(?:compar\w*|jealous|envy|inferior|not good enough|worthless|self.worth)\b|तुलना|ईर्ष्या|हीन|बेकार|आत्मसम्मान/,label:{en:'Comparison or self-worth',hi:'तुलना या आत्मसम्मान'}},
 {id:'speech',pattern:/\b(?:conversation|talk|speak|argument|argu\w*|critic\w*|feedback|listen|shout|angry|anger)\b|बात|बोल|बहस|क्रोध|गुस्सा|आलोचना/,label:{en:'A difficult conversation or emotion',hi:'कठिन संवाद या भावना'}},
 {id:'learning',pattern:/\b(?:teacher|mentor|learning from|learn from|knowledge|spiritual study)\b|गुरु|शिक्षक|विद्या/,label:{en:'Learning and asking for help',hi:'सीखना और सहायता माँगना'}},
 {id:'giving',pattern:/\b(?:donat\w*|charity|charitable|volunteer\w*|give back|giving back|give without|giving without|giving to|help others)\b|दान|सेवा|मदद/,label:{en:'Giving or serving others',hi:'दान या दूसरों की सेवा'}}
];
export function analyseQuestion(question:string,goal=''):QuestionContext{
 const normalized=question.normalize('NFKC').toLocaleLowerCase().replace(/\b(?:i am not|i'm not|not feeling|no longer)\s+(?:worried|anxious|angry|jealous|tired)\b/g,'');
 const signals=SIGNALS.filter(s=>s.pattern.test(normalized)).map(({id,label})=>({id,label}));
 const deadline=question.match(/\b(?:in|within|before|by)\s+(?:(?:one|two|three|four|five|six|seven|eight|nine|ten|a|\d+)\s+(?:days?|weeks?|hours?|months?)|(?:next\s+)?(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b|\b(?:tomorrow|tonight|today|next week)\b|(?:अगले|आने वाले|केवल|सिर्फ)?\s*(?:[०-९\d]+|एक|दो|तीन|चार|पाँच|पांच|छह|सात|आठ|नौ|दस)\s*(?:दिन|हफ्ते|सप्ताह|घंटे)|कल|आज/i)?.[0]?.trim()||'';
 const constraints:string[]=[];
 if(/\b(?:cannot|can't|can not|unable to)\s+(?:afford|quit|leave|stop working)|नौकरी.*नहीं.*छोड़|पैसे.*नहीं|आर्थिक.*मजबूर/i.test(question))constraints.push('income');
 if(/\bno time|little time|limited time|too busy|समय नहीं|समय की कमी/i.test(question))constraints.push('time');
 if(/\b(?:cannot|can't)\s+(?:talk|speak|confront)|unsafe|not safe|डर.*बात|सुरक्षित नहीं/i.test(question))constraints.push('safety');
 const clauses=question.split(/[.!?;\n]+|\b(?:but|yet|however|because|while)\b|लेकिन|परन्तु|क्योंकि|मगर/i).map(x=>x.trim()).filter(x=>terms(x).length>=2);
 return {signals,deadline,constraints,clauses:clauses.length?clauses:[question],goal};
}
export function immediateSupport(question:string):Pair|null{
 const value=question.toLocaleLowerCase().replace(/\b(?:not suicidal|not thinking of suicide)\b/g,'');
 if(/\b(?:kill myself|end my life|hurt myself|self.harm|suicid\w*|want to die|ending it all)\b|आत्महत्या|खुद को.*(?:मार|नुकसान)|जीना नहीं चाहता|जीना नहीं चाहती/.test(value))
 return {en:'Your safety matters more than finding the right verse. If you may act on these thoughts or are in immediate danger, contact local emergency services or go to the nearest emergency department. Tell someone you trust what is happening and, if possible, stay with them. You do not have to handle this alone.',hi:'इस समय आपकी सुरक्षा सबसे महत्त्वपूर्ण है। यदि खुद को नुकसान पहुँचाने की आशंका है या तत्काल खतरा है, तो स्थानीय आपात सेवा या निकटतम अस्पताल से सहायता लें। किसी विश्वसनीय व्यक्ति को अपनी स्थिति बताएँ और सम्भव हो तो उनके साथ रहें। यह अकेले सँभालना आवश्यक नहीं है।'};
 if(/\b(?:hits? me|beating me|beats me|threaten\w* (?:to kill|me)|abuses me|domestic violence|not safe at home|violent partner)\b|(?:पति|पत्नी|साथी).*(?:पीट|मारता|मारती|धमकी)|घरेलू हिंसा/.test(value))
 return {en:'You deserve safety and support. If danger is immediate, contact local emergency services. If it is safe, reach out privately to someone you trust or a local support service, and consider a safer place to stay. You are not required to confront the person, forgive them, or remain in danger to fulfil a spiritual duty.',hi:'आप सुरक्षा और सहायता के अधिकारी हैं। तत्काल खतरे में स्थानीय आपात सेवा से सम्पर्क करें। सुरक्षित हो तो किसी विश्वसनीय व्यक्ति या स्थानीय सहायता सेवा से निजी रूप से बात करें और सुरक्षित स्थान पर जाने पर विचार करें। आध्यात्मिक कर्तव्य के नाम पर सामना करना, क्षमा करना या खतरे में रहना अनिवार्य नहीं है।'};
 if(/\b(?:i will kill|i want to kill|want to hurt someone|going to hurt someone)\b|उसे मार दूँ|उसे मार दूं/.test(value))
 return {en:'Pause before acting. Put distance between yourself, the other person, and anything that could cause harm. Contact a trusted person or local emergency services if someone may be in danger. A passage about duty or courage is not permission to hurt someone.',hi:'कर्म करने से पहले रुकें। अपने, सामने वाले और नुकसान पहुँचा सकने वाली वस्तुओं के बीच दूरी बनाएँ। किसी को खतरा हो तो विश्वसनीय व्यक्ति या स्थानीय आपात सेवा से सहायता लें। कर्तव्य या साहस का कोई श्लोक किसी को हानि पहुँचाने की अनुमति नहीं देता।'};
 if(/\b(?:chest pain|heart attack|cannot breathe|can't breathe|unconscious|severe bleeding)\b|सीने में.*दर्द|साँस नहीं|सांस नहीं|बेहोश/.test(value))
 return {en:'This could need urgent medical attention. Contact local emergency services or seek emergency care now, especially if symptoms are severe or new. Spiritual reflection can wait while you get practical medical help.',hi:'इसमें तत्काल चिकित्सकीय सहायता की आवश्यकता हो सकती है। विशेषकर लक्षण नए या गम्भीर हों तो स्थानीय आपात सेवा या अस्पताल से अभी सहायता लें। पहले आवश्यक उपचार और सुरक्षा को प्राथमिकता दें।'};
 return null;
}

const INTENTS:Record<string,string>={
exam:'steady effort in study practice without attachment to success failure and results',
credit:'truthful helpful speech communicating fairly about contribution recognition and honesty without hostility',
distraction:'return wandering attention gently through repeated practice and discipline',
exhaustion:'moderation in activity food sleep recreation and rest sustainable balance without extreme deprivation',
care:'compassion for others and oneself sustainable responsibilities moderation and balanced daily activity',
integrity:'truthfulness honesty integrity ethical conduct avoiding greed vanity deception and selfish motives',
comparison:'own responsibilities instead of imitation self kindness equal worth beyond success and failure',
speech:'truthful beneficial considerate speech calm before anger harms judgment and listening with compassion',
learning:'humility sincere questions learning from a teacher seeking understanding and guidance',
giving:'giving charity without expecting repayment or reward and respecting the recipient',
decision:'reflect fully on options and values then freely choose and learn through skill in action',
leadership:'people learn from the conduct and example of leaders who act for the welfare of others',
grief:'grief changing experiences patience self kindness support without denying pain'
};
function expandedIntents(context:QuestionContext):string[]{return context.signals.filter(s=>INTENTS[s.id]).map(s=>INTENTS[s.id]);}

type Principle={id:string;label:Pair};
function principle(hit:SearchHit):Principle{
 const note=hit.explanation.en.toLowerCase();
 const definitions:{id:string;pattern:RegExp;label:Pair}[]=[
 {id:'balance',pattern:/moderation|balance in food|food.*sleep|extreme deprivation|sustainable/,label:{en:'sustainable balance and rest',hi:'टिकाऊ संतुलन और विश्राम'}},
 {id:'speech',pattern:/speech|communication|communicat|how.*said|truthful.*beneficial/,label:{en:'truthful, considerate communication',hi:'सत्य और संवेदनशील संवाद'}},
 {id:'giving',pattern:/giving|recipient|repayment|gift|reciprocity|giving and receiving/,label:{en:'giving with respect and reciprocity',hi:'सम्मान और सहयोग के साथ देना'}},
 {id:'integrity',pattern:/truthfulness|ethical limits|arrogance.*harsh|self-interest|vanity/,label:{en:'acting consistently with your values',hi:'अपने मूल्यों के अनुसार कर्म'}},
 {id:'attention',pattern:/attention wanders|return.*attention|wandering|return it|collected attention|scattered/,label:{en:'returning attention through practice',hi:'अभ्यास से ध्यान को लौटाना'}},
 {id:'learning',pattern:/sincere questions|learning calls|asks to learn|seeking understanding|learning from others|inquiry and practice/,label:{en:'learning through questions and support',hi:'प्रश्न और सहयोग से सीखना'}},
 {id:'leadership',pattern:/learn from the conduct|example and thoughtful guidance|those they respect/,label:{en:'guiding others by your example',hi:'अपने उदाहरण से मार्गदर्शन'}},
 {id:'effort',pattern:/responsibility lies|outcome|wholehearted effort|results|success and failure|reward/,label:{en:'careful effort without owning the outcome',hi:'परिणाम के आग्रह बिना सजग प्रयास'}},
 {id:'compassion',pattern:/compassion|empathy|equal vision|friend.*oneself|self-kindness|self.kindness|friendly|friendliness/,label:{en:'care for others and yourself',hi:'दूसरों और अपने प्रति करुणा'}},
 {id:'anger',pattern:/anger|craving|desire.*judgment|escalation/,label:{en:'pausing before an impulse becomes action',hi:'आवेग के कर्म बनने से पहले ठहरना'}},
 {id:'choice',pattern:/reflect.*choose|considered choice|decision|discern|intelligence|judgment/,label:{en:'making a considered choice',hi:'विचारपूर्वक निर्णय'}},
 {id:'grief',pattern:/grief|death|pain|changing experiences|self.*body|bodily stages/,label:{en:'patience amid difficult change',hi:'कठिन परिवर्तन में धैर्य'}},
 {id:'practice',pattern:/practice|discipline|starting points|beginner|devotion|dedicated/,label:{en:'one sincere, repeatable practice',hi:'एक सच्चा और दोहराने योग्य अभ्यास'}}
 ];
 return definitions.find(item=>item.pattern.test(note))||{id:'perspective',label:{en:'a wider view of your responsibility',hi:'अपने दायित्व की व्यापक दृष्टि'}};
}
function has(context:QuestionContext,id:string){return context.signals.some(signal=>signal.id===id);}
function nextStep(lens:Principle,context:QuestionContext,ref:string):ActionStep{
 const deadline=context.deadline;
 let text:Pair;
 switch(lens.id){
 case 'balance':
  text=has(context,'care')?{en:'Choose one caring task that could be shared, shortened, or postponed today. Ask for a specific piece of help, and protect a small meal or rest break for yourself as well.',hi:'देखभाल का एक काम चुनें जिसे आज बाँटा, छोटा या स्थगित किया जा सके। एक स्पष्ट मदद माँगें और अपने भोजन या थोड़े विश्राम के लिए भी समय सुरक्षित रखें।'}:{en:'Choose one boundary around work or study today: a stopping time, a proper meal, or a short rest. Make the plan fit your actual energy instead of demanding an ideal day.',hi:'आज काम या पढ़ाई की एक सीमा तय करें—समाप्ति का समय, ठीक से भोजन या छोटा विश्राम। योजना अपनी वास्तविक ऊर्जा के अनुसार रखें, आदर्श दिन की माँग न करें।'};break;
 case 'speech':
  text=has(context,'credit')?{en:'Keep a brief, factual record of your contribution. If it is safe, ask privately how that contribution will be acknowledged, using a specific example and a clear request instead of a public accusation.',hi:'अपने योगदान का संक्षिप्त और तथ्यपूर्ण विवरण रखें। सुरक्षित हो तो निजी रूप से पूछें कि योगदान को मान्यता कैसे दी जाएगी। सार्वजनिक आरोप के बजाय स्पष्ट उदाहरण और अनुरोध रखें।'}:{en:'Prepare one sentence describing what happened, one sentence naming your need, and one respectful request. Choose a calm, safe time to speak; you do not have to settle everything in one conversation.',hi:'जो हुआ उसके लिए एक वाक्य, अपनी आवश्यकता के लिए एक वाक्य और एक सम्मानपूर्ण अनुरोध तैयार करें। बात करने का शान्त और सुरक्षित समय चुनें; सब कुछ एक ही बातचीत में सुलझाना आवश्यक नहीं है।'};break;
 case 'integrity':
  text=has(context,'integrity')?{en:'Name the part of the request that conflicts with your values, and look for an honest alternative. If your job or income is at stake, seek confidential, appropriate support before a difficult response; do not assume you must resign immediately.',hi:'अनुरोध का वह हिस्सा पहचानें जो आपके मूल्यों से टकराता है और ईमानदार विकल्प खोजें। नौकरी या आय का प्रश्न हो तो कठिन उत्तर देने से पहले उचित, गोपनीय सहायता लें; तुरन्त नौकरी छोड़ना ही एकमात्र रास्ता न मानें।'}:{en:'Before acting, write down the value you want your response to protect—honesty, fairness, care, or dignity. Choose a small action consistent with it, even if you cannot control how others respond.',hi:'कर्म से पहले लिखें कि आपकी प्रतिक्रिया किस मूल्य की रक्षा करे—ईमानदारी, निष्पक्षता, करुणा या गरिमा। दूसरों का उत्तर नियंत्रित न कर सकें, तब भी उस मूल्य के अनुरूप छोटा कदम चुनें।'};break;
 case 'attention':
  text=has(context,'exam')?{en:(deadline?'You mentioned “'+deadline+'”. ':'')+'Use your next study session for one small practice block. Put the phone out of reach, choose a single question or weak topic, and return to it when attention wanders. Review the effort you completed, not only the mark you hope for.',hi:(deadline?'आपने “'+deadline+'” का समय बताया है। ':'')+'अगले छोटे अध्ययन-अवधि में फोन दूर रखें और एक प्रश्न या कमजोर विषय चुनें। ध्यान भटके तो उसी पर लौटें। केवल अपेक्षित अंक नहीं, पूरा हुआ अभ्यास देखें।'}:{en:'Choose one task for the next ten minutes and put one distraction out of reach. Each time the mind wanders, return to the task without turning the lapse into a judgment about your character.',hi:'अगले दस मिनट के लिए एक काम चुनें और एक भटकाव दूर रखें। मन भटके तो काम पर लौटें; हर चूक को अपने चरित्र का फैसला न बनाएँ।'};break;
 case 'learning':
  text={en:'Write one precise question you do not yet understand. Ask a teacher, mentor, or trusted person for help with that question, and use what you learn in one small attempt of your own.',hi:'जिस बात की समझ अभी नहीं है, उसका एक स्पष्ट प्रश्न लिखें। शिक्षक, मार्गदर्शक या विश्वसनीय व्यक्ति से उसी पर सहायता माँगें, फिर मिली समझ को एक छोटे प्रयास में अपनाएँ।'};break;
 case 'leadership':
  text={en:'Pick one behaviour you want from the group and demonstrate it yourself first. Explain its purpose, listen to a practical obstacle someone raises, and agree on a small shared expectation instead of relying only on pressure.',hi:'समूह में जो आचरण चाहते हैं, उसे पहले स्वयं दिखाएँ। उसका उद्देश्य समझाएँ, किसी की व्यावहारिक कठिनाई सुनें और केवल दबाव डालने के बजाय एक छोटी साझा अपेक्षा तय करें।'};break;
 case 'giving':
  text=has(context,'credit')?{en:'Ask for a fair way to make individual contributions visible, such as naming owners in a shared update. Recognise others’ work accurately while asking that yours is also acknowledged.',hi:'व्यक्तिगत योगदान स्पष्ट करने का निष्पक्ष तरीका माँगें, जैसे साझा विवरण में काम करने वाले का नाम। दूसरों के काम को सही मान्यता दें और अपने योगदान की मान्यता भी स्पष्ट माँगें।'}:has(context,'care')?{en:'Make the exchange of help visible: list one thing you provide and one thing you need. Ask for a manageable contribution from someone else, while recognising that receiving support is also part of caring.',hi:'सहयोग को स्पष्ट करें—एक काम लिखें जो आप करते हैं और एक सहायता जो आपको चाहिए। किसी और से सम्भव योगदान माँगें; सहायता लेना भी देखभाल का भाग है।'}:{en:'Before giving, consider the recipient’s actual need and your own capacity. Offer something useful and respectful without making praise, repayment, or agreement a condition of the gift.',hi:'देने से पहले पाने वाले की वास्तविक आवश्यकता और अपनी क्षमता देखें। प्रशंसा, प्रतिफल या सहमति की शर्त लगाए बिना उपयोगी और सम्मानपूर्ण सहायता दें।'};break;
 case 'effort':
  text=has(context,'exam')?{en:'Separate preparation from the final result. Choose one topic to practise and one realistic target for today'+(deadline?', taking your deadline '+deadline+' into account':'')+'. At the end, review what you attempted and what needs another pass.',hi:'तैयारी और अन्तिम परिणाम को अलग रखें। आज अभ्यास का एक विषय और वास्तविक लक्ष्य चुनें'+(deadline?'—आपने “'+deadline+'” की समय-सीमा बताई है':'')+'। अन्त में देखें कि क्या किया और किसे दोहराना है।'}:{en:'Separate the response you can choose from the outcome you cannot guarantee. '+(context.constraints.includes('income')?'Keep your need for income in the plan; choose a reversible step before a major change.':'Choose one useful action and a realistic limit for it today.')+' Review your effort without making someone else’s reaction the only measure.',hi:'अपनी चुनी जा सकने वाली प्रतिक्रिया और अनिश्चित परिणाम को अलग रखें। '+(context.constraints.includes('income')?'आय की आवश्यकता को योजना में रखें; बड़े बदलाव से पहले छोटा, बदला जा सकने वाला कदम चुनें।':'आज एक उपयोगी काम और उसकी वास्तविक सीमा तय करें।')+'केवल दूसरों की प्रतिक्रिया को अपने प्रयास का माप न बनाएँ।'};break;
 case 'compassion':
  text=has(context,'comparison')?{en:'Name one comparison that is hurting you and one important difference in circumstances it ignores. Set your next step by your values and progress, rather than another person’s timetable.',hi:'कष्ट देने वाली एक तुलना और उसमें छूटी परिस्थिति का एक अन्तर पहचानें। अगला कदम दूसरे की समय-रेखा के बजाय अपने मूल्यों और प्रगति से तय करें।'}:{en:'Consider both the other person’s needs and your own. Choose one kind action that does not require ignoring a real limit, and say clearly where you need help or space.',hi:'सामने वाले और अपनी, दोनों की आवश्यकताएँ देखें। एक ऐसा करुणापूर्ण काम चुनें जिसमें अपनी वास्तविक सीमा नकारनी न पड़े, और जहाँ मदद या स्थान चाहिए उसे स्पष्ट कहें।'};break;
 case 'anger':
  text={en:'Pause before sending a message or making a decision while upset. Name the hurt, desire, or expectation underneath the impulse, then choose a response you would still respect when calmer.',hi:'व्याकुल अवस्था में सन्देश भेजने या निर्णय लेने से पहले रुकें। आवेग के पीछे की चोट, इच्छा या अपेक्षा पहचानें, फिर ऐसा उत्तर चुनें जिसका शान्त होने पर भी सम्मान कर सकें।'};break;
 case 'choice':
  text={en:'Write your real options, one value each protects, and one cost or constraint each carries. Start with a small, reversible step where possible, and review new information before committing further.',hi:'अपने वास्तविक विकल्प, हर विकल्प से सुरक्षित होने वाला मूल्य और उसका एक खर्च या बन्धन लिखें। सम्भव हो तो छोटे, बदले जा सकने वाले कदम से शुरू करें और आगे बढ़ने से पहले नई जानकारी देखें।'};break;
 case 'grief':
  text={en:'Let the difficult feeling be present without demanding an immediate lesson from it. Choose one basic act of care today and tell a trusted person what kind of support would help.',hi:'कठिन भावना को स्वीकारें; उससे तुरन्त कोई सीख निकालने की माँग न करें। आज देखभाल का एक सरल काम चुनें और किसी विश्वसनीय व्यक्ति को बताएँ कि कैसी सहायता उपयोगी होगी।'};break;
 case 'practice':
  text=has(context,'credit')?{en:'Before the conversation, take a short pause and choose one factual example and one clear request. Rehearse the words once, so fear does not have to decide the whole response.',hi:'बातचीत से पहले थोड़ा ठहरें और एक तथ्यपूर्ण उदाहरण तथा एक स्पष्ट अनुरोध चुनें। शब्दों का एक बार अभ्यास करें, ताकि पूरी प्रतिक्रिया भय से तय न हो।'}:has(context,'exam')?{en:'Choose a study routine small enough to repeat even on a difficult day. After one attempt, adjust the routine instead of abandoning it because the first session was imperfect.',hi:'पढ़ाई का इतना छोटा अभ्यास चुनें जो कठिन दिन में भी दोहराया जा सके। पहले प्रयास के बाद उसे सुधारें; एक अपूर्ण सत्र के कारण पूरा अभ्यास न छोड़ें।'}:{en:'Choose one modest practice you can repeat within your present responsibilities. Notice what it teaches you after a few attempts, and adjust the practice without demanding immediate perfection.',hi:'अपने वर्तमान दायित्वों के भीतर दोहराया जा सकने वाला छोटा अभ्यास चुनें। कुछ प्रयासों के बाद मिली सीख देखें और तुरन्त पूर्णता की माँग किए बिना अभ्यास सुधारें।'};break;
 default:
  text={en:'Read this passage beside your question and identify one assumption it asks you to examine. Write one action you can take today, and one uncertainty you need more information or human support to resolve.',hi:'अपने प्रश्न के साथ यह प्रसंग पढ़ें और एक मान्यता पहचानें जिस पर फिर विचार करना चाहिए। आज किया जा सकने वाला एक काम और अधिक जानकारी या मानवीय सहायता माँगने वाली एक अनिश्चितता लिखें।'};
 }
 return {text,ref};
}
function followupFor(context:QuestionContext):Pair{
 if(has(context,'exam')&&!context.deadline)return {en:'When is the exam, and which part of preparing feels hardest right now?',hi:'परीक्षा कब है और तैयारी का कौन-सा हिस्सा अभी सबसे कठिन लग रहा है?'};
 if(has(context,'credit'))return {en:'What recognition are you hoping for, and what makes speaking about it difficult?',hi:'आप किस तरह की मान्यता चाहते हैं और उसके बारे में बोलना किस कारण कठिन है?'};
 if(has(context,'care'))return {en:'Which responsibility is hardest to carry, and what help or rest is realistically available?',hi:'कौन-सी जिम्मेदारी सबसे कठिन लग रही है और वास्तव में कैसी सहायता या विश्राम सम्भव है?'};
 if(has(context,'integrity'))return {en:'What response are you considering, and what practical constraint matters most?',hi:'आप किस उत्तर पर विचार कर रहे हैं और कौन-सी व्यावहारिक सीमा सबसे महत्त्वपूर्ण है?'};
 if(has(context,'decision'))return {en:'What are the options, and which responsibility or value do you most want to protect?',hi:'विकल्प क्या हैं और किस जिम्मेदारी या मूल्य की रक्षा आपके लिए सबसे आवश्यक है?'};
 return {en:'What happened most recently, and what decision or change would you like help with?',hi:'सबसे हाल में क्या हुआ और किस निर्णय या बदलाव में आप सहायता चाहते हैं?'};
}
function reflectionFor(context:QuestionContext,hits:SearchHit[]):Pair{
 if(has(context,'credit'))return {en:'What fair recognition can I ask for clearly, and what part of my response is within my control?',hi:'मैं किस उचित मान्यता के लिए स्पष्ट अनुरोध कर सकता/सकती हूँ, और अपनी प्रतिक्रिया में क्या मेरे नियन्त्रण में है?'};
 if(has(context,'care'))return {en:'What can be shared or reduced today so that care includes me as well?',hi:'आज क्या बाँटा या कम किया जा सकता है ताकि देखभाल में मैं भी शामिल रहूँ?'};
 if(has(context,'exam'))return {en:'What is one useful practice I can complete before my next study break, without waiting to feel perfectly ready?',hi:'पूरी तरह तैयार महसूस करने की प्रतीक्षा किए बिना अगले विश्राम से पहले मैं कौन-सा उपयोगी अभ्यास पूरा कर सकता/सकती हूँ?'};
 if(has(context,'integrity'))return {en:'What response protects my values while taking my real constraints seriously?',hi:'कौन-सा उत्तर मेरी वास्तविक सीमाओं को ध्यान में रखते हुए मेरे मूल्यों की रक्षा करता है?'};
 return {en:'What would change in my next action if I took the perspective of shloka '+(hits[0]?.document.ref||'this passage')+' seriously?',hi:'श्लोक '+(hits[0]?.document.ref||'इस प्रसंग')+' की दृष्टि को ध्यान में रखूँ तो मेरे अगले कर्म में क्या बदलेगा?'};
}
export function earlyAnswer(question:string):GuidanceAnswer|null{
 const context=analyseQuestion(question);const support=immediateSupport(question);
 const empty={question,context,hits:[],connections:[],steps:[],reflection:{en:'',hi:''},followup:followupFor(context),uncertain:true};
 if(support)return {...empty,kind:'support',notice:support};
 const technical=/\b(?:install|printer|javascript|typescript|stack trace|syntax error|weather forecast|stock price|flight number)\b|प्रिंटर|कोड की त्रुटि/i.test(question);
 if(terms(question).length<2||(technical&&!context.signals.some(s=>['speech','exhaustion','credit','family','care'].includes(s.id))))return {...empty,kind:'clarify',notice:{en:'A little more context would help. Describe the situation, the decision you face, or the feeling you want to work through. I can connect that concern with relevant passages from the Gita.',hi:'थोड़ा और सन्दर्भ उपयोगी होगा। परिस्थिति, सामने के निर्णय या जिस भावना को समझना चाहते हैं उसे बताएँ। उस चिन्ता से जुड़े गीता के प्रसंग खोजे जा सकते हैं।'}};
 return null;
}
export function answerQuestion(index:SemanticIndex,question:string,goal=''):GuidanceAnswer{
 const early=earlyAnswer(question);if(early)return early;
 const context=analyseQuestion(question,goal);const hits=index.search(question);
 const first=hits[0];const uncertain=!explicitReference(question)&&(!first||first.score<.39||first.semantic<.31);
 if(!first||first.score<.26)return {kind:'clarify',question,context,hits:[],connections:[],steps:[],reflection:{en:'',hi:''},followup:followupFor(context),notice:{en:'I do not have a clear enough connection yet. What is happening, and what would you like to handle differently?',hi:'अभी सम्बन्ध पर्याप्त स्पष्ट नहीं है। क्या हो रहा है और आप किस बात को अलग ढंग से सँभालना चाहते हैं?'},uncertain:true};
 const lenses=hits.map(principle);
 const connections:Pair[]=hits.slice(1).map((hit,i)=>connectPerspectives(hits[0],lenses[0],hit,lenses[i+1],context));
 const seen=new Set<string>();const steps:ActionStep[]=[];
 if(!explicitReference(question))for(let i=0;i<hits.length;i++){if(seen.has(lenses[i].id))continue;seen.add(lenses[i].id);steps.push(nextStep(lenses[i],context,hits[i].document.ref));}
 return {kind:'guidance',question,context,hits,connections,steps,reflection:reflectionFor(context,hits),followup:followupFor(context),uncertain};
}
export function restoreDocumentVectors(manifest:ModelManifest,bytes:Int8Array,scales:Float32Array):Float32Array{
 const count=manifest.documents*manifest.documentVectors;
 if(bytes.length!==count*manifest.dimensions||scales.length!==count)throw Error('Invalid verse vectors');
 const vectors=new Float32Array(bytes.length);
 for(let i=0;i<bytes.length;i++)vectors[i]=bytes[i]*scales[Math.floor(i/manifest.dimensions)];
 return vectors;
}

function connectPerspectives(first:SearchHit,a:Principle,second:SearchHit,b:Principle,context:QuestionContext):Pair{
 const refs=first.document.ref+' + '+second.document.ref;
 const ids=[a.id,b.id];
 if(ids.includes('attention')&&ids.includes('effort'))return {en:refs+': one perspective separates useful effort from the result you cannot guarantee; the other shows how to return attention when it wanders. Together, make the next practice concrete while loosening the demand for certainty about the outcome.',hi:refs+': एक दृष्टि उपयोगी प्रयास और अनिश्चित परिणाम को अलग करती है; दूसरी भटकते ध्यान को लौटाने का उपाय देती है। साथ में अगले अभ्यास को स्पष्ट रखें और परिणाम की निश्चितता का आग्रह कम करें।'};
 if(ids.includes('balance')&&ids.includes('giving'))return {en:refs+': moderation places a limit on endless activity, while reciprocity reminds us that care involves receiving as well as giving. '+(has(context,'care')?'Sharing a caring responsibility can put both ideas into practice.':'Consider what support can be shared rather than carried alone.'),hi:refs+': संतुलन अनन्त गतिविधि को मर्यादा देता है और परस्पर सहयोग बताता है कि देखभाल में लेना भी शामिल है। '+(has(context,'care')?'देखभाल की जिम्मेदारी बाँटना दोनों विचारों को व्यवहार में ला सकता है।':'देखें कि कौन-सा सहयोग अकेले ढोने के बजाय बाँटा जा सकता है।')};
 if(ids.includes('speech')&&ids.includes('anger'))return {en:refs+': a pause gives judgment time to return; considerate speech gives the concern a clear, useful form. You can raise a genuine problem without letting the first emotional impulse decide the wording.',hi:refs+': ठहरने से विवेक को लौटने का समय मिलता है और संवेदनशील वाणी वास्तविक चिन्ता को स्पष्ट रूप देती है। पहली भावनात्मक प्रतिक्रिया से शब्द तय कराए बिना भी समस्या रखी जा सकती है।'};
 if(ids.includes('speech')&&ids.includes('giving')&&has(context,'credit'))return {en:refs+': honest speech helps you name your contribution, while reciprocity brings attention to how work and recognition are shared. Respecting a relationship does not require erasing your own effort.',hi:refs+': सत्य वाणी अपना योगदान स्पष्ट रखने में मदद करती है और परस्पर सहयोग काम तथा मान्यता के बँटवारे पर ध्यान लाता है। सम्बन्ध का सम्मान करने के लिए अपने प्रयास को मिटाना आवश्यक नहीं है।'};
 if(a.id===b.id)return {en:refs+' share an emphasis on '+a.label.en+'. Compare the wording of both verses and use the shared passage context to examine your response from more than one angle.',hi:refs+' में '+a.label.hi+' का साझा भाव है। दोनों श्लोकों की भाषा और प्रसंग साथ पढ़कर अपनी प्रतिक्रिया को एक से अधिक कोणों से देखें।'};
 return {en:first.document.ref+' brings attention to '+a.label.en+'. '+second.document.ref+' adds '+b.label.en+'. Consider both perspectives before choosing your response.',hi:first.document.ref+' में '+a.label.hi+' की दृष्टि है। '+second.document.ref+' '+b.label.hi+' को जोड़ता है। उत्तर चुनने से पहले दोनों पक्षों पर मनन करें।'};
}

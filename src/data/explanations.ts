export type Explanation={en:string;hi:string;start:number;end:number};
type Passage=[number,string,string];
const PASSAGES:Record<number,Passage[]>={
  "1": [
    [
      1,
      "Dhritarashtra asks about a battle involving his own family. His division between “my sons” and the Pandavas introduces attachment and partiality, the human problems against which the Gita’s teaching unfolds.",
      "धृतराष्ट्र अपने ही परिवार के युद्ध का समाचार पूछते हैं। ‘मेरे पुत्र’ और पाण्डवों का भेद उनके मोह और पक्षपात को सामने लाता है। गीता की शिक्षा इन्हीं मानवीय उलझनों की पृष्ठभूमि में आरम्भ होती है।"
    ],
    [
      3,
      "Duryodhana turns to Drona after surveying the opposing army. Pointing out that its commander was Drona’s pupil brings old loyalties into a present conflict; his words reveal concern beneath the display of confidence.",
      "विरोधी सेना देखकर दुर्योधन द्रोणाचार्य के पास जाता है। सेनापति को उन्हीं का शिष्य बताकर वह पुराने सम्बन्धों को युद्ध से जोड़ता है। उसके आत्मविश्वास के पीछे छिपी आशंका भी यहाँ दिखाई देती है।"
    ],
    [
      6,
      "The named warriors establish that the Pandava army is capable and well supported. These are details of the battlefield, not instructions about fighting in daily life; they prepare us to understand the scale of Arjuna’s dilemma.",
      "इन योद्धाओं का उल्लेख बताता है कि पाण्डव सेना सक्षम और संगठित है। यह युद्धभूमि का वर्णन है, दैनिक जीवन में लड़ने का निर्देश नहीं। इससे आगे अर्जुन के संकट की गम्भीरता समझ में आती है।"
    ],
    [
      11,
      "Duryodhana lists his own leaders and stresses protection of Bhishma. Counting strength does not remove uncertainty: even a powerful group depends on cooperation and the people who hold it together.",
      "दुर्योधन अपनी सेना के प्रमुखों को गिनाकर भीष्म की रक्षा पर बल देता है। केवल बल की गणना से अनिश्चितता समाप्त नहीं होती। बड़ी शक्ति भी सहयोग और उसे एकजुट रखने वाले लोगों पर निर्भर होती है।"
    ],
    [
      19,
      "Conches and instruments signal that the confrontation is becoming real. The separate names of the conches and warriors give the scene a human identity before the text turns toward its moral cost.",
      "शंख और वाद्यों का नाद बताता है कि युद्ध अब आरम्भ होने वाला है। योद्धाओं और उनके शंखों के नाम इस दृश्य को व्यक्तिगत बनाते हैं। आगे इन्हीं व्यक्तियों से जुड़े सम्बन्ध अर्जुन का मन बदलेंगे।"
    ],
    [
      23,
      "Arjuna asks to look directly at those he must face. Before choosing an action, he wants to understand the situation; the movement into the middle of the armies makes distant opponents into recognizable people.",
      "अर्जुन सामने खड़े लोगों को निकट से देखना चाहते हैं। निर्णय से पहले परिस्थिति को समझने का यह प्रयास है। दोनों सेनाओं के बीच पहुँचने पर दूर दिखाई देने वाले विरोधी परिचित मनुष्यों के रूप में सामने आते हैं।"
    ],
    [
      27,
      "Seeing teachers, relatives, and friends transforms Arjuna’s view of the battle. The conflict is now between public duty and personal bonds; the Gita begins by taking that conflict seriously rather than dismissing it.",
      "गुरु, सम्बन्धी और मित्र दिखाई देने पर अर्जुन का दृष्टिकोण बदल जाता है। अब कर्तव्य और आत्मीय सम्बन्धों में टकराव है। गीता इस दुविधा को हल्का नहीं मानती, बल्कि उसे समझने से संवाद शुरू करती है।"
    ],
    [
      30,
      "Arjuna’s distress affects his body as well as his judgment. These verses describe his immediate experience of overwhelming emotion; they invite careful listening before anyone tries to offer him advice.",
      "अर्जुन की व्याकुलता शरीर और विचार दोनों को प्रभावित करती है। ये श्लोक तीव्र भावनाओं की उनकी तत्काल अनुभूति बताते हैं। किसी को सलाह देने से पहले उसकी पीड़ा को ध्यान से सुनना कितना आवश्यक है, यह यहाँ स्पष्ट होता है।"
    ],
    [
      35,
      "Arjuna questions the value of victory when it would destroy those with whom he hoped to share it. He is asking what makes achievement worthwhile, not merely whether he can win.",
      "अर्जुन पूछते हैं कि जिनके साथ सुख बाँटना था, उन्हीं के न रहने पर विजय का क्या मूल्य होगा। प्रश्न केवल जीत सकने का नहीं, बल्कि उपलब्धि को सार्थक बनाने वाले सम्बन्धों और मूल्यों का है।"
    ],
    [
      39,
      "Arjuna worries that retaliating against wrongdoing may make him participate in further harm. His reasoning shows a genuine ethical concern, although Krishna will later examine the assumptions and attachments within it.",
      "अर्जुन को आशंका है कि अन्याय का प्रतिकार करते हुए वे स्वयं भी अनिष्ट के भागी बन जाएँगे। यह नैतिक चिन्ता वास्तविक है। आगे कृष्ण इसके भीतर उपस्थित मान्यताओं और आसक्ति की भी जाँच करेंगे।"
    ],
    [
      44,
      "Arjuna fears the social consequences of a destructive war. His argument reflects the family and social assumptions of the epic’s setting; understanding that context does not require treating every historical custom as a rule for people today.",
      "अर्जुन युद्ध से परिवार और समाज पर पड़ने वाले प्रभावों की चिन्ता करते हैं। उनके तर्क महाकाव्य के सामाजिक परिवेश से जुड़े हैं। उस सन्दर्भ को समझना आवश्यक है; हर ऐतिहासिक प्रथा को आज का नियम मानना आवश्यक नहीं।"
    ],
    [
      47,
      "Arjuna finally puts down his bow and withdraws from action. The chapter ends without a solution: recognizing the limits of his present understanding creates the opening for the dialogue that follows.",
      "अन्त में अर्जुन धनुष रखकर कर्म से पीछे हट जाते हैं। अध्याय किसी समाधान पर नहीं पहुँचता। अपने वर्तमान विवेक की सीमा अनुभव करना ही अगले अध्याय में मार्गदर्शन पाने का द्वार खोलता है।"
    ]
  ],
  "2": [
    [
      3,
      "Krishna challenges Arjuna’s collapse at a moment requiring clear judgment. This is the beginning of a conversation with a capable friend in a specific crisis, not a command to shame people for experiencing distress.",
      "कृष्ण निर्णायक समय में अर्जुन की निष्क्रियता को चुनौती देते हैं। यह एक विशेष संकट में अपने समर्थ मित्र से किया गया संवाद है। इसे दुःख अनुभव करने वाले लोगों को लज्जित करने का आदेश नहीं समझना चाहिए।"
    ],
    [
      8,
      "Arjuna explains why familiar answers no longer satisfy him and asks to learn. Admitting uncertainty changes the conversation from defending a position to seeking understanding.",
      "अर्जुन बताते हैं कि पुराने उत्तर अब उनकी दुविधा दूर नहीं कर रहे और वे सीखने की प्रार्थना करते हैं। अनिश्चितता स्वीकार करने से संवाद अपना मत बचाने के स्थान पर सत्य समझने की दिशा में बढ़ता है।"
    ],
    [
      15,
      "Krishna distinguishes changing experiences from the enduring self. Pleasure, pain, and bodily stages arise and pass; steadiness means meeting them thoughtfully, not pretending that they do not hurt.",
      "कृष्ण बदलती अनुभूतियों और आत्मा में भेद बताते हैं। शरीर की अवस्थाएँ, सुख और दुःख आते-जाते हैं। धैर्य का अर्थ उन्हें समझकर सहना है, यह दिखावा करना नहीं कि पीड़ा होती ही नहीं।"
    ],
    [
      25,
      "The self is described as unborn and indestructible, unlike the changing body. This is the Gita’s spiritual account of identity and death; it is meant to broaden Arjuna’s perspective without making physical life disposable.",
      "आत्मा को जन्मरहित और अविनाशी बताया गया है, जबकि शरीर परिवर्तनशील है। यह जीवन और मृत्यु का गीता का आध्यात्मिक दृष्टिकोण है। इसका उद्देश्य अर्जुन की दृष्टि व्यापक करना है, शरीर या जीवन को तुच्छ करना नहीं।"
    ],
    [
      30,
      "Krishna also considers change and death as unavoidable features of embodied existence. Grief is not condemned; the argument is that unavoidable change alone cannot determine what action is right.",
      "कृष्ण परिवर्तन और मृत्यु को देहधारी जीवन की अनिवार्यता के रूप में भी देखते हैं। यहाँ शोक की निन्दा नहीं है। बात यह है कि परिवर्तन का भय अकेले उचित कर्म का निर्णय नहीं कर सकता।"
    ],
    [
      38,
      "Krishna returns to Arjuna’s responsibilities in the epic’s setting and asks him to act with balance. The broader question is how to meet a difficult responsibility without being driven only by gain, loss, or reputation.",
      "कृष्ण महाकाव्य के प्रसंग में अर्जुन के दायित्व की ओर लौटते हैं और समभाव से कर्म करने को कहते हैं। व्यापक प्रश्न है कि लाभ, हानि या प्रतिष्ठा के दबाव से ऊपर उठकर कठिन कर्तव्य कैसे निभाया जाए।"
    ],
    [
      44,
      "A steady intelligence gathers effort around a meaningful aim. Endless attraction to rewards can scatter attention; the criticism is of bargaining for benefits while losing sight of understanding and inner growth.",
      "स्थिर बुद्धि प्रयास को सार्थक दिशा देती है। फल के अनेक आकर्षण ध्यान को बाँट सकते हैं। आलोचना उस दृष्टि की है जिसमें लाभ की चाह बढ़ती जाती है और ज्ञान तथा आन्तरिक विकास पीछे छूट जाते हैं।"
    ],
    [
      46,
      "Krishna asks Arjuna to look beyond dependence on external rewards. Ritual and learning have a place, but their purpose is fulfilled when they support direct understanding and freedom from compulsive desire.",
      "कृष्ण बाहरी फल पर निर्भरता से आगे देखने को कहते हैं। अनुष्ठान और अध्ययन का स्थान है, पर उनकी सार्थकता तब है जब वे समझ विकसित करें और अनियन्त्रित इच्छाओं का बन्धन कम करें।"
    ],
    [
      47,
      "Your responsibility lies in the action you can undertake, while its result also depends on conditions beyond you. Krishna rejects both obsession with reward and attachment to doing nothing: wholehearted effort remains essential.",
      "आपका अधिकार उस कर्म पर है जिसे आप कर सकते हैं; परिणाम दूसरे अनेक कारणों पर भी निर्भर है। कृष्ण फल की बेचैनी और कर्म न करने की आसक्ति, दोनों छोड़ने को कहते हैं। इसलिए पूरा प्रयास करना आवश्यक है।"
    ],
    [
      50,
      "Evenness toward success and failure protects the quality of action. “Skill in action” includes judgment, care, and freedom from ego-driven agitation; it does not mean that any efficient act is automatically ethical.",
      "सफलता और असफलता में समता कर्म की गुणवत्ता बनाए रखती है। ‘कर्म में कुशलता’ में विवेक, सावधानी और अहंकारजनित बेचैनी से मुक्ति शामिल है। केवल दक्षता किसी भी काम को अपने आप नैतिक नहीं बना देती।"
    ],
    [
      53,
      "The teaching moves from reward-seeking to a clearer, more settled understanding. Freedom grows as intelligence is no longer pulled in opposing directions by every promise or fear.",
      "शिक्षा फल की चाह से आगे बढ़कर स्पष्ट और स्थिर समझ की ओर जाती है। जब बुद्धि हर वचन, आकर्षण या भय से अलग-अलग दिशाओं में नहीं खिंचती, तब आन्तरिक स्वतन्त्रता विकसित होती है।"
    ],
    [
      57,
      "Arjuna asks how wisdom appears in ordinary conduct. Krishna describes a person whose contentment is not wholly dependent on pleasant events, and whose responses are not ruled by craving, fear, and anger.",
      "अर्जुन पूछते हैं कि स्थिर ज्ञान व्यवहार में कैसे दिखाई देता है। कृष्ण ऐसे व्यक्ति का वर्णन करते हैं जिसकी सन्तुष्टि केवल अनुकूल घटनाओं पर निर्भर नहीं होती और जिसकी प्रतिक्रिया कामना, भय तथा क्रोध से संचालित नहीं होती।"
    ],
    [
      61,
      "Sense restraint is compared with a tortoise withdrawing its limbs. Restraint is not merely avoiding objects: the deeper work is loosening the desire that continues to pull the mind toward them.",
      "इन्द्रिय-संयम को कछुए के अपने अंग समेटने से समझाया गया है। केवल विषयों से दूर रहना पर्याप्त नहीं। उनके प्रति मन को खींचती हुई इच्छा का बल कम करना भी आवश्यक है।"
    ],
    [
      63,
      "Repeated fixation can become attachment, frustrated desire, anger, and loss of judgment. Seeing this sequence early offers a chance to pause before an emotion becomes a harmful decision.",
      "बार-बार विषयों में उलझना आसक्ति, बाधित इच्छा, क्रोध और विवेक के ह्रास का कारण बन सकता है। इस क्रम को आरम्भ में पहचान लेने से भावना के हानिकारक निर्णय बनने से पहले रुकने का अवसर मिलता है।"
    ],
    [
      68,
      "A disciplined relationship with the senses allows greater clarity and peace. Unchecked attention is compared with a boat swept off course, emphasizing why inner steadiness supports practical judgment.",
      "इन्द्रियों के साथ संयमपूर्ण सम्बन्ध बुद्धि को स्पष्ट और मन को शान्त बनाता है। असंयमित ध्यान की तुलना दिशा से भटकती नाव से की गई है। इससे समझ आता है कि आन्तरिक स्थिरता व्यावहारिक विवेक को क्यों सहारा देती है।"
    ],
    [
      72,
      "The ocean receives rivers without losing its steadiness. Likewise, wisdom does not require the world to stop changing; peace develops when every desire is no longer treated as a demand that must be satisfied.",
      "नदियों का जल पाकर भी समुद्र अपनी मर्यादा बनाए रखता है। इसी प्रकार ज्ञान के लिए संसार का बदलना बन्द होना आवश्यक नहीं। जब हर इच्छा को पूरा करना अनिवार्य नहीं लगता, तब शान्ति विकसित होती है।"
    ]
  ],
  "3": [
    [
      5,
      "Arjuna asks why action is needed if understanding is so important. Krishna explains that simply stopping outward work does not end the mind’s activity or the influences that produce action.",
      "अर्जुन पूछते हैं कि ज्ञान इतना महत्त्वपूर्ण है तो कर्म क्यों करना चाहिए। कृष्ण समझाते हैं कि बाहरी काम छोड़ देने से मन की गतिविधि और कर्म को प्रेरित करने वाले स्वभाव का अन्त नहीं होता।"
    ],
    [
      9,
      "Pretending to renounce while mentally dwelling on desires is contrasted with sincere, disciplined work. Necessary action can become an offering when it serves more than personal craving.",
      "बाहर से त्याग का दिखावा करते हुए मन में विषयों की चाह रखना सच्चा त्याग नहीं है। संयम और ईमानदारी से किया गया आवश्यक कर्म, केवल निजी चाह के स्थान पर व्यापक हित की भावना से अर्पण बन सकता है।"
    ],
    [
      16,
      "The cycle of giving and receiving presents life as interdependent. Enjoying resources without recognizing contribution and responsibility breaks that reciprocity; gratitude is expressed through participation and care.",
      "देने और पाने का चक्र जीवन की परस्पर निर्भरता बताता है। दूसरों के योगदान और अपने दायित्व को भूले बिना संसाधनों का उपयोग करना चाहिए। कृतज्ञता केवल भावना नहीं, सहयोग और संरक्षण के व्यवहार में भी प्रकट होती है।"
    ],
    [
      20,
      "One who is inwardly fulfilled need not act from personal lack, yet can still work for the well-being of others. Freedom from attachment supports responsible participation rather than indifference.",
      "भीतर से सन्तुष्ट व्यक्ति को निजी अभाव के कारण कर्म करने की आवश्यकता नहीं रहती, फिर भी वह लोकहित के लिए कार्य कर सकता है। आसक्ति से मुक्ति जिम्मेदारी से भागना नहीं, उसे अधिक निष्पक्षता से निभाना सिखाती है।"
    ],
    [
      26,
      "People learn from the conduct of those they respect. Krishna therefore emphasizes example and thoughtful guidance: helping others develop is more useful than disrupting their efforts through superiority or contempt.",
      "लोग आदरणीय व्यक्तियों के आचरण से सीखते हैं। इसलिए कृष्ण उदाहरण और विवेकपूर्ण मार्गदर्शन पर बल देते हैं। श्रेष्ठता के अभिमान से दूसरों का प्रयास तोड़ने के बजाय उन्हें धीरे-धीरे समझ और कर्म में आगे बढ़ाना उपयोगी है।"
    ],
    [
      30,
      "Action arises through many forces of body, mind, and nature. Recognizing this softens the ego’s claim to be the sole doer while preserving the need to act conscientiously and offer one’s effort.",
      "कर्म शरीर, मन और प्रकृति के अनेक कारणों से होता है। यह समझ अहंकार के ‘मैं ही सब करने वाला हूँ’ वाले आग्रह को कम करती है। फिर भी सजगता से कार्य करना और प्रयास अर्पित करना आवश्यक रहता है।"
    ],
    [
      35,
      "Attraction and aversion influence behavior, but need not become its masters. The teaching on one’s own duty asks for honest responsibility in one’s circumstances, rather than an imitation that neglects them.",
      "राग और द्वेष व्यवहार को प्रभावित करते हैं, पर उन्हें उसका स्वामी बनाना आवश्यक नहीं। स्वधर्म की शिक्षा अपने जीवन की परिस्थितियों में ईमानदारी से दायित्व निभाने की है, उन्हें छोड़कर केवल दूसरों की नकल करने की नहीं।"
    ],
    [
      39,
      "Arjuna asks what drives people to act against their better judgment. Krishna identifies desire, especially when frustrated into anger, as a force that can conceal understanding.",
      "अर्जुन पूछते हैं कि मनुष्य समझते हुए भी अनुचित कर्म क्यों करता है। कृष्ण कामना और उसके बाधित होने पर उत्पन्न क्रोध को ऐसी शक्ति बताते हैं जो विवेक को ढक सकती है।"
    ],
    [
      43,
      "The senses, mind, and intellect form a sequence through which desire operates. Begin with manageable restraint and strengthen discernment; mastery grows through understanding the impulse, not merely condemning yourself for having it.",
      "इन्द्रियाँ, मन और बुद्धि वे स्तर हैं जिनसे इच्छा प्रभाव डालती है। साध्य संयम से शुरुआत करके विवेक को मजबूत करना चाहिए। अपने को दोष देते रहने के बजाय प्रेरणा को समझने से वास्तविक आत्मसंयम बढ़ता है।"
    ]
  ],
  "4": [
    [
      10,
      "Krishna presents this teaching as an enduring discipline renewed when understanding declines. His account of divine manifestation expresses the restoration of dharma and the possibility of liberation through knowing the divine.",
      "कृष्ण इस शिक्षा को प्राचीन साधना के रूप में प्रस्तुत करते हैं, जिसका ज्ञान लुप्त होने पर पुनः स्मरण कराया जाता है। अवतार का वर्णन धर्म की पुनर्स्थापना और ईश्वर के तत्त्व को जानकर मुक्ति की सम्भावना बताता है।"
    ],
    [
      15,
      "Different approaches to the divine are acknowledged, and action is distinguished from binding attachment. The discussion of social functions belongs to its historical setting; spiritual worth should not be reduced to inherited social rank.",
      "ईश्वर की ओर बढ़ने के विविध मार्गों को स्वीकार करते हुए कर्म और बन्धनकारी आसक्ति में भेद बताया गया है। सामाजिक कार्य-विभाजन का प्रसंग अपने ऐतिहासिक परिवेश में समझना चाहिए; आध्यात्मिक मूल्य जन्मगत प्रतिष्ठा तक सीमित नहीं है।"
    ],
    [
      18,
      "“Action in inaction” challenges a purely outward definition of renunciation. A still body can hide a restless mind, while active service can be inwardly free; intention and understanding matter alongside visible behavior.",
      "‘कर्म में अकर्म’ का कथन केवल बाहरी क्रिया से त्याग को पहचानने की सीमा दिखाता है। स्थिर शरीर के भीतर अशान्त मन हो सकता है, जबकि सेवा में लगा व्यक्ति भीतर से मुक्त हो सकता है। भाव और विवेक भी महत्त्वपूर्ण हैं।"
    ],
    [
      23,
      "The wise worker is described as acting without possessiveness and compulsive dependence on results. This does not remove standards of care; it removes the ego’s need to claim every outcome as its own.",
      "ज्ञानी कर्मी में ममता और परिणाम पर अनिवार्य निर्भरता कम होती है। इसका अर्थ काम की सावधानी या गुणवत्ता छोड़ना नहीं। त्याग उस अहंकार का है जो हर परिणाम को अपनी सम्पत्ति और अपनी पहचान बनाना चाहता है।"
    ],
    [
      30,
      "Different forms of sacrifice include learning, restraint, service, and disciplined living. The shared principle is to redirect self-centered energy toward a larger purpose, rather than reducing sacrifice to one external ceremony.",
      "यज्ञ के रूपों में अध्ययन, संयम, सेवा और अनुशासित जीवन भी आते हैं। इनका साझा भाव स्वार्थ-केंद्रित शक्ति को बड़े उद्देश्य की ओर लगाना है। इसलिए यज्ञ केवल किसी एक बाहरी विधि का नाम नहीं रहता।"
    ],
    [
      33,
      "An offering gains depth through understanding. Knowledge is praised because it changes the way one sees and acts, allowing practices to become conscious rather than merely mechanical.",
      "समझ जुड़ने पर अर्पण का भाव गहरा होता है। ज्ञान की प्रशंसा इसलिए है कि वह देखने और कर्म करने का ढंग बदलता है। इससे साधना केवल यान्त्रिक क्रिया न रहकर सजग अभ्यास बनती है।"
    ],
    [
      37,
      "Learning calls for humility, sincere questions, and service. Insight can burn through the binding force of past ignorance; it is not an excuse to avoid acknowledging harm or making amends.",
      "सीखने के लिए नम्रता, सच्चे प्रश्न और सेवा की भावना आवश्यक हैं। ज्ञान पुराने अज्ञान के बन्धन को काट सकता है। इसका अर्थ अपनी भूल से हुए नुकसान को नकारना या उसे सुधारने से बचना नहीं है।"
    ],
    [
      42,
      "Trust, disciplined effort, and discernment support knowledge. Persistent doubt is answered through inquiry and practice, so that understanding can lead to a clear decision instead of endless hesitation.",
      "श्रद्धा, संयमित प्रयास और विवेक ज्ञान को सहारा देते हैं। संशय का समाधान पूछने, समझने और अभ्यास से होता है। उद्देश्य अन्धविश्वास नहीं, ऐसी स्पष्टता है जिससे निरन्तर हिचक के स्थान पर उचित निर्णय लिया जा सके।"
    ]
  ],
  "5": [
    [
      6,
      "Krishna explains that sincere renunciation and selfless action can lead toward the same freedom. For someone still engaged in ordinary responsibilities, disciplined action offers a practical way to develop that freedom.",
      "कृष्ण बताते हैं कि सच्चा संन्यास और निष्काम कर्म एक ही मुक्ति की दिशा में ले जा सकते हैं। सामान्य दायित्व निभाने वाले व्यक्ति के लिए कर्मयोग उस आन्तरिक स्वतन्त्रता को विकसित करने का व्यावहारिक मार्ग है।"
    ],
    [
      12,
      "The lotus leaf remains unwetted by water. In the same way, work can be performed with care while its burden of possessiveness is released; the practice transforms one’s relationship to action rather than abolishing action.",
      "जैसे कमल का पत्ता जल में रहकर भी उससे लिप्त नहीं होता, वैसे ही सावधानी से कर्म करते हुए ममता का बोझ छोड़ा जा सकता है। अभ्यास कर्म मिटाता नहीं, कर्म के साथ हमारा सम्बन्ध बदलता है।"
    ],
    [
      17,
      "The distinction between the self and bodily activity challenges the belief that ego is the source of everything. Knowledge removes confusion, making responsibility more lucid rather than making conduct morally irrelevant.",
      "आत्मा और शरीर की क्रियाओं में भेद अहंकार के सर्वकर्ता होने के भाव को चुनौती देता है। ज्ञान भ्रम दूर करता है। इससे जिम्मेदारी अधिक स्पष्ट होती है, नैतिक आचरण का महत्त्व समाप्त नहीं होता।"
    ],
    [
      21,
      "Equal vision recognizes a shared spiritual reality across social identities and living beings. It asks us to look beyond prestige and prejudice; respectful treatment is a natural expression of that understanding.",
      "समदृष्टि सामाजिक पहचान और विभिन्न प्राणियों के भीतर साझा आध्यात्मिक सत्य देखती है। वह प्रतिष्ठा और पूर्वाग्रह से आगे देखने की शिक्षा देती है। दूसरों के प्रति सम्मान इस समझ की स्वाभाविक अभिव्यक्ति है।"
    ],
    [
      26,
      "Pleasures dependent on contact are temporary and may bring frustration when clung to. Inner steadiness grows through patience with desire and anger, together with concern for the welfare of living beings.",
      "विषय-सम्पर्क से मिला सुख स्थायी नहीं होता और उससे चिपकने पर निराशा बढ़ सकती है। इच्छा और क्रोध के सामने धैर्य रखने तथा प्राणियों के कल्याण की भावना से आन्तरिक स्थिरता विकसित होती है।"
    ],
    [
      29,
      "The chapter closes by linking inward discipline with recognition of the divine as the friend of all beings. Peace is associated with relinquishing exclusive ownership and living within a wider relationship of trust.",
      "अध्याय के अन्त में अन्तर्मुखी साधना को समस्त प्राणियों के हितैषी ईश्वर की पहचान से जोड़ा गया है। केवल अपना स्वामित्व मानने का आग्रह छोड़कर व्यापक विश्वास और सम्बन्ध में जीने से शान्ति का मार्ग खुलता है।"
    ]
  ],
  "6": [
    [
      4,
      "True renunciation is measured by freedom from selfish insistence, not by abandoning every task. Work disciplines the beginner; as steadiness develops, inward quiet becomes increasingly important.",
      "सच्चा त्याग स्वार्थपूर्ण आग्रह कम होने से पहचाना जाता है, हर काम छोड़ने से नहीं। आरम्भ में कर्तव्यपूर्ण कर्म साधना बनता है। स्थिरता बढ़ने पर भीतर की शान्ति का महत्त्व अधिक स्पष्ट होता है।"
    ],
    [
      9,
      "The mind can support or undermine one’s growth. Becoming a friend to oneself involves discipline without hostility, and equal vision asks for balance in encounters with both pleasant and difficult people.",
      "मन अपनी उन्नति में सहायक भी हो सकता है और बाधक भी। अपना मित्र बनने का अर्थ अनुशासन के साथ आत्मद्वेष छोड़ना है। समदृष्टि प्रिय और अप्रिय व्यक्तियों के सामने भी विवेकपूर्ण संतुलन का अभ्यास कराती है।"
    ],
    [
      15,
      "Meditation is described through a stable setting, posture, attention, and intention. These details support concentration; the deeper aim is a mind less scattered by fear and restless wanting.",
      "ध्यान के लिए स्थान, आसन, एकाग्रता और भाव का वर्णन है। ये व्यवस्थाएँ ध्यान को सहारा देती हैं। मुख्य उद्देश्य ऐसा मन विकसित करना है जो भय और अनवरत इच्छाओं से कम बिखरे।"
    ],
    [
      17,
      "Neither indulgence nor extreme deprivation supports steady practice. Balance in food, recreation, activity, sleep, and waking makes spiritual discipline sustainable within embodied life.",
      "अत्यधिक भोग और कठोर अभाव, दोनों स्थिर साधना में बाधक हैं। भोजन, विहार, कर्म, नींद और जागरण में संतुलन रखने से साधना शरीर और दैनिक जीवन के साथ टिकाऊ रूप में चलती है।"
    ],
    [
      23,
      "A lamp sheltered from the wind illustrates collected attention. The peace described here comes from inward steadiness and understanding, rather than from arranging a life in which nothing difficult ever happens.",
      "वायु से सुरक्षित दीपक एकाग्र चित्त का उदाहरण है। यहाँ वर्णित शान्ति भीतर की स्थिरता और समझ से आती है। इसका आशय ऐसा जीवन बना लेना नहीं है जिसमें कभी कोई कठिन घटना न हो।"
    ],
    [
      28,
      "When attention wanders, return it gently and repeatedly. The instruction treats steadiness as a practice, not a test of being able to suppress every thought immediately.",
      "मन जहाँ-जहाँ भटके, वहाँ से उसे बार-बार धैर्यपूर्वक लौटाना है। यह अभ्यास की शिक्षा है, तुरन्त सभी विचार रोक देने की परीक्षा नहीं। निरन्तर प्रयास में कोमलता और दृढ़ता दोनों की आवश्यकता है।"
    ],
    [
      32,
      "Meditative insight is connected with seeing oneself in others and understanding their joys and sorrows. Inner practice is therefore not separate from empathy and how we treat living beings.",
      "ध्यान की समझ दूसरों में स्वयं को देखने और उनके सुख-दुःख को अपने समान समझने से जुड़ती है। इसलिए अन्तर्मुखी साधना करुणा और प्राणियों के साथ हमारे व्यवहार से अलग नहीं है।"
    ],
    [
      36,
      "Arjuna names the difficulty of governing a restless mind. Krishna accepts the difficulty and points to practice and non-attachment, offering a gradual path rather than demanding effortless control.",
      "अर्जुन चंचल मन को सँभालने की कठिनाई रखते हैं। कृष्ण उसे स्वीकार करके अभ्यास और वैराग्य का मार्ग बताते हैं। यहाँ सहज ही पूर्ण नियन्त्रण पाने की माँग नहीं, क्रमिक साधना का उपाय है।"
    ],
    [
      45,
      "Arjuna worries that incomplete practice might be wasted. Krishna reassures him that sincere effort toward the good is not lost; the discussion of future births belongs to the text’s spiritual account of continuity.",
      "अर्जुन को भय है कि अधूरी साधना व्यर्थ न चली जाए। कृष्ण आश्वस्त करते हैं कि कल्याण की दिशा में किया सच्चा प्रयत्न नष्ट नहीं होता। आगे जन्मों का वर्णन गीता की आध्यात्मिक निरन्तरता की दृष्टि से जुड़ा है।"
    ],
    [
      47,
      "The highest yogi is described through inward devotion and trust. The closing emphasis is on the quality of one’s whole relationship with the divine, not on displaying unusual abilities or outward austerity.",
      "श्रेष्ठ योगी की पहचान आन्तरिक भक्ति और श्रद्धा से होती है। अन्तिम बल ईश्वर के साथ पूरे जीवन के सम्बन्ध पर है। असाधारण शक्ति का प्रदर्शन या बाहरी कठोरता ही साधना की कसौटी नहीं है।"
    ]
  ],
  "7": [
    [
      7,
      "Krishna distinguishes knowledge about reality from lived understanding. Material nature and conscious life are described as dependent on the divine, inviting a view of existence that is larger than isolated objects.",
      "कृष्ण सुनी-पढ़ी जानकारी और अनुभूत समझ में भेद खोलते हैं। जड़ प्रकृति और चेतन जीवन का आधार ईश्वर बताया गया है। इससे अस्तित्व को अलग-अलग वस्तुओं के समूह से अधिक व्यापक रूप में देखने की दृष्टि मिलती है।"
    ],
    [
      12,
      "Everyday qualities such as light, taste, and strength become reminders of the divine ground of life. The point is attentive recognition within ordinary experience, not a need to leave everyday life behind.",
      "प्रकाश, स्वाद और बल जैसी सामान्य अनुभूतियाँ ईश्वर के आधार का स्मरण बनती हैं। शिक्षा दैनिक अनुभव में सजगता से पहचानने की है। इसके लिए सामान्य जीवन को छोड़ देना आवश्यक नहीं बताया गया है।"
    ],
    [
      15,
      "The qualities of nature can conceal a deeper view of reality. Seeking refuge in the divine means loosening identification with these changing forces; it does not remove the need for thoughtful choices.",
      "प्रकृति के गुण गहरे सत्य को ढक सकते हैं। ईश्वर की शरण का अर्थ इन परिवर्तनशील शक्तियों के साथ अपनी पूरी पहचान जोड़ने का आग्रह कम करना है। इससे विवेकपूर्ण चुनाव करने की आवश्यकता समाप्त नहीं होती।"
    ],
    [
      19,
      "People turn toward the divine through distress, curiosity, desire, and wisdom. These starting points are acknowledged, while mature understanding gradually becomes devotion that is less dependent on obtaining a particular benefit.",
      "लोग दुःख, जिज्ञासा, लाभ की इच्छा और ज्ञान की भावना से ईश्वर की ओर आते हैं। इन आरम्भों को स्वीकार किया गया है। समझ बढ़ने पर भक्ति किसी विशेष लाभ को पाने की शर्त से अधिक स्वतन्त्र होती जाती है।"
    ],
    [
      23,
      "Faith can focus effort, yet the fruits of desire-driven worship remain limited. Krishna asks the reader to consider whether the deepest aim is a temporary result or a lasting understanding of reality.",
      "श्रद्धा प्रयास को दिशा देती है, पर कामना से प्रेरित उपासना के फल सीमित रहते हैं। कृष्ण विचार करने को कहते हैं कि हमारा मुख्य लक्ष्य अस्थायी उपलब्धि है या वास्तविकता की स्थायी समझ।"
    ],
    [
      26,
      "The divine is not exhausted by the form or concept the mind can easily grasp. Limited perception and desire can make us mistake a partial view for the whole.",
      "मन जिस रूप या धारणा को आसानी से पकड़ ले, ईश्वर उतने तक सीमित नहीं है। सीमित दृष्टि और इच्छा के कारण हम कभी-कभी अधूरी समझ को ही सम्पूर्ण सत्य मान लेते हैं।"
    ],
    [
      30,
      "Attraction and aversion give rise to confusion, while disciplined conduct clears the way for steadier understanding. Knowledge then connects the self, the world, action, and the divine within one inquiry.",
      "राग-द्वेष से भ्रम बढ़ता है और संयमित आचरण अधिक स्थिर समझ का मार्ग बनाता है। आगे आत्मा, संसार, कर्म और ईश्वर के प्रश्न एक-दूसरे से जुड़े हुए दिखाई देते हैं।"
    ]
  ],
  "8": [
    [
      4,
      "Arjuna asks for precise meanings of terms used in the teaching. Clarifying language matters: spiritual discussion becomes useful when important words are understood rather than merely repeated.",
      "अर्जुन शिक्षा में प्रयुक्त शब्दों का स्पष्ट अर्थ पूछते हैं। शब्दों की समझ आवश्यक है। आध्यात्मिक चर्चा तब उपयोगी होती है जब मुख्य धारणाओं को केवल दोहराया न जाए, बल्कि उनका अर्थ भी जाना जाए।"
    ],
    [
      8,
      "The mind’s final orientation is linked with the habits cultivated throughout life. Remembering the divine while fulfilling one’s work joins daily action and spiritual attention instead of separating them.",
      "अन्तिम समय की मनोदिशा जीवन भर के अभ्यास से जुड़ी बताई गई है। अपना काम करते हुए ईश्वर का स्मरण करना दैनिक कर्म और आध्यात्मिक सजगता को जोड़ता है, उन्हें अलग-अलग जीवन नहीं बनाता।"
    ],
    [
      13,
      "Concentrated remembrance and the sacred syllable Om are presented as disciplines of spiritual attention. These instructions belong to a contemplative tradition and should be approached with patience, not fear about performing a final moment perfectly.",
      "एकाग्र स्मरण और ओंकार का वर्णन आध्यात्मिक ध्यान की साधना के रूप में है। इन्हें धैर्य से समझना चाहिए। अन्तिम क्षण को बिल्कुल सही निभाने की घबराहट पैदा करना इनका उद्देश्य नहीं है।"
    ],
    [
      16,
      "Steady devotion is contrasted with repeated dependence on changing states of existence. Liberation is described as reaching a freedom that is not simply another temporary improvement in worldly circumstances.",
      "स्थिर भक्ति को परिवर्तनशील अवस्थाओं पर बार-बार निर्भर रहने से अलग बताया गया है। मुक्ति ऐसी स्वतन्त्रता है जो केवल संसार की परिस्थिति में आया एक और अस्थायी सुधार नहीं है।"
    ],
    [
      22,
      "Cosmic cycles of manifestation and dissolution are set beside an imperishable reality. The immense scale of the imagery invites humility about the things we usually treat as permanent.",
      "सृष्टि के प्रकट और लीन होने के विशाल चक्रों के साथ अविनाशी तत्त्व का वर्णन है। यह विराट दृष्टि उन वस्तुओं के विषय में नम्रता सिखाती है जिन्हें हम सामान्यतः सदा रहने वाला मान लेते हैं।"
    ],
    [
      28,
      "The two paths after death express the chapter’s spiritual cosmology. Its practical conclusion is steadiness in yoga at all times, rather than anxiety over calendars or attempts to control the timing of death.",
      "मृत्यु के बाद के दो मार्ग अध्याय की आध्यात्मिक विश्वदृष्टि का भाग हैं। व्यावहारिक निष्कर्ष हर समय योग में स्थिर रहने का है, पंचांग को लेकर भय या मृत्यु का समय नियंत्रित करने का प्रयास करने का नहीं।"
    ]
  ],
  "9": [
    [
      3,
      "The teaching is called profound because it unites knowledge, experience, and a way of living. Receptivity is important, but understanding must become meaningful in practice rather than remain an impressive idea.",
      "इस ज्ञान को गहन इसलिए कहा गया है कि इसमें बोध, अनुभव और जीवन का आचरण जुड़ते हैं। सीखने की तत्परता आवश्यक है, पर समझ को व्यवहार में उतरना चाहिए, केवल आकर्षक विचार बनकर नहीं रहना चाहिए।"
    ],
    [
      10,
      "Krishna describes the universe as sustained by the divine without limiting the divine to the universe. The apparent paradox encourages a distinction between dependence on a foundation and exhausting what that foundation is.",
      "कृष्ण संसार को ईश्वर पर आश्रित बताते हैं, पर ईश्वर को केवल संसार तक सीमित नहीं करते। यह सूक्ष्म भेद बताता है कि किसी आधार पर निर्भर होना और उस आधार की सम्पूर्णता को समेट लेना एक बात नहीं है।"
    ],
    [
      15,
      "A limited outlook sees only an ordinary form, while a wider vision recognizes the divine through devotion and inquiry. Different modes of worship are described as expressions of the seeker’s understanding.",
      "सीमित दृष्टि केवल सामान्य रूप देखती है; व्यापक दृष्टि भक्ति और विचार से दिव्यता पहचानती है। उपासना के भिन्न रूप साधक की समझ और उसके सम्बन्ध की अभिव्यक्तियों के रूप में वर्णित हैं।"
    ],
    [
      19,
      "The language of offering, parenthood, refuge, and sustaining power presents the divine as related to every part of life. Worship can therefore include remembering the source within ordinary dependence and gratitude.",
      "यज्ञ, माता-पिता, आश्रय और पालन की भाषा से ईश्वर का जीवन के हर भाग से सम्बन्ध बताया गया है। उपासना में सामान्य निर्भरता और कृतज्ञता के भीतर उस आधार का स्मरण भी शामिल हो सकता है।"
    ],
    [
      25,
      "Desire for heavenly reward is distinguished from wholehearted devotion. Even an elevated reward can be temporary; the question is whether one seeks another possession or a deeper relationship with the divine.",
      "स्वर्गीय फल की इच्छा और अनन्य भक्ति में भेद है। ऊँचा समझा गया फल भी अस्थायी हो सकता है। प्रश्न है कि साधक एक और उपलब्धि चाहता है या ईश्वर के साथ अधिक गहरा सम्बन्ध।"
    ],
    [
      28,
      "A leaf, flower, fruit, or water offered with devotion illustrates the value of intention over cost. Daily work and ordinary acts can likewise become offerings when performed with sincerity and care.",
      "पत्र, पुष्प, फल या जल का प्रेमपूर्ण अर्पण बताता है कि मूल्य वस्तु की कीमत में नहीं, भाव में है। इसी तरह दैनिक काम भी ईमानदारी और सावधानी से किए जाने पर अर्पण बन सकते हैं।"
    ],
    [
      34,
      "The possibility of spiritual transformation is extended beyond social prestige and a person’s past mistakes. This calls for sincere change and equal access to devotion, not permission to continue harmful conduct.",
      "आध्यात्मिक परिवर्तन का मार्ग सामाजिक प्रतिष्ठा और पिछली भूलों से परे खुला बताया गया है। आशय सच्चा परिवर्तन और भक्ति में सबकी पहुँच है। इससे हानिकारक आचरण जारी रखने की छूट नहीं मिलती।"
    ]
  ],
  "10": [
    [
      7,
      "Krishna describes the divine source of qualities and capacities. Seeing ability as more than a private possession can nurture gratitude and reduce arrogance, while leaving room for responsible effort.",
      "कृष्ण गुणों और सामर्थ्य के दिव्य आधार का वर्णन करते हैं। क्षमता को केवल अपनी निजी सम्पत्ति न मानने से कृतज्ञता बढ़ती और अभिमान कम होता है। फिर भी जिम्मेदारी से प्रयास करना आवश्यक रहता है।"
    ],
    [
      11,
      "Devotion is presented as a living relationship that supports discernment. The image of light dispelling darkness points to understanding replacing confusion, not merely to receiving desirable events.",
      "भक्ति को ऐसे जीवित सम्बन्ध के रूप में बताया गया है जो बुद्धि को दिशा देता है। अज्ञान का अँधेरा हटाने वाले प्रकाश का अर्थ समझ से भ्रम दूर होना है, केवल मनचाही घटनाएँ प्राप्त होना नहीं।"
    ],
    [
      18,
      "Arjuna asks for ways to remember the divine through the world he sees. His request makes the following examples aids to contemplation rather than a list to memorize for its own sake.",
      "अर्जुन दृश्य संसार में ईश्वर का स्मरण करने के उपाय पूछते हैं। इसलिए आगे के उदाहरण ध्यान के सहायक हैं। उनका उद्देश्य केवल नामों की सूची याद कराना नहीं है।"
    ],
    [
      31,
      "The manifestations include natural powers, revered figures, knowledge, and excellence. These examples direct attention toward a shared divine source; they do not ask us to despise things that are absent from the list.",
      "विभूतियों में प्राकृतिक शक्तियाँ, पूज्य व्यक्तित्व, विद्या और उत्कृष्टता आते हैं। उदाहरणों से साझा दिव्य आधार की ओर ध्यान जाता है। सूची में न आए रूपों को तुच्छ समझना इसका आशय नहीं है।"
    ],
    [
      38,
      "Even qualities such as memory, patience, and wise silence are included among divine expressions. Spiritual recognition is not limited to spectacular events; it can deepen attention to subtle virtues.",
      "स्मृति, धैर्य और उपयुक्त मौन जैसे गुण भी दिव्य अभिव्यक्तियों में आते हैं। ईश्वर की पहचान केवल चमत्कारिक घटनाओं तक सीमित नहीं। सूक्ष्म सद्गुणों के प्रति सजगता भी उसका मार्ग बन सकती है।"
    ],
    [
      42,
      "The examples cannot exhaust the divine. Whatever carries beauty, strength, or excellence can become a reminder, while the closing verse places the whole catalogue within a reality greater than any list.",
      "उदाहरणों से ईश्वर की सम्पूर्णता नहीं समेटी जा सकती। सौन्दर्य, सामर्थ्य और उत्कृष्टता स्मरण के माध्यम बनते हैं। अन्तिम श्लोक पूरी सूची को उस वास्तविकता में रखता है जो किसी भी वर्णन से अधिक व्यापक है।"
    ]
  ],
  "11": [
    [
      4,
      "Arjuna’s understanding leads to a request for direct vision. He asks rather than assumes that ordinary sight can grasp the whole, expressing both curiosity and humility before what is being revealed.",
      "अर्जुन समझ से आगे प्रत्यक्ष दर्शन की प्रार्थना करते हैं। वे यह मानकर नहीं चलते कि सामान्य दृष्टि सम्पूर्णता को देख सकती है। उनकी प्रार्थना में जिज्ञासा और सामने खुलते सत्य के प्रति नम्रता दोनों हैं।"
    ],
    [
      8,
      "Krishna says that a different capacity of vision is needed. The universal form is a revelation within the dialogue, not a spectacle that ordinary perception or personal effort alone can simply demand.",
      "कृष्ण बताते हैं कि इस दर्शन के लिए विशेष दृष्टि चाहिए। विश्वरूप संवाद में प्रकट हुई अनुभूति है। उसे सामान्य इन्द्रिय-दृष्टि या केवल निजी प्रयास से माँगकर प्राप्त कर लेने योग्य दृश्य नहीं माना गया है।"
    ],
    [
      14,
      "Sanjaya’s images of countless forms and overwhelming radiance convey the limits of ordinary description. Arjuna’s wonder marks a shift from thinking about unity to confronting its vastness.",
      "असंख्य रूपों और प्रचण्ड प्रकाश के वर्णन से सामान्य भाषा की सीमा सामने आती है। अर्जुन का विस्मय दिखाता है कि एकता पर विचार करना और उसकी विराटता का साक्षात्कार करना अलग अनुभव हैं।"
    ],
    [
      22,
      "Arjuna sees diverse beings held within one cosmic reality. Creation is pictured as interconnected, inviting a larger perspective than the small circle of what one can personally possess or control.",
      "अर्जुन अनेक प्राणियों को एक विराट वास्तविकता में स्थित देखते हैं। सृष्टि की यह परस्पर जुड़ी दृष्टि अपने अधिकार और नियन्त्रण के छोटे घेरे से बाहर सोचने का अवसर देती है।"
    ],
    [
      30,
      "The vision includes terrifying destruction as well as beauty. Arjuna’s fear is part of encountering a universe that does not conform to human preferences; the passage does not glorify causing suffering.",
      "विश्वरूप में सौन्दर्य के साथ भयावह विनाश भी है। मनुष्य की इच्छा के अनुसार न चलने वाली सृष्टि के सामने अर्जुन का भय स्वाभाविक है। यह प्रसंग किसी को कष्ट देने की महिमा नहीं करता।"
    ],
    [
      34,
      "Time is revealed as the force through which forms pass away. Krishna’s instruction addresses Arjuna’s particular battlefield responsibility; it should not be detached from context to justify personal violence.",
      "काल को रूपों के विनाश की शक्ति के रूप में प्रकट किया गया है। कर्म का निर्देश अर्जुन की विशिष्ट युद्धभूमि और दुविधा से जुड़ा है। इसे सन्दर्भ से काटकर निजी हिंसा का औचित्य नहीं बनाना चाहिए।"
    ],
    [
      40,
      "Arjuna responds with praise and repeated reverence. The many divine names express recognition that no single familiar relationship or description had contained the full reality before him.",
      "अर्जुन स्तुति और बार-बार नमस्कार करते हैं। अनेक सम्बोधनों से वे स्वीकार करते हैं कि कोई एक परिचित सम्बन्ध या नाम उनके सामने उपस्थित सम्पूर्ण वास्तविकता को नहीं समेट पाया था।"
    ],
    [
      44,
      "Arjuna remembers speaking casually to Krishna as a friend and asks forgiveness. The insight is humility after a wider understanding, while the language of friendship and affection remains part of their relationship.",
      "अर्जुन मित्र मानकर किए सहज व्यवहार को याद करते हैं और क्षमा माँगते हैं। व्यापक बोध से नम्रता आती है। फिर भी उनके सम्बन्ध में मित्रता और स्नेह का भाव मिटता नहीं है।"
    ],
    [
      50,
      "Overwhelmed by the universal form, Arjuna asks for a familiar appearance. Krishna reassures him, showing that profound insight and the need for a gentle, approachable relationship can coexist.",
      "विश्वरूप से व्याकुल अर्जुन परिचित रूप देखने की प्रार्थना करते हैं। कृष्ण उन्हें आश्वस्त करते हैं। इससे स्पष्ट होता है कि गहरी अनुभूति के साथ सहज और स्नेहपूर्ण सम्बन्ध की आवश्यकता भी बनी रह सकती है।"
    ],
    [
      55,
      "The chapter concludes with devotion expressed through action, freedom from possessiveness, and absence of hostility. The test of vision is thus connected to how one lives, not only to an extraordinary experience.",
      "अध्याय कर्म, अनासक्ति और प्राणियों के प्रति वैरभाव के अभाव से जुड़ी भक्ति पर समाप्त होता है। इसलिए दर्शन की सार्थकता केवल विलक्षण अनुभव में नहीं, जीवन के व्यवहार में भी दिखाई देनी चाहिए।"
    ]
  ],
  "12": [
    [
      5,
      "Arjuna asks about devotion to a personal divine form and contemplation of the unmanifest. Both are acknowledged, while the unmanifest path is described as difficult for those whose experience is strongly bodily and relational.",
      "अर्जुन साकार ईश्वर की भक्ति और अव्यक्त की उपासना के विषय में पूछते हैं। दोनों मार्ग स्वीकार किए गए हैं। देह और सम्बन्धों पर आधारित अनुभव वाले साधक के लिए अव्यक्त का मार्ग कठिन बताया गया है।"
    ],
    [
      8,
      "Devotion joins dedicated work with inward attention. Holding mind and understanding toward the divine does not require rejecting ordinary life; it changes the center around which that life is lived.",
      "भक्ति में समर्पित कर्म और आन्तरिक स्मरण जुड़ते हैं। मन और बुद्धि को ईश्वर की ओर रखना सामान्य जीवन का त्याग नहीं है। इससे उस जीवन की दिशा और उसका केन्द्र बदलता है।"
    ],
    [
      12,
      "Krishna offers several accessible starting points: sustained attention, repeated practice, dedicated work, and relinquishment of results. The steps recognize different capacities and encourage beginning where sincere effort is possible.",
      "कृष्ण स्मरण, अभ्यास, समर्पित कर्म और फल के त्याग जैसे कई उपाय देते हैं। ये भिन्न सामर्थ्य वाले साधकों के लिए मार्ग खोलते हैं। जहाँ से ईमानदार प्रयास सम्भव हो, वहीं से शुरुआत की जा सकती है।"
    ],
    [
      16,
      "The dear devotee is described through friendliness, compassion, patience, and steadiness. Devotion becomes visible in relationships; it is not measured only by ritual or by how strongly one asserts a belief.",
      "प्रिय भक्त की पहचान मित्रता, करुणा, क्षमा और स्थिरता से होती है। भक्ति सम्बन्धों के व्यवहार में दिखती है। उसकी कसौटी केवल अनुष्ठान या अपने विश्वास की ऊँची घोषणा नहीं है।"
    ],
    [
      20,
      "Balance amid praise and blame is joined with goodwill and freedom from hostility. Such balance need not mean accepting abuse; it means that other people’s reactions do not completely determine one’s integrity.",
      "प्रशंसा और निन्दा में समता को सद्भाव और द्वेष के अभाव से जोड़ा गया है। समता का अर्थ दुर्व्यवहार सहते रहना नहीं। दूसरों की प्रतिक्रिया से अपना विवेक और चरित्र पूरी तरह संचालित न होने देना इसका भाव है।"
    ]
  ],
  "13": [
    [
      3,
      "Arjuna asks about the field and the knower of the field. Krishna distinguishes the changing body-mind experience from the awareness that knows it, opening an inquiry into identity rather than merely naming bodily parts.",
      "अर्जुन क्षेत्र और क्षेत्रज्ञ के विषय में पूछते हैं। कृष्ण बदलते शरीर-मन और उसे जानने वाली चेतना में भेद बताते हैं। यह केवल शरीर के अंग गिनने की नहीं, अपनी पहचान समझने की जिज्ञासा है।"
    ],
    [
      7,
      "The field includes physical elements, senses, desires, feelings, and their changes. Seeing them as observable aspects of experience helps distinguish “what is happening” from a complete definition of who one is.",
      "क्षेत्र में शरीर, इन्द्रियाँ, इच्छाएँ, अनुभूतियाँ और उनके परिवर्तन आते हैं। इन्हें अनुभव के देखे-समझे जा सकने वाले पक्ष मानने से जो घट रहा है और हमारी पूरी पहचान, दोनों में भेद समझ आता है।"
    ],
    [
      12,
      "Humility, non-harming, patience, self-restraint, and reflection are called knowledge because they prepare the mind to see clearly. Information alone is not enough when pride and agitation keep distorting perception.",
      "नम्रता, अहिंसा, धैर्य, संयम और विचार को ज्ञान कहा गया है, क्योंकि ये मन को स्पष्ट देखने योग्य बनाते हैं। यदि अभिमान और अशान्ति दृष्टि को विकृत करें, तो केवल जानकारी पर्याप्त नहीं होती।"
    ],
    [
      18,
      "The knowable reality is described through language that exceeds ordinary opposites. It is present throughout experience without being limited to any one object, challenging the habit of treating the ultimate as just another thing.",
      "ज्ञेय तत्त्व का वर्णन साधारण विरोधों से आगे की भाषा में है। वह सबमें उपस्थित है, पर किसी एक वस्तु तक सीमित नहीं। इससे परम सत्य को अन्य वस्तुओं जैसा ही मान लेने की आदत पर प्रश्न उठता है।"
    ],
    [
      23,
      "Nature supplies changing forms and activity, while the conscious principle experiences them. Bondage is associated with identification and attachment; understanding the distinction changes one’s relationship to experience.",
      "प्रकृति से बदलते रूप और क्रियाएँ आती हैं, जबकि चेतन तत्त्व उनका अनुभव करता है। गुणों के साथ अपनी पहचान और आसक्ति जोड़ने से बन्धन बनता है। भेद की समझ अनुभव से हमारा सम्बन्ध बदलती है।"
    ],
    [
      27,
      "Meditation, inquiry, disciplined action, and learning from others are presented as approaches to understanding. Their diversity encourages a sincere path suited to one’s capacities rather than contempt for another person’s starting point.",
      "ध्यान, विचार, अनुशासित कर्म और सुनकर सीखना समझ के मार्गों के रूप में आते हैं। यह विविधता अपनी क्षमता के अनुसार सच्ची साधना करने की प्रेरणा देती है, किसी दूसरे के आरम्भिक मार्ग का तिरस्कार करने की नहीं।"
    ],
    [
      31,
      "Seeing the same divine presence in all beings joins insight with non-harming. Equal spiritual vision challenges the tendency to value a person only through appearance, status, or usefulness.",
      "सब प्राणियों में समान परमात्मतत्त्व देखना ज्ञान को अहिंसा से जोड़ता है। यह दृष्टि किसी व्यक्ति का मूल्य केवल रूप, पद या उपयोगिता से तय करने की प्रवृत्ति को चुनौती देती है।"
    ],
    [
      35,
      "Space and the sun illustrate a self that is not stained by every changing condition of the field. Discernment between field and knower is presented as liberating understanding, not as denial of bodily needs.",
      "आकाश और सूर्य से समझाया गया है कि क्षेत्र के हर परिवर्तन से आत्मा लिप्त नहीं हो जाती। क्षेत्र और क्षेत्रज्ञ का विवेक मुक्ति की समझ है। इससे शरीर की आवश्यकताओं को नकारने का निर्देश नहीं मिलता।"
    ]
  ],
  "14": [
    [
      4,
      "Krishna introduces the relationship between the divine source and material nature. Diverse embodied lives are presented as participating in one larger origin, setting the context for the three qualities that follow.",
      "कृष्ण ईश्वर और प्रकृति के सम्बन्ध का वर्णन करते हैं। विभिन्न देहधारी जीवनों का एक व्यापक उद्गम बताया गया है। इसी आधार पर आगे प्रकृति के तीन गुणों को समझाया जाता है।"
    ],
    [
      9,
      "Sattva, rajas, and tamas describe clarity, restless striving, and obscuration. Each can bind through a different attachment; they are changing tendencies to observe, not permanent labels for ranking people.",
      "सत्त्व, रज और तम स्पष्टता, चंचल प्रवृत्ति और आवरण के रूप में समझाए गए हैं। प्रत्येक अपने ढंग की आसक्ति से बाँधता है। ये पहचानने योग्य बदलती प्रवृत्तियाँ हैं, लोगों को स्थायी श्रेणियों में बाँटने के नाम नहीं।"
    ],
    [
      13,
      "The qualities become noticeable through understanding, restlessness, negligence, and other signs. Learning to notice the current tendency creates room for a conscious response instead of simply acting out the mood.",
      "समझ, बेचैनी, प्रमाद और अन्य लक्षणों से गुणों का प्रभाव पहचाना जाता है। वर्तमान प्रवृत्ति को पहचानने पर उसके वश में तुरन्त कर्म करने के बजाय सजग प्रतिक्रिया चुनने की जगह मिलती है।"
    ],
    [
      18,
      "Different actions and dominant tendencies have different consequences. The chapter links clarity with growth and negligence with confusion, inviting responsibility for the conditions one repeatedly cultivates.",
      "अलग कर्म और प्रधान प्रवृत्तियाँ अलग परिणाम लाती हैं। स्पष्टता को उन्नति और प्रमाद को भ्रम से जोड़ा गया है। इससे अपने भीतर बार-बार पोषित किए जाने वाले स्वभाव के प्रति जिम्मेदारी लेने की प्रेरणा मिलती है।"
    ],
    [
      20,
      "Freedom grows through recognizing the qualities as processes of nature rather than the whole self. This insight loosens compulsive identification with changing moods, achievements, and bodily conditions.",
      "गुणों को प्रकृति की प्रक्रियाएँ समझना और उन्हें अपना सम्पूर्ण स्वरूप न मानना स्वतन्त्रता बढ़ाता है। इससे बदलती मनःस्थिति, उपलब्धि और शारीरिक अवस्थाओं के साथ चिपकी हुई पहचान ढीली होती है।"
    ],
    [
      27,
      "Arjuna asks what freedom from the qualities looks like in conduct. Krishna points to steadiness, reduced dependence on praise and possessions, and devoted practice that sustains this wider understanding.",
      "अर्जुन पूछते हैं कि गुणों से ऊपर उठना आचरण में कैसे दिखाई देता है। कृष्ण स्थिरता, प्रशंसा और संग्रह पर कम निर्भरता तथा इस समझ को मजबूत करने वाली भक्ति की ओर संकेत करते हैं।"
    ]
  ],
  "15": [
    [
      4,
      "The inverted tree represents a world sustained by a deeper root, with desire extending its branches. Cutting attachment means loosening possessiveness, not destroying relationships or refusing everyday responsibilities.",
      "उल्टा वृक्ष उस संसार का प्रतीक है जिसका आधार गहरा है और जिसकी शाखाएँ इच्छा से फैलती हैं। आसक्ति काटने का अर्थ ममता का आग्रह कम करना है, सम्बन्ध तोड़ना या दैनिक दायित्वों से भागना नहीं।"
    ],
    [
      6,
      "Freedom from pride, compulsive attachment, and the domination of opposites prepares the seeker for the highest state. The emphasis is on transformation of outlook rather than acquiring one more worldly possession.",
      "अभिमान, अनिवार्य आसक्ति और सुख-दुःख के वश में रहने से मुक्ति साधक को परम अवस्था की ओर ले जाती है। मुख्य बात दृष्टि का परिवर्तन है, संसार की एक और वस्तु प्राप्त कर लेना नहीं।"
    ],
    [
      11,
      "The embodied self is pictured as carrying the mind and senses through changing conditions. Disciplined attention is needed to recognize this spiritual dimension beyond the immediately visible body.",
      "जीव को बदलती अवस्थाओं में मन और इन्द्रियों के साथ चलते हुए बताया गया है। केवल दिखाई देने वाले शरीर से आगे इस आध्यात्मिक आयाम को समझने के लिए संयमित और सजग दृष्टि आवश्यक है।"
    ],
    [
      15,
      "Light, nourishment, digestion, memory, and understanding are described as supported by the divine. These ordinary dependencies can become occasions for gratitude and awareness of a sustaining whole.",
      "प्रकाश, पोषण, पाचन, स्मृति और ज्ञान का आधार ईश्वर बताया गया है। जीवन की ये सामान्य निर्भरताएँ कृतज्ञता और अपने को सँभालने वाली व्यापक सत्ता की सजगता का अवसर बन सकती हैं।"
    ],
    [
      20,
      "The perishable, the imperishable, and the supreme person are distinguished to complete the inquiry into reality. Understanding is fulfilled in devoted living, joining philosophical clarity with the direction of one’s life.",
      "क्षर, अक्षर और पुरुषोत्तम का भेद तत्त्व की चर्चा को पूर्ण करता है। समझ भक्ति और जीवन की दिशा में उतरकर सार्थक होती है। यहाँ दार्शनिक स्पष्टता और समर्पित आचरण साथ आते हैं।"
    ]
  ],
  "16": [
    [
      3,
      "The divine qualities are ethical capacities such as courage, truthfulness, compassion, restraint, and humility. They offer a direction for practice, not a claim that a person must already be flawless to begin.",
      "दैवी गुणों में निर्भयता, सत्य, करुणा, संयम और नम्रता जैसे नैतिक सामर्थ्य आते हैं। ये अभ्यास की दिशा हैं। साधना शुरू करने के लिए पहले से पूर्णतः निर्दोष होना आवश्यक नहीं है।"
    ],
    [
      6,
      "Arrogance, harshness, anger, and ignorance are contrasted with qualities that free the mind. The distinction concerns conduct and tendencies, and should not become an excuse to dehumanize a group of people.",
      "अभिमान, कठोरता, क्रोध और अज्ञान को मुक्ति देने वाले गुणों से अलग दिखाया गया है। भेद आचरण और प्रवृत्तियों का है। इसे किसी समूह को मनुष्य से हीन मानने का आधार नहीं बनाना चाहिए।"
    ],
    [
      12,
      "A life driven by unchecked craving loses a stable sense of enough. The text shows how denial of ethical limits can combine with anxiety and the pursuit of possessions.",
      "अनियन्त्रित इच्छा से चलने वाले जीवन में ‘पर्याप्त’ की स्थिर समझ खो जाती है। नैतिक मर्यादा का निषेध बेचैनी और संग्रह की दौड़ से कैसे जुड़ सकता है, यह यहाँ दिखाया गया है।"
    ],
    [
      18,
      "The repeated language of “I” and “mine” portrays a self enclosed by power and comparison. Its problem is not achievement itself, but an arrogant outlook that treats others as obstacles or objects.",
      "बार-बार ‘मैं’ और ‘मेरा’ का भाव शक्ति और तुलना में बन्द व्यक्तित्व दिखाता है। समस्या उपलब्धि होना नहीं, वह अभिमानी दृष्टि है जो दूसरों को बाधा या उपयोग की वस्तु बना देती है।"
    ],
    [
      21,
      "Destructive tendencies have painful consequences, and desire, anger, and greed are named as gateways to downfall. Recognizing these patterns early makes self-correction possible before they dominate decisions.",
      "विनाशकारी प्रवृत्तियों के दुःखद परिणाम होते हैं। काम, क्रोध और लोभ को पतन के द्वार कहा गया है। इन्हें आरम्भ में पहचानने से निर्णयों पर हावी होने से पहले अपने को सुधारने का अवसर मिलता है।"
    ],
    [
      24,
      "The chapter ends by calling for ethical guidance rather than impulsive desire as the basis of action. Study should support thoughtful conduct; invoking scripture does not remove the need to understand a teaching’s context.",
      "अध्याय के अन्त में आवेगपूर्ण इच्छा के बजाय शास्त्रीय और नैतिक विवेक से कर्म चुनने को कहा गया है। अध्ययन का फल समझदार आचरण होना चाहिए। केवल उद्धरण देने से प्रसंग समझने की आवश्यकता समाप्त नहीं होती।"
    ]
  ],
  "17": [
    [
      6,
      "Faith reflects the tendencies a person cultivates and shapes what they pursue. The rejection of harmful austerities is especially important: inflicting suffering on oneself or others is not proof of spiritual depth.",
      "श्रद्धा व्यक्ति की पोषित प्रवृत्तियों को व्यक्त करती है और उसके लक्ष्य को दिशा देती है। हानिकारक तप का निषेध विशेष महत्त्वपूर्ण है। अपने या दूसरों के शरीर को कष्ट देना आध्यात्मिक गहराई का प्रमाण नहीं है।"
    ],
    [
      10,
      "Food is discussed through its effects on vitality, satisfaction, and heaviness. The practical principle is attentive nourishment; these categories should not be used to shame someone’s access to food or medical dietary needs.",
      "भोजन का विचार उसके जीवनशक्ति, तृप्ति और जड़ता पर पड़ने वाले प्रभाव से किया गया है। व्यावहारिक भाव सजग पोषण का है। उपलब्ध भोजन या चिकित्सकीय आवश्यकता के कारण किसी को अपमानित करना इसका उद्देश्य नहीं है।"
    ],
    [
      13,
      "An offering differs according to its intention, care, and expectation of reward. Outward ceremony alone cannot establish sincerity when the action is driven by vanity or performed without attention.",
      "यज्ञ का स्वरूप उसके भाव, सावधानी और फल की अपेक्षा से बदलता है। यदि कर्म दिखावे के लिए या ध्यान के बिना हो, तो केवल बाहरी विधि से उसकी शुद्धता सिद्ध नहीं होती।"
    ],
    [
      16,
      "Discipline includes body, speech, and mind. Truthful, beneficial, considerate speech is paired with inward calm; the teaching asks not only what is said, but how and why it is said.",
      "तप शरीर, वाणी और मन तीनों से जुड़ा है। सत्य, हितकारी और अनुद्वेगकारी वचन के साथ मन की शान्ति भी आवश्यक है। बात केवल क्या कहा गया की नहीं, कैसे और किस भाव से कहा गया की भी है।"
    ],
    [
      19,
      "Austerity is evaluated by motive as well as difficulty. Steady discipline differs from performance for admiration or practices that arise from confusion and harm.",
      "तप का मूल्य कठिनाई के साथ उसके उद्देश्य से भी तय होता है। नियमित और विवेकपूर्ण अनुशासन, प्रशंसा के लिए किए प्रदर्शन या अज्ञान और हानि से उत्पन्न व्यवहार से भिन्न है।"
    ],
    [
      22,
      "Giving is most constructive when guided by need, respect, and appropriate circumstances. Expecting repayment or humiliating the recipient changes a gift into an instrument of self-interest.",
      "दान आवश्यकता, सम्मान और उचित परिस्थिति को ध्यान में रखकर देना चाहिए। प्रतिफल की अपेक्षा या पाने वाले का अपमान अर्पण को स्वार्थ का साधन बना देता है।"
    ],
    [
      28,
      "Om, Tat, and Sat connect an offering with truth and a purpose larger than private reward. The closing emphasis is sincerity: the inner orientation of an act matters alongside its visible form.",
      "ॐ, तत् और सत् अर्पण को सत्य और निजी फल से बड़े उद्देश्य से जोड़ते हैं। अन्त में श्रद्धा और सच्चे भाव पर बल है। कर्म का बाहरी रूप जितना महत्त्वपूर्ण है, उसकी आन्तरिक दिशा भी उतनी ही है।"
    ]
  ],
  "18": [
    [
      6,
      "Arjuna asks about renunciation and relinquishment. Krishna distinguishes giving up desire-driven acts from releasing possessiveness over results, while retaining practices that cultivate generosity and self-discipline.",
      "अर्जुन संन्यास और त्याग का भेद पूछते हैं। कृष्ण कामनाजनित कर्म छोड़ने और कर्मफल के प्रति ममता छोड़ने में अन्तर बताते हैं। दान और आत्मसंयम बढ़ाने वाले कर्तव्यपूर्ण अभ्यासों का स्थान बना रहता है।"
    ],
    [
      12,
      "Abandoning responsibility out of confusion or fear of discomfort differs from acting without selfish attachment. Since embodied life involves action, freedom is sought in the quality of participation rather than total inactivity.",
      "मोह या कष्ट के भय से दायित्व छोड़ना और स्वार्थपूर्ण आसक्ति के बिना कर्म करना अलग हैं। देहधारी जीवन में कर्म रहता है। इसलिए स्वतन्त्रता सम्पूर्ण निष्क्रियता में नहीं, कर्म में भाग लेने के भाव में खोजी जाती है।"
    ],
    [
      17,
      "Several causes contribute to every action, so the isolated ego cannot claim complete authorship. This teaching loosens arrogance; it must not be used to deny accountability for deliberate harm.",
      "प्रत्येक कर्म के अनेक कारण होते हैं, इसलिए अकेला अहंकार उसका पूरा कर्ता होने का दावा नहीं कर सकता। यह समझ अभिमान कम करती है। जानबूझकर की गई हानि की जिम्मेदारी नकारना इसका अर्थ नहीं है।"
    ],
    [
      22,
      "Knowledge differs according to whether it sees a shared reality, only separate interests, or merely a narrow fragment. The comparison invites a wider view before judging a situation.",
      "ज्ञान की भिन्नता इस बात से है कि वह साझा सत्य देखता है, केवल अलग-अलग हित देखता है या किसी छोटे अंश को ही सब कुछ मान लेता है। शिक्षा निर्णय से पहले दृष्टि व्यापक करने की है।"
    ],
    [
      28,
      "Action and the doer are examined through motive, steadiness, attachment, and care. A task’s appearance alone does not tell us whether it is guided by clarity, restless ambition, or negligence.",
      "कर्म और कर्ता का परीक्षण भाव, धैर्य, आसक्ति और सावधानी से किया गया है। केवल काम का बाहरी रूप यह नहीं बताता कि उसमें स्पष्टता है, व्याकुल महत्वाकांक्षा है या लापरवाही।"
    ],
    [
      35,
      "Intelligence discerns what leads toward freedom or bondage, while firmness sustains a chosen direction. Persistence needs wise judgment: determination alone can also keep an unhealthy pattern in place.",
      "बुद्धि बन्धन और मुक्ति की दिशा पहचानती है, जबकि धृति चुनी हुई राह पर बनाए रखती है। दृढ़ता के साथ विवेक आवश्यक है। केवल अड़े रहने से हानिकारक आदत भी चलती रह सकती है।"
    ],
    [
      40,
      "Pleasure is considered through its development over time, not just its first impression. Some helpful practices begin with difficulty, while immediately attractive habits may later bring agitation or dullness.",
      "सुख को केवल पहली अनुभूति से नहीं, समय के साथ उसके प्रभाव से देखा गया है। कुछ हितकारी अभ्यास आरम्भ में कठिन लगते हैं। तुरन्त आकर्षक लगी आदतें आगे बेचैनी या जड़ता ला सकती हैं।"
    ],
    [
      48,
      "The discussion of work relates capacities and responsibilities to social life in the text’s historical setting. Its emphasis on sincere work can be practiced without treating inherited caste as a limit on anyone’s dignity or opportunities.",
      "कर्म की चर्चा ग्रन्थ के ऐतिहासिक सामाजिक परिवेश में स्वभाव और दायित्व से जुड़ती है। अपने कार्य में ईमानदारी का भाव अपनाया जा सकता है, बिना जन्मगत जाति को किसी की गरिमा या अवसर की सीमा बनाए।"
    ],
    [
      55,
      "Self-discipline, a quieter mind, and freedom from possessiveness prepare a person for spiritual understanding. Knowledge and devotion meet here: clarity is expressed in the way one relates to the divine and to life.",
      "आत्मसंयम, शान्त मन और ममता का क्षय आध्यात्मिक समझ की तैयारी करते हैं। यहाँ ज्ञान और भक्ति मिलते हैं। स्पष्टता ईश्वर और जीवन के साथ व्यवहार के ढंग में व्यक्त होती है।"
    ],
    [
      62,
      "Krishna asks Arjuna to act with dedication while recognizing the forces shaping his nature. The language of refuge points toward trust and inner surrender, not toward abandoning practical discernment.",
      "कृष्ण अर्जुन को अपने स्वभाव के प्रभावों को पहचानते हुए समर्पण से कर्म करने को कहते हैं। शरण की भाषा विश्वास और आन्तरिक समर्पण बताती है। इससे व्यावहारिक विवेक छोड़ने का निर्देश नहीं मिलता।"
    ],
    [
      66,
      "Krishna asks Arjuna to reflect fully and then choose, before giving the intimate teaching of wholehearted refuge. Surrender here can be understood as releasing ego-centered reliance; it is not a license to ignore ethics or harm others.",
      "कृष्ण पूरी बात पर विचार करके अर्जुन को स्वयं चुनने को कहते हैं, फिर अनन्य शरण की आत्मीय शिक्षा देते हैं। समर्पण अहंकार-केंद्रित आश्रय छोड़ने का मार्ग है। इससे नैतिकता या दूसरों की सुरक्षा की उपेक्षा की छूट नहीं मिलती।"
    ],
    [
      71,
      "Teaching is presented as a responsibility requiring receptivity and respect. Sharing the dialogue is valuable when it helps understanding, not when it becomes an excuse to force belief or win an argument.",
      "शिक्षा देना सम्मान और ग्रहणशीलता से जुड़ा दायित्व है। संवाद बाँटना तब उपयोगी है जब उससे समझ बढ़े। विश्वास थोपना या विवाद जीतना उसके प्रसार का उद्देश्य नहीं होना चाहिए।"
    ],
    [
      73,
      "Krishna asks whether the teaching has been understood, and Arjuna answers that his confusion has cleared. The dialogue ends with a considered willingness to act, showing understanding through a decision rather than words alone.",
      "कृष्ण पूछते हैं कि क्या बात समझ में आई और अर्जुन कहते हैं कि उनका मोह दूर हुआ है। संवाद विचारपूर्वक कर्म करने की तत्परता पर पहुँचता है। समझ केवल शब्दों में नहीं, निर्णय में भी दिखाई देती है।"
    ],
    [
      78,
      "Sanjaya recalls the conversation with wonder and gratitude. The closing image brings wisdom and committed action together: insight needs practical participation, and action benefits from a clear guiding understanding.",
      "संजय विस्मय और कृतज्ञता से संवाद का स्मरण करते हैं। अन्तिम चित्र में ज्ञान और समर्पित कर्म साथ आते हैं। समझ को व्यवहार चाहिए और कर्म को दिशा देने वाला स्पष्ट विवेक।"
    ]
  ]
};
export function getExplanation(chapter:number,verse:number):Explanation{const passages=PASSAGES[chapter];if(!passages)throw new Error("Missing chapter explanation "+chapter);let start=1;for(const [end,en,hi] of passages){if(verse>=start&&verse<=end)return {en,hi,start,end};start=end+1;}throw new Error("Missing explanation "+chapter+"."+verse);}

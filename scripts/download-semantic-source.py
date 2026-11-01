from pathlib import Path
import requests,time
REV='73908c3438cf03b6a01bcb9611d62b23d0726f08'
ROOT=Path('.cache/gita-semantic')
ROOT.mkdir(parents=True,exist_ok=True)
for name in ['tokenizer.json','model.safetensors','README.md']:
    target=ROOT/name
    if target.exists():
        print('Cached',name,target.stat().st_size,flush=True)
        continue
    url=f'https://huggingface.co/minishlab/potion-multilingual-128M/resolve/{REV}/{name}'
    with requests.get(url,stream=True,timeout=(30,120)) as response:
        response.raise_for_status()
        temporary=target.with_suffix(target.suffix+'.part')
        size=0
        last=0
        with temporary.open('wb') as output:
            for block in response.iter_content(1024*1024):
                output.write(block);size+=len(block)
                if size-last>64*1024*1024:
                    print(name,round(size/1024/1024),'MiB',flush=True);last=size
        temporary.replace(target)
    print('Downloaded',name,target.stat().st_size,flush=True)

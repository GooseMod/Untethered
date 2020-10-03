(async function() {
    window.gmUntethered = '3.0.0';

    let el = document.getElementsByClassName('fixClipping-3qAKRb')[0];
    if (el !== undefined) el.style.backgroundColor = '#050505';

    let el2 = document.getElementsByClassName('tip-2cgoli')[0];
    if (el2 !== undefined) el2.innerHTML += `<br><br>GooseMod Untethered v\${window.gmUntethered}`;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const awaitIframe = (iframe) => {
      return new Promise((res) => {
        iframe.addEventListener("load", function() {
          res();
        });
      })
    };
    
    this.cspBypasser = {
      frame: document.createElement('iframe'),
  
      init: async () => {
        this.cspBypasser.frame.src = 'discord:';
        document.body.appendChild(this.cspBypasser.frame);
  
        //await awaitIframe(this.cspBypasser.frame);
  
        let script = document.createElement('script');
        script.type = 'text/javascript';
  
        let code = `
        window.addEventListener('message', async (e) => {
          const {url, type, useCORSProxy} = e.data;
  
          const proxyURL = useCORSProxy ? \`https://cors-anywhere.herokuapp.com/\${url}\` : url;
  
          if (type === 'img') {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
  
            let img = new Image();
            img.src = proxyURL;
            img.crossOrigin = 'anonymous';
  
            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
  
              ctx.drawImage(img, 0, 0);
  
              e.source.postMessage(canvas.toDataURL("image/png"));
            };
  
            return;
          }       
          
          const req = await fetch(proxyURL, {
            cache: 'no-store'
          });
  
          e.source.postMessage(type === 'json' ? await req.json() : (type === 'text' ? await req.text() : await req.blob()));
        }, false);`;
  
        script.appendChild(document.createTextNode(code));
  
        this.cspBypasser.frame.contentDocument.head.appendChild(script);
      },
  
      runCode: (code) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
  
        script.appendChild(document.createTextNode(code));
  
        this.cspBypasser.frame.contentDocument.head.appendChild(script);
      },
  
      json: (url, useCORSProxy = true) => {
        return new Promise((res) => {
          this.cspBypasser.frame.contentWindow.postMessage({url, type: 'json', useCORSProxy});
  
          window.addEventListener('message', async (e) => {
            res(e.data);
          }, false);
        });
      },
  
      text: (url, useCORSProxy = true) => {
        return new Promise((res) => {
          this.cspBypasser.frame.contentWindow.postMessage({url, type: 'text', useCORSProxy});
  
          window.addEventListener('message', async (e) => {
            res(e.data);
          }, false);
        });
      },
  
      blob: (url, useCORSProxy = true) => {
        return new Promise((res) => {
          this.cspBypasser.frame.contentWindow.postMessage({url, type: 'blob', useCORSProxy});
  
          window.addEventListener('message', async (e) => {
            res(e.data);
          }, false);
        });
      },
  
      image: (url, useCORSProxy = true) => {
        return new Promise((res) => {
          this.cspBypasser.frame.contentWindow.postMessage({url, type: 'img', useCORSProxy});
  
          window.addEventListener('message', async (e) => {
            res(e.data);
          }, false);
        });
      },
    };
    
    await this.cspBypasser.init();

    const code = await this.cspBypasser.text('https://goosemod-api.netlify.app/inject.js', false);

    if (el2 !== undefined) el2.innerHTML += `<br>Ready`;
    
    while (true) {
      if (document.querySelector('button[aria-label="User Settings"]') !== null) break;
      
      await sleep(50);
    }
    
    (async function(cspBypasser, code) { eval(code); })(this.cspBypasser, code);
  }).bind({})();
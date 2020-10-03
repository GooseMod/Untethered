try {
  if (typeof require === 'undefined') { // Web
    require = () => ({ webFrame: { top: { context: undefined } } });
  }

  (require('electron').webFrame.top.context || window).eval(`
  (async function() {
    window.gmUntetheredBase = '1.0.1';

    this.cspBypasser = {
      frame: document.createElement('iframe'),
  
      init: async () => {
        this.cspBypasser.frame.src = 'discord:';
        document.body.appendChild(this.cspBypasser.frame);
  
        //await awaitIframe(this.cspBypasser.frame);
  
        let script = document.createElement('script');
        script.type = 'text/javascript';
  
        let code = \`
        window.addEventListener('message', async (e) => {
          const {url, type, useCORSProxy} = e.data;
  
          const proxyURL = useCORSProxy ? \\\`https://cors-anywhere.herokuapp.com/\\\${url}\\\` : url;
  
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
        }, false);\`;
  
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

    const code = await this.cspBypasser.text('https://goosemod-api.netlify.app/untethered/untetheredInject.js', false);
    
    while (true) {
      if (document.querySelector('button[aria-label="User Settings"]') !== null) break;
      
      await sleep(50);
    }
    
    (async function(cspBypasser, code) { eval(code); })(this.cspBypasser, code);
  }).bind({})();`);
} catch (e) { console.error(e); }
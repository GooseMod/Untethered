(async function() {
  window.gmUntethered = '5.4.1';

  // Bypass to get Local Storage (Discord block / remove it) - Source / credit: https://stackoverflow.com/questions/52509440/discord-window-localstorage-is-undefined-how-to-get-access-to-the-localstorage
  function getLocalStoragePropertyDescriptor() {
    const frame = document.createElement('frame');
    frame.src = 'about:blank';

    document.body.appendChild(frame);

    let r = Object.getOwnPropertyDescriptor(frame.contentWindow, 'localStorage');

    frame.remove();

    return r;
  }

  let injected = false;

  document.addEventListener('keydown', (e) => {
    if (injected) return;

    if (e.code === 'KeyH') {
      window.gmSafeMode = true;
    }
  });

  // Re-make window.localStorage for Untethered settings
  Object.defineProperty(window, 'localStorage', getLocalStoragePropertyDescriptor());

  const branchURLs = {
    'release': 'https://goosemod-api.netlify.app/inject.js',
    'dev': `https://raw.githack.com/GooseMod/Injector/master/dist/index.js?_=${Date.now()}`
  };

  const branch = localStorage.getItem('goosemodUntetheredBranch') || 'release';

  let el2 = document.getElementsByClassName('tip-2cgoli')[0];
  if (el2 !== undefined) el2.innerHTML += `<br><br>GooseMod Untethered v${window.gmUntethered}`;
  
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const code = await (await fetch(branchURLs[branch])).text();
  
  if (el2 !== undefined) el2.innerHTML += `<br>Ready`;
  
  while (true) {
    if (document.querySelectorAll('.flex-1xMQg5.flex-1O1GKY.horizontal-1ae9ci.horizontal-2EEEnY.flex-1O1GKY.directionRow-3v3tfG.justifyStart-2NDFzi.alignStretch-DpGPf3.noWrap-3jynv6 > [type="button"]:last-child').length !== 0 && window.webpackJsonp !== undefined) break;

    await sleep(50);
  }
  
  injected = true;
  
  eval(code);
}).bind({})();

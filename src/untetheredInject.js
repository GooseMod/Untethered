(async function() {
  window.gmUntethered = '5.0.0';
  
  let el = document.getElementsByClassName('fixClipping-3qAKRb')[0];
  if (el !== undefined) el.style.backgroundColor = '#050505';
  
  let el2 = document.getElementsByClassName('tip-2cgoli')[0];
  if (el2 !== undefined) el2.innerHTML += `<br><br>GooseMod Untethered v${window.gmUntethered}`;
  
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const code = await (await fetch('https://goosemod-api.netlify.app/inject.js')).text();
  
  if (el2 !== undefined) el2.innerHTML += `<br>Ready`;
  
  while (true) {
    if (document.querySelector('button[aria-label="User Settings"]') !== null && window.webpackJsonp !== undefined) break;
    
    await sleep(50);
  }
  
  eval(code);
}).bind({})();
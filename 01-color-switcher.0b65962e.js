const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};let n=null;t.startBtn.addEventListener("click",(function(){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,n=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(n)}));
//# sourceMappingURL=01-color-switcher.0b65962e.js.map

!function(e){function t(t){for(var r,i,s=t[0],c=t[1],a=t[2],f=0,p=[];f<s.length;f++)i=s[f],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(l&&l(t);p.length;)p.shift()();return u.push.apply(u,a||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},u=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var u,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=function(e){return i.p+""+({}[e]||e)+".js"}(e);var c=new Error;u=function(t){s.onerror=s.onload=null,clearTimeout(a);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+u+")",c.name="ChunkLoadError",c.type=r,c.request=u,n[1](c)}o[e]=void 0}};var a=setTimeout((function(){u({type:"timeout",target:s})}),12e4);s.onerror=s.onload=u,document.head.appendChild(s)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var a=0;a<s.length;a++)t(s[a]);var l=c;u.push([85,1]),n()}({78:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);n(41),n(47),n(78),n(39),n(80),n(84),n.p,n.p,n.p;document.body.appendChild(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Hello world",t=document.createElement("div");return t.className="pure-button",t.innerHTML=e,t.onclick=function(){n.e(2).then(n.bind(null,86)).then((function(e){t.textContent=e.default})).catch((function(e){console.error(e)}))},t}()),document.body.insertAdjacentHTML("beforeend",'<p class="title">TITLE</p>'),document.body.insertAdjacentHTML("afterbegin",'<svg class="test">\n        <use xlink:href="spritesheet.svg#sprite"></use>\n    </svg>\n    <svg class="test">\n        <use xlink:href="spritesheet.svg#css"></use>\n    </svg>\n    <svg class="test">\n        <use xlink:href="spritesheet.svg#github"></use>\n    </svg>\n    ')}});
//# sourceMappingURL=main.js.map
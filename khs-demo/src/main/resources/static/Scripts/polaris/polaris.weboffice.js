window.PolarisWebOffice=(e=>e.length>1&&((t,n)=>new Promise((s,c)=>{const i=document.getElementById(t);if(!i)return;const a=document.createElement("iframe");a.style.width="100%",a.style.height="100%",a.style.border="none",a.src="/Scripts/polaris/inner_index.html",a.onload=()=>{const t=a.contentDocument;e.forEach(e=>{const n=(e=>{if(e.includes(".js")){const t=document.createElement("script");return t.src=e,t}if(e.includes(".css")){const t=document.createElement("link");return t.rel="stylesheet",t.href=e,t}})(e);n&&t.head.append(n)});const i=e=>{e.detail(t.body,n).then(e=>s(e)).catch(e=>c(e)),t.removeEventListener("polaris.load",i)};t.addEventListener("polaris.load",i)},i.append(a);const o=document.createElement("meta");o.setAttribute("name","viewport"),o.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"),a.append(o)})))(["/Scripts/polaris/static/css/main.da2a96c4.css","/Scripts/polaris/static/js/main.6fc7ef27.js"]);
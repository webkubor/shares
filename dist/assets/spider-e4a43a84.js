import{_ as e}from"./index-8f0d488d.js";import{a as n,a8 as t,ad as o,o as i,m as a}from"./.pnpm-aa7558b5.js";const r={ref:"canvasRef"};const s=e({setup(){const e=n(null);let i,a,r,s;function c(){const e=document.getElementsByTagName("script"),n=e[e.length-1];return{zIndex:n.getAttribute("zIndex")||-1,opacity:n.getAttribute("opacity")||.5,color:n.getAttribute("color")||"0,0,0",count:n.getAttribute("count")||99}}function u(){const{innerWidth:e,innerHeight:n}=window;i.width=e,i.height=n}function l(e){s.x=e.clientX,s.y=e.clientY}function d(){s.x=null,s.y=null}function m(){const{innerWidth:e,innerHeight:n}=window;a.clearRect(0,0,e,n),r.forEach((t=>{t.x+=t.xa,t.y+=t.ya,t.xa=t.xa*(t.x>e||t.x<0?-1:1),t.ya=t.ya*(t.y>n||t.y<0?-1:1),a.fillRect(t.x-.5,t.y-.5,1,1);const o=[s,...r];for(let e=0;e<o.length;e++){const n=o[e];if(t!==n&&null!==n.x&&null!==n.y){const e=t.x-n.x,o=t.y-n.y,i=e*e+o*o;if(i<n.max){n===s&&i>n.max/2&&(t.x-=.03*e,t.y-=.03*o);const r=(n.max-i)/n.max;a.beginPath(),a.lineWidth=r/2,a.strokeStyle=`rgba(${c().color},${r+.2})`,a.moveTo(t.x,t.y),a.lineTo(n.x,n.y),a.stroke()}}}o.splice(o.indexOf(t),1)})),requestAnimationFrame(m)}return t((()=>{i=e.value,a=i.getContext("2d"),u(),function(){const{innerWidth:e,innerHeight:n}=window,{count:t}=c();r=[];for(let o=0;o<t;o++){const t={x:Math.random()*e,y:Math.random()*n,xa:2*Math.random()-1,ya:2*Math.random()-1,max:6e3};r.push(t)}}(),s={x:null,y:null,max:2e4},window.addEventListener("mousemove",l),window.addEventListener("mouseout",d),m(),window.addEventListener("resize",u)})),o((()=>{window.removeEventListener("mousemove",l),window.removeEventListener("mouseout",d),window.removeEventListener("resize",u)})),{canvasRef:e}}},[["render",function(e,n,t,o,s,c){return i(),a("canvas",r,null,512)}]]);export{s as default};

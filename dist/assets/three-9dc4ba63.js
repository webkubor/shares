import{a as e,a8 as a,ad as n,J as t,ae as i,af as o,ag as s,ah as d,ai as r,aj as l,ak as w,al as c,am as m,an as u,ao as h,ap as p,aq as v,ar as f,o as g,m as b}from"./.pnpm-6a7a59e5.js";import{_ as j}from"./index-17ff5632.js";const _=j({__name:"three",setup(j){const _=e(null),x=e(2.5),z=e(.008);let H,W,P,R,S,k,y,E;function F(){P.aspect=innerWidth/innerHeight,P.updateProjectionMatrix(),R.setSize(innerWidth,innerHeight),R.clear(),R.render(y,P)}function q(){S.rotation.y+=z.value,R.render(y,P),E&&E.update(),k=requestAnimationFrame(q)}return a((()=>{H=_.value.clientWidth,W=_.value.clientHeight,R=new i({antialias:!0,alpha:!0}),R.setSize(window.innerWidth,window.innerHeight),R.setPixelRatio(window.devicePixelRatio),_.value.appendChild(R.domElement),P=new l(75,window.innerWidth/window.innerHeight,.1,1e3),P.position.set(0,0,6),y=new o,y.background=new s(133412),y.fog=new d(133412,200,1e3),window.scene=y,E=new r(P,R.domElement),E.enableDamping=!0,E.enableZoom=!0,E.autoRotate=!1,E.autoRotateSpeed=2,E.enablePan=!0,function(){const e=new w(x.value,32,32),a=(new c).load("https://webjunjun.github.io/wechat/earth.jpg");a.minFilter=m;const n=new u({map:a});S=new h(e,n),y.add(S)}(),function(){const e=new p(13421772,1.1);y.add(e),(n=new v(16777215,.2)).position.set(1,.1,0).normalize();var a=new v(267583487,.2);a.position.set(1,.1,.1).normalize(),y.add(n),y.add(a);var n,t=new f(16777215,4473924,.2);t.position.set(0,1,0),y.add(t),(n=new v(16777215)).position.set(1,500,-20),n.castShadow=!0,n.shadow.camera.top=18,n.shadow.camera.bottom=-10,n.shadow.camera.left=-52,n.shadow.camera.right=12,y.add(n)}(),q(),window.addEventListener("resize",F,!1)})),n((()=>{cancelAnimationFrame(k)})),t((()=>{S&&(S.scale.set(x.value,x.value,x.value),S.rotation.y=0)})),(e,a)=>(g(),b("div",{class:"earth",ref_key:"canvasContainer",ref:_},null,512))}},[["__scopeId","data-v-4fc74e6f"]]);export{_ as default};
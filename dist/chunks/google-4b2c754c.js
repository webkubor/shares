import{at as a,f as e,G as t,o as c,c as n,aB as s,aA as l,ay as o,az as A,aD as i,aC as u,aJ as p,aK as d}from"../assets/index-648af22d.js";const r=u("div",null," 网站秘钥 6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP ",-1),f=u("div",null," 服务器秘钥：6LcTelEpAAAAAI-OY2JMcjHcnm-n2I7i7K5wbVSZ ",-1),g="6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP",w={__name:"google",setup(u){let w=a({captchaCode:{}});function x(){grecaptcha.ready((function(){grecaptcha.execute(g,{action:"login"}).then((function(a){let e={action:"login",token:a,key:g};w.captchaCode=JSON.stringify(e,null,2),window.$message.success("验证成功,请打开控制台，看输出内容")}))}))}return e(!1),t((()=>{})),(a,e)=>{const t=p,u=d;return c(),n(u,null,{default:s((()=>[r,f,l(t,{onClick:x},{default:s((()=>[o("V3无感知登录")])),_:1}),l(u,{title:"结果"},{default:s((()=>[o(A(i(w).captchaCode),1)])),_:1})])),_:1})}}};export{w as default};
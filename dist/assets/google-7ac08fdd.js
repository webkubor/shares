import{r as a,a as e,a8 as t,o as c,c as n,w as l,f as s,z as o,y as A,e as i,q as u,B as p,a5 as r}from"./.pnpm-8b9d43dd.js";const d=u("div",null," 网站秘钥 6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP ",-1),f=u("div",null," 服务器秘钥：6LcTelEpAAAAAI-OY2JMcjHcnm-n2I7i7K5wbVSZ ",-1),g="6LcTelEpAAAAAMP0-x8wbH9pvGwElJkxBZ47UvAP",w={__name:"google",setup(u){let w=a({captchaCode:{}});function h(){grecaptcha.ready((function(){grecaptcha.execute(g,{action:"login"}).then((function(a){let e={action:"login",token:a,key:g};w.captchaCode=JSON.stringify(e,null,2),window.$message.success("验证成功,请打开控制台，看输出内容")}))}))}return e(!1),t((()=>{})),(a,e)=>{const t=p,u=r;return c(),n(u,null,{default:l((()=>[d,f,s(t,{onClick:h},{default:l((()=>[o("V3无感知登录")])),_:1}),s(u,{title:"结果"},{default:l((()=>[o(A(i(w).captchaCode),1)])),_:1})])),_:1})}}};export{w as default};
import{a,a8 as e,o as t,m as c}from"./.pnpm-aa7558b5.js";const r={id:"captcha",style:{margin:"10px"}},l={__name:"google",setup(l){let o=a(!1),p=null;function n(a){null!=a&&(register.captchaCode=a,o.value=!0)}function s(){register.captchaCode="",o.value=!1}function i(){register.captchaCode="",grecaptcha.reset(p),o.value=!1}return e((()=>{o.value=!1,p=grecaptcha.render("captcha",{sitekey:"6Lc_OlEpAAAAABJA5kqj1SM0S3vo_tmbKNHuor48",theme:"light",callback:n,"expired-callback":s,"error-callback":i,hl:"zh-CN"})})),(a,e)=>(t(),c("div",r))}};export{l as default};

import{_ as t}from"./lodash-a4be5ec3.js";import{q as l,r as n,s as a,n as e,i as r}from"./naive-ui-020d1cb4.js";import{d as o,y as u,j as s,D as m,a0 as i,bt as d,a6 as p,bb as y,H as v,b3 as b,c,aM as j,aK as f}from"./@vue-b08f356c.js";import{_ as P}from"./index-0ac44500.js";import"./@intlify-5f3e8c99.js";import"./vueuc-2faed99f.js";import"./seemly-4cefc7d5.js";import"./@css-render-dccf3bb3.js";import"./vooks-f3223de7.js";import"./evtd-8c44e1f6.js";import"./css-render-dce45958.js";import"./@emotion-b17c1a96.js";import"./@juggle-80d14552.js";import"./lodash-es-f860d47b.js";import"./vdirs-7d09f1c1.js";import"./async-validator-cf877c1f.js";import"./date-fns-fb50340c.js";import"./vue-router-f68bb24d.js";import"./vue-i18n-71983ace.js";import"./vue-8c2795e9.js";import"./phosphor-vue-decee20b.js";/* empty css                    */const h=t=>(j("data-v-e6b49273"),t=t(),f(),t),I={class:"border-box"},_={class:"info-item"},g=h((()=>v("h3",null,"等额本息贷款",-1))),A=h((()=>v("p",null," 每月偿还固定金额，包括本金和利息。 初期还款主要是利息，后期逐渐减少，本金逐渐增加。 ",-1))),R=h((()=>v("br",null,null,-1))),w=h((()=>v("br",null,null,-1))),x=h((()=>v("br",null,null,-1))),N=h((()=>v("br",null,null,-1))),T=h((()=>v("br",null,null,-1))),U=h((()=>v("br",null,null,-1))),M={class:"info-item"},k=h((()=>v("h3",null,"等额本金贷款",-1))),q=h((()=>v("p",null," 月利息 = 剩余未偿还本金 × 月利率 ",-1))),S=h((()=>v("p",null," 每月偿还固定的本金，利息随着本金减少而减少。 总利息相对较低，但初期每月还款额较高 ",-1))),D=h((()=>v("br",null,null,-1))),H=h((()=>v("br",null,null,-1))),K=h((()=>v("br",null,null,-1))),L=h((()=>v("br",null,null,-1))),$=h((()=>v("br",null,null,-1))),z=h((()=>v("br",null,null,-1))),B=h((()=>v("br",null,null,-1))),C=h((()=>v("br",null,null,-1))),E=P(o({__name:"blog",setup(o){let j=u({loanAmount:1e5,years:5,annualInterestRate:.05}),f=t=>{const l=t.replace(/,/g,"").trim();return/^\d+(\.(\d+)?)?$/.test(l)?Number(l):""===l?null:Number.NaN},P=t=>null===t?"":t.toLocaleString("en-US"),h=s((()=>j.years&&j.loanAmount&&j.annualInterestRate?function(l,n,a){const e=12*l,r=t.divide(n,12),o=t.divide(a,e);let u=0,s=0;for(let t=0;t<e;t++){u+=o,s+=(a-t*o)*r}return{monthlyPayment:t.round(o,2),totalInterest:t.round(s,2),totalPayment:t.round(u+s,2)}}(j.years,j.annualInterestRate,j.loanAmount):{monthlyPayment:0,totalPayment:0,totalInterest:0})),E=s((()=>j.years&&j.loanAmount&&j.annualInterestRate?function(l,n,a){const e=12*l,r=t.divide(n,12);const o=Math.pow(1+r,e);const u=t.multiply(t.multiply(a,r),t.divide(o,t.subtract(o,1)));return{monthlyPayment:u,totalInterest:t.subtract(t.multiply(u,e),a),totalPayment:t.multiply(u,e)}}(j.years,j.annualInterestRate,j.loanAmount):{monthlyPayment:0,totalPayment:0,totalInterest:0}));return(t,o)=>{const u=l,s=n,F=a,G=e,J=r;return m(),i(J,{vertical:""},{default:d((()=>[p(G,{title:"贷款计算器"},{default:d((()=>[p(F,{"label-placement":"left","label-width":"auto"},{default:d((()=>[p(s,{label:"贷款金额"},{default:d((()=>[p(u,{value:y(j).loanAmount,"onUpdate:value":o[0]||(o[0]=t=>y(j).loanAmount=t),parse:y(f),format:y(P),"show-count":"",clearable:""},null,8,["value","parse","format"])])),_:1}),p(s,{label:"年利率"},{default:d((()=>[p(u,{value:y(j).annualInterestRate,"onUpdate:value":o[1]||(o[1]=t=>y(j).annualInterestRate=t),maxlength:"30","show-count":"",clearable:""},null,8,["value"])])),_:1}),p(s,{label:"期限(年)"},{default:d((()=>[p(u,{value:y(j).years,"onUpdate:value":o[2]||(o[2]=t=>y(j).years=t),maxlength:"30","show-count":"",clearable:""},null,8,["value"])])),_:1})])),_:1})])),_:1}),v("div",I,[v("div",_,[g,A,v("div",null,"每月偿还: "+b(y(E).monthlyPayment)+" 月",1),v("div",null,"累计还款总额: "+b(y(E).totalPayment)+" 元",1),v("div",null,"累计支付利息: "+b(y(E).totalInterest)+" 元",1),p(G,null,{default:d((()=>[c(" 贷款金额（P）：100,000 元 "),R,c(" 年利率（r）：5%（0.05） "),w,c(" 贷款期限（n）：5 年（60 个月） "),x,c(" 月利率 (r) = 年利率 / 12 = 0.05 / 12 ≈ 0.00417 "),N,c(" Total Payment = P * [r(1 + r)^n] / [(1 + r)^n – 1] = 100,000 * [0.00417(1 + 0.00417)^60] / [(1 + 0.00417)^60 – 1] ≈ 113,227.40 元 "),T,c(" Monthly Payment = Total Payment / n = 113,227.40 / 60 ≈ 1,887.12 元 "),U,c(" Total Interest = Total Payment - P = 113,227.40 - 100,000 ≈ 13,227.40 元 ")])),_:1})]),v("div",M,[k,q,S,v("div",null,"每月偿还: "+b(y(h).monthlyPayment)+" 元",1),v("div",null,"累计还款总额: "+b(y(h).totalPayment)+" 元",1),v("div",null,"累计支付利息: "+b(y(h).totalInterest)+" 元",1),p(G,null,{default:d((()=>[c(" 贷款金额（P）：100,000 元 "),D,c(" 年利率（r）：5%（0.05） 贷款期限（n）：5 年（60 个月） "),H,c(" principalPayment = 100,000 / 60 = 1,666.67 元 "),K,c(" ----- "),L,c(" 第一个月 interestPayment = 100,000 * 0.05 / 12 ≈ 416.67 元 "),$,c(" 第二个月 interestPayment = (100,000 - 1,666.67) * 0.05 / 12 ≈ 414.58 元 "),z,c(" ----- "),B,c(" 第一个月 totalInterest = 2,083.34 - 100,000 ≈ 998,3.34 元 "),C,c(" 第二个月 totalInterest = 2,081.25 - 100,000 ≈ 981.25 元 ")])),_:1})])])])),_:1})}}}),[["__scopeId","data-v-e6b49273"]]);export{E as default};

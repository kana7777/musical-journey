import{r as p,c as T,o as n,a as c,b as e,F as d,f as u,n as L,t as l,e as g,k as h,d as v,v as M,w as x,l as y}from"./index-DXOt3cXa.js";const N={class:"container mb-5"},O={class:"row"},B={class:"col-md-4"},F={class:"list-group"},S=["onClick"],Q={class:"d-flex justify-content-between w-100"},j={class:"col-md-8"},z={class:"cart-container"},E={class:"table table-hover align-middle"},A=e("thead",null,[e("tr",null,[e("th",{scope:"col",align:"center"},"品項"),e("th",{scope:"col"},"甜度"),e("th",{scope:"col"},"冰塊"),e("th",{scope:"col",width:"90"},"數量"),e("th",{scope:"col"},"單價"),e("th",{scope:"col"},"小計"),e("th",{scope:"col",width:"50"},"刪除")])],-1),G={class:"table-group-divider"},H={class:"text"},J=["onUpdate:modelValue","onChange"],K=["value"],P=["onUpdate:modelValue","onChange"],R=["value"],W=["onUpdate:modelValue","onChange"],X=["value"],Y=["onClick"],Z={key:0,class:"alert alert-danger",role:"alert"},I={key:1,class:"cart-info"},k={class:"sum text-end mb-3"},ee={class:"text-primary fs-5"},te={class:"text-end"},se={class:"form-floating"},le=e("label",{for:"floatingTextarea2"},"備註",-1),oe={class:"text-center m-3"},ae={key:2,class:"text-center"},ne=e("p",null,"No items in the cart",-1),ce=[ne],ie=e("hr",null,null,-1),re={key:0,class:"alert alert-secondary text-center",role:"alert"},de={key:1,class:"card shadow-sm"},ue={class:"card-body"},_e={class:"text"},pe={class:"table"},he=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"品項"),e("th",{scope:"col"},"甜度"),e("th",{scope:"col"},"冰塊"),e("th",{scope:"col"},"數量"),e("th",{scope:"col"},"小計")])],-1),ve={class:"text-end"},ye={__name:"OrderDrink",setup(me){const C=[{id:1,name:"珍珠奶茶",description:"香濃奶茶搭配QQ珍珠",price:50,ice:"",sugar:""},{id:2,name:"冬瓜檸檬",description:"清新冬瓜配上新鮮檸檬",price:45,ice:"",sugar:""},{id:3,name:"翡翠檸檬",description:"綠茶與檸檬的完美結合",price:55,ice:"",sugar:""},{id:4,name:"四季春茶",description:"香醇四季春茶，回甘無比",price:45,ice:"",sugar:""},{id:5,name:"阿薩姆奶茶",description:"阿薩姆紅茶搭配香醇鮮奶",price:50,ice:"",sugar:""},{id:6,name:"檸檬冰茶",description:"檸檬與冰茶的清新組合",price:45,ice:"",sugar:""},{id:7,name:"芒果綠茶",description:"芒果與綠茶的獨特風味",price:55,ice:"",sugar:""},{id:8,name:"抹茶拿鐵",description:"抹茶與鮮奶的絕配",price:60,ice:"",sugar:""}],w=["正常","少冰","去冰"],V=["正常","少糖","半糖","微糖","微微糖","無糖"],i=p([]),r=p({}),_=p(""),f=p(""),q=a=>{i.value.push({...a,id:new Date().getTime(),quantity:1})},$=a=>{const o=i.value.findIndex(t=>t.id===a);o!==-1&&i.value.splice(o,1)},b=T(()=>i.value.reduce((a,o)=>a+o.price*o.quantity,0)),m=a=>{i.value=i.value.map(o=>(o.id===a.id&&(o.quantity=parseInt(a.quantity),o.ice=a.ice,o.sugar=a.sugar),o))};console.log("orderList",r.value);const U=()=>{const a=i.value.map(o=>({...o,ice:o.ice,sugar:o.sugar}));r.value={id:new Date().getTime(),cart:a,description:_.value,sum:b.value},i.value=[],_.value=""},D=a=>a.quantity*a.price;return(a,o)=>(n(),c("div",N,[e("div",O,[e("div",B,[e("ul",F,[(n(),c(d,null,u(C,t=>e("li",{key:t.id,class:"list-group-item list-group-item-action",onClick:x(s=>q(t),["prevent"])},[e("p",Q,[e("span",null,l(t.name),1),e("span",null," $"+l(t.price),1)]),e("span",null,[e("small",null,l(t.description),1)])],8,S)),64))])]),e("div",j,[e("div",z,[e("div",{class:L(["cart h-100",{"cart-empty":i.value.length===0}])},[e("table",E,[A,e("tbody",G,[(n(!0),c(d,null,u(i.value,t=>(n(),c("tr",{key:t.id},[e("td",null,[h(l(t.name)+" ",1),e("div",H,[e("small",null,l(t.description),1)])]),e("td",null,[v(e("select",{class:"form-select form-select-sm","onUpdate:modelValue":s=>t.ice=s,onChange:s=>m(t)},[(n(),c(d,null,u(w,s=>e("option",{key:s,value:s},l(s),9,K)),64))],40,J),[[y,t.ice]])]),e("td",null,[v(e("select",{class:"form-select form-select-sm","onUpdate:modelValue":s=>t.sugar=s,onChange:s=>m(t)},[(n(),c(d,null,u(V,s=>e("option",{key:s,value:s},l(s),9,R)),64))],40,P),[[y,t.sugar]])]),e("td",null,[v(e("select",{class:"form-select form-select-sm","onUpdate:modelValue":s=>t.quantity=s,onChange:s=>m(t)},[(n(),c(d,null,u(10,s=>e("option",{key:s,value:s},l(s),9,X)),64))],40,W),[[y,t.quantity]])]),e("td",null," $ "+l(t.price),1),e("td",null," $ "+l(t.price*t.quantity),1),e("td",null,[e("button",{type:"button",class:"btn btn-sm",onClick:s=>$(t.id)}," ❌ ",8,Y)])]))),128))])])],2),f.value?(n(),c("div",Z,l(f.value),1)):g("",!0),i.value.length!==0?(n(),c("div",I,[e("div",k,[h(" 訂單金額： $ "),e("span",ee,l(b.value),1)]),e("div",te,[e("div",se,[v(e("textarea",{class:"form-control",placeholder:"Leave a comment here",id:"floatingTextarea2",style:{height:"100px"},"onUpdate:modelValue":o[0]||(o[0]=t=>_.value=t)},null,512),[[M,_.value]]),le])]),e("div",oe,[e("button",{type:"button",class:"w-50 btn btn-lg btn-secondary",onClick:x(U,["prevent"])},"送出訂單")])])):g("",!0),i.value.length===0?(n(),c("div",ae,ce)):g("",!0)])])]),ie,r.value.id?(n(),c("div",de,[e("div",ue,[e("div",_e," 訂單編號 "+l(r.value.id),1),e("table",pe,[he,e("tbody",null,[(n(!0),c(d,null,u(r.value.cart,t=>(n(),c("tr",{key:t.id},[e("td",null,l(t.name),1),e("td",null,l(t.ice),1),e("td",null,l(t.sugar),1),e("td",null,l(t.quantity),1),e("td",null,l(D(t)),1)]))),128))])]),e("div",null,[h(" 備註: "),e("span",null,l(r.value.description),1)]),e("div",ve,[e("h5",null,[h("總計: "),e("span",null,l(r.value.sum),1)])])])])):(n(),c("div",re," 尚未建立訂單 "))]))}};export{ye as default};

"use strict";var FlexConnect=(()=>{var a=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var E=Object.prototype.hasOwnProperty;var x=(e,t)=>{for(var n in t)a(e,n,{get:t[n],enumerable:!0})},h=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of y(t))!E.call(e,r)&&r!==n&&a(e,r,{get:()=>t[r],enumerable:!(o=f(t,r))||o.enumerable});return e};var w=e=>h(a({},"__esModule",{value:!0}),e);var R={};x(R,{VERSION:()=>I,init:()=>m,surgeInit:()=>b});var s="flex-widget-container",p="flex-widget-iframe",C="https://checkout.flex.pay",i=null,l=null,d=C;function u(e){d=e}function g(e){if(document.getElementById(s)){console.warn("Surge Checkout is already open.");return}i=e,k();let t=document.createElement("div");t.id=s,t.className="flex-overlay-open";let n=document.createElement("iframe");n.id=p,n.src=`${d}/checkout?token=${encodeURIComponent(e.sessionToken)}`,n.allow="payment; allow-scripts; allow-same-origin; allow-forms",t.appendChild(n),document.body.appendChild(t),document.body.style.overflow="hidden",O()}function c(){let e=document.getElementById(s);e&&(e.className="flex-overlay-closing",setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e),document.body.style.overflow=""},300)),l&&(window.removeEventListener("message",l),l=null),i=null}function O(){l=e=>{if(!(new URL(d).origin===e.origin||e.origin.startsWith("http://localhost")||e.origin.startsWith("http://127.0.0.1")))return;let o=e.data;if(!(!o||typeof o.type!="string")&&i)switch(o.type){case"SURGE_PLAN_CREATED":case"FLEX_PLAN_CREATED":i.onSuccess&&i.onSuccess({paymentPlanId:o.paymentPlanId}),c();break;case"SURGE_CANCEL":case"FLEX_CANCEL":i.onCancel&&i.onCancel(),c();break;case"SURGE_ERROR":case"FLEX_ERROR":i.onError&&i.onError({code:o.code,message:o.message});break}},window.addEventListener("message",l)}function k(){if(document.getElementById("flex-widget-styles"))return;let e=document.createElement("style");e.id="flex-widget-styles",e.innerHTML=`
    #${s} {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2147483647; /* Maximum z-index */
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    
    #${s}.flex-overlay-open {
      opacity: 1;
    }
    
    #${s}.flex-overlay-closing {
      opacity: 0;
    }

    #${p} {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
    }
  `,document.head.appendChild(e)}var I="1.0.0";function m(e={}){return e.widgetUrl&&u(e.widgetUrl),{openCheckout:t=>{if(!t.sessionToken)throw new Error("Surge SDK: sessionToken is required");g(t)},closeCheckout:()=>{c()}}}var b=m;return w(R);})();
//# sourceMappingURL=index.min.js.map
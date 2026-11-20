var ry=Object.defineProperty;var sy=(t,e,n)=>e in t?ry(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var De=(t,e,n)=>sy(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function oy(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var tv={exports:{}},hu={},nv={exports:{}},ze={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xa=Symbol.for("react.element"),ay=Symbol.for("react.portal"),ly=Symbol.for("react.fragment"),cy=Symbol.for("react.strict_mode"),uy=Symbol.for("react.profiler"),fy=Symbol.for("react.provider"),hy=Symbol.for("react.context"),dy=Symbol.for("react.forward_ref"),py=Symbol.for("react.suspense"),my=Symbol.for("react.memo"),gy=Symbol.for("react.lazy"),pm=Symbol.iterator;function _y(t){return t===null||typeof t!="object"?null:(t=pm&&t[pm]||t["@@iterator"],typeof t=="function"?t:null)}var iv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},rv=Object.assign,sv={};function Lo(t,e,n){this.props=t,this.context=e,this.refs=sv,this.updater=n||iv}Lo.prototype.isReactComponent={};Lo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Lo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function ov(){}ov.prototype=Lo.prototype;function Zd(t,e,n){this.props=t,this.context=e,this.refs=sv,this.updater=n||iv}var Qd=Zd.prototype=new ov;Qd.constructor=Zd;rv(Qd,Lo.prototype);Qd.isPureReactComponent=!0;var mm=Array.isArray,av=Object.prototype.hasOwnProperty,Jd={current:null},lv={key:!0,ref:!0,__self:!0,__source:!0};function cv(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)av.call(e,i)&&!lv.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Xa,type:t,key:s,ref:o,props:r,_owner:Jd.current}}function vy(t,e){return{$$typeof:Xa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ep(t){return typeof t=="object"&&t!==null&&t.$$typeof===Xa}function xy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var gm=/\/+/g;function zu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?xy(""+t.key):e.toString(36)}function hc(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Xa:case ay:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+zu(o,0):i,mm(r)?(n="",t!=null&&(n=t.replace(gm,"$&/")+"/"),hc(r,e,n,"",function(c){return c})):r!=null&&(ep(r)&&(r=vy(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(gm,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",mm(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+zu(s,a);o+=hc(s,e,n,l,r)}else if(l=_y(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+zu(s,a++),o+=hc(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function el(t,e,n){if(t==null)return t;var i=[],r=0;return hc(t,i,"","",function(s){return e.call(n,s,r++)}),i}function yy(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var un={current:null},dc={transition:null},Sy={ReactCurrentDispatcher:un,ReactCurrentBatchConfig:dc,ReactCurrentOwner:Jd};function uv(){throw Error("act(...) is not supported in production builds of React.")}ze.Children={map:el,forEach:function(t,e,n){el(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return el(t,function(){e++}),e},toArray:function(t){return el(t,function(e){return e})||[]},only:function(t){if(!ep(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ze.Component=Lo;ze.Fragment=ly;ze.Profiler=uy;ze.PureComponent=Zd;ze.StrictMode=cy;ze.Suspense=py;ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sy;ze.act=uv;ze.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=rv({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Jd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)av.call(e,l)&&!lv.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Xa,type:t.type,key:r,ref:s,props:i,_owner:o}};ze.createContext=function(t){return t={$$typeof:hy,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:fy,_context:t},t.Consumer=t};ze.createElement=cv;ze.createFactory=function(t){var e=cv.bind(null,t);return e.type=t,e};ze.createRef=function(){return{current:null}};ze.forwardRef=function(t){return{$$typeof:dy,render:t}};ze.isValidElement=ep;ze.lazy=function(t){return{$$typeof:gy,_payload:{_status:-1,_result:t},_init:yy}};ze.memo=function(t,e){return{$$typeof:my,type:t,compare:e===void 0?null:e}};ze.startTransition=function(t){var e=dc.transition;dc.transition={};try{t()}finally{dc.transition=e}};ze.unstable_act=uv;ze.useCallback=function(t,e){return un.current.useCallback(t,e)};ze.useContext=function(t){return un.current.useContext(t)};ze.useDebugValue=function(){};ze.useDeferredValue=function(t){return un.current.useDeferredValue(t)};ze.useEffect=function(t,e){return un.current.useEffect(t,e)};ze.useId=function(){return un.current.useId()};ze.useImperativeHandle=function(t,e,n){return un.current.useImperativeHandle(t,e,n)};ze.useInsertionEffect=function(t,e){return un.current.useInsertionEffect(t,e)};ze.useLayoutEffect=function(t,e){return un.current.useLayoutEffect(t,e)};ze.useMemo=function(t,e){return un.current.useMemo(t,e)};ze.useReducer=function(t,e,n){return un.current.useReducer(t,e,n)};ze.useRef=function(t){return un.current.useRef(t)};ze.useState=function(t){return un.current.useState(t)};ze.useSyncExternalStore=function(t,e,n){return un.current.useSyncExternalStore(t,e,n)};ze.useTransition=function(){return un.current.useTransition()};ze.version="18.3.1";nv.exports=ze;var Wt=nv.exports;const My=oy(Wt);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ey=Wt,wy=Symbol.for("react.element"),Ty=Symbol.for("react.fragment"),Ay=Object.prototype.hasOwnProperty,Cy=Ey.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ry={key:!0,ref:!0,__self:!0,__source:!0};function fv(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)Ay.call(e,i)&&!Ry.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:wy,type:t,key:s,ref:o,props:r,_owner:Cy.current}}hu.Fragment=Ty;hu.jsx=fv;hu.jsxs=fv;tv.exports=hu;var J=tv.exports,ah={},hv={exports:{}},Un={},dv={exports:{}},pv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(U,$){var Q=U.length;U.push($);e:for(;0<Q;){var se=Q-1>>>1,we=U[se];if(0<r(we,$))U[se]=$,U[Q]=we,Q=se;else break e}}function n(U){return U.length===0?null:U[0]}function i(U){if(U.length===0)return null;var $=U[0],Q=U.pop();if(Q!==$){U[0]=Q;e:for(var se=0,we=U.length,ke=we>>>1;se<ke;){var j=2*(se+1)-1,ne=U[j],fe=j+1,le=U[fe];if(0>r(ne,Q))fe<we&&0>r(le,ne)?(U[se]=le,U[fe]=Q,se=fe):(U[se]=ne,U[j]=Q,se=j);else if(fe<we&&0>r(le,Q))U[se]=le,U[fe]=Q,se=fe;else break e}}return $}function r(U,$){var Q=U.sortIndex-$.sortIndex;return Q!==0?Q:U.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,h=null,f=3,p=!1,_=!1,x=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(U){for(var $=n(c);$!==null;){if($.callback===null)i(c);else if($.startTime<=U)i(c),$.sortIndex=$.expirationTime,e(l,$);else break;$=n(c)}}function S(U){if(x=!1,v(U),!_)if(n(l)!==null)_=!0,k(A);else{var $=n(c);$!==null&&Y(S,$.startTime-U)}}function A(U,$){_=!1,x&&(x=!1,d(R),R=-1),p=!0;var Q=f;try{for(v($),h=n(l);h!==null&&(!(h.expirationTime>$)||U&&!E());){var se=h.callback;if(typeof se=="function"){h.callback=null,f=h.priorityLevel;var we=se(h.expirationTime<=$);$=t.unstable_now(),typeof we=="function"?h.callback=we:h===n(l)&&i(l),v($)}else i(l);h=n(l)}if(h!==null)var ke=!0;else{var j=n(c);j!==null&&Y(S,j.startTime-$),ke=!1}return ke}finally{h=null,f=Q,p=!1}}var w=!1,M=null,R=-1,L=5,y=-1;function E(){return!(t.unstable_now()-y<L)}function D(){if(M!==null){var U=t.unstable_now();y=U;var $=!0;try{$=M(!0,U)}finally{$?N():(w=!1,M=null)}}else w=!1}var N;if(typeof g=="function")N=function(){g(D)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,W=z.port2;z.port1.onmessage=D,N=function(){W.postMessage(null)}}else N=function(){m(D,0)};function k(U){M=U,w||(w=!0,N())}function Y(U,$){R=m(function(){U(t.unstable_now())},$)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(U){U.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,k(A))},t.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<U?Math.floor(1e3/U):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(U){switch(f){case 1:case 2:case 3:var $=3;break;default:$=f}var Q=f;f=$;try{return U()}finally{f=Q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(U,$){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var Q=f;f=U;try{return $()}finally{f=Q}},t.unstable_scheduleCallback=function(U,$,Q){var se=t.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?se+Q:se):Q=se,U){case 1:var we=-1;break;case 2:we=250;break;case 5:we=1073741823;break;case 4:we=1e4;break;default:we=5e3}return we=Q+we,U={id:u++,callback:$,priorityLevel:U,startTime:Q,expirationTime:we,sortIndex:-1},Q>se?(U.sortIndex=Q,e(c,U),n(l)===null&&U===n(c)&&(x?(d(R),R=-1):x=!0,Y(S,Q-se))):(U.sortIndex=we,e(l,U),_||p||(_=!0,k(A))),U},t.unstable_shouldYield=E,t.unstable_wrapCallback=function(U){var $=f;return function(){var Q=f;f=$;try{return U.apply(this,arguments)}finally{f=Q}}}})(pv);dv.exports=pv;var by=dv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Py=Wt,In=by;function te(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mv=new Set,Aa={};function hs(t,e){vo(t,e),vo(t+"Capture",e)}function vo(t,e){for(Aa[t]=e,t=0;t<e.length;t++)mv.add(e[t])}var Vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lh=Object.prototype.hasOwnProperty,Ly=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_m={},vm={};function Dy(t){return lh.call(vm,t)?!0:lh.call(_m,t)?!1:Ly.test(t)?vm[t]=!0:(_m[t]=!0,!1)}function Iy(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Uy(t,e,n,i){if(e===null||typeof e>"u"||Iy(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function fn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){qt[t]=new fn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];qt[e]=new fn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){qt[t]=new fn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){qt[t]=new fn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){qt[t]=new fn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){qt[t]=new fn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){qt[t]=new fn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){qt[t]=new fn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){qt[t]=new fn(t,5,!1,t.toLowerCase(),null,!1,!1)});var tp=/[\-:]([a-z])/g;function np(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(tp,np);qt[e]=new fn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(tp,np);qt[e]=new fn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(tp,np);qt[e]=new fn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){qt[t]=new fn(t,1,!1,t.toLowerCase(),null,!1,!1)});qt.xlinkHref=new fn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){qt[t]=new fn(t,1,!1,t.toLowerCase(),null,!0,!0)});function ip(t,e,n,i){var r=qt.hasOwnProperty(e)?qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Uy(e,n,r,i)&&(n=null),i||r===null?Dy(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var $i=Py.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,tl=Symbol.for("react.element"),js=Symbol.for("react.portal"),Ys=Symbol.for("react.fragment"),rp=Symbol.for("react.strict_mode"),ch=Symbol.for("react.profiler"),gv=Symbol.for("react.provider"),_v=Symbol.for("react.context"),sp=Symbol.for("react.forward_ref"),uh=Symbol.for("react.suspense"),fh=Symbol.for("react.suspense_list"),op=Symbol.for("react.memo"),ar=Symbol.for("react.lazy"),vv=Symbol.for("react.offscreen"),xm=Symbol.iterator;function Fo(t){return t===null||typeof t!="object"?null:(t=xm&&t[xm]||t["@@iterator"],typeof t=="function"?t:null)}var _t=Object.assign,ku;function oa(t){if(ku===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ku=e&&e[1]||""}return`
`+ku+t}var Hu=!1;function Vu(t,e){if(!t||Hu)return"";Hu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Hu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?oa(t):""}function Ny(t){switch(t.tag){case 5:return oa(t.type);case 16:return oa("Lazy");case 13:return oa("Suspense");case 19:return oa("SuspenseList");case 0:case 2:case 15:return t=Vu(t.type,!1),t;case 11:return t=Vu(t.type.render,!1),t;case 1:return t=Vu(t.type,!0),t;default:return""}}function hh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ys:return"Fragment";case js:return"Portal";case ch:return"Profiler";case rp:return"StrictMode";case uh:return"Suspense";case fh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case _v:return(t.displayName||"Context")+".Consumer";case gv:return(t._context.displayName||"Context")+".Provider";case sp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case op:return e=t.displayName||null,e!==null?e:hh(t.type)||"Memo";case ar:e=t._payload,t=t._init;try{return hh(t(e))}catch{}}return null}function Fy(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return hh(e);case 8:return e===rp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function xv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Oy(t){var e=xv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function nl(t){t._valueTracker||(t._valueTracker=Oy(t))}function yv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=xv(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Dc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function dh(t,e){var n=e.checked;return _t({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function ym(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Sv(t,e){e=e.checked,e!=null&&ip(t,"checked",e,!1)}function ph(t,e){Sv(t,e);var n=Cr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?mh(t,e.type,n):e.hasOwnProperty("defaultValue")&&mh(t,e.type,Cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Sm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function mh(t,e,n){(e!=="number"||Dc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var aa=Array.isArray;function ao(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Cr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function gh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(te(91));return _t({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Mm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(te(92));if(aa(n)){if(1<n.length)throw Error(te(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Cr(n)}}function Mv(t,e){var n=Cr(e.value),i=Cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Em(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Ev(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _h(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Ev(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var il,wv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(il=il||document.createElement("div"),il.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=il.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ca(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var da={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},By=["Webkit","ms","Moz","O"];Object.keys(da).forEach(function(t){By.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),da[e]=da[t]})});function Tv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||da.hasOwnProperty(t)&&da[t]?(""+e).trim():e+"px"}function Av(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Tv(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var zy=_t({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function vh(t,e){if(e){if(zy[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(te(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(te(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(te(61))}if(e.style!=null&&typeof e.style!="object")throw Error(te(62))}}function xh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yh=null;function ap(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Sh=null,lo=null,co=null;function wm(t){if(t=$a(t)){if(typeof Sh!="function")throw Error(te(280));var e=t.stateNode;e&&(e=_u(e),Sh(t.stateNode,t.type,e))}}function Cv(t){lo?co?co.push(t):co=[t]:lo=t}function Rv(){if(lo){var t=lo,e=co;if(co=lo=null,wm(t),e)for(t=0;t<e.length;t++)wm(e[t])}}function bv(t,e){return t(e)}function Pv(){}var Gu=!1;function Lv(t,e,n){if(Gu)return t(e,n);Gu=!0;try{return bv(t,e,n)}finally{Gu=!1,(lo!==null||co!==null)&&(Pv(),Rv())}}function Ra(t,e){var n=t.stateNode;if(n===null)return null;var i=_u(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(te(231,e,typeof n));return n}var Mh=!1;if(Vi)try{var Oo={};Object.defineProperty(Oo,"passive",{get:function(){Mh=!0}}),window.addEventListener("test",Oo,Oo),window.removeEventListener("test",Oo,Oo)}catch{Mh=!1}function ky(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var pa=!1,Ic=null,Uc=!1,Eh=null,Hy={onError:function(t){pa=!0,Ic=t}};function Vy(t,e,n,i,r,s,o,a,l){pa=!1,Ic=null,ky.apply(Hy,arguments)}function Gy(t,e,n,i,r,s,o,a,l){if(Vy.apply(this,arguments),pa){if(pa){var c=Ic;pa=!1,Ic=null}else throw Error(te(198));Uc||(Uc=!0,Eh=c)}}function ds(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Dv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Tm(t){if(ds(t)!==t)throw Error(te(188))}function Wy(t){var e=t.alternate;if(!e){if(e=ds(t),e===null)throw Error(te(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Tm(r),t;if(s===i)return Tm(r),e;s=s.sibling}throw Error(te(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(te(189))}}if(n.alternate!==i)throw Error(te(190))}if(n.tag!==3)throw Error(te(188));return n.stateNode.current===n?t:e}function Iv(t){return t=Wy(t),t!==null?Uv(t):null}function Uv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Uv(t);if(e!==null)return e;t=t.sibling}return null}var Nv=In.unstable_scheduleCallback,Am=In.unstable_cancelCallback,Xy=In.unstable_shouldYield,jy=In.unstable_requestPaint,wt=In.unstable_now,Yy=In.unstable_getCurrentPriorityLevel,lp=In.unstable_ImmediatePriority,Fv=In.unstable_UserBlockingPriority,Nc=In.unstable_NormalPriority,$y=In.unstable_LowPriority,Ov=In.unstable_IdlePriority,du=null,xi=null;function qy(t){if(xi&&typeof xi.onCommitFiberRoot=="function")try{xi.onCommitFiberRoot(du,t,void 0,(t.current.flags&128)===128)}catch{}}var ui=Math.clz32?Math.clz32:Qy,Ky=Math.log,Zy=Math.LN2;function Qy(t){return t>>>=0,t===0?32:31-(Ky(t)/Zy|0)|0}var rl=64,sl=4194304;function la(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Fc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=la(a):(s&=o,s!==0&&(i=la(s)))}else o=n&~r,o!==0?i=la(o):s!==0&&(i=la(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ui(e),r=1<<n,i|=t[n],e&=~r;return i}function Jy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function eS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ui(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Jy(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function wh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Bv(){var t=rl;return rl<<=1,!(rl&4194240)&&(rl=64),t}function Wu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ja(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ui(e),t[e]=n}function tS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ui(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function cp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ui(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var tt=0;function zv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var kv,up,Hv,Vv,Gv,Th=!1,ol=[],_r=null,vr=null,xr=null,ba=new Map,Pa=new Map,ur=[],nS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cm(t,e){switch(t){case"focusin":case"focusout":_r=null;break;case"dragenter":case"dragleave":vr=null;break;case"mouseover":case"mouseout":xr=null;break;case"pointerover":case"pointerout":ba.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Pa.delete(e.pointerId)}}function Bo(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=$a(e),e!==null&&up(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function iS(t,e,n,i,r){switch(e){case"focusin":return _r=Bo(_r,t,e,n,i,r),!0;case"dragenter":return vr=Bo(vr,t,e,n,i,r),!0;case"mouseover":return xr=Bo(xr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return ba.set(s,Bo(ba.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Pa.set(s,Bo(Pa.get(s)||null,t,e,n,i,r)),!0}return!1}function Wv(t){var e=Kr(t.target);if(e!==null){var n=ds(e);if(n!==null){if(e=n.tag,e===13){if(e=Dv(n),e!==null){t.blockedOn=e,Gv(t.priority,function(){Hv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function pc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ah(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);yh=i,n.target.dispatchEvent(i),yh=null}else return e=$a(n),e!==null&&up(e),t.blockedOn=n,!1;e.shift()}return!0}function Rm(t,e,n){pc(t)&&n.delete(e)}function rS(){Th=!1,_r!==null&&pc(_r)&&(_r=null),vr!==null&&pc(vr)&&(vr=null),xr!==null&&pc(xr)&&(xr=null),ba.forEach(Rm),Pa.forEach(Rm)}function zo(t,e){t.blockedOn===e&&(t.blockedOn=null,Th||(Th=!0,In.unstable_scheduleCallback(In.unstable_NormalPriority,rS)))}function La(t){function e(r){return zo(r,t)}if(0<ol.length){zo(ol[0],t);for(var n=1;n<ol.length;n++){var i=ol[n];i.blockedOn===t&&(i.blockedOn=null)}}for(_r!==null&&zo(_r,t),vr!==null&&zo(vr,t),xr!==null&&zo(xr,t),ba.forEach(e),Pa.forEach(e),n=0;n<ur.length;n++)i=ur[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ur.length&&(n=ur[0],n.blockedOn===null);)Wv(n),n.blockedOn===null&&ur.shift()}var uo=$i.ReactCurrentBatchConfig,Oc=!0;function sS(t,e,n,i){var r=tt,s=uo.transition;uo.transition=null;try{tt=1,fp(t,e,n,i)}finally{tt=r,uo.transition=s}}function oS(t,e,n,i){var r=tt,s=uo.transition;uo.transition=null;try{tt=4,fp(t,e,n,i)}finally{tt=r,uo.transition=s}}function fp(t,e,n,i){if(Oc){var r=Ah(t,e,n,i);if(r===null)ef(t,e,i,Bc,n),Cm(t,i);else if(iS(r,t,e,n,i))i.stopPropagation();else if(Cm(t,i),e&4&&-1<nS.indexOf(t)){for(;r!==null;){var s=$a(r);if(s!==null&&kv(s),s=Ah(t,e,n,i),s===null&&ef(t,e,i,Bc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else ef(t,e,i,null,n)}}var Bc=null;function Ah(t,e,n,i){if(Bc=null,t=ap(i),t=Kr(t),t!==null)if(e=ds(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Dv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Bc=t,null}function Xv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Yy()){case lp:return 1;case Fv:return 4;case Nc:case $y:return 16;case Ov:return 536870912;default:return 16}default:return 16}}var dr=null,hp=null,mc=null;function jv(){if(mc)return mc;var t,e=hp,n=e.length,i,r="value"in dr?dr.value:dr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return mc=r.slice(t,1<i?1-i:void 0)}function gc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function al(){return!0}function bm(){return!1}function Nn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?al:bm,this.isPropagationStopped=bm,this}return _t(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=al)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=al)},persist:function(){},isPersistent:al}),e}var Do={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dp=Nn(Do),Ya=_t({},Do,{view:0,detail:0}),aS=Nn(Ya),Xu,ju,ko,pu=_t({},Ya,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ko&&(ko&&t.type==="mousemove"?(Xu=t.screenX-ko.screenX,ju=t.screenY-ko.screenY):ju=Xu=0,ko=t),Xu)},movementY:function(t){return"movementY"in t?t.movementY:ju}}),Pm=Nn(pu),lS=_t({},pu,{dataTransfer:0}),cS=Nn(lS),uS=_t({},Ya,{relatedTarget:0}),Yu=Nn(uS),fS=_t({},Do,{animationName:0,elapsedTime:0,pseudoElement:0}),hS=Nn(fS),dS=_t({},Do,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),pS=Nn(dS),mS=_t({},Do,{data:0}),Lm=Nn(mS),gS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_S={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},vS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=vS[t])?!!e[t]:!1}function pp(){return xS}var yS=_t({},Ya,{key:function(t){if(t.key){var e=gS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=gc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?_S[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pp,charCode:function(t){return t.type==="keypress"?gc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?gc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),SS=Nn(yS),MS=_t({},pu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dm=Nn(MS),ES=_t({},Ya,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pp}),wS=Nn(ES),TS=_t({},Do,{propertyName:0,elapsedTime:0,pseudoElement:0}),AS=Nn(TS),CS=_t({},pu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),RS=Nn(CS),bS=[9,13,27,32],mp=Vi&&"CompositionEvent"in window,ma=null;Vi&&"documentMode"in document&&(ma=document.documentMode);var PS=Vi&&"TextEvent"in window&&!ma,Yv=Vi&&(!mp||ma&&8<ma&&11>=ma),Im=" ",Um=!1;function $v(t,e){switch(t){case"keyup":return bS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qv(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var $s=!1;function LS(t,e){switch(t){case"compositionend":return qv(e);case"keypress":return e.which!==32?null:(Um=!0,Im);case"textInput":return t=e.data,t===Im&&Um?null:t;default:return null}}function DS(t,e){if($s)return t==="compositionend"||!mp&&$v(t,e)?(t=jv(),mc=hp=dr=null,$s=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Yv&&e.locale!=="ko"?null:e.data;default:return null}}var IS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!IS[t.type]:e==="textarea"}function Kv(t,e,n,i){Cv(i),e=zc(e,"onChange"),0<e.length&&(n=new dp("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ga=null,Da=null;function US(t){a0(t,0)}function mu(t){var e=Zs(t);if(yv(e))return t}function NS(t,e){if(t==="change")return e}var Zv=!1;if(Vi){var $u;if(Vi){var qu="oninput"in document;if(!qu){var Fm=document.createElement("div");Fm.setAttribute("oninput","return;"),qu=typeof Fm.oninput=="function"}$u=qu}else $u=!1;Zv=$u&&(!document.documentMode||9<document.documentMode)}function Om(){ga&&(ga.detachEvent("onpropertychange",Qv),Da=ga=null)}function Qv(t){if(t.propertyName==="value"&&mu(Da)){var e=[];Kv(e,Da,t,ap(t)),Lv(US,e)}}function FS(t,e,n){t==="focusin"?(Om(),ga=e,Da=n,ga.attachEvent("onpropertychange",Qv)):t==="focusout"&&Om()}function OS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return mu(Da)}function BS(t,e){if(t==="click")return mu(e)}function zS(t,e){if(t==="input"||t==="change")return mu(e)}function kS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var hi=typeof Object.is=="function"?Object.is:kS;function Ia(t,e){if(hi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!lh.call(e,r)||!hi(t[r],e[r]))return!1}return!0}function Bm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function zm(t,e){var n=Bm(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Bm(n)}}function Jv(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Jv(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function e0(){for(var t=window,e=Dc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Dc(t.document)}return e}function gp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function HS(t){var e=e0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Jv(n.ownerDocument.documentElement,n)){if(i!==null&&gp(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=zm(n,s);var o=zm(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var VS=Vi&&"documentMode"in document&&11>=document.documentMode,qs=null,Ch=null,_a=null,Rh=!1;function km(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rh||qs==null||qs!==Dc(i)||(i=qs,"selectionStart"in i&&gp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),_a&&Ia(_a,i)||(_a=i,i=zc(Ch,"onSelect"),0<i.length&&(e=new dp("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=qs)))}function ll(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ks={animationend:ll("Animation","AnimationEnd"),animationiteration:ll("Animation","AnimationIteration"),animationstart:ll("Animation","AnimationStart"),transitionend:ll("Transition","TransitionEnd")},Ku={},t0={};Vi&&(t0=document.createElement("div").style,"AnimationEvent"in window||(delete Ks.animationend.animation,delete Ks.animationiteration.animation,delete Ks.animationstart.animation),"TransitionEvent"in window||delete Ks.transitionend.transition);function gu(t){if(Ku[t])return Ku[t];if(!Ks[t])return t;var e=Ks[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in t0)return Ku[t]=e[n];return t}var n0=gu("animationend"),i0=gu("animationiteration"),r0=gu("animationstart"),s0=gu("transitionend"),o0=new Map,Hm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Dr(t,e){o0.set(t,e),hs(e,[t])}for(var Zu=0;Zu<Hm.length;Zu++){var Qu=Hm[Zu],GS=Qu.toLowerCase(),WS=Qu[0].toUpperCase()+Qu.slice(1);Dr(GS,"on"+WS)}Dr(n0,"onAnimationEnd");Dr(i0,"onAnimationIteration");Dr(r0,"onAnimationStart");Dr("dblclick","onDoubleClick");Dr("focusin","onFocus");Dr("focusout","onBlur");Dr(s0,"onTransitionEnd");vo("onMouseEnter",["mouseout","mouseover"]);vo("onMouseLeave",["mouseout","mouseover"]);vo("onPointerEnter",["pointerout","pointerover"]);vo("onPointerLeave",["pointerout","pointerover"]);hs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hs("onBeforeInput",["compositionend","keypress","textInput","paste"]);hs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ca="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),XS=new Set("cancel close invalid load scroll toggle".split(" ").concat(ca));function Vm(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,Gy(i,e,void 0,t),t.currentTarget=null}function a0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Vm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Vm(r,a,c),s=l}}}if(Uc)throw t=Eh,Uc=!1,Eh=null,t}function ct(t,e){var n=e[Ih];n===void 0&&(n=e[Ih]=new Set);var i=t+"__bubble";n.has(i)||(l0(e,t,2,!1),n.add(i))}function Ju(t,e,n){var i=0;e&&(i|=4),l0(n,t,i,e)}var cl="_reactListening"+Math.random().toString(36).slice(2);function Ua(t){if(!t[cl]){t[cl]=!0,mv.forEach(function(n){n!=="selectionchange"&&(XS.has(n)||Ju(n,!1,t),Ju(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[cl]||(e[cl]=!0,Ju("selectionchange",!1,e))}}function l0(t,e,n,i){switch(Xv(e)){case 1:var r=sS;break;case 4:r=oS;break;default:r=fp}n=r.bind(null,e,n,t),r=void 0,!Mh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function ef(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Kr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Lv(function(){var c=s,u=ap(n),h=[];e:{var f=o0.get(t);if(f!==void 0){var p=dp,_=t;switch(t){case"keypress":if(gc(n)===0)break e;case"keydown":case"keyup":p=SS;break;case"focusin":_="focus",p=Yu;break;case"focusout":_="blur",p=Yu;break;case"beforeblur":case"afterblur":p=Yu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Pm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=cS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=wS;break;case n0:case i0:case r0:p=hS;break;case s0:p=AS;break;case"scroll":p=aS;break;case"wheel":p=RS;break;case"copy":case"cut":case"paste":p=pS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Dm}var x=(e&4)!==0,m=!x&&t==="scroll",d=x?f!==null?f+"Capture":null:f;x=[];for(var g=c,v;g!==null;){v=g;var S=v.stateNode;if(v.tag===5&&S!==null&&(v=S,d!==null&&(S=Ra(g,d),S!=null&&x.push(Na(g,S,v)))),m)break;g=g.return}0<x.length&&(f=new p(f,_,null,n,u),h.push({event:f,listeners:x}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==yh&&(_=n.relatedTarget||n.fromElement)&&(Kr(_)||_[Gi]))break e;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Kr(_):null,_!==null&&(m=ds(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(x=Pm,S="onMouseLeave",d="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(x=Dm,S="onPointerLeave",d="onPointerEnter",g="pointer"),m=p==null?f:Zs(p),v=_==null?f:Zs(_),f=new x(S,g+"leave",p,n,u),f.target=m,f.relatedTarget=v,S=null,Kr(u)===c&&(x=new x(d,g+"enter",_,n,u),x.target=v,x.relatedTarget=m,S=x),m=S,p&&_)t:{for(x=p,d=_,g=0,v=x;v;v=_s(v))g++;for(v=0,S=d;S;S=_s(S))v++;for(;0<g-v;)x=_s(x),g--;for(;0<v-g;)d=_s(d),v--;for(;g--;){if(x===d||d!==null&&x===d.alternate)break t;x=_s(x),d=_s(d)}x=null}else x=null;p!==null&&Gm(h,f,p,x,!1),_!==null&&m!==null&&Gm(h,m,_,x,!0)}}e:{if(f=c?Zs(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var A=NS;else if(Nm(f))if(Zv)A=zS;else{A=OS;var w=FS}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(A=BS);if(A&&(A=A(t,c))){Kv(h,A,n,u);break e}w&&w(t,f,c),t==="focusout"&&(w=f._wrapperState)&&w.controlled&&f.type==="number"&&mh(f,"number",f.value)}switch(w=c?Zs(c):window,t){case"focusin":(Nm(w)||w.contentEditable==="true")&&(qs=w,Ch=c,_a=null);break;case"focusout":_a=Ch=qs=null;break;case"mousedown":Rh=!0;break;case"contextmenu":case"mouseup":case"dragend":Rh=!1,km(h,n,u);break;case"selectionchange":if(VS)break;case"keydown":case"keyup":km(h,n,u)}var M;if(mp)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else $s?$v(t,n)&&(R="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(Yv&&n.locale!=="ko"&&($s||R!=="onCompositionStart"?R==="onCompositionEnd"&&$s&&(M=jv()):(dr=u,hp="value"in dr?dr.value:dr.textContent,$s=!0)),w=zc(c,R),0<w.length&&(R=new Lm(R,t,null,n,u),h.push({event:R,listeners:w}),M?R.data=M:(M=qv(n),M!==null&&(R.data=M)))),(M=PS?LS(t,n):DS(t,n))&&(c=zc(c,"onBeforeInput"),0<c.length&&(u=new Lm("onBeforeInput","beforeinput",null,n,u),h.push({event:u,listeners:c}),u.data=M))}a0(h,e)})}function Na(t,e,n){return{instance:t,listener:e,currentTarget:n}}function zc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ra(t,n),s!=null&&i.unshift(Na(t,s,r)),s=Ra(t,e),s!=null&&i.push(Na(t,s,r))),t=t.return}return i}function _s(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Gm(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Ra(n,s),l!=null&&o.unshift(Na(n,l,a))):r||(l=Ra(n,s),l!=null&&o.push(Na(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var jS=/\r\n?/g,YS=/\u0000|\uFFFD/g;function Wm(t){return(typeof t=="string"?t:""+t).replace(jS,`
`).replace(YS,"")}function ul(t,e,n){if(e=Wm(e),Wm(t)!==e&&n)throw Error(te(425))}function kc(){}var bh=null,Ph=null;function Lh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Dh=typeof setTimeout=="function"?setTimeout:void 0,$S=typeof clearTimeout=="function"?clearTimeout:void 0,Xm=typeof Promise=="function"?Promise:void 0,qS=typeof queueMicrotask=="function"?queueMicrotask:typeof Xm<"u"?function(t){return Xm.resolve(null).then(t).catch(KS)}:Dh;function KS(t){setTimeout(function(){throw t})}function tf(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),La(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);La(e)}function yr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function jm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Io=Math.random().toString(36).slice(2),vi="__reactFiber$"+Io,Fa="__reactProps$"+Io,Gi="__reactContainer$"+Io,Ih="__reactEvents$"+Io,ZS="__reactListeners$"+Io,QS="__reactHandles$"+Io;function Kr(t){var e=t[vi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Gi]||n[vi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=jm(t);t!==null;){if(n=t[vi])return n;t=jm(t)}return e}t=n,n=t.parentNode}return null}function $a(t){return t=t[vi]||t[Gi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Zs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(te(33))}function _u(t){return t[Fa]||null}var Uh=[],Qs=-1;function Ir(t){return{current:t}}function ft(t){0>Qs||(t.current=Uh[Qs],Uh[Qs]=null,Qs--)}function ot(t,e){Qs++,Uh[Qs]=t.current,t.current=e}var Rr={},rn=Ir(Rr),yn=Ir(!1),ss=Rr;function xo(t,e){var n=t.type.contextTypes;if(!n)return Rr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Sn(t){return t=t.childContextTypes,t!=null}function Hc(){ft(yn),ft(rn)}function Ym(t,e,n){if(rn.current!==Rr)throw Error(te(168));ot(rn,e),ot(yn,n)}function c0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(te(108,Fy(t)||"Unknown",r));return _t({},n,i)}function Vc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rr,ss=rn.current,ot(rn,t),ot(yn,yn.current),!0}function $m(t,e,n){var i=t.stateNode;if(!i)throw Error(te(169));n?(t=c0(t,e,ss),i.__reactInternalMemoizedMergedChildContext=t,ft(yn),ft(rn),ot(rn,t)):ft(yn),ot(yn,n)}var Ui=null,vu=!1,nf=!1;function u0(t){Ui===null?Ui=[t]:Ui.push(t)}function JS(t){vu=!0,u0(t)}function Ur(){if(!nf&&Ui!==null){nf=!0;var t=0,e=tt;try{var n=Ui;for(tt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ui=null,vu=!1}catch(r){throw Ui!==null&&(Ui=Ui.slice(t+1)),Nv(lp,Ur),r}finally{tt=e,nf=!1}}return null}var Js=[],eo=0,Gc=null,Wc=0,Bn=[],zn=0,os=null,Ni=1,Fi="";function Wr(t,e){Js[eo++]=Wc,Js[eo++]=Gc,Gc=t,Wc=e}function f0(t,e,n){Bn[zn++]=Ni,Bn[zn++]=Fi,Bn[zn++]=os,os=t;var i=Ni;t=Fi;var r=32-ui(i)-1;i&=~(1<<r),n+=1;var s=32-ui(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ni=1<<32-ui(e)+r|n<<r|i,Fi=s+t}else Ni=1<<s|n<<r|i,Fi=t}function _p(t){t.return!==null&&(Wr(t,1),f0(t,1,0))}function vp(t){for(;t===Gc;)Gc=Js[--eo],Js[eo]=null,Wc=Js[--eo],Js[eo]=null;for(;t===os;)os=Bn[--zn],Bn[zn]=null,Fi=Bn[--zn],Bn[zn]=null,Ni=Bn[--zn],Bn[zn]=null}var Dn=null,bn=null,pt=!1,si=null;function h0(t,e){var n=Vn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function qm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Dn=t,bn=yr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Dn=t,bn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=os!==null?{id:Ni,overflow:Fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Vn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Dn=t,bn=null,!0):!1;default:return!1}}function Nh(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Fh(t){if(pt){var e=bn;if(e){var n=e;if(!qm(t,e)){if(Nh(t))throw Error(te(418));e=yr(n.nextSibling);var i=Dn;e&&qm(t,e)?h0(i,n):(t.flags=t.flags&-4097|2,pt=!1,Dn=t)}}else{if(Nh(t))throw Error(te(418));t.flags=t.flags&-4097|2,pt=!1,Dn=t}}}function Km(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Dn=t}function fl(t){if(t!==Dn)return!1;if(!pt)return Km(t),pt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Lh(t.type,t.memoizedProps)),e&&(e=bn)){if(Nh(t))throw d0(),Error(te(418));for(;e;)h0(t,e),e=yr(e.nextSibling)}if(Km(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(te(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){bn=yr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}bn=null}}else bn=Dn?yr(t.stateNode.nextSibling):null;return!0}function d0(){for(var t=bn;t;)t=yr(t.nextSibling)}function yo(){bn=Dn=null,pt=!1}function xp(t){si===null?si=[t]:si.push(t)}var eM=$i.ReactCurrentBatchConfig;function Ho(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(te(309));var i=n.stateNode}if(!i)throw Error(te(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(te(284));if(!n._owner)throw Error(te(290,t))}return t}function hl(t,e){throw t=Object.prototype.toString.call(e),Error(te(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Zm(t){var e=t._init;return e(t._payload)}function p0(t){function e(d,g){if(t){var v=d.deletions;v===null?(d.deletions=[g],d.flags|=16):v.push(g)}}function n(d,g){if(!t)return null;for(;g!==null;)e(d,g),g=g.sibling;return null}function i(d,g){for(d=new Map;g!==null;)g.key!==null?d.set(g.key,g):d.set(g.index,g),g=g.sibling;return d}function r(d,g){return d=wr(d,g),d.index=0,d.sibling=null,d}function s(d,g,v){return d.index=v,t?(v=d.alternate,v!==null?(v=v.index,v<g?(d.flags|=2,g):v):(d.flags|=2,g)):(d.flags|=1048576,g)}function o(d){return t&&d.alternate===null&&(d.flags|=2),d}function a(d,g,v,S){return g===null||g.tag!==6?(g=uf(v,d.mode,S),g.return=d,g):(g=r(g,v),g.return=d,g)}function l(d,g,v,S){var A=v.type;return A===Ys?u(d,g,v.props.children,S,v.key):g!==null&&(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ar&&Zm(A)===g.type)?(S=r(g,v.props),S.ref=Ho(d,g,v),S.return=d,S):(S=Ec(v.type,v.key,v.props,null,d.mode,S),S.ref=Ho(d,g,v),S.return=d,S)}function c(d,g,v,S){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=ff(v,d.mode,S),g.return=d,g):(g=r(g,v.children||[]),g.return=d,g)}function u(d,g,v,S,A){return g===null||g.tag!==7?(g=rs(v,d.mode,S,A),g.return=d,g):(g=r(g,v),g.return=d,g)}function h(d,g,v){if(typeof g=="string"&&g!==""||typeof g=="number")return g=uf(""+g,d.mode,v),g.return=d,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case tl:return v=Ec(g.type,g.key,g.props,null,d.mode,v),v.ref=Ho(d,null,g),v.return=d,v;case js:return g=ff(g,d.mode,v),g.return=d,g;case ar:var S=g._init;return h(d,S(g._payload),v)}if(aa(g)||Fo(g))return g=rs(g,d.mode,v,null),g.return=d,g;hl(d,g)}return null}function f(d,g,v,S){var A=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return A!==null?null:a(d,g,""+v,S);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case tl:return v.key===A?l(d,g,v,S):null;case js:return v.key===A?c(d,g,v,S):null;case ar:return A=v._init,f(d,g,A(v._payload),S)}if(aa(v)||Fo(v))return A!==null?null:u(d,g,v,S,null);hl(d,v)}return null}function p(d,g,v,S,A){if(typeof S=="string"&&S!==""||typeof S=="number")return d=d.get(v)||null,a(g,d,""+S,A);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case tl:return d=d.get(S.key===null?v:S.key)||null,l(g,d,S,A);case js:return d=d.get(S.key===null?v:S.key)||null,c(g,d,S,A);case ar:var w=S._init;return p(d,g,v,w(S._payload),A)}if(aa(S)||Fo(S))return d=d.get(v)||null,u(g,d,S,A,null);hl(g,S)}return null}function _(d,g,v,S){for(var A=null,w=null,M=g,R=g=0,L=null;M!==null&&R<v.length;R++){M.index>R?(L=M,M=null):L=M.sibling;var y=f(d,M,v[R],S);if(y===null){M===null&&(M=L);break}t&&M&&y.alternate===null&&e(d,M),g=s(y,g,R),w===null?A=y:w.sibling=y,w=y,M=L}if(R===v.length)return n(d,M),pt&&Wr(d,R),A;if(M===null){for(;R<v.length;R++)M=h(d,v[R],S),M!==null&&(g=s(M,g,R),w===null?A=M:w.sibling=M,w=M);return pt&&Wr(d,R),A}for(M=i(d,M);R<v.length;R++)L=p(M,d,R,v[R],S),L!==null&&(t&&L.alternate!==null&&M.delete(L.key===null?R:L.key),g=s(L,g,R),w===null?A=L:w.sibling=L,w=L);return t&&M.forEach(function(E){return e(d,E)}),pt&&Wr(d,R),A}function x(d,g,v,S){var A=Fo(v);if(typeof A!="function")throw Error(te(150));if(v=A.call(v),v==null)throw Error(te(151));for(var w=A=null,M=g,R=g=0,L=null,y=v.next();M!==null&&!y.done;R++,y=v.next()){M.index>R?(L=M,M=null):L=M.sibling;var E=f(d,M,y.value,S);if(E===null){M===null&&(M=L);break}t&&M&&E.alternate===null&&e(d,M),g=s(E,g,R),w===null?A=E:w.sibling=E,w=E,M=L}if(y.done)return n(d,M),pt&&Wr(d,R),A;if(M===null){for(;!y.done;R++,y=v.next())y=h(d,y.value,S),y!==null&&(g=s(y,g,R),w===null?A=y:w.sibling=y,w=y);return pt&&Wr(d,R),A}for(M=i(d,M);!y.done;R++,y=v.next())y=p(M,d,R,y.value,S),y!==null&&(t&&y.alternate!==null&&M.delete(y.key===null?R:y.key),g=s(y,g,R),w===null?A=y:w.sibling=y,w=y);return t&&M.forEach(function(D){return e(d,D)}),pt&&Wr(d,R),A}function m(d,g,v,S){if(typeof v=="object"&&v!==null&&v.type===Ys&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case tl:e:{for(var A=v.key,w=g;w!==null;){if(w.key===A){if(A=v.type,A===Ys){if(w.tag===7){n(d,w.sibling),g=r(w,v.props.children),g.return=d,d=g;break e}}else if(w.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ar&&Zm(A)===w.type){n(d,w.sibling),g=r(w,v.props),g.ref=Ho(d,w,v),g.return=d,d=g;break e}n(d,w);break}else e(d,w);w=w.sibling}v.type===Ys?(g=rs(v.props.children,d.mode,S,v.key),g.return=d,d=g):(S=Ec(v.type,v.key,v.props,null,d.mode,S),S.ref=Ho(d,g,v),S.return=d,d=S)}return o(d);case js:e:{for(w=v.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(d,g.sibling),g=r(g,v.children||[]),g.return=d,d=g;break e}else{n(d,g);break}else e(d,g);g=g.sibling}g=ff(v,d.mode,S),g.return=d,d=g}return o(d);case ar:return w=v._init,m(d,g,w(v._payload),S)}if(aa(v))return _(d,g,v,S);if(Fo(v))return x(d,g,v,S);hl(d,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,g!==null&&g.tag===6?(n(d,g.sibling),g=r(g,v),g.return=d,d=g):(n(d,g),g=uf(v,d.mode,S),g.return=d,d=g),o(d)):n(d,g)}return m}var So=p0(!0),m0=p0(!1),Xc=Ir(null),jc=null,to=null,yp=null;function Sp(){yp=to=jc=null}function Mp(t){var e=Xc.current;ft(Xc),t._currentValue=e}function Oh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function fo(t,e){jc=t,yp=to=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(vn=!0),t.firstContext=null)}function qn(t){var e=t._currentValue;if(yp!==t)if(t={context:t,memoizedValue:e,next:null},to===null){if(jc===null)throw Error(te(308));to=t,jc.dependencies={lanes:0,firstContext:t}}else to=to.next=t;return e}var Zr=null;function Ep(t){Zr===null?Zr=[t]:Zr.push(t)}function g0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Ep(e)):(n.next=r.next,r.next=n),e.interleaved=n,Wi(t,i)}function Wi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var lr=!1;function wp(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Bi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Sr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Wi(t,n)}return r=i.interleaved,r===null?(e.next=e,Ep(i)):(e.next=r.next,r.next=e),i.interleaved=e,Wi(t,n)}function _c(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,cp(t,n)}}function Qm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Yc(t,e,n,i){var r=t.updateQueue;lr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=t,x=a;switch(f=e,p=n,x.tag){case 1:if(_=x.payload,typeof _=="function"){h=_.call(p,h,f);break e}h=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=x.payload,f=typeof _=="function"?_.call(p,h,f):_,f==null)break e;h=_t({},h,f);break e;case 2:lr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=h):u=u.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(u===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ls|=o,t.lanes=o,t.memoizedState=h}}function Jm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(te(191,r));r.call(i)}}}var qa={},yi=Ir(qa),Oa=Ir(qa),Ba=Ir(qa);function Qr(t){if(t===qa)throw Error(te(174));return t}function Tp(t,e){switch(ot(Ba,e),ot(Oa,t),ot(yi,qa),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:_h(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=_h(e,t)}ft(yi),ot(yi,e)}function Mo(){ft(yi),ft(Oa),ft(Ba)}function v0(t){Qr(Ba.current);var e=Qr(yi.current),n=_h(e,t.type);e!==n&&(ot(Oa,t),ot(yi,n))}function Ap(t){Oa.current===t&&(ft(yi),ft(Oa))}var mt=Ir(0);function $c(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var rf=[];function Cp(){for(var t=0;t<rf.length;t++)rf[t]._workInProgressVersionPrimary=null;rf.length=0}var vc=$i.ReactCurrentDispatcher,sf=$i.ReactCurrentBatchConfig,as=0,gt=null,Lt=null,kt=null,qc=!1,va=!1,za=0,tM=0;function Kt(){throw Error(te(321))}function Rp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!hi(t[n],e[n]))return!1;return!0}function bp(t,e,n,i,r,s){if(as=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,vc.current=t===null||t.memoizedState===null?sM:oM,t=n(i,r),va){s=0;do{if(va=!1,za=0,25<=s)throw Error(te(301));s+=1,kt=Lt=null,e.updateQueue=null,vc.current=aM,t=n(i,r)}while(va)}if(vc.current=Kc,e=Lt!==null&&Lt.next!==null,as=0,kt=Lt=gt=null,qc=!1,e)throw Error(te(300));return t}function Pp(){var t=za!==0;return za=0,t}function mi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?gt.memoizedState=kt=t:kt=kt.next=t,kt}function Kn(){if(Lt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Lt.next;var e=kt===null?gt.memoizedState:kt.next;if(e!==null)kt=e,Lt=t;else{if(t===null)throw Error(te(310));Lt=t,t={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},kt===null?gt.memoizedState=kt=t:kt=kt.next=t}return kt}function ka(t,e){return typeof e=="function"?e(t):e}function of(t){var e=Kn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=Lt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((as&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,o=i):l=l.next=h,gt.lanes|=u,ls|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,hi(i,e.memoizedState)||(vn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,gt.lanes|=s,ls|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function af(t){var e=Kn(),n=e.queue;if(n===null)throw Error(te(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);hi(s,e.memoizedState)||(vn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function x0(){}function y0(t,e){var n=gt,i=Kn(),r=e(),s=!hi(i.memoizedState,r);if(s&&(i.memoizedState=r,vn=!0),i=i.queue,Lp(E0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||kt!==null&&kt.memoizedState.tag&1){if(n.flags|=2048,Ha(9,M0.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(te(349));as&30||S0(n,e,r)}return r}function S0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function M0(t,e,n,i){e.value=n,e.getSnapshot=i,w0(e)&&T0(t)}function E0(t,e,n){return n(function(){w0(e)&&T0(t)})}function w0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!hi(t,n)}catch{return!0}}function T0(t){var e=Wi(t,1);e!==null&&fi(e,t,1,-1)}function eg(t){var e=mi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ka,lastRenderedState:t},e.queue=t,t=t.dispatch=rM.bind(null,gt,t),[e.memoizedState,t]}function Ha(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=gt.updateQueue,e===null?(e={lastEffect:null,stores:null},gt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function A0(){return Kn().memoizedState}function xc(t,e,n,i){var r=mi();gt.flags|=t,r.memoizedState=Ha(1|e,n,void 0,i===void 0?null:i)}function xu(t,e,n,i){var r=Kn();i=i===void 0?null:i;var s=void 0;if(Lt!==null){var o=Lt.memoizedState;if(s=o.destroy,i!==null&&Rp(i,o.deps)){r.memoizedState=Ha(e,n,s,i);return}}gt.flags|=t,r.memoizedState=Ha(1|e,n,s,i)}function tg(t,e){return xc(8390656,8,t,e)}function Lp(t,e){return xu(2048,8,t,e)}function C0(t,e){return xu(4,2,t,e)}function R0(t,e){return xu(4,4,t,e)}function b0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function P0(t,e,n){return n=n!=null?n.concat([t]):null,xu(4,4,b0.bind(null,e,t),n)}function Dp(){}function L0(t,e){var n=Kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Rp(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function D0(t,e){var n=Kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Rp(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function I0(t,e,n){return as&21?(hi(n,e)||(n=Bv(),gt.lanes|=n,ls|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,vn=!0),t.memoizedState=n)}function nM(t,e){var n=tt;tt=n!==0&&4>n?n:4,t(!0);var i=sf.transition;sf.transition={};try{t(!1),e()}finally{tt=n,sf.transition=i}}function U0(){return Kn().memoizedState}function iM(t,e,n){var i=Er(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},N0(t))F0(e,n);else if(n=g0(t,e,n,i),n!==null){var r=ln();fi(n,t,i,r),O0(n,e,i)}}function rM(t,e,n){var i=Er(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(N0(t))F0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,hi(a,o)){var l=e.interleaved;l===null?(r.next=r,Ep(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=g0(t,e,r,i),n!==null&&(r=ln(),fi(n,t,i,r),O0(n,e,i))}}function N0(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function F0(t,e){va=qc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function O0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,cp(t,n)}}var Kc={readContext:qn,useCallback:Kt,useContext:Kt,useEffect:Kt,useImperativeHandle:Kt,useInsertionEffect:Kt,useLayoutEffect:Kt,useMemo:Kt,useReducer:Kt,useRef:Kt,useState:Kt,useDebugValue:Kt,useDeferredValue:Kt,useTransition:Kt,useMutableSource:Kt,useSyncExternalStore:Kt,useId:Kt,unstable_isNewReconciler:!1},sM={readContext:qn,useCallback:function(t,e){return mi().memoizedState=[t,e===void 0?null:e],t},useContext:qn,useEffect:tg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,xc(4194308,4,b0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return xc(4194308,4,t,e)},useInsertionEffect:function(t,e){return xc(4,2,t,e)},useMemo:function(t,e){var n=mi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=mi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=iM.bind(null,gt,t),[i.memoizedState,t]},useRef:function(t){var e=mi();return t={current:t},e.memoizedState=t},useState:eg,useDebugValue:Dp,useDeferredValue:function(t){return mi().memoizedState=t},useTransition:function(){var t=eg(!1),e=t[0];return t=nM.bind(null,t[1]),mi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=gt,r=mi();if(pt){if(n===void 0)throw Error(te(407));n=n()}else{if(n=e(),Ht===null)throw Error(te(349));as&30||S0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,tg(E0.bind(null,i,s,t),[t]),i.flags|=2048,Ha(9,M0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=mi(),e=Ht.identifierPrefix;if(pt){var n=Fi,i=Ni;n=(i&~(1<<32-ui(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=za++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=tM++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},oM={readContext:qn,useCallback:L0,useContext:qn,useEffect:Lp,useImperativeHandle:P0,useInsertionEffect:C0,useLayoutEffect:R0,useMemo:D0,useReducer:of,useRef:A0,useState:function(){return of(ka)},useDebugValue:Dp,useDeferredValue:function(t){var e=Kn();return I0(e,Lt.memoizedState,t)},useTransition:function(){var t=of(ka)[0],e=Kn().memoizedState;return[t,e]},useMutableSource:x0,useSyncExternalStore:y0,useId:U0,unstable_isNewReconciler:!1},aM={readContext:qn,useCallback:L0,useContext:qn,useEffect:Lp,useImperativeHandle:P0,useInsertionEffect:C0,useLayoutEffect:R0,useMemo:D0,useReducer:af,useRef:A0,useState:function(){return af(ka)},useDebugValue:Dp,useDeferredValue:function(t){var e=Kn();return Lt===null?e.memoizedState=t:I0(e,Lt.memoizedState,t)},useTransition:function(){var t=af(ka)[0],e=Kn().memoizedState;return[t,e]},useMutableSource:x0,useSyncExternalStore:y0,useId:U0,unstable_isNewReconciler:!1};function ii(t,e){if(t&&t.defaultProps){e=_t({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Bh(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:_t({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var yu={isMounted:function(t){return(t=t._reactInternals)?ds(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ln(),r=Er(t),s=Bi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Sr(t,s,r),e!==null&&(fi(e,t,r,i),_c(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ln(),r=Er(t),s=Bi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Sr(t,s,r),e!==null&&(fi(e,t,r,i),_c(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ln(),i=Er(t),r=Bi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Sr(t,r,i),e!==null&&(fi(e,t,i,n),_c(e,t,i))}};function ng(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Ia(n,i)||!Ia(r,s):!0}function B0(t,e,n){var i=!1,r=Rr,s=e.contextType;return typeof s=="object"&&s!==null?s=qn(s):(r=Sn(e)?ss:rn.current,i=e.contextTypes,s=(i=i!=null)?xo(t,r):Rr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=yu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function ig(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&yu.enqueueReplaceState(e,e.state,null)}function zh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},wp(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=qn(s):(s=Sn(e)?ss:rn.current,r.context=xo(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Bh(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&yu.enqueueReplaceState(r,r.state,null),Yc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Eo(t,e){try{var n="",i=e;do n+=Ny(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function lf(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function kh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var lM=typeof WeakMap=="function"?WeakMap:Map;function z0(t,e,n){n=Bi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Qc||(Qc=!0,Kh=i),kh(t,e)},n}function k0(t,e,n){n=Bi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){kh(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){kh(t,e),typeof i!="function"&&(Mr===null?Mr=new Set([this]):Mr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function rg(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new lM;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=MM.bind(null,t,e,n),e.then(t,t))}function sg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function og(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Bi(-1,1),e.tag=2,Sr(n,e,1))),n.lanes|=1),t)}var cM=$i.ReactCurrentOwner,vn=!1;function an(t,e,n,i){e.child=t===null?m0(e,null,n,i):So(e,t.child,n,i)}function ag(t,e,n,i,r){n=n.render;var s=e.ref;return fo(e,r),i=bp(t,e,n,i,s,r),n=Pp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Xi(t,e,r)):(pt&&n&&_p(e),e.flags|=1,an(t,e,i,r),e.child)}function lg(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!kp(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,H0(t,e,s,i,r)):(t=Ec(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ia,n(o,i)&&t.ref===e.ref)return Xi(t,e,r)}return e.flags|=1,t=wr(s,i),t.ref=e.ref,t.return=e,e.child=t}function H0(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Ia(s,i)&&t.ref===e.ref)if(vn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(vn=!0);else return e.lanes=t.lanes,Xi(t,e,r)}return Hh(t,e,n,i,r)}function V0(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ot(io,Rn),Rn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ot(io,Rn),Rn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ot(io,Rn),Rn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ot(io,Rn),Rn|=i;return an(t,e,r,n),e.child}function G0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Hh(t,e,n,i,r){var s=Sn(n)?ss:rn.current;return s=xo(e,s),fo(e,r),n=bp(t,e,n,i,s,r),i=Pp(),t!==null&&!vn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Xi(t,e,r)):(pt&&i&&_p(e),e.flags|=1,an(t,e,n,r),e.child)}function cg(t,e,n,i,r){if(Sn(n)){var s=!0;Vc(e)}else s=!1;if(fo(e,r),e.stateNode===null)yc(t,e),B0(e,n,i),zh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=qn(c):(c=Sn(n)?ss:rn.current,c=xo(e,c));var u=n.getDerivedStateFromProps,h=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&ig(e,o,i,c),lr=!1;var f=e.memoizedState;o.state=f,Yc(e,i,o,r),l=e.memoizedState,a!==i||f!==l||yn.current||lr?(typeof u=="function"&&(Bh(e,n,u,i),l=e.memoizedState),(a=lr||ng(e,n,a,i,f,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,_0(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ii(e.type,a),o.props=c,h=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=qn(l):(l=Sn(n)?ss:rn.current,l=xo(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||f!==l)&&ig(e,o,i,l),lr=!1,f=e.memoizedState,o.state=f,Yc(e,i,o,r);var _=e.memoizedState;a!==h||f!==_||yn.current||lr?(typeof p=="function"&&(Bh(e,n,p,i),_=e.memoizedState),(c=lr||ng(e,n,c,i,f,_,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,_,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),o.props=i,o.state=_,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Vh(t,e,n,i,s,r)}function Vh(t,e,n,i,r,s){G0(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&$m(e,n,!1),Xi(t,e,s);i=e.stateNode,cM.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=So(e,t.child,null,s),e.child=So(e,null,a,s)):an(t,e,a,s),e.memoizedState=i.state,r&&$m(e,n,!0),e.child}function W0(t){var e=t.stateNode;e.pendingContext?Ym(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Ym(t,e.context,!1),Tp(t,e.containerInfo)}function ug(t,e,n,i,r){return yo(),xp(r),e.flags|=256,an(t,e,n,i),e.child}var Gh={dehydrated:null,treeContext:null,retryLane:0};function Wh(t){return{baseLanes:t,cachePool:null,transitions:null}}function X0(t,e,n){var i=e.pendingProps,r=mt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ot(mt,r&1),t===null)return Fh(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Eu(o,i,0,null),t=rs(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Wh(n),e.memoizedState=Gh,t):Ip(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return uM(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=wr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=wr(a,s):(s=rs(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Wh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Gh,i}return s=t.child,t=s.sibling,i=wr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Ip(t,e){return e=Eu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function dl(t,e,n,i){return i!==null&&xp(i),So(e,t.child,null,n),t=Ip(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function uM(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=lf(Error(te(422))),dl(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Eu({mode:"visible",children:i.children},r,0,null),s=rs(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&So(e,t.child,null,o),e.child.memoizedState=Wh(o),e.memoizedState=Gh,s);if(!(e.mode&1))return dl(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(te(419)),i=lf(s,i,void 0),dl(t,e,o,i)}if(a=(o&t.childLanes)!==0,vn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Wi(t,r),fi(i,t,r,-1))}return zp(),i=lf(Error(te(421))),dl(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=EM.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,bn=yr(r.nextSibling),Dn=e,pt=!0,si=null,t!==null&&(Bn[zn++]=Ni,Bn[zn++]=Fi,Bn[zn++]=os,Ni=t.id,Fi=t.overflow,os=e),e=Ip(e,i.children),e.flags|=4096,e)}function fg(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Oh(t.return,e,n)}function cf(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function j0(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(an(t,e,i.children,n),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&fg(t,n,e);else if(t.tag===19)fg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ot(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&$c(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),cf(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&$c(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}cf(e,!0,n,null,s);break;case"together":cf(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function yc(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Xi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ls|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(te(153));if(e.child!==null){for(t=e.child,n=wr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=wr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function fM(t,e,n){switch(e.tag){case 3:W0(e),yo();break;case 5:v0(e);break;case 1:Sn(e.type)&&Vc(e);break;case 4:Tp(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ot(Xc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ot(mt,mt.current&1),e.flags|=128,null):n&e.child.childLanes?X0(t,e,n):(ot(mt,mt.current&1),t=Xi(t,e,n),t!==null?t.sibling:null);ot(mt,mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return j0(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ot(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,V0(t,e,n)}return Xi(t,e,n)}var Y0,Xh,$0,q0;Y0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xh=function(){};$0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Qr(yi.current);var s=null;switch(n){case"input":r=dh(t,r),i=dh(t,i),s=[];break;case"select":r=_t({},r,{value:void 0}),i=_t({},i,{value:void 0}),s=[];break;case"textarea":r=gh(t,r),i=gh(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=kc)}vh(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Aa.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Aa.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};q0=function(t,e,n,i){n!==i&&(e.flags|=4)};function Vo(t,e){if(!pt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Zt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function hM(t,e,n){var i=e.pendingProps;switch(vp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Zt(e),null;case 1:return Sn(e.type)&&Hc(),Zt(e),null;case 3:return i=e.stateNode,Mo(),ft(yn),ft(rn),Cp(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(fl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,si!==null&&(Jh(si),si=null))),Xh(t,e),Zt(e),null;case 5:Ap(e);var r=Qr(Ba.current);if(n=e.type,t!==null&&e.stateNode!=null)$0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(te(166));return Zt(e),null}if(t=Qr(yi.current),fl(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[vi]=e,i[Fa]=s,t=(e.mode&1)!==0,n){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<ca.length;r++)ct(ca[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":ym(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Mm(i,s),ct("invalid",i)}vh(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ul(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ul(i.textContent,a,t),r=["children",""+a]):Aa.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ct("scroll",i)}switch(n){case"input":nl(i),Sm(i,s,!0);break;case"textarea":nl(i),Em(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=kc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Ev(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[vi]=e,t[Fa]=i,Y0(t,e,!1,!1),e.stateNode=t;e:{switch(o=xh(n,i),n){case"dialog":ct("cancel",t),ct("close",t),r=i;break;case"iframe":case"object":case"embed":ct("load",t),r=i;break;case"video":case"audio":for(r=0;r<ca.length;r++)ct(ca[r],t);r=i;break;case"source":ct("error",t),r=i;break;case"img":case"image":case"link":ct("error",t),ct("load",t),r=i;break;case"details":ct("toggle",t),r=i;break;case"input":ym(t,i),r=dh(t,i),ct("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=_t({},i,{value:void 0}),ct("invalid",t);break;case"textarea":Mm(t,i),r=gh(t,i),ct("invalid",t);break;default:r=i}vh(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Av(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&wv(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ca(t,l):typeof l=="number"&&Ca(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Aa.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",t):l!=null&&ip(t,s,l,o))}switch(n){case"input":nl(t),Sm(t,i,!1);break;case"textarea":nl(t),Em(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Cr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ao(t,!!i.multiple,s,!1):i.defaultValue!=null&&ao(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=kc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Zt(e),null;case 6:if(t&&e.stateNode!=null)q0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(te(166));if(n=Qr(Ba.current),Qr(yi.current),fl(e)){if(i=e.stateNode,n=e.memoizedProps,i[vi]=e,(s=i.nodeValue!==n)&&(t=Dn,t!==null))switch(t.tag){case 3:ul(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ul(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[vi]=e,e.stateNode=i}return Zt(e),null;case 13:if(ft(mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(pt&&bn!==null&&e.mode&1&&!(e.flags&128))d0(),yo(),e.flags|=98560,s=!1;else if(s=fl(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(te(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(te(317));s[vi]=e}else yo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Zt(e),s=!1}else si!==null&&(Jh(si),si=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||mt.current&1?Ut===0&&(Ut=3):zp())),e.updateQueue!==null&&(e.flags|=4),Zt(e),null);case 4:return Mo(),Xh(t,e),t===null&&Ua(e.stateNode.containerInfo),Zt(e),null;case 10:return Mp(e.type._context),Zt(e),null;case 17:return Sn(e.type)&&Hc(),Zt(e),null;case 19:if(ft(mt),s=e.memoizedState,s===null)return Zt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Vo(s,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=$c(t),o!==null){for(e.flags|=128,Vo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ot(mt,mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&wt()>wo&&(e.flags|=128,i=!0,Vo(s,!1),e.lanes=4194304)}else{if(!i)if(t=$c(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Vo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!pt)return Zt(e),null}else 2*wt()-s.renderingStartTime>wo&&n!==1073741824&&(e.flags|=128,i=!0,Vo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=wt(),e.sibling=null,n=mt.current,ot(mt,i?n&1|2:n&1),e):(Zt(e),null);case 22:case 23:return Bp(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Rn&1073741824&&(Zt(e),e.subtreeFlags&6&&(e.flags|=8192)):Zt(e),null;case 24:return null;case 25:return null}throw Error(te(156,e.tag))}function dM(t,e){switch(vp(e),e.tag){case 1:return Sn(e.type)&&Hc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Mo(),ft(yn),ft(rn),Cp(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Ap(e),null;case 13:if(ft(mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(te(340));yo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ft(mt),null;case 4:return Mo(),null;case 10:return Mp(e.type._context),null;case 22:case 23:return Bp(),null;case 24:return null;default:return null}}var pl=!1,tn=!1,pM=typeof WeakSet=="function"?WeakSet:Set,pe=null;function no(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){yt(t,e,i)}else n.current=null}function jh(t,e,n){try{n()}catch(i){yt(t,e,i)}}var hg=!1;function mM(t,e){if(bh=Oc,t=e0(),gp(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,h=t,f=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(a=o+r),h!==s||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)f=h,h=p;for(;;){if(h===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(p=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ph={focusedElem:t,selectionRange:n},Oc=!1,pe=e;pe!==null;)if(e=pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pe=t;else for(;pe!==null;){e=pe;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var x=_.memoizedProps,m=_.memoizedState,d=e.stateNode,g=d.getSnapshotBeforeUpdate(e.elementType===e.type?x:ii(e.type,x),m);d.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(te(163))}}catch(S){yt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,pe=t;break}pe=e.return}return _=hg,hg=!1,_}function xa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&jh(e,n,s)}r=r.next}while(r!==i)}}function Su(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Yh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function K0(t){var e=t.alternate;e!==null&&(t.alternate=null,K0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[vi],delete e[Fa],delete e[Ih],delete e[ZS],delete e[QS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Z0(t){return t.tag===5||t.tag===3||t.tag===4}function dg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Z0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $h(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=kc));else if(i!==4&&(t=t.child,t!==null))for($h(t,e,n),t=t.sibling;t!==null;)$h(t,e,n),t=t.sibling}function qh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(qh(t,e,n),t=t.sibling;t!==null;)qh(t,e,n),t=t.sibling}var Xt=null,ri=!1;function Ki(t,e,n){for(n=n.child;n!==null;)Q0(t,e,n),n=n.sibling}function Q0(t,e,n){if(xi&&typeof xi.onCommitFiberUnmount=="function")try{xi.onCommitFiberUnmount(du,n)}catch{}switch(n.tag){case 5:tn||no(n,e);case 6:var i=Xt,r=ri;Xt=null,Ki(t,e,n),Xt=i,ri=r,Xt!==null&&(ri?(t=Xt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Xt.removeChild(n.stateNode));break;case 18:Xt!==null&&(ri?(t=Xt,n=n.stateNode,t.nodeType===8?tf(t.parentNode,n):t.nodeType===1&&tf(t,n),La(t)):tf(Xt,n.stateNode));break;case 4:i=Xt,r=ri,Xt=n.stateNode.containerInfo,ri=!0,Ki(t,e,n),Xt=i,ri=r;break;case 0:case 11:case 14:case 15:if(!tn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&jh(n,e,o),r=r.next}while(r!==i)}Ki(t,e,n);break;case 1:if(!tn&&(no(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){yt(n,e,a)}Ki(t,e,n);break;case 21:Ki(t,e,n);break;case 22:n.mode&1?(tn=(i=tn)||n.memoizedState!==null,Ki(t,e,n),tn=i):Ki(t,e,n);break;default:Ki(t,e,n)}}function pg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new pM),e.forEach(function(i){var r=wM.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Qn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Xt=a.stateNode,ri=!1;break e;case 3:Xt=a.stateNode.containerInfo,ri=!0;break e;case 4:Xt=a.stateNode.containerInfo,ri=!0;break e}a=a.return}if(Xt===null)throw Error(te(160));Q0(s,o,r),Xt=null,ri=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){yt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)J0(e,t),e=e.sibling}function J0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Qn(e,t),pi(t),i&4){try{xa(3,t,t.return),Su(3,t)}catch(x){yt(t,t.return,x)}try{xa(5,t,t.return)}catch(x){yt(t,t.return,x)}}break;case 1:Qn(e,t),pi(t),i&512&&n!==null&&no(n,n.return);break;case 5:if(Qn(e,t),pi(t),i&512&&n!==null&&no(n,n.return),t.flags&32){var r=t.stateNode;try{Ca(r,"")}catch(x){yt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Sv(r,s),xh(a,o);var c=xh(a,s);for(o=0;o<l.length;o+=2){var u=l[o],h=l[o+1];u==="style"?Av(r,h):u==="dangerouslySetInnerHTML"?wv(r,h):u==="children"?Ca(r,h):ip(r,u,h,c)}switch(a){case"input":ph(r,s);break;case"textarea":Mv(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ao(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?ao(r,!!s.multiple,s.defaultValue,!0):ao(r,!!s.multiple,s.multiple?[]:"",!1))}r[Fa]=s}catch(x){yt(t,t.return,x)}}break;case 6:if(Qn(e,t),pi(t),i&4){if(t.stateNode===null)throw Error(te(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){yt(t,t.return,x)}}break;case 3:if(Qn(e,t),pi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{La(e.containerInfo)}catch(x){yt(t,t.return,x)}break;case 4:Qn(e,t),pi(t);break;case 13:Qn(e,t),pi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Fp=wt())),i&4&&pg(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(tn=(c=tn)||u,Qn(e,t),tn=c):Qn(e,t),pi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(pe=t,u=t.child;u!==null;){for(h=pe=u;pe!==null;){switch(f=pe,p=f.child,f.tag){case 0:case 11:case 14:case 15:xa(4,f,f.return);break;case 1:no(f,f.return);var _=f.stateNode;if(typeof _.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(x){yt(i,n,x)}}break;case 5:no(f,f.return);break;case 22:if(f.memoizedState!==null){gg(h);continue}}p!==null?(p.return=f,pe=p):gg(h)}u=u.sibling}e:for(u=null,h=t;;){if(h.tag===5){if(u===null){u=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Tv("display",o))}catch(x){yt(t,t.return,x)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(x){yt(t,t.return,x)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Qn(e,t),pi(t),i&4&&pg(t);break;case 21:break;default:Qn(e,t),pi(t)}}function pi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Z0(n)){var i=n;break e}n=n.return}throw Error(te(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ca(r,""),i.flags&=-33);var s=dg(t);qh(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=dg(t);$h(t,a,o);break;default:throw Error(te(161))}}catch(l){yt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function gM(t,e,n){pe=t,ex(t)}function ex(t,e,n){for(var i=(t.mode&1)!==0;pe!==null;){var r=pe,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||pl;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||tn;a=pl;var c=tn;if(pl=o,(tn=l)&&!c)for(pe=r;pe!==null;)o=pe,l=o.child,o.tag===22&&o.memoizedState!==null?_g(r):l!==null?(l.return=o,pe=l):_g(r);for(;s!==null;)pe=s,ex(s),s=s.sibling;pe=r,pl=a,tn=c}mg(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,pe=s):mg(t)}}function mg(t){for(;pe!==null;){var e=pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:tn||Su(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!tn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ii(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Jm(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Jm(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&La(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(te(163))}tn||e.flags&512&&Yh(e)}catch(f){yt(e,e.return,f)}}if(e===t){pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,pe=n;break}pe=e.return}}function gg(t){for(;pe!==null;){var e=pe;if(e===t){pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,pe=n;break}pe=e.return}}function _g(t){for(;pe!==null;){var e=pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Su(4,e)}catch(l){yt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){yt(e,r,l)}}var s=e.return;try{Yh(e)}catch(l){yt(e,s,l)}break;case 5:var o=e.return;try{Yh(e)}catch(l){yt(e,o,l)}}}catch(l){yt(e,e.return,l)}if(e===t){pe=null;break}var a=e.sibling;if(a!==null){a.return=e.return,pe=a;break}pe=e.return}}var _M=Math.ceil,Zc=$i.ReactCurrentDispatcher,Up=$i.ReactCurrentOwner,Yn=$i.ReactCurrentBatchConfig,je=0,Ht=null,Ct=null,$t=0,Rn=0,io=Ir(0),Ut=0,Va=null,ls=0,Mu=0,Np=0,ya=null,gn=null,Fp=0,wo=1/0,Ii=null,Qc=!1,Kh=null,Mr=null,ml=!1,pr=null,Jc=0,Sa=0,Zh=null,Sc=-1,Mc=0;function ln(){return je&6?wt():Sc!==-1?Sc:Sc=wt()}function Er(t){return t.mode&1?je&2&&$t!==0?$t&-$t:eM.transition!==null?(Mc===0&&(Mc=Bv()),Mc):(t=tt,t!==0||(t=window.event,t=t===void 0?16:Xv(t.type)),t):1}function fi(t,e,n,i){if(50<Sa)throw Sa=0,Zh=null,Error(te(185));ja(t,n,i),(!(je&2)||t!==Ht)&&(t===Ht&&(!(je&2)&&(Mu|=n),Ut===4&&fr(t,$t)),Mn(t,i),n===1&&je===0&&!(e.mode&1)&&(wo=wt()+500,vu&&Ur()))}function Mn(t,e){var n=t.callbackNode;eS(t,e);var i=Fc(t,t===Ht?$t:0);if(i===0)n!==null&&Am(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Am(n),e===1)t.tag===0?JS(vg.bind(null,t)):u0(vg.bind(null,t)),qS(function(){!(je&6)&&Ur()}),n=null;else{switch(zv(i)){case 1:n=lp;break;case 4:n=Fv;break;case 16:n=Nc;break;case 536870912:n=Ov;break;default:n=Nc}n=lx(n,tx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function tx(t,e){if(Sc=-1,Mc=0,je&6)throw Error(te(327));var n=t.callbackNode;if(ho()&&t.callbackNode!==n)return null;var i=Fc(t,t===Ht?$t:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=eu(t,i);else{e=i;var r=je;je|=2;var s=ix();(Ht!==t||$t!==e)&&(Ii=null,wo=wt()+500,is(t,e));do try{yM();break}catch(a){nx(t,a)}while(!0);Sp(),Zc.current=s,je=r,Ct!==null?e=0:(Ht=null,$t=0,e=Ut)}if(e!==0){if(e===2&&(r=wh(t),r!==0&&(i=r,e=Qh(t,r))),e===1)throw n=Va,is(t,0),fr(t,i),Mn(t,wt()),n;if(e===6)fr(t,i);else{if(r=t.current.alternate,!(i&30)&&!vM(r)&&(e=eu(t,i),e===2&&(s=wh(t),s!==0&&(i=s,e=Qh(t,s))),e===1))throw n=Va,is(t,0),fr(t,i),Mn(t,wt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(te(345));case 2:Xr(t,gn,Ii);break;case 3:if(fr(t,i),(i&130023424)===i&&(e=Fp+500-wt(),10<e)){if(Fc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){ln(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Dh(Xr.bind(null,t,gn,Ii),e);break}Xr(t,gn,Ii);break;case 4:if(fr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ui(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=wt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*_M(i/1960))-i,10<i){t.timeoutHandle=Dh(Xr.bind(null,t,gn,Ii),i);break}Xr(t,gn,Ii);break;case 5:Xr(t,gn,Ii);break;default:throw Error(te(329))}}}return Mn(t,wt()),t.callbackNode===n?tx.bind(null,t):null}function Qh(t,e){var n=ya;return t.current.memoizedState.isDehydrated&&(is(t,e).flags|=256),t=eu(t,e),t!==2&&(e=gn,gn=n,e!==null&&Jh(e)),t}function Jh(t){gn===null?gn=t:gn.push.apply(gn,t)}function vM(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!hi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function fr(t,e){for(e&=~Np,e&=~Mu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ui(e),i=1<<n;t[n]=-1,e&=~i}}function vg(t){if(je&6)throw Error(te(327));ho();var e=Fc(t,0);if(!(e&1))return Mn(t,wt()),null;var n=eu(t,e);if(t.tag!==0&&n===2){var i=wh(t);i!==0&&(e=i,n=Qh(t,i))}if(n===1)throw n=Va,is(t,0),fr(t,e),Mn(t,wt()),n;if(n===6)throw Error(te(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Xr(t,gn,Ii),Mn(t,wt()),null}function Op(t,e){var n=je;je|=1;try{return t(e)}finally{je=n,je===0&&(wo=wt()+500,vu&&Ur())}}function cs(t){pr!==null&&pr.tag===0&&!(je&6)&&ho();var e=je;je|=1;var n=Yn.transition,i=tt;try{if(Yn.transition=null,tt=1,t)return t()}finally{tt=i,Yn.transition=n,je=e,!(je&6)&&Ur()}}function Bp(){Rn=io.current,ft(io)}function is(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,$S(n)),Ct!==null)for(n=Ct.return;n!==null;){var i=n;switch(vp(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Hc();break;case 3:Mo(),ft(yn),ft(rn),Cp();break;case 5:Ap(i);break;case 4:Mo();break;case 13:ft(mt);break;case 19:ft(mt);break;case 10:Mp(i.type._context);break;case 22:case 23:Bp()}n=n.return}if(Ht=t,Ct=t=wr(t.current,null),$t=Rn=e,Ut=0,Va=null,Np=Mu=ls=0,gn=ya=null,Zr!==null){for(e=0;e<Zr.length;e++)if(n=Zr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Zr=null}return t}function nx(t,e){do{var n=Ct;try{if(Sp(),vc.current=Kc,qc){for(var i=gt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}qc=!1}if(as=0,kt=Lt=gt=null,va=!1,za=0,Up.current=null,n===null||n.return===null){Ut=1,Va=e,Ct=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=$t,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=sg(o);if(p!==null){p.flags&=-257,og(p,o,a,s,e),p.mode&1&&rg(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var x=new Set;x.add(l),e.updateQueue=x}else _.add(l);break e}else{if(!(e&1)){rg(s,c,e),zp();break e}l=Error(te(426))}}else if(pt&&a.mode&1){var m=sg(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),og(m,o,a,s,e),xp(Eo(l,a));break e}}s=l=Eo(l,a),Ut!==4&&(Ut=2),ya===null?ya=[s]:ya.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=z0(s,l,e);Qm(s,d);break e;case 1:a=l;var g=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof g.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Mr===null||!Mr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=k0(s,a,e);Qm(s,S);break e}}s=s.return}while(s!==null)}sx(n)}catch(A){e=A,Ct===n&&n!==null&&(Ct=n=n.return);continue}break}while(!0)}function ix(){var t=Zc.current;return Zc.current=Kc,t===null?Kc:t}function zp(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Ht===null||!(ls&268435455)&&!(Mu&268435455)||fr(Ht,$t)}function eu(t,e){var n=je;je|=2;var i=ix();(Ht!==t||$t!==e)&&(Ii=null,is(t,e));do try{xM();break}catch(r){nx(t,r)}while(!0);if(Sp(),je=n,Zc.current=i,Ct!==null)throw Error(te(261));return Ht=null,$t=0,Ut}function xM(){for(;Ct!==null;)rx(Ct)}function yM(){for(;Ct!==null&&!Xy();)rx(Ct)}function rx(t){var e=ax(t.alternate,t,Rn);t.memoizedProps=t.pendingProps,e===null?sx(t):Ct=e,Up.current=null}function sx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=dM(n,e),n!==null){n.flags&=32767,Ct=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,Ct=null;return}}else if(n=hM(n,e,Rn),n!==null){Ct=n;return}if(e=e.sibling,e!==null){Ct=e;return}Ct=e=t}while(e!==null);Ut===0&&(Ut=5)}function Xr(t,e,n){var i=tt,r=Yn.transition;try{Yn.transition=null,tt=1,SM(t,e,n,i)}finally{Yn.transition=r,tt=i}return null}function SM(t,e,n,i){do ho();while(pr!==null);if(je&6)throw Error(te(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(te(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(tS(t,s),t===Ht&&(Ct=Ht=null,$t=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ml||(ml=!0,lx(Nc,function(){return ho(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Yn.transition,Yn.transition=null;var o=tt;tt=1;var a=je;je|=4,Up.current=null,mM(t,n),J0(n,t),HS(Ph),Oc=!!bh,Ph=bh=null,t.current=n,gM(n),jy(),je=a,tt=o,Yn.transition=s}else t.current=n;if(ml&&(ml=!1,pr=t,Jc=r),s=t.pendingLanes,s===0&&(Mr=null),qy(n.stateNode),Mn(t,wt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Qc)throw Qc=!1,t=Kh,Kh=null,t;return Jc&1&&t.tag!==0&&ho(),s=t.pendingLanes,s&1?t===Zh?Sa++:(Sa=0,Zh=t):Sa=0,Ur(),null}function ho(){if(pr!==null){var t=zv(Jc),e=Yn.transition,n=tt;try{if(Yn.transition=null,tt=16>t?16:t,pr===null)var i=!1;else{if(t=pr,pr=null,Jc=0,je&6)throw Error(te(331));var r=je;for(je|=4,pe=t.current;pe!==null;){var s=pe,o=s.child;if(pe.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(pe=c;pe!==null;){var u=pe;switch(u.tag){case 0:case 11:case 15:xa(8,u,s)}var h=u.child;if(h!==null)h.return=u,pe=h;else for(;pe!==null;){u=pe;var f=u.sibling,p=u.return;if(K0(u),u===c){pe=null;break}if(f!==null){f.return=p,pe=f;break}pe=p}}}var _=s.alternate;if(_!==null){var x=_.child;if(x!==null){_.child=null;do{var m=x.sibling;x.sibling=null,x=m}while(x!==null)}}pe=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,pe=o;else e:for(;pe!==null;){if(s=pe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:xa(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,pe=d;break e}pe=s.return}}var g=t.current;for(pe=g;pe!==null;){o=pe;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,pe=v;else e:for(o=g;pe!==null;){if(a=pe,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Su(9,a)}}catch(A){yt(a,a.return,A)}if(a===o){pe=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,pe=S;break e}pe=a.return}}if(je=r,Ur(),xi&&typeof xi.onPostCommitFiberRoot=="function")try{xi.onPostCommitFiberRoot(du,t)}catch{}i=!0}return i}finally{tt=n,Yn.transition=e}}return!1}function xg(t,e,n){e=Eo(n,e),e=z0(t,e,1),t=Sr(t,e,1),e=ln(),t!==null&&(ja(t,1,e),Mn(t,e))}function yt(t,e,n){if(t.tag===3)xg(t,t,n);else for(;e!==null;){if(e.tag===3){xg(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Mr===null||!Mr.has(i))){t=Eo(n,t),t=k0(e,t,1),e=Sr(e,t,1),t=ln(),e!==null&&(ja(e,1,t),Mn(e,t));break}}e=e.return}}function MM(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=ln(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&($t&n)===n&&(Ut===4||Ut===3&&($t&130023424)===$t&&500>wt()-Fp?is(t,0):Np|=n),Mn(t,e)}function ox(t,e){e===0&&(t.mode&1?(e=sl,sl<<=1,!(sl&130023424)&&(sl=4194304)):e=1);var n=ln();t=Wi(t,e),t!==null&&(ja(t,e,n),Mn(t,n))}function EM(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),ox(t,n)}function wM(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(te(314))}i!==null&&i.delete(e),ox(t,n)}var ax;ax=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||yn.current)vn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return vn=!1,fM(t,e,n);vn=!!(t.flags&131072)}else vn=!1,pt&&e.flags&1048576&&f0(e,Wc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;yc(t,e),t=e.pendingProps;var r=xo(e,rn.current);fo(e,n),r=bp(null,e,i,t,r,n);var s=Pp();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Sn(i)?(s=!0,Vc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,wp(e),r.updater=yu,e.stateNode=r,r._reactInternals=e,zh(e,i,t,n),e=Vh(null,e,i,!0,s,n)):(e.tag=0,pt&&s&&_p(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(yc(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=AM(i),t=ii(i,t),r){case 0:e=Hh(null,e,i,t,n);break e;case 1:e=cg(null,e,i,t,n);break e;case 11:e=ag(null,e,i,t,n);break e;case 14:e=lg(null,e,i,ii(i.type,t),n);break e}throw Error(te(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),Hh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),cg(t,e,i,r,n);case 3:e:{if(W0(e),t===null)throw Error(te(387));i=e.pendingProps,s=e.memoizedState,r=s.element,_0(t,e),Yc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Eo(Error(te(423)),e),e=ug(t,e,i,n,r);break e}else if(i!==r){r=Eo(Error(te(424)),e),e=ug(t,e,i,n,r);break e}else for(bn=yr(e.stateNode.containerInfo.firstChild),Dn=e,pt=!0,si=null,n=m0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(yo(),i===r){e=Xi(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return v0(e),t===null&&Fh(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Lh(i,r)?o=null:s!==null&&Lh(i,s)&&(e.flags|=32),G0(t,e),an(t,e,o,n),e.child;case 6:return t===null&&Fh(e),null;case 13:return X0(t,e,n);case 4:return Tp(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=So(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),ag(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ot(Xc,i._currentValue),i._currentValue=o,s!==null)if(hi(s.value,o)){if(s.children===r.children&&!yn.current){e=Xi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Bi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Oh(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(te(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Oh(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,fo(e,n),r=qn(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=ii(i,e.pendingProps),r=ii(i.type,r),lg(t,e,i,r,n);case 15:return H0(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ii(i,r),yc(t,e),e.tag=1,Sn(i)?(t=!0,Vc(e)):t=!1,fo(e,n),B0(e,i,r),zh(e,i,r,n),Vh(null,e,i,!0,t,n);case 19:return j0(t,e,n);case 22:return V0(t,e,n)}throw Error(te(156,e.tag))};function lx(t,e){return Nv(t,e)}function TM(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Vn(t,e,n,i){return new TM(t,e,n,i)}function kp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function AM(t){if(typeof t=="function")return kp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===sp)return 11;if(t===op)return 14}return 2}function wr(t,e){var n=t.alternate;return n===null?(n=Vn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ec(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")kp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ys:return rs(n.children,r,s,e);case rp:o=8,r|=8;break;case ch:return t=Vn(12,n,e,r|2),t.elementType=ch,t.lanes=s,t;case uh:return t=Vn(13,n,e,r),t.elementType=uh,t.lanes=s,t;case fh:return t=Vn(19,n,e,r),t.elementType=fh,t.lanes=s,t;case vv:return Eu(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case gv:o=10;break e;case _v:o=9;break e;case sp:o=11;break e;case op:o=14;break e;case ar:o=16,i=null;break e}throw Error(te(130,t==null?t:typeof t,""))}return e=Vn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function rs(t,e,n,i){return t=Vn(7,t,i,e),t.lanes=n,t}function Eu(t,e,n,i){return t=Vn(22,t,i,e),t.elementType=vv,t.lanes=n,t.stateNode={isHidden:!1},t}function uf(t,e,n){return t=Vn(6,t,null,e),t.lanes=n,t}function ff(t,e,n){return e=Vn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function CM(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Wu(0),this.expirationTimes=Wu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Wu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Hp(t,e,n,i,r,s,o,a,l){return t=new CM(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Vn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},wp(s),t}function RM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:js,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function cx(t){if(!t)return Rr;t=t._reactInternals;e:{if(ds(t)!==t||t.tag!==1)throw Error(te(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Sn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(te(171))}if(t.tag===1){var n=t.type;if(Sn(n))return c0(t,n,e)}return e}function ux(t,e,n,i,r,s,o,a,l){return t=Hp(n,i,!0,t,r,s,o,a,l),t.context=cx(null),n=t.current,i=ln(),r=Er(n),s=Bi(i,r),s.callback=e??null,Sr(n,s,r),t.current.lanes=r,ja(t,r,i),Mn(t,i),t}function wu(t,e,n,i){var r=e.current,s=ln(),o=Er(r);return n=cx(n),e.context===null?e.context=n:e.pendingContext=n,e=Bi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Sr(r,e,o),t!==null&&(fi(t,r,o,s),_c(t,r,o)),o}function tu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function yg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Vp(t,e){yg(t,e),(t=t.alternate)&&yg(t,e)}function bM(){return null}var fx=typeof reportError=="function"?reportError:function(t){console.error(t)};function Gp(t){this._internalRoot=t}Tu.prototype.render=Gp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(te(409));wu(t,e,null,null)};Tu.prototype.unmount=Gp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;cs(function(){wu(null,t,null,null)}),e[Gi]=null}};function Tu(t){this._internalRoot=t}Tu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Vv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ur.length&&e!==0&&e<ur[n].priority;n++);ur.splice(n,0,t),n===0&&Wv(t)}};function Wp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Au(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Sg(){}function PM(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=tu(o);s.call(c)}}var o=ux(e,i,t,0,null,!1,!1,"",Sg);return t._reactRootContainer=o,t[Gi]=o.current,Ua(t.nodeType===8?t.parentNode:t),cs(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=tu(l);a.call(c)}}var l=Hp(t,0,!1,null,null,!1,!1,"",Sg);return t._reactRootContainer=l,t[Gi]=l.current,Ua(t.nodeType===8?t.parentNode:t),cs(function(){wu(e,l,n,i)}),l}function Cu(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=tu(o);a.call(l)}}wu(e,o,t,r)}else o=PM(n,e,t,r,i);return tu(o)}kv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=la(e.pendingLanes);n!==0&&(cp(e,n|1),Mn(e,wt()),!(je&6)&&(wo=wt()+500,Ur()))}break;case 13:cs(function(){var i=Wi(t,1);if(i!==null){var r=ln();fi(i,t,1,r)}}),Vp(t,1)}};up=function(t){if(t.tag===13){var e=Wi(t,134217728);if(e!==null){var n=ln();fi(e,t,134217728,n)}Vp(t,134217728)}};Hv=function(t){if(t.tag===13){var e=Er(t),n=Wi(t,e);if(n!==null){var i=ln();fi(n,t,e,i)}Vp(t,e)}};Vv=function(){return tt};Gv=function(t,e){var n=tt;try{return tt=t,e()}finally{tt=n}};Sh=function(t,e,n){switch(e){case"input":if(ph(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=_u(i);if(!r)throw Error(te(90));yv(i),ph(i,r)}}}break;case"textarea":Mv(t,n);break;case"select":e=n.value,e!=null&&ao(t,!!n.multiple,e,!1)}};bv=Op;Pv=cs;var LM={usingClientEntryPoint:!1,Events:[$a,Zs,_u,Cv,Rv,Op]},Go={findFiberByHostInstance:Kr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},DM={bundleType:Go.bundleType,version:Go.version,rendererPackageName:Go.rendererPackageName,rendererConfig:Go.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:$i.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Iv(t),t===null?null:t.stateNode},findFiberByHostInstance:Go.findFiberByHostInstance||bM,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gl.isDisabled&&gl.supportsFiber)try{du=gl.inject(DM),xi=gl}catch{}}Un.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=LM;Un.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wp(e))throw Error(te(200));return RM(t,e,null,n)};Un.createRoot=function(t,e){if(!Wp(t))throw Error(te(299));var n=!1,i="",r=fx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Hp(t,1,!1,null,null,n,!1,i,r),t[Gi]=e.current,Ua(t.nodeType===8?t.parentNode:t),new Gp(e)};Un.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(te(188)):(t=Object.keys(t).join(","),Error(te(268,t)));return t=Iv(e),t=t===null?null:t.stateNode,t};Un.flushSync=function(t){return cs(t)};Un.hydrate=function(t,e,n){if(!Au(e))throw Error(te(200));return Cu(null,t,e,!0,n)};Un.hydrateRoot=function(t,e,n){if(!Wp(t))throw Error(te(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=fx;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ux(e,null,t,1,n??null,r,!1,s,o),t[Gi]=e.current,Ua(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Tu(e)};Un.render=function(t,e,n){if(!Au(e))throw Error(te(200));return Cu(null,t,e,!1,n)};Un.unmountComponentAtNode=function(t){if(!Au(t))throw Error(te(40));return t._reactRootContainer?(cs(function(){Cu(null,null,t,!1,function(){t._reactRootContainer=null,t[Gi]=null})}),!0):!1};Un.unstable_batchedUpdates=Op;Un.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Au(n))throw Error(te(200));if(t==null||t._reactInternals===void 0)throw Error(te(38));return Cu(t,e,n,!1,i)};Un.version="18.3.1-next-f1338f8080-20240426";function hx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hx)}catch(t){console.error(t)}}hx(),hv.exports=Un;var IM=hv.exports,Mg=IM;ah.createRoot=Mg.createRoot,ah.hydrateRoot=Mg.hydrateRoot;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xp="169",zi={ROTATE:0,DOLLY:1,PAN:2},ro={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},UM=0,Eg=1,NM=2,dx=1,FM=2,Li=3,Mi=0,cn=1,Hn=2,Tr=0,po=1,wg=2,Tg=3,Ag=4,OM=5,$r=100,BM=101,zM=102,kM=103,HM=104,VM=200,GM=201,WM=202,XM=203,ed=204,td=205,jM=206,YM=207,$M=208,qM=209,KM=210,ZM=211,QM=212,JM=213,eE=214,nd=0,id=1,rd=2,To=3,sd=4,od=5,ad=6,ld=7,jp=0,tE=1,nE=2,Ar=0,iE=1,rE=2,sE=3,oE=4,aE=5,lE=6,cE=7,px=300,Ao=301,Co=302,cd=303,ud=304,Ru=306,fd=1e3,Jr=1001,hd=1002,xn=1003,uE=1004,_l=1005,ai=1006,hf=1007,es=1008,ji=1009,mx=1010,gx=1011,Ga=1012,Yp=1013,br=1014,ci=1015,Ka=1016,$p=1017,qp=1018,Ro=1020,_x=35902,vx=1021,xx=1022,Pn=1023,yx=1024,Sx=1025,mo=1026,bo=1027,Mx=1028,bu=1029,Ex=1030,Kp=1031,Zp=1033,wc=33776,Tc=33777,Ac=33778,Cc=33779,dd=35840,pd=35841,md=35842,gd=35843,_d=36196,vd=37492,xd=37496,yd=37808,Sd=37809,Md=37810,Ed=37811,wd=37812,Td=37813,Ad=37814,Cd=37815,Rd=37816,bd=37817,Pd=37818,Ld=37819,Dd=37820,Id=37821,Rc=36492,Ud=36494,Nd=36495,wx=36283,Fd=36284,Od=36285,Bd=36286,fE=3200,hE=3201,Tx=0,dE=1,hr="",gi="srgb",Nr="srgb-linear",Qp="display-p3",Pu="display-p3-linear",nu="linear",ut="srgb",iu="rec709",ru="p3",vs=7680,Cg=519,pE=512,mE=513,gE=514,Ax=515,_E=516,vE=517,xE=518,yE=519,zd=35044,Rg="300 es",Oi=2e3,su=2001;class ps{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bg=1234567;const go=Math.PI/180,Wa=180/Math.PI;function ki(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[t&255]+Qt[t>>8&255]+Qt[t>>16&255]+Qt[t>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function Yt(t,e,n){return Math.max(e,Math.min(n,t))}function Jp(t,e){return(t%e+e)%e}function SE(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function ME(t,e,n){return t!==e?(n-t)/(e-t):0}function Ma(t,e,n){return(1-n)*t+n*e}function EE(t,e,n,i){return Ma(t,e,1-Math.exp(-n*i))}function wE(t,e=1){return e-Math.abs(Jp(t,e*2)-e)}function TE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function AE(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function CE(t,e){return t+Math.floor(Math.random()*(e-t+1))}function RE(t,e){return t+Math.random()*(e-t)}function bE(t){return t*(.5-Math.random())}function PE(t){t!==void 0&&(bg=t);let e=bg+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function LE(t){return t*go}function DE(t){return t*Wa}function IE(t){return(t&t-1)===0&&t!==0}function UE(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function NE(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function FE(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),f=o((e-i)/2),p=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*h,l*f,a*c);break;case"YZY":t.set(l*f,a*u,l*h,a*c);break;case"ZXZ":t.set(l*h,l*f,a*u,a*c);break;case"XZX":t.set(a*u,l*_,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*_,a*c);break;case"ZYZ":t.set(l*_,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function li(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function et(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const or={DEG2RAD:go,RAD2DEG:Wa,generateUUID:ki,clamp:Yt,euclideanModulo:Jp,mapLinear:SE,inverseLerp:ME,lerp:Ma,damp:EE,pingpong:wE,smoothstep:TE,smootherstep:AE,randInt:CE,randFloat:RE,randFloatSpread:bE,seededRandom:PE,degToRad:LE,radToDeg:DE,isPowerOfTwo:IE,ceilPowerOfTwo:UE,floorPowerOfTwo:NE,setQuaternionFromProperEuler:FE,normalize:et,denormalize:li};class ye{constructor(e=0,n=0){ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,n,i,r,s,o,a,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],_=i[8],x=r[0],m=r[3],d=r[6],g=r[1],v=r[4],S=r[7],A=r[2],w=r[5],M=r[8];return s[0]=o*x+a*g+l*A,s[3]=o*m+a*v+l*w,s[6]=o*d+a*S+l*M,s[1]=c*x+u*g+h*A,s[4]=c*m+u*v+h*w,s[7]=c*d+u*S+h*M,s[2]=f*x+p*g+_*A,s[5]=f*m+p*v+_*w,s[8]=f*d+p*S+_*M,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,p=c*s-o*l,_=n*h+i*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=h*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(u*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-c*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(df.makeScale(e,n)),this}rotate(e){return this.premultiply(df.makeRotation(-e)),this}translate(e,n){return this.premultiply(df.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const df=new Fe;function Cx(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ou(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function OE(){const t=ou("canvas");return t.style.display="block",t}const Pg={};function bc(t){t in Pg||(Pg[t]=!0,console.warn(t))}function BE(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function zE(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kE(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Lg=new Fe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Dg=new Fe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wo={[Nr]:{transfer:nu,primaries:iu,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t,fromReference:t=>t},[gi]:{transfer:ut,primaries:iu,luminanceCoefficients:[.2126,.7152,.0722],toReference:t=>t.convertSRGBToLinear(),fromReference:t=>t.convertLinearToSRGB()},[Pu]:{transfer:nu,primaries:ru,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.applyMatrix3(Dg),fromReference:t=>t.applyMatrix3(Lg)},[Qp]:{transfer:ut,primaries:ru,luminanceCoefficients:[.2289,.6917,.0793],toReference:t=>t.convertSRGBToLinear().applyMatrix3(Dg),fromReference:t=>t.applyMatrix3(Lg).convertLinearToSRGB()}},HE=new Set([Nr,Pu]),Ke={enabled:!0,_workingColorSpace:Nr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(t){if(!HE.has(t))throw new Error(`Unsupported working color space, "${t}".`);this._workingColorSpace=t},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=Wo[e].toReference,r=Wo[n].fromReference;return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this._workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this._workingColorSpace)},getPrimaries:function(t){return Wo[t].primaries},getTransfer:function(t){return t===hr?nu:Wo[t].transfer},getLuminanceCoefficients:function(t,e=this._workingColorSpace){return t.fromArray(Wo[e].luminanceCoefficients)}};function _o(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function pf(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let xs;class VE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xs===void 0&&(xs=ou("canvas")),xs.width=e.width,xs.height=e.height;const i=xs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=xs}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ou("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=_o(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(_o(n[i]/255)*255):n[i]=_o(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let GE=0;class Rx{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:GE++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(mf(r[o].image)):s.push(mf(r[o]))}else s=mf(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function mf(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?VE.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let WE=0;class nn extends ps{constructor(e=nn.DEFAULT_IMAGE,n=nn.DEFAULT_MAPPING,i=Jr,r=Jr,s=ai,o=es,a=Pn,l=ji,c=nn.DEFAULT_ANISOTROPY,u=hr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:WE++}),this.uuid=ki(),this.name="",this.source=new Rx(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==px)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fd:e.x=e.x-Math.floor(e.x);break;case Jr:e.x=e.x<0?0:1;break;case hd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fd:e.y=e.y-Math.floor(e.y);break;case Jr:e.y=e.y<0?0:1;break;case hd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=px;nn.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,n=0,i=0,r=1){Mt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],_=l[9],x=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,S=(p+1)/2,A=(d+1)/2,w=(u+f)/4,M=(h+x)/4,R=(_+m)/4;return v>S&&v>A?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=w/i,s=M/i):S>A?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=w/r,s=R/r):A<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),i=M/s,r=R/s),this.set(i,r,s,n),this}let g=Math.sqrt((m-_)*(m-_)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(g)<.001&&(g=1),this.x=(m-_)/g,this.y=(h-x)/g,this.z=(f-u)/g,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class XE extends ps{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Mt(0,0,e,n),this.scissorTest=!1,this.viewport=new Mt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new nn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Rx(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends XE{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class bx extends nn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jE extends nn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=Jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fs{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],p=s[o+1],_=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=_,e[n+3]=x;return}if(h!==x||l!==f||c!==p||u!==_){let m=1-a;const d=l*f+c*p+u*_+h*x,g=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const A=Math.sqrt(v),w=Math.atan2(A,d*g);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const S=a*g;if(l=l*m+f*S,c=c*m+p*S,u=u*m+_*S,h=h*m+x*S,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],p=s[o+2],_=s[o+3];return e[n]=a*_+u*h+l*p-c*f,e[n+1]=l*_+u*f+c*h-a*p,e[n+2]=c*_+u*p+a*f-l*h,e[n+3]=u*_-a*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"YXZ":this._x=f*u*h+c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"ZXY":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h-f*p*_;break;case"ZYX":this._x=f*u*h-c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h+f*p*_;break;case"YZX":this._x=f*u*h+c*p*_,this._y=c*p*h+f*u*_,this._z=c*u*_-f*p*h,this._w=c*u*h-f*p*_;break;case"XZY":this._x=f*u*h-c*p*_,this._y=c*p*h-f*u*_,this._z=c*u*_+f*p*h,this._w=c*u*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],h=n[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Yt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,n=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Ig.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Ig.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return gf.copy(this).projectOnVector(e),this.sub(gf)}reflect(e){return this.sub(gf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const gf=new P,Ig=new fs;class bt{constructor(e=new P(1/0,1/0,1/0),n=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Jn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Jn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Jn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jn):Jn.fromBufferAttribute(s,o),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vl.copy(i.boundingBox)),vl.applyMatrix4(e.matrixWorld),this.union(vl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),xl.subVectors(this.max,Xo),ys.subVectors(e.a,Xo),Ss.subVectors(e.b,Xo),Ms.subVectors(e.c,Xo),Zi.subVectors(Ss,ys),Qi.subVectors(Ms,Ss),Or.subVectors(ys,Ms);let n=[0,-Zi.z,Zi.y,0,-Qi.z,Qi.y,0,-Or.z,Or.y,Zi.z,0,-Zi.x,Qi.z,0,-Qi.x,Or.z,0,-Or.x,-Zi.y,Zi.x,0,-Qi.y,Qi.x,0,-Or.y,Or.x,0];return!_f(n,ys,Ss,Ms,xl)||(n=[1,0,0,0,1,0,0,0,1],!_f(n,ys,Ss,Ms,xl))?!1:(yl.crossVectors(Zi,Qi),n=[yl.x,yl.y,yl.z],_f(n,ys,Ss,Ms,xl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ti=[new P,new P,new P,new P,new P,new P,new P,new P],Jn=new P,vl=new bt,ys=new P,Ss=new P,Ms=new P,Zi=new P,Qi=new P,Or=new P,Xo=new P,xl=new P,yl=new P,Br=new P;function _f(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Br.fromArray(t,s);const a=r.x*Math.abs(Br.x)+r.y*Math.abs(Br.y)+r.z*Math.abs(Br.z),l=e.dot(Br),c=n.dot(Br),u=i.dot(Br);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const YE=new bt,jo=new P,vf=new P;class Si{constructor(e=new P,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):YE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jo.subVectors(e,this.center);const n=jo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(jo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jo.copy(e.center).add(vf)),this.expandByPoint(jo.copy(e.center).sub(vf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ai=new P,xf=new P,Sl=new P,Ji=new P,yf=new P,Ml=new P,Sf=new P;class Za{constructor(e=new P,n=new P(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ai)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ai.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ai.copy(this.origin).addScaledVector(this.direction,n),Ai.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){xf.copy(e).add(n).multiplyScalar(.5),Sl.copy(n).sub(e).normalize(),Ji.copy(this.origin).sub(xf);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Sl),a=Ji.dot(this.direction),l=-Ji.dot(Sl),c=Ji.lengthSq(),u=Math.abs(1-o*o);let h,f,p,_;if(u>0)if(h=o*l-a,f=o*a-l,_=s*u,h>=0)if(f>=-_)if(f<=_){const x=1/u;h*=x,f*=x,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(xf).addScaledVector(Sl,f),p}intersectSphere(e,n){Ai.subVectors(e.center,this.origin);const i=Ai.dot(this.direction),r=Ai.dot(Ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ai)!==null}intersectTriangle(e,n,i,r,s){yf.subVectors(n,e),Ml.subVectors(i,e),Sf.crossVectors(yf,Ml);let o=this.direction.dot(Sf),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ji.subVectors(this.origin,e);const l=a*this.direction.dot(Ml.crossVectors(Ji,Ml));if(l<0)return null;const c=a*this.direction.dot(yf.cross(Ji));if(c<0||l+c>o)return null;const u=-a*Ji.dot(Sf);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Be{constructor(e,n,i,r,s,o,a,l,c,u,h,f,p,_,x,m){Be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,h,f,p,_,x,m)}set(e,n,i,r,s,o,a,l,c,u,h,f,p,_,x,m){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=_,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Be().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Es.setFromMatrixColumn(e,0).length(),s=1/Es.setFromMatrixColumn(e,1).length(),o=1/Es.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*h,_=a*u,x=a*h;n[0]=l*u,n[4]=-l*h,n[8]=c,n[1]=p+_*c,n[5]=f-x*c,n[9]=-a*l,n[2]=x-f*c,n[6]=_+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,_=c*u,x=c*h;n[0]=f+x*a,n[4]=_*a-p,n[8]=o*c,n[1]=o*h,n[5]=o*u,n[9]=-a,n[2]=p*a-_,n[6]=x+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,_=c*u,x=c*h;n[0]=f-x*a,n[4]=-o*h,n[8]=_+p*a,n[1]=p+_*a,n[5]=o*u,n[9]=x-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*h,_=a*u,x=a*h;n[0]=l*u,n[4]=_*c-p,n[8]=f*c+x,n[1]=l*h,n[5]=x*c+f,n[9]=p*c-_,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,_=a*l,x=a*c;n[0]=l*u,n[4]=x-f*h,n[8]=_*h+p,n[1]=h,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*h+_,n[10]=f-x*h}else if(e.order==="XZY"){const f=o*l,p=o*c,_=a*l,x=a*c;n[0]=l*u,n[4]=-h,n[8]=c*u,n[1]=f*h+x,n[5]=o*u,n[9]=p*h-_,n[2]=_*h-p,n[6]=a*u,n[10]=x*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose($E,e,qE)}lookAt(e,n,i){const r=this.elements;return An.subVectors(e,n),An.lengthSq()===0&&(An.z=1),An.normalize(),er.crossVectors(i,An),er.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),er.crossVectors(i,An)),er.normalize(),El.crossVectors(An,er),r[0]=er.x,r[4]=El.x,r[8]=An.x,r[1]=er.y,r[5]=El.y,r[9]=An.y,r[2]=er.z,r[6]=El.z,r[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],_=i[2],x=i[6],m=i[10],d=i[14],g=i[3],v=i[7],S=i[11],A=i[15],w=r[0],M=r[4],R=r[8],L=r[12],y=r[1],E=r[5],D=r[9],N=r[13],z=r[2],W=r[6],k=r[10],Y=r[14],U=r[3],$=r[7],Q=r[11],se=r[15];return s[0]=o*w+a*y+l*z+c*U,s[4]=o*M+a*E+l*W+c*$,s[8]=o*R+a*D+l*k+c*Q,s[12]=o*L+a*N+l*Y+c*se,s[1]=u*w+h*y+f*z+p*U,s[5]=u*M+h*E+f*W+p*$,s[9]=u*R+h*D+f*k+p*Q,s[13]=u*L+h*N+f*Y+p*se,s[2]=_*w+x*y+m*z+d*U,s[6]=_*M+x*E+m*W+d*$,s[10]=_*R+x*D+m*k+d*Q,s[14]=_*L+x*N+m*Y+d*se,s[3]=g*w+v*y+S*z+A*U,s[7]=g*M+v*E+S*W+A*$,s[11]=g*R+v*D+S*k+A*Q,s[15]=g*L+v*N+S*Y+A*se,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],_=e[3],x=e[7],m=e[11],d=e[15];return _*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*p-i*l*p)+x*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+m*(+n*c*h-n*a*p-s*o*h+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-n*l*h+n*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],_=e[12],x=e[13],m=e[14],d=e[15],g=h*m*c-x*f*c+x*l*p-a*m*p-h*l*d+a*f*d,v=_*f*c-u*m*c-_*l*p+o*m*p+u*l*d-o*f*d,S=u*x*c-_*h*c+_*a*p-o*x*p-u*a*d+o*h*d,A=_*h*l-u*x*l-_*a*f+o*x*f+u*a*m-o*h*m,w=n*g+i*v+r*S+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/w;return e[0]=g*M,e[1]=(x*f*s-h*m*s-x*r*p+i*m*p+h*r*d-i*f*d)*M,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*d+i*l*d)*M,e[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*p-i*l*p)*M,e[4]=v*M,e[5]=(u*m*s-_*f*s+_*r*p-n*m*p-u*r*d+n*f*d)*M,e[6]=(_*l*s-o*m*s-_*r*c+n*m*c+o*r*d-n*l*d)*M,e[7]=(o*f*s-u*l*s+u*r*c-n*f*c-o*r*p+n*l*p)*M,e[8]=S*M,e[9]=(_*h*s-u*x*s-_*i*p+n*x*p+u*i*d-n*h*d)*M,e[10]=(o*x*s-_*a*s+_*i*c-n*x*c-o*i*d+n*a*d)*M,e[11]=(u*a*s-o*h*s-u*i*c+n*h*c+o*i*p-n*a*p)*M,e[12]=A*M,e[13]=(u*x*r-_*h*r+_*i*f-n*x*f-u*i*m+n*h*m)*M,e[14]=(_*a*r-o*x*r-_*i*l+n*x*l+o*i*m-n*a*m)*M,e[15]=(o*h*r-u*a*r+u*i*l-n*h*l-o*i*f+n*a*f)*M,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,h=a+a,f=s*c,p=s*u,_=s*h,x=o*u,m=o*h,d=a*h,g=l*c,v=l*u,S=l*h,A=i.x,w=i.y,M=i.z;return r[0]=(1-(x+d))*A,r[1]=(p+S)*A,r[2]=(_-v)*A,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(f+d))*w,r[6]=(m+g)*w,r[7]=0,r[8]=(_+v)*M,r[9]=(m-g)*M,r[10]=(1-(f+x))*M,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Es.set(r[0],r[1],r[2]).length();const o=Es.set(r[4],r[5],r[6]).length(),a=Es.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ei.copy(this);const c=1/s,u=1/o,h=1/a;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=u,ei.elements[5]*=u,ei.elements[6]*=u,ei.elements[8]*=h,ei.elements[9]*=h,ei.elements[10]*=h,n.setFromRotationMatrix(ei),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Oi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),h=(n+e)/(n-e),f=(i+r)/(i-r);let p,_;if(a===Oi)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===su)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Oi){const l=this.elements,c=1/(n-e),u=1/(i-r),h=1/(o-s),f=(n+e)*c,p=(i+r)*u;let _,x;if(a===Oi)_=(o+s)*h,x=-2*h;else if(a===su)_=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Es=new P,ei=new Be,$E=new P(0,0,0),qE=new P(1,1,1),er=new P,El=new P,An=new P,Ug=new Be,Ng=new fs;class Ei{constructor(e=0,n=0,i=0,r=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Ug.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ug,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Ng.setFromEuler(this),this.setFromQuaternion(Ng,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class em{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let KE=0;const Fg=new P,ws=new fs,Ci=new Be,wl=new P,Yo=new P,ZE=new P,QE=new fs,Og=new P(1,0,0),Bg=new P(0,1,0),zg=new P(0,0,1),kg={type:"added"},JE={type:"removed"},Ts={type:"childadded",child:null},Mf={type:"childremoved",child:null};class Nt extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:KE++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new P,n=new Ei,i=new fs,r=new P(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Be},normalMatrix:{value:new Fe}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new em,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ws.setFromAxisAngle(e,n),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,n){return ws.setFromAxisAngle(e,n),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(Og,e)}rotateY(e){return this.rotateOnAxis(Bg,e)}rotateZ(e){return this.rotateOnAxis(zg,e)}translateOnAxis(e,n){return Fg.copy(e).applyQuaternion(this.quaternion),this.position.add(Fg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Og,e)}translateY(e){return this.translateOnAxis(Bg,e)}translateZ(e){return this.translateOnAxis(zg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?wl.copy(e):wl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Yo,wl,this.up):Ci.lookAt(wl,Yo,this.up),this.quaternion.setFromRotationMatrix(Ci),r&&(Ci.extractRotation(r.matrixWorld),ws.setFromRotationMatrix(Ci),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kg),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(JE),Mf.child=e,this.dispatchEvent(Mf),Mf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kg),Ts.child=e,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,e,ZE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,QE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),p=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Nt.DEFAULT_UP=new P(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ti=new P,Ri=new P,Ef=new P,bi=new P,As=new P,Cs=new P,Hg=new P,wf=new P,Tf=new P,Af=new P,Cf=new Mt,Rf=new Mt,bf=new Mt;class It{constructor(e=new P,n=new P,i=new P){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ti.subVectors(e,n),r.cross(ti);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ti.subVectors(r,n),Ri.subVectors(i,n),Ef.subVectors(e,n);const o=ti.dot(ti),a=ti.dot(Ri),l=ti.dot(Ef),c=Ri.dot(Ri),u=Ri.dot(Ef),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Cf.setScalar(0),Rf.setScalar(0),bf.setScalar(0),Cf.fromBufferAttribute(e,n),Rf.fromBufferAttribute(e,i),bf.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Cf,s.x),o.addScaledVector(Rf,s.y),o.addScaledVector(bf,s.z),o}static isFrontFacing(e,n,i,r){return ti.subVectors(i,n),Ri.subVectors(e,n),ti.cross(Ri).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),Ri.subVectors(this.a,this.b),ti.cross(Ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return It.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return It.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return It.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return It.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return It.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;As.subVectors(r,i),Cs.subVectors(s,i),wf.subVectors(e,i);const l=As.dot(wf),c=Cs.dot(wf);if(l<=0&&c<=0)return n.copy(i);Tf.subVectors(e,r);const u=As.dot(Tf),h=Cs.dot(Tf);if(u>=0&&h<=u)return n.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(As,o);Af.subVectors(e,s);const p=As.dot(Af),_=Cs.dot(Af);if(_>=0&&p<=_)return n.copy(s);const x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return a=c/(c-_),n.copy(i).addScaledVector(Cs,a);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return Hg.subVectors(s,r),a=(h-u)/(h-u+(p-_)),n.copy(r).addScaledVector(Hg,a);const d=1/(m+x+f);return o=x*d,a=f*d,n.copy(i).addScaledVector(As,o).addScaledVector(Cs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Px={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},tr={h:0,s:0,l:0},Tl={h:0,s:0,l:0};function Pf(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Oe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=gi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=Ke.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ke.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=Ke.workingColorSpace){if(e=Jp(e,1),n=Yt(n,0,1),i=Yt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Pf(o,s,e+1/3),this.g=Pf(o,s,e),this.b=Pf(o,s,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,n=gi){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=gi){const i=Px[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_o(e.r),this.g=_o(e.g),this.b=_o(e.b),this}copyLinearToSRGB(e){return this.r=pf(e.r),this.g=pf(e.g),this.b=pf(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gi){return Ke.fromWorkingColorSpace(Jt.copy(this),e),Math.round(Yt(Jt.r*255,0,255))*65536+Math.round(Yt(Jt.g*255,0,255))*256+Math.round(Yt(Jt.b*255,0,255))}getHexString(e=gi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Jt.copy(this),n);const i=Jt.r,r=Jt.g,s=Jt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Jt.copy(this),n),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=gi){Ke.fromWorkingColorSpace(Jt.copy(this),e);const n=Jt.r,i=Jt.g,r=Jt.b;return e!==gi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(tr),this.setHSL(tr.h+e,tr.s+n,tr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(tr),e.getHSL(Tl);const i=Ma(tr.h,Tl.h,n),r=Ma(tr.s,Tl.s,n),s=Ma(tr.l,Tl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Oe;Oe.NAMES=Px;let ew=0;class ms extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ew++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=po,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ed,this.blendDst=td,this.blendEquation=$r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=To,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==po&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ed&&(i.blendSrc=this.blendSrc),this.blendDst!==td&&(i.blendDst=this.blendDst),this.blendEquation!==$r&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==To&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ea extends ms{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=jp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new P,Al=new ye;class Ft{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=zd,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Al.fromBufferAttribute(this,n),Al.applyMatrix3(e),this.setXY(n,Al.x,Al.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix3(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix4(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyNormalMatrix(e),this.setXYZ(n,At.x,At.y,At.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.transformDirection(e),this.setXYZ(n,At.x,At.y,At.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=et(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=li(n,this.array)),n}setX(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=li(n,this.array)),n}setY(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=li(n,this.array)),n}setZ(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=li(n,this.array)),n}setW(e,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zd&&(e.usage=this.usage),e}}class Lx extends Ft{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Dx extends Ft{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class $n extends Ft{constructor(e,n,i){super(new Float32Array(e),n,i)}}let tw=0;const On=new Be,Lf=new Nt,Rs=new P,Cn=new bt,$o=new bt,zt=new P;class Dt extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tw++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cx(e)?Dx:Lx)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,n,i){return On.makeTranslation(e,n,i),this.applyMatrix4(On),this}scale(e,n,i){return On.makeScale(e,n,i),this.applyMatrix4(On),this}lookAt(e){return Lf.lookAt(e),Lf.updateMatrix(),this.applyMatrix4(Lf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new $n(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bt);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];$o.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(Cn.min,$o.min),Cn.expandByPoint(zt),zt.addVectors(Cn.max,$o.max),Cn.expandByPoint(zt)):(Cn.expandByPoint($o.min),Cn.expandByPoint($o.max))}Cn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)zt.fromBufferAttribute(a,c),l&&(Rs.fromBufferAttribute(e,c),zt.add(Rs)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new P,l[R]=new P;const c=new P,u=new P,h=new P,f=new ye,p=new ye,_=new ye,x=new P,m=new P;function d(R,L,y){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,L),h.fromBufferAttribute(i,y),f.fromBufferAttribute(s,R),p.fromBufferAttribute(s,L),_.fromBufferAttribute(s,y),u.sub(c),h.sub(c),p.sub(f),_.sub(f);const E=1/(p.x*_.y-_.x*p.y);isFinite(E)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(E),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(E),a[R].add(x),a[L].add(x),a[y].add(x),l[R].add(m),l[L].add(m),l[y].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:e.count}]);for(let R=0,L=g.length;R<L;++R){const y=g[R],E=y.start,D=y.count;for(let N=E,z=E+D;N<z;N+=3)d(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const v=new P,S=new P,A=new P,w=new P;function M(R){A.fromBufferAttribute(r,R),w.copy(A);const L=a[R];v.copy(L),v.sub(A.multiplyScalar(A.dot(L))).normalize(),S.crossVectors(w,L);const E=S.dot(l[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,E)}for(let R=0,L=g.length;R<L;++R){const y=g[R],E=y.start,D=y.count;for(let N=E,z=E+D;N<z;N+=3)M(e.getX(N+0)),M(e.getX(N+1)),M(e.getX(N+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ft(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*u;for(let d=0;d<u;d++)f[_++]=c[p++]}return new Ft(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Dt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vg=new Be,zr=new Za,Cl=new Si,Gg=new P,Rl=new P,bl=new P,Pl=new P,Df=new P,Ll=new P,Wg=new P,Dl=new P;class rt extends Nt{constructor(e=new Dt,n=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ll.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Df.fromBufferAttribute(h,e),o?Ll.addScaledVector(Df,u):Ll.addScaledVector(Df.sub(n),u))}n.add(Ll)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Cl.copy(i.boundingSphere),Cl.applyMatrix4(s),zr.copy(e.ray).recast(e.near),!(Cl.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Cl,Gg)===null||zr.origin.distanceToSquared(Gg)>(e.far-e.near)**2))&&(Vg.copy(s).invert(),zr.copy(e.ray).applyMatrix4(Vg),!(i.boundingBox!==null&&zr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,zr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],d=o[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=g,A=v;S<A;S+=3){const w=a.getX(S),M=a.getX(S+1),R=a.getX(S+2);r=Il(this,d,e,i,c,u,h,w,M,R),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=_,d=x;m<d;m+=3){const g=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);r=Il(this,o,e,i,c,u,h,g,v,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,x=f.length;_<x;_++){const m=f[_],d=o[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=g,A=v;S<A;S+=3){const w=S,M=S+1,R=S+2;r=Il(this,d,e,i,c,u,h,w,M,R),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,d=x;m<d;m+=3){const g=m,v=m+1,S=m+2;r=Il(this,o,e,i,c,u,h,g,v,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function nw(t,e,n,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Mi,a),l===null)return null;Dl.copy(a),Dl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Dl);return c<n.near||c>n.far?null:{distance:c,point:Dl.clone(),object:t}}function Il(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Rl),t.getVertexPosition(l,bl),t.getVertexPosition(c,Pl);const u=nw(t,e,n,i,Rl,bl,Pl,Wg);if(u){const h=new P;It.getBarycoord(Wg,Rl,bl,Pl,h),r&&(u.uv=It.getInterpolatedAttribute(r,a,l,c,h,new ye)),s&&(u.uv1=It.getInterpolatedAttribute(s,a,l,c,h,new ye)),o&&(u.normal=It.getInterpolatedAttribute(o,a,l,c,h,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};It.getNormal(Rl,bl,Pl,f.normal),u.face=f,u.barycoord=h}return u}class jt extends Dt{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,n,e,o,s,0),_("z","y","x",1,-1,i,n,-e,o,s,1),_("x","z","y",1,1,e,i,n,r,o,2),_("x","z","y",1,-1,e,i,-n,r,o,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new $n(c,3)),this.setAttribute("normal",new $n(u,3)),this.setAttribute("uv",new $n(h,2));function _(x,m,d,g,v,S,A,w,M,R,L){const y=S/M,E=A/R,D=S/2,N=A/2,z=w/2,W=M+1,k=R+1;let Y=0,U=0;const $=new P;for(let Q=0;Q<k;Q++){const se=Q*E-N;for(let we=0;we<W;we++){const ke=we*y-D;$[x]=ke*g,$[m]=se*v,$[d]=z,c.push($.x,$.y,$.z),$[x]=0,$[m]=0,$[d]=w>0?1:-1,u.push($.x,$.y,$.z),h.push(we/M),h.push(1-Q/R),Y+=1}}for(let Q=0;Q<R;Q++)for(let se=0;se<M;se++){const we=f+se+W*Q,ke=f+se+W*(Q+1),j=f+(se+1)+W*(Q+1),ne=f+(se+1)+W*Q;l.push(we,ke,ne),l.push(ke,j,ne),U+=6}a.addGroup(p,U,L),p+=U,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Po(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function on(t){const e={};for(let n=0;n<t.length;n++){const i=Po(t[n]);for(const r in i)e[r]=i[r]}return e}function iw(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ix(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const rw={clone:Po,merge:on};var sw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ow=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pr extends ms{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sw,this.fragmentShader=ow,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Po(e.uniforms),this.uniformsGroups=iw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Ux extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=Oi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const nr=new P,Xg=new ye,jg=new ye;class kn extends Ux{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){nr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(nr.x,nr.y).multiplyScalar(-e/nr.z),nr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(nr.x,nr.y).multiplyScalar(-e/nr.z)}getViewSize(e,n){return this.getViewBounds(e,Xg,jg),n.subVectors(jg,Xg)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(go*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const bs=-90,Ps=1;class aw extends Nt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kn(bs,Ps,e,n);r.layers=this.layers,this.add(r);const s=new kn(bs,Ps,e,n);s.layers=this.layers,this.add(s);const o=new kn(bs,Ps,e,n);o.layers=this.layers,this.add(o);const a=new kn(bs,Ps,e,n);a.layers=this.layers,this.add(a);const l=new kn(bs,Ps,e,n);l.layers=this.layers,this.add(l);const c=new kn(bs,Ps,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===su)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(h,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Nx extends nn{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:Ao,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lw extends us{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Nx(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ai}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new jt(5,5,5),s=new Pr({name:"CubemapFromEquirect",uniforms:Po(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Tr});s.uniforms.tEquirect.value=n;const o=new rt(r,s),a=n.minFilter;return n.minFilter===es&&(n.minFilter=ai),new aw(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const If=new P,cw=new P,uw=new Fe;class oi{constructor(e=new P(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=If.subVectors(i,n).cross(cw.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(If),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||uw.getNormalMatrix(e),r=this.coplanarPoint(If).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const kr=new Si,Ul=new P;class Lu{constructor(e=new oi,n=new oi,i=new oi,r=new oi,s=new oi,o=new oi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Oi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],p=r[8],_=r[9],x=r[10],m=r[11],d=r[12],g=r[13],v=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,m-p,S-d).normalize(),i[1].setComponents(l+s,f+c,m+p,S+d).normalize(),i[2].setComponents(l+o,f+u,m+_,S+g).normalize(),i[3].setComponents(l-o,f-u,m-_,S-g).normalize(),i[4].setComponents(l-a,f-h,m-x,S-v).normalize(),n===Oi)i[5].setComponents(l+a,f+h,m+x,S+v).normalize();else if(n===su)i[5].setComponents(a,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(kr)}intersectsSprite(e){return kr.center.set(0,0,0),kr.radius=.7071067811865476,kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(kr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ul.x=r.normal.x>0?e.max.x:e.min.x,Ul.y=r.normal.y>0?e.max.y:e.min.y,Ul.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ul)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fx(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function fw(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(t.bindBuffer(c,a),h.length===0)t.bufferSubData(c,0,u);else{h.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<h.length;p++){const _=h[f],x=h[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,h[f]=x)}h.length=f+1;for(let p=0,_=h.length;p<_;p++){const x=h[p];t.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class mr extends Dt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=n/l,p=[],_=[],x=[],m=[];for(let d=0;d<u;d++){const g=d*f-o;for(let v=0;v<c;v++){const S=v*h-s;_.push(S,-g,0),x.push(0,0,1),m.push(v/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let g=0;g<a;g++){const v=g+c*d,S=g+c*(d+1),A=g+1+c*(d+1),w=g+1+c*d;p.push(v,S,w),p.push(S,A,w)}this.setIndex(p),this.setAttribute("position",new $n(_,3)),this.setAttribute("normal",new $n(x,3)),this.setAttribute("uv",new $n(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mr(e.width,e.height,e.widthSegments,e.heightSegments)}}var hw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_w=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vw=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ew=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ww=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Aw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Iw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Uw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Nw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ow=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gw=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ww=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$w=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,nT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,iT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,uT=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,hT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_T=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ST=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ET=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,TT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,AT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,CT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,RT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,PT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,LT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,UT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,NT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,FT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,OT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,BT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,HT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,VT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,GT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,WT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$T=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,KT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,QT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,JT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,r1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,s1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,u1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,v1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,y1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,S1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,M1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,A1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,I1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,k1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,G1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ne={alphahash_fragment:hw,alphahash_pars_fragment:dw,alphamap_fragment:pw,alphamap_pars_fragment:mw,alphatest_fragment:gw,alphatest_pars_fragment:_w,aomap_fragment:vw,aomap_pars_fragment:xw,batching_pars_vertex:yw,batching_vertex:Sw,begin_vertex:Mw,beginnormal_vertex:Ew,bsdfs:ww,iridescence_fragment:Tw,bumpmap_pars_fragment:Aw,clipping_planes_fragment:Cw,clipping_planes_pars_fragment:Rw,clipping_planes_pars_vertex:bw,clipping_planes_vertex:Pw,color_fragment:Lw,color_pars_fragment:Dw,color_pars_vertex:Iw,color_vertex:Uw,common:Nw,cube_uv_reflection_fragment:Fw,defaultnormal_vertex:Ow,displacementmap_pars_vertex:Bw,displacementmap_vertex:zw,emissivemap_fragment:kw,emissivemap_pars_fragment:Hw,colorspace_fragment:Vw,colorspace_pars_fragment:Gw,envmap_fragment:Ww,envmap_common_pars_fragment:Xw,envmap_pars_fragment:jw,envmap_pars_vertex:Yw,envmap_physical_pars_fragment:rT,envmap_vertex:$w,fog_vertex:qw,fog_pars_vertex:Kw,fog_fragment:Zw,fog_pars_fragment:Qw,gradientmap_pars_fragment:Jw,lightmap_pars_fragment:eT,lights_lambert_fragment:tT,lights_lambert_pars_fragment:nT,lights_pars_begin:iT,lights_toon_fragment:sT,lights_toon_pars_fragment:oT,lights_phong_fragment:aT,lights_phong_pars_fragment:lT,lights_physical_fragment:cT,lights_physical_pars_fragment:uT,lights_fragment_begin:fT,lights_fragment_maps:hT,lights_fragment_end:dT,logdepthbuf_fragment:pT,logdepthbuf_pars_fragment:mT,logdepthbuf_pars_vertex:gT,logdepthbuf_vertex:_T,map_fragment:vT,map_pars_fragment:xT,map_particle_fragment:yT,map_particle_pars_fragment:ST,metalnessmap_fragment:MT,metalnessmap_pars_fragment:ET,morphinstance_vertex:wT,morphcolor_vertex:TT,morphnormal_vertex:AT,morphtarget_pars_vertex:CT,morphtarget_vertex:RT,normal_fragment_begin:bT,normal_fragment_maps:PT,normal_pars_fragment:LT,normal_pars_vertex:DT,normal_vertex:IT,normalmap_pars_fragment:UT,clearcoat_normal_fragment_begin:NT,clearcoat_normal_fragment_maps:FT,clearcoat_pars_fragment:OT,iridescence_pars_fragment:BT,opaque_fragment:zT,packing:kT,premultiplied_alpha_fragment:HT,project_vertex:VT,dithering_fragment:GT,dithering_pars_fragment:WT,roughnessmap_fragment:XT,roughnessmap_pars_fragment:jT,shadowmap_pars_fragment:YT,shadowmap_pars_vertex:$T,shadowmap_vertex:qT,shadowmask_pars_fragment:KT,skinbase_vertex:ZT,skinning_pars_vertex:QT,skinning_vertex:JT,skinnormal_vertex:e1,specularmap_fragment:t1,specularmap_pars_fragment:n1,tonemapping_fragment:i1,tonemapping_pars_fragment:r1,transmission_fragment:s1,transmission_pars_fragment:o1,uv_pars_fragment:a1,uv_pars_vertex:l1,uv_vertex:c1,worldpos_vertex:u1,background_vert:f1,background_frag:h1,backgroundCube_vert:d1,backgroundCube_frag:p1,cube_vert:m1,cube_frag:g1,depth_vert:_1,depth_frag:v1,distanceRGBA_vert:x1,distanceRGBA_frag:y1,equirect_vert:S1,equirect_frag:M1,linedashed_vert:E1,linedashed_frag:w1,meshbasic_vert:T1,meshbasic_frag:A1,meshlambert_vert:C1,meshlambert_frag:R1,meshmatcap_vert:b1,meshmatcap_frag:P1,meshnormal_vert:L1,meshnormal_frag:D1,meshphong_vert:I1,meshphong_frag:U1,meshphysical_vert:N1,meshphysical_frag:F1,meshtoon_vert:O1,meshtoon_frag:B1,points_vert:z1,points_frag:k1,shadow_vert:H1,shadow_frag:V1,sprite_vert:G1,sprite_frag:W1},oe={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},_i={basic:{uniforms:on([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:on([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:on([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:on([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:on([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:on([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:on([oe.points,oe.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:on([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:on([oe.common,oe.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:on([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:on([oe.sprite,oe.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:on([oe.common,oe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:on([oe.lights,oe.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};_i.physical={uniforms:on([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Nl={r:0,b:0,g:0},Hr=new Ei,X1=new Be;function j1(t,e,n,i,r,s,o){const a=new Oe(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function _(g){let v=g.isScene===!0?g.background:null;return v&&v.isTexture&&(v=(g.backgroundBlurriness>0?n:e).get(v)),v}function x(g){let v=!1;const S=_(g);S===null?d(a,l):S&&S.isColor&&(d(S,1),v=!0);const A=t.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(g,v){const S=_(v);S&&(S.isCubeTexture||S.mapping===Ru)?(u===void 0&&(u=new rt(new jt(1,1,1),new Pr({name:"BackgroundCubeMaterial",uniforms:Po(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Hr.copy(v.backgroundRotation),Hr.x*=-1,Hr.y*=-1,Hr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Hr.y*=-1,Hr.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(X1.makeRotationFromEuler(Hr)),u.material.toneMapped=Ke.getTransfer(S.colorSpace)!==ut,(h!==S||f!==S.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,h=S,f=S.version,p=t.toneMapping),u.layers.enableAll(),g.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new rt(new mr(2,2),new Pr({name:"BackgroundMaterial",uniforms:Po(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(S.colorSpace)!==ut,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,p=t.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function d(g,v){g.getRGB(Nl,Ix(t)),i.buffers.color.setClear(Nl.r,Nl.g,Nl.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(g,v=1){a.set(g),l=v,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,d(a,l)},render:x,addToRenderList:m}}function Y1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(y,E,D,N,z){let W=!1;const k=h(N,D,E);s!==k&&(s=k,c(s.object)),W=p(y,N,D,z),W&&_(y,N,D,z),z!==null&&e.update(z,t.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,S(y,E,D,N),z!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return t.createVertexArray()}function c(y){return t.bindVertexArray(y)}function u(y){return t.deleteVertexArray(y)}function h(y,E,D){const N=D.wireframe===!0;let z=i[y.id];z===void 0&&(z={},i[y.id]=z);let W=z[E.id];W===void 0&&(W={},z[E.id]=W);let k=W[N];return k===void 0&&(k=f(l()),W[N]=k),k}function f(y){const E=[],D=[],N=[];for(let z=0;z<n;z++)E[z]=0,D[z]=0,N[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:D,attributeDivisors:N,object:y,attributes:{},index:null}}function p(y,E,D,N){const z=s.attributes,W=E.attributes;let k=0;const Y=D.getAttributes();for(const U in Y)if(Y[U].location>=0){const Q=z[U];let se=W[U];if(se===void 0&&(U==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),U==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),Q===void 0||Q.attribute!==se||se&&Q.data!==se.data)return!0;k++}return s.attributesNum!==k||s.index!==N}function _(y,E,D,N){const z={},W=E.attributes;let k=0;const Y=D.getAttributes();for(const U in Y)if(Y[U].location>=0){let Q=W[U];Q===void 0&&(U==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),U==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor));const se={};se.attribute=Q,Q&&Q.data&&(se.data=Q.data),z[U]=se,k++}s.attributes=z,s.attributesNum=k,s.index=N}function x(){const y=s.newAttributes;for(let E=0,D=y.length;E<D;E++)y[E]=0}function m(y){d(y,0)}function d(y,E){const D=s.newAttributes,N=s.enabledAttributes,z=s.attributeDivisors;D[y]=1,N[y]===0&&(t.enableVertexAttribArray(y),N[y]=1),z[y]!==E&&(t.vertexAttribDivisor(y,E),z[y]=E)}function g(){const y=s.newAttributes,E=s.enabledAttributes;for(let D=0,N=E.length;D<N;D++)E[D]!==y[D]&&(t.disableVertexAttribArray(D),E[D]=0)}function v(y,E,D,N,z,W,k){k===!0?t.vertexAttribIPointer(y,E,D,z,W):t.vertexAttribPointer(y,E,D,N,z,W)}function S(y,E,D,N){x();const z=N.attributes,W=D.getAttributes(),k=E.defaultAttributeValues;for(const Y in W){const U=W[Y];if(U.location>=0){let $=z[Y];if($===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),$!==void 0){const Q=$.normalized,se=$.itemSize,we=e.get($);if(we===void 0)continue;const ke=we.buffer,j=we.type,ne=we.bytesPerElement,fe=j===t.INT||j===t.UNSIGNED_INT||$.gpuType===Yp;if($.isInterleavedBufferAttribute){const le=$.data,Ie=le.stride,Ae=$.offset;if(le.isInstancedInterleavedBuffer){for(let Ge=0;Ge<U.locationSize;Ge++)d(U.location+Ge,le.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ge=0;Ge<U.locationSize;Ge++)m(U.location+Ge);t.bindBuffer(t.ARRAY_BUFFER,ke);for(let Ge=0;Ge<U.locationSize;Ge++)v(U.location+Ge,se/U.locationSize,j,Q,Ie*ne,(Ae+se/U.locationSize*Ge)*ne,fe)}else{if($.isInstancedBufferAttribute){for(let le=0;le<U.locationSize;le++)d(U.location+le,$.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let le=0;le<U.locationSize;le++)m(U.location+le);t.bindBuffer(t.ARRAY_BUFFER,ke);for(let le=0;le<U.locationSize;le++)v(U.location+le,se/U.locationSize,j,Q,se*ne,se/U.locationSize*le*ne,fe)}}else if(k!==void 0){const Q=k[Y];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(U.location,Q);break;case 3:t.vertexAttrib3fv(U.location,Q);break;case 4:t.vertexAttrib4fv(U.location,Q);break;default:t.vertexAttrib1fv(U.location,Q)}}}}g()}function A(){R();for(const y in i){const E=i[y];for(const D in E){const N=E[D];for(const z in N)u(N[z].object),delete N[z];delete E[D]}delete i[y]}}function w(y){if(i[y.id]===void 0)return;const E=i[y.id];for(const D in E){const N=E[D];for(const z in N)u(N[z].object),delete N[z];delete E[D]}delete i[y.id]}function M(y){for(const E in i){const D=i[E];if(D[y.id]===void 0)continue;const N=D[y.id];for(const z in N)u(N[z].object),delete N[z];delete D[y.id]}}function R(){L(),o=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:M,initAttributes:x,enableAttribute:m,disableUnusedAttributes:g}}function $1(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function o(c,u,h){h!==0&&(t.drawArraysInstanced(i,c,u,h),n.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];n.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let _=0;for(let x=0;x<h;x++)_+=u[x];for(let x=0;x<f.length;x++)n.update(_,i,f[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function q1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(M){return!(M!==Pn&&i.convert(M)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){const R=M===Ka&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==ji&&i.convert(M)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==ci&&!R)}function l(M){if(M==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(f===!0){const M=e.get("EXT_clip_control");M.clipControlEXT(M.LOWER_LEFT_EXT,M.ZERO_TO_ONE_EXT)}const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),g=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,w=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:g,maxVaryings:v,maxFragmentUniforms:S,vertexTextures:A,maxSamples:w}}function K1(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new oi,a=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=u(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,d=t.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const g=s?0:i,v=g*4;let S=d.clippingState||null;l.value=S,S=u(_,f,v,p);for(let A=0;A!==v;++A)S[A]=n[A];d.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,_){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,_!==!0||m===null){const d=p+x*4,g=f.matrixWorldInverse;a.getNormalMatrix(g),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,S=p;v!==x;++v,S+=4)o.copy(h[v]).applyMatrix4(g,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Z1(t){let e=new WeakMap;function n(o,a){return a===cd?o.mapping=Ao:a===ud&&(o.mapping=Co),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===cd||a===ud)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new lw(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Ox extends Ux{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const so=4,Yg=[.125,.215,.35,.446,.526,.582],qr=20,Uf=new Ox,$g=new Oe;let Nf=null,Ff=0,Of=0,Bf=!1;const jr=(1+Math.sqrt(5))/2,Ls=1/jr,qg=[new P(-jr,Ls,0),new P(jr,Ls,0),new P(-Ls,0,jr),new P(Ls,0,jr),new P(0,jr,-Ls),new P(0,jr,Ls),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Kg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Nf=this._renderer.getRenderTarget(),Ff=this._renderer.getActiveCubeFace(),Of=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Nf,Ff,Of),this._renderer.xr.enabled=Bf,e.scissorTest=!1,Fl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ao||e.mapping===Co?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nf=this._renderer.getRenderTarget(),Ff=this._renderer.getActiveCubeFace(),Of=this._renderer.getActiveMipmapLevel(),Bf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ai,minFilter:ai,generateMipmaps:!1,type:Ka,format:Pn,colorSpace:Nr,depthBuffer:!1},r=Zg(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zg(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q1(s)),this._blurMaterial=J1(s,e,n)}return r}_compileMaterial(e){const n=new rt(this._lodPlanes[0],e);this._renderer.compile(n,Uf)}_sceneToCubeUV(e,n,i,r){const a=new kn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor($g),u.toneMapping=Ar,u.autoClear=!1;const p=new Ea({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),_=new rt(new jt,p);let x=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy($g),x=!0);for(let d=0;d<6;d++){const g=d%3;g===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):g===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const v=this._cubeSize;Fl(r,g*v,d>2?v:0,v,v),u.setRenderTarget(r),x&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Ao||e.mapping===Co;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qg());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new rt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Fl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,Uf)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=qg[(r-s-1)%qg.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new rt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*qr-1),x=s/_,m=isFinite(s)?1+Math.floor(u*x):qr;m>qr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qr}`);const d=[];let g=0;for(let M=0;M<qr;++M){const R=M/x,L=Math.exp(-R*R/2);d.push(L),M===0?g+=L:M<m&&(g+=2*L)}for(let M=0;M<d.length;M++)d[M]=d[M]/g;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-i;const S=this._sizeLods[r],A=3*S*(r>v-so?r-v+so:0),w=4*(this._cubeSize-S);Fl(n,A,w,3*S,2*S),l.setRenderTarget(n),l.render(h,Uf)}}function Q1(t){const e=[],n=[],i=[];let r=t;const s=t-so+1+Yg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-so?l=Yg[o-t+so-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,x=3,m=2,d=1,g=new Float32Array(x*_*p),v=new Float32Array(m*_*p),S=new Float32Array(d*_*p);for(let w=0;w<p;w++){const M=w%3*2/3-1,R=w>2?0:-1,L=[M,R,0,M+2/3,R,0,M+2/3,R+1,0,M,R,0,M+2/3,R+1,0,M,R+1,0];g.set(L,x*_*w),v.set(f,m*_*w);const y=[w,w,w,w,w,w];S.set(y,d*_*w)}const A=new Dt;A.setAttribute("position",new Ft(g,x)),A.setAttribute("uv",new Ft(v,m)),A.setAttribute("faceIndex",new Ft(S,d)),e.push(A),r>so&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Zg(t,e,n){const i=new us(t,e,n);return i.texture.mapping=Ru,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function J1(t,e,n){const i=new Float32Array(qr),r=new P(0,1,0);return new Pr({name:"SphericalGaussianBlur",defines:{n:qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function Qg(){return new Pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function Jg(){return new Pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tr,depthTest:!1,depthWrite:!1})}function tm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function eA(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===cd||l===ud,u=l===Ao||l===Co;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new Kg(t)),h=c?n.fromEquirectangular(a,h):n.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new Kg(t)),h=c?n.fromEquirectangular(a):n.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function tA(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&bc("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function nA(t,e,n,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);for(const _ in f.morphAttributes){const x=f.morphAttributes[_];for(let m=0,d=x.length;m<d;m++)e.remove(x[m])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)e.update(f[_],t.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const x=p[_];for(let m=0,d=x.length;m<d;m++)e.update(x[m],t.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let x=0;if(p!==null){const g=p.array;x=p.version;for(let v=0,S=g.length;v<S;v+=3){const A=g[v+0],w=g[v+1],M=g[v+2];f.push(A,w,w,M,M,A)}}else if(_!==void 0){const g=_.array;x=_.version;for(let v=0,S=g.length/3-1;v<S;v+=3){const A=v+0,w=v+1,M=v+2;f.push(A,w,w,M,M,A)}}else return;const m=new(Cx(f)?Dx:Lx)(f,1);m.version=x;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function iA(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,_){_!==0&&(t.drawElementsInstanced(i,p,s,f*o,_),n.update(p,i,_))}function u(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];n.update(m,i,1)}function h(f,p,_,x){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,x,0,_);let d=0;for(let g=0;g<_;g++)d+=p[g];for(let g=0;g<x.length;g++)n.update(d,i,x[g])}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function rA(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function sA(t,e,n){const i=new WeakMap,r=new Mt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let y=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let S=0;_===!0&&(S=1),x===!0&&(S=2),m===!0&&(S=3);let A=a.attributes.position.count*S,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const M=new Float32Array(A*w*4*h),R=new bx(M,A,w,h);R.type=ci,R.needsUpdate=!0;const L=S*4;for(let E=0;E<h;E++){const D=d[E],N=g[E],z=v[E],W=A*w*4*E;for(let k=0;k<D.count;k++){const Y=k*L;_===!0&&(r.fromBufferAttribute(D,k),M[W+Y+0]=r.x,M[W+Y+1]=r.y,M[W+Y+2]=r.z,M[W+Y+3]=0),x===!0&&(r.fromBufferAttribute(N,k),M[W+Y+4]=r.x,M[W+Y+5]=r.y,M[W+Y+6]=r.z,M[W+Y+7]=0),m===!0&&(r.fromBufferAttribute(z,k),M[W+Y+8]=r.x,M[W+Y+9]=r.y,M[W+Y+10]=r.z,M[W+Y+11]=z.itemSize===4?r.w:1)}}f={count:h,texture:R,size:new ye(A,w)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const x=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function oA(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class Bx extends nn{constructor(e,n,i,r,s,o,a,l,c,u=mo){if(u!==mo&&u!==bo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===mo&&(i=br),i===void 0&&u===bo&&(i=Ro),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:xn,this.minFilter=l!==void 0?l:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const zx=new nn,e_=new Bx(1,1),kx=new bx,Hx=new jE,Vx=new Nx,t_=[],n_=[],i_=new Float32Array(16),r_=new Float32Array(9),s_=new Float32Array(4);function Uo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=t_[r];if(s===void 0&&(s=new Float32Array(r),t_[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Du(t,e){let n=n_[e];n===void 0&&(n=new Int32Array(e),n_[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function aA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function lA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function cA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function uA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function fA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;s_.set(i),t.uniformMatrix2fv(this.addr,!1,s_),Bt(n,i)}}function hA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;r_.set(i),t.uniformMatrix3fv(this.addr,!1,r_),Bt(n,i)}}function dA(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;i_.set(i),t.uniformMatrix4fv(this.addr,!1,i_),Bt(n,i)}}function pA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function mA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function gA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function _A(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function vA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function xA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function yA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function SA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function MA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(e_.compareFunction=Ax,s=e_):s=zx,n.setTexture2D(e||s,r)}function EA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Hx,r)}function wA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Vx,r)}function TA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||kx,r)}function AA(t){switch(t){case 5126:return aA;case 35664:return lA;case 35665:return cA;case 35666:return uA;case 35674:return fA;case 35675:return hA;case 35676:return dA;case 5124:case 35670:return pA;case 35667:case 35671:return mA;case 35668:case 35672:return gA;case 35669:case 35673:return _A;case 5125:return vA;case 36294:return xA;case 36295:return yA;case 36296:return SA;case 35678:case 36198:case 36298:case 36306:case 35682:return MA;case 35679:case 36299:case 36307:return EA;case 35680:case 36300:case 36308:case 36293:return wA;case 36289:case 36303:case 36311:case 36292:return TA}}function CA(t,e){t.uniform1fv(this.addr,e)}function RA(t,e){const n=Uo(e,this.size,2);t.uniform2fv(this.addr,n)}function bA(t,e){const n=Uo(e,this.size,3);t.uniform3fv(this.addr,n)}function PA(t,e){const n=Uo(e,this.size,4);t.uniform4fv(this.addr,n)}function LA(t,e){const n=Uo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function DA(t,e){const n=Uo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function IA(t,e){const n=Uo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function UA(t,e){t.uniform1iv(this.addr,e)}function NA(t,e){t.uniform2iv(this.addr,e)}function FA(t,e){t.uniform3iv(this.addr,e)}function OA(t,e){t.uniform4iv(this.addr,e)}function BA(t,e){t.uniform1uiv(this.addr,e)}function zA(t,e){t.uniform2uiv(this.addr,e)}function kA(t,e){t.uniform3uiv(this.addr,e)}function HA(t,e){t.uniform4uiv(this.addr,e)}function VA(t,e,n){const i=this.cache,r=e.length,s=Du(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||zx,s[o])}function GA(t,e,n){const i=this.cache,r=e.length,s=Du(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||Hx,s[o])}function WA(t,e,n){const i=this.cache,r=e.length,s=Du(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||Vx,s[o])}function XA(t,e,n){const i=this.cache,r=e.length,s=Du(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||kx,s[o])}function jA(t){switch(t){case 5126:return CA;case 35664:return RA;case 35665:return bA;case 35666:return PA;case 35674:return LA;case 35675:return DA;case 35676:return IA;case 5124:case 35670:return UA;case 35667:case 35671:return NA;case 35668:case 35672:return FA;case 35669:case 35673:return OA;case 5125:return BA;case 36294:return zA;case 36295:return kA;case 36296:return HA;case 35678:case 36198:case 36298:case 36306:case 35682:return VA;case 35679:case 36299:case 36307:return GA;case 35680:case 36300:case 36308:case 36293:return WA;case 36289:case 36303:case 36311:case 36292:return XA}}class YA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=AA(n.type)}}class $A{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=jA(n.type)}}class qA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const zf=/(\w+)(\])?(\[|\.)?/g;function o_(t,e){t.seq.push(e),t.map[e.id]=e}function KA(t,e,n){const i=t.name,r=i.length;for(zf.lastIndex=0;;){const s=zf.exec(i),o=zf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){o_(n,c===void 0?new YA(a,t,e):new $A(a,t,e));break}else{let h=n.map[a];h===void 0&&(h=new qA(a),o_(n,h)),n=h}}}class Pc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);KA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function a_(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const ZA=37297;let QA=0;function JA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function eC(t){const e=Ke.getPrimaries(Ke.workingColorSpace),n=Ke.getPrimaries(t);let i;switch(e===n?i="":e===ru&&n===iu?i="LinearDisplayP3ToLinearSRGB":e===iu&&n===ru&&(i="LinearSRGBToLinearDisplayP3"),t){case Nr:case Pu:return[i,"LinearTransferOETF"];case gi:case Qp:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),[i,"LinearTransferOETF"]}}function l_(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+JA(t.getShaderSource(e),o)}else return r}function tC(t,e){const n=eC(e);return`vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function nC(t,e){let n;switch(e){case iE:n="Linear";break;case rE:n="Reinhard";break;case sE:n="Cineon";break;case oE:n="ACESFilmic";break;case lE:n="AgX";break;case cE:n="Neutral";break;case aE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ol=new P;function iC(){Ke.getLuminanceCoefficients(Ol);const t=Ol.x.toFixed(4),e=Ol.y.toFixed(4),n=Ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ua).join(`
`)}function sC(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function oC(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ua(t){return t!==""}function c_(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function u_(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const aC=/^[ \t]*#include +<([\w\d./]+)>/gm;function kd(t){return t.replace(aC,cC)}const lC=new Map;function cC(t,e){let n=Ne[e];if(n===void 0){const i=lC.get(e);if(i!==void 0)n=Ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return kd(n)}const uC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function f_(t){return t.replace(uC,fC)}function fC(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function h_(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function hC(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===dx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===FM?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function dC(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ao:case Co:e="ENVMAP_TYPE_CUBE";break;case Ru:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pC(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Co:e="ENVMAP_MODE_REFRACTION";break}return e}function mC(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case jp:e="ENVMAP_BLENDING_MULTIPLY";break;case tE:e="ENVMAP_BLENDING_MIX";break;case nE:e="ENVMAP_BLENDING_ADD";break}return e}function gC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function _C(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=hC(n),c=dC(n),u=pC(n),h=mC(n),f=gC(n),p=rC(n),_=sC(s),x=r.createProgram();let m,d,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ua).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ua).join(`
`),d.length>0&&(d+=`
`)):(m=[h_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ua).join(`
`),d=[h_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ar?"#define TONE_MAPPING":"",n.toneMapping!==Ar?Ne.tonemapping_pars_fragment:"",n.toneMapping!==Ar?nC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,tC("linearToOutputTexel",n.outputColorSpace),iC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ua).join(`
`)),o=kd(o),o=c_(o,n),o=u_(o,n),a=kd(a),a=c_(a,n),a=u_(a,n),o=f_(o),a=f_(a),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===Rg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Rg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=g+m+o,S=g+d+a,A=a_(r,r.VERTEX_SHADER,v),w=a_(r,r.FRAGMENT_SHADER,S);r.attachShader(x,A),r.attachShader(x,w),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function M(E){if(t.debug.checkShaderErrors){const D=r.getProgramInfoLog(x).trim(),N=r.getShaderInfoLog(A).trim(),z=r.getShaderInfoLog(w).trim();let W=!0,k=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(W=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,A,w);else{const Y=l_(r,A,"vertex"),U=l_(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+D+`
`+Y+`
`+U)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(N===""||z==="")&&(k=!1);k&&(E.diagnostics={runnable:W,programLog:D,vertexShader:{log:N,prefix:m},fragmentShader:{log:z,prefix:d}})}r.deleteShader(A),r.deleteShader(w),R=new Pc(r,x),L=oC(r,x)}let R;this.getUniforms=function(){return R===void 0&&M(this),R};let L;this.getAttributes=function(){return L===void 0&&M(this),L};let y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(x,ZA)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=QA++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let vC=0;class xC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new yC(e),n.set(e,i)),i}}class yC{constructor(e){this.id=vC++,this.code=e,this.usedTimes=0}}function SC(t,e,n,i,r,s,o){const a=new em,l=new xC,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,p=r.vertexTextures;let _=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return c.add(y),y===0?"uv":`uv${y}`}function d(y,E,D,N,z){const W=N.fog,k=z.geometry,Y=y.isMeshStandardMaterial?N.environment:null,U=(y.isMeshStandardMaterial?n:e).get(y.envMap||Y),$=U&&U.mapping===Ru?U.image.height:null,Q=x[y.type];y.precision!==null&&(_=r.getMaxPrecision(y.precision),_!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",_,"instead."));const se=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,we=se!==void 0?se.length:0;let ke=0;k.morphAttributes.position!==void 0&&(ke=1),k.morphAttributes.normal!==void 0&&(ke=2),k.morphAttributes.color!==void 0&&(ke=3);let j,ne,fe,le;if(Q){const pn=_i[Q];j=pn.vertexShader,ne=pn.fragmentShader}else j=y.vertexShader,ne=y.fragmentShader,l.update(y),fe=l.getVertexShaderID(y),le=l.getFragmentShaderID(y);const Ie=t.getRenderTarget(),Ae=z.isInstancedMesh===!0,Ge=z.isBatchedMesh===!0,nt=!!y.map,We=!!y.matcap,I=!!U,En=!!y.aoMap,He=!!y.lightMap,Ye=!!y.bumpMap,Re=!!y.normalMap,at=!!y.displacementMap,Le=!!y.emissiveMap,b=!!y.metalnessMap,T=!!y.roughnessMap,H=y.anisotropy>0,K=y.clearcoat>0,ee=y.dispersion>0,q=y.iridescence>0,Se=y.sheen>0,ae=y.transmission>0,me=H&&!!y.anisotropyMap,$e=K&&!!y.clearcoatMap,ie=K&&!!y.clearcoatNormalMap,ge=K&&!!y.clearcoatRoughnessMap,be=q&&!!y.iridescenceMap,Pe=q&&!!y.iridescenceThicknessMap,_e=Se&&!!y.sheenColorMap,Ve=Se&&!!y.sheenRoughnessMap,Ue=!!y.specularMap,st=!!y.specularColorMap,F=!!y.specularIntensityMap,he=ae&&!!y.transmissionMap,X=ae&&!!y.thicknessMap,Z=!!y.gradientMap,ce=!!y.alphaMap,de=y.alphaTest>0,Xe=!!y.alphaHash,Tt=!!y.extensions;let dn=Ar;y.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(dn=t.toneMapping);const qe={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:j,fragmentShader:ne,defines:y.defines,customVertexShaderID:fe,customFragmentShaderID:le,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:_,batching:Ge,batchingColor:Ge&&z._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&z.instanceColor!==null,instancingMorph:Ae&&z.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Ie===null?t.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:Nr,alphaToCoverage:!!y.alphaToCoverage,map:nt,matcap:We,envMap:I,envMapMode:I&&U.mapping,envMapCubeUVHeight:$,aoMap:En,lightMap:He,bumpMap:Ye,normalMap:Re,displacementMap:p&&at,emissiveMap:Le,normalMapObjectSpace:Re&&y.normalMapType===dE,normalMapTangentSpace:Re&&y.normalMapType===Tx,metalnessMap:b,roughnessMap:T,anisotropy:H,anisotropyMap:me,clearcoat:K,clearcoatMap:$e,clearcoatNormalMap:ie,clearcoatRoughnessMap:ge,dispersion:ee,iridescence:q,iridescenceMap:be,iridescenceThicknessMap:Pe,sheen:Se,sheenColorMap:_e,sheenRoughnessMap:Ve,specularMap:Ue,specularColorMap:st,specularIntensityMap:F,transmission:ae,transmissionMap:he,thicknessMap:X,gradientMap:Z,opaque:y.transparent===!1&&y.blending===po&&y.alphaToCoverage===!1,alphaMap:ce,alphaTest:de,alphaHash:Xe,combine:y.combine,mapUv:nt&&m(y.map.channel),aoMapUv:En&&m(y.aoMap.channel),lightMapUv:He&&m(y.lightMap.channel),bumpMapUv:Ye&&m(y.bumpMap.channel),normalMapUv:Re&&m(y.normalMap.channel),displacementMapUv:at&&m(y.displacementMap.channel),emissiveMapUv:Le&&m(y.emissiveMap.channel),metalnessMapUv:b&&m(y.metalnessMap.channel),roughnessMapUv:T&&m(y.roughnessMap.channel),anisotropyMapUv:me&&m(y.anisotropyMap.channel),clearcoatMapUv:$e&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ie&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&m(y.sheenRoughnessMap.channel),specularMapUv:Ue&&m(y.specularMap.channel),specularColorMapUv:st&&m(y.specularColorMap.channel),specularIntensityMapUv:F&&m(y.specularIntensityMap.channel),transmissionMapUv:he&&m(y.transmissionMap.channel),thicknessMapUv:X&&m(y.thicknessMap.channel),alphaMapUv:ce&&m(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Re||H),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!k.attributes.uv&&(nt||ce),fog:!!W,useFog:y.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:z.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:ke,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&D.length>0,shadowMapType:t.shadowMap.type,toneMapping:dn,decodeVideoTexture:nt&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===ut,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Hn,flipSided:y.side===cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Tt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&y.extensions.multiDraw===!0||Ge)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return qe.vertexUv1s=c.has(1),qe.vertexUv2s=c.has(2),qe.vertexUv3s=c.has(3),c.clear(),qe}function g(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)E.push(D),E.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(v(E,y),S(E,y),E.push(t.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function v(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function S(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.alphaToCoverage&&a.enable(20),y.push(a.mask)}function A(y){const E=x[y.type];let D;if(E){const N=_i[E];D=rw.clone(N.uniforms)}else D=y.uniforms;return D}function w(y,E){let D;for(let N=0,z=u.length;N<z;N++){const W=u[N];if(W.cacheKey===E){D=W,++D.usedTimes;break}}return D===void 0&&(D=new _C(t,E,y,s),u.push(D)),D}function M(y){if(--y.usedTimes===0){const E=u.indexOf(y);u[E]=u[u.length-1],u.pop(),y.destroy()}}function R(y){l.remove(y)}function L(){l.dispose()}return{getParameters:d,getProgramCacheKey:g,getUniforms:A,acquireProgram:w,releaseProgram:M,releaseShaderCache:R,programs:u,dispose:L}}function MC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function EC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function d_(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function p_(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,f,p,_,x,m){let d=t[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:x,group:m},t[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=_,d.renderOrder=h.renderOrder,d.z=x,d.group=m),e++,d}function a(h,f,p,_,x,m){const d=o(h,f,p,_,x,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(h,f,p,_,x,m){const d=o(h,f,p,_,x,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(h,f){n.length>1&&n.sort(h||EC),i.length>1&&i.sort(f||d_),r.length>1&&r.sort(f||d_)}function u(){for(let h=e,f=t.length;h<f;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function wC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new p_,t.set(i,[o])):r>=s.length?(o=new p_,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function TC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new P,color:new Oe};break;case"SpotLight":n={position:new P,direction:new P,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new P,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new P,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":n={color:new Oe,position:new P,halfWidth:new P,halfHeight:new P};break}return t[e.id]=n,n}}}function AC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let CC=0;function RC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function bC(t){const e=new TC,n=AC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,s=new Be,o=new Be;function a(c){let u=0,h=0,f=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,_=0,x=0,m=0,d=0,g=0,v=0,S=0,A=0,w=0,M=0;c.sort(RC);for(let L=0,y=c.length;L<y;L++){const E=c[L],D=E.color,N=E.intensity,z=E.distance,W=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)u+=D.r*N,h+=D.g*N,f+=D.b*N;else if(E.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(E.sh.coefficients[k],N);M++}else if(E.isDirectionalLight){const k=e.get(E);if(k.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const Y=E.shadow,U=n.get(E);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=E.shadow.matrix,g++}i.directional[p]=k,p++}else if(E.isSpotLight){const k=e.get(E);k.position.setFromMatrixPosition(E.matrixWorld),k.color.copy(D).multiplyScalar(N),k.distance=z,k.coneCos=Math.cos(E.angle),k.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),k.decay=E.decay,i.spot[x]=k;const Y=E.shadow;if(E.map&&(i.spotLightMap[A]=E.map,A++,Y.updateMatrices(E),E.castShadow&&w++),i.spotLightMatrix[x]=Y.matrix,E.castShadow){const U=n.get(E);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,i.spotShadow[x]=U,i.spotShadowMap[x]=W,S++}x++}else if(E.isRectAreaLight){const k=e.get(E);k.color.copy(D).multiplyScalar(N),k.halfWidth.set(E.width*.5,0,0),k.halfHeight.set(0,E.height*.5,0),i.rectArea[m]=k,m++}else if(E.isPointLight){const k=e.get(E);if(k.color.copy(E.color).multiplyScalar(E.intensity),k.distance=E.distance,k.decay=E.decay,E.castShadow){const Y=E.shadow,U=n.get(E);U.shadowIntensity=Y.intensity,U.shadowBias=Y.bias,U.shadowNormalBias=Y.normalBias,U.shadowRadius=Y.radius,U.shadowMapSize=Y.mapSize,U.shadowCameraNear=Y.camera.near,U.shadowCameraFar=Y.camera.far,i.pointShadow[_]=U,i.pointShadowMap[_]=W,i.pointShadowMatrix[_]=E.shadow.matrix,v++}i.point[_]=k,_++}else if(E.isHemisphereLight){const k=e.get(E);k.skyColor.copy(E.color).multiplyScalar(N),k.groundColor.copy(E.groundColor).multiplyScalar(N),i.hemi[d]=k,d++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const R=i.hash;(R.directionalLength!==p||R.pointLength!==_||R.spotLength!==x||R.rectAreaLength!==m||R.hemiLength!==d||R.numDirectionalShadows!==g||R.numPointShadows!==v||R.numSpotShadows!==S||R.numSpotMaps!==A||R.numLightProbes!==M)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+A-w,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=M,R.directionalLength=p,R.pointLength=_,R.spotLength=x,R.rectAreaLength=m,R.hemiLength=d,R.numDirectionalShadows=g,R.numPointShadows=v,R.numSpotShadows=S,R.numSpotMaps=A,R.numLightProbes=M,i.version=CC++)}function l(c,u){let h=0,f=0,p=0,_=0,x=0;const m=u.matrixWorldInverse;for(let d=0,g=c.length;d<g;d++){const v=c[d];if(v.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(v.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const S=i.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function m_(t){const e=new bC(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function PC(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new m_(t),e.set(r,[a])):s>=o.length?(a=new m_(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class LC extends ms{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class DC extends ms{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const IC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,UC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function NC(t,e,n){let i=new Lu;const r=new ye,s=new ye,o=new Mt,a=new LC({depthPacking:hE}),l=new DC,c={},u=n.maxTextureSize,h={[Mi]:cn,[cn]:Mi,[Hn]:Hn},f=new Pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:IC,fragmentShader:UC}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Dt;_.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new rt(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dx;let d=this.type;this.render=function(w,M,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const L=t.getRenderTarget(),y=t.getActiveCubeFace(),E=t.getActiveMipmapLevel(),D=t.state;D.setBlending(Tr),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=d!==Li&&this.type===Li,z=d===Li&&this.type!==Li;for(let W=0,k=w.length;W<k;W++){const Y=w[W],U=Y.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const $=U.getFrameExtents();if(r.multiply($),s.copy(U.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/$.x),r.x=s.x*$.x,U.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/$.y),r.y=s.y*$.y,U.mapSize.y=s.y)),U.map===null||N===!0||z===!0){const se=this.type!==Li?{minFilter:xn,magFilter:xn}:{};U.map!==null&&U.map.dispose(),U.map=new us(r.x,r.y,se),U.map.texture.name=Y.name+".shadowMap",U.camera.updateProjectionMatrix()}t.setRenderTarget(U.map),t.clear();const Q=U.getViewportCount();for(let se=0;se<Q;se++){const we=U.getViewport(se);o.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),D.viewport(o),U.updateMatrices(Y,se),i=U.getFrustum(),S(M,R,U.camera,Y,this.type)}U.isPointLightShadow!==!0&&this.type===Li&&g(U,R),U.needsUpdate=!1}d=this.type,m.needsUpdate=!1,t.setRenderTarget(L,y,E)};function g(w,M){const R=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new us(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(M,null,R,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(M,null,R,p,x,null)}function v(w,M,R,L){let y=null;const E=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(E!==void 0)y=E;else if(y=R.isPointLight===!0?l:a,t.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const D=y.uuid,N=M.uuid;let z=c[D];z===void 0&&(z={},c[D]=z);let W=z[N];W===void 0&&(W=y.clone(),z[N]=W,M.addEventListener("dispose",A)),y=W}if(y.visible=M.visible,y.wireframe=M.wireframe,L===Li?y.side=M.shadowSide!==null?M.shadowSide:M.side:y.side=M.shadowSide!==null?M.shadowSide:h[M.side],y.alphaMap=M.alphaMap,y.alphaTest=M.alphaTest,y.map=M.map,y.clipShadows=M.clipShadows,y.clippingPlanes=M.clippingPlanes,y.clipIntersection=M.clipIntersection,y.displacementMap=M.displacementMap,y.displacementScale=M.displacementScale,y.displacementBias=M.displacementBias,y.wireframeLinewidth=M.wireframeLinewidth,y.linewidth=M.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=t.properties.get(y);D.light=R}return y}function S(w,M,R,L,y){if(w.visible===!1)return;if(w.layers.test(M.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Li)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const N=e.update(w),z=w.material;if(Array.isArray(z)){const W=N.groups;for(let k=0,Y=W.length;k<Y;k++){const U=W[k],$=z[U.materialIndex];if($&&$.visible){const Q=v(w,$,L,y);w.onBeforeShadow(t,w,M,R,N,Q,U),t.renderBufferDirect(R,null,N,Q,w,U),w.onAfterShadow(t,w,M,R,N,Q,U)}}}else if(z.visible){const W=v(w,z,L,y);w.onBeforeShadow(t,w,M,R,N,W,null),t.renderBufferDirect(R,null,N,W,w,null),w.onAfterShadow(t,w,M,R,N,W,null)}}const D=w.children;for(let N=0,z=D.length;N<z;N++)S(D[N],M,R,L,y)}function A(w){w.target.removeEventListener("dispose",A);for(const R in c){const L=c[R],y=w.target.uuid;y in L&&(L[y].dispose(),delete L[y])}}}const FC={[nd]:id,[rd]:ad,[sd]:ld,[To]:od,[id]:nd,[ad]:rd,[ld]:sd,[od]:To};function OC(t){function e(){let F=!1;const he=new Mt;let X=null;const Z=new Mt(0,0,0,0);return{setMask:function(ce){X!==ce&&!F&&(t.colorMask(ce,ce,ce,ce),X=ce)},setLocked:function(ce){F=ce},setClear:function(ce,de,Xe,Tt,dn){dn===!0&&(ce*=Tt,de*=Tt,Xe*=Tt),he.set(ce,de,Xe,Tt),Z.equals(he)===!1&&(t.clearColor(ce,de,Xe,Tt),Z.copy(he))},reset:function(){F=!1,X=null,Z.set(-1,0,0,0)}}}function n(){let F=!1,he=!1,X=null,Z=null,ce=null;return{setReversed:function(de){he=de},setTest:function(de){de?fe(t.DEPTH_TEST):le(t.DEPTH_TEST)},setMask:function(de){X!==de&&!F&&(t.depthMask(de),X=de)},setFunc:function(de){if(he&&(de=FC[de]),Z!==de){switch(de){case nd:t.depthFunc(t.NEVER);break;case id:t.depthFunc(t.ALWAYS);break;case rd:t.depthFunc(t.LESS);break;case To:t.depthFunc(t.LEQUAL);break;case sd:t.depthFunc(t.EQUAL);break;case od:t.depthFunc(t.GEQUAL);break;case ad:t.depthFunc(t.GREATER);break;case ld:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Z=de}},setLocked:function(de){F=de},setClear:function(de){ce!==de&&(t.clearDepth(de),ce=de)},reset:function(){F=!1,X=null,Z=null,ce=null}}}function i(){let F=!1,he=null,X=null,Z=null,ce=null,de=null,Xe=null,Tt=null,dn=null;return{setTest:function(qe){F||(qe?fe(t.STENCIL_TEST):le(t.STENCIL_TEST))},setMask:function(qe){he!==qe&&!F&&(t.stencilMask(qe),he=qe)},setFunc:function(qe,pn,wi){(X!==qe||Z!==pn||ce!==wi)&&(t.stencilFunc(qe,pn,wi),X=qe,Z=pn,ce=wi)},setOp:function(qe,pn,wi){(de!==qe||Xe!==pn||Tt!==wi)&&(t.stencilOp(qe,pn,wi),de=qe,Xe=pn,Tt=wi)},setLocked:function(qe){F=qe},setClear:function(qe){dn!==qe&&(t.clearStencil(qe),dn=qe)},reset:function(){F=!1,he=null,X=null,Z=null,ce=null,de=null,Xe=null,Tt=null,dn=null}}}const r=new e,s=new n,o=new i,a=new WeakMap,l=new WeakMap;let c={},u={},h=new WeakMap,f=[],p=null,_=!1,x=null,m=null,d=null,g=null,v=null,S=null,A=null,w=new Oe(0,0,0),M=0,R=!1,L=null,y=null,E=null,D=null,N=null;const z=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,k=0;const Y=t.getParameter(t.VERSION);Y.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=k>=1):Y.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=k>=2);let U=null,$={};const Q=t.getParameter(t.SCISSOR_BOX),se=t.getParameter(t.VIEWPORT),we=new Mt().fromArray(Q),ke=new Mt().fromArray(se);function j(F,he,X,Z){const ce=new Uint8Array(4),de=t.createTexture();t.bindTexture(F,de),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Xe=0;Xe<X;Xe++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(he,0,t.RGBA,1,1,Z,0,t.RGBA,t.UNSIGNED_BYTE,ce):t.texImage2D(he+Xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ce);return de}const ne={};ne[t.TEXTURE_2D]=j(t.TEXTURE_2D,t.TEXTURE_2D,1),ne[t.TEXTURE_CUBE_MAP]=j(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[t.TEXTURE_2D_ARRAY]=j(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ne[t.TEXTURE_3D]=j(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),fe(t.DEPTH_TEST),s.setFunc(To),He(!1),Ye(Eg),fe(t.CULL_FACE),I(Tr);function fe(F){c[F]!==!0&&(t.enable(F),c[F]=!0)}function le(F){c[F]!==!1&&(t.disable(F),c[F]=!1)}function Ie(F,he){return u[F]!==he?(t.bindFramebuffer(F,he),u[F]=he,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=he),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=he),!0):!1}function Ae(F,he){let X=f,Z=!1;if(F){X=h.get(he),X===void 0&&(X=[],h.set(he,X));const ce=F.textures;if(X.length!==ce.length||X[0]!==t.COLOR_ATTACHMENT0){for(let de=0,Xe=ce.length;de<Xe;de++)X[de]=t.COLOR_ATTACHMENT0+de;X.length=ce.length,Z=!0}}else X[0]!==t.BACK&&(X[0]=t.BACK,Z=!0);Z&&t.drawBuffers(X)}function Ge(F){return p!==F?(t.useProgram(F),p=F,!0):!1}const nt={[$r]:t.FUNC_ADD,[BM]:t.FUNC_SUBTRACT,[zM]:t.FUNC_REVERSE_SUBTRACT};nt[kM]=t.MIN,nt[HM]=t.MAX;const We={[VM]:t.ZERO,[GM]:t.ONE,[WM]:t.SRC_COLOR,[ed]:t.SRC_ALPHA,[KM]:t.SRC_ALPHA_SATURATE,[$M]:t.DST_COLOR,[jM]:t.DST_ALPHA,[XM]:t.ONE_MINUS_SRC_COLOR,[td]:t.ONE_MINUS_SRC_ALPHA,[qM]:t.ONE_MINUS_DST_COLOR,[YM]:t.ONE_MINUS_DST_ALPHA,[ZM]:t.CONSTANT_COLOR,[QM]:t.ONE_MINUS_CONSTANT_COLOR,[JM]:t.CONSTANT_ALPHA,[eE]:t.ONE_MINUS_CONSTANT_ALPHA};function I(F,he,X,Z,ce,de,Xe,Tt,dn,qe){if(F===Tr){_===!0&&(le(t.BLEND),_=!1);return}if(_===!1&&(fe(t.BLEND),_=!0),F!==OM){if(F!==x||qe!==R){if((m!==$r||v!==$r)&&(t.blendEquation(t.FUNC_ADD),m=$r,v=$r),qe)switch(F){case po:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case wg:t.blendFunc(t.ONE,t.ONE);break;case Tg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ag:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case po:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case wg:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Tg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ag:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}d=null,g=null,S=null,A=null,w.set(0,0,0),M=0,x=F,R=qe}return}ce=ce||he,de=de||X,Xe=Xe||Z,(he!==m||ce!==v)&&(t.blendEquationSeparate(nt[he],nt[ce]),m=he,v=ce),(X!==d||Z!==g||de!==S||Xe!==A)&&(t.blendFuncSeparate(We[X],We[Z],We[de],We[Xe]),d=X,g=Z,S=de,A=Xe),(Tt.equals(w)===!1||dn!==M)&&(t.blendColor(Tt.r,Tt.g,Tt.b,dn),w.copy(Tt),M=dn),x=F,R=!1}function En(F,he){F.side===Hn?le(t.CULL_FACE):fe(t.CULL_FACE);let X=F.side===cn;he&&(X=!X),He(X),F.blending===po&&F.transparent===!1?I(Tr):I(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),s.setFunc(F.depthFunc),s.setTest(F.depthTest),s.setMask(F.depthWrite),r.setMask(F.colorWrite);const Z=F.stencilWrite;o.setTest(Z),Z&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),at(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?fe(t.SAMPLE_ALPHA_TO_COVERAGE):le(t.SAMPLE_ALPHA_TO_COVERAGE)}function He(F){L!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),L=F)}function Ye(F){F!==UM?(fe(t.CULL_FACE),F!==y&&(F===Eg?t.cullFace(t.BACK):F===NM?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):le(t.CULL_FACE),y=F}function Re(F){F!==E&&(W&&t.lineWidth(F),E=F)}function at(F,he,X){F?(fe(t.POLYGON_OFFSET_FILL),(D!==he||N!==X)&&(t.polygonOffset(he,X),D=he,N=X)):le(t.POLYGON_OFFSET_FILL)}function Le(F){F?fe(t.SCISSOR_TEST):le(t.SCISSOR_TEST)}function b(F){F===void 0&&(F=t.TEXTURE0+z-1),U!==F&&(t.activeTexture(F),U=F)}function T(F,he,X){X===void 0&&(U===null?X=t.TEXTURE0+z-1:X=U);let Z=$[X];Z===void 0&&(Z={type:void 0,texture:void 0},$[X]=Z),(Z.type!==F||Z.texture!==he)&&(U!==X&&(t.activeTexture(X),U=X),t.bindTexture(F,he||ne[F]),Z.type=F,Z.texture=he)}function H(){const F=$[U];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function K(){try{t.compressedTexImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{t.compressedTexImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function q(){try{t.texSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{t.texSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function me(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $e(){try{t.texStorage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{t.texStorage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{t.texImage2D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{t.texImage3D.apply(t,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(F){we.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),we.copy(F))}function _e(F){ke.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),ke.copy(F))}function Ve(F,he){let X=l.get(he);X===void 0&&(X=new WeakMap,l.set(he,X));let Z=X.get(F);Z===void 0&&(Z=t.getUniformBlockIndex(he,F.name),X.set(F,Z))}function Ue(F,he){const Z=l.get(he).get(F);a.get(he)!==Z&&(t.uniformBlockBinding(he,Z,F.__bindingPointIndex),a.set(he,Z))}function st(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),c={},U=null,$={},u={},h=new WeakMap,f=[],p=null,_=!1,x=null,m=null,d=null,g=null,v=null,S=null,A=null,w=new Oe(0,0,0),M=0,R=!1,L=null,y=null,E=null,D=null,N=null,we.set(0,0,t.canvas.width,t.canvas.height),ke.set(0,0,t.canvas.width,t.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:fe,disable:le,bindFramebuffer:Ie,drawBuffers:Ae,useProgram:Ge,setBlending:I,setMaterial:En,setFlipSided:He,setCullFace:Ye,setLineWidth:Re,setPolygonOffset:at,setScissorTest:Le,activeTexture:b,bindTexture:T,unbindTexture:H,compressedTexImage2D:K,compressedTexImage3D:ee,texImage2D:ge,texImage3D:be,updateUBOMapping:Ve,uniformBlockBinding:Ue,texStorage2D:$e,texStorage3D:ie,texSubImage2D:q,texSubImage3D:Se,compressedTexSubImage2D:ae,compressedTexSubImage3D:me,scissor:Pe,viewport:_e,reset:st}}function g_(t,e,n,i){const r=BC(i);switch(n){case vx:return t*e;case yx:return t*e;case Sx:return t*e*2;case Mx:return t*e/r.components*r.byteLength;case bu:return t*e/r.components*r.byteLength;case Ex:return t*e*2/r.components*r.byteLength;case Kp:return t*e*2/r.components*r.byteLength;case xx:return t*e*3/r.components*r.byteLength;case Pn:return t*e*4/r.components*r.byteLength;case Zp:return t*e*4/r.components*r.byteLength;case wc:case Tc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Ac:case Cc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case pd:case gd:return Math.max(t,16)*Math.max(e,8)/4;case dd:case md:return Math.max(t,8)*Math.max(e,8)/2;case _d:case vd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case xd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case yd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Sd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Md:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Ed:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case wd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Td:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Ad:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Cd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Rd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case bd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Pd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Ld:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Dd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Id:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Rc:case Ud:case Nd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case wx:case Fd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Od:case Bd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function BC(t){switch(t){case ji:case mx:return{byteLength:1,components:1};case Ga:case gx:case Ka:return{byteLength:2,components:1};case $p:case qp:return{byteLength:2,components:4};case br:case Yp:case ci:return{byteLength:4,components:1};case _x:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function zC(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,T){return p?new OffscreenCanvas(b,T):ou("canvas")}function x(b,T,H){let K=1;const ee=Le(b);if((ee.width>H||ee.height>H)&&(K=H/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor(K*ee.width),Se=Math.floor(K*ee.height);h===void 0&&(h=_(q,Se));const ae=T?_(q,Se):h;return ae.width=q,ae.height=Se,ae.getContext("2d").drawImage(b,0,0,q,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+Se+")."),ae}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function m(b){return b.generateMipmaps&&b.minFilter!==xn&&b.minFilter!==ai}function d(b){t.generateMipmap(b)}function g(b,T,H,K,ee=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=T;if(T===t.RED&&(H===t.FLOAT&&(q=t.R32F),H===t.HALF_FLOAT&&(q=t.R16F),H===t.UNSIGNED_BYTE&&(q=t.R8)),T===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(q=t.R8UI),H===t.UNSIGNED_SHORT&&(q=t.R16UI),H===t.UNSIGNED_INT&&(q=t.R32UI),H===t.BYTE&&(q=t.R8I),H===t.SHORT&&(q=t.R16I),H===t.INT&&(q=t.R32I)),T===t.RG&&(H===t.FLOAT&&(q=t.RG32F),H===t.HALF_FLOAT&&(q=t.RG16F),H===t.UNSIGNED_BYTE&&(q=t.RG8)),T===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(q=t.RG8UI),H===t.UNSIGNED_SHORT&&(q=t.RG16UI),H===t.UNSIGNED_INT&&(q=t.RG32UI),H===t.BYTE&&(q=t.RG8I),H===t.SHORT&&(q=t.RG16I),H===t.INT&&(q=t.RG32I)),T===t.RGB_INTEGER&&(H===t.UNSIGNED_BYTE&&(q=t.RGB8UI),H===t.UNSIGNED_SHORT&&(q=t.RGB16UI),H===t.UNSIGNED_INT&&(q=t.RGB32UI),H===t.BYTE&&(q=t.RGB8I),H===t.SHORT&&(q=t.RGB16I),H===t.INT&&(q=t.RGB32I)),T===t.RGBA_INTEGER&&(H===t.UNSIGNED_BYTE&&(q=t.RGBA8UI),H===t.UNSIGNED_SHORT&&(q=t.RGBA16UI),H===t.UNSIGNED_INT&&(q=t.RGBA32UI),H===t.BYTE&&(q=t.RGBA8I),H===t.SHORT&&(q=t.RGBA16I),H===t.INT&&(q=t.RGBA32I)),T===t.RGB&&H===t.UNSIGNED_INT_5_9_9_9_REV&&(q=t.RGB9_E5),T===t.RGBA){const Se=ee?nu:Ke.getTransfer(K);H===t.FLOAT&&(q=t.RGBA32F),H===t.HALF_FLOAT&&(q=t.RGBA16F),H===t.UNSIGNED_BYTE&&(q=Se===ut?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(q=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(q=t.RGB5_A1)}return(q===t.R16F||q===t.R32F||q===t.RG16F||q===t.RG32F||q===t.RGBA16F||q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function v(b,T){let H;return b?T===null||T===br||T===Ro?H=t.DEPTH24_STENCIL8:T===ci?H=t.DEPTH32F_STENCIL8:T===Ga&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===br||T===Ro?H=t.DEPTH_COMPONENT24:T===ci?H=t.DEPTH_COMPONENT32F:T===Ga&&(H=t.DEPTH_COMPONENT16),H}function S(b,T){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==xn&&b.minFilter!==ai?Math.log2(Math.max(T.width,T.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?T.mipmaps.length:1}function A(b){const T=b.target;T.removeEventListener("dispose",A),M(T),T.isVideoTexture&&u.delete(T)}function w(b){const T=b.target;T.removeEventListener("dispose",w),L(T)}function M(b){const T=i.get(b);if(T.__webglInit===void 0)return;const H=b.source,K=f.get(H);if(K){const ee=K[T.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&R(b),Object.keys(K).length===0&&f.delete(H)}i.remove(b)}function R(b){const T=i.get(b);t.deleteTexture(T.__webglTexture);const H=b.source,K=f.get(H);delete K[T.__cacheKey],o.memory.textures--}function L(b){const T=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(T.__webglFramebuffer[K]))for(let ee=0;ee<T.__webglFramebuffer[K].length;ee++)t.deleteFramebuffer(T.__webglFramebuffer[K][ee]);else t.deleteFramebuffer(T.__webglFramebuffer[K]);T.__webglDepthbuffer&&t.deleteRenderbuffer(T.__webglDepthbuffer[K])}else{if(Array.isArray(T.__webglFramebuffer))for(let K=0;K<T.__webglFramebuffer.length;K++)t.deleteFramebuffer(T.__webglFramebuffer[K]);else t.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&t.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&t.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let K=0;K<T.__webglColorRenderbuffer.length;K++)T.__webglColorRenderbuffer[K]&&t.deleteRenderbuffer(T.__webglColorRenderbuffer[K]);T.__webglDepthRenderbuffer&&t.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const H=b.textures;for(let K=0,ee=H.length;K<ee;K++){const q=i.get(H[K]);q.__webglTexture&&(t.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(H[K])}i.remove(b)}let y=0;function E(){y=0}function D(){const b=y;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),y+=1,b}function N(b){const T=[];return T.push(b.wrapS),T.push(b.wrapT),T.push(b.wrapR||0),T.push(b.magFilter),T.push(b.minFilter),T.push(b.anisotropy),T.push(b.internalFormat),T.push(b.format),T.push(b.type),T.push(b.generateMipmaps),T.push(b.premultiplyAlpha),T.push(b.flipY),T.push(b.unpackAlignment),T.push(b.colorSpace),T.join()}function z(b,T){const H=i.get(b);if(b.isVideoTexture&&Re(b),b.isRenderTargetTexture===!1&&b.version>0&&H.__version!==b.version){const K=b.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ke(H,b,T);return}}n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+T)}function W(b,T){const H=i.get(b);if(b.version>0&&H.__version!==b.version){ke(H,b,T);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+T)}function k(b,T){const H=i.get(b);if(b.version>0&&H.__version!==b.version){ke(H,b,T);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+T)}function Y(b,T){const H=i.get(b);if(b.version>0&&H.__version!==b.version){j(H,b,T);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+T)}const U={[fd]:t.REPEAT,[Jr]:t.CLAMP_TO_EDGE,[hd]:t.MIRRORED_REPEAT},$={[xn]:t.NEAREST,[uE]:t.NEAREST_MIPMAP_NEAREST,[_l]:t.NEAREST_MIPMAP_LINEAR,[ai]:t.LINEAR,[hf]:t.LINEAR_MIPMAP_NEAREST,[es]:t.LINEAR_MIPMAP_LINEAR},Q={[pE]:t.NEVER,[yE]:t.ALWAYS,[mE]:t.LESS,[Ax]:t.LEQUAL,[gE]:t.EQUAL,[xE]:t.GEQUAL,[_E]:t.GREATER,[vE]:t.NOTEQUAL};function se(b,T){if(T.type===ci&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===ai||T.magFilter===hf||T.magFilter===_l||T.magFilter===es||T.minFilter===ai||T.minFilter===hf||T.minFilter===_l||T.minFilter===es)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,U[T.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,U[T.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,U[T.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,$[T.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,$[T.minFilter]),T.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,Q[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===xn||T.minFilter!==_l&&T.minFilter!==es||T.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function we(b,T){let H=!1;b.__webglInit===void 0&&(b.__webglInit=!0,T.addEventListener("dispose",A));const K=T.source;let ee=f.get(K);ee===void 0&&(ee={},f.set(K,ee));const q=N(T);if(q!==b.__cacheKey){ee[q]===void 0&&(ee[q]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ee[q].usedTimes++;const Se=ee[b.__cacheKey];Se!==void 0&&(ee[b.__cacheKey].usedTimes--,Se.usedTimes===0&&R(T)),b.__cacheKey=q,b.__webglTexture=ee[q].texture}return H}function ke(b,T,H){let K=t.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(K=t.TEXTURE_2D_ARRAY),T.isData3DTexture&&(K=t.TEXTURE_3D);const ee=we(b,T),q=T.source;n.bindTexture(K,b.__webglTexture,t.TEXTURE0+H);const Se=i.get(q);if(q.version!==Se.__version||ee===!0){n.activeTexture(t.TEXTURE0+H);const ae=Ke.getPrimaries(Ke.workingColorSpace),me=T.colorSpace===hr?null:Ke.getPrimaries(T.colorSpace),$e=T.colorSpace===hr||ae===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ie=x(T.image,!1,r.maxTextureSize);ie=at(T,ie);const ge=s.convert(T.format,T.colorSpace),be=s.convert(T.type);let Pe=g(T.internalFormat,ge,be,T.colorSpace,T.isVideoTexture);se(K,T);let _e;const Ve=T.mipmaps,Ue=T.isVideoTexture!==!0,st=Se.__version===void 0||ee===!0,F=q.dataReady,he=S(T,ie);if(T.isDepthTexture)Pe=v(T.format===bo,T.type),st&&(Ue?n.texStorage2D(t.TEXTURE_2D,1,Pe,ie.width,ie.height):n.texImage2D(t.TEXTURE_2D,0,Pe,ie.width,ie.height,0,ge,be,null));else if(T.isDataTexture)if(Ve.length>0){Ue&&st&&n.texStorage2D(t.TEXTURE_2D,he,Pe,Ve[0].width,Ve[0].height);for(let X=0,Z=Ve.length;X<Z;X++)_e=Ve[X],Ue?F&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,be,_e.data):n.texImage2D(t.TEXTURE_2D,X,Pe,_e.width,_e.height,0,ge,be,_e.data);T.generateMipmaps=!1}else Ue?(st&&n.texStorage2D(t.TEXTURE_2D,he,Pe,ie.width,ie.height),F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie.width,ie.height,ge,be,ie.data)):n.texImage2D(t.TEXTURE_2D,0,Pe,ie.width,ie.height,0,ge,be,ie.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ue&&st&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Pe,Ve[0].width,Ve[0].height,ie.depth);for(let X=0,Z=Ve.length;X<Z;X++)if(_e=Ve[X],T.format!==Pn)if(ge!==null)if(Ue){if(F)if(T.layerUpdates.size>0){const ce=g_(_e.width,_e.height,T.format,T.type);for(const de of T.layerUpdates){const Xe=_e.data.subarray(de*ce/_e.data.BYTES_PER_ELEMENT,(de+1)*ce/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,de,_e.width,_e.height,1,ge,Xe,0,0)}T.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,_e.width,_e.height,ie.depth,ge,_e.data,0,0)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Pe,_e.width,_e.height,ie.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,_e.width,_e.height,ie.depth,ge,be,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,X,Pe,_e.width,_e.height,ie.depth,0,ge,be,_e.data)}else{Ue&&st&&n.texStorage2D(t.TEXTURE_2D,he,Pe,Ve[0].width,Ve[0].height);for(let X=0,Z=Ve.length;X<Z;X++)_e=Ve[X],T.format!==Pn?ge!==null?Ue?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,X,Pe,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?F&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,_e.width,_e.height,ge,be,_e.data):n.texImage2D(t.TEXTURE_2D,X,Pe,_e.width,_e.height,0,ge,be,_e.data)}else if(T.isDataArrayTexture)if(Ue){if(st&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Pe,ie.width,ie.height,ie.depth),F)if(T.layerUpdates.size>0){const X=g_(ie.width,ie.height,T.format,T.type);for(const Z of T.layerUpdates){const ce=ie.data.subarray(Z*X/ie.data.BYTES_PER_ELEMENT,(Z+1)*X/ie.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,ie.width,ie.height,1,ge,be,ce)}T.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ge,be,ie.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,ie.width,ie.height,ie.depth,0,ge,be,ie.data);else if(T.isData3DTexture)Ue?(st&&n.texStorage3D(t.TEXTURE_3D,he,Pe,ie.width,ie.height,ie.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ge,be,ie.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,ie.width,ie.height,ie.depth,0,ge,be,ie.data);else if(T.isFramebufferTexture){if(st)if(Ue)n.texStorage2D(t.TEXTURE_2D,he,Pe,ie.width,ie.height);else{let X=ie.width,Z=ie.height;for(let ce=0;ce<he;ce++)n.texImage2D(t.TEXTURE_2D,ce,Pe,X,Z,0,ge,be,null),X>>=1,Z>>=1}}else if(Ve.length>0){if(Ue&&st){const X=Le(Ve[0]);n.texStorage2D(t.TEXTURE_2D,he,Pe,X.width,X.height)}for(let X=0,Z=Ve.length;X<Z;X++)_e=Ve[X],Ue?F&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,ge,be,_e):n.texImage2D(t.TEXTURE_2D,X,Pe,ge,be,_e);T.generateMipmaps=!1}else if(Ue){if(st){const X=Le(ie);n.texStorage2D(t.TEXTURE_2D,he,Pe,X.width,X.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ge,be,ie)}else n.texImage2D(t.TEXTURE_2D,0,Pe,ge,be,ie);m(T)&&d(K),Se.__version=q.version,T.onUpdate&&T.onUpdate(T)}b.__version=T.version}function j(b,T,H){if(T.image.length!==6)return;const K=we(b,T),ee=T.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+H);const q=i.get(ee);if(ee.version!==q.__version||K===!0){n.activeTexture(t.TEXTURE0+H);const Se=Ke.getPrimaries(Ke.workingColorSpace),ae=T.colorSpace===hr?null:Ke.getPrimaries(T.colorSpace),me=T.colorSpace===hr||Se===ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,T.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,T.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const $e=T.isCompressedTexture||T.image[0].isCompressedTexture,ie=T.image[0]&&T.image[0].isDataTexture,ge=[];for(let Z=0;Z<6;Z++)!$e&&!ie?ge[Z]=x(T.image[Z],!0,r.maxCubemapSize):ge[Z]=ie?T.image[Z].image:T.image[Z],ge[Z]=at(T,ge[Z]);const be=ge[0],Pe=s.convert(T.format,T.colorSpace),_e=s.convert(T.type),Ve=g(T.internalFormat,Pe,_e,T.colorSpace),Ue=T.isVideoTexture!==!0,st=q.__version===void 0||K===!0,F=ee.dataReady;let he=S(T,be);se(t.TEXTURE_CUBE_MAP,T);let X;if($e){Ue&&st&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Ve,be.width,be.height);for(let Z=0;Z<6;Z++){X=ge[Z].mipmaps;for(let ce=0;ce<X.length;ce++){const de=X[ce];T.format!==Pn?Pe!==null?Ue?F&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,de.width,de.height,Pe,de.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ve,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,0,0,de.width,de.height,Pe,_e,de.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce,Ve,de.width,de.height,0,Pe,_e,de.data)}}}else{if(X=T.mipmaps,Ue&&st){X.length>0&&he++;const Z=Le(ge[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Ve,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ie){Ue?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ge[Z].width,ge[Z].height,Pe,_e,ge[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,ge[Z].width,ge[Z].height,0,Pe,_e,ge[Z].data);for(let ce=0;ce<X.length;ce++){const Xe=X[ce].image[Z].image;Ue?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Xe.width,Xe.height,Pe,_e,Xe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ve,Xe.width,Xe.height,0,Pe,_e,Xe.data)}}else{Ue?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pe,_e,ge[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,Pe,_e,ge[Z]);for(let ce=0;ce<X.length;ce++){const de=X[ce];Ue?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,0,0,Pe,_e,de.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ce+1,Ve,Pe,_e,de.image[Z])}}}m(T)&&d(t.TEXTURE_CUBE_MAP),q.__version=ee.version,T.onUpdate&&T.onUpdate(T)}b.__version=T.version}function ne(b,T,H,K,ee,q){const Se=s.convert(H.format,H.colorSpace),ae=s.convert(H.type),me=g(H.internalFormat,Se,ae,H.colorSpace);if(!i.get(T).__hasExternalTextures){const ie=Math.max(1,T.width>>q),ge=Math.max(1,T.height>>q);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,q,me,ie,ge,T.depth,0,Se,ae,null):n.texImage2D(ee,q,me,ie,ge,0,Se,ae,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Ye(T)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,ee,i.get(H).__webglTexture,0,He(T)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,K,ee,i.get(H).__webglTexture,q),n.bindFramebuffer(t.FRAMEBUFFER,null)}function fe(b,T,H){if(t.bindRenderbuffer(t.RENDERBUFFER,b),T.depthBuffer){const K=T.depthTexture,ee=K&&K.isDepthTexture?K.type:null,q=v(T.stencilBuffer,ee),Se=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ae=He(T);Ye(T)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ae,q,T.width,T.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,ae,q,T.width,T.height):t.renderbufferStorage(t.RENDERBUFFER,q,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,b)}else{const K=T.textures;for(let ee=0;ee<K.length;ee++){const q=K[ee],Se=s.convert(q.format,q.colorSpace),ae=s.convert(q.type),me=g(q.internalFormat,Se,ae,q.colorSpace),$e=He(T);H&&Ye(T)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,$e,me,T.width,T.height):Ye(T)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,$e,me,T.width,T.height):t.renderbufferStorage(t.RENDERBUFFER,me,T.width,T.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function le(b,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),z(T.depthTexture,0);const K=i.get(T.depthTexture).__webglTexture,ee=He(T);if(T.depthTexture.format===mo)Ye(T)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,K,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,K,0);else if(T.depthTexture.format===bo)Ye(T)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,K,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ie(b){const T=i.get(b),H=b.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==b.depthTexture){const K=b.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),K){const ee=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),T.__depthDisposeCallback=ee}T.__boundDepthTexture=K}if(b.depthTexture&&!T.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");le(T.__webglFramebuffer,b)}else if(H){T.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(n.bindFramebuffer(t.FRAMEBUFFER,T.__webglFramebuffer[K]),T.__webglDepthbuffer[K]===void 0)T.__webglDepthbuffer[K]=t.createRenderbuffer(),fe(T.__webglDepthbuffer[K],b,!1);else{const ee=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,q=T.__webglDepthbuffer[K];t.bindRenderbuffer(t.RENDERBUFFER,q),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,q)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=t.createRenderbuffer(),fe(T.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=T.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,ee)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ae(b,T,H){const K=i.get(b);T!==void 0&&ne(K.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Ie(b)}function Ge(b){const T=b.texture,H=i.get(b),K=i.get(T);b.addEventListener("dispose",w);const ee=b.textures,q=b.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||(K.__webglTexture===void 0&&(K.__webglTexture=t.createTexture()),K.__version=T.version,o.memory.textures++),q){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[ae]=[];for(let me=0;me<T.mipmaps.length;me++)H.__webglFramebuffer[ae][me]=t.createFramebuffer()}else H.__webglFramebuffer[ae]=t.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let ae=0;ae<T.mipmaps.length;ae++)H.__webglFramebuffer[ae]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(Se)for(let ae=0,me=ee.length;ae<me;ae++){const $e=i.get(ee[ae]);$e.__webglTexture===void 0&&($e.__webglTexture=t.createTexture(),o.memory.textures++)}if(b.samples>0&&Ye(b)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ae=0;ae<ee.length;ae++){const me=ee[ae];H.__webglColorRenderbuffer[ae]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);const $e=s.convert(me.format,me.colorSpace),ie=s.convert(me.type),ge=g(me.internalFormat,$e,ie,me.colorSpace,b.isXRRenderTarget===!0),be=He(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,be,ge,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.RENDERBUFFER,H.__webglColorRenderbuffer[ae])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),fe(H.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(q){n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),se(t.TEXTURE_CUBE_MAP,T);for(let ae=0;ae<6;ae++)if(T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)ne(H.__webglFramebuffer[ae][me],b,T,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me);else ne(H.__webglFramebuffer[ae],b,T,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(T)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let ae=0,me=ee.length;ae<me;ae++){const $e=ee[ae],ie=i.get($e);n.bindTexture(t.TEXTURE_2D,ie.__webglTexture),se(t.TEXTURE_2D,$e),ne(H.__webglFramebuffer,b,$e,t.COLOR_ATTACHMENT0+ae,t.TEXTURE_2D,0),m($e)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let ae=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ae,K.__webglTexture),se(ae,T),T.mipmaps&&T.mipmaps.length>0)for(let me=0;me<T.mipmaps.length;me++)ne(H.__webglFramebuffer[me],b,T,t.COLOR_ATTACHMENT0,ae,me);else ne(H.__webglFramebuffer,b,T,t.COLOR_ATTACHMENT0,ae,0);m(T)&&d(ae),n.unbindTexture()}b.depthBuffer&&Ie(b)}function nt(b){const T=b.textures;for(let H=0,K=T.length;H<K;H++){const ee=T[H];if(m(ee)){const q=b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Se=i.get(ee).__webglTexture;n.bindTexture(q,Se),d(q),n.unbindTexture()}}}const We=[],I=[];function En(b){if(b.samples>0){if(Ye(b)===!1){const T=b.textures,H=b.width,K=b.height;let ee=t.COLOR_BUFFER_BIT;const q=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(b),ae=T.length>1;if(ae)for(let me=0;me<T.length;me++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let me=0;me<T.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),ae){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const $e=i.get(T[me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,$e,0)}t.blitFramebuffer(0,0,H,K,0,0,H,K,ee,t.NEAREST),l===!0&&(We.length=0,I.length=0,We.push(t.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(We.push(q),I.push(q),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,I)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,We))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ae)for(let me=0;me<T.length;me++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,Se.__webglColorRenderbuffer[me]);const $e=i.get(T[me]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,$e,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const T=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[T])}}}function He(b){return Math.min(r.maxSamples,b.samples)}function Ye(b){const T=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Re(b){const T=o.render.frame;u.get(b)!==T&&(u.set(b,T),b.update())}function at(b,T){const H=b.colorSpace,K=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||H!==Nr&&H!==hr&&(Ke.getTransfer(H)===ut?(K!==Pn||ee!==ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),T}function Le(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=E,this.setTexture2D=z,this.setTexture2DArray=W,this.setTexture3D=k,this.setTextureCube=Y,this.rebindTextures=Ae,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=En,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=Ye}function kC(t,e){function n(i,r=hr){let s;const o=Ke.getTransfer(r);if(i===ji)return t.UNSIGNED_BYTE;if(i===$p)return t.UNSIGNED_SHORT_4_4_4_4;if(i===qp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===_x)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===mx)return t.BYTE;if(i===gx)return t.SHORT;if(i===Ga)return t.UNSIGNED_SHORT;if(i===Yp)return t.INT;if(i===br)return t.UNSIGNED_INT;if(i===ci)return t.FLOAT;if(i===Ka)return t.HALF_FLOAT;if(i===vx)return t.ALPHA;if(i===xx)return t.RGB;if(i===Pn)return t.RGBA;if(i===yx)return t.LUMINANCE;if(i===Sx)return t.LUMINANCE_ALPHA;if(i===mo)return t.DEPTH_COMPONENT;if(i===bo)return t.DEPTH_STENCIL;if(i===Mx)return t.RED;if(i===bu)return t.RED_INTEGER;if(i===Ex)return t.RG;if(i===Kp)return t.RG_INTEGER;if(i===Zp)return t.RGBA_INTEGER;if(i===wc||i===Tc||i===Ac||i===Cc)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===wc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Tc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ac)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===wc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Tc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ac)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===dd||i===pd||i===md||i===gd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===dd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===md)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===gd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_d||i===vd||i===xd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_d||i===vd)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===xd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yd||i===Sd||i===Md||i===Ed||i===wd||i===Td||i===Ad||i===Cd||i===Rd||i===bd||i===Pd||i===Ld||i===Dd||i===Id)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===yd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Sd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Md)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ed)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Td)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ad)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ld)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Dd)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Id)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rc||i===Ud||i===Nd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Rc)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ud)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wx||i===Fd||i===Od||i===Bd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Fd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Od)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ro?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class HC extends kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ts extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VC={type:"move"};class kf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ts,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ts,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ts,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=n.getJointPose(x,i),d=this._getHandJoint(c,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(VC)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new ts;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const GC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class XC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new nn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Pr({vertexShader:GC,fragmentShader:WC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new rt(new mr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jC extends ps{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,_=null;const x=new XC,m=n.getContextAttributes();let d=null,g=null;const v=[],S=[],A=new ye;let w=null;const M=new kn;M.layers.enable(1),M.viewport=new Mt;const R=new kn;R.layers.enable(2),R.viewport=new Mt;const L=[M,R],y=new HC;y.layers.enable(1),y.layers.enable(2);let E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=v[j];return ne===void 0&&(ne=new kf,v[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=v[j];return ne===void 0&&(ne=new kf,v[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=v[j];return ne===void 0&&(ne=new kf,v[j]=ne),ne.getHandSpace()};function N(j){const ne=S.indexOf(j.inputSource);if(ne===-1)return;const fe=v[ne];fe!==void 0&&(fe.update(j.inputSource,j.frame,c||o),fe.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",W);for(let j=0;j<v.length;j++){const ne=S[j];ne!==null&&(S[j]=null,v[j].disconnect(ne))}E=null,D=null,x.reset(),e.setRenderTarget(d),p=null,f=null,h=null,r=null,g=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",z),r.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),r.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new us(p.framebufferWidth,p.framebufferHeight,{format:Pn,type:ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,fe=null,le=null;m.depth&&(le=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ne=m.stencil?bo:mo,fe=m.stencil?Ro:br);const Ie={colorFormat:n.RGBA8,depthFormat:le,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(Ie),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),g=new us(f.textureWidth,f.textureHeight,{format:Pn,type:ji,depthTexture:new Bx(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function W(j){for(let ne=0;ne<j.removed.length;ne++){const fe=j.removed[ne],le=S.indexOf(fe);le>=0&&(S[le]=null,v[le].disconnect(fe))}for(let ne=0;ne<j.added.length;ne++){const fe=j.added[ne];let le=S.indexOf(fe);if(le===-1){for(let Ae=0;Ae<v.length;Ae++)if(Ae>=S.length){S.push(fe),le=Ae;break}else if(S[Ae]===null){S[Ae]=fe,le=Ae;break}if(le===-1)break}const Ie=v[le];Ie&&Ie.connect(fe)}}const k=new P,Y=new P;function U(j,ne,fe){k.setFromMatrixPosition(ne.matrixWorld),Y.setFromMatrixPosition(fe.matrixWorld);const le=k.distanceTo(Y),Ie=ne.projectionMatrix.elements,Ae=fe.projectionMatrix.elements,Ge=Ie[14]/(Ie[10]-1),nt=Ie[14]/(Ie[10]+1),We=(Ie[9]+1)/Ie[5],I=(Ie[9]-1)/Ie[5],En=(Ie[8]-1)/Ie[0],He=(Ae[8]+1)/Ae[0],Ye=Ge*En,Re=Ge*He,at=le/(-En+He),Le=at*-En;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Le),j.translateZ(at),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ie[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const b=Ge+at,T=nt+at,H=Ye-Le,K=Re+(le-Le),ee=We*nt/T*b,q=I*nt/T*b;j.projectionMatrix.makePerspective(H,K,ee,q,b,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function $(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,fe=j.far;x.texture!==null&&(x.depthNear>0&&(ne=x.depthNear),x.depthFar>0&&(fe=x.depthFar)),y.near=R.near=M.near=ne,y.far=R.far=M.far=fe,(E!==y.near||D!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,D=y.far);const le=j.parent,Ie=y.cameras;$(y,le);for(let Ae=0;Ae<Ie.length;Ae++)$(Ie[Ae],le);Ie.length===2?U(y,M,R):y.projectionMatrix.copy(M.projectionMatrix),Q(j,y,le)};function Q(j,ne,fe){fe===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(fe.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Wa*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(j){l=j,f!==null&&(f.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let se=null;function we(j,ne){if(u=ne.getViewerPose(c||o),_=ne,u!==null){const fe=u.views;p!==null&&(e.setRenderTargetFramebuffer(g,p.framebuffer),e.setRenderTarget(g));let le=!1;fe.length!==y.cameras.length&&(y.cameras.length=0,le=!0);for(let Ae=0;Ae<fe.length;Ae++){const Ge=fe[Ae];let nt=null;if(p!==null)nt=p.getViewport(Ge);else{const I=h.getViewSubImage(f,Ge);nt=I.viewport,Ae===0&&(e.setRenderTargetTextures(g,I.colorTexture,f.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(g))}let We=L[Ae];We===void 0&&(We=new kn,We.layers.enable(Ae),We.viewport=new Mt,L[Ae]=We),We.matrix.fromArray(Ge.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ge.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(nt.x,nt.y,nt.width,nt.height),Ae===0&&(y.matrix.copy(We.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),le===!0&&y.cameras.push(We)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){const Ae=h.getDepthInformation(fe[0]);Ae&&Ae.isValid&&Ae.texture&&x.init(e,Ae,r.renderState)}}for(let fe=0;fe<v.length;fe++){const le=S[fe],Ie=v[fe];le!==null&&Ie!==void 0&&Ie.update(le,ne,c||o)}se&&se(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}const ke=new Fx;ke.setAnimationLoop(we),this.setAnimationLoop=function(j){se=j},this.dispose=function(){}}}const Vr=new Ei,YC=new Be;function $C(t,e){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ix(t)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,g,v,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(s(m,d),_(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),x(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,g,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===cn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===cn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const g=e.get(d),v=g.envMap,S=g.envMapRotation;v&&(m.envMap.value=v,Vr.copy(S),Vr.x*=-1,Vr.y*=-1,Vr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Vr.y*=-1,Vr.z*=-1),m.envMapRotation.value.setFromMatrix4(YC.makeRotationFromEuler(Vr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,g,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*g,m.scale.value=v*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,g){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===cn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const g=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qC(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){const S=v.program;i.uniformBlockBinding(g,S)}function c(g,v){let S=r[g.id];S===void 0&&(_(g),S=u(g),r[g.id]=S,g.addEventListener("dispose",m));const A=v.program;i.updateUBOMapping(g,A);const w=e.render.frame;s[g.id]!==w&&(f(g),s[g.id]=w)}function u(g){const v=h();g.__bindingPointIndex=v;const S=t.createBuffer(),A=g.__size,w=g.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,A,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,S),S}function h(){for(let g=0;g<a;g++)if(o.indexOf(g)===-1)return o.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(g){const v=r[g.id],S=g.uniforms,A=g.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let w=0,M=S.length;w<M;w++){const R=Array.isArray(S[w])?S[w]:[S[w]];for(let L=0,y=R.length;L<y;L++){const E=R[L];if(p(E,w,L,A)===!0){const D=E.__offset,N=Array.isArray(E.value)?E.value:[E.value];let z=0;for(let W=0;W<N.length;W++){const k=N[W],Y=x(k);typeof k=="number"||typeof k=="boolean"?(E.__data[0]=k,t.bufferSubData(t.UNIFORM_BUFFER,D+z,E.__data)):k.isMatrix3?(E.__data[0]=k.elements[0],E.__data[1]=k.elements[1],E.__data[2]=k.elements[2],E.__data[3]=0,E.__data[4]=k.elements[3],E.__data[5]=k.elements[4],E.__data[6]=k.elements[5],E.__data[7]=0,E.__data[8]=k.elements[6],E.__data[9]=k.elements[7],E.__data[10]=k.elements[8],E.__data[11]=0):(k.toArray(E.__data,z),z+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,D,E.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(g,v,S,A){const w=g.value,M=v+"_"+S;if(A[M]===void 0)return typeof w=="number"||typeof w=="boolean"?A[M]=w:A[M]=w.clone(),!0;{const R=A[M];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[M]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function _(g){const v=g.uniforms;let S=0;const A=16;for(let M=0,R=v.length;M<R;M++){const L=Array.isArray(v[M])?v[M]:[v[M]];for(let y=0,E=L.length;y<E;y++){const D=L[y],N=Array.isArray(D.value)?D.value:[D.value];for(let z=0,W=N.length;z<W;z++){const k=N[z],Y=x(k),U=S%A,$=U%Y.boundary,Q=U+$;S+=$,Q!==0&&A-Q<Y.storage&&(S+=A-Q),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=S,S+=Y.storage}}}const w=S%A;return w>0&&(S+=A-w),g.__size=S,g.__cache={},this}function x(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function m(g){const v=g.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const g in r)t.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class KC{constructor(e={}){const{canvas:n=OE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),_=new Int32Array(4);let x=null,m=null;const d=[],g=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gi,this.toneMapping=Ar,this.toneMappingExposure=1;const v=this;let S=!1,A=0,w=0,M=null,R=-1,L=null;const y=new Mt,E=new Mt;let D=null;const N=new Oe(0);let z=0,W=n.width,k=n.height,Y=1,U=null,$=null;const Q=new Mt(0,0,W,k),se=new Mt(0,0,W,k);let we=!1;const ke=new Lu;let j=!1,ne=!1;const fe=new Be,le=new Be,Ie=new P,Ae=new Mt,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function We(){return M===null?Y:1}let I=i;function En(C,O){return n.getContext(C,O)}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Xp}`),n.addEventListener("webglcontextlost",Z,!1),n.addEventListener("webglcontextrestored",ce,!1),n.addEventListener("webglcontextcreationerror",de,!1),I===null){const O="webgl2";if(I=En(O,C),I===null)throw En(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let He,Ye,Re,at,Le,b,T,H,K,ee,q,Se,ae,me,$e,ie,ge,be,Pe,_e,Ve,Ue,st,F;function he(){He=new tA(I),He.init(),Ue=new kC(I,He),Ye=new q1(I,He,e,Ue),Re=new OC(I),Ye.reverseDepthBuffer&&Re.buffers.depth.setReversed(!0),at=new rA(I),Le=new MC,b=new zC(I,He,Re,Le,Ye,Ue,at),T=new Z1(v),H=new eA(v),K=new fw(I),st=new Y1(I,K),ee=new nA(I,K,at,st),q=new oA(I,ee,K,at),Pe=new sA(I,Ye,b),ie=new K1(Le),Se=new SC(v,T,H,He,Ye,st,ie),ae=new $C(v,Le),me=new wC,$e=new PC(He),be=new j1(v,T,H,Re,q,f,l),ge=new NC(v,q,Ye),F=new qC(I,at,Ye,Re),_e=new $1(I,He,at),Ve=new iA(I,He,at),at.programs=Se.programs,v.capabilities=Ye,v.extensions=He,v.properties=Le,v.renderLists=me,v.shadowMap=ge,v.state=Re,v.info=at}he();const X=new jC(v,I);this.xr=X,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const C=He.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=He.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(C){C!==void 0&&(Y=C,this.setSize(W,k,!1))},this.getSize=function(C){return C.set(W,k)},this.setSize=function(C,O,V=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=C,k=O,n.width=Math.floor(C*Y),n.height=Math.floor(O*Y),V===!0&&(n.style.width=C+"px",n.style.height=O+"px"),this.setViewport(0,0,C,O)},this.getDrawingBufferSize=function(C){return C.set(W*Y,k*Y).floor()},this.setDrawingBufferSize=function(C,O,V){W=C,k=O,Y=V,n.width=Math.floor(C*V),n.height=Math.floor(O*V),this.setViewport(0,0,C,O)},this.getCurrentViewport=function(C){return C.copy(y)},this.getViewport=function(C){return C.copy(Q)},this.setViewport=function(C,O,V,G){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,O,V,G),Re.viewport(y.copy(Q).multiplyScalar(Y).round())},this.getScissor=function(C){return C.copy(se)},this.setScissor=function(C,O,V,G){C.isVector4?se.set(C.x,C.y,C.z,C.w):se.set(C,O,V,G),Re.scissor(E.copy(se).multiplyScalar(Y).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(C){Re.setScissorTest(we=C)},this.setOpaqueSort=function(C){U=C},this.setTransparentSort=function(C){$=C},this.getClearColor=function(C){return C.copy(be.getClearColor())},this.setClearColor=function(){be.setClearColor.apply(be,arguments)},this.getClearAlpha=function(){return be.getClearAlpha()},this.setClearAlpha=function(){be.setClearAlpha.apply(be,arguments)},this.clear=function(C=!0,O=!0,V=!0){let G=0;if(C){let B=!1;if(M!==null){const re=M.texture.format;B=re===Zp||re===Kp||re===bu}if(B){const re=M.texture.type,ue=re===ji||re===br||re===Ga||re===Ro||re===$p||re===qp,ve=be.getClearColor(),xe=be.getClearAlpha(),Te=ve.r,Ce=ve.g,Me=ve.b;ue?(p[0]=Te,p[1]=Ce,p[2]=Me,p[3]=xe,I.clearBufferuiv(I.COLOR,0,p)):(_[0]=Te,_[1]=Ce,_[2]=Me,_[3]=xe,I.clearBufferiv(I.COLOR,0,_))}else G|=I.COLOR_BUFFER_BIT}O&&(G|=I.DEPTH_BUFFER_BIT,I.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Z,!1),n.removeEventListener("webglcontextrestored",ce,!1),n.removeEventListener("webglcontextcreationerror",de,!1),me.dispose(),$e.dispose(),Le.dispose(),T.dispose(),H.dispose(),q.dispose(),st.dispose(),F.dispose(),Se.dispose(),X.dispose(),X.removeEventListener("sessionstart",om),X.removeEventListener("sessionend",am),Fr.stop()};function Z(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const C=at.autoReset,O=ge.enabled,V=ge.autoUpdate,G=ge.needsUpdate,B=ge.type;he(),at.autoReset=C,ge.enabled=O,ge.autoUpdate=V,ge.needsUpdate=G,ge.type=B}function de(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Xe(C){const O=C.target;O.removeEventListener("dispose",Xe),Tt(O)}function Tt(C){dn(C),Le.remove(C)}function dn(C){const O=Le.get(C).programs;O!==void 0&&(O.forEach(function(V){Se.releaseProgram(V)}),C.isShaderMaterial&&Se.releaseShaderCache(C))}this.renderBufferDirect=function(C,O,V,G,B,re){O===null&&(O=Ge);const ue=B.isMesh&&B.matrixWorld.determinant()<0,ve=ey(C,O,V,G,B);Re.setMaterial(G,ue);let xe=V.index,Te=1;if(G.wireframe===!0){if(xe=ee.getWireframeAttribute(V),xe===void 0)return;Te=2}const Ce=V.drawRange,Me=V.attributes.position;let Je=Ce.start*Te,lt=(Ce.start+Ce.count)*Te;re!==null&&(Je=Math.max(Je,re.start*Te),lt=Math.min(lt,(re.start+re.count)*Te)),xe!==null?(Je=Math.max(Je,0),lt=Math.min(lt,xe.count)):Me!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,Me.count));const vt=lt-Je;if(vt<0||vt===1/0)return;st.setup(B,G,ve,V,xe);let wn,Ze=_e;if(xe!==null&&(wn=K.get(xe),Ze=Ve,Ze.setIndex(wn)),B.isMesh)G.wireframe===!0?(Re.setLineWidth(G.wireframeLinewidth*We()),Ze.setMode(I.LINES)):Ze.setMode(I.TRIANGLES);else if(B.isLine){let Ee=G.linewidth;Ee===void 0&&(Ee=1),Re.setLineWidth(Ee*We()),B.isLineSegments?Ze.setMode(I.LINES):B.isLineLoop?Ze.setMode(I.LINE_LOOP):Ze.setMode(I.LINE_STRIP)}else B.isPoints?Ze.setMode(I.POINTS):B.isSprite&&Ze.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ze.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(He.get("WEBGL_multi_draw"))Ze.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ee=B._multiDrawStarts,Vt=B._multiDrawCounts,Qe=B._multiDrawCount,Zn=xe?K.get(xe).bytesPerElement:1,gs=Le.get(G).currentProgram.getUniforms();for(let Tn=0;Tn<Qe;Tn++)gs.setValue(I,"_gl_DrawID",Tn),Ze.render(Ee[Tn]/Zn,Vt[Tn])}else if(B.isInstancedMesh)Ze.renderInstances(Je,vt,B.count);else if(V.isInstancedBufferGeometry){const Ee=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Vt=Math.min(V.instanceCount,Ee);Ze.renderInstances(Je,vt,Vt)}else Ze.render(Je,vt)};function qe(C,O,V){C.transparent===!0&&C.side===Hn&&C.forceSinglePass===!1?(C.side=cn,C.needsUpdate=!0,Ja(C,O,V),C.side=Mi,C.needsUpdate=!0,Ja(C,O,V),C.side=Hn):Ja(C,O,V)}this.compile=function(C,O,V=null){V===null&&(V=C),m=$e.get(V),m.init(O),g.push(m),V.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),C!==V&&C.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const G=new Set;return C.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const re=B.material;if(re)if(Array.isArray(re))for(let ue=0;ue<re.length;ue++){const ve=re[ue];qe(ve,V,B),G.add(ve)}else qe(re,V,B),G.add(re)}),g.pop(),m=null,G},this.compileAsync=function(C,O,V=null){const G=this.compile(C,O,V);return new Promise(B=>{function re(){if(G.forEach(function(ue){Le.get(ue).currentProgram.isReady()&&G.delete(ue)}),G.size===0){B(C);return}setTimeout(re,10)}He.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let pn=null;function wi(C){pn&&pn(C)}function om(){Fr.stop()}function am(){Fr.start()}const Fr=new Fx;Fr.setAnimationLoop(wi),typeof self<"u"&&Fr.setContext(self),this.setAnimationLoop=function(C){pn=C,X.setAnimationLoop(C),C===null?Fr.stop():Fr.start()},X.addEventListener("sessionstart",om),X.addEventListener("sessionend",am),this.render=function(C,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(O),O=X.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,O,M),m=$e.get(C,g.length),m.init(O),g.push(m),le.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),ke.setFromProjectionMatrix(le),ne=this.localClippingEnabled,j=ie.init(this.clippingPlanes,ne),x=me.get(C,d.length),x.init(),d.push(x),X.enabled===!0&&X.isPresenting===!0){const re=v.xr.getDepthSensingMesh();re!==null&&Nu(re,O,-1/0,v.sortObjects)}Nu(C,O,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(U,$),nt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,nt&&be.addToRenderList(x,C),this.info.render.frame++,j===!0&&ie.beginShadows();const V=m.state.shadowsArray;ge.render(V,C,O),j===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=x.opaque,B=x.transmissive;if(m.setupLights(),O.isArrayCamera){const re=O.cameras;if(B.length>0)for(let ue=0,ve=re.length;ue<ve;ue++){const xe=re[ue];cm(G,B,C,xe)}nt&&be.render(C);for(let ue=0,ve=re.length;ue<ve;ue++){const xe=re[ue];lm(x,C,xe,xe.viewport)}}else B.length>0&&cm(G,B,C,O),nt&&be.render(C),lm(x,C,O);M!==null&&(b.updateMultisampleRenderTarget(M),b.updateRenderTargetMipmap(M)),C.isScene===!0&&C.onAfterRender(v,C,O),st.resetDefaultState(),R=-1,L=null,g.pop(),g.length>0?(m=g[g.length-1],j===!0&&ie.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function Nu(C,O,V,G){if(C.visible===!1)return;if(C.layers.test(O.layers)){if(C.isGroup)V=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(O);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ke.intersectsSprite(C)){G&&Ae.setFromMatrixPosition(C.matrixWorld).applyMatrix4(le);const ue=q.update(C),ve=C.material;ve.visible&&x.push(C,ue,ve,V,Ae.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||ke.intersectsObject(C))){const ue=q.update(C),ve=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ae.copy(C.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Ae.copy(ue.boundingSphere.center)),Ae.applyMatrix4(C.matrixWorld).applyMatrix4(le)),Array.isArray(ve)){const xe=ue.groups;for(let Te=0,Ce=xe.length;Te<Ce;Te++){const Me=xe[Te],Je=ve[Me.materialIndex];Je&&Je.visible&&x.push(C,ue,Je,V,Ae.z,Me)}}else ve.visible&&x.push(C,ue,ve,V,Ae.z,null)}}const re=C.children;for(let ue=0,ve=re.length;ue<ve;ue++)Nu(re[ue],O,V,G)}function lm(C,O,V,G){const B=C.opaque,re=C.transmissive,ue=C.transparent;m.setupLightsView(V),j===!0&&ie.setGlobalState(v.clippingPlanes,V),G&&Re.viewport(y.copy(G)),B.length>0&&Qa(B,O,V),re.length>0&&Qa(re,O,V),ue.length>0&&Qa(ue,O,V),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function cm(C,O,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[G.id]===void 0&&(m.state.transmissionRenderTarget[G.id]=new us(1,1,{generateMipmaps:!0,type:He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float")?Ka:ji,minFilter:es,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const re=m.state.transmissionRenderTarget[G.id],ue=G.viewport||y;re.setSize(ue.z,ue.w);const ve=v.getRenderTarget();v.setRenderTarget(re),v.getClearColor(N),z=v.getClearAlpha(),z<1&&v.setClearColor(16777215,.5),v.clear(),nt&&be.render(V);const xe=v.toneMapping;v.toneMapping=Ar;const Te=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),m.setupLightsView(G),j===!0&&ie.setGlobalState(v.clippingPlanes,G),Qa(C,V,G),b.updateMultisampleRenderTarget(re),b.updateRenderTargetMipmap(re),He.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let Me=0,Je=O.length;Me<Je;Me++){const lt=O[Me],vt=lt.object,wn=lt.geometry,Ze=lt.material,Ee=lt.group;if(Ze.side===Hn&&vt.layers.test(G.layers)){const Vt=Ze.side;Ze.side=cn,Ze.needsUpdate=!0,um(vt,V,G,wn,Ze,Ee),Ze.side=Vt,Ze.needsUpdate=!0,Ce=!0}}Ce===!0&&(b.updateMultisampleRenderTarget(re),b.updateRenderTargetMipmap(re))}v.setRenderTarget(ve),v.setClearColor(N,z),Te!==void 0&&(G.viewport=Te),v.toneMapping=xe}function Qa(C,O,V){const G=O.isScene===!0?O.overrideMaterial:null;for(let B=0,re=C.length;B<re;B++){const ue=C[B],ve=ue.object,xe=ue.geometry,Te=G===null?ue.material:G,Ce=ue.group;ve.layers.test(V.layers)&&um(ve,O,V,xe,Te,Ce)}}function um(C,O,V,G,B,re){C.onBeforeRender(v,O,V,G,B,re),C.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),B.onBeforeRender(v,O,V,G,C,re),B.transparent===!0&&B.side===Hn&&B.forceSinglePass===!1?(B.side=cn,B.needsUpdate=!0,v.renderBufferDirect(V,O,G,B,C,re),B.side=Mi,B.needsUpdate=!0,v.renderBufferDirect(V,O,G,B,C,re),B.side=Hn):v.renderBufferDirect(V,O,G,B,C,re),C.onAfterRender(v,O,V,G,B,re)}function Ja(C,O,V){O.isScene!==!0&&(O=Ge);const G=Le.get(C),B=m.state.lights,re=m.state.shadowsArray,ue=B.state.version,ve=Se.getParameters(C,B.state,re,O,V),xe=Se.getProgramCacheKey(ve);let Te=G.programs;G.environment=C.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(C.isMeshStandardMaterial?H:T).get(C.envMap||G.environment),G.envMapRotation=G.environment!==null&&C.envMap===null?O.environmentRotation:C.envMapRotation,Te===void 0&&(C.addEventListener("dispose",Xe),Te=new Map,G.programs=Te);let Ce=Te.get(xe);if(Ce!==void 0){if(G.currentProgram===Ce&&G.lightsStateVersion===ue)return hm(C,ve),Ce}else ve.uniforms=Se.getUniforms(C),C.onBeforeCompile(ve,v),Ce=Se.acquireProgram(ve,xe),Te.set(xe,Ce),G.uniforms=ve.uniforms;const Me=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Me.clippingPlanes=ie.uniform),hm(C,ve),G.needsLights=ny(C),G.lightsStateVersion=ue,G.needsLights&&(Me.ambientLightColor.value=B.state.ambient,Me.lightProbe.value=B.state.probe,Me.directionalLights.value=B.state.directional,Me.directionalLightShadows.value=B.state.directionalShadow,Me.spotLights.value=B.state.spot,Me.spotLightShadows.value=B.state.spotShadow,Me.rectAreaLights.value=B.state.rectArea,Me.ltc_1.value=B.state.rectAreaLTC1,Me.ltc_2.value=B.state.rectAreaLTC2,Me.pointLights.value=B.state.point,Me.pointLightShadows.value=B.state.pointShadow,Me.hemisphereLights.value=B.state.hemi,Me.directionalShadowMap.value=B.state.directionalShadowMap,Me.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Me.spotShadowMap.value=B.state.spotShadowMap,Me.spotLightMatrix.value=B.state.spotLightMatrix,Me.spotLightMap.value=B.state.spotLightMap,Me.pointShadowMap.value=B.state.pointShadowMap,Me.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=Ce,G.uniformsList=null,Ce}function fm(C){if(C.uniformsList===null){const O=C.currentProgram.getUniforms();C.uniformsList=Pc.seqWithValue(O.seq,C.uniforms)}return C.uniformsList}function hm(C,O){const V=Le.get(C);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function ey(C,O,V,G,B){O.isScene!==!0&&(O=Ge),b.resetTextureUnits();const re=O.fog,ue=G.isMeshStandardMaterial?O.environment:null,ve=M===null?v.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Nr,xe=(G.isMeshStandardMaterial?H:T).get(G.envMap||ue),Te=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ce=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Me=!!V.morphAttributes.position,Je=!!V.morphAttributes.normal,lt=!!V.morphAttributes.color;let vt=Ar;G.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(vt=v.toneMapping);const wn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ze=wn!==void 0?wn.length:0,Ee=Le.get(G),Vt=m.state.lights;if(j===!0&&(ne===!0||C!==L)){const Fn=C===L&&G.id===R;ie.setState(G,C,Fn)}let Qe=!1;G.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Vt.state.version||Ee.outputColorSpace!==ve||B.isBatchedMesh&&Ee.batching===!1||!B.isBatchedMesh&&Ee.batching===!0||B.isBatchedMesh&&Ee.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ee.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ee.instancing===!1||!B.isInstancedMesh&&Ee.instancing===!0||B.isSkinnedMesh&&Ee.skinning===!1||!B.isSkinnedMesh&&Ee.skinning===!0||B.isInstancedMesh&&Ee.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ee.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ee.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ee.instancingMorph===!1&&B.morphTexture!==null||Ee.envMap!==xe||G.fog===!0&&Ee.fog!==re||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ie.numPlanes||Ee.numIntersection!==ie.numIntersection)||Ee.vertexAlphas!==Te||Ee.vertexTangents!==Ce||Ee.morphTargets!==Me||Ee.morphNormals!==Je||Ee.morphColors!==lt||Ee.toneMapping!==vt||Ee.morphTargetsCount!==Ze)&&(Qe=!0):(Qe=!0,Ee.__version=G.version);let Zn=Ee.currentProgram;Qe===!0&&(Zn=Ja(G,O,B));let gs=!1,Tn=!1,Fu=!1;const Et=Zn.getUniforms(),qi=Ee.uniforms;if(Re.useProgram(Zn.program)&&(gs=!0,Tn=!0,Fu=!0),G.id!==R&&(R=G.id,Tn=!0),gs||L!==C){Ye.reverseDepthBuffer?(fe.copy(C.projectionMatrix),zE(fe),kE(fe),Et.setValue(I,"projectionMatrix",fe)):Et.setValue(I,"projectionMatrix",C.projectionMatrix),Et.setValue(I,"viewMatrix",C.matrixWorldInverse);const Fn=Et.map.cameraPosition;Fn!==void 0&&Fn.setValue(I,Ie.setFromMatrixPosition(C.matrixWorld)),Ye.logarithmicDepthBuffer&&Et.setValue(I,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Et.setValue(I,"isOrthographic",C.isOrthographicCamera===!0),L!==C&&(L=C,Tn=!0,Fu=!0)}if(B.isSkinnedMesh){Et.setOptional(I,B,"bindMatrix"),Et.setOptional(I,B,"bindMatrixInverse");const Fn=B.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Et.setValue(I,"boneTexture",Fn.boneTexture,b))}B.isBatchedMesh&&(Et.setOptional(I,B,"batchingTexture"),Et.setValue(I,"batchingTexture",B._matricesTexture,b),Et.setOptional(I,B,"batchingIdTexture"),Et.setValue(I,"batchingIdTexture",B._indirectTexture,b),Et.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&Et.setValue(I,"batchingColorTexture",B._colorsTexture,b));const Ou=V.morphAttributes;if((Ou.position!==void 0||Ou.normal!==void 0||Ou.color!==void 0)&&Pe.update(B,V,Zn),(Tn||Ee.receiveShadow!==B.receiveShadow)&&(Ee.receiveShadow=B.receiveShadow,Et.setValue(I,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(qi.envMap.value=xe,qi.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(qi.envMapIntensity.value=O.environmentIntensity),Tn&&(Et.setValue(I,"toneMappingExposure",v.toneMappingExposure),Ee.needsLights&&ty(qi,Fu),re&&G.fog===!0&&ae.refreshFogUniforms(qi,re),ae.refreshMaterialUniforms(qi,G,Y,k,m.state.transmissionRenderTarget[C.id]),Pc.upload(I,fm(Ee),qi,b)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Pc.upload(I,fm(Ee),qi,b),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Et.setValue(I,"center",B.center),Et.setValue(I,"modelViewMatrix",B.modelViewMatrix),Et.setValue(I,"normalMatrix",B.normalMatrix),Et.setValue(I,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Fn=G.uniformsGroups;for(let Bu=0,iy=Fn.length;Bu<iy;Bu++){const dm=Fn[Bu];F.update(dm,Zn),F.bind(dm,Zn)}}return Zn}function ty(C,O){C.ambientLightColor.needsUpdate=O,C.lightProbe.needsUpdate=O,C.directionalLights.needsUpdate=O,C.directionalLightShadows.needsUpdate=O,C.pointLights.needsUpdate=O,C.pointLightShadows.needsUpdate=O,C.spotLights.needsUpdate=O,C.spotLightShadows.needsUpdate=O,C.rectAreaLights.needsUpdate=O,C.hemisphereLights.needsUpdate=O}function ny(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(C,O,V){Le.get(C.texture).__webglTexture=O,Le.get(C.depthTexture).__webglTexture=V;const G=Le.get(C);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||He.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,O){const V=Le.get(C);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(C,O=0,V=0){M=C,A=O,w=V;let G=!0,B=null,re=!1,ue=!1;if(C){const xe=Le.get(C);if(xe.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(I.FRAMEBUFFER,null),G=!1;else if(xe.__webglFramebuffer===void 0)b.setupRenderTarget(C);else if(xe.__hasExternalTextures)b.rebindTextures(C,Le.get(C.texture).__webglTexture,Le.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Me=C.depthTexture;if(xe.__boundDepthTexture!==Me){if(Me!==null&&Le.has(Me)&&(C.width!==Me.image.width||C.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(C)}}const Te=C.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ue=!0);const Ce=Le.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ce[O])?B=Ce[O][V]:B=Ce[O],re=!0):C.samples>0&&b.useMultisampledRTT(C)===!1?B=Le.get(C).__webglMultisampledFramebuffer:Array.isArray(Ce)?B=Ce[V]:B=Ce,y.copy(C.viewport),E.copy(C.scissor),D=C.scissorTest}else y.copy(Q).multiplyScalar(Y).floor(),E.copy(se).multiplyScalar(Y).floor(),D=we;if(Re.bindFramebuffer(I.FRAMEBUFFER,B)&&G&&Re.drawBuffers(C,B),Re.viewport(y),Re.scissor(E),Re.setScissorTest(D),re){const xe=Le.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+O,xe.__webglTexture,V)}else if(ue){const xe=Le.get(C.texture),Te=O||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,xe.__webglTexture,V||0,Te)}R=-1},this.readRenderTargetPixels=function(C,O,V,G,B,re,ue){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Le.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ue!==void 0&&(ve=ve[ue]),ve){Re.bindFramebuffer(I.FRAMEBUFFER,ve);try{const xe=C.texture,Te=xe.format,Ce=xe.type;if(!Ye.textureFormatReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ye.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=C.width-G&&V>=0&&V<=C.height-B&&I.readPixels(O,V,G,B,Ue.convert(Te),Ue.convert(Ce),re)}finally{const xe=M!==null?Le.get(M).__webglFramebuffer:null;Re.bindFramebuffer(I.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(C,O,V,G,B,re,ue){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Le.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ue!==void 0&&(ve=ve[ue]),ve){const xe=C.texture,Te=xe.format,Ce=xe.type;if(!Ye.textureFormatReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ye.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=C.width-G&&V>=0&&V<=C.height-B){Re.bindFramebuffer(I.FRAMEBUFFER,ve);const Me=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Me),I.bufferData(I.PIXEL_PACK_BUFFER,re.byteLength,I.STREAM_READ),I.readPixels(O,V,G,B,Ue.convert(Te),Ue.convert(Ce),0);const Je=M!==null?Le.get(M).__webglFramebuffer:null;Re.bindFramebuffer(I.FRAMEBUFFER,Je);const lt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await BE(I,lt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Me),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,re),I.deleteBuffer(Me),I.deleteSync(lt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,O=null,V=0){C.isTexture!==!0&&(bc("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,C=arguments[1]);const G=Math.pow(2,-V),B=Math.floor(C.image.width*G),re=Math.floor(C.image.height*G),ue=O!==null?O.x:0,ve=O!==null?O.y:0;b.setTexture2D(C,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,ue,ve,B,re),Re.unbindTexture()},this.copyTextureToTexture=function(C,O,V=null,G=null,B=0){C.isTexture!==!0&&(bc("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,C=arguments[1],O=arguments[2],B=arguments[3]||0,V=null);let re,ue,ve,xe,Te,Ce;V!==null?(re=V.max.x-V.min.x,ue=V.max.y-V.min.y,ve=V.min.x,xe=V.min.y):(re=C.image.width,ue=C.image.height,ve=0,xe=0),G!==null?(Te=G.x,Ce=G.y):(Te=0,Ce=0);const Me=Ue.convert(O.format),Je=Ue.convert(O.type);b.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const lt=I.getParameter(I.UNPACK_ROW_LENGTH),vt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),wn=I.getParameter(I.UNPACK_SKIP_PIXELS),Ze=I.getParameter(I.UNPACK_SKIP_ROWS),Ee=I.getParameter(I.UNPACK_SKIP_IMAGES),Vt=C.isCompressedTexture?C.mipmaps[B]:C.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ve),I.pixelStorei(I.UNPACK_SKIP_ROWS,xe),C.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,B,Te,Ce,re,ue,Me,Je,Vt.data):C.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,B,Te,Ce,Vt.width,Vt.height,Me,Vt.data):I.texSubImage2D(I.TEXTURE_2D,B,Te,Ce,re,ue,Me,Je,Vt),I.pixelStorei(I.UNPACK_ROW_LENGTH,lt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,vt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,wn),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ze),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ee),B===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),Re.unbindTexture()},this.copyTextureToTexture3D=function(C,O,V=null,G=null,B=0){C.isTexture!==!0&&(bc("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,C=arguments[2],O=arguments[3],B=arguments[4]||0);let re,ue,ve,xe,Te,Ce,Me,Je,lt;const vt=C.isCompressedTexture?C.mipmaps[B]:C.image;V!==null?(re=V.max.x-V.min.x,ue=V.max.y-V.min.y,ve=V.max.z-V.min.z,xe=V.min.x,Te=V.min.y,Ce=V.min.z):(re=vt.width,ue=vt.height,ve=vt.depth,xe=0,Te=0,Ce=0),G!==null?(Me=G.x,Je=G.y,lt=G.z):(Me=0,Je=0,lt=0);const wn=Ue.convert(O.format),Ze=Ue.convert(O.type);let Ee;if(O.isData3DTexture)b.setTexture3D(O,0),Ee=I.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)b.setTexture2DArray(O,0),Ee=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment);const Vt=I.getParameter(I.UNPACK_ROW_LENGTH),Qe=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Zn=I.getParameter(I.UNPACK_SKIP_PIXELS),gs=I.getParameter(I.UNPACK_SKIP_ROWS),Tn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Te),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ce),C.isDataTexture||C.isData3DTexture?I.texSubImage3D(Ee,B,Me,Je,lt,re,ue,ve,wn,Ze,vt.data):O.isCompressedArrayTexture?I.compressedTexSubImage3D(Ee,B,Me,Je,lt,re,ue,ve,wn,vt.data):I.texSubImage3D(Ee,B,Me,Je,lt,re,ue,ve,wn,Ze,vt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Vt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Qe),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Zn),I.pixelStorei(I.UNPACK_SKIP_ROWS,gs),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Tn),B===0&&O.generateMipmaps&&I.generateMipmap(Ee),Re.unbindTexture()},this.initRenderTarget=function(C){Le.get(C).__webglFramebuffer===void 0&&b.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?b.setTextureCube(C,0):C.isData3DTexture?b.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?b.setTexture2DArray(C,0):b.setTexture2D(C,0),Re.unbindTexture()},this.resetState=function(){A=0,w=0,M=null,Re.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Qp?"display-p3":"srgb",n.unpackColorSpace=Ke.workingColorSpace===Pu?"display-p3":"srgb"}}class nm{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=n,this.far=i}clone(){return new nm(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ZC extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class QC{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=zd,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new P;class au{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)sn.fromBufferAttribute(this,n),sn.applyMatrix4(e),this.setXYZ(n,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)sn.fromBufferAttribute(this,n),sn.applyNormalMatrix(e),this.setXYZ(n,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)sn.fromBufferAttribute(this,n),sn.transformDirection(e),this.setXYZ(n,sn.x,sn.y,sn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=et(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=et(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=li(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=li(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=li(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=li(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=et(n,this.array),i=et(i,this.array),r=et(r,this.array),s=et(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Ft(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new au(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gx extends ms{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ds;const qo=new P,Is=new P,Us=new P,Ns=new ye,Ko=new ye,Wx=new Be,Bl=new P,Zo=new P,zl=new P,__=new ye,Hf=new ye,v_=new ye;class JC extends Nt{constructor(e=new Gx){if(super(),this.isSprite=!0,this.type="Sprite",Ds===void 0){Ds=new Dt;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new QC(n,5);Ds.setIndex([0,1,2,0,2,3]),Ds.setAttribute("position",new au(i,3,0,!1)),Ds.setAttribute("uv",new au(i,2,3,!1))}this.geometry=Ds,this.material=e,this.center=new ye(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),Wx.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Us.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Us.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;kl(Bl.set(-.5,-.5,0),Us,o,Is,r,s),kl(Zo.set(.5,-.5,0),Us,o,Is,r,s),kl(zl.set(.5,.5,0),Us,o,Is,r,s),__.set(0,0),Hf.set(1,0),v_.set(1,1);let a=e.ray.intersectTriangle(Bl,Zo,zl,!1,qo);if(a===null&&(kl(Zo.set(-.5,.5,0),Us,o,Is,r,s),Hf.set(0,1),a=e.ray.intersectTriangle(Bl,zl,Zo,!1,qo),a===null))return;const l=e.ray.origin.distanceTo(qo);l<e.near||l>e.far||n.push({distance:l,point:qo.clone(),uv:It.getInterpolation(qo,Bl,Zo,zl,__,Hf,v_,new ye),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function kl(t,e,n,i,r,s){Ns.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(Ko.x=s*Ns.x-r*Ns.y,Ko.y=r*Ns.x+s*Ns.y):Ko.copy(Ns),t.copy(e),t.x+=Ko.x,t.y+=Ko.y,t.applyMatrix4(Wx)}class Vf extends nn{constructor(e=null,n=1,i=1,r,s,o,a,l,c=xn,u=xn,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}function eR(t,e){return t.z-e.z}function tR(t,e){return e.z-t.z}class nR{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,n,i){const r=this.pool,s=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});const o=r[this.index];s.push(o),this.index++,o.start=e.start,o.count=e.count,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}}const ir=new Be,Gf=new Be,iR=new Be,rR=new Oe(1,1,1),x_=new Be,Wf=new Lu,Hl=new bt,Gr=new Si,Qo=new P,y_=new P,sR=new P,Xf=new nR,en=new rt,Vl=[];function oR(t,e,n=0){const i=e.itemSize;if(t.isInterleavedBufferAttribute||t.array.constructor!==e.array.constructor){const r=t.count;for(let s=0;s<r;s++)for(let o=0;o<i;o++)e.setComponent(s+n,o,t.getComponent(s,o))}else e.array.set(t.array,n*i);e.needsUpdate=!0}let aR=class extends rt{get maxInstanceCount(){return this._maxInstanceCount}constructor(e,n,i=n*2,r){super(new Dt,r),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawInfo=[],this._availableInstanceIds=[],this._drawRanges=[],this._reservedRanges=[],this._bounds=[],this._maxInstanceCount=e,this._maxVertexCount=n,this._maxIndexCount=i,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._visibilityChanged=!0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const n=new Float32Array(e*e*4),i=new Vf(n,e,e,Pn,ci);this._matricesTexture=i}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const n=new Uint32Array(e*e),i=new Vf(n,e,e,bu,br);this._indirectTexture=i}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const n=new Float32Array(e*e*4).fill(1),i=new Vf(n,e,e,Pn,ci);i.colorSpace=Ke.workingColorSpace,this._colorsTexture=i}_initializeGeometry(e){const n=this.geometry,i=this._maxVertexCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const o=e.getAttribute(s),{array:a,itemSize:l,normalized:c}=o,u=new a.constructor(i*l),h=new Ft(u,l,c);n.setAttribute(s,h)}if(e.getIndex()!==null){const s=i>65535?new Uint32Array(r):new Uint16Array(r);n.setIndex(new Ft(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const n=this.geometry;if(!!e.getIndex()!=!!n.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const i in n.attributes){if(!e.hasAttribute(i))throw new Error(`BatchedMesh: Added geometry missing "${i}". All geometries must have consistent attributes.`);const r=e.getAttribute(i),s=n.getAttribute(i);if(r.itemSize!==s.itemSize||r.normalized!==s.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bt);const e=this.boundingBox,n=this._drawInfo;e.makeEmpty();for(let i=0,r=n.length;i<r;i++){if(n[i].active===!1)continue;const s=n[i].geometryIndex;this.getMatrixAt(i,ir),this.getBoundingBoxAt(s,Hl).applyMatrix4(ir),e.union(Hl)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);const e=this.boundingSphere,n=this._drawInfo;e.makeEmpty();for(let i=0,r=n.length;i<r;i++){if(n[i].active===!1)continue;const s=n[i].geometryIndex;this.getMatrixAt(i,ir),this.getBoundingSphereAt(s,Gr).applyMatrix4(ir),e.union(Gr)}}addInstance(e){if(this._drawInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("BatchedMesh: Maximum item count reached.");const i={visible:!0,active:!0,geometryIndex:e};let r=null;this._availableInstanceIds.length>0?(r=this._availableInstanceIds.pop(),this._drawInfo[r]=i):(r=this._drawInfo.length,this._drawInfo.push(i));const s=this._matricesTexture,o=s.image.data;iR.toArray(o,r*16),s.needsUpdate=!0;const a=this._colorsTexture;return a&&(rR.toArray(a.image.data,r*4),a.needsUpdate=!0),r}addGeometry(e,n=-1,i=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._drawInfo.length>=this._maxInstanceCount)throw new Error("BatchedMesh: Maximum item count reached.");const r={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1};let s=null;const o=this._reservedRanges,a=this._drawRanges,l=this._bounds;this._geometryCount!==0&&(s=o[o.length-1]),n===-1?r.vertexCount=e.getAttribute("position").count:r.vertexCount=n,s===null?r.vertexStart=0:r.vertexStart=s.vertexStart+s.vertexCount;const c=e.getIndex(),u=c!==null;if(u&&(i===-1?r.indexCount=c.count:r.indexCount=i,s===null?r.indexStart=0:r.indexStart=s.indexStart+s.indexCount),r.indexStart!==-1&&r.indexStart+r.indexCount>this._maxIndexCount||r.vertexStart+r.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");const h=this._geometryCount;return this._geometryCount++,o.push(r),a.push({start:u?r.indexStart:r.vertexStart,count:-1}),l.push({boxInitialized:!1,box:new bt,sphereInitialized:!1,sphere:new Si}),this.setGeometryAt(h,e),h}setGeometryAt(e,n){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(n);const i=this.geometry,r=i.getIndex()!==null,s=i.getIndex(),o=n.getIndex(),a=this._reservedRanges[e];if(r&&o.count>a.indexCount||n.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const l=a.vertexStart,c=a.vertexCount;for(const p in i.attributes){const _=n.getAttribute(p),x=i.getAttribute(p);oR(_,x,l);const m=_.itemSize;for(let d=_.count,g=c;d<g;d++){const v=l+d;for(let S=0;S<m;S++)x.setComponent(v,S,0)}x.needsUpdate=!0,x.addUpdateRange(l*m,c*m)}if(r){const p=a.indexStart;for(let _=0;_<o.count;_++)s.setX(p+_,l+o.getX(_));for(let _=o.count,x=a.indexCount;_<x;_++)s.setX(p+_,l);s.needsUpdate=!0,s.addUpdateRange(p,a.indexCount)}const u=this._bounds[e];n.boundingBox!==null?(u.box.copy(n.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,n.boundingSphere!==null?(u.sphere.copy(n.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;const h=this._drawRanges[e],f=n.getAttribute("position");return h.count=r?o.count:f.count,this._visibilityChanged=!0,e}deleteInstance(e){const n=this._drawInfo;return e>=n.length||n[e].active===!1?this:(n[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this)}getBoundingBoxAt(e,n){if(e>=this._geometryCount)return null;const i=this._bounds[e],r=i.box,s=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();const o=s.index,a=s.attributes.position,l=this._drawRanges[e];for(let c=l.start,u=l.start+l.count;c<u;c++){let h=c;o&&(h=o.getX(h)),r.expandByPoint(Qo.fromBufferAttribute(a,h))}i.boxInitialized=!0}return n.copy(r),n}getBoundingSphereAt(e,n){if(e>=this._geometryCount)return null;const i=this._bounds[e],r=i.sphere,s=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,Hl),Hl.getCenter(r.center);const o=s.index,a=s.attributes.position,l=this._drawRanges[e];let c=0;for(let u=l.start,h=l.start+l.count;u<h;u++){let f=u;o&&(f=o.getX(f)),Qo.fromBufferAttribute(a,f),c=Math.max(c,r.center.distanceToSquared(Qo))}r.radius=Math.sqrt(c),i.sphereInitialized=!0}return n.copy(r),n}setMatrixAt(e,n){const i=this._drawInfo,r=this._matricesTexture,s=this._matricesTexture.image.data;return e>=i.length||i[e].active===!1?this:(n.toArray(s,e*16),r.needsUpdate=!0,this)}getMatrixAt(e,n){const i=this._drawInfo,r=this._matricesTexture.image.data;return e>=i.length||i[e].active===!1?null:n.fromArray(r,e*16)}setColorAt(e,n){this._colorsTexture===null&&this._initColorsTexture();const i=this._colorsTexture,r=this._colorsTexture.image.data,s=this._drawInfo;return e>=s.length||s[e].active===!1?this:(n.toArray(r,e*4),i.needsUpdate=!0,this)}getColorAt(e,n){const i=this._colorsTexture.image.data,r=this._drawInfo;return e>=r.length||r[e].active===!1?null:n.fromArray(i,e*4)}setVisibleAt(e,n){const i=this._drawInfo;return e>=i.length||i[e].active===!1||i[e].visible===n?this:(i[e].visible=n,this._visibilityChanged=!0,this)}getVisibleAt(e){const n=this._drawInfo;return e>=n.length||n[e].active===!1?!1:n[e].visible}setGeometryIdAt(e,n){const i=this._drawInfo;return e>=i.length||i[e].active===!1||n<0||n>=this._geometryCount?null:(i[e].geometryIndex=n,this)}getGeometryIdAt(e){const n=this._drawInfo;return e>=n.length||n[e].active===!1?-1:n[e].geometryIndex}getGeometryRangeAt(e,n={}){if(e<0||e>=this._geometryCount)return null;const i=this._drawRanges[e];return n.start=i.start,n.count=i.count,n}raycast(e,n){const i=this._drawInfo,r=this._drawRanges,s=this.matrixWorld,o=this.geometry;en.material=this.material,en.geometry.index=o.index,en.geometry.attributes=o.attributes,en.geometry.boundingBox===null&&(en.geometry.boundingBox=new bt),en.geometry.boundingSphere===null&&(en.geometry.boundingSphere=new Si);for(let a=0,l=i.length;a<l;a++){if(!i[a].visible||!i[a].active)continue;const c=i[a].geometryIndex,u=r[c];en.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,en.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,en.geometry.boundingBox),this.getBoundingSphereAt(c,en.geometry.boundingSphere),en.raycast(e,Vl);for(let h=0,f=Vl.length;h<f;h++){const p=Vl[h];p.object=this,p.batchId=a,n.push(p)}Vl.length=0}en.material=null,en.geometry.index=null,en.geometry.attributes={},en.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(n=>({...n})),this._reservedRanges=e._reservedRanges.map(n=>({...n})),this._drawInfo=e._drawInfo.map(n=>({...n})),this._bounds=e._bounds.map(n=>({boxInitialized:n.boxInitialized,box:n.box.clone(),sphereInitialized:n.sphereInitialized,sphere:n.sphere.clone()})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(e,n,i,r,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=r.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=this._drawInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data;f&&(x_.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse).multiply(this.matrixWorld),Wf.setFromProjectionMatrix(x_,e.coordinateSystem));let x=0;if(this.sortObjects){Gf.copy(this.matrixWorld).invert(),Qo.setFromMatrixPosition(i.matrixWorld).applyMatrix4(Gf),y_.set(0,0,-1).transformDirection(i.matrixWorld).transformDirection(Gf);for(let g=0,v=l.length;g<v;g++)if(l[g].visible&&l[g].active){const S=l[g].geometryIndex;this.getMatrixAt(g,ir),this.getBoundingSphereAt(S,Gr).applyMatrix4(ir);let A=!1;if(f&&(A=!Wf.intersectsSphere(Gr)),!A){const w=sR.subVectors(Gr.center,Qo).dot(y_);Xf.push(h[S],w,g)}}const m=Xf.list,d=this.customSort;d===null?m.sort(s.transparent?tR:eR):d.call(this,m,i);for(let g=0,v=m.length;g<v;g++){const S=m[g];c[x]=S.start*a,u[x]=S.count,_[x]=S.index,x++}Xf.reset()}else for(let m=0,d=l.length;m<d;m++)if(l[m].visible&&l[m].active){const g=l[m].geometryIndex;let v=!1;if(f&&(this.getMatrixAt(m,ir),this.getBoundingSphereAt(g,Gr).applyMatrix4(ir),v=!Wf.intersectsSphere(Gr)),!v){const S=h[g];c[x]=S.start*a,u[x]=S.count,_[x]=m,x++}}p.needsUpdate=!0,this._multiDrawCount=x,this._visibilityChanged=!1}onBeforeShadow(e,n,i,r,s,o){this.onBeforeRender(e,null,r,s,o)}};class ns extends ms{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const lu=new P,cu=new P,S_=new Be,Jo=new Za,Gl=new Si,jf=new P,M_=new P;class Yr extends Nt{constructor(e=new Dt,n=new ns){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)lu.fromBufferAttribute(n,r-1),cu.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=lu.distanceTo(cu);e.setAttribute("lineDistance",new $n(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gl.copy(i.boundingSphere),Gl.applyMatrix4(r),Gl.radius+=s,e.ray.intersectsSphere(Gl)===!1)return;S_.copy(r).invert(),Jo.copy(e.ray).applyMatrix4(S_);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=c){const d=u.getX(x),g=u.getX(x+1),v=Wl(this,e,Jo,l,d,g);v&&n.push(v)}if(this.isLineLoop){const x=u.getX(_-1),m=u.getX(p),d=Wl(this,e,Jo,l,x,m);d&&n.push(d)}}else{const p=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let x=p,m=_-1;x<m;x+=c){const d=Wl(this,e,Jo,l,x,x+1);d&&n.push(d)}if(this.isLineLoop){const x=Wl(this,e,Jo,l,_-1,p);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Wl(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(lu.fromBufferAttribute(o,r),cu.fromBufferAttribute(o,s),n.distanceSqToSegment(lu,cu,jf,M_)>i)return;jf.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(jf);if(!(l<e.near||l>e.far))return{distance:l,point:M_.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const E_=new P,w_=new P;class Xx extends Yr{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)E_.fromBufferAttribute(n,r),w_.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+E_.distanceTo(w_);e.setAttribute("lineDistance",new $n(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lR extends nn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}const Xl=new P,jl=new P,Yf=new P,Yl=new It;class cR extends Dt{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(go*n),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),f={},p=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:x,b:m,c:d}=Yl;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),Yl.getNormal(Yf),h[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,h[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,h[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let g=0;g<3;g++){const v=(g+1)%3,S=h[g],A=h[v],w=Yl[u[g]],M=Yl[u[v]],R=`${S}_${A}`,L=`${A}_${S}`;L in f&&f[L]?(Yf.dot(f[L].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(M.x,M.y,M.z)),f[L]=null):R in f||(f[R]={index0:c[g],index1:c[v],normal:Yf.clone()})}}for(const _ in f)if(f[_]){const{index0:x,index1:m}=f[_];Xl.fromBufferAttribute(a,x),jl.fromBufferAttribute(a,m),p.push(Xl.x,Xl.y,Xl.z),p.push(jl.x,jl.y,jl.z)}this.setAttribute("position",new $n(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class rr extends ms{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tx,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=jp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class uR extends ns{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}class jx extends Nt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class fR extends jx{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const $f=new Be,T_=new P,A_=new P;class hR{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lu,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;T_.setFromMatrixPosition(e.matrixWorld),n.position.copy(T_),A_.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(A_),n.updateMatrixWorld(),$f.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($f),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply($f)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class dR extends hR{constructor(){super(new Ox(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pR extends jx{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new dR}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mR{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=C_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=C_();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function C_(){return performance.now()}const R_=new Be;class gR{constructor(e,n,i=0,r=1/0){this.ray=new Za(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new em,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return R_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(R_),this}intersectObject(e,n=!0,i=[]){return Hd(e,this,i,n),i.sort(b_),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Hd(e[r],this,i,n);return i.sort(b_),i}}function b_(t,e){return t.distance-e.distance}function Hd(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let o=0,a=s.length;o<a;o++)Hd(s[o],e,n,!0)}}class P_{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Yt(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const L_=new P,$l=new P;class Hi{constructor(e=new P,n=new P){this.start=e,this.end=n}set(e,n){return this.start.copy(e),this.end.copy(n),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,n){return this.delta(n).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,n){L_.subVectors(e,this.start),$l.subVectors(this.end,this.start);const i=$l.dot($l);let s=$l.dot(L_)/i;return n&&(s=Yt(s,0,1)),s}closestPointToPoint(e,n,i){const r=this.closestPointToPointParameter(e,n);return this.delta(i).multiplyScalar(r).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class _R extends Xx{constructor(e=10,n=10,i=4473924,r=8947848){i=new Oe(i),r=new Oe(r);const s=n/2,o=e/n,a=e/2,l=[],c=[];for(let f=0,p=0,_=-a;f<=n;f++,_+=o){l.push(-a,0,_,a,0,_),l.push(_,0,-a,_,0,a);const x=f===s?i:r;x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3,x.toArray(c,p),p+=3}const u=new Dt;u.setAttribute("position",new $n(l,3)),u.setAttribute("color",new $n(c,3));const h=new ns({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class vR extends ps{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xp);const D_={type:"change"},im={type:"start"},Yx={type:"end"},ql=new Za,I_=new oi,xR=Math.cos(70*or.DEG2RAD),Pt=new P,mn=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qf=1e-6;class yR extends vR{constructor(e,n=null){super(e,n),this.state=it.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:ro.ROTATE,TWO:ro.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new fs,this._lastTargetPosition=new P,this._quat=new fs().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new P_,this._sphericalDelta=new P_,this._scale=1,this._panOffset=new P,this._rotateStart=new ye,this._rotateEnd=new ye,this._rotateDelta=new ye,this._panStart=new ye,this._panEnd=new ye,this._panDelta=new ye,this._dollyStart=new ye,this._dollyEnd=new ye,this._dollyDelta=new ye,this._dollyDirection=new P,this._mouse=new ye,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=MR.bind(this),this._onPointerDown=SR.bind(this),this._onPointerUp=ER.bind(this),this._onContextMenu=PR.bind(this),this._onMouseWheel=AR.bind(this),this._onKeyDown=CR.bind(this),this._onTouchStart=RR.bind(this),this._onTouchMove=bR.bind(this),this._onMouseDown=wR.bind(this),this._onMouseMove=TR.bind(this),this._interceptControlDown=LR.bind(this),this._interceptControlUp=DR.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(D_),this.update(),this.state=it.NONE}update(e=null){const n=this.object.position;Pt.copy(n).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=mn:i>Math.PI&&(i-=mn),r<-Math.PI?r+=mn:r>Math.PI&&(r-=mn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),n.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Pt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ql.origin.copy(this.object.position),ql.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ql.direction))<xR?this.object.lookAt(this.target):(I_.setFromNormalAndCoplanarPoint(this.object.up,this.target),ql.intersectPlane(I_,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>qf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qf||this._lastTargetPosition.distanceToSquared(this.target)>qf?(this.dispatchEvent(D_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?mn/60*this.autoRotateSpeed*e:mn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Pt.setFromMatrixColumn(n,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,n){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(n,1):(Pt.setFromMatrixColumn(n,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Pt.copy(r).sub(this.target);let s=Pt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(mn*this._rotateDelta.x/n.clientHeight),this._rotateUp(mn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-mn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(mn*this._rotateDelta.x/n.clientHeight),this._rotateUp(mn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new ye,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function SR(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function MR(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function ER(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yx),this.state=it.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function wR(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=it.DOLLY;break;case zi.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=it.ROTATE}break;case zi.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(im)}function TR(t){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function AR(t){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(t.preventDefault(),this.dispatchEvent(im),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Yx))}function CR(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function RR(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case ro.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=it.TOUCH_ROTATE;break;case ro.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case ro.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=it.TOUCH_DOLLY_PAN;break;case ro.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(im)}function bR(t){switch(this._trackPointer(t),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=it.NONE}}function PR(t){this.enabled!==!1&&t.preventDefault()}function LR(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function DR(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function U_(t,e=!1){const n=t[0].index!==null,i=new Set(Object.keys(t[0].attributes)),r=new Set(Object.keys(t[0].morphAttributes)),s={},o={},a=t[0].morphTargetsRelative,l=new Dt;let c=0;for(let u=0;u<t.length;++u){const h=t[u];let f=0;if(n!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(h.morphAttributes[p])}if(e){let p;if(n)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(n){let u=0;const h=[];for(let f=0;f<t.length;++f){const p=t[f].index;for(let _=0;_<p.count;++_)h.push(p.getX(_)+u);u+=t[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=N_(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const p=[];for(let x=0;x<o[u].length;++x)p.push(o[u][x][f]);const _=N_(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(_)}}return l}function N_(t){let e,n,i,r=-1,s=0;for(let c=0;c<t.length;++c){const u=t[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=u.itemSize),n!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*n}const o=new e(s),a=new Ft(o,n,i);let l=0;for(let c=0;c<t.length;++c){const u=t[c];if(u.isInterleavedBufferAttribute){const h=l/n;for(let f=0,p=u.count;f<p;f++)for(let _=0;_<n;_++){const x=u.getComponent(f,_);a.setComponent(f+h,_,x)}}else o.set(u.array,l);l+=u.count*n}return r!==void 0&&(a.gpuType=r),a}const $x=0,IR=1,UR=2,F_=2,Kf=1.25,O_=1,wa=6*4+4+4,Iu=65535,NR=Math.pow(2,-24),Zf=Symbol("SKIP_GENERATION");function FR(t){return t.index?t.index.count:t.attributes.position.count}function No(t){return FR(t)/3}function OR(t,e=ArrayBuffer){return t>65535?new Uint32Array(new e(4*t)):new Uint16Array(new e(2*t))}function BR(t,e){if(!t.index){const n=t.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=OR(n,i);t.setIndex(new Ft(r,1));for(let s=0;s<n;s++)r[s]=s}}function qx(t,e){const n=No(t),i=e||t.drawRange,r=i.start/3,s=(i.start+i.count)/3,o=Math.max(0,r),a=Math.min(n,s)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function Kx(t,e){if(!t.groups||!t.groups.length)return qx(t,e);const n=[],i=new Set,r=e||t.drawRange,s=r.start/3,o=(r.start+r.count)/3;for(const l of t.groups){const c=l.start/3,u=(l.start+l.count)/3;i.add(Math.max(s,c)),i.add(Math.min(o,u))}const a=Array.from(i.values()).sort((l,c)=>l-c);for(let l=0;l<a.length-1;l++){const c=a[l],u=a[l+1];n.push({offset:Math.floor(c),count:Math.floor(u-c)})}return n}function zR(t,e){const n=No(t),i=Kx(t,e).sort((o,a)=>o.offset-a.offset),r=i[i.length-1];r.count=Math.min(n-r.offset,r.count);let s=0;return i.forEach(({count:o})=>s+=o),n!==s}function Qf(t,e,n,i,r){let s=1/0,o=1/0,a=1/0,l=-1/0,c=-1/0,u=-1/0,h=1/0,f=1/0,p=1/0,_=-1/0,x=-1/0,m=-1/0;for(let d=e*6,g=(e+n)*6;d<g;d+=6){const v=t[d+0],S=t[d+1],A=v-S,w=v+S;A<s&&(s=A),w>l&&(l=w),v<h&&(h=v),v>_&&(_=v);const M=t[d+2],R=t[d+3],L=M-R,y=M+R;L<o&&(o=L),y>c&&(c=y),M<f&&(f=M),M>x&&(x=M);const E=t[d+4],D=t[d+5],N=E-D,z=E+D;N<a&&(a=N),z>u&&(u=z),E<p&&(p=E),E>m&&(m=E)}i[0]=s,i[1]=o,i[2]=a,i[3]=l,i[4]=c,i[5]=u,r[0]=h,r[1]=f,r[2]=p,r[3]=_,r[4]=x,r[5]=m}function kR(t,e=null,n=null,i=null){const r=t.attributes.position,s=t.index?t.index.array:null,o=No(t),a=r.normalized;let l;e===null?(l=new Float32Array(o*6*4),n=0,i=o):(l=e,n=n||0,i=i||o);const c=r.array,u=r.offset||0;let h=3;r.isInterleavedBufferAttribute&&(h=r.data.stride);const f=["getX","getY","getZ"];for(let p=n;p<n+i;p++){const _=p*3,x=p*6;let m=_+0,d=_+1,g=_+2;s&&(m=s[m],d=s[d],g=s[g]),a||(m=m*h+u,d=d*h+u,g=g*h+u);for(let v=0;v<3;v++){let S,A,w;a?(S=r[f[v]](m),A=r[f[v]](d),w=r[f[v]](g)):(S=c[m+v],A=c[d+v],w=c[g+v]);let M=S;A<M&&(M=A),w<M&&(M=w);let R=S;A>R&&(R=A),w>R&&(R=w);const L=(R-M)/2,y=v*2;l[x+y+0]=M+L,l[x+y+1]=L+(Math.abs(M)+L)*NR}}return l}function St(t,e,n){return n.min.x=e[t],n.min.y=e[t+1],n.min.z=e[t+2],n.max.x=e[t+3],n.max.y=e[t+4],n.max.z=e[t+5],n}function B_(t){let e=-1,n=-1/0;for(let i=0;i<3;i++){const r=t[i+3]-t[i];r>n&&(n=r,e=i)}return e}function z_(t,e){e.set(t)}function k_(t,e,n){let i,r;for(let s=0;s<3;s++){const o=s+3;i=t[s],r=e[s],n[s]=i<r?i:r,i=t[o],r=e[o],n[o]=i>r?i:r}}function Kl(t,e,n){for(let i=0;i<3;i++){const r=e[t+2*i],s=e[t+2*i+1],o=r-s,a=r+s;o<n[i]&&(n[i]=o),a>n[i+3]&&(n[i+3]=a)}}function ea(t){const e=t[3]-t[0],n=t[4]-t[1],i=t[5]-t[2];return 2*(e*n+n*i+i*e)}const Di=32,HR=(t,e)=>t.candidate-e.candidate,sr=new Array(Di).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Zl=new Float32Array(6);function VR(t,e,n,i,r,s){let o=-1,a=0;if(s===$x)o=B_(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(s===IR)o=B_(t),o!==-1&&(a=GR(n,i,r,o));else if(s===UR){const l=ea(t);let c=Kf*r;const u=i*6,h=(i+r)*6;for(let f=0;f<3;f++){const p=e[f],m=(e[f+3]-p)/Di;if(r<Di/4){const d=[...sr];d.length=r;let g=0;for(let S=u;S<h;S+=6,g++){const A=d[g];A.candidate=n[S+2*f],A.count=0;const{bounds:w,leftCacheBounds:M,rightCacheBounds:R}=A;for(let L=0;L<3;L++)R[L]=1/0,R[L+3]=-1/0,M[L]=1/0,M[L+3]=-1/0,w[L]=1/0,w[L+3]=-1/0;Kl(S,n,w)}d.sort(HR);let v=r;for(let S=0;S<v;S++){const A=d[S];for(;S+1<v&&d[S+1].candidate===A.candidate;)d.splice(S+1,1),v--}for(let S=u;S<h;S+=6){const A=n[S+2*f];for(let w=0;w<v;w++){const M=d[w];A>=M.candidate?Kl(S,n,M.rightCacheBounds):(Kl(S,n,M.leftCacheBounds),M.count++)}}for(let S=0;S<v;S++){const A=d[S],w=A.count,M=r-A.count,R=A.leftCacheBounds,L=A.rightCacheBounds;let y=0;w!==0&&(y=ea(R)/l);let E=0;M!==0&&(E=ea(L)/l);const D=O_+Kf*(y*w+E*M);D<c&&(o=f,c=D,a=A.candidate)}}else{for(let v=0;v<Di;v++){const S=sr[v];S.count=0,S.candidate=p+m+v*m;const A=S.bounds;for(let w=0;w<3;w++)A[w]=1/0,A[w+3]=-1/0}for(let v=u;v<h;v+=6){let w=~~((n[v+2*f]-p)/m);w>=Di&&(w=Di-1);const M=sr[w];M.count++,Kl(v,n,M.bounds)}const d=sr[Di-1];z_(d.bounds,d.rightCacheBounds);for(let v=Di-2;v>=0;v--){const S=sr[v],A=sr[v+1];k_(S.bounds,A.rightCacheBounds,S.rightCacheBounds)}let g=0;for(let v=0;v<Di-1;v++){const S=sr[v],A=S.count,w=S.bounds,R=sr[v+1].rightCacheBounds;A!==0&&(g===0?z_(w,Zl):k_(w,Zl,Zl)),g+=A;let L=0,y=0;g!==0&&(L=ea(Zl)/l);const E=r-g;E!==0&&(y=ea(R)/l);const D=O_+Kf*(L*g+y*E);D<c&&(o=f,c=D,a=S.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${s} used.`);return{axis:o,pos:a}}function GR(t,e,n,i){let r=0;for(let s=e,o=e+n;s<o;s++)r+=t[s*6+i*2];return r/n}class Jf{constructor(){this.boundingData=new Float32Array(6)}}function WR(t,e,n,i,r,s){let o=i,a=i+r-1;const l=s.pos,c=s.axis*2;for(;;){for(;o<=a&&n[o*6+c]<l;)o++;for(;o<=a&&n[a*6+c]>=l;)a--;if(o<a){for(let u=0;u<3;u++){let h=e[o*3+u];e[o*3+u]=e[a*3+u],e[a*3+u]=h}for(let u=0;u<6;u++){let h=n[o*6+u];n[o*6+u]=n[a*6+u],n[a*6+u]=h}o++,a--}else return o}}function XR(t,e,n,i,r,s){let o=i,a=i+r-1;const l=s.pos,c=s.axis*2;for(;;){for(;o<=a&&n[o*6+c]<l;)o++;for(;o<=a&&n[a*6+c]>=l;)a--;if(o<a){let u=t[o];t[o]=t[a],t[a]=u;for(let h=0;h<6;h++){let f=n[o*6+h];n[o*6+h]=n[a*6+h],n[a*6+h]=f}o++,a--}else return o}}function _n(t,e){return e[t+15]===65535}function Ln(t,e){return e[t+6]}function Gn(t,e){return e[t+14]}function Wn(t){return t+8}function Xn(t,e){return e[t+6]}function Zx(t,e){return e[t+7]}let Qx,fa,Lc,Jx;const jR=Math.pow(2,32);function Vd(t){return"count"in t?1:1+Vd(t.left)+Vd(t.right)}function YR(t,e,n){return Qx=new Float32Array(n),fa=new Uint32Array(n),Lc=new Uint16Array(n),Jx=new Uint8Array(n),Gd(t,e)}function Gd(t,e){const n=t/4,i=t/2,r="count"in e,s=e.boundingData;for(let o=0;o<6;o++)Qx[n+o]=s[o];if(r)if(e.buffer){const o=e.buffer;Jx.set(new Uint8Array(o),t);for(let a=t,l=t+o.byteLength;a<l;a+=wa){const c=a/2;_n(c,Lc)||(fa[a/4+6]+=n)}return t+o.byteLength}else{const o=e.offset,a=e.count;return fa[n+6]=o,Lc[i+14]=a,Lc[i+15]=Iu,t+wa}else{const o=e.left,a=e.right,l=e.splitAxis;let c;if(c=Gd(t+wa,o),c/4>jR)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return fa[n+6]=c/4,c=Gd(c,a),fa[n+7]=l,c}}function $R(t,e){const n=(t.index?t.index.count:t.attributes.position.count)/3,i=n>2**16,r=i?4:2,s=e?new SharedArrayBuffer(n*r):new ArrayBuffer(n*r),o=i?new Uint32Array(s):new Uint16Array(s);for(let a=0,l=o.length;a<l;a++)o[a]=a;return o}function qR(t,e,n,i,r){const{maxDepth:s,verbose:o,maxLeafTris:a,strategy:l,onProgress:c,indirect:u}=r,h=t._indirectBuffer,f=t.geometry,p=f.index?f.index.array:null,_=u?XR:WR,x=No(f),m=new Float32Array(6);let d=!1;const g=new Jf;return Qf(e,n,i,g.boundingData,m),S(g,n,i,m),g;function v(A){c&&c(A/x)}function S(A,w,M,R=null,L=0){if(!d&&L>=s&&(d=!0,o&&(console.warn(`MeshBVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),M<=a||L>=s)return v(w+M),A.offset=w,A.count=M,A;const y=VR(A.boundingData,R,e,w,M,l);if(y.axis===-1)return v(w+M),A.offset=w,A.count=M,A;const E=_(h,p,e,w,M,y);if(E===w||E===w+M)v(w+M),A.offset=w,A.count=M;else{A.splitAxis=y.axis;const D=new Jf,N=w,z=E-w;A.left=D,Qf(e,N,z,D.boundingData,m),S(D,N,z,m,L+1);const W=new Jf,k=E,Y=M-z;A.right=W,Qf(e,k,Y,W.boundingData,m),S(W,k,Y,m,L+1)}return A}}function KR(t,e){const n=t.geometry;e.indirect&&(t._indirectBuffer=$R(n,e.useSharedArrayBuffer),zR(n,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),t._indirectBuffer||BR(n,e);const i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=kR(n),s=e.indirect?qx(n,e.range):Kx(n,e.range);t._roots=s.map(o=>{const a=qR(t,r,o.offset,o.count,e),l=Vd(a),c=new i(wa*l);return YR(0,a,c),c})}class Yi{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,n){let i=1/0,r=-1/0;for(let s=0,o=e.length;s<o;s++){const l=e[s][n];i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}setFromPoints(e,n){let i=1/0,r=-1/0;for(let s=0,o=n.length;s<o;s++){const a=n[s],l=e.dot(a);i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}}Yi.prototype.setFromBox=function(){const t=new P;return function(n,i){const r=i.min,s=i.max;let o=1/0,a=-1/0;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){t.x=r.x*l+s.x*(1-l),t.y=r.y*c+s.y*(1-c),t.z=r.z*u+s.z*(1-u);const h=n.dot(t);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();const ZR=function(){const t=new P,e=new P,n=new P;return function(r,s,o){const a=r.start,l=t,c=s.start,u=e;n.subVectors(a,c),t.subVectors(r.end,r.start),e.subVectors(s.end,s.start);const h=n.dot(u),f=u.dot(l),p=u.dot(u),_=n.dot(l),m=l.dot(l)*p-f*f;let d,g;m!==0?d=(h*f-_*p)/m:d=0,g=(h+d*f)/p,o.x=d,o.y=g}}(),rm=function(){const t=new ye,e=new P,n=new P;return function(r,s,o,a){ZR(r,s,t);let l=t.x,c=t.y;if(l>=0&&l<=1&&c>=0&&c<=1){r.at(l,o),s.at(c,a);return}else if(l>=0&&l<=1){c<0?s.at(0,a):s.at(1,a),r.closestPointToPoint(a,!0,o);return}else if(c>=0&&c<=1){l<0?r.at(0,o):r.at(1,o),s.closestPointToPoint(o,!0,a);return}else{let u;l<0?u=r.start:u=r.end;let h;c<0?h=s.start:h=s.end;const f=e,p=n;if(r.closestPointToPoint(h,!0,e),s.closestPointToPoint(u,!0,n),f.distanceToSquared(h)<=p.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(p);return}}}}(),QR=function(){const t=new P,e=new P,n=new oi,i=new Hi;return function(s,o){const{radius:a,center:l}=s,{a:c,b:u,c:h}=o;if(i.start=c,i.end=u,i.closestPointToPoint(l,!0,t).distanceTo(l)<=a||(i.start=c,i.end=h,i.closestPointToPoint(l,!0,t).distanceTo(l)<=a)||(i.start=u,i.end=h,i.closestPointToPoint(l,!0,t).distanceTo(l)<=a))return!0;const x=o.getPlane(n);if(Math.abs(x.distanceToPoint(l))<=a){const d=x.projectPoint(l,e);if(o.containsPoint(d))return!0}return!1}}(),JR=1e-15;function eh(t){return Math.abs(t)<JR}class di extends It{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new P),this.satBounds=new Array(4).fill().map(()=>new Yi),this.points=[this.a,this.b,this.c],this.sphere=new Si,this.plane=new oi,this.needsUpdate=!0}intersectsSphere(e){return QR(e,this)}update(){const e=this.a,n=this.b,i=this.c,r=this.points,s=this.satAxes,o=this.satBounds,a=s[0],l=o[0];this.getNormal(a),l.setFromPoints(a,r);const c=s[1],u=o[1];c.subVectors(e,n),u.setFromPoints(c,r);const h=s[2],f=o[2];h.subVectors(n,i),f.setFromPoints(h,r);const p=s[3],_=o[3];p.subVectors(i,e),_.setFromPoints(p,r),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}}di.prototype.closestPointToSegment=function(){const t=new P,e=new P,n=new Hi;return function(r,s=null,o=null){const{start:a,end:l}=r,c=this.points;let u,h=1/0;for(let f=0;f<3;f++){const p=(f+1)%3;n.start.copy(c[f]),n.end.copy(c[p]),rm(n,r,t,e),u=t.distanceToSquared(e),u<h&&(h=u,s&&s.copy(t),o&&o.copy(e))}return this.closestPointToPoint(a,t),u=a.distanceToSquared(t),u<h&&(h=u,s&&s.copy(t),o&&o.copy(a)),this.closestPointToPoint(l,t),u=l.distanceToSquared(t),u<h&&(h=u,s&&s.copy(t),o&&o.copy(l)),Math.sqrt(h)}}();di.prototype.intersectsTriangle=function(){const t=new di,e=new Array(3),n=new Array(3),i=new Yi,r=new Yi,s=new P,o=new P,a=new P,l=new P,c=new P,u=new Hi,h=new Hi,f=new Hi,p=new P;function _(x,m,d){const g=x.points;let v=0,S=-1;for(let A=0;A<3;A++){const{start:w,end:M}=u;w.copy(g[A]),M.copy(g[(A+1)%3]),u.delta(o);const R=eh(m.distanceToPoint(w));if(eh(m.normal.dot(o))&&R){d.copy(u),v=2;break}const L=m.intersectLine(u,p);if(!L&&R&&p.copy(w),(L||R)&&!eh(p.distanceTo(M))){if(v<=1)(v===1?d.start:d.end).copy(p),R&&(S=v);else if(v>=2){(S===1?d.start:d.end).copy(p),v=2;break}if(v++,v===2&&S===-1)break}}return v}return function(m,d=null,g=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(t.copy(m),t.update(),m=t);const v=this.plane,S=m.plane;if(Math.abs(v.normal.dot(S.normal))>1-1e-10){const A=this.satBounds,w=this.satAxes;n[0]=m.a,n[1]=m.b,n[2]=m.c;for(let L=0;L<4;L++){const y=A[L],E=w[L];if(i.setFromPoints(E,n),y.isSeparated(i))return!1}const M=m.satBounds,R=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let L=0;L<4;L++){const y=M[L],E=R[L];if(i.setFromPoints(E,e),y.isSeparated(i))return!1}for(let L=0;L<4;L++){const y=w[L];for(let E=0;E<4;E++){const D=R[E];if(s.crossVectors(y,D),i.setFromPoints(s,e),r.setFromPoints(s,n),i.isSeparated(r))return!1}}return d&&(g||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),d.start.set(0,0,0),d.end.set(0,0,0)),!0}else{const A=_(this,S,h);if(A===1&&m.containsPoint(h.end))return d&&(d.start.copy(h.end),d.end.copy(h.end)),!0;if(A!==2)return!1;const w=_(m,v,f);if(w===1&&this.containsPoint(f.end))return d&&(d.start.copy(f.end),d.end.copy(f.end)),!0;if(w!==2)return!1;if(h.delta(a),f.delta(l),a.dot(l)<0){let N=f.start;f.start=f.end,f.end=N}const M=h.start.dot(a),R=h.end.dot(a),L=f.start.dot(a),y=f.end.dot(a),E=R<L,D=M<y;return M!==y&&L!==R&&E===D?!1:(d&&(c.subVectors(h.start,f.start),c.dot(a)>0?d.start.copy(h.start):d.start.copy(f.start),c.subVectors(h.end,f.end),c.dot(a)<0?d.end.copy(h.end):d.end.copy(f.end)),!0)}}}();di.prototype.distanceToPoint=function(){const t=new P;return function(n){return this.closestPointToPoint(n,t),n.distanceTo(t)}}();di.prototype.distanceToTriangle=function(){const t=new P,e=new P,n=["a","b","c"],i=new Hi,r=new Hi;return function(o,a=null,l=null){const c=a||l?i:null;if(this.intersectsTriangle(o,c))return(a||l)&&(a&&c.getCenter(a),l&&c.getCenter(l)),0;let u=1/0;for(let h=0;h<3;h++){let f;const p=n[h],_=o[p];this.closestPointToPoint(_,t),f=_.distanceToSquared(t),f<u&&(u=f,a&&a.copy(t),l&&l.copy(_));const x=this[p];o.closestPointToPoint(x,t),f=x.distanceToSquared(t),f<u&&(u=f,a&&a.copy(x),l&&l.copy(t))}for(let h=0;h<3;h++){const f=n[h],p=n[(h+1)%3];i.set(this[f],this[p]);for(let _=0;_<3;_++){const x=n[_],m=n[(_+1)%3];r.set(o[x],o[m]),rm(i,r,t,e);const d=t.distanceToSquared(e);d<u&&(u=d,a&&a.copy(t),l&&l.copy(e))}}return Math.sqrt(u)}}();class hn{constructor(e,n,i){this.isOrientedBox=!0,this.min=new P,this.max=new P,this.matrix=new Be,this.invMatrix=new Be,this.points=new Array(8).fill().map(()=>new P),this.satAxes=new Array(3).fill().map(()=>new P),this.satBounds=new Array(3).fill().map(()=>new Yi),this.alignedSatBounds=new Array(3).fill().map(()=>new Yi),this.needsUpdate=!1,e&&this.min.copy(e),n&&this.max.copy(n),i&&this.matrix.copy(i)}set(e,n,i){this.min.copy(e),this.max.copy(n),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}hn.prototype.update=function(){return function(){const e=this.matrix,n=this.min,i=this.max,r=this.points;for(let c=0;c<=1;c++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){const f=1*c|2*u|4*h,p=r[f];p.x=c?i.x:n.x,p.y=u?i.y:n.y,p.z=h?i.z:n.z,p.applyMatrix4(e)}const s=this.satBounds,o=this.satAxes,a=r[0];for(let c=0;c<3;c++){const u=o[c],h=s[c],f=1<<c,p=r[f];u.subVectors(a,p),h.setFromPoints(u,r)}const l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();hn.prototype.intersectsBox=function(){const t=new Yi;return function(n){this.needsUpdate&&this.update();const i=n.min,r=n.max,s=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(t.min=i.x,t.max=r.x,a[0].isSeparated(t)||(t.min=i.y,t.max=r.y,a[1].isSeparated(t))||(t.min=i.z,t.max=r.z,a[2].isSeparated(t)))return!1;for(let l=0;l<3;l++){const c=o[l],u=s[l];if(t.setFromBox(c,n),u.isSeparated(t))return!1}return!0}}();hn.prototype.intersectsTriangle=function(){const t=new di,e=new Array(3),n=new Yi,i=new Yi,r=new P;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(t.copy(o),t.update(),o=t);const a=this.satBounds,l=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){const p=a[f],_=l[f];if(n.setFromPoints(_,e),p.isSeparated(n))return!1}const c=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){const p=c[f],_=u[f];if(n.setFromPoints(_,h),p.isSeparated(n))return!1}for(let f=0;f<3;f++){const p=l[f];for(let _=0;_<4;_++){const x=u[_];if(r.crossVectors(p,x),n.setFromPoints(r,e),i.setFromPoints(r,h),n.isSeparated(i))return!1}}return!0}}();hn.prototype.closestPointToPoint=function(){return function(e,n){return this.needsUpdate&&this.update(),n.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),n}}();hn.prototype.distanceToPoint=function(){const t=new P;return function(n){return this.closestPointToPoint(n,t),n.distanceTo(t)}}();hn.prototype.distanceToBox=function(){const t=["x","y","z"],e=new Array(12).fill().map(()=>new Hi),n=new Array(12).fill().map(()=>new Hi),i=new P,r=new P;return function(o,a=0,l=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(l||c)&&(o.getCenter(r),this.closestPointToPoint(r,i),o.closestPointToPoint(i,r),l&&l.copy(i),c&&c.copy(r)),0;const u=a*a,h=o.min,f=o.max,p=this.points;let _=1/0;for(let m=0;m<8;m++){const d=p[m];r.copy(d).clamp(h,f);const g=d.distanceToSquared(r);if(g<_&&(_=g,l&&l.copy(d),c&&c.copy(r),g<u))return Math.sqrt(g)}let x=0;for(let m=0;m<3;m++)for(let d=0;d<=1;d++)for(let g=0;g<=1;g++){const v=(m+1)%3,S=(m+2)%3,A=d<<v|g<<S,w=1<<m|d<<v|g<<S,M=p[A],R=p[w];e[x].set(M,R);const y=t[m],E=t[v],D=t[S],N=n[x],z=N.start,W=N.end;z[y]=h[y],z[E]=d?h[E]:f[E],z[D]=g?h[D]:f[E],W[y]=f[y],W[E]=d?h[E]:f[E],W[D]=g?h[D]:f[E],x++}for(let m=0;m<=1;m++)for(let d=0;d<=1;d++)for(let g=0;g<=1;g++){r.x=m?f.x:h.x,r.y=d?f.y:h.y,r.z=g?f.z:h.z,this.closestPointToPoint(r,i);const v=r.distanceToSquared(i);if(v<_&&(_=v,l&&l.copy(i),c&&c.copy(r),v<u))return Math.sqrt(v)}for(let m=0;m<12;m++){const d=e[m];for(let g=0;g<12;g++){const v=n[g];rm(d,v,i,r);const S=i.distanceToSquared(r);if(S<_&&(_=S,l&&l.copy(i),c&&c.copy(r),S<u))return Math.sqrt(S)}}return Math.sqrt(_)}}();class sm{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class eb extends sm{constructor(){super(()=>new di)}}const jn=new eb;class tb{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let n=null;this.setBuffer=i=>{n&&e.push(n),n=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{n=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const ht=new tb;let gr,oo;const Fs=[],Ql=new sm(()=>new bt);function nb(t,e,n,i,r,s){gr=Ql.getPrimitive(),oo=Ql.getPrimitive(),Fs.push(gr,oo),ht.setBuffer(t._roots[e]);const o=Wd(0,t.geometry,n,i,r,s);ht.clearBuffer(),Ql.releasePrimitive(gr),Ql.releasePrimitive(oo),Fs.pop(),Fs.pop();const a=Fs.length;return a>0&&(oo=Fs[a-1],gr=Fs[a-2]),o}function Wd(t,e,n,i,r=null,s=0,o=0){const{float32Array:a,uint16Array:l,uint32Array:c}=ht;let u=t*2;if(_n(u,l)){const _=Ln(t,c),x=Gn(u,l);return St(t,a,gr),i(_,x,!1,o,s+t,gr)}else{let D=function(z){const{uint16Array:W,uint32Array:k}=ht;let Y=z*2;for(;!_n(Y,W);)z=Wn(z),Y=z*2;return Ln(z,k)},N=function(z){const{uint16Array:W,uint32Array:k}=ht;let Y=z*2;for(;!_n(Y,W);)z=Xn(z,k),Y=z*2;return Ln(z,k)+Gn(Y,W)};var f=D,p=N;const _=Wn(t),x=Xn(t,c);let m=_,d=x,g,v,S,A;if(r&&(S=gr,A=oo,St(m,a,S),St(d,a,A),g=r(S),v=r(A),v<g)){m=x,d=_;const z=g;g=v,v=z,S=A}S||(S=gr,St(m,a,S));const w=_n(m*2,l),M=n(S,w,g,o+1,s+m);let R;if(M===F_){const z=D(m),k=N(m)-z;R=i(z,k,!0,o+1,s+m,S)}else R=M&&Wd(m,e,n,i,r,s,o+1);if(R)return!0;A=oo,St(d,a,A);const L=_n(d*2,l),y=n(A,L,v,o+1,s+d);let E;if(y===F_){const z=D(d),k=N(d)-z;E=i(z,k,!0,o+1,s+d,A)}else E=y&&Wd(d,e,n,i,r,s,o+1);return!!E}}const ta=new P,th=new P;function ib(t,e,n={},i=0,r=1/0){const s=i*i,o=r*r;let a=1/0,l=null;if(t.shapecast({boundsTraverseOrder:u=>(ta.copy(e).clamp(u.min,u.max),ta.distanceToSquared(e)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,ta);const f=e.distanceToSquared(ta);return f<a&&(th.copy(ta),a=f,l=h),f<s}}),a===1/0)return null;const c=Math.sqrt(a);return n.point?n.point.copy(th):n.point=th.clone(),n.distance=c,n.faceIndex=l,n}const Os=new P,Bs=new P,zs=new P,Jl=new ye,ec=new ye,tc=new ye,H_=new P,V_=new P,G_=new P,nc=new P;function rb(t,e,n,i,r,s,o,a){let l;if(s===cn?l=t.intersectTriangle(i,n,e,!0,r):l=t.intersectTriangle(e,n,i,s!==Hn,r),l===null)return null;const c=t.origin.distanceTo(r);return c<o||c>a?null:{distance:c,point:r.clone()}}function sb(t,e,n,i,r,s,o,a,l,c,u){Os.fromBufferAttribute(e,s),Bs.fromBufferAttribute(e,o),zs.fromBufferAttribute(e,a);const h=rb(t,Os,Bs,zs,nc,l,c,u);if(h){i&&(Jl.fromBufferAttribute(i,s),ec.fromBufferAttribute(i,o),tc.fromBufferAttribute(i,a),h.uv=It.getInterpolation(nc,Os,Bs,zs,Jl,ec,tc,new ye)),r&&(Jl.fromBufferAttribute(r,s),ec.fromBufferAttribute(r,o),tc.fromBufferAttribute(r,a),h.uv1=It.getInterpolation(nc,Os,Bs,zs,Jl,ec,tc,new ye)),n&&(H_.fromBufferAttribute(n,s),V_.fromBufferAttribute(n,o),G_.fromBufferAttribute(n,a),h.normal=It.getInterpolation(nc,Os,Bs,zs,H_,V_,G_,new P),h.normal.dot(t.direction)>0&&h.normal.multiplyScalar(-1));const f={a:s,b:o,c:a,normal:new P,materialIndex:0};It.getNormal(Os,Bs,zs,f.normal),h.face=f,h.faceIndex=s}return h}function Uu(t,e,n,i,r,s,o){const a=i*3;let l=a+0,c=a+1,u=a+2;const h=t.index;t.index&&(l=h.getX(l),c=h.getX(c),u=h.getX(u));const{position:f,normal:p,uv:_,uv1:x}=t.attributes,m=sb(n,f,p,_,x,l,c,u,e,s,o);return m?(m.faceIndex=i,r&&r.push(m),m):null}function Rt(t,e,n,i){const r=t.a,s=t.b,o=t.c;let a=e,l=e+1,c=e+2;n&&(a=n.getX(a),l=n.getX(l),c=n.getX(c)),r.x=i.getX(a),r.y=i.getY(a),r.z=i.getZ(a),s.x=i.getX(l),s.y=i.getY(l),s.z=i.getZ(l),o.x=i.getX(c),o.y=i.getY(c),o.z=i.getZ(c)}function ob(t,e,n,i,r,s,o,a){const{geometry:l,_indirectBuffer:c}=t;for(let u=i,h=i+r;u<h;u++)Uu(l,e,n,u,s,o,a)}function ab(t,e,n,i,r,s,o){const{geometry:a,_indirectBuffer:l}=t;let c=1/0,u=null;for(let h=i,f=i+r;h<f;h++){let p;p=Uu(a,e,n,h,null,s,o),p&&p.distance<c&&(u=p,c=p.distance)}return u}function lb(t,e,n,i,r,s,o){const{geometry:a}=n,{index:l}=a,c=a.attributes.position;for(let u=t,h=e+t;u<h;u++){let f;if(f=u,Rt(o,f*3,l,c),o.needsUpdate=!0,i(o,f,r,s))return!0}return!1}function cb(t,e=null){e&&Array.isArray(e)&&(e=new Set(e));const n=t.geometry,i=n.index?n.index.array:null,r=n.attributes.position;let s,o,a,l,c=0;const u=t._roots;for(let f=0,p=u.length;f<p;f++)s=u[f],o=new Uint32Array(s),a=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(f,p,_=!1){const x=f*2;if(a[x+15]===Iu){const d=o[f+6],g=a[x+14];let v=1/0,S=1/0,A=1/0,w=-1/0,M=-1/0,R=-1/0;for(let L=3*d,y=3*(d+g);L<y;L++){let E=i[L];const D=r.getX(E),N=r.getY(E),z=r.getZ(E);D<v&&(v=D),D>w&&(w=D),N<S&&(S=N),N>M&&(M=N),z<A&&(A=z),z>R&&(R=z)}return l[f+0]!==v||l[f+1]!==S||l[f+2]!==A||l[f+3]!==w||l[f+4]!==M||l[f+5]!==R?(l[f+0]=v,l[f+1]=S,l[f+2]=A,l[f+3]=w,l[f+4]=M,l[f+5]=R,!0):!1}else{const d=f+8,g=o[f+6],v=d+p,S=g+p;let A=_,w=!1,M=!1;e?A||(w=e.has(v),M=e.has(S),A=!w&&!M):(w=!0,M=!0);const R=A||w,L=A||M;let y=!1;R&&(y=h(d,p,A));let E=!1;L&&(E=h(g,p,A));const D=y||E;if(D)for(let N=0;N<3;N++){const z=d+N,W=g+N,k=l[z],Y=l[z+3],U=l[W],$=l[W+3];l[f+N]=k<U?k:U,l[f+N+3]=Y>$?Y:$}return D}}}function Lr(t,e,n,i,r){let s,o,a,l,c,u;const h=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,_=n.origin.x,x=n.origin.y,m=n.origin.z;let d=e[t],g=e[t+3],v=e[t+1],S=e[t+3+1],A=e[t+2],w=e[t+3+2];return h>=0?(s=(d-_)*h,o=(g-_)*h):(s=(g-_)*h,o=(d-_)*h),f>=0?(a=(v-x)*f,l=(S-x)*f):(a=(S-x)*f,l=(v-x)*f),s>l||a>o||((a>s||isNaN(s))&&(s=a),(l<o||isNaN(o))&&(o=l),p>=0?(c=(A-m)*p,u=(w-m)*p):(c=(w-m)*p,u=(A-m)*p),s>u||c>o)?!1:((c>s||s!==s)&&(s=c),(u<o||o!==o)&&(o=u),s<=r&&o>=i)}function ub(t,e,n,i,r,s,o,a){const{geometry:l,_indirectBuffer:c}=t;for(let u=i,h=i+r;u<h;u++){let f=c?c[u]:u;Uu(l,e,n,f,s,o,a)}}function fb(t,e,n,i,r,s,o){const{geometry:a,_indirectBuffer:l}=t;let c=1/0,u=null;for(let h=i,f=i+r;h<f;h++){let p;p=Uu(a,e,n,l?l[h]:h,null,s,o),p&&p.distance<c&&(u=p,c=p.distance)}return u}function hb(t,e,n,i,r,s,o){const{geometry:a}=n,{index:l}=a,c=a.attributes.position;for(let u=t,h=e+t;u<h;u++){let f;if(f=n.resolveTriangleIndex(u),Rt(o,f*3,l,c),o.needsUpdate=!0,i(o,f,r,s))return!0}return!1}function db(t,e,n,i,r,s,o){ht.setBuffer(t._roots[e]),Xd(0,t,n,i,r,s,o),ht.clearBuffer()}function Xd(t,e,n,i,r,s,o){const{float32Array:a,uint16Array:l,uint32Array:c}=ht,u=t*2;if(_n(u,l)){const f=Ln(t,c),p=Gn(u,l);ob(e,n,i,f,p,r,s,o)}else{const f=Wn(t);Lr(f,a,i,s,o)&&Xd(f,e,n,i,r,s,o);const p=Xn(t,c);Lr(p,a,i,s,o)&&Xd(p,e,n,i,r,s,o)}}const pb=["x","y","z"];function mb(t,e,n,i,r,s){ht.setBuffer(t._roots[e]);const o=jd(0,t,n,i,r,s);return ht.clearBuffer(),o}function jd(t,e,n,i,r,s){const{float32Array:o,uint16Array:a,uint32Array:l}=ht;let c=t*2;if(_n(c,a)){const h=Ln(t,l),f=Gn(c,a);return ab(e,n,i,h,f,r,s)}else{const h=Zx(t,l),f=pb[h],_=i.direction[f]>=0;let x,m;_?(x=Wn(t),m=Xn(t,l)):(x=Xn(t,l),m=Wn(t));const g=Lr(x,o,i,r,s)?jd(x,e,n,i,r,s):null;if(g){const A=g.point[f];if(_?A<=o[m+h]:A>=o[m+h+3])return g}const S=Lr(m,o,i,r,s)?jd(m,e,n,i,r,s):null;return g&&S?g.distance<=S.distance?g:S:g||S||null}}const ic=new bt,ks=new di,Hs=new di,na=new Be,W_=new hn,rc=new hn;function gb(t,e,n,i){ht.setBuffer(t._roots[e]);const r=Yd(0,t,n,i);return ht.clearBuffer(),r}function Yd(t,e,n,i,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ht;let l=t*2;if(r===null&&(n.boundingBox||n.computeBoundingBox(),W_.set(n.boundingBox.min,n.boundingBox.max,i),r=W_),_n(l,o)){const u=e.geometry,h=u.index,f=u.attributes.position,p=n.index,_=n.attributes.position,x=Ln(t,a),m=Gn(l,o);if(na.copy(i).invert(),n.boundsTree)return St(t,s,rc),rc.matrix.copy(na),rc.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:g=>rc.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let v=x*3,S=(m+x)*3;v<S;v+=3)if(Rt(Hs,v,h,f),Hs.needsUpdate=!0,g.intersectsTriangle(Hs))return!0;return!1}});for(let d=x*3,g=(m+x)*3;d<g;d+=3){Rt(ks,d,h,f),ks.a.applyMatrix4(na),ks.b.applyMatrix4(na),ks.c.applyMatrix4(na),ks.needsUpdate=!0;for(let v=0,S=p.count;v<S;v+=3)if(Rt(Hs,v,p,_),Hs.needsUpdate=!0,ks.intersectsTriangle(Hs))return!0}}else{const u=t+8,h=a[t+6];return St(u,s,ic),!!(r.intersectsBox(ic)&&Yd(u,e,n,i,r)||(St(h,s,ic),r.intersectsBox(ic)&&Yd(h,e,n,i,r)))}}const sc=new Be,nh=new hn,ia=new hn,_b=new P,vb=new P,xb=new P,yb=new P;function Sb(t,e,n,i={},r={},s=0,o=1/0){e.boundingBox||e.computeBoundingBox(),nh.set(e.boundingBox.min,e.boundingBox.max,n),nh.needsUpdate=!0;const a=t.geometry,l=a.attributes.position,c=a.index,u=e.attributes.position,h=e.index,f=jn.getPrimitive(),p=jn.getPrimitive();let _=_b,x=vb,m=null,d=null;r&&(m=xb,d=yb);let g=1/0,v=null,S=null;return sc.copy(n).invert(),ia.matrix.copy(sc),t.shapecast({boundsTraverseOrder:A=>nh.distanceToBox(A),intersectsBounds:(A,w,M)=>M<g&&M<o?(w&&(ia.min.copy(A.min),ia.max.copy(A.max),ia.needsUpdate=!0),!0):!1,intersectsRange:(A,w)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:R=>ia.distanceToBox(R),intersectsBounds:(R,L,y)=>y<g&&y<o,intersectsRange:(R,L)=>{for(let y=R,E=R+L;y<E;y++){Rt(p,3*y,h,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let D=A,N=A+w;D<N;D++){Rt(f,3*D,c,l),f.needsUpdate=!0;const z=f.distanceToTriangle(p,_,m);if(z<g&&(x.copy(_),d&&d.copy(m),g=z,v=D,S=y),z<s)return!0}}}});{const M=No(e);for(let R=0,L=M;R<L;R++){Rt(p,3*R,h,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let y=A,E=A+w;y<E;y++){Rt(f,3*y,c,l),f.needsUpdate=!0;const D=f.distanceToTriangle(p,_,m);if(D<g&&(x.copy(_),d&&d.copy(m),g=D,v=y,S=R),D<s)return!0}}}}}),jn.releasePrimitive(f),jn.releasePrimitive(p),g===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=g,i.faceIndex=v,r&&(r.point?r.point.copy(d):r.point=d.clone(),r.point.applyMatrix4(sc),x.applyMatrix4(sc),r.distance=x.sub(r.point).length(),r.faceIndex=S),i)}function Mb(t,e=null){e&&Array.isArray(e)&&(e=new Set(e));const n=t.geometry,i=n.index?n.index.array:null,r=n.attributes.position;let s,o,a,l,c=0;const u=t._roots;for(let f=0,p=u.length;f<p;f++)s=u[f],o=new Uint32Array(s),a=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(f,p,_=!1){const x=f*2;if(a[x+15]===Iu){const d=o[f+6],g=a[x+14];let v=1/0,S=1/0,A=1/0,w=-1/0,M=-1/0,R=-1/0;for(let L=d,y=d+g;L<y;L++){const E=3*t.resolveTriangleIndex(L);for(let D=0;D<3;D++){let N=E+D;N=i?i[N]:N;const z=r.getX(N),W=r.getY(N),k=r.getZ(N);z<v&&(v=z),z>w&&(w=z),W<S&&(S=W),W>M&&(M=W),k<A&&(A=k),k>R&&(R=k)}}return l[f+0]!==v||l[f+1]!==S||l[f+2]!==A||l[f+3]!==w||l[f+4]!==M||l[f+5]!==R?(l[f+0]=v,l[f+1]=S,l[f+2]=A,l[f+3]=w,l[f+4]=M,l[f+5]=R,!0):!1}else{const d=f+8,g=o[f+6],v=d+p,S=g+p;let A=_,w=!1,M=!1;e?A||(w=e.has(v),M=e.has(S),A=!w&&!M):(w=!0,M=!0);const R=A||w,L=A||M;let y=!1;R&&(y=h(d,p,A));let E=!1;L&&(E=h(g,p,A));const D=y||E;if(D)for(let N=0;N<3;N++){const z=d+N,W=g+N,k=l[z],Y=l[z+3],U=l[W],$=l[W+3];l[f+N]=k<U?k:U,l[f+N+3]=Y>$?Y:$}return D}}}function Eb(t,e,n,i,r,s,o){ht.setBuffer(t._roots[e]),$d(0,t,n,i,r,s,o),ht.clearBuffer()}function $d(t,e,n,i,r,s,o){const{float32Array:a,uint16Array:l,uint32Array:c}=ht,u=t*2;if(_n(u,l)){const f=Ln(t,c),p=Gn(u,l);ub(e,n,i,f,p,r,s,o)}else{const f=Wn(t);Lr(f,a,i,s,o)&&$d(f,e,n,i,r,s,o);const p=Xn(t,c);Lr(p,a,i,s,o)&&$d(p,e,n,i,r,s,o)}}const wb=["x","y","z"];function Tb(t,e,n,i,r,s){ht.setBuffer(t._roots[e]);const o=qd(0,t,n,i,r,s);return ht.clearBuffer(),o}function qd(t,e,n,i,r,s){const{float32Array:o,uint16Array:a,uint32Array:l}=ht;let c=t*2;if(_n(c,a)){const h=Ln(t,l),f=Gn(c,a);return fb(e,n,i,h,f,r,s)}else{const h=Zx(t,l),f=wb[h],_=i.direction[f]>=0;let x,m;_?(x=Wn(t),m=Xn(t,l)):(x=Xn(t,l),m=Wn(t));const g=Lr(x,o,i,r,s)?qd(x,e,n,i,r,s):null;if(g){const A=g.point[f];if(_?A<=o[m+h]:A>=o[m+h+3])return g}const S=Lr(m,o,i,r,s)?qd(m,e,n,i,r,s):null;return g&&S?g.distance<=S.distance?g:S:g||S||null}}const oc=new bt,Vs=new di,Gs=new di,ra=new Be,X_=new hn,ac=new hn;function Ab(t,e,n,i){ht.setBuffer(t._roots[e]);const r=Kd(0,t,n,i);return ht.clearBuffer(),r}function Kd(t,e,n,i,r=null){const{float32Array:s,uint16Array:o,uint32Array:a}=ht;let l=t*2;if(r===null&&(n.boundingBox||n.computeBoundingBox(),X_.set(n.boundingBox.min,n.boundingBox.max,i),r=X_),_n(l,o)){const u=e.geometry,h=u.index,f=u.attributes.position,p=n.index,_=n.attributes.position,x=Ln(t,a),m=Gn(l,o);if(ra.copy(i).invert(),n.boundsTree)return St(t,s,ac),ac.matrix.copy(ra),ac.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:g=>ac.intersectsBox(g),intersectsTriangle:g=>{g.a.applyMatrix4(i),g.b.applyMatrix4(i),g.c.applyMatrix4(i),g.needsUpdate=!0;for(let v=x,S=m+x;v<S;v++)if(Rt(Gs,3*e.resolveTriangleIndex(v),h,f),Gs.needsUpdate=!0,g.intersectsTriangle(Gs))return!0;return!1}});for(let d=x,g=m+x;d<g;d++){const v=e.resolveTriangleIndex(d);Rt(Vs,3*v,h,f),Vs.a.applyMatrix4(ra),Vs.b.applyMatrix4(ra),Vs.c.applyMatrix4(ra),Vs.needsUpdate=!0;for(let S=0,A=p.count;S<A;S+=3)if(Rt(Gs,S,p,_),Gs.needsUpdate=!0,Vs.intersectsTriangle(Gs))return!0}}else{const u=t+8,h=a[t+6];return St(u,s,oc),!!(r.intersectsBox(oc)&&Kd(u,e,n,i,r)||(St(h,s,oc),r.intersectsBox(oc)&&Kd(h,e,n,i,r)))}}const lc=new Be,ih=new hn,sa=new hn,Cb=new P,Rb=new P,bb=new P,Pb=new P;function Lb(t,e,n,i={},r={},s=0,o=1/0){e.boundingBox||e.computeBoundingBox(),ih.set(e.boundingBox.min,e.boundingBox.max,n),ih.needsUpdate=!0;const a=t.geometry,l=a.attributes.position,c=a.index,u=e.attributes.position,h=e.index,f=jn.getPrimitive(),p=jn.getPrimitive();let _=Cb,x=Rb,m=null,d=null;r&&(m=bb,d=Pb);let g=1/0,v=null,S=null;return lc.copy(n).invert(),sa.matrix.copy(lc),t.shapecast({boundsTraverseOrder:A=>ih.distanceToBox(A),intersectsBounds:(A,w,M)=>M<g&&M<o?(w&&(sa.min.copy(A.min),sa.max.copy(A.max),sa.needsUpdate=!0),!0):!1,intersectsRange:(A,w)=>{if(e.boundsTree){const M=e.boundsTree;return M.shapecast({boundsTraverseOrder:R=>sa.distanceToBox(R),intersectsBounds:(R,L,y)=>y<g&&y<o,intersectsRange:(R,L)=>{for(let y=R,E=R+L;y<E;y++){const D=M.resolveTriangleIndex(y);Rt(p,3*D,h,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let N=A,z=A+w;N<z;N++){const W=t.resolveTriangleIndex(N);Rt(f,3*W,c,l),f.needsUpdate=!0;const k=f.distanceToTriangle(p,_,m);if(k<g&&(x.copy(_),d&&d.copy(m),g=k,v=N,S=y),k<s)return!0}}}})}else{const M=No(e);for(let R=0,L=M;R<L;R++){Rt(p,3*R,h,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let y=A,E=A+w;y<E;y++){const D=t.resolveTriangleIndex(y);Rt(f,3*D,c,l),f.needsUpdate=!0;const N=f.distanceToTriangle(p,_,m);if(N<g&&(x.copy(_),d&&d.copy(m),g=N,v=y,S=R),N<s)return!0}}}}}),jn.releasePrimitive(f),jn.releasePrimitive(p),g===1/0?null:(i.point?i.point.copy(x):i.point=x.clone(),i.distance=g,i.faceIndex=v,r&&(r.point?r.point.copy(d):r.point=d.clone(),r.point.applyMatrix4(lc),x.applyMatrix4(lc),r.distance=x.sub(r.point).length(),r.faceIndex=S),i)}function Db(){return typeof SharedArrayBuffer<"u"}const Ta=new ht.constructor,uu=new ht.constructor,cr=new sm(()=>new bt),Ws=new bt,Xs=new bt,rh=new bt,sh=new bt;let oh=!1;function Ib(t,e,n,i){if(oh)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");oh=!0;const r=t._roots,s=e._roots;let o,a=0,l=0;const c=new Be().copy(n).invert();for(let u=0,h=r.length;u<h;u++){Ta.setBuffer(r[u]),l=0;const f=cr.getPrimitive();St(0,Ta.float32Array,f),f.applyMatrix4(c);for(let p=0,_=s.length;p<_&&(uu.setBuffer(s[p]),o=ni(0,0,n,c,i,a,l,0,0,f),uu.clearBuffer(),l+=s[p].length,!o);p++);if(cr.releasePrimitive(f),Ta.clearBuffer(),a+=r[u].length,o)break}return oh=!1,o}function ni(t,e,n,i,r,s=0,o=0,a=0,l=0,c=null,u=!1){let h,f;u?(h=uu,f=Ta):(h=Ta,f=uu);const p=h.float32Array,_=h.uint32Array,x=h.uint16Array,m=f.float32Array,d=f.uint32Array,g=f.uint16Array,v=t*2,S=e*2,A=_n(v,x),w=_n(S,g);let M=!1;if(w&&A)u?M=r(Ln(e,d),Gn(e*2,g),Ln(t,_),Gn(t*2,x),l,o+e,a,s+t):M=r(Ln(t,_),Gn(t*2,x),Ln(e,d),Gn(e*2,g),a,s+t,l,o+e);else if(w){const R=cr.getPrimitive();St(e,m,R),R.applyMatrix4(n);const L=Wn(t),y=Xn(t,_);St(L,p,Ws),St(y,p,Xs);const E=R.intersectsBox(Ws),D=R.intersectsBox(Xs);M=E&&ni(e,L,i,n,r,o,s,l,a+1,R,!u)||D&&ni(e,y,i,n,r,o,s,l,a+1,R,!u),cr.releasePrimitive(R)}else{const R=Wn(e),L=Xn(e,d);St(R,m,rh),St(L,m,sh);const y=c.intersectsBox(rh),E=c.intersectsBox(sh);if(y&&E)M=ni(t,R,n,i,r,s,o,a,l+1,c,u)||ni(t,L,n,i,r,s,o,a,l+1,c,u);else if(y)if(A)M=ni(t,R,n,i,r,s,o,a,l+1,c,u);else{const D=cr.getPrimitive();D.copy(rh).applyMatrix4(n);const N=Wn(t),z=Xn(t,_);St(N,p,Ws),St(z,p,Xs);const W=D.intersectsBox(Ws),k=D.intersectsBox(Xs);M=W&&ni(R,N,i,n,r,o,s,l,a+1,D,!u)||k&&ni(R,z,i,n,r,o,s,l,a+1,D,!u),cr.releasePrimitive(D)}else if(E)if(A)M=ni(t,L,n,i,r,s,o,a,l+1,c,u);else{const D=cr.getPrimitive();D.copy(sh).applyMatrix4(n);const N=Wn(t),z=Xn(t,_);St(N,p,Ws),St(z,p,Xs);const W=D.intersectsBox(Ws),k=D.intersectsBox(Xs);M=W&&ni(L,N,i,n,r,o,s,l,a+1,D,!u)||k&&ni(L,z,i,n,r,o,s,l,a+1,D,!u),cr.releasePrimitive(D)}}return M}const cc=new hn,j_=new bt,Ub={strategy:$x,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class fu{static serialize(e,n={}){n={cloneBuffers:!0,...n};const i=e.geometry,r=e._roots,s=e._indirectBuffer,o=i.getIndex();let a;return n.cloneBuffers?a={roots:r.map(l=>l.slice()),index:o?o.array.slice():null,indirectBuffer:s?s.slice():null}:a={roots:r,index:o?o.array:null,indirectBuffer:s},a}static deserialize(e,n,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};const{index:r,roots:s,indirectBuffer:o}=e,a=new fu(n,{...i,[Zf]:!0});if(a._roots=s,a._indirectBuffer=o||null,i.setIndex){const l=n.getIndex();if(l===null){const c=new Ft(e.index,1,!1);n.setIndex(c)}else l.array!==r&&(l.array.set(r),l.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,n={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(n=Object.assign({...Ub,[Zf]:!1},n),n.useSharedArrayBuffer&&!Db())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,n[Zf]||(KR(this,n),!e.boundingBox&&n.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new bt))),this.resolveTriangleIndex=n.indirect?i=>this._indirectBuffer[i]:i=>i}refit(e=null){return(this.indirect?Mb:cb)(this,e)}traverse(e,n=0){const i=this._roots[n],r=new Uint32Array(i),s=new Uint16Array(i);o(0);function o(a,l=0){const c=a*2,u=s[c+15]===Iu;if(u){const h=r[a+6],f=s[c+14];e(l,u,new Float32Array(i,a*4,6),h,f)}else{const h=a+wa/4,f=r[a+6],p=r[a+7];e(l,u,new Float32Array(i,a*4,6),p)||(o(h,l+1),o(f,l+1))}}}raycast(e,n=Mi,i=0,r=1/0){const s=this._roots,o=this.geometry,a=[],l=n.isMaterial,c=Array.isArray(n),u=o.groups,h=l?n.side:n,f=this.indirect?Eb:db;for(let p=0,_=s.length;p<_;p++){const x=c?n[u[p].materialIndex].side:h,m=a.length;if(f(this,p,x,e,a,i,r),c){const d=u[p].materialIndex;for(let g=m,v=a.length;g<v;g++)a[g].face.materialIndex=d}}return a}raycastFirst(e,n=Mi,i=0,r=1/0){const s=this._roots,o=this.geometry,a=n.isMaterial,l=Array.isArray(n);let c=null;const u=o.groups,h=a?n.side:n,f=this.indirect?Tb:mb;for(let p=0,_=s.length;p<_;p++){const x=l?n[u[p].materialIndex].side:h,m=f(this,p,x,e,i,r);m!=null&&(c==null||m.distance<c.distance)&&(c=m,l&&(m.face.materialIndex=u[p].materialIndex))}return c}intersectsGeometry(e,n){let i=!1;const r=this._roots,s=this.indirect?Ab:gb;for(let o=0,a=r.length;o<a&&(i=s(this,o,e,n),!i);o++);return i}shapecast(e){const n=jn.getPrimitive(),i=this.indirect?hb:lb;let{boundsTraverseOrder:r,intersectsBounds:s,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){const h=o;o=(f,p,_,x,m)=>h(f,p,_,x,m)?!0:i(f,p,this,a,_,x,n)}else o||(a?o=(h,f,p,_)=>i(h,f,this,a,p,_,n):o=(h,f,p)=>p);let l=!1,c=0;const u=this._roots;for(let h=0,f=u.length;h<f;h++){const p=u[h];if(l=nb(this,h,s,o,r,c),l)break;c+=p.byteLength}return jn.releasePrimitive(n),l}bvhcast(e,n,i){let{intersectsRanges:r,intersectsTriangles:s}=i;const o=jn.getPrimitive(),a=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?_=>{const x=this.resolveTriangleIndex(_);Rt(o,x*3,a,l)}:_=>{Rt(o,_*3,a,l)},u=jn.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,p=e.indirect?_=>{const x=e.resolveTriangleIndex(_);Rt(u,x*3,h,f)}:_=>{Rt(u,_*3,h,f)};if(s){const _=(x,m,d,g,v,S,A,w)=>{for(let M=d,R=d+g;M<R;M++){p(M),u.a.applyMatrix4(n),u.b.applyMatrix4(n),u.c.applyMatrix4(n),u.needsUpdate=!0;for(let L=x,y=x+m;L<y;L++)if(c(L),o.needsUpdate=!0,s(o,u,L,M,v,S,A,w))return!0}return!1};if(r){const x=r;r=function(m,d,g,v,S,A,w,M){return x(m,d,g,v,S,A,w,M)?!0:_(m,d,g,v,S,A,w,M)}}else r=_}return Ib(this,e,n,r)}intersectsBox(e,n){return cc.set(e.min,e.max,n),cc.needsUpdate=!0,this.shapecast({intersectsBounds:i=>cc.intersectsBox(i),intersectsTriangle:i=>cc.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:n=>e.intersectsBox(n),intersectsTriangle:n=>n.intersectsSphere(e)})}closestPointToGeometry(e,n,i={},r={},s=0,o=1/0){return(this.indirect?Lb:Sb)(this,e,n,i,r,s,o)}closestPointToPoint(e,n={},i=0,r=1/0){return ib(this,e,n,i,r)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{St(0,new Float32Array(i),j_),e.union(j_)}),e}}function Y_(t,e,n){return t===null?null:(t.point.applyMatrix4(e.matrixWorld),t.distance=t.point.distanceTo(n.ray.origin),t.object=e,t)}const $_=aR||null,uc=new Za,q_=new P,K_=new Be,Nb=rt.prototype.raycast,Fb=$_!==null?$_.prototype.raycast:null,Z_=new P,Gt=new rt,fc=[];function Ob(t,e){this.isBatchedMesh?Bb.call(this,t,e):zb.call(this,t,e)}function Bb(t,e){if(this.boundsTrees){const n=this.boundsTrees,i=this._drawInfo,r=this._drawRanges,s=this.matrixWorld;Gt.material=this.material,Gt.geometry=this.geometry;const o=Gt.geometry.boundsTree,a=Gt.geometry.drawRange;Gt.geometry.boundingSphere===null&&(Gt.geometry.boundingSphere=new Si);for(let l=0,c=i.length;l<c;l++){if(!this.getVisibleAt(l))continue;const u=i[l].geometryIndex;if(Gt.geometry.boundsTree=n[u],this.getMatrixAt(l,Gt.matrixWorld).premultiply(s),!Gt.geometry.boundsTree){this.getBoundingBoxAt(u,Gt.geometry.boundingBox),this.getBoundingSphereAt(u,Gt.geometry.boundingSphere);const h=r[u];Gt.geometry.setDrawRange(h.start,h.count)}Gt.raycast(t,fc);for(let h=0,f=fc.length;h<f;h++){const p=fc[h];p.object=this,p.batchId=l,e.push(p)}fc.length=0}Gt.geometry.boundsTree=o,Gt.geometry.drawRange=a,Gt.material=null,Gt.geometry=null}else Fb.call(this,t,e)}function zb(t,e){if(this.geometry.boundsTree){if(this.material===void 0)return;K_.copy(this.matrixWorld).invert(),uc.copy(t.ray).applyMatrix4(K_),Z_.setFromMatrixScale(this.matrixWorld),q_.copy(uc.direction).multiply(Z_);const n=q_.length(),i=t.near/n,r=t.far/n,s=this.geometry.boundsTree;if(t.firstHitOnly===!0){const o=Y_(s.raycastFirst(uc,this.material,i,r),this,t);o&&e.push(o)}else{const o=s.raycast(uc,this.material,i,r);for(let a=0,l=o.length;a<l;a++){const c=Y_(o[a],this,t);c&&e.push(c)}}}else Nb.call(this,t,e)}const ha={gantry:[0,250],trolley:[-3,27],hoist:[.2,17],rotation:[-180,180]},Q_={gantry:40,trolley:12,hoist:10,rotation:0,spreader:40},J_=.5,kb=2e3,dt={L40:12.192,L20:6.058,W:2.438,H:2.591},xt={bayPitch:13.2,rowPitch:2.9,rowsPerBlock:6,bays:18,maxTier:4,craneSpan:23.47,truckLaneZ:21.3,railTop:.35};function Hb(t){const e=["CSQU","TGHU","MSKU","OOLU","HLCU","EGHU","TCLU","GESU"],n=e[t%e.length],i=1e6+(t*7919+13)%9e6;return`${n}${i}`}function Vb(){const t=[];let e=1;const n=[{name:"A",zStart:1.6,rows:xt.rowsPerBlock},{name:"B",zStart:31.5,rows:4}];for(const i of n)for(let r=0;r<xt.bays;r++)for(let s=0;s<i.rows;s++){const o=(r*31+s*17+i.name.charCodeAt(0)*7)%11;if(o>=8)continue;const a=1+o%xt.maxTier;for(let l=1;l<=a;l++){if(t.length>=kb)return t;const c=(r+s+l)%5===0?20:40,u=r*xt.bayPitch+xt.bayPitch/2,h=i.zStart+s*xt.rowPitch+xt.rowPitch/2,f=(l-.5)*dt.H;t.push({boxId:Hb(e++),block:i.name,bay:r+1,row:s+1,tier:l,size:c,x:u,y:f,z:h})}}return t}rt.prototype.raycast=Ob;const Pi=.9,ev=[9414856,8372095,14198623,13139855],Gb=6712952,Wb=10132042;class Xb{constructor(e,n,i,r,s){De(this,"renderer");De(this,"scene",new ZC);De(this,"camera");De(this,"controls");De(this,"raycaster",new gR);De(this,"clock",new mR);De(this,"disposed",!1);De(this,"pose");De(this,"threshold");De(this,"staticMesh");De(this,"staticBVH");De(this,"triToContainer",new Int32Array(0));De(this,"baseColors");De(this,"selectedContainer",-1);De(this,"crane",new ts);De(this,"trolley");De(this,"spreaderGroup",new ts);De(this,"spreaderMesh");De(this,"envelopeMesh");De(this,"envelopeEdges");De(this,"ropes",[]);De(this,"spreaderBaseGeom");De(this,"collGeom");De(this,"helperMode","none");De(this,"helperGroup",new ts);De(this,"closestLine");De(this,"distSprite");De(this,"distCanvas");De(this,"distCtx");De(this,"distTexture");De(this,"animFrom",null);De(this,"animTo",null);De(this,"animT",0);De(this,"dragPart",null);De(this,"dragStart",new ye);De(this,"dragStartPose",null);De(this,"pointerDownAt",new ye);De(this,"pointerDownOnSpreader",!1);De(this,"onPointerDown",e=>{if(e.button!==0)return;const n=this.pick(e);if(this.pointerDownAt.set(e.clientX,e.clientY),this.pointerDownOnSpreader=!1,!n)return;const i=this.findPart(n.object);i!=="spreader"&&i!=="trolley"&&i!=="gantry"||(e.stopPropagation(),e.preventDefault(),this.dragStart.set(e.clientX,e.clientY),this.dragStartPose={...this.pose},i==="spreader"?(this.pointerDownOnSpreader=!0,this.dragPart=e.shiftKey?"rotate":"hoist"):i==="trolley"?this.dragPart="trolley":this.dragPart="gantry",this.controls.enabled=!1)});De(this,"onPointerMove",e=>{if(!this.dragPart||!this.dragStartPose)return;const n={...this.dragStartPose},i=this.renderer.domElement.getBoundingClientRect();if(this.dragPart==="hoist"||this.dragPart==="rotate"){const r=e.clientY-this.dragStart.y,s=e.clientX-this.dragStart.x;this.dragPart==="hoist"?n.hoist=this.dragStartPose.hoist-r*.05:n.rotation=this.dragStartPose.rotation+s*.4}else{const r=new ye((e.clientX-i.left)/i.width*2-1,-((e.clientY-i.top)/i.height)*2+1);this.raycaster.setFromCamera(r,this.camera);const s=this.dragPart==="trolley"?18.6:0,o=new oi(new P(0,1,0),-s),a=new P;this.raycaster.ray.intersectPlane(o,a)&&(this.dragPart==="trolley"?n.trolley=a.z:n.gantry=a.x)}n.gantry=or.clamp(n.gantry,...ha.gantry),n.trolley=or.clamp(n.trolley,...ha.trolley),n.hoist=or.clamp(n.hoist,...ha.hoist),n.rotation=or.clamp(n.rotation,...ha.rotation),this.pose=n,this.applyPose(),this.events.onPoseChange({...n},"drag")});De(this,"onPointerUp",e=>{const n=this.dragPart!==null,i=Math.hypot(e.clientX-this.pointerDownAt.x,e.clientY-this.pointerDownAt.y);if(this.dragPart=null,this.dragStartPose=null,this.controls.enabled=!0,i<5){if(this.pointerDownOnSpreader&&n){this.cycleHelperMode(),this.pointerDownOnSpreader=!1;return}const r=this.pick(e);if(r&&r.object===this.staticMesh&&r.faceIndex!=null){const s=this.triToContainer[r.faceIndex];if(s>=0){this.selectedContainer=s;const o=this.cells[s],a={boxId:o.boxId,block:o.block,bay:o.bay,row:o.row,tier:o.tier,size:o.size};this.events.onContainerClick(a)}else this.selectedContainer=-1,this.events.onContainerClick(null);this.computeClearance()}else r==null&&(this.selectedContainer=-1,this.events.onContainerClick(null),this.computeClearance())}this.pointerDownOnSpreader=!1});De(this,"renderLoop",()=>{if(this.disposed)return;const e=Math.min(this.clock.getDelta(),.1);if(this.animFrom&&this.animTo){this.animT+=e/1.2;const n=Math.min(this.animT,1),i=n*n*(3-2*n),r=(a,l)=>a+(l-a)*i;let s=this.animFrom.rotation,o=this.animTo.rotation-s;o>180&&(o-=360),o<-180&&(o+=360),this.pose={gantry:r(this.animFrom.gantry,this.animTo.gantry),trolley:r(this.animFrom.trolley,this.animTo.trolley),hoist:r(this.animFrom.hoist,this.animTo.hoist),rotation:s+o*i,spreader:this.animTo.spreader},this.applyPose(),this.events.onPoseChange({...this.pose},"replay"),n>=1&&(this.animFrom=null,this.animTo=null)}this.controls.update(),this.renderer.render(this.scene,this.camera)});De(this,"onResize",()=>{const e=this.containerEl.clientWidth,n=this.containerEl.clientHeight;this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)});this.containerEl=e,this.cells=n,this.events=s,this.pose={...i},this.threshold=r,this.renderer=new KC({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(e.clientWidth,e.clientHeight),e.appendChild(this.renderer.domElement),this.camera=new kn(50,e.clientWidth/e.clientHeight,.1,2e3),this.camera.position.set(-32,30,52),this.controls=new yR(this.camera,this.renderer.domElement),this.controls.target.set(60,4,14),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxPolarAngle=Math.PI*.495,this.controls.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.scene.background=new Oe(1712168),this.scene.fog=new nm(1712168,180,600);const o=new fR(12571903,3159084,.9),a=new pR(16777215,1.4);a.position.set(80,120,60),this.scene.add(o,a),this.buildGround(),this.buildStaticGeometry(),this.buildCrane();const l=new Dt().setFromPoints([new P,new P]);this.closestLine=new Yr(l,new ns({color:16769357,linewidth:2})),this.closestLine.visible=!1,this.closestLine.frustumCulled=!1,this.scene.add(this.closestLine),this.distCanvas=document.createElement("canvas"),this.distCanvas.width=256,this.distCanvas.height=80,this.distCtx=this.distCanvas.getContext("2d"),this.distTexture=new lR(this.distCanvas);const c=new Gx({map:this.distTexture,depthTest:!1,transparent:!0});this.distSprite=new JC(c),this.distSprite.scale.set(6,1.9,1),this.distSprite.visible=!1,this.scene.add(this.distSprite),this.scene.add(this.helperGroup),this.applyPose(),this.bindPointerEvents(),window.addEventListener("resize",this.onResize),this.renderer.setAnimationLoop(this.renderLoop)}buildGround(){const e=new rt(new mr(600,200),new rr({color:2896184}));e.rotation.x=-Math.PI/2,e.position.set(120,-.01,20),this.scene.add(e);const n=new _R(600,120,3818834,3094596);n.position.set(120,.01,20),n.material.transparent=!0,n.material.opacity=.5,this.scene.add(n);const i=new rt(new mr(280,5.2),new rr({color:2303532}));i.rotation.x=-Math.PI/2,i.position.set(120,.02,xt.truckLaneZ),this.scene.add(i);const r=[];for(let o=-10;o<250;o+=6){const a=new mr(3,.18);a.rotateX(-Math.PI/2),a.translate(o,.03,xt.truckLaneZ),r.push(a)}const s=new rt(U_(r),new Ea({color:13421670}));this.scene.add(s)}buildStaticGeometry(){const e=[],n=[],i=new Oe;this.cells.forEach((o,a)=>{const l=o.size===40?dt.L40:dt.L20,c=new jt(l,dt.H,dt.W).toNonIndexed();c.translate(o.x,o.y,o.z),i.setHex(ev[(o.tier-1)%ev.length]);const u=c.attributes.position.count,h=new Float32Array(u*3);for(let f=0;f<u;f++)i.toArray(h,f*3);c.setAttribute("color",new Ft(h,3)),e.push(c);for(let f=0;f<12;f++)n.push(a)});const r=280;for(const o of[0,xt.craneSpan]){const a=new jt(r,xt.railTop,.9).toNonIndexed();a.translate(120,xt.railTop/2,o);const l=a.attributes.position.count,c=new Float32Array(l*3);i.setHex(Gb);for(let u=0;u<l;u++)i.toArray(c,u*3);a.setAttribute("color",new Ft(c,3)),e.push(a);for(let u=0;u<12;u++)n.push(-1)}for(const o of[xt.truckLaneZ-2.8,xt.truckLaneZ+2.8]){const a=new jt(280,.3,.3).toNonIndexed();a.translate(120,.15,o);const l=a.attributes.position.count,c=new Float32Array(l*3);i.setHex(Wb);for(let u=0;u<l;u++)i.toArray(c,u*3);a.setAttribute("color",new Ft(c,3)),e.push(a);for(let u=0;u<12;u++)n.push(-1)}const s=U_(e);this.staticBVH=new fu(s),s.boundsTree=this.staticBVH,this.triToContainer=Int32Array.from(n),this.baseColors=s.attributes.color.array.slice(),this.staticMesh=new rt(s,new rr({vertexColors:!0})),this.staticMesh.userData.part="static",this.scene.add(this.staticMesh)}buildCrane(){const e=new rr({color:14201146}),n=new rr({color:9075248}),i=17.5,r=new jt(.9,i,.9);for(const l of[-4.5,4.5])for(const c of[0,xt.craneSpan]){const u=new rt(r,e);u.position.set(l,i/2+xt.railTop,c),u.userData.part="gantry",this.crane.add(u);const h=new rt(new jt(2.2,.8,1.6),n);h.position.set(l,xt.railTop+.4,c),h.userData.part="gantry",this.crane.add(h)}const s=new jt(1.1,1.4,xt.craneSpan+4);for(const l of[-4.5,4.5]){const c=new rt(s,e);c.position.set(l,i+xt.railTop+.7,xt.craneSpan/2),c.userData.part="gantry",this.crane.add(c)}const o=new jt(10,1.2,1);for(const l of[0,xt.craneSpan]){const c=new rt(o,e);c.position.set(0,i+xt.railTop+.6,l),c.userData.part="gantry",this.crane.add(c)}this.trolley=new rt(new jt(3.2,1.1,4.2),new rr({color:4876938})),this.trolley.userData.part="trolley",this.crane.add(this.trolley),this.spreaderGroup.userData.part="spreader",this.crane.add(this.spreaderGroup),this.buildSpreader();const a=new ns({color:12303291});for(let l=0;l<4;l++){const c=new Dt().setFromPoints([new P,new P]),u=new Yr(c,a);u.frustumCulled=!1,this.crane.add(u),this.ropes.push(u)}this.scene.add(this.crane)}buildSpreader(){for(;this.spreaderGroup.children.length;){const s=this.spreaderGroup.children.pop();this.spreaderGroup.remove(s)}const e=this.pose.spreader===40?dt.L40:dt.L20;this.spreaderMesh=new rt(new jt(e,Pi,dt.W),new rr({color:13656112})),this.spreaderMesh.userData.part="spreader",this.spreaderGroup.add(this.spreaderMesh);const n=new jt(.3,.25,.3),i=new rr({color:3355443});for(const s of[-1,1])for(const o of[-1,1]){const a=new rt(n,i);a.position.set(s*(e-.3)/2,-Pi/2-.12,o*(dt.W-.3)/2),this.spreaderGroup.add(a)}const r=new jt(1,1,1);this.envelopeMesh=new rt(r,new Ea({color:2280584,transparent:!0,opacity:.22,depthWrite:!1,side:Hn})),this.envelopeMesh.userData.part="spreader",this.spreaderGroup.add(this.envelopeMesh),this.envelopeEdges=new Xx(new cR(r),new ns({color:2280584,transparent:!0,opacity:.8})),this.envelopeEdges.raycast=()=>{},this.spreaderGroup.add(this.envelopeEdges),this.spreaderBaseGeom=new jt(e,Pi,dt.W),this.collGeom=this.spreaderBaseGeom.clone(),this.collGeom.boundsTree=new fu(this.collGeom),this.updateEnvelopeSize()}updateEnvelopeSize(){const e=this.pose.spreader===40?dt.L40:dt.L20,n=this.threshold;this.envelopeMesh.scale.set(e+2*n,Pi+2*n,dt.W+2*n),this.envelopeEdges.scale.copy(this.envelopeMesh.scale)}setPose(e){const n=e.spreader!==this.pose.spreader;this.pose={...e},this.animFrom=null,n&&this.buildSpreader(),this.applyPose()}setThreshold(e){this.threshold=e,this.updateEnvelopeSize(),this.applyPose()}getPose(){return{...this.pose}}animateTo(e){e.spreader!==this.pose.spreader&&(this.pose.spreader=e.spreader,this.buildSpreader()),this.animFrom={...this.pose},this.animTo={...e},this.animT=0}applyPose(){const e=this.pose;this.crane.position.x=e.gantry,this.trolley.position.set(0,18.6,e.trolley),this.spreaderGroup.position.set(0,e.hoist+Pi/2,e.trolley),this.spreaderGroup.rotation.y=or.degToRad(e.rotation);const n=18.05,i=[new P(-1.4,n,e.trolley-1.8),new P(1.4,n,e.trolley-1.8),new P(-1.4,n,e.trolley+1.8),new P(1.4,n,e.trolley+1.8)],r=e.spreader===40?dt.L40:dt.L20,s=or.degToRad(e.rotation),o=Math.cos(s),a=Math.sin(s),l=e.hoist+Pi,c=[[-r/2+.5,-2.438/2+.3],[r/2-.5,-2.438/2+.3],[-r/2+.5,dt.W/2-.3],[r/2-.5,dt.W/2-.3]];this.ropes.forEach((u,h)=>{const[f,p]=c[h],_=f*o+p*a,x=-f*a+p*o,m=u.geometry.attributes.position;m.setXYZ(0,i[h].x,i[h].y,i[h].z),m.setXYZ(1,_,l,e.trolley+x),m.needsUpdate=!0}),this.updateHelpers(),this.computeClearance()}computeClearance(){this.crane.updateMatrixWorld(!0);const e=this.spreaderGroup.matrixWorld,n={point:new P,distance:0,faceIndex:0},i={point:new P,distance:0,faceIndex:0},r=this.staticBVH.closestPointToGeometry(this.collGeom,e,n,i),s=r?r.distance:1/0,o=i.point.clone().applyMatrix4(e),a=n.point.clone(),l=this.threshold,c=this.pose.spreader===40?dt.L40:dt.L20,u=new bt(new P(-c/2-l,-Pi/2-l,-2.438/2-l),new P(c/2+l,Pi/2+l,dt.W/2+l)),h=e.clone().invert(),f=u.clone().applyMatrix4(e),p=[],_=new It;this.staticBVH.shapecast({intersectsBounds:g=>g.intersectsBox(f),intersectsTriangle:(g,v)=>(_.a.copy(g.a).applyMatrix4(h),_.b.copy(g.b).applyMatrix4(h),_.c.copy(g.c).applyMatrix4(h),_.intersectsBox(u)&&p.push(v),!1)}),this.paintHits(p);const x=p.length===0&&s>=this.threshold,m=r!=null,d={minDistance:Number.isFinite(s)?Math.max(0,s):99,ok:x,hitTriangles:p.length,threshold:this.threshold,closestA:m?[a.x,a.y,a.z]:null,closestB:m?[o.x,o.y,o.z]:null};this.updateClosestVisual(d),this.events.onClearance(d)}paintHits(e){const n=this.staticMesh.geometry.attributes.color,i=n.array;i.set(this.baseColors);const r=(a,l,c,u)=>{for(let h=0;h<3;h++){const f=(a*3+h)*3;i[f]=l,i[f+1]=c,i[f+2]=u}};if(this.selectedContainer>=0){const a=this.selectedContainer*12;for(let l=0;l<12;l++)r(a+l,.95,.85,.3)}for(const a of e)r(a,1,.12,.1);n.needsUpdate=!0;const o=e.length>0?16729156:2280584;this.envelopeMesh.material.color.setHex(o),this.envelopeEdges.material.color.setHex(o)}updateClosestVisual(e){const n=e.minDistance<3&&e.closestA&&e.closestB;if(this.closestLine.visible=!!n,this.distSprite.visible=!!n,!n)return;const i=new P(...e.closestA),r=new P(...e.closestB),s=this.closestLine.geometry.attributes.position;s.setXYZ(0,i.x,i.y,i.z),s.setXYZ(1,r.x,r.y,r.z),s.needsUpdate=!0,this.closestLine.material.color.setHex(e.ok?16769357:16732224);const o=i.clone().add(r).multiplyScalar(.5);this.distSprite.position.copy(o).add(new P(0,1.2,0));const a=this.distCtx;a.clearRect(0,0,256,80),a.fillStyle=e.ok?"rgba(20,40,30,0.85)":"rgba(70,15,15,0.9)",a.fillRect(0,0,256,80),a.strokeStyle=e.ok?"#ffe14d":"#ff5040",a.lineWidth=4,a.strokeRect(2,2,252,76),a.fillStyle="#ffffff",a.font="bold 40px sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillText(`${e.minDistance.toFixed(2)} m`,128,42),this.distTexture.needsUpdate=!0}updateHelpers(){var f;for(;this.helperGroup.children.length;){const p=this.helperGroup.children.pop();this.helperGroup.remove(p),(f=p.geometry)==null||f.dispose()}if(this.helperMode==="none")return;const e=this.pose,n=e.spreader===40?dt.L40:dt.L20,i=or.degToRad(e.rotation),r=Math.cos(i),s=Math.sin(i),o=e.gantry,a=e.trolley,l=e.hoist+Pi/2,c=[];for(const[p,_]of[[-n/2,-2.438/2],[n/2,-2.438/2],[n/2,dt.W/2],[-n/2,dt.W/2]])c.push(new P(o+p*r+_*s,l,a-p*s+_*r));const u=new uR({color:5100287,dashSize:.5,gapSize:.3,transparent:!0,opacity:.9}),h=new ns({color:5100287});if(this.helperMode==="top"){for(const x of c){const m=new Dt().setFromPoints([x,new P(x.x,.02,x.z)]),d=new Yr(m,u);d.computeLineDistances(),this.helperGroup.add(d)}const p=c.map(x=>new P(x.x,.02,x.z));p.push(p[0].clone());const _=new Yr(new Dt().setFromPoints(p),h);this.helperGroup.add(_)}else{for(const d of c){const g=new Dt().setFromPoints([d,new P(d.x,d.y,-2.5)]),v=new Yr(g,u);v.computeLineDistances(),this.helperGroup.add(v)}const _=c.map(d=>new P(d.x,d.y,-2.5));_.push(_[0].clone());const x=new Yr(new Dt().setFromPoints(_),h);this.helperGroup.add(x);const m=new rt(new mr(30,20),new Ea({color:5100287,transparent:!0,opacity:.05,side:Hn,depthWrite:!1}));m.position.set(o,10,-2.5),this.helperGroup.add(m)}}bindPointerEvents(){this.containerEl.addEventListener("pointerdown",this.onPointerDown,!0),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault())}pick(e){const n=this.renderer.domElement.getBoundingClientRect(),i=new ye((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height)*2+1);this.raycaster.setFromCamera(i,this.camera),this.raycaster.firstHitOnly=!0;const r=this.raycaster.intersectObjects([this.crane,this.staticMesh],!0);return r.length?r[0]:null}findPart(e){let n=e;for(;n;){if(n.userData.part)return n.userData.part;n=n.parent}return null}cycleHelperMode(){this.helperMode=this.helperMode==="none"?"top":this.helperMode==="top"?"side":"none",this.updateHelpers(),this.events.onHelperModeChange(this.helperMode)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),window.removeEventListener("resize",this.onResize),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),this.containerEl.removeEventListener("pointerdown",this.onPointerDown,!0),this.renderer.domElement.remove(),this.renderer.dispose(),this.controls.dispose()}}const jb=[{key:"gantry",label:"大车行走",unit:"m",step:.1,digits:1},{key:"trolley",label:"小车横移",unit:"m",step:.1,digits:1},{key:"hoist",label:"起升高度",unit:"m",step:.1,digits:1},{key:"rotation",label:"吊具回转",unit:"°",step:1,digits:0}],Yb={none:"关闭",top:"俯视投影",side:"侧视投影"};function $b(t){const{pose:e,clearance:n,threshold:i}=t,r=n?n.minDistance-i:null;return J.jsxs("div",{className:"panel left-panel",children:[J.jsx("h2",{children:"姿态控制"}),J.jsxs("div",{className:"spreader-toggle",children:[J.jsx("span",{children:"吊具规格"}),J.jsx("div",{className:"seg",children:[20,40].map(s=>J.jsxs("button",{className:e.spreader===s?"active":"",onClick:()=>t.onPoseChange({...e,spreader:s}),children:[s," 尺"]},s))})]}),jb.map(s=>{const[o,a]=ha[s.key];return J.jsxs("div",{className:"axis",children:[J.jsxs("div",{className:"axis-head",children:[J.jsx("span",{children:s.label}),J.jsxs("span",{className:"axis-value",children:[e[s.key].toFixed(s.digits)," ",s.unit]})]}),J.jsx("input",{type:"range",min:o,max:a,step:s.step,value:e[s.key],onChange:l=>t.onPoseChange({...e,[s.key]:Number(l.target.value)})})]},s.key)}),J.jsx("h2",{children:"净空检测"}),J.jsxs("div",{className:"threshold-row",children:[J.jsx("span",{children:"净空阈值 (m)"}),J.jsx("input",{type:"number",min:.1,max:2,step:.05,value:i,onChange:s=>{const o=Number(s.target.value);Number.isFinite(o)&&o>=.05&&o<=5&&t.onThresholdChange(o)}})]}),n&&J.jsxs("div",{className:`clearance-box ${n.ok?"ok":"bad"}`,children:[J.jsx("div",{className:"clearance-status",children:n.ok?"✓ 净空满足":"✗ 净空不足"}),J.jsxs("div",{className:"clearance-row",children:[J.jsx("span",{children:"最小间距"}),J.jsxs("b",{children:[n.minDistance.toFixed(2)," m"]})]}),J.jsxs("div",{className:"clearance-row",children:[J.jsx("span",{children:"净空余量"}),J.jsx("b",{style:{color:r!=null&&r<0?"#ff6b5e":"#5ee08a"},children:r!=null?`${r>=0?"+":""}${r.toFixed(2)} m`:"—"})]}),J.jsxs("div",{className:"clearance-row",children:[J.jsx("span",{children:"侵入面数"}),J.jsx("b",{children:n.hitTriangles})]})]}),J.jsx("h2",{children:"辅助线"}),J.jsxs("div",{className:"info-row",children:[J.jsx("span",{children:"投影模式 (点吊具切换)"}),J.jsx("b",{children:Yb[t.helperMode]})]}),J.jsx("h2",{children:"箱信息"}),t.selectedContainer?J.jsxs("div",{className:"container-info",children:[J.jsxs("div",{className:"info-row",children:[J.jsx("span",{children:"箱号"}),J.jsx("b",{children:t.selectedContainer.boxId})]}),J.jsxs("div",{className:"info-row",children:[J.jsx("span",{children:"位置"}),J.jsxs("b",{children:[t.selectedContainer.block,"区 ",t.selectedContainer.bay,"贝"," ",t.selectedContainer.row,"排"]})]}),J.jsxs("div",{className:"info-row",children:[J.jsx("span",{children:"堆存层高"}),J.jsxs("b",{children:["第 ",t.selectedContainer.tier," 层"]})]}),J.jsxs("div",{className:"info-row",children:[J.jsx("span",{children:"箱型"}),J.jsxs("b",{children:[t.selectedContainer.size," 尺"]})]})]}):J.jsx("div",{className:"hint",children:"点击场景中的箱体查看箱号与层高"}),J.jsxs("div",{className:"hint footer-hint",children:["在场箱量 ",t.containerCount," / 2000",J.jsx("br",{}),"拖拽: 吊具=起升 · Shift+吊具=回转",J.jsx("br",{}),"小车=横移 · 大梁/支腿=大车"]})]})}function qb(t){const[e,n]=Wt.useState([]),i=s=>{n(o=>o.includes(s)?o.filter(a=>a!==s):[...o,s].slice(-3))},r=e.map(s=>({i:s,s:t.saved[s]})).filter(s=>s.s!=null);return J.jsxs("div",{className:"panel right-panel",children:[J.jsx("h2",{children:"预演姿态记录"}),t.saved.map((s,o)=>{var a;return J.jsx("div",{className:`pose-slot ${s?"":"empty"}`,children:s?J.jsxs(J.Fragment,{children:[J.jsxs("div",{className:"pose-head",children:[J.jsxs("label",{children:[J.jsx("input",{type:"checkbox",checked:e.includes(o),onChange:()=>i(o)}),J.jsx("b",{children:s.name})]}),J.jsx("span",{className:`badge ${(a=s.result)!=null&&a.ok?"ok":"bad"}`,children:s.result?s.result.ok?"净空OK":"净空不足":"—"})]}),J.jsxs("div",{className:"pose-params",children:["大车 ",s.pose.gantry.toFixed(1),"m · 小车 ",s.pose.trolley.toFixed(1),"m",J.jsx("br",{}),"起升 ",s.pose.hoist.toFixed(1),"m · 回转 ",s.pose.rotation.toFixed(0),"° ·"," ",s.pose.spreader,"尺",J.jsx("br",{}),"最小间距 ",s.result?s.result.minDistance.toFixed(2):"—"," m (阈值 ",s.result?s.result.threshold.toFixed(2):"—"," m)"]}),J.jsxs("div",{className:"pose-actions",children:[J.jsx("button",{onClick:()=>t.onReplay(o),children:"回放"}),J.jsx("button",{className:"ghost",onClick:()=>t.onSave(o),children:"覆盖"}),J.jsx("button",{className:"ghost",onClick:()=>t.onDelete(o),children:"删除"})]})]}):J.jsxs("div",{className:"empty-slot",children:[J.jsxs("span",{children:["姿态 ",o+1," · 未记录"]}),J.jsx("button",{onClick:()=>t.onSave(o),children:"记录当前姿态"})]})},o)}),r.length>=2&&J.jsxs(J.Fragment,{children:[J.jsx("h2",{children:"姿态对比"}),J.jsxs("table",{className:"compare-table",children:[J.jsx("thead",{children:J.jsxs("tr",{children:[J.jsx("th",{}),r.map(({s})=>J.jsx("th",{children:s.name},s.id))]})}),J.jsxs("tbody",{children:[J.jsxs("tr",{children:[J.jsx("td",{children:"大车"}),r.map(({s})=>J.jsxs("td",{children:[s.pose.gantry.toFixed(1)," m"]},s.id))]}),J.jsxs("tr",{children:[J.jsx("td",{children:"小车"}),r.map(({s})=>J.jsxs("td",{children:[s.pose.trolley.toFixed(1)," m"]},s.id))]}),J.jsxs("tr",{children:[J.jsx("td",{children:"起升"}),r.map(({s})=>J.jsxs("td",{children:[s.pose.hoist.toFixed(1)," m"]},s.id))]}),J.jsxs("tr",{children:[J.jsx("td",{children:"回转"}),r.map(({s})=>J.jsxs("td",{children:[s.pose.rotation.toFixed(0),"°"]},s.id))]}),J.jsxs("tr",{children:[J.jsx("td",{children:"吊具"}),r.map(({s})=>J.jsxs("td",{children:[s.pose.spreader," 尺"]},s.id))]}),J.jsxs("tr",{children:[J.jsx("td",{children:"最小间距"}),r.map(({s})=>{var o;return J.jsxs("td",{style:{color:(o=s.result)!=null&&o.ok?"#5ee08a":"#ff6b5e"},children:[s.result?s.result.minDistance.toFixed(2):"—"," m"]},s.id)})]})]})]})]}),J.jsx("button",{className:"export-btn",onClick:t.onExport,children:"导出 JSON 姿态文件 (班前交底)"})]})}function Kb(){const t=Wt.useRef(null),e=Wt.useRef(null),[n,i]=Wt.useState(Q_),[r,s]=Wt.useState(J_),[o,a]=Wt.useState(null),[l,c]=Wt.useState(null),[u,h]=Wt.useState("none"),[f,p]=Wt.useState([null,null,null]),_=Wt.useMemo(()=>Vb(),[]),x=Wt.useRef(n);x.current=n;const m=Wt.useRef(o);m.current=o;const d=Wt.useRef(r);d.current=r,Wt.useEffect(()=>{if(!t.current)return;const R=new Xb(t.current,_,Q_,J_,{onClearance:L=>a(L),onPoseChange:L=>i(L),onContainerClick:L=>c(L),onHelperModeChange:L=>h(L)});return e.current=R,()=>{R.dispose(),e.current=null}},[_]);const g=R=>{var L;i(R),(L=e.current)==null||L.setPose(R)},v=R=>{var L;s(R),(L=e.current)==null||L.setThreshold(R)},S=R=>{const L=x.current,y=m.current;p(E=>{const D=[...E];return D[R]={id:Date.now(),name:`姿态 ${R+1}`,savedAt:new Date().toLocaleString("zh-CN",{hour12:!1}),pose:{...L},result:y?{...y}:null},D})},A=R=>{var y;const L=f[R];L&&((y=e.current)==null||y.animateTo(L.pose))},w=R=>{p(L=>{const y=[...L];return y[R]=null,y})},M=()=>{const R=f.filter(N=>N!=null),L={tool:"场桥吊装包络预演",version:1,exportedAt:new Date().toISOString(),threshold:d.current,currentPose:x.current,currentClearance:m.current,savedPoses:R},y=new Blob([JSON.stringify(L,null,2)],{type:"application/json"}),E=URL.createObjectURL(y),D=document.createElement("a");D.href=E,D.download=`吊装预演姿态_${new Date().toISOString().slice(0,10)}.json`,D.click(),URL.revokeObjectURL(E)};return J.jsxs("div",{className:"app",children:[J.jsx($b,{pose:n,clearance:o,threshold:r,containerCount:_.length,selectedContainer:l,helperMode:u,onPoseChange:g,onThresholdChange:v}),J.jsx("div",{className:"viewport",ref:t}),J.jsx(qb,{saved:f,currentPose:n,currentClearance:o,onSave:S,onReplay:A,onDelete:w,onExport:M})]})}ah.createRoot(document.getElementById("root")).render(J.jsx(My.StrictMode,{children:J.jsx(Kb,{})}));

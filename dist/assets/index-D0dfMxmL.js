var Xd=Object.defineProperty;var qd=(s,t,e)=>t in s?Xd(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Ca=(s,t,e)=>qd(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();function He(){}function Of(s){return s()}function lu(){return Object.create(null)}function wi(s){s.forEach(Of)}function Ff(s){return typeof s=="function"}function Ks(s,t){return s!=s?t==t:s!==t||s&&typeof s=="object"||typeof s=="function"}function Yd(s){return Object.keys(s).length===0}function Bf(s,...t){if(s==null){for(const n of t)n(void 0);return He}const e=s.subscribe(...t);return e.unsubscribe?()=>e.unsubscribe():e}function ge(s){let t;return Bf(s,e=>t=e)(),t}function Ye(s,t,e){s.$$.on_destroy.push(Bf(t,e))}function V(s,t){s.appendChild(t)}function Te(s,t,e){s.insertBefore(t,e||null)}function ye(s){s.parentNode&&s.parentNode.removeChild(s)}function gn(s,t){for(let e=0;e<s.length;e+=1)s[e]&&s[e].d(t)}function nt(s){return document.createElement(s)}function _e(s){return document.createTextNode(s)}function wt(){return _e(" ")}function de(s,t,e,n){return s.addEventListener(t,e,n),()=>s.removeEventListener(t,e,n)}function J(s,t,e){e==null?s.removeAttribute(t):s.getAttribute(t)!==e&&s.setAttribute(t,e)}function jd(s){return Array.from(s.childNodes)}function mn(s,t){t=""+t,s.data!==t&&(s.data=t)}function Pc(s,t){s.value=t??""}function zf(s,t,e,n){e==null?s.style.removeProperty(t):s.style.setProperty(t,e,"")}function uu(s,t,e){for(let n=0;n<s.options.length;n+=1){const i=s.options[n];if(i.__value===t){i.selected=!0;return}}s.selectedIndex=-1}function Pe(s,t,e){s.classList.toggle(t,!!e)}let Dr;function br(s){Dr=s}function Kd(){if(!Dr)throw new Error("Function called outside component initialization");return Dr}function $d(s){Kd().$$.on_mount.push(s)}const ws=[],Nr=[];let Ps=[];const hu=[],Zd=Promise.resolve();let Lc=!1;function Jd(){Lc||(Lc=!0,Zd.then(kf))}function Ic(s){Ps.push(s)}const Pa=new Set;let ji=0;function kf(){if(ji!==0)return;const s=Dr;do{try{for(;ji<ws.length;){const t=ws[ji];ji++,br(t),Qd(t.$$)}}catch(t){throw ws.length=0,ji=0,t}for(br(null),ws.length=0,ji=0;Nr.length;)Nr.pop()();for(let t=0;t<Ps.length;t+=1){const e=Ps[t];Pa.has(e)||(Pa.add(e),e())}Ps.length=0}while(ws.length);for(;hu.length;)hu.pop()();Lc=!1,Pa.clear(),br(s)}function Qd(s){if(s.fragment!==null){s.update(),wi(s.before_update);const t=s.dirty;s.dirty=[-1],s.fragment&&s.fragment.p(s.ctx,t),s.after_update.forEach(Ic)}}function tp(s){const t=[],e=[];Ps.forEach(n=>s.indexOf(n)===-1?t.push(n):e.push(n)),e.forEach(n=>n()),Ps=t}const Wo=new Set;let Vi;function ep(){Vi={r:0,c:[],p:Vi}}function np(){Vi.r||wi(Vi.c),Vi=Vi.p}function Gi(s,t){s&&s.i&&(Wo.delete(s),s.i(t))}function Ls(s,t,e,n){if(s&&s.o){if(Wo.has(s))return;Wo.add(s),Vi.c.push(()=>{Wo.delete(s),n&&(e&&s.d(1),n())}),s.o(t)}else n&&n()}function xe(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function da(s){s&&s.c()}function zr(s,t,e){const{fragment:n,after_update:i}=s.$$;n&&n.m(t,e),Ic(()=>{const r=s.$$.on_mount.map(Of).filter(Ff);s.$$.on_destroy?s.$$.on_destroy.push(...r):wi(r),s.$$.on_mount=[]}),i.forEach(Ic)}function kr(s,t){const e=s.$$;e.fragment!==null&&(tp(e.after_update),wi(e.on_destroy),e.fragment&&e.fragment.d(t),e.on_destroy=e.fragment=null,e.ctx=[])}function ip(s,t){s.$$.dirty[0]===-1&&(ws.push(s),Jd(),s.$$.dirty.fill(0)),s.$$.dirty[t/31|0]|=1<<t%31}function Hr(s,t,e,n,i,r,o=null,a=[-1]){const c=Dr;br(s);const l=s.$$={fragment:null,ctx:[],props:r,update:He,not_equal:i,bound:lu(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:lu(),dirty:a,skip_bound:!1,root:t.target||c.$$.root};o&&o(l.root);let u=!1;if(l.ctx=e?e(s,t.props||{},(h,f,...d)=>{const g=d.length?d[0]:f;return l.ctx&&i(l.ctx[h],l.ctx[h]=g)&&(!l.skip_bound&&l.bound[h]&&l.bound[h](g),u&&ip(s,h)),f}):[],l.update(),u=!0,wi(l.before_update),l.fragment=n?n(l.ctx):!1,t.target){if(t.hydrate){const h=jd(t.target);l.fragment&&l.fragment.l(h),h.forEach(ye)}else l.fragment&&l.fragment.c();t.intro&&Gi(s.$$.fragment),zr(s,t.target,t.anchor),kf()}br(c)}class Vr{constructor(){Ca(this,"$$");Ca(this,"$$set")}$destroy(){kr(this,1),this.$destroy=He}$on(t,e){if(!Ff(e))return He;const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const i=n.indexOf(e);i!==-1&&n.splice(i,1)}}$set(t){this.$$set&&!Yd(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const sp="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(sp);const Ki=[];function Nn(s,t=He){let e;const n=new Set;function i(a){if(Ks(s,a)&&(s=a,e)){const c=!Ki.length;for(const l of n)l[1](),Ki.push(l,s);if(c){for(let l=0;l<Ki.length;l+=2)Ki[l][0](Ki[l+1]);Ki.length=0}}}function r(a){i(a(s))}function o(a,c=He){const l=[a,c];return n.add(l),n.size===1&&(e=t(i,r)||He),a(s),()=>{n.delete(l),n.size===0&&e&&(e(),e=null)}}return{set:i,update:r,subscribe:o}}const fu=[{id:"import",label:"模型导入"},{id:"paint",label:"分区绘制"},{id:"material",label:"材质调校"}],Dc=[{id:"fuselage",label:"机身",color:"#4da3ff"},{id:"wing",label:"机翼",color:"#ffb84d"},{id:"door",label:"舱门",color:"#6dffa8"}],xr=[0,.25,.5,.75,1],vr=[.1,.3,.5,.7,.9],du=[.12,.3,.65],pu=["细","中","粗"],Qo=[{id:0,label:"室内机库"},{id:1,label:"户外夕阳"}],ta=[{id:"solid",label:"实体"},{id:"wireframe",label:"线框"},{id:"normal",label:"法线"}],Hf="evtol-livery-config-v1";function rp(){try{return JSON.parse(localStorage.getItem(Hf))||{}}catch{return{}}}const pa=typeof localStorage<"u"?rp():{},Is=Nn("import"),an=Nn(pa.material??{primer:"#8a8f94",metalness:3,roughness:1,clearcoat:.8,clearcoatGloss:.75}),Fn=Nn(pa.envIndex??0),bi=Nn(pa.displayMode??"solid"),Fs=Nn(pa.brushSize??1),Nc=Nn("fuselage"),Tr=Nn("#c8102e"),ea=Nn(!1),Cl=Nn([]),ma=Nn(""),Uc=Nn("");if(typeof localStorage<"u"){const s=()=>{const t={material:ge(an),envIndex:ge(Fn),displayMode:ge(bi),brushSize:ge(Fs)};try{localStorage.setItem(Hf,JSON.stringify(t))}catch{}};[an,Fn,bi,Fs].forEach(t=>t.subscribe(s))}let La=null;function yi(s,t=3200){Uc.set(s),La&&clearTimeout(La),t>0&&(La=setTimeout(()=>Uc.set(""),t))}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pl="166",$i={ROTATE:0,DOLLY:1,PAN:2},Zi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},op=0,mu=1,ap=2,Vf=1,cp=2,Kn=3,In=0,Ve=1,cn=2,Mi=0,Ds=1,gu=2,_u=3,xu=4,lp=5,Bi=100,up=101,hp=102,fp=103,dp=104,pp=200,mp=201,gp=202,_p=203,Oc=204,Fc=205,xp=206,vp=207,yp=208,Mp=209,Sp=210,bp=211,Tp=212,Ep=213,Ap=214,wp=0,Rp=1,Cp=2,na=3,Pp=4,Lp=5,Ip=6,Dp=7,Gf=0,Np=1,Up=2,Si=0,Op=1,Fp=2,Bp=3,Wf=4,zp=5,kp=6,Hp=7,vu="attached",Vp="detached",Xf=300,Bs=301,zs=302,Bc=303,zc=304,ga=306,ks=1e3,gi=1001,ia=1002,Je=1003,qf=1004,yr=1005,ln=1006,Xo=1007,Jn=1008,ei=1009,Yf=1010,jf=1011,Ur=1012,Ll=1013,Ti=1014,un=1015,Gr=1016,Il=1017,Dl=1018,Hs=1020,Kf=35902,$f=1021,Zf=1022,en=1023,Jf=1024,Qf=1025,Ns=1026,Vs=1027,Nl=1028,_a=1029,td=1030,Ul=1031,Ol=1033,qo=33776,Yo=33777,jo=33778,Ko=33779,kc=35840,Hc=35841,Vc=35842,Gc=35843,Wc=36196,Xc=37492,qc=37496,Yc=37808,jc=37809,Kc=37810,$c=37811,Zc=37812,Jc=37813,Qc=37814,tl=37815,el=37816,nl=37817,il=37818,sl=37819,rl=37820,ol=37821,$o=36492,al=36494,cl=36495,ed=36283,ll=36284,ul=36285,hl=36286,Or=2300,Fr=2301,Ia=2302,yu=2400,Mu=2401,Su=2402,Gp=2500,Wp=0,nd=1,fl=2,Xp=3200,qp=3201,Fl=0,Yp=1,mi="",ke="srgb",Ge="srgb-linear",Bl="display-p3",xa="display-p3-linear",sa="linear",he="srgb",ra="rec709",oa="p3",Ji=7680,bu=519,jp=512,Kp=513,$p=514,id=515,Zp=516,Jp=517,Qp=518,tm=519,dl=35044,Tu="300 es",Qn=2e3,aa=2001;class Xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Eu=1234567;const Er=Math.PI/180,Gs=180/Math.PI;function Pn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[s&255]+We[s>>8&255]+We[s>>16&255]+We[s>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Ee(s,t,e){return Math.max(t,Math.min(e,s))}function zl(s,t){return(s%t+t)%t}function em(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function nm(s,t,e){return s!==t?(e-s)/(t-s):0}function Ar(s,t,e){return(1-e)*s+e*t}function im(s,t,e,n){return Ar(s,t,1-Math.exp(-e*n))}function sm(s,t=1){return t-Math.abs(zl(s,t*2)-t)}function rm(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function om(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function am(s,t){return s+Math.floor(Math.random()*(t-s+1))}function cm(s,t){return s+Math.random()*(t-s)}function lm(s){return s*(.5-Math.random())}function um(s){s!==void 0&&(Eu=s);let t=Eu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hm(s){return s*Er}function fm(s){return s*Gs}function dm(s){return(s&s-1)===0&&s!==0}function pm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function mm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function gm(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),h=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*u,c*h,c*f,a*l);break;case"YZY":s.set(c*f,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*f,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*d,a*l);break;case"YXY":s.set(c*d,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Rn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function oe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const sd={DEG2RAD:Er,RAD2DEG:Gs,generateUUID:Pn,clamp:Ee,euclideanModulo:zl,mapLinear:em,inverseLerp:nm,lerp:Ar,damp:im,pingpong:sm,smoothstep:rm,smootherstep:om,randInt:am,randFloat:cm,randFloatSpread:lm,seededRandom:um,degToRad:hm,radToDeg:fm,isPowerOfTwo:dm,ceilPowerOfTwo:pm,floorPowerOfTwo:mm,setQuaternionFromProperEuler:gm,normalize:oe,denormalize:Rn};class ut{constructor(t=0,e=0){ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,i,r,o,a,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],p=i[3],m=i[6],x=i[1],v=i[4],y=i[7],A=i[2],S=i[5],E=i[8];return r[0]=o*_+a*x+c*A,r[3]=o*p+a*v+c*S,r[6]=o*m+a*y+c*E,r[1]=l*_+u*x+h*A,r[4]=l*p+u*v+h*S,r[7]=l*m+u*y+h*E,r[2]=f*_+d*x+g*A,r[5]=f*p+d*v+g*S,r[8]=f*m+d*y+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=e*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(u*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Da.makeScale(t,e)),this}rotate(t){return this.premultiply(Da.makeRotation(-t)),this}translate(t,e){return this.premultiply(Da.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Da=new qt;function rd(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Br(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function _m(){const s=Br("canvas");return s.style.display="block",s}const Au={};function kl(s){s in Au||(Au[s]=!0,console.warn(s))}function xm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const wu=new qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ru=new qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yr={[Ge]:{transfer:sa,primaries:ra,toReference:s=>s,fromReference:s=>s},[ke]:{transfer:he,primaries:ra,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[xa]:{transfer:sa,primaries:oa,toReference:s=>s.applyMatrix3(Ru),fromReference:s=>s.applyMatrix3(wu)},[Bl]:{transfer:he,primaries:oa,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ru),fromReference:s=>s.applyMatrix3(wu).convertLinearToSRGB()}},vm=new Set([Ge,xa]),te={enabled:!0,_workingColorSpace:Ge,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!vm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Yr[t].toReference,i=Yr[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Yr[s].primaries},getTransfer:function(s){return s===mi?sa:Yr[s].transfer}};function Us(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Na(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Qi;class ym{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Qi===void 0&&(Qi=Br("canvas")),Qi.width=t.width,Qi.height=t.height;const n=Qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Us(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Us(e[n]/255)*255):e[n]=Us(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Mm=0;class od{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Pn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ua(i[o].image)):r.push(Ua(i[o]))}else r=Ua(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ua(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ym.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sm=0;class Le extends Xi{constructor(t=Le.DEFAULT_IMAGE,e=Le.DEFAULT_MAPPING,n=gi,i=gi,r=ln,o=Jn,a=en,c=ei,l=Le.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=Pn(),this.name="",this.source=new od(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ks:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case ia:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ks:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case ia:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=Xf;Le.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,i=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,y=(d+1)/2,A=(m+1)/2,S=(u+f)/4,E=(h+_)/4,C=(g+p)/4;return v>y&&v>A?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=S/n,r=E/n):y>A?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=S/i,r=C/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=E/r,i=C/r),this.set(n,i,r,e),this}let x=Math.sqrt((p-g)*(p-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(h-_)/x,this.z=(f-u)/x,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bm extends Xi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Le(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new od(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends bm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ad extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Tm extends Le{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Je,this.minFilter=Je,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let p=1-a;const m=c*f+l*d+u*g+h*_,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const A=Math.sqrt(v),S=Math.atan2(A,m*x);p=Math.sin(p*S)/A,a=Math.sin(a*S)/A}const y=a*x;if(c=c*p+f*y,l=l*p+d*y,u=u*p+g*y,h=h*p+_*y,p===1-a){const A=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=A,l*=A,u*=A,h*=A}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*h+c*d-l*f,t[e+1]=c*g+u*f+l*h-a*d,t[e+2]=l*g+u*d+a*f-c*h,t[e+3]=u*g-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oa.copy(this).projectOnVector(t),this.sub(Oa)}reflect(t){return this.sub(Oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Oa=new P,Cu=new Bn;class pe{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),jr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jr.copy(n.boundingBox)),jr.applyMatrix4(t.matrixWorld),this.union(jr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(nr),Kr.subVectors(this.max,nr),ts.subVectors(t.a,nr),es.subVectors(t.b,nr),ns.subVectors(t.c,nr),ri.subVectors(es,ts),oi.subVectors(ns,es),Ci.subVectors(ts,ns);let e=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-Ci.z,Ci.y,ri.z,0,-ri.x,oi.z,0,-oi.x,Ci.z,0,-Ci.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-Ci.y,Ci.x,0];return!Fa(e,ts,es,ns,Kr)||(e=[1,0,0,0,1,0,0,0,1],!Fa(e,ts,es,ns,Kr))?!1:($r.crossVectors(ri,oi),e=[$r.x,$r.y,$r.z],Fa(e,ts,es,ns,Kr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Gn=[new P,new P,new P,new P,new P,new P,new P,new P],Tn=new P,jr=new pe,ts=new P,es=new P,ns=new P,ri=new P,oi=new P,Ci=new P,nr=new P,Kr=new P,$r=new P,Pi=new P;function Fa(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Pi.fromArray(s,r);const a=i.x*Math.abs(Pi.x)+i.y*Math.abs(Pi.y)+i.z*Math.abs(Pi.z),c=t.dot(Pi),l=e.dot(Pi),u=n.dot(Pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Em=new pe,ir=new P,Ba=new P;class Ue{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Em.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ir.subVectors(t,this.center);const e=ir.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ir,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ir.copy(t.center).add(Ba)),this.expandByPoint(ir.copy(t.center).sub(Ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Wn=new P,za=new P,Zr=new P,ai=new P,ka=new P,Jr=new P,Ha=new P;class qi{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){za.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),ai.copy(this.origin).sub(za);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Zr),a=ai.dot(this.direction),c=-ai.dot(Zr),l=ai.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(za).addScaledVector(Zr,f),d}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);const n=Wn.dot(this.direction),i=Wn.dot(Wn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,n,i,r){ka.subVectors(e,t),Jr.subVectors(n,t),Ha.crossVectors(ka,Jr);let o=this.direction.dot(Ha),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,t);const c=a*this.direction.dot(Jr.crossVectors(ai,Jr));if(c<0)return null;const l=a*this.direction.dot(ka.cross(ai));if(l<0||c+l>o)return null;const u=-a*ai.dot(Ha);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct{constructor(t,e,n,i,r,o,a,c,l,u,h,f,d,g,_,p){Ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,u,h,f,d,g,_,p)}set(t,e,n,i,r,o,a,c,l,u,h,f,d,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,_=l*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*h,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Am,t,wm)}lookAt(t,e,n){const i=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ci.crossVectors(n,rn),ci.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ci.crossVectors(n,rn)),ci.normalize(),Qr.crossVectors(rn,ci),i[0]=ci.x,i[4]=Qr.x,i[8]=rn.x,i[1]=ci.y,i[5]=Qr.y,i[9]=rn.y,i[2]=ci.z,i[6]=Qr.z,i[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],p=n[10],m=n[14],x=n[3],v=n[7],y=n[11],A=n[15],S=i[0],E=i[4],C=i[8],b=i[12],M=i[1],L=i[5],D=i[9],N=i[13],O=i[2],G=i[6],k=i[10],Z=i[14],W=i[3],ht=i[7],st=i[11],pt=i[15];return r[0]=o*S+a*M+c*O+l*W,r[4]=o*E+a*L+c*G+l*ht,r[8]=o*C+a*D+c*k+l*st,r[12]=o*b+a*N+c*Z+l*pt,r[1]=u*S+h*M+f*O+d*W,r[5]=u*E+h*L+f*G+d*ht,r[9]=u*C+h*D+f*k+d*st,r[13]=u*b+h*N+f*Z+d*pt,r[2]=g*S+_*M+p*O+m*W,r[6]=g*E+_*L+p*G+m*ht,r[10]=g*C+_*D+p*k+m*st,r[14]=g*b+_*N+p*Z+m*pt,r[3]=x*S+v*M+y*O+A*W,r[7]=x*E+v*L+y*G+A*ht,r[11]=x*C+v*D+y*k+A*st,r[15]=x*b+v*N+y*Z+A*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*c*h-i*l*h-r*a*f+n*l*f+i*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-i*o*d+i*l*u-r*c*u)+p*(+e*l*h-e*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+m*(-i*a*u-e*c*h+e*a*f+i*o*h-n*o*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],x=h*p*l-_*f*l+_*c*d-a*p*d-h*c*m+a*f*m,v=g*f*l-u*p*l-g*c*d+o*p*d+u*c*m-o*f*m,y=u*_*l-g*h*l+g*a*d-o*_*d-u*a*m+o*h*m,A=g*h*c-u*_*c-g*a*f+o*_*f+u*a*p-o*h*p,S=e*x+n*v+i*y+r*A;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/S;return t[0]=x*E,t[1]=(_*f*r-h*p*r-_*i*d+n*p*d+h*i*m-n*f*m)*E,t[2]=(a*p*r-_*c*r+_*i*l-n*p*l-a*i*m+n*c*m)*E,t[3]=(h*c*r-a*f*r-h*i*l+n*f*l+a*i*d-n*c*d)*E,t[4]=v*E,t[5]=(u*p*r-g*f*r+g*i*d-e*p*d-u*i*m+e*f*m)*E,t[6]=(g*c*r-o*p*r-g*i*l+e*p*l+o*i*m-e*c*m)*E,t[7]=(o*f*r-u*c*r+u*i*l-e*f*l-o*i*d+e*c*d)*E,t[8]=y*E,t[9]=(g*h*r-u*_*r-g*n*d+e*_*d+u*n*m-e*h*m)*E,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*m+e*a*m)*E,t[11]=(u*a*r-o*h*r-u*n*l+e*h*l+o*n*d-e*a*d)*E,t[12]=A*E,t[13]=(u*_*i-g*h*i+g*n*f-e*_*f-u*n*p+e*h*p)*E,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*p-e*a*p)*E,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,_=o*u,p=o*h,m=a*h,x=c*l,v=c*u,y=c*h,A=n.x,S=n.y,E=n.z;return i[0]=(1-(_+m))*A,i[1]=(d+y)*A,i[2]=(g-v)*A,i[3]=0,i[4]=(d-y)*S,i[5]=(1-(f+m))*S,i[6]=(p+x)*S,i[7]=0,i[8]=(g+v)*E,i[9]=(p-x)*E,i[10]=(1-(f+_))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=is.set(i[0],i[1],i[2]).length();const o=is.set(i[4],i[5],i[6]).length(),a=is.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],En.copy(this);const l=1/r,u=1/o,h=1/a;return En.elements[0]*=l,En.elements[1]*=l,En.elements[2]*=l,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=h,En.elements[9]*=h,En.elements[10]*=h,e.setFromRotationMatrix(En),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Qn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===Qn)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===aa)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Qn){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-r),f=(e+t)*l,d=(n+i)*u;let g,_;if(a===Qn)g=(o+r)*h,_=-2*h;else if(a===aa)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const is=new P,En=new Ct,Am=new P(0,0,0),wm=new P(1,1,1),ci=new P,Qr=new P,rn=new P,Pu=new Ct,Lu=new Bn;class zn{constructor(t=0,e=0,n=0,i=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Pu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Lu.setFromEuler(this),this.setFromQuaternion(Lu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class Hl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Rm=0;const Iu=new P,ss=new Bn,Xn=new Ct,to=new P,sr=new P,Cm=new P,Pm=new Bn,Du=new P(1,0,0),Nu=new P(0,1,0),Uu=new P(0,0,1),Ou={type:"added"},Lm={type:"removed"},rs={type:"childadded",child:null},Va={type:"childremoved",child:null};class ve extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rm++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new P,e=new zn,n=new Bn,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ct},normalMatrix:{value:new qt}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Du,t)}rotateY(t){return this.rotateOnAxis(Nu,t)}rotateZ(t){return this.rotateOnAxis(Uu,t)}translateOnAxis(t,e){return Iu.copy(t).applyQuaternion(this.quaternion),this.position.add(Iu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Du,t)}translateY(t){return this.translateOnAxis(Nu,t)}translateZ(t){return this.translateOnAxis(Uu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?to.copy(t):to.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(sr,to,this.up):Xn.lookAt(to,sr,this.up),this.quaternion.setFromRotationMatrix(Xn),i&&(Xn.extractRotation(i.matrixWorld),ss.setFromRotationMatrix(Xn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ou),rs.child=t,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Lm),Va.child=t,this.dispatchEvent(Va),Va.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ou),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,t,Cm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Pm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ve.DEFAULT_UP=new P(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new P,qn=new P,Ga=new P,Yn=new P,os=new P,as=new P,Fu=new P,Wa=new P,Xa=new P,qa=new P;class Ze{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),An.subVectors(t,e),i.cross(An);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){An.subVectors(i,e),qn.subVectors(n,e),Ga.subVectors(t,e);const o=An.dot(An),a=An.dot(qn),c=An.dot(Ga),l=qn.dot(qn),u=qn.dot(Ga),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(o,Yn.y),c.addScaledVector(a,Yn.z),c)}static isFrontFacing(t,e,n,i){return An.subVectors(n,e),qn.subVectors(t,e),An.cross(qn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),An.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;os.subVectors(i,n),as.subVectors(r,n),Wa.subVectors(t,n);const c=os.dot(Wa),l=as.dot(Wa);if(c<=0&&l<=0)return e.copy(n);Xa.subVectors(t,i);const u=os.dot(Xa),h=as.dot(Xa);if(u>=0&&h<=u)return e.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(os,o);qa.subVectors(t,r);const d=os.dot(qa),g=as.dot(qa);if(g>=0&&d<=g)return e.copy(r);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(as,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return Fu.subVectors(r,i),a=(h-u)/(h-u+(d-g)),e.copy(i).addScaledVector(Fu,a);const m=1/(p+_+f);return o=_*m,a=f*m,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},eo={h:0,s:0,l:0};function Ya(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=te.workingColorSpace){if(t=zl(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ya(o,r,t+1/3),this.g=Ya(o,r,t),this.b=Ya(o,r,t-1/3)}return te.toWorkingColorSpace(this,i),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=cd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}copyLinearToSRGB(t){return this.r=Na(t.r),this.g=Na(t.g),this.b=Na(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return te.fromWorkingColorSpace(Xe.copy(this),t),Math.round(Ee(Xe.r*255,0,255))*65536+Math.round(Ee(Xe.g*255,0,255))*256+Math.round(Ee(Xe.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Xe.copy(this),e);const n=Xe.r,i=Xe.g,r=Xe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=ke){te.fromWorkingColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,i=Xe.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(eo);const n=Ar(li.h,eo.h,e),i=Ar(li.s,eo.s,e),r=Ar(li.l,eo.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new Gt;Gt.NAMES=cd;let Im=0;class Ln extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=Pn(),this.name="",this.type="Material",this.blending=Ds,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=Fc,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=na,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oc&&(n.blendSrc=this.blendSrc),this.blendDst!==Fc&&(n.blendDst=this.blendDst),this.blendEquation!==Bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==na&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class _n extends Ln{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Gf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new P,no=new ut;class Ce{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return kl("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)no.fromBufferAttribute(this,e),no.applyMatrix3(t),this.setXY(e,no.x,no.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dl&&(t.usage=this.usage),t}}class ld extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ud extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class me extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Dm=0;const dn=new Ct,ja=new ve,cs=new P,on=new pe,rr=new pe,Ne=new P;class Oe extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?ud:ld)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,n){return dn.makeTranslation(t,e,n),this.applyMatrix4(dn),this}scale(t,e,n){return dn.makeScale(t,e,n),this.applyMatrix4(dn),this}lookAt(t){return ja.lookAt(t),ja.updateMatrix(),this.applyMatrix4(ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pe);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];on.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ue);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];rr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(on.min,rr.min),on.expandByPoint(Ne),Ne.addVectors(on.max,rr.max),on.expandByPoint(Ne)):(on.expandByPoint(rr.min),on.expandByPoint(rr.max))}on.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ne.fromBufferAttribute(a,l),c&&(cs.fromBufferAttribute(t,l),Ne.add(cs)),i=Math.max(i,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new P,c[C]=new P;const l=new P,u=new P,h=new P,f=new ut,d=new ut,g=new ut,_=new P,p=new P;function m(C,b,M){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,M),f.fromBufferAttribute(r,C),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,M),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(L),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[C].add(_),a[b].add(_),a[M].add(_),c[C].add(p),c[b].add(p),c[M].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,b=x.length;C<b;++C){const M=x[C],L=M.start,D=M.count;for(let N=L,O=L+D;N<O;N+=3)m(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const v=new P,y=new P,A=new P,S=new P;function E(C){A.fromBufferAttribute(i,C),S.copy(A);const b=a[C];v.copy(b),v.sub(A.multiplyScalar(A.dot(b))).normalize(),y.crossVectors(S,b);const L=y.dot(c[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,L)}for(let C=0,b=x.length;C<b;++C){const M=x[C],L=M.start,D=M.count;for(let N=L,O=L+D;N<O;N+=3)E(t.getX(N+0)),E(t.getX(N+1)),E(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new P,r=new P,o=new P,a=new P,c=new P,l=new P,u=new P,h=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let m=0;m<u;m++)f[g++]=l[d++]}return new Ce(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bu=new Ct,Li=new qi,io=new Ue,zu=new P,ls=new P,us=new P,hs=new P,Ka=new P,so=new P,ro=new ut,oo=new ut,ao=new ut,ku=new P,Hu=new P,Vu=new P,co=new P,lo=new P;class Zt extends ve{constructor(t=new Oe,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){so.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Ka.fromBufferAttribute(h,t),o?so.addScaledVector(Ka,u):so.addScaledVector(Ka.sub(e),u))}e.add(so)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),Li.copy(t.ray).recast(t.near),!(io.containsPoint(Li.origin)===!1&&(Li.intersectSphere(io,zu)===null||Li.origin.distanceToSquared(zu)>(t.far-t.near)**2))&&(Bu.copy(r).invert(),Li.copy(t.ray).applyMatrix4(Bu),!(n.boundingBox!==null&&Li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Li)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let y=x,A=v;y<A;y+=3){const S=a.getX(y),E=a.getX(y+1),C=a.getX(y+2);i=uo(this,m,t,n,l,u,h,S,E,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const x=a.getX(p),v=a.getX(p+1),y=a.getX(p+2);i=uo(this,o,t,n,l,u,h,x,v,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],m=o[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let y=x,A=v;y<A;y+=3){const S=y,E=y+1,C=y+2;i=uo(this,m,t,n,l,u,h,S,E,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const x=p,v=p+1,y=p+2;i=uo(this,o,t,n,l,u,h,x,v,y),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Nm(s,t,e,n,i,r,o,a){let c;if(t.side===Ve?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===In,a),c===null)return null;lo.copy(a),lo.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(lo);return l<e.near||l>e.far?null:{distance:l,point:lo.clone(),object:s}}function uo(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,ls),s.getVertexPosition(c,us),s.getVertexPosition(l,hs);const u=Nm(s,t,e,n,ls,us,hs,co);if(u){i&&(ro.fromBufferAttribute(i,a),oo.fromBufferAttribute(i,c),ao.fromBufferAttribute(i,l),u.uv=Ze.getInterpolation(co,ls,us,hs,ro,oo,ao,new ut)),r&&(ro.fromBufferAttribute(r,a),oo.fromBufferAttribute(r,c),ao.fromBufferAttribute(r,l),u.uv1=Ze.getInterpolation(co,ls,us,hs,ro,oo,ao,new ut)),o&&(ku.fromBufferAttribute(o,a),Hu.fromBufferAttribute(o,c),Vu.fromBufferAttribute(o,l),u.normal=Ze.getInterpolation(co,ls,us,hs,ku,Hu,Vu,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new P,materialIndex:0};Ze.getNormal(ls,us,hs,h.normal),u.face=h}return u}class Cn extends Oe{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new me(l,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(h,2));function g(_,p,m,x,v,y,A,S,E,C,b){const M=y/E,L=A/C,D=y/2,N=A/2,O=S/2,G=E+1,k=C+1;let Z=0,W=0;const ht=new P;for(let st=0;st<k;st++){const pt=st*L-N;for(let At=0;At<G;At++){const at=At*M-D;ht[_]=at*x,ht[p]=pt*v,ht[m]=O,l.push(ht.x,ht.y,ht.z),ht[_]=0,ht[p]=0,ht[m]=S>0?1:-1,u.push(ht.x,ht.y,ht.z),h.push(At/E),h.push(1-st/C),Z+=1}}for(let st=0;st<C;st++)for(let pt=0;pt<E;pt++){const At=f+pt+G*st,at=f+pt+G*(st+1),Y=f+(pt+1)+G*(st+1),H=f+(pt+1)+G*st;c.push(At,at,H),c.push(at,Y,H),W+=6}a.addGroup(d,W,b),d+=W,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ws(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ke(s){const t={};for(let e=0;e<s.length;e++){const n=Ws(s[e]);for(const i in n)t[i]=n[i]}return t}function Um(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function hd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const Om={clone:Ws,merge:Ke};var Fm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends Ln{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fm,this.fragmentShader=Bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=Um(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class fd extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ui=new P,Gu=new ut,Wu=new ut;class $e extends fd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Gs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,Gu,Wu),e.subVectors(Wu,Gu)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Er*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fs=-90,ds=1;class zm extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $e(fs,ds,t,e);i.layers=this.layers,this.add(i);const r=new $e(fs,ds,t,e);r.layers=this.layers,this.add(r);const o=new $e(fs,ds,t,e);o.layers=this.layers,this.add(o);const a=new $e(fs,ds,t,e);a.layers=this.layers,this.add(a);const c=new $e(fs,ds,t,e);c.layers=this.layers,this.add(c);const l=new $e(fs,ds,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===aa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dd extends Le{constructor(t,e,n,i,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Bs,super(t,e,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class km extends Wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new dd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ln}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Cn(5,5,5),r=new Ei({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Mi});r.uniforms.tEquirect.value=e;const o=new Zt(i,r),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=ln),new zm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const $a=new P,Hm=new P,Vm=new qt;class Un{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=$a.subVectors(n,e).cross(Hm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta($a),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vm.getNormalMatrix(t),i=this.coplanarPoint($a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ii=new Ue,ho=new P;class va{constructor(t=new Un,e=new Un,n=new Un,i=new Un,r=new Un,o=new Un){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],x=i[13],v=i[14],y=i[15];if(n[0].setComponents(c-r,f-l,p-d,y-m).normalize(),n[1].setComponents(c+r,f+l,p+d,y+m).normalize(),n[2].setComponents(c+o,f+u,p+g,y+x).normalize(),n[3].setComponents(c-o,f-u,p-g,y-x).normalize(),n[4].setComponents(c-a,f-h,p-_,y-v).normalize(),e===Qn)n[5].setComponents(c+a,f+h,p+_,y+v).normalize();else if(e===aa)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(t){return Ii.center.set(0,0,0),Ii.radius=.7071067811865476,Ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ho.x=i.normal.x>0?t.max.x:t.min.x,ho.y=i.normal.y>0?t.max.y:t.min.y,ho.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ho)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pd(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Gm(s){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c._updateRange,f=c.updateRanges;if(s.bindBuffer(l,a),h.count===-1&&f.length===0&&s.bufferSubData(l,0,u),f.length!==0){for(let d=0,g=f.length;d<g;d++){const _=f[d];s.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}h.count!==-1&&(s.bufferSubData(l,h.offset*u.BYTES_PER_ELEMENT,u,h.offset,h.count),h.count=-1),c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}class ya extends Oe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const x=m*f-o;for(let v=0;v<l;v++){const y=v*h-r;g.push(y,-x,0),_.push(0,0,1),p.push(v/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const v=x+l*m,y=x+l*(m+1),A=x+1+l*(m+1),S=x+1+l*m;d.push(v,y,S),d.push(y,A,S)}this.setIndex(d),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ya(t.width,t.height,t.widthSegments,t.heightSegments)}}var Wm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xm=`#ifdef USE_ALPHAHASH
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
#endif`,qm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$m=`#ifdef USE_AOMAP
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
#endif`,Zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jm=`#ifdef USE_BATCHING
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
#endif`,Qm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ng=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ig=`#ifdef USE_IRIDESCENCE
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
#endif`,sg=`#ifdef USE_BUMPMAP
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
#endif`,rg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,og=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,dg=`#define PI 3.141592653589793
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
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,pg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,mg=`vec3 transformedNormal = objectNormal;
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
#endif`,gg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_g=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mg=`
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
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Sg=`#ifdef USE_ENVMAP
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
#endif`,bg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tg=`#ifdef USE_ENVMAP
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
#endif`,Eg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ag=`#ifdef USE_ENVMAP
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
#endif`,wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lg=`#ifdef USE_GRADIENTMAP
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
}`,Ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ug=`uniform bool receiveShadow;
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
#endif`,Og=`#ifdef USE_ENVMAP
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
#endif`,Fg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hg=`PhysicalMaterial material;
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
#endif`,Vg=`struct PhysicalMaterial {
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
}`,Gg=`
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
#endif`,Wg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Xg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Qg=`#if defined( USE_POINTS_UV )
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
#endif`,t_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,e_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,i_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,s_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r_=`#ifdef USE_MORPHTARGETS
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
#endif`,o_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,a_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,c_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,l_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,f_=`#ifdef USE_NORMALMAP
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
#endif`,d_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,p_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,m_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,__=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,x_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,v_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,b_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,T_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,A_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,R_=`float getShadowMask() {
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
}`,C_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,P_=`#ifdef USE_SKINNING
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
#endif`,L_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,I_=`#ifdef USE_SKINNING
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
#endif`,D_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,N_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,U_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,O_=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,F_=`#ifdef USE_TRANSMISSION
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
#endif`,B_=`#ifdef USE_TRANSMISSION
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
#endif`,z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const G_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,W_=`uniform sampler2D t2D;
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
}`,X_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K_=`#include <common>
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
}`,$_=`#if DEPTH_PACKING == 3200
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
	#endif
}`,Z_=`#define DISTANCE
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
}`,J_=`#define DISTANCE
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
}`,Q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`uniform float scale;
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#include <common>
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#define LAMBERT
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
}`,o0=`#define LAMBERT
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
}`,a0=`#define MATCAP
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
}`,c0=`#define MATCAP
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
}`,l0=`#define NORMAL
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
}`,u0=`#define NORMAL
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
}`,h0=`#define PHONG
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
}`,f0=`#define PHONG
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
}`,d0=`#define STANDARD
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
}`,p0=`#define STANDARD
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
}`,m0=`#define TOON
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
}`,g0=`#define TOON
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
}`,_0=`uniform float size;
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
}`,x0=`uniform vec3 diffuse;
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
}`,v0=`#include <common>
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
}`,y0=`uniform vec3 color;
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
}`,M0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,S0=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Wm,alphahash_pars_fragment:Xm,alphamap_fragment:qm,alphamap_pars_fragment:Ym,alphatest_fragment:jm,alphatest_pars_fragment:Km,aomap_fragment:$m,aomap_pars_fragment:Zm,batching_pars_vertex:Jm,batching_vertex:Qm,begin_vertex:tg,beginnormal_vertex:eg,bsdfs:ng,iridescence_fragment:ig,bumpmap_pars_fragment:sg,clipping_planes_fragment:rg,clipping_planes_pars_fragment:og,clipping_planes_pars_vertex:ag,clipping_planes_vertex:cg,color_fragment:lg,color_pars_fragment:ug,color_pars_vertex:hg,color_vertex:fg,common:dg,cube_uv_reflection_fragment:pg,defaultnormal_vertex:mg,displacementmap_pars_vertex:gg,displacementmap_vertex:_g,emissivemap_fragment:xg,emissivemap_pars_fragment:vg,colorspace_fragment:yg,colorspace_pars_fragment:Mg,envmap_fragment:Sg,envmap_common_pars_fragment:bg,envmap_pars_fragment:Tg,envmap_pars_vertex:Eg,envmap_physical_pars_fragment:Og,envmap_vertex:Ag,fog_vertex:wg,fog_pars_vertex:Rg,fog_fragment:Cg,fog_pars_fragment:Pg,gradientmap_pars_fragment:Lg,lightmap_pars_fragment:Ig,lights_lambert_fragment:Dg,lights_lambert_pars_fragment:Ng,lights_pars_begin:Ug,lights_toon_fragment:Fg,lights_toon_pars_fragment:Bg,lights_phong_fragment:zg,lights_phong_pars_fragment:kg,lights_physical_fragment:Hg,lights_physical_pars_fragment:Vg,lights_fragment_begin:Gg,lights_fragment_maps:Wg,lights_fragment_end:Xg,logdepthbuf_fragment:qg,logdepthbuf_pars_fragment:Yg,logdepthbuf_pars_vertex:jg,logdepthbuf_vertex:Kg,map_fragment:$g,map_pars_fragment:Zg,map_particle_fragment:Jg,map_particle_pars_fragment:Qg,metalnessmap_fragment:t_,metalnessmap_pars_fragment:e_,morphinstance_vertex:n_,morphcolor_vertex:i_,morphnormal_vertex:s_,morphtarget_pars_vertex:r_,morphtarget_vertex:o_,normal_fragment_begin:a_,normal_fragment_maps:c_,normal_pars_fragment:l_,normal_pars_vertex:u_,normal_vertex:h_,normalmap_pars_fragment:f_,clearcoat_normal_fragment_begin:d_,clearcoat_normal_fragment_maps:p_,clearcoat_pars_fragment:m_,iridescence_pars_fragment:g_,opaque_fragment:__,packing:x_,premultiplied_alpha_fragment:v_,project_vertex:y_,dithering_fragment:M_,dithering_pars_fragment:S_,roughnessmap_fragment:b_,roughnessmap_pars_fragment:T_,shadowmap_pars_fragment:E_,shadowmap_pars_vertex:A_,shadowmap_vertex:w_,shadowmask_pars_fragment:R_,skinbase_vertex:C_,skinning_pars_vertex:P_,skinning_vertex:L_,skinnormal_vertex:I_,specularmap_fragment:D_,specularmap_pars_fragment:N_,tonemapping_fragment:U_,tonemapping_pars_fragment:O_,transmission_fragment:F_,transmission_pars_fragment:B_,uv_pars_fragment:z_,uv_pars_vertex:k_,uv_vertex:H_,worldpos_vertex:V_,background_vert:G_,background_frag:W_,backgroundCube_vert:X_,backgroundCube_frag:q_,cube_vert:Y_,cube_frag:j_,depth_vert:K_,depth_frag:$_,distanceRGBA_vert:Z_,distanceRGBA_frag:J_,equirect_vert:Q_,equirect_frag:t0,linedashed_vert:e0,linedashed_frag:n0,meshbasic_vert:i0,meshbasic_frag:s0,meshlambert_vert:r0,meshlambert_frag:o0,meshmatcap_vert:a0,meshmatcap_frag:c0,meshnormal_vert:l0,meshnormal_frag:u0,meshphong_vert:h0,meshphong_frag:f0,meshphysical_vert:d0,meshphysical_frag:p0,meshtoon_vert:m0,meshtoon_frag:g0,points_vert:_0,points_frag:x0,shadow_vert:v0,shadow_frag:y0,sprite_vert:M0,sprite_frag:S0},_t={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},On={basic:{uniforms:Ke([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ke([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ke([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ke([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ke([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ke([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ke([_t.points,_t.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ke([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ke([_t.common,_t.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ke([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ke([_t.sprite,_t.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Ke([_t.common,_t.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Ke([_t.lights,_t.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};On.physical={uniforms:Ke([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const fo={r:0,b:0,g:0},Di=new zn,b0=new Ct;function T0(s,t,e,n,i,r,o){const a=new Gt(0);let c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function _(x){let v=!1;const y=g(x);y===null?m(a,c):y&&y.isColor&&(m(y,1),v=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(x,v){const y=g(v);y&&(y.isCubeTexture||y.mapping===ga)?(u===void 0&&(u=new Zt(new Cn(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Ws(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Di.copy(v.backgroundRotation),Di.x*=-1,Di.y*=-1,Di.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(b0.makeRotationFromEuler(Di)),u.material.toneMapped=te.getTransfer(y.colorSpace)!==he,(h!==y||f!==y.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,d=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Zt(new ya(2,2),new Ei({name:"BackgroundMaterial",uniforms:Ws(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=te.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,d=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,v){x.getRGB(fo,hd(s)),n.buffers.color.setClear(fo.r,fo.g,fo.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(a,c)},render:_,addToRenderList:p}}function E0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let r=i,o=!1;function a(M,L,D,N,O){let G=!1;const k=h(N,D,L);r!==k&&(r=k,l(r.object)),G=d(M,N,D,O),G&&g(M,N,D,O),O!==null&&t.update(O,s.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,y(M,L,D,N),O!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function u(M){return s.deleteVertexArray(M)}function h(M,L,D){const N=D.wireframe===!0;let O=n[M.id];O===void 0&&(O={},n[M.id]=O);let G=O[L.id];G===void 0&&(G={},O[L.id]=G);let k=G[N];return k===void 0&&(k=f(c()),G[N]=k),k}function f(M){const L=[],D=[],N=[];for(let O=0;O<e;O++)L[O]=0,D[O]=0,N[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:D,attributeDivisors:N,object:M,attributes:{},index:null}}function d(M,L,D,N){const O=r.attributes,G=L.attributes;let k=0;const Z=D.getAttributes();for(const W in Z)if(Z[W].location>=0){const st=O[W];let pt=G[W];if(pt===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor)),st===void 0||st.attribute!==pt||pt&&st.data!==pt.data)return!0;k++}return r.attributesNum!==k||r.index!==N}function g(M,L,D,N){const O={},G=L.attributes;let k=0;const Z=D.getAttributes();for(const W in Z)if(Z[W].location>=0){let st=G[W];st===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(st=M.instanceColor));const pt={};pt.attribute=st,st&&st.data&&(pt.data=st.data),O[W]=pt,k++}r.attributes=O,r.attributesNum=k,r.index=N}function _(){const M=r.newAttributes;for(let L=0,D=M.length;L<D;L++)M[L]=0}function p(M){m(M,0)}function m(M,L){const D=r.newAttributes,N=r.enabledAttributes,O=r.attributeDivisors;D[M]=1,N[M]===0&&(s.enableVertexAttribArray(M),N[M]=1),O[M]!==L&&(s.vertexAttribDivisor(M,L),O[M]=L)}function x(){const M=r.newAttributes,L=r.enabledAttributes;for(let D=0,N=L.length;D<N;D++)L[D]!==M[D]&&(s.disableVertexAttribArray(D),L[D]=0)}function v(M,L,D,N,O,G,k){k===!0?s.vertexAttribIPointer(M,L,D,O,G):s.vertexAttribPointer(M,L,D,N,O,G)}function y(M,L,D,N){_();const O=N.attributes,G=D.getAttributes(),k=L.defaultAttributeValues;for(const Z in G){const W=G[Z];if(W.location>=0){let ht=O[Z];if(ht===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ht!==void 0){const st=ht.normalized,pt=ht.itemSize,At=t.get(ht);if(At===void 0)continue;const at=At.buffer,Y=At.type,H=At.bytesPerElement,ot=Y===s.INT||Y===s.UNSIGNED_INT||ht.gpuType===Ll;if(ht.isInterleavedBufferAttribute){const ct=ht.data,Ut=ct.stride,Ht=ht.offset;if(ct.isInstancedInterleavedBuffer){for(let Wt=0;Wt<W.locationSize;Wt++)m(W.location+Wt,ct.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Wt=0;Wt<W.locationSize;Wt++)p(W.location+Wt);s.bindBuffer(s.ARRAY_BUFFER,at);for(let Wt=0;Wt<W.locationSize;Wt++)v(W.location+Wt,pt/W.locationSize,Y,st,Ut*H,(Ht+pt/W.locationSize*Wt)*H,ot)}else{if(ht.isInstancedBufferAttribute){for(let ct=0;ct<W.locationSize;ct++)m(W.location+ct,ht.meshPerAttribute);M.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let ct=0;ct<W.locationSize;ct++)p(W.location+ct);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ct=0;ct<W.locationSize;ct++)v(W.location+ct,pt/W.locationSize,Y,st,pt*H,pt/W.locationSize*ct*H,ot)}}else if(k!==void 0){const st=k[Z];if(st!==void 0)switch(st.length){case 2:s.vertexAttrib2fv(W.location,st);break;case 3:s.vertexAttrib3fv(W.location,st);break;case 4:s.vertexAttrib4fv(W.location,st);break;default:s.vertexAttrib1fv(W.location,st)}}}}x()}function A(){C();for(const M in n){const L=n[M];for(const D in L){const N=L[D];for(const O in N)u(N[O].object),delete N[O];delete L[D]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const D in L){const N=L[D];for(const O in N)u(N[O].object),delete N[O];delete L[D]}delete n[M.id]}function E(M){for(const L in n){const D=n[L];if(D[M.id]===void 0)continue;const N=D[M.id];for(const O in N)u(N[O].object),delete N[O];delete D[M.id]}}function C(){b(),o=!0,r!==i&&(r=i,l(r.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:S,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:p,disableUnusedAttributes:x}}function A0(s,t,e){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_];for(let _=0;_<f.length;_++)e.update(g,n,f[_])}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function w0(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(S){return!(S!==en&&n.convert(S)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const E=S===Gr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==ei&&n.convert(S)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==un&&!E)}function c(S){if(S==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:d,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:m,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:y,maxSamples:A}}function R0(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Un,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,p=h.clipShadows,m=s.get(h);if(!i||g===null||g.length===0||r&&!p)r?u(null):l();else{const x=r?0:n,v=x*4;let y=m.clippingState||null;c.value=y,y=u(g,f,v,d);for(let A=0;A!==v;++A)y[A]=e[A];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=d+_*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,y=d;v!==_;++v,y+=4)o.copy(h[v]).applyMatrix4(x,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function C0(s){let t=new WeakMap;function e(o,a){return a===Bc?o.mapping=Bs:a===zc&&(o.mapping=zs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bc||a===zc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new km(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Vl extends fd{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rs=4,Xu=[.125,.215,.35,.446,.526,.582],zi=20,Za=new Vl,qu=new Gt;let Ja=null,Qa=0,tc=0,ec=!1;const Fi=(1+Math.sqrt(5))/2,ps=1/Fi,Yu=[new P(-Fi,ps,0),new P(Fi,ps,0),new P(-ps,0,Fi),new P(ps,0,Fi),new P(0,Fi,-ps),new P(0,Fi,ps),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class ca{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ku(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ja,Qa,tc),this._renderer.xr.enabled=ec,t.scissorTest=!1,po(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bs||t.mapping===zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ja=this._renderer.getRenderTarget(),Qa=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),ec=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Gr,format:en,colorSpace:Ge,depthBuffer:!1},i=ju(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ju(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P0(r)),this._blurMaterial=L0(r,t,e)}return i}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,Za)}_sceneToCubeUV(t,e,n,i){const a=new $e(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(qu),u.toneMapping=Si,u.autoClear=!1;const d=new _n({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new Zt(new Cn,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(qu),_=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):x===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const v=this._cubeSize;po(i,x*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Bs||t.mapping===zs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=$u()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ku());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;po(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Za)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Yu[(i-r-1)%Yu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Zt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*zi-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):zi;p>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${zi}`);const m=[];let x=0;for(let E=0;E<zi;++E){const C=E/_,b=Math.exp(-C*C/2);m.push(b),E===0?x+=b:E<p&&(x+=2*b)}for(let E=0;E<m.length;E++)m[E]=m[E]/x;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const y=this._sizeLods[i],A=3*y*(i>v-Rs?i-v+Rs:0),S=4*(this._cubeSize-y);po(e,A,S,3*y,2*y),c.setRenderTarget(e),c.render(h,Za)}}function P0(s){const t=[],e=[],n=[];let i=s;const r=s-Rs+1+Xu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Rs?c=Xu[o-s+Rs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*d),v=new Float32Array(p*g*d),y=new Float32Array(m*g*d);for(let S=0;S<d;S++){const E=S%3*2/3-1,C=S>2?0:-1,b=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];x.set(b,_*g*S),v.set(f,p*g*S);const M=[S,S,S,S,S,S];y.set(M,m*g*S)}const A=new Oe;A.setAttribute("position",new Ce(x,_)),A.setAttribute("uv",new Ce(v,p)),A.setAttribute("faceIndex",new Ce(y,m)),t.push(A),i>Rs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ju(s,t,e){const n=new Wi(s,t,e);return n.texture.mapping=ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function po(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function L0(s,t,e){const n=new Float32Array(zi),i=new P(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Gl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ku(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function $u(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Gl(){return`

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
	`}function I0(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Bc||c===zc,u=c===Bs||c===zs;if(l||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ca(s)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new ca(s)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function D0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&kl("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function N0(s,t,e,n){const i={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",o),delete i[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],s.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const x=d.array;_=d.version;for(let v=0,y=x.length;v<y;v+=3){const A=x[v+0],S=x[v+1],E=x[v+2];f.push(A,S,S,E,E,A)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const A=v+0,S=v+1,E=v+2;f.push(A,S,S,E,E,A)}}else return;const p=new(rd(f)?ud:ld)(f,1);p.version=_;const m=r.get(h);m&&t.remove(m),r.set(h,p)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function U0(s,t,e){let n;function i(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){s.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(s.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function h(f,d,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,g);let m=0;for(let x=0;x<g;x++)m+=d[x];for(let x=0;x<_.length;x++)e.update(m,n,_[x])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function O0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function F0(s,t,e){const n=new WeakMap,i=new ce;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var d=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),p===!0&&(y=3);let A=a.attributes.position.count*y,S=1;A>t.maxTextureSize&&(S=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const E=new Float32Array(A*S*4*h),C=new ad(E,A,S,h);C.type=un,C.needsUpdate=!0;const b=y*4;for(let L=0;L<h;L++){const D=m[L],N=x[L],O=v[L],G=A*S*4*L;for(let k=0;k<D.count;k++){const Z=k*b;g===!0&&(i.fromBufferAttribute(D,k),E[G+Z+0]=i.x,E[G+Z+1]=i.y,E[G+Z+2]=i.z,E[G+Z+3]=0),_===!0&&(i.fromBufferAttribute(N,k),E[G+Z+4]=i.x,E[G+Z+5]=i.y,E[G+Z+6]=i.z,E[G+Z+7]=0),p===!0&&(i.fromBufferAttribute(O,k),E[G+Z+8]=i.x,E[G+Z+9]=i.y,E[G+Z+10]=i.z,E[G+Z+11]=O.itemSize===4?i.w:1)}}f={count:h,texture:C,size:new ut(A,S)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function B0(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class md extends Le{constructor(t,e,n,i,r,o,a,c,l,u=Ns){if(u!==Ns&&u!==Vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ns&&(n=Ti),n===void 0&&u===Vs&&(n=Hs),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=c!==void 0?c:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const gd=new Le,Zu=new md(1,1),_d=new ad,xd=new Tm,vd=new dd,Ju=[],Qu=[],th=new Float32Array(16),eh=new Float32Array(9),nh=new Float32Array(4);function $s(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ju[i];if(r===void 0&&(r=new Float32Array(i),Ju[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ie(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function De(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ma(s,t){let e=Qu[t];e===void 0&&(e=new Int32Array(t),Qu[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function z0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function k0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;s.uniform2fv(this.addr,t),De(e,t)}}function H0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;s.uniform3fv(this.addr,t),De(e,t)}}function V0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;s.uniform4fv(this.addr,t),De(e,t)}}function G0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;nh.set(n),s.uniformMatrix2fv(this.addr,!1,nh),De(e,n)}}function W0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;eh.set(n),s.uniformMatrix3fv(this.addr,!1,eh),De(e,n)}}function X0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Ie(e,n))return;th.set(n),s.uniformMatrix4fv(this.addr,!1,th),De(e,n)}}function q0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Y0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;s.uniform2iv(this.addr,t),De(e,t)}}function j0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;s.uniform3iv(this.addr,t),De(e,t)}}function K0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;s.uniform4iv(this.addr,t),De(e,t)}}function $0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Z0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;s.uniform2uiv(this.addr,t),De(e,t)}}function J0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;s.uniform3uiv(this.addr,t),De(e,t)}}function Q0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;s.uniform4uiv(this.addr,t),De(e,t)}}function tx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Zu.compareFunction=id,r=Zu):r=gd,e.setTexture2D(t||r,i)}function ex(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||xd,i)}function nx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||vd,i)}function ix(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||_d,i)}function sx(s){switch(s){case 5126:return z0;case 35664:return k0;case 35665:return H0;case 35666:return V0;case 35674:return G0;case 35675:return W0;case 35676:return X0;case 5124:case 35670:return q0;case 35667:case 35671:return Y0;case 35668:case 35672:return j0;case 35669:case 35673:return K0;case 5125:return $0;case 36294:return Z0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return tx;case 35679:case 36299:case 36307:return ex;case 35680:case 36300:case 36308:case 36293:return nx;case 36289:case 36303:case 36311:case 36292:return ix}}function rx(s,t){s.uniform1fv(this.addr,t)}function ox(s,t){const e=$s(t,this.size,2);s.uniform2fv(this.addr,e)}function ax(s,t){const e=$s(t,this.size,3);s.uniform3fv(this.addr,e)}function cx(s,t){const e=$s(t,this.size,4);s.uniform4fv(this.addr,e)}function lx(s,t){const e=$s(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ux(s,t){const e=$s(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function hx(s,t){const e=$s(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function fx(s,t){s.uniform1iv(this.addr,t)}function dx(s,t){s.uniform2iv(this.addr,t)}function px(s,t){s.uniform3iv(this.addr,t)}function mx(s,t){s.uniform4iv(this.addr,t)}function gx(s,t){s.uniform1uiv(this.addr,t)}function _x(s,t){s.uniform2uiv(this.addr,t)}function xx(s,t){s.uniform3uiv(this.addr,t)}function vx(s,t){s.uniform4uiv(this.addr,t)}function yx(s,t,e){const n=this.cache,i=t.length,r=Ma(e,i);Ie(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||gd,r[o])}function Mx(s,t,e){const n=this.cache,i=t.length,r=Ma(e,i);Ie(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||xd,r[o])}function Sx(s,t,e){const n=this.cache,i=t.length,r=Ma(e,i);Ie(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||vd,r[o])}function bx(s,t,e){const n=this.cache,i=t.length,r=Ma(e,i);Ie(n,r)||(s.uniform1iv(this.addr,r),De(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||_d,r[o])}function Tx(s){switch(s){case 5126:return rx;case 35664:return ox;case 35665:return ax;case 35666:return cx;case 35674:return lx;case 35675:return ux;case 35676:return hx;case 5124:case 35670:return fx;case 35667:case 35671:return dx;case 35668:case 35672:return px;case 35669:case 35673:return mx;case 5125:return gx;case 36294:return _x;case 36295:return xx;case 36296:return vx;case 35678:case 36198:case 36298:case 36306:case 35682:return yx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return bx}}class Ex{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=sx(e.type)}}class Ax{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Tx(e.type)}}class wx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const nc=/(\w+)(\])?(\[|\.)?/g;function ih(s,t){s.seq.push(t),s.map[t.id]=t}function Rx(s,t,e){const n=s.name,i=n.length;for(nc.lastIndex=0;;){const r=nc.exec(n),o=nc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ih(e,l===void 0?new Ex(a,s,t):new Ax(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new wx(a),ih(e,h)),e=h}}}class Zo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Rx(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function sh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Cx=37297;let Px=0;function Lx(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Ix(s){const t=te.getPrimaries(te.workingColorSpace),e=te.getPrimaries(s);let n;switch(t===e?n="":t===oa&&e===ra?n="LinearDisplayP3ToLinearSRGB":t===ra&&e===oa&&(n="LinearSRGBToLinearDisplayP3"),s){case Ge:case xa:return[n,"LinearTransferOETF"];case ke:case Bl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function rh(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Lx(s.getShaderSource(t),o)}else return i}function Dx(s,t){const e=Ix(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Nx(s,t){let e;switch(t){case Op:e="Linear";break;case Fp:e="Reinhard";break;case Bp:e="OptimizedCineon";break;case Wf:e="ACESFilmic";break;case kp:e="AgX";break;case Hp:e="Neutral";break;case zp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Ux(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function Ox(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Fx(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Mr(s){return s!==""}function oh(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ah(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Bx=/^[ \t]*#include +<([\w\d./]+)>/gm;function pl(s){return s.replace(Bx,kx)}const zx=new Map;function kx(s,t){let e=Xt[t];if(e===void 0){const n=zx.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pl(e)}const Hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ch(s){return s.replace(Hx,Vx)}function Vx(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function lh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Gx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Vf?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===cp?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Kn&&(t="SHADOWMAP_TYPE_VSM"),t}function Wx(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Bs:case zs:t="ENVMAP_TYPE_CUBE";break;case ga:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Xx(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case zs:t="ENVMAP_MODE_REFRACTION";break}return t}function qx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Gf:t="ENVMAP_BLENDING_MULTIPLY";break;case Np:t="ENVMAP_BLENDING_MIX";break;case Up:t="ENVMAP_BLENDING_ADD";break}return t}function Yx(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function jx(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Gx(e),l=Wx(e),u=Xx(e),h=qx(e),f=Yx(e),d=Ux(e),g=Ox(r),_=i.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Mr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Mr).join(`
`),m.length>0&&(m+=`
`)):(p=[lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),m=[lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Si?Nx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,Dx("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Mr).join(`
`)),o=pl(o),o=oh(o,e),o=ah(o,e),a=pl(a),a=oh(a,e),a=ah(a,e),o=ch(o),a=ch(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Tu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Tu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+p+o,y=x+m+a,A=sh(i,i.VERTEX_SHADER,v),S=sh(i,i.FRAGMENT_SHADER,y);i.attachShader(_,A),i.attachShader(_,S),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(L){if(s.debug.checkShaderErrors){const D=i.getProgramInfoLog(_).trim(),N=i.getShaderInfoLog(A).trim(),O=i.getShaderInfoLog(S).trim();let G=!0,k=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,S);else{const Z=rh(i,A,"vertex"),W=rh(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+D+`
`+Z+`
`+W)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(N===""||O==="")&&(k=!1);k&&(L.diagnostics={runnable:G,programLog:D,vertexShader:{log:N,prefix:p},fragmentShader:{log:O,prefix:m}})}i.deleteShader(A),i.deleteShader(S),C=new Zo(i,_),b=Fx(i,_)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Cx)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Px++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=S,this}let Kx=0;class $x{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Zx(t),e.set(t,n)),n}}class Zx{constructor(t){this.id=Kx++,this.code=t,this.usedTimes=0}}function Jx(s,t,e,n,i,r,o){const a=new Hl,c=new $x,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function p(b,M,L,D,N){const O=D.fog,G=N.geometry,k=b.isMeshStandardMaterial?D.environment:null,Z=(b.isMeshStandardMaterial?e:t).get(b.envMap||k),W=Z&&Z.mapping===ga?Z.image.height:null,ht=g[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const st=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,pt=st!==void 0?st.length:0;let At=0;G.morphAttributes.position!==void 0&&(At=1),G.morphAttributes.normal!==void 0&&(At=2),G.morphAttributes.color!==void 0&&(At=3);let at,Y,H,ot;if(ht){const It=On[ht];at=It.vertexShader,Y=It.fragmentShader}else at=b.vertexShader,Y=b.fragmentShader,c.update(b),H=c.getVertexShaderID(b),ot=c.getFragmentShaderID(b);const ct=s.getRenderTarget(),Ut=N.isInstancedMesh===!0,Ht=N.isBatchedMesh===!0,Wt=!!b.map,re=!!b.matcap,U=!!Z,ee=!!b.aoMap,jt=!!b.lightMap,Jt=!!b.bumpMap,St=!!b.normalMap,le=!!b.displacementMap,Bt=!!b.emissiveMap,Ot=!!b.metalnessMap,I=!!b.roughnessMap,w=b.anisotropy>0,K=b.clearcoat>0,Q=b.dispersion>0,it=b.iridescence>0,tt=b.sheen>0,Et=b.transmission>0,dt=w&&!!b.anisotropyMap,gt=K&&!!b.clearcoatMap,zt=K&&!!b.clearcoatNormalMap,lt=K&&!!b.clearcoatRoughnessMap,xt=it&&!!b.iridescenceMap,Yt=it&&!!b.iridescenceThicknessMap,Pt=tt&&!!b.sheenColorMap,Mt=tt&&!!b.sheenRoughnessMap,Dt=!!b.specularMap,Ft=!!b.specularColorMap,ue=!!b.specularIntensityMap,T=Et&&!!b.transmissionMap,B=Et&&!!b.thicknessMap,X=!!b.gradientMap,q=!!b.alphaMap,et=b.alphaTest>0,vt=!!b.alphaHash,Lt=!!b.extensions;let Kt=Si;b.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(Kt=s.toneMapping);const mt={shaderID:ht,shaderType:b.type,shaderName:b.name,vertexShader:at,fragmentShader:Y,defines:b.defines,customVertexShaderID:H,customFragmentShaderID:ot,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Ht,batchingColor:Ht&&N._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&N.instanceColor!==null,instancingMorph:Ut&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ct===null?s.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Ge,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:re,envMap:U,envMapMode:U&&Z.mapping,envMapCubeUVHeight:W,aoMap:ee,lightMap:jt,bumpMap:Jt,normalMap:St,displacementMap:f&&le,emissiveMap:Bt,normalMapObjectSpace:St&&b.normalMapType===Yp,normalMapTangentSpace:St&&b.normalMapType===Fl,metalnessMap:Ot,roughnessMap:I,anisotropy:w,anisotropyMap:dt,clearcoat:K,clearcoatMap:gt,clearcoatNormalMap:zt,clearcoatRoughnessMap:lt,dispersion:Q,iridescence:it,iridescenceMap:xt,iridescenceThicknessMap:Yt,sheen:tt,sheenColorMap:Pt,sheenRoughnessMap:Mt,specularMap:Dt,specularColorMap:Ft,specularIntensityMap:ue,transmission:Et,transmissionMap:T,thicknessMap:B,gradientMap:X,opaque:b.transparent===!1&&b.blending===Ds&&b.alphaToCoverage===!1,alphaMap:q,alphaTest:et,alphaHash:vt,combine:b.combine,mapUv:Wt&&_(b.map.channel),aoMapUv:ee&&_(b.aoMap.channel),lightMapUv:jt&&_(b.lightMap.channel),bumpMapUv:Jt&&_(b.bumpMap.channel),normalMapUv:St&&_(b.normalMap.channel),displacementMapUv:le&&_(b.displacementMap.channel),emissiveMapUv:Bt&&_(b.emissiveMap.channel),metalnessMapUv:Ot&&_(b.metalnessMap.channel),roughnessMapUv:I&&_(b.roughnessMap.channel),anisotropyMapUv:dt&&_(b.anisotropyMap.channel),clearcoatMapUv:gt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:zt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(b.sheenRoughnessMap.channel),specularMapUv:Dt&&_(b.specularMap.channel),specularColorMapUv:Ft&&_(b.specularColorMap.channel),specularIntensityMapUv:ue&&_(b.specularIntensityMap.channel),transmissionMapUv:T&&_(b.transmissionMap.channel),thicknessMapUv:B&&_(b.thicknessMap.channel),alphaMapUv:q&&_(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(St||w),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!G.attributes.uv&&(Wt||q),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:N.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:At,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&te.getTransfer(b.map.colorSpace)===he,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===cn,flipSided:b.side===Ve,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Lt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&b.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return mt.vertexUv1s=l.has(1),mt.vertexUv2s=l.has(2),mt.vertexUv3s=l.has(3),l.clear(),mt}function m(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(x(M,b),v(M,b),M.push(s.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function x(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.doubleSided&&a.enable(10),M.flipSided&&a.enable(11),M.useDepthPacking&&a.enable(12),M.dithering&&a.enable(13),M.transmission&&a.enable(14),M.sheen&&a.enable(15),M.opaque&&a.enable(16),M.pointsUvs&&a.enable(17),M.decodeVideoTexture&&a.enable(18),M.alphaToCoverage&&a.enable(19),b.push(a.mask)}function y(b){const M=g[b.type];let L;if(M){const D=On[M];L=Om.clone(D.uniforms)}else L=b.uniforms;return L}function A(b,M){let L;for(let D=0,N=u.length;D<N;D++){const O=u[D];if(O.cacheKey===M){L=O,++L.usedTimes;break}}return L===void 0&&(L=new jx(s,M,b,r),u.push(L)),L}function S(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function E(b){c.remove(b)}function C(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:y,acquireProgram:A,releaseProgram:S,releaseShaderCache:E,programs:u,dispose:C}}function Qx(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function tv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function uh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function hh(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,p){let m=s[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:p},s[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=_,m.group=p),t++,m}function a(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function c(h,f,d,g,_,p){const m=o(h,f,d,g,_,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function l(h,f){e.length>1&&e.sort(h||tv),n.length>1&&n.sort(f||uh),i.length>1&&i.sort(f||uh)}function u(){for(let h=t,f=s.length;h<f;h++){const d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function ev(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new hh,s.set(n,[o])):i>=r.length?(o=new hh,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function nv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Gt};break;case"SpotLight":e={position:new P,direction:new P,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function iv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let sv=0;function rv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ov(s){const t=new nv,e=iv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,r=new Ct,o=new Ct;function a(l){let u=0,h=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,_=0,p=0,m=0,x=0,v=0,y=0,A=0,S=0,E=0;l.sort(rv);for(let b=0,M=l.length;b<M;b++){const L=l[b],D=L.color,N=L.intensity,O=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=D.r*N,h+=D.g*N,f+=D.b*N;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],N);E++}else if(L.isDirectionalLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Z=L.shadow,W=e.get(L);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=L.shadow.matrix,x++}n.directional[d]=k,d++}else if(L.isSpotLight){const k=t.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(D).multiplyScalar(N),k.distance=O,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[_]=k;const Z=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,Z.updateMatrices(L),L.castShadow&&S++),n.spotLightMatrix[_]=Z.matrix,L.castShadow){const W=e.get(L);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=G,y++}_++}else if(L.isRectAreaLight){const k=t.get(L);k.color.copy(D).multiplyScalar(N),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=k,p++}else if(L.isPointLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){const Z=L.shadow,W=e.get(L);W.shadowIntensity=Z.intensity,W.shadowBias=Z.bias,W.shadowNormalBias=Z.normalBias,W.shadowRadius=Z.radius,W.shadowMapSize=Z.mapSize,W.shadowCameraNear=Z.camera.near,W.shadowCameraFar=Z.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=k,g++}else if(L.isHemisphereLight){const k=t.get(L);k.skyColor.copy(L.color).multiplyScalar(N),k.groundColor.copy(L.groundColor).multiplyScalar(N),n.hemi[m]=k,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==y||C.numSpotMaps!==A||C.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+A-S,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=E,C.directionalLength=d,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=y,C.numSpotMaps=A,C.numLightProbes=E,n.version=sv++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0;const p=u.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const v=l[m];if(v.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),h++}else if(v.isSpotLight){const y=n.spot[d];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function fh(s){const t=new ov(s),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function av(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new fh(s),t.set(i,[a])):r>=o.length?(a=new fh(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class cv extends Ln{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class lv extends Ln{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hv=`uniform sampler2D shadow_pass;
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
}`;function fv(s,t,e){let n=new va;const i=new ut,r=new ut,o=new ce,a=new cv({depthPacking:qp}),c=new lv,l={},u=e.maxTextureSize,h={[In]:Ve,[Ve]:In,[cn]:cn},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:uv,fragmentShader:hv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Oe;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Zt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vf;let m=this.type;this.render=function(S,E,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;const b=s.getRenderTarget(),M=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),D=s.state;D.setBlending(Mi),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const N=m!==Kn&&this.type===Kn,O=m===Kn&&this.type!==Kn;for(let G=0,k=S.length;G<k;G++){const Z=S[G],W=Z.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const ht=W.getFrameExtents();if(i.multiply(ht),r.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ht.x),i.x=r.x*ht.x,W.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ht.y),i.y=r.y*ht.y,W.mapSize.y=r.y)),W.map===null||N===!0||O===!0){const pt=this.type!==Kn?{minFilter:Je,magFilter:Je}:{};W.map!==null&&W.map.dispose(),W.map=new Wi(i.x,i.y,pt),W.map.texture.name=Z.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const st=W.getViewportCount();for(let pt=0;pt<st;pt++){const At=W.getViewport(pt);o.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),D.viewport(o),W.updateMatrices(Z,pt),n=W.getFrustum(),y(E,C,W.camera,Z,this.type)}W.isPointLightShadow!==!0&&this.type===Kn&&x(W,C),W.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(b,M,L)};function x(S,E){const C=t.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Wi(i.x,i.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(E,null,C,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(E,null,C,d,_,null)}function v(S,E,C,b){let M=null;const L=C.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)M=L;else if(M=C.isPointLight===!0?c:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const D=M.uuid,N=E.uuid;let O=l[D];O===void 0&&(O={},l[D]=O);let G=O[N];G===void 0&&(G=M.clone(),O[N]=G,E.addEventListener("dispose",A)),M=G}if(M.visible=E.visible,M.wireframe=E.wireframe,b===Kn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:h[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const D=s.properties.get(M);D.light=C}return M}function y(S,E,C,b,M){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===Kn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,S.matrixWorld);const N=t.update(S),O=S.material;if(Array.isArray(O)){const G=N.groups;for(let k=0,Z=G.length;k<Z;k++){const W=G[k],ht=O[W.materialIndex];if(ht&&ht.visible){const st=v(S,ht,b,M);S.onBeforeShadow(s,S,E,C,N,st,W),s.renderBufferDirect(C,null,N,st,S,W),S.onAfterShadow(s,S,E,C,N,st,W)}}}else if(O.visible){const G=v(S,O,b,M);S.onBeforeShadow(s,S,E,C,N,G,null),s.renderBufferDirect(C,null,N,G,S,null),S.onAfterShadow(s,S,E,C,N,G,null)}}const D=S.children;for(let N=0,O=D.length;N<O;N++)y(D[N],E,C,b,M)}function A(S){S.target.removeEventListener("dispose",A);for(const C in l){const b=l[C],M=S.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function dv(s){function t(){let T=!1;const B=new ce;let X=null;const q=new ce(0,0,0,0);return{setMask:function(et){X!==et&&!T&&(s.colorMask(et,et,et,et),X=et)},setLocked:function(et){T=et},setClear:function(et,vt,Lt,Kt,mt){mt===!0&&(et*=Kt,vt*=Kt,Lt*=Kt),B.set(et,vt,Lt,Kt),q.equals(B)===!1&&(s.clearColor(et,vt,Lt,Kt),q.copy(B))},reset:function(){T=!1,X=null,q.set(-1,0,0,0)}}}function e(){let T=!1,B=null,X=null,q=null;return{setTest:function(et){et?ot(s.DEPTH_TEST):ct(s.DEPTH_TEST)},setMask:function(et){B!==et&&!T&&(s.depthMask(et),B=et)},setFunc:function(et){if(X!==et){switch(et){case wp:s.depthFunc(s.NEVER);break;case Rp:s.depthFunc(s.ALWAYS);break;case Cp:s.depthFunc(s.LESS);break;case na:s.depthFunc(s.LEQUAL);break;case Pp:s.depthFunc(s.EQUAL);break;case Lp:s.depthFunc(s.GEQUAL);break;case Ip:s.depthFunc(s.GREATER);break;case Dp:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}X=et}},setLocked:function(et){T=et},setClear:function(et){q!==et&&(s.clearDepth(et),q=et)},reset:function(){T=!1,B=null,X=null,q=null}}}function n(){let T=!1,B=null,X=null,q=null,et=null,vt=null,Lt=null,Kt=null,mt=null;return{setTest:function(It){T||(It?ot(s.STENCIL_TEST):ct(s.STENCIL_TEST))},setMask:function(It){B!==It&&!T&&(s.stencilMask(It),B=It)},setFunc:function(It,rt,Qt){(X!==It||q!==rt||et!==Qt)&&(s.stencilFunc(It,rt,Qt),X=It,q=rt,et=Qt)},setOp:function(It,rt,Qt){(vt!==It||Lt!==rt||Kt!==Qt)&&(s.stencilOp(It,rt,Qt),vt=It,Lt=rt,Kt=Qt)},setLocked:function(It){T=It},setClear:function(It){mt!==It&&(s.clearStencil(It),mt=It)},reset:function(){T=!1,B=null,X=null,q=null,et=null,vt=null,Lt=null,Kt=null,mt=null}}}const i=new t,r=new e,o=new n,a=new WeakMap,c=new WeakMap;let l={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,x=null,v=null,y=null,A=null,S=new Gt(0,0,0),E=0,C=!1,b=null,M=null,L=null,D=null,N=null;const O=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,k=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Z)[1]),G=k>=1):Z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),G=k>=2);let W=null,ht={};const st=s.getParameter(s.SCISSOR_BOX),pt=s.getParameter(s.VIEWPORT),At=new ce().fromArray(st),at=new ce().fromArray(pt);function Y(T,B,X,q){const et=new Uint8Array(4),vt=s.createTexture();s.bindTexture(T,vt),s.texParameteri(T,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(T,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Lt=0;Lt<X;Lt++)T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY?s.texImage3D(B,0,s.RGBA,1,1,q,0,s.RGBA,s.UNSIGNED_BYTE,et):s.texImage2D(B+Lt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,et);return vt}const H={};H[s.TEXTURE_2D]=Y(s.TEXTURE_2D,s.TEXTURE_2D,1),H[s.TEXTURE_CUBE_MAP]=Y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[s.TEXTURE_2D_ARRAY]=Y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),H[s.TEXTURE_3D]=Y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ot(s.DEPTH_TEST),r.setFunc(na),Jt(!1),St(mu),ot(s.CULL_FACE),ee(Mi);function ot(T){l[T]!==!0&&(s.enable(T),l[T]=!0)}function ct(T){l[T]!==!1&&(s.disable(T),l[T]=!1)}function Ut(T,B){return u[T]!==B?(s.bindFramebuffer(T,B),u[T]=B,T===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=B),T===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=B),!0):!1}function Ht(T,B){let X=f,q=!1;if(T){X=h.get(B),X===void 0&&(X=[],h.set(B,X));const et=T.textures;if(X.length!==et.length||X[0]!==s.COLOR_ATTACHMENT0){for(let vt=0,Lt=et.length;vt<Lt;vt++)X[vt]=s.COLOR_ATTACHMENT0+vt;X.length=et.length,q=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,q=!0);q&&s.drawBuffers(X)}function Wt(T){return d!==T?(s.useProgram(T),d=T,!0):!1}const re={[Bi]:s.FUNC_ADD,[up]:s.FUNC_SUBTRACT,[hp]:s.FUNC_REVERSE_SUBTRACT};re[fp]=s.MIN,re[dp]=s.MAX;const U={[pp]:s.ZERO,[mp]:s.ONE,[gp]:s.SRC_COLOR,[Oc]:s.SRC_ALPHA,[Sp]:s.SRC_ALPHA_SATURATE,[yp]:s.DST_COLOR,[xp]:s.DST_ALPHA,[_p]:s.ONE_MINUS_SRC_COLOR,[Fc]:s.ONE_MINUS_SRC_ALPHA,[Mp]:s.ONE_MINUS_DST_COLOR,[vp]:s.ONE_MINUS_DST_ALPHA,[bp]:s.CONSTANT_COLOR,[Tp]:s.ONE_MINUS_CONSTANT_COLOR,[Ep]:s.CONSTANT_ALPHA,[Ap]:s.ONE_MINUS_CONSTANT_ALPHA};function ee(T,B,X,q,et,vt,Lt,Kt,mt,It){if(T===Mi){g===!0&&(ct(s.BLEND),g=!1);return}if(g===!1&&(ot(s.BLEND),g=!0),T!==lp){if(T!==_||It!==C){if((p!==Bi||v!==Bi)&&(s.blendEquation(s.FUNC_ADD),p=Bi,v=Bi),It)switch(T){case Ds:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gu:s.blendFunc(s.ONE,s.ONE);break;case _u:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case xu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}else switch(T){case Ds:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case gu:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case _u:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case xu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",T);break}m=null,x=null,y=null,A=null,S.set(0,0,0),E=0,_=T,C=It}return}et=et||B,vt=vt||X,Lt=Lt||q,(B!==p||et!==v)&&(s.blendEquationSeparate(re[B],re[et]),p=B,v=et),(X!==m||q!==x||vt!==y||Lt!==A)&&(s.blendFuncSeparate(U[X],U[q],U[vt],U[Lt]),m=X,x=q,y=vt,A=Lt),(Kt.equals(S)===!1||mt!==E)&&(s.blendColor(Kt.r,Kt.g,Kt.b,mt),S.copy(Kt),E=mt),_=T,C=!1}function jt(T,B){T.side===cn?ct(s.CULL_FACE):ot(s.CULL_FACE);let X=T.side===Ve;B&&(X=!X),Jt(X),T.blending===Ds&&T.transparent===!1?ee(Mi):ee(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),r.setFunc(T.depthFunc),r.setTest(T.depthTest),r.setMask(T.depthWrite),i.setMask(T.colorWrite);const q=T.stencilWrite;o.setTest(q),q&&(o.setMask(T.stencilWriteMask),o.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),o.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass)),Bt(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function Jt(T){b!==T&&(T?s.frontFace(s.CW):s.frontFace(s.CCW),b=T)}function St(T){T!==op?(ot(s.CULL_FACE),T!==M&&(T===mu?s.cullFace(s.BACK):T===ap?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ct(s.CULL_FACE),M=T}function le(T){T!==L&&(G&&s.lineWidth(T),L=T)}function Bt(T,B,X){T?(ot(s.POLYGON_OFFSET_FILL),(D!==B||N!==X)&&(s.polygonOffset(B,X),D=B,N=X)):ct(s.POLYGON_OFFSET_FILL)}function Ot(T){T?ot(s.SCISSOR_TEST):ct(s.SCISSOR_TEST)}function I(T){T===void 0&&(T=s.TEXTURE0+O-1),W!==T&&(s.activeTexture(T),W=T)}function w(T,B,X){X===void 0&&(W===null?X=s.TEXTURE0+O-1:X=W);let q=ht[X];q===void 0&&(q={type:void 0,texture:void 0},ht[X]=q),(q.type!==T||q.texture!==B)&&(W!==X&&(s.activeTexture(X),W=X),s.bindTexture(T,B||H[T]),q.type=T,q.texture=B)}function K(){const T=ht[W];T!==void 0&&T.type!==void 0&&(s.bindTexture(T.type,null),T.type=void 0,T.texture=void 0)}function Q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function it(){try{s.compressedTexImage3D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function tt(){try{s.texSubImage2D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function dt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function gt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function zt(){try{s.texStorage2D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function lt(){try{s.texStorage3D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function xt(){try{s.texImage2D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Yt(){try{s.texImage3D.apply(s,arguments)}catch(T){console.error("THREE.WebGLState:",T)}}function Pt(T){At.equals(T)===!1&&(s.scissor(T.x,T.y,T.z,T.w),At.copy(T))}function Mt(T){at.equals(T)===!1&&(s.viewport(T.x,T.y,T.z,T.w),at.copy(T))}function Dt(T,B){let X=c.get(B);X===void 0&&(X=new WeakMap,c.set(B,X));let q=X.get(T);q===void 0&&(q=s.getUniformBlockIndex(B,T.name),X.set(T,q))}function Ft(T,B){const q=c.get(B).get(T);a.get(B)!==q&&(s.uniformBlockBinding(B,q,T.__bindingPointIndex),a.set(B,q))}function ue(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),l={},W=null,ht={},u={},h=new WeakMap,f=[],d=null,g=!1,_=null,p=null,m=null,x=null,v=null,y=null,A=null,S=new Gt(0,0,0),E=0,C=!1,b=null,M=null,L=null,D=null,N=null,At.set(0,0,s.canvas.width,s.canvas.height),at.set(0,0,s.canvas.width,s.canvas.height),i.reset(),r.reset(),o.reset()}return{buffers:{color:i,depth:r,stencil:o},enable:ot,disable:ct,bindFramebuffer:Ut,drawBuffers:Ht,useProgram:Wt,setBlending:ee,setMaterial:jt,setFlipSided:Jt,setCullFace:St,setLineWidth:le,setPolygonOffset:Bt,setScissorTest:Ot,activeTexture:I,bindTexture:w,unbindTexture:K,compressedTexImage2D:Q,compressedTexImage3D:it,texImage2D:xt,texImage3D:Yt,updateUBOMapping:Dt,uniformBlockBinding:Ft,texStorage2D:zt,texStorage3D:lt,texSubImage2D:tt,texSubImage3D:Et,compressedTexSubImage2D:dt,compressedTexSubImage3D:gt,scissor:Pt,viewport:Mt,reset:ue}}function dh(s,t,e,n){const i=pv(n);switch(e){case $f:return s*t;case Jf:return s*t;case Qf:return s*t*2;case Nl:return s*t/i.components*i.byteLength;case _a:return s*t/i.components*i.byteLength;case td:return s*t*2/i.components*i.byteLength;case Ul:return s*t*2/i.components*i.byteLength;case Zf:return s*t*3/i.components*i.byteLength;case en:return s*t*4/i.components*i.byteLength;case Ol:return s*t*4/i.components*i.byteLength;case qo:case Yo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case jo:case Ko:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Hc:case Gc:return Math.max(s,16)*Math.max(t,8)/4;case kc:case Vc:return Math.max(s,8)*Math.max(t,8)/2;case Wc:case Xc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case qc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Yc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case jc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Kc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case $c:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Zc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Jc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Qc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case tl:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case el:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case nl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case il:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case sl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case rl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ol:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case $o:case al:case cl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ed:case ll:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ul:case hl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pv(s){switch(s){case ei:case Yf:return{byteLength:1,components:1};case Ur:case jf:case Gr:return{byteLength:2,components:1};case Il:case Dl:return{byteLength:2,components:4};case Ti:case Ll:case un:return{byteLength:4,components:1};case Kf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function mv(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ut,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,w){return d?new OffscreenCanvas(I,w):Br("canvas")}function _(I,w,K){let Q=1;const it=Ot(I);if((it.width>K||it.height>K)&&(Q=K/Math.max(it.width,it.height)),Q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const tt=Math.floor(Q*it.width),Et=Math.floor(Q*it.height);h===void 0&&(h=g(tt,Et));const dt=w?g(tt,Et):h;return dt.width=tt,dt.height=Et,dt.getContext("2d").drawImage(I,0,0,tt,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+tt+"x"+Et+")."),dt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),I;return I}function p(I){return I.generateMipmaps&&I.minFilter!==Je&&I.minFilter!==ln}function m(I){s.generateMipmap(I)}function x(I,w,K,Q,it=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let tt=w;if(w===s.RED&&(K===s.FLOAT&&(tt=s.R32F),K===s.HALF_FLOAT&&(tt=s.R16F),K===s.UNSIGNED_BYTE&&(tt=s.R8)),w===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.R8UI),K===s.UNSIGNED_SHORT&&(tt=s.R16UI),K===s.UNSIGNED_INT&&(tt=s.R32UI),K===s.BYTE&&(tt=s.R8I),K===s.SHORT&&(tt=s.R16I),K===s.INT&&(tt=s.R32I)),w===s.RG&&(K===s.FLOAT&&(tt=s.RG32F),K===s.HALF_FLOAT&&(tt=s.RG16F),K===s.UNSIGNED_BYTE&&(tt=s.RG8)),w===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.RG8UI),K===s.UNSIGNED_SHORT&&(tt=s.RG16UI),K===s.UNSIGNED_INT&&(tt=s.RG32UI),K===s.BYTE&&(tt=s.RG8I),K===s.SHORT&&(tt=s.RG16I),K===s.INT&&(tt=s.RG32I)),w===s.RGB&&K===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),w===s.RGBA){const Et=it?sa:te.getTransfer(Q);K===s.FLOAT&&(tt=s.RGBA32F),K===s.HALF_FLOAT&&(tt=s.RGBA16F),K===s.UNSIGNED_BYTE&&(tt=Et===he?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function v(I,w){let K;return I?w===null||w===Ti||w===Hs?K=s.DEPTH24_STENCIL8:w===un?K=s.DEPTH32F_STENCIL8:w===Ur&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ti||w===Hs?K=s.DEPTH_COMPONENT24:w===un?K=s.DEPTH_COMPONENT32F:w===Ur&&(K=s.DEPTH_COMPONENT16),K}function y(I,w){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Je&&I.minFilter!==ln?Math.log2(Math.max(w.width,w.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?w.mipmaps.length:1}function A(I){const w=I.target;w.removeEventListener("dispose",A),E(w),w.isVideoTexture&&u.delete(w)}function S(I){const w=I.target;w.removeEventListener("dispose",S),b(w)}function E(I){const w=n.get(I);if(w.__webglInit===void 0)return;const K=I.source,Q=f.get(K);if(Q){const it=Q[w.__cacheKey];it.usedTimes--,it.usedTimes===0&&C(I),Object.keys(Q).length===0&&f.delete(K)}n.remove(I)}function C(I){const w=n.get(I);s.deleteTexture(w.__webglTexture);const K=I.source,Q=f.get(K);delete Q[w.__cacheKey],o.memory.textures--}function b(I){const w=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(w.__webglFramebuffer[Q]))for(let it=0;it<w.__webglFramebuffer[Q].length;it++)s.deleteFramebuffer(w.__webglFramebuffer[Q][it]);else s.deleteFramebuffer(w.__webglFramebuffer[Q]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[Q])}else{if(Array.isArray(w.__webglFramebuffer))for(let Q=0;Q<w.__webglFramebuffer.length;Q++)s.deleteFramebuffer(w.__webglFramebuffer[Q]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Q=0;Q<w.__webglColorRenderbuffer.length;Q++)w.__webglColorRenderbuffer[Q]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[Q]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const K=I.textures;for(let Q=0,it=K.length;Q<it;Q++){const tt=n.get(K[Q]);tt.__webglTexture&&(s.deleteTexture(tt.__webglTexture),o.memory.textures--),n.remove(K[Q])}n.remove(I)}let M=0;function L(){M=0}function D(){const I=M;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),M+=1,I}function N(I){const w=[];return w.push(I.wrapS),w.push(I.wrapT),w.push(I.wrapR||0),w.push(I.magFilter),w.push(I.minFilter),w.push(I.anisotropy),w.push(I.internalFormat),w.push(I.format),w.push(I.type),w.push(I.generateMipmaps),w.push(I.premultiplyAlpha),w.push(I.flipY),w.push(I.unpackAlignment),w.push(I.colorSpace),w.join()}function O(I,w){const K=n.get(I);if(I.isVideoTexture&&le(I),I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){const Q=I.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(K,I,w);return}}e.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+w)}function G(I,w){const K=n.get(I);if(I.version>0&&K.__version!==I.version){at(K,I,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+w)}function k(I,w){const K=n.get(I);if(I.version>0&&K.__version!==I.version){at(K,I,w);return}e.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+w)}function Z(I,w){const K=n.get(I);if(I.version>0&&K.__version!==I.version){Y(K,I,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+w)}const W={[ks]:s.REPEAT,[gi]:s.CLAMP_TO_EDGE,[ia]:s.MIRRORED_REPEAT},ht={[Je]:s.NEAREST,[qf]:s.NEAREST_MIPMAP_NEAREST,[yr]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[Xo]:s.LINEAR_MIPMAP_NEAREST,[Jn]:s.LINEAR_MIPMAP_LINEAR},st={[jp]:s.NEVER,[tm]:s.ALWAYS,[Kp]:s.LESS,[id]:s.LEQUAL,[$p]:s.EQUAL,[Qp]:s.GEQUAL,[Zp]:s.GREATER,[Jp]:s.NOTEQUAL};function pt(I,w){if(w.type===un&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===ln||w.magFilter===Xo||w.magFilter===yr||w.magFilter===Jn||w.minFilter===ln||w.minFilter===Xo||w.minFilter===yr||w.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,W[w.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,W[w.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,W[w.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,ht[w.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,ht[w.minFilter]),w.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,st[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Je||w.minFilter!==yr&&w.minFilter!==Jn||w.type===un&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");s.texParameterf(I,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function At(I,w){let K=!1;I.__webglInit===void 0&&(I.__webglInit=!0,w.addEventListener("dispose",A));const Q=w.source;let it=f.get(Q);it===void 0&&(it={},f.set(Q,it));const tt=N(w);if(tt!==I.__cacheKey){it[tt]===void 0&&(it[tt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,K=!0),it[tt].usedTimes++;const Et=it[I.__cacheKey];Et!==void 0&&(it[I.__cacheKey].usedTimes--,Et.usedTimes===0&&C(w)),I.__cacheKey=tt,I.__webglTexture=it[tt].texture}return K}function at(I,w,K){let Q=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Q=s.TEXTURE_3D);const it=At(I,w),tt=w.source;e.bindTexture(Q,I.__webglTexture,s.TEXTURE0+K);const Et=n.get(tt);if(tt.version!==Et.__version||it===!0){e.activeTexture(s.TEXTURE0+K);const dt=te.getPrimaries(te.workingColorSpace),gt=w.colorSpace===mi?null:te.getPrimaries(w.colorSpace),zt=w.colorSpace===mi||dt===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let lt=_(w.image,!1,i.maxTextureSize);lt=Bt(w,lt);const xt=r.convert(w.format,w.colorSpace),Yt=r.convert(w.type);let Pt=x(w.internalFormat,xt,Yt,w.colorSpace,w.isVideoTexture);pt(Q,w);let Mt;const Dt=w.mipmaps,Ft=w.isVideoTexture!==!0,ue=Et.__version===void 0||it===!0,T=tt.dataReady,B=y(w,lt);if(w.isDepthTexture)Pt=v(w.format===Vs,w.type),ue&&(Ft?e.texStorage2D(s.TEXTURE_2D,1,Pt,lt.width,lt.height):e.texImage2D(s.TEXTURE_2D,0,Pt,lt.width,lt.height,0,xt,Yt,null));else if(w.isDataTexture)if(Dt.length>0){Ft&&ue&&e.texStorage2D(s.TEXTURE_2D,B,Pt,Dt[0].width,Dt[0].height);for(let X=0,q=Dt.length;X<q;X++)Mt=Dt[X],Ft?T&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,xt,Yt,Mt.data):e.texImage2D(s.TEXTURE_2D,X,Pt,Mt.width,Mt.height,0,xt,Yt,Mt.data);w.generateMipmaps=!1}else Ft?(ue&&e.texStorage2D(s.TEXTURE_2D,B,Pt,lt.width,lt.height),T&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,lt.width,lt.height,xt,Yt,lt.data)):e.texImage2D(s.TEXTURE_2D,0,Pt,lt.width,lt.height,0,xt,Yt,lt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ft&&ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,B,Pt,Dt[0].width,Dt[0].height,lt.depth);for(let X=0,q=Dt.length;X<q;X++)if(Mt=Dt[X],w.format!==en)if(xt!==null)if(Ft){if(T)if(w.layerUpdates.size>0){const et=dh(Mt.width,Mt.height,w.format,w.type);for(const vt of w.layerUpdates){const Lt=Mt.data.subarray(vt*et/Mt.data.BYTES_PER_ELEMENT,(vt+1)*et/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,vt,Mt.width,Mt.height,1,xt,Lt,0,0)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,Mt.width,Mt.height,lt.depth,xt,Mt.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Pt,Mt.width,Mt.height,lt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?T&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,Mt.width,Mt.height,lt.depth,xt,Yt,Mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Pt,Mt.width,Mt.height,lt.depth,0,xt,Yt,Mt.data)}else{Ft&&ue&&e.texStorage2D(s.TEXTURE_2D,B,Pt,Dt[0].width,Dt[0].height);for(let X=0,q=Dt.length;X<q;X++)Mt=Dt[X],w.format!==en?xt!==null?Ft?T&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,xt,Mt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Pt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?T&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt.width,Mt.height,xt,Yt,Mt.data):e.texImage2D(s.TEXTURE_2D,X,Pt,Mt.width,Mt.height,0,xt,Yt,Mt.data)}else if(w.isDataArrayTexture)if(Ft){if(ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,B,Pt,lt.width,lt.height,lt.depth),T)if(w.layerUpdates.size>0){const X=dh(lt.width,lt.height,w.format,w.type);for(const q of w.layerUpdates){const et=lt.data.subarray(q*X/lt.data.BYTES_PER_ELEMENT,(q+1)*X/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,q,lt.width,lt.height,1,xt,Yt,et)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,xt,Yt,lt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Pt,lt.width,lt.height,lt.depth,0,xt,Yt,lt.data);else if(w.isData3DTexture)Ft?(ue&&e.texStorage3D(s.TEXTURE_3D,B,Pt,lt.width,lt.height,lt.depth),T&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,xt,Yt,lt.data)):e.texImage3D(s.TEXTURE_3D,0,Pt,lt.width,lt.height,lt.depth,0,xt,Yt,lt.data);else if(w.isFramebufferTexture){if(ue)if(Ft)e.texStorage2D(s.TEXTURE_2D,B,Pt,lt.width,lt.height);else{let X=lt.width,q=lt.height;for(let et=0;et<B;et++)e.texImage2D(s.TEXTURE_2D,et,Pt,X,q,0,xt,Yt,null),X>>=1,q>>=1}}else if(Dt.length>0){if(Ft&&ue){const X=Ot(Dt[0]);e.texStorage2D(s.TEXTURE_2D,B,Pt,X.width,X.height)}for(let X=0,q=Dt.length;X<q;X++)Mt=Dt[X],Ft?T&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,xt,Yt,Mt):e.texImage2D(s.TEXTURE_2D,X,Pt,xt,Yt,Mt);w.generateMipmaps=!1}else if(Ft){if(ue){const X=Ot(lt);e.texStorage2D(s.TEXTURE_2D,B,Pt,X.width,X.height)}T&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,Yt,lt)}else e.texImage2D(s.TEXTURE_2D,0,Pt,xt,Yt,lt);p(w)&&m(Q),Et.__version=tt.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function Y(I,w,K){if(w.image.length!==6)return;const Q=At(I,w),it=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+K);const tt=n.get(it);if(it.version!==tt.__version||Q===!0){e.activeTexture(s.TEXTURE0+K);const Et=te.getPrimaries(te.workingColorSpace),dt=w.colorSpace===mi?null:te.getPrimaries(w.colorSpace),gt=w.colorSpace===mi||Et===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const zt=w.isCompressedTexture||w.image[0].isCompressedTexture,lt=w.image[0]&&w.image[0].isDataTexture,xt=[];for(let q=0;q<6;q++)!zt&&!lt?xt[q]=_(w.image[q],!0,i.maxCubemapSize):xt[q]=lt?w.image[q].image:w.image[q],xt[q]=Bt(w,xt[q]);const Yt=xt[0],Pt=r.convert(w.format,w.colorSpace),Mt=r.convert(w.type),Dt=x(w.internalFormat,Pt,Mt,w.colorSpace),Ft=w.isVideoTexture!==!0,ue=tt.__version===void 0||Q===!0,T=it.dataReady;let B=y(w,Yt);pt(s.TEXTURE_CUBE_MAP,w);let X;if(zt){Ft&&ue&&e.texStorage2D(s.TEXTURE_CUBE_MAP,B,Dt,Yt.width,Yt.height);for(let q=0;q<6;q++){X=xt[q].mipmaps;for(let et=0;et<X.length;et++){const vt=X[et];w.format!==en?Pt!==null?Ft?T&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,vt.width,vt.height,Pt,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Dt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?T&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,0,0,vt.width,vt.height,Pt,Mt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et,Dt,vt.width,vt.height,0,Pt,Mt,vt.data)}}}else{if(X=w.mipmaps,Ft&&ue){X.length>0&&B++;const q=Ot(xt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,B,Dt,q.width,q.height)}for(let q=0;q<6;q++)if(lt){Ft?T&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,xt[q].width,xt[q].height,Pt,Mt,xt[q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Dt,xt[q].width,xt[q].height,0,Pt,Mt,xt[q].data);for(let et=0;et<X.length;et++){const Lt=X[et].image[q].image;Ft?T&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Lt.width,Lt.height,Pt,Mt,Lt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Dt,Lt.width,Lt.height,0,Pt,Mt,Lt.data)}}else{Ft?T&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Pt,Mt,xt[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Dt,Pt,Mt,xt[q]);for(let et=0;et<X.length;et++){const vt=X[et];Ft?T&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,0,0,Pt,Mt,vt.image[q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et+1,Dt,Pt,Mt,vt.image[q])}}}p(w)&&m(s.TEXTURE_CUBE_MAP),tt.__version=it.version,w.onUpdate&&w.onUpdate(w)}I.__version=w.version}function H(I,w,K,Q,it,tt){const Et=r.convert(K.format,K.colorSpace),dt=r.convert(K.type),gt=x(K.internalFormat,Et,dt,K.colorSpace);if(!n.get(w).__hasExternalTextures){const lt=Math.max(1,w.width>>tt),xt=Math.max(1,w.height>>tt);it===s.TEXTURE_3D||it===s.TEXTURE_2D_ARRAY?e.texImage3D(it,tt,gt,lt,xt,w.depth,0,Et,dt,null):e.texImage2D(it,tt,gt,lt,xt,0,Et,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),St(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,it,n.get(K).__webglTexture,0,Jt(w)):(it===s.TEXTURE_2D||it>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,it,n.get(K).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(I,w,K){if(s.bindRenderbuffer(s.RENDERBUFFER,I),w.depthBuffer){const Q=w.depthTexture,it=Q&&Q.isDepthTexture?Q.type:null,tt=v(w.stencilBuffer,it),Et=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=Jt(w);St(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,tt,w.width,w.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,tt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,tt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,I)}else{const Q=w.textures;for(let it=0;it<Q.length;it++){const tt=Q[it],Et=r.convert(tt.format,tt.colorSpace),dt=r.convert(tt.type),gt=x(tt.internalFormat,Et,dt,tt.colorSpace),zt=Jt(w);K&&St(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,zt,gt,w.width,w.height):St(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,zt,gt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,gt,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ct(I,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),O(w.depthTexture,0);const Q=n.get(w.depthTexture).__webglTexture,it=Jt(w);if(w.depthTexture.format===Ns)St(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,it):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(w.depthTexture.format===Vs)St(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,it):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ut(I){const w=n.get(I),K=I.isWebGLCubeRenderTarget===!0;if(I.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");ct(w.__webglFramebuffer,I)}else if(K){w.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[Q]),w.__webglDepthbuffer[Q]=s.createRenderbuffer(),ot(w.__webglDepthbuffer[Q],I,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),ot(w.__webglDepthbuffer,I,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(I,w,K){const Q=n.get(I);w!==void 0&&H(Q.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&Ut(I)}function Wt(I){const w=I.texture,K=n.get(I),Q=n.get(w);I.addEventListener("dispose",S);const it=I.textures,tt=I.isWebGLCubeRenderTarget===!0,Et=it.length>1;if(Et||(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=w.version,o.memory.textures++),tt){K.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[dt]=[];for(let gt=0;gt<w.mipmaps.length;gt++)K.__webglFramebuffer[dt][gt]=s.createFramebuffer()}else K.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let dt=0;dt<w.mipmaps.length;dt++)K.__webglFramebuffer[dt]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(Et)for(let dt=0,gt=it.length;dt<gt;dt++){const zt=n.get(it[dt]);zt.__webglTexture===void 0&&(zt.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&St(I)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let dt=0;dt<it.length;dt++){const gt=it[dt];K.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[dt]);const zt=r.convert(gt.format,gt.colorSpace),lt=r.convert(gt.type),xt=x(gt.internalFormat,zt,lt,gt.colorSpace,I.isXRRenderTarget===!0),Yt=Jt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,xt,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,K.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(K.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(tt){e.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),pt(s.TEXTURE_CUBE_MAP,w);for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0)for(let gt=0;gt<w.mipmaps.length;gt++)H(K.__webglFramebuffer[dt][gt],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,gt);else H(K.__webglFramebuffer[dt],I,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);p(w)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let dt=0,gt=it.length;dt<gt;dt++){const zt=it[dt],lt=n.get(zt);e.bindTexture(s.TEXTURE_2D,lt.__webglTexture),pt(s.TEXTURE_2D,zt),H(K.__webglFramebuffer,I,zt,s.COLOR_ATTACHMENT0+dt,s.TEXTURE_2D,0),p(zt)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(dt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,Q.__webglTexture),pt(dt,w),w.mipmaps&&w.mipmaps.length>0)for(let gt=0;gt<w.mipmaps.length;gt++)H(K.__webglFramebuffer[gt],I,w,s.COLOR_ATTACHMENT0,dt,gt);else H(K.__webglFramebuffer,I,w,s.COLOR_ATTACHMENT0,dt,0);p(w)&&m(dt),e.unbindTexture()}I.depthBuffer&&Ut(I)}function re(I){const w=I.textures;for(let K=0,Q=w.length;K<Q;K++){const it=w[K];if(p(it)){const tt=I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Et=n.get(it).__webglTexture;e.bindTexture(tt,Et),m(tt),e.unbindTexture()}}}const U=[],ee=[];function jt(I){if(I.samples>0){if(St(I)===!1){const w=I.textures,K=I.width,Q=I.height;let it=s.COLOR_BUFFER_BIT;const tt=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(I),dt=w.length>1;if(dt)for(let gt=0;gt<w.length;gt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let gt=0;gt<w.length;gt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(it|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(it|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[gt]);const zt=n.get(w[gt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,zt,0)}s.blitFramebuffer(0,0,K,Q,0,0,K,Q,it,s.NEAREST),c===!0&&(U.length=0,ee.length=0,U.push(s.COLOR_ATTACHMENT0+gt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(U.push(tt),ee.push(tt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ee)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,U))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let gt=0;gt<w.length;gt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[gt]);const zt=n.get(w[gt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,zt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const w=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function Jt(I){return Math.min(i.maxSamples,I.samples)}function St(I){const w=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function le(I){const w=o.render.frame;u.get(I)!==w&&(u.set(I,w),I.update())}function Bt(I,w){const K=I.colorSpace,Q=I.format,it=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||K!==Ge&&K!==mi&&(te.getTransfer(K)===he?(Q!==en||it!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function Ot(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=L,this.setTexture2D=O,this.setTexture2DArray=G,this.setTexture3D=k,this.setTextureCube=Z,this.rebindTextures=Ht,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=H,this.useMultisampledRTT=St}function gv(s,t){function e(n,i=mi){let r;const o=te.getTransfer(i);if(n===ei)return s.UNSIGNED_BYTE;if(n===Il)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Dl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Kf)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Yf)return s.BYTE;if(n===jf)return s.SHORT;if(n===Ur)return s.UNSIGNED_SHORT;if(n===Ll)return s.INT;if(n===Ti)return s.UNSIGNED_INT;if(n===un)return s.FLOAT;if(n===Gr)return s.HALF_FLOAT;if(n===$f)return s.ALPHA;if(n===Zf)return s.RGB;if(n===en)return s.RGBA;if(n===Jf)return s.LUMINANCE;if(n===Qf)return s.LUMINANCE_ALPHA;if(n===Ns)return s.DEPTH_COMPONENT;if(n===Vs)return s.DEPTH_STENCIL;if(n===Nl)return s.RED;if(n===_a)return s.RED_INTEGER;if(n===td)return s.RG;if(n===Ul)return s.RG_INTEGER;if(n===Ol)return s.RGBA_INTEGER;if(n===qo||n===Yo||n===jo||n===Ko)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Yo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kc||n===Hc||n===Vc||n===Gc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===kc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wc||n===Xc||n===qc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wc||n===Xc)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Yc||n===jc||n===Kc||n===$c||n===Zc||n===Jc||n===Qc||n===tl||n===el||n===nl||n===il||n===sl||n===rl||n===ol)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Yc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Kc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$c)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qc)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===tl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===el)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===il)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rl)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$o||n===al||n===cl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$o)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ed||n===ll||n===ul||n===hl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class _v extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class _i extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xv={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _i,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _i,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _i,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xv)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new _i;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const vv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yv=`
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

}`;class Mv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Le,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ei({vertexShader:vv,fragmentShader:yv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new ya(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sv extends Xi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const _=new Mv,p=e.getContextAttributes();let m=null,x=null;const v=[],y=[],A=new ut;let S=null;const E=new $e;E.layers.enable(1),E.viewport=new ce;const C=new $e;C.layers.enable(2),C.viewport=new ce;const b=[E,C],M=new _v;M.layers.enable(1),M.layers.enable(2);let L=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let H=v[Y];return H===void 0&&(H=new ic,v[Y]=H),H.getTargetRaySpace()},this.getControllerGrip=function(Y){let H=v[Y];return H===void 0&&(H=new ic,v[Y]=H),H.getGripSpace()},this.getHand=function(Y){let H=v[Y];return H===void 0&&(H=new ic,v[Y]=H),H.getHandSpace()};function N(Y){const H=y.indexOf(Y.inputSource);if(H===-1)return;const ot=v[H];ot!==void 0&&(ot.update(Y.inputSource,Y.frame,l||o),ot.dispatchEvent({type:Y.type,data:Y.inputSource}))}function O(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",O),i.removeEventListener("inputsourceschange",G);for(let Y=0;Y<v.length;Y++){const H=y[Y];H!==null&&(y[Y]=null,v[Y].disconnect(H))}L=null,D=null,_.reset(),t.setRenderTarget(m),d=null,f=null,h=null,i=null,x=null,at.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",O),i.addEventListener("inputsourceschange",G),p.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(A),i.renderState.layers===void 0){const H={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,H),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Wi(d.framebufferWidth,d.framebufferHeight,{format:en,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let H=null,ot=null,ct=null;p.depth&&(ct=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,H=p.stencil?Vs:Ns,ot=p.stencil?Hs:Ti);const Ut={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(Ut),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Wi(f.textureWidth,f.textureHeight,{format:en,type:ei,depthTexture:new md(f.textureWidth,f.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),at.setContext(i),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function G(Y){for(let H=0;H<Y.removed.length;H++){const ot=Y.removed[H],ct=y.indexOf(ot);ct>=0&&(y[ct]=null,v[ct].disconnect(ot))}for(let H=0;H<Y.added.length;H++){const ot=Y.added[H];let ct=y.indexOf(ot);if(ct===-1){for(let Ht=0;Ht<v.length;Ht++)if(Ht>=y.length){y.push(ot),ct=Ht;break}else if(y[Ht]===null){y[Ht]=ot,ct=Ht;break}if(ct===-1)break}const Ut=v[ct];Ut&&Ut.connect(ot)}}const k=new P,Z=new P;function W(Y,H,ot){k.setFromMatrixPosition(H.matrixWorld),Z.setFromMatrixPosition(ot.matrixWorld);const ct=k.distanceTo(Z),Ut=H.projectionMatrix.elements,Ht=ot.projectionMatrix.elements,Wt=Ut[14]/(Ut[10]-1),re=Ut[14]/(Ut[10]+1),U=(Ut[9]+1)/Ut[5],ee=(Ut[9]-1)/Ut[5],jt=(Ut[8]-1)/Ut[0],Jt=(Ht[8]+1)/Ht[0],St=Wt*jt,le=Wt*Jt,Bt=ct/(-jt+Jt),Ot=Bt*-jt;H.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ot),Y.translateZ(Bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const I=Wt+Bt,w=re+Bt,K=St-Ot,Q=le+(ct-Ot),it=U*re/w*I,tt=ee*re/w*I;Y.projectionMatrix.makePerspective(K,Q,it,tt,I,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function ht(Y,H){H===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(H.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;_.texture!==null&&(Y.near=_.depthNear,Y.far=_.depthFar),M.near=C.near=E.near=Y.near,M.far=C.far=E.far=Y.far,(L!==M.near||D!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,D=M.far,E.near=L,E.far=D,C.near=L,C.far=D,E.updateProjectionMatrix(),C.updateProjectionMatrix(),Y.updateProjectionMatrix());const H=Y.parent,ot=M.cameras;ht(M,H);for(let ct=0;ct<ot.length;ct++)ht(ot[ct],H);ot.length===2?W(M,E,C):M.projectionMatrix.copy(E.projectionMatrix),st(Y,M,H)};function st(Y,H,ot){ot===null?Y.matrix.copy(H.matrixWorld):(Y.matrix.copy(ot.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(H.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(H.projectionMatrix),Y.projectionMatrixInverse.copy(H.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Gs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let pt=null;function At(Y,H){if(u=H.getViewerPose(l||o),g=H,u!==null){const ot=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let ct=!1;ot.length!==M.cameras.length&&(M.cameras.length=0,ct=!0);for(let Ht=0;Ht<ot.length;Ht++){const Wt=ot[Ht];let re=null;if(d!==null)re=d.getViewport(Wt);else{const ee=h.getViewSubImage(f,Wt);re=ee.viewport,Ht===0&&(t.setRenderTargetTextures(x,ee.colorTexture,f.ignoreDepthValues?void 0:ee.depthStencilTexture),t.setRenderTarget(x))}let U=b[Ht];U===void 0&&(U=new $e,U.layers.enable(Ht),U.viewport=new ce,b[Ht]=U),U.matrix.fromArray(Wt.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(Wt.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(re.x,re.y,re.width,re.height),Ht===0&&(M.matrix.copy(U.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ct===!0&&M.cameras.push(U)}const Ut=i.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const Ht=h.getDepthInformation(ot[0]);Ht&&Ht.isValid&&Ht.texture&&_.init(t,Ht,i.renderState)}}for(let ot=0;ot<v.length;ot++){const ct=y[ot],Ut=v[ot];ct!==null&&Ut!==void 0&&Ut.update(ct,H,l||o)}pt&&pt(Y,H),H.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:H}),g=null}const at=new pd;at.setAnimationLoop(At),this.setAnimationLoop=function(Y){pt=Y},this.dispose=function(){}}}const Ni=new zn,bv=new Ct;function Tv(s,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,hd(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,v,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ve&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ve&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),v=x.envMap,y=x.envMapRotation;v&&(p.envMap.value=v,Ni.copy(y),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),p.envMapRotation.value.setFromMatrix4(bv.makeRotationFromEuler(Ni)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ve&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ev(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function l(x,v){let y=i[x.id];y===void 0&&(g(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",p));const A=v.program;n.updateUBOMapping(x,A);const S=t.render.frame;r[x.id]!==S&&(f(x),r[x.id]=S)}function u(x){const v=h();x.__bindingPointIndex=v;const y=s.createBuffer(),A=x.__size,S=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,A,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,y),y}function h(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=i[x.id],y=x.uniforms,A=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let S=0,E=y.length;S<E;S++){const C=Array.isArray(y[S])?y[S]:[y[S]];for(let b=0,M=C.length;b<M;b++){const L=C[b];if(d(L,S,b,A)===!0){const D=L.__offset,N=Array.isArray(L.value)?L.value:[L.value];let O=0;for(let G=0;G<N.length;G++){const k=N[G],Z=_(k);typeof k=="number"||typeof k=="boolean"?(L.__data[0]=k,s.bufferSubData(s.UNIFORM_BUFFER,D+O,L.__data)):k.isMatrix3?(L.__data[0]=k.elements[0],L.__data[1]=k.elements[1],L.__data[2]=k.elements[2],L.__data[3]=0,L.__data[4]=k.elements[3],L.__data[5]=k.elements[4],L.__data[6]=k.elements[5],L.__data[7]=0,L.__data[8]=k.elements[6],L.__data[9]=k.elements[7],L.__data[10]=k.elements[8],L.__data[11]=0):(k.toArray(L.__data,O),O+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,v,y,A){const S=x.value,E=v+"_"+y;if(A[E]===void 0)return typeof S=="number"||typeof S=="boolean"?A[E]=S:A[E]=S.clone(),!0;{const C=A[E];if(typeof S=="number"||typeof S=="boolean"){if(C!==S)return A[E]=S,!0}else if(C.equals(S)===!1)return C.copy(S),!0}return!1}function g(x){const v=x.uniforms;let y=0;const A=16;for(let E=0,C=v.length;E<C;E++){const b=Array.isArray(v[E])?v[E]:[v[E]];for(let M=0,L=b.length;M<L;M++){const D=b[M],N=Array.isArray(D.value)?D.value:[D.value];for(let O=0,G=N.length;O<G;O++){const k=N[O],Z=_(k),W=y%A;W!==0&&A-W<Z.boundary&&(y+=A-W),D.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=y,y+=Z.storage}}}const S=y%A;return S>0&&(y+=A-S),x.__size=y,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:m}}class Av{constructor(t={}){const{canvas:e=_m(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this.toneMapping=Si,this.toneMappingExposure=1;const v=this;let y=!1,A=0,S=0,E=null,C=-1,b=null;const M=new ce,L=new ce;let D=null;const N=new Gt(0);let O=0,G=e.width,k=e.height,Z=1,W=null,ht=null;const st=new ce(0,0,G,k),pt=new ce(0,0,G,k);let At=!1;const at=new va;let Y=!1,H=!1;const ot=new Ct,ct=new P,Ut=new ce,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function re(){return E===null?Z:1}let U=n;function ee(R,F){return e.getContext(R,F)}try{const R={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pl}`),e.addEventListener("webglcontextlost",X,!1),e.addEventListener("webglcontextrestored",q,!1),e.addEventListener("webglcontextcreationerror",et,!1),U===null){const F="webgl2";if(U=ee(F,R),U===null)throw ee(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let jt,Jt,St,le,Bt,Ot,I,w,K,Q,it,tt,Et,dt,gt,zt,lt,xt,Yt,Pt,Mt,Dt,Ft,ue;function T(){jt=new D0(U),jt.init(),Dt=new gv(U,jt),Jt=new w0(U,jt,t,Dt),St=new dv(U),le=new O0(U),Bt=new Qx,Ot=new mv(U,jt,St,Bt,Jt,Dt,le),I=new C0(v),w=new I0(v),K=new Gm(U),Ft=new E0(U,K),Q=new N0(U,K,le,Ft),it=new B0(U,Q,K,le),Yt=new F0(U,Jt,Ot),zt=new R0(Bt),tt=new Jx(v,I,w,jt,Jt,Ft,zt),Et=new Tv(v,Bt),dt=new ev,gt=new av(jt),xt=new T0(v,I,w,St,it,f,c),lt=new fv(v,it,Jt),ue=new Ev(U,le,Jt,St),Pt=new A0(U,jt,le),Mt=new U0(U,jt,le),le.programs=tt.programs,v.capabilities=Jt,v.extensions=jt,v.properties=Bt,v.renderLists=dt,v.shadowMap=lt,v.state=St,v.info=le}T();const B=new Sv(v,U);this.xr=B,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const R=jt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=jt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(G,k,!1))},this.getSize=function(R){return R.set(G,k)},this.setSize=function(R,F,j=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=R,k=F,e.width=Math.floor(R*Z),e.height=Math.floor(F*Z),j===!0&&(e.style.width=R+"px",e.style.height=F+"px"),this.setViewport(0,0,R,F)},this.getDrawingBufferSize=function(R){return R.set(G*Z,k*Z).floor()},this.setDrawingBufferSize=function(R,F,j){G=R,k=F,Z=j,e.width=Math.floor(R*j),e.height=Math.floor(F*j),this.setViewport(0,0,R,F)},this.getCurrentViewport=function(R){return R.copy(M)},this.getViewport=function(R){return R.copy(st)},this.setViewport=function(R,F,j,$){R.isVector4?st.set(R.x,R.y,R.z,R.w):st.set(R,F,j,$),St.viewport(M.copy(st).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(pt)},this.setScissor=function(R,F,j,$){R.isVector4?pt.set(R.x,R.y,R.z,R.w):pt.set(R,F,j,$),St.scissor(L.copy(pt).multiplyScalar(Z).round())},this.getScissorTest=function(){return At},this.setScissorTest=function(R){St.setScissorTest(At=R)},this.setOpaqueSort=function(R){W=R},this.setTransparentSort=function(R){ht=R},this.getClearColor=function(R){return R.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor.apply(xt,arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha.apply(xt,arguments)},this.clear=function(R=!0,F=!0,j=!0){let $=0;if(R){let z=!1;if(E!==null){const ft=E.texture.format;z=ft===Ol||ft===Ul||ft===_a}if(z){const ft=E.texture.type,yt=ft===ei||ft===Ti||ft===Ur||ft===Hs||ft===Il||ft===Dl,bt=xt.getClearColor(),Tt=xt.getClearAlpha(),kt=bt.r,Vt=bt.g,Nt=bt.b;yt?(d[0]=kt,d[1]=Vt,d[2]=Nt,d[3]=Tt,U.clearBufferuiv(U.COLOR,0,d)):(g[0]=kt,g[1]=Vt,g[2]=Nt,g[3]=Tt,U.clearBufferiv(U.COLOR,0,g))}else $|=U.COLOR_BUFFER_BIT}F&&($|=U.DEPTH_BUFFER_BIT),j&&($|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",X,!1),e.removeEventListener("webglcontextrestored",q,!1),e.removeEventListener("webglcontextcreationerror",et,!1),dt.dispose(),gt.dispose(),Bt.dispose(),I.dispose(),w.dispose(),it.dispose(),Ft.dispose(),ue.dispose(),tt.dispose(),B.dispose(),B.removeEventListener("sessionstart",Qt),B.removeEventListener("sessionend",ii),Fe.stop()};function X(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const R=le.autoReset,F=lt.enabled,j=lt.autoUpdate,$=lt.needsUpdate,z=lt.type;T(),le.autoReset=R,lt.enabled=F,lt.autoUpdate=j,lt.needsUpdate=$,lt.type=z}function et(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function vt(R){const F=R.target;F.removeEventListener("dispose",vt),Lt(F)}function Lt(R){Kt(R),Bt.remove(R)}function Kt(R){const F=Bt.get(R).programs;F!==void 0&&(F.forEach(function(j){tt.releaseProgram(j)}),R.isShaderMaterial&&tt.releaseShaderCache(R))}this.renderBufferDirect=function(R,F,j,$,z,ft){F===null&&(F=Ht);const yt=z.isMesh&&z.matrixWorld.determinant()<0,bt=Hd(R,F,j,$,z);St.setMaterial($,yt);let Tt=j.index,kt=1;if($.wireframe===!0){if(Tt=Q.getWireframeAttribute(j),Tt===void 0)return;kt=2}const Vt=j.drawRange,Nt=j.attributes.position;let ne=Vt.start*kt,Me=(Vt.start+Vt.count)*kt;ft!==null&&(ne=Math.max(ne,ft.start*kt),Me=Math.min(Me,(ft.start+ft.count)*kt)),Tt!==null?(ne=Math.max(ne,0),Me=Math.min(Me,Tt.count)):Nt!=null&&(ne=Math.max(ne,0),Me=Math.min(Me,Nt.count));const Se=Me-ne;if(Se<0||Se===1/0)return;Ft.setup(z,$,bt,j,Tt);let nn,ie=Pt;if(Tt!==null&&(nn=K.get(Tt),ie=Mt,ie.setIndex(nn)),z.isMesh)$.wireframe===!0?(St.setLineWidth($.wireframeLinewidth*re()),ie.setMode(U.LINES)):ie.setMode(U.TRIANGLES);else if(z.isLine){let Rt=$.linewidth;Rt===void 0&&(Rt=1),St.setLineWidth(Rt*re()),z.isLineSegments?ie.setMode(U.LINES):z.isLineLoop?ie.setMode(U.LINE_LOOP):ie.setMode(U.LINE_STRIP)}else z.isPoints?ie.setMode(U.POINTS):z.isSprite&&ie.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)ie.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))ie.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Rt=z._multiDrawStarts,Be=z._multiDrawCounts,se=z._multiDrawCount,bn=Tt?K.get(Tt).bytesPerElement:1,Yi=Bt.get($).currentProgram.getUniforms();for(let sn=0;sn<se;sn++)Yi.setValue(U,"_gl_DrawID",sn),ie.render(Rt[sn]/bn,Be[sn])}else if(z.isInstancedMesh)ie.renderInstances(ne,Se,z.count);else if(j.isInstancedBufferGeometry){const Rt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Be=Math.min(j.instanceCount,Rt);ie.renderInstances(ne,Se,Be)}else ie.render(ne,Se)};function mt(R,F,j){R.transparent===!0&&R.side===cn&&R.forceSinglePass===!1?(R.side=Ve,R.needsUpdate=!0,qr(R,F,j),R.side=In,R.needsUpdate=!0,qr(R,F,j),R.side=cn):qr(R,F,j)}this.compile=function(R,F,j=null){j===null&&(j=R),p=gt.get(j),p.init(F),x.push(p),j.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),R!==j&&R.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const $=new Set;return R.traverse(function(z){const ft=z.material;if(ft)if(Array.isArray(ft))for(let yt=0;yt<ft.length;yt++){const bt=ft[yt];mt(bt,j,z),$.add(bt)}else mt(ft,j,z),$.add(ft)}),x.pop(),p=null,$},this.compileAsync=function(R,F,j=null){const $=this.compile(R,F,j);return new Promise(z=>{function ft(){if($.forEach(function(yt){Bt.get(yt).currentProgram.isReady()&&$.delete(yt)}),$.size===0){z(R);return}setTimeout(ft,10)}jt.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let It=null;function rt(R){It&&It(R)}function Qt(){Fe.stop()}function ii(){Fe.start()}const Fe=new pd;Fe.setAnimationLoop(rt),typeof self<"u"&&Fe.setContext(self),this.setAnimationLoop=function(R){It=R,B.setAnimationLoop(R),R===null?Fe.stop():Fe.start()},B.addEventListener("sessionstart",Qt),B.addEventListener("sessionend",ii),this.render=function(R,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(F),F=B.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,F,E),p=gt.get(R,x.length),p.init(F),x.push(p),ot.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),at.setFromProjectionMatrix(ot),H=this.localClippingEnabled,Y=zt.init(this.clippingPlanes,H),_=dt.get(R,m.length),_.init(),m.push(_),B.enabled===!0&&B.isPresenting===!0){const ft=v.xr.getDepthSensingMesh();ft!==null&&Vn(ft,F,-1/0,v.sortObjects)}Vn(R,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(W,ht),Wt=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,Wt&&xt.addToRenderList(_,R),this.info.render.frame++,Y===!0&&zt.beginShadows();const j=p.state.shadowsArray;lt.render(j,R,F),Y===!0&&zt.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=_.opaque,z=_.transmissive;if(p.setupLights(),F.isArrayCamera){const ft=F.cameras;if(z.length>0)for(let yt=0,bt=ft.length;yt<bt;yt++){const Tt=ft[yt];er($,z,R,Tt)}Wt&&xt.render(R);for(let yt=0,bt=ft.length;yt<bt;yt++){const Tt=ft[yt];Ri(_,R,Tt,Tt.viewport)}}else z.length>0&&er($,z,R,F),Wt&&xt.render(R),Ri(_,R,F);E!==null&&(Ot.updateMultisampleRenderTarget(E),Ot.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(v,R,F),Ft.resetDefaultState(),C=-1,b=null,x.pop(),x.length>0?(p=x[x.length-1],Y===!0&&zt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Vn(R,F,j,$){if(R.visible===!1)return;if(R.layers.test(F.layers)){if(R.isGroup)j=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(F);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||at.intersectsSprite(R)){$&&Ut.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ot);const yt=it.update(R),bt=R.material;bt.visible&&_.push(R,yt,bt,j,Ut.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||at.intersectsObject(R))){const yt=it.update(R),bt=R.material;if($&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ut.copy(R.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Ut.copy(yt.boundingSphere.center)),Ut.applyMatrix4(R.matrixWorld).applyMatrix4(ot)),Array.isArray(bt)){const Tt=yt.groups;for(let kt=0,Vt=Tt.length;kt<Vt;kt++){const Nt=Tt[kt],ne=bt[Nt.materialIndex];ne&&ne.visible&&_.push(R,yt,ne,j,Ut.z,Nt)}}else bt.visible&&_.push(R,yt,bt,j,Ut.z,null)}}const ft=R.children;for(let yt=0,bt=ft.length;yt<bt;yt++)Vn(ft[yt],F,j,$)}function Ri(R,F,j,$){const z=R.opaque,ft=R.transmissive,yt=R.transparent;p.setupLightsView(j),Y===!0&&zt.setGlobalState(v.clippingPlanes,j),$&&St.viewport(M.copy($)),z.length>0&&Xr(z,F,j),ft.length>0&&Xr(ft,F,j),yt.length>0&&Xr(yt,F,j),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function er(R,F,j,$){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new Wi(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Gr:ei,minFilter:Jn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const ft=p.state.transmissionRenderTarget[$.id],yt=$.viewport||M;ft.setSize(yt.z,yt.w);const bt=v.getRenderTarget();v.setRenderTarget(ft),v.getClearColor(N),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),Wt?xt.render(j):v.clear();const Tt=v.toneMapping;v.toneMapping=Si;const kt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),Y===!0&&zt.setGlobalState(v.clippingPlanes,$),Xr(R,j,$),Ot.updateMultisampleRenderTarget(ft),Ot.updateRenderTargetMipmap(ft),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Nt=0,ne=F.length;Nt<ne;Nt++){const Me=F[Nt],Se=Me.object,nn=Me.geometry,ie=Me.material,Rt=Me.group;if(ie.side===cn&&Se.layers.test($.layers)){const Be=ie.side;ie.side=Ve,ie.needsUpdate=!0,ru(Se,j,$,nn,ie,Rt),ie.side=Be,ie.needsUpdate=!0,Vt=!0}}Vt===!0&&(Ot.updateMultisampleRenderTarget(ft),Ot.updateRenderTargetMipmap(ft))}v.setRenderTarget(bt),v.setClearColor(N,O),kt!==void 0&&($.viewport=kt),v.toneMapping=Tt}function Xr(R,F,j){const $=F.isScene===!0?F.overrideMaterial:null;for(let z=0,ft=R.length;z<ft;z++){const yt=R[z],bt=yt.object,Tt=yt.geometry,kt=$===null?yt.material:$,Vt=yt.group;bt.layers.test(j.layers)&&ru(bt,F,j,Tt,kt,Vt)}}function ru(R,F,j,$,z,ft){R.onBeforeRender(v,F,j,$,z,ft),R.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),z.transparent===!0&&z.side===cn&&z.forceSinglePass===!1?(z.side=Ve,z.needsUpdate=!0,v.renderBufferDirect(j,F,$,z,R,ft),z.side=In,z.needsUpdate=!0,v.renderBufferDirect(j,F,$,z,R,ft),z.side=cn):v.renderBufferDirect(j,F,$,z,R,ft),R.onAfterRender(v,F,j,$,z,ft)}function qr(R,F,j){F.isScene!==!0&&(F=Ht);const $=Bt.get(R),z=p.state.lights,ft=p.state.shadowsArray,yt=z.state.version,bt=tt.getParameters(R,z.state,ft,F,j),Tt=tt.getProgramCacheKey(bt);let kt=$.programs;$.environment=R.isMeshStandardMaterial?F.environment:null,$.fog=F.fog,$.envMap=(R.isMeshStandardMaterial?w:I).get(R.envMap||$.environment),$.envMapRotation=$.environment!==null&&R.envMap===null?F.environmentRotation:R.envMapRotation,kt===void 0&&(R.addEventListener("dispose",vt),kt=new Map,$.programs=kt);let Vt=kt.get(Tt);if(Vt!==void 0){if($.currentProgram===Vt&&$.lightsStateVersion===yt)return au(R,bt),Vt}else bt.uniforms=tt.getUniforms(R),R.onBeforeCompile(bt,v),Vt=tt.acquireProgram(bt,Tt),kt.set(Tt,Vt),$.uniforms=bt.uniforms;const Nt=$.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Nt.clippingPlanes=zt.uniform),au(R,bt),$.needsLights=Gd(R),$.lightsStateVersion=yt,$.needsLights&&(Nt.ambientLightColor.value=z.state.ambient,Nt.lightProbe.value=z.state.probe,Nt.directionalLights.value=z.state.directional,Nt.directionalLightShadows.value=z.state.directionalShadow,Nt.spotLights.value=z.state.spot,Nt.spotLightShadows.value=z.state.spotShadow,Nt.rectAreaLights.value=z.state.rectArea,Nt.ltc_1.value=z.state.rectAreaLTC1,Nt.ltc_2.value=z.state.rectAreaLTC2,Nt.pointLights.value=z.state.point,Nt.pointLightShadows.value=z.state.pointShadow,Nt.hemisphereLights.value=z.state.hemi,Nt.directionalShadowMap.value=z.state.directionalShadowMap,Nt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Nt.spotShadowMap.value=z.state.spotShadowMap,Nt.spotLightMatrix.value=z.state.spotLightMatrix,Nt.spotLightMap.value=z.state.spotLightMap,Nt.pointShadowMap.value=z.state.pointShadowMap,Nt.pointShadowMatrix.value=z.state.pointShadowMatrix),$.currentProgram=Vt,$.uniformsList=null,Vt}function ou(R){if(R.uniformsList===null){const F=R.currentProgram.getUniforms();R.uniformsList=Zo.seqWithValue(F.seq,R.uniforms)}return R.uniformsList}function au(R,F){const j=Bt.get(R);j.outputColorSpace=F.outputColorSpace,j.batching=F.batching,j.batchingColor=F.batchingColor,j.instancing=F.instancing,j.instancingColor=F.instancingColor,j.instancingMorph=F.instancingMorph,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function Hd(R,F,j,$,z){F.isScene!==!0&&(F=Ht),Ot.resetTextureUnits();const ft=F.fog,yt=$.isMeshStandardMaterial?F.environment:null,bt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ge,Tt=($.isMeshStandardMaterial?w:I).get($.envMap||yt),kt=$.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Vt=!!j.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Nt=!!j.morphAttributes.position,ne=!!j.morphAttributes.normal,Me=!!j.morphAttributes.color;let Se=Si;$.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Se=v.toneMapping);const nn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ie=nn!==void 0?nn.length:0,Rt=Bt.get($),Be=p.state.lights;if(Y===!0&&(H===!0||R!==b)){const fn=R===b&&$.id===C;zt.setState($,R,fn)}let se=!1;$.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Be.state.version||Rt.outputColorSpace!==bt||z.isBatchedMesh&&Rt.batching===!1||!z.isBatchedMesh&&Rt.batching===!0||z.isBatchedMesh&&Rt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Rt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Rt.instancing===!1||!z.isInstancedMesh&&Rt.instancing===!0||z.isSkinnedMesh&&Rt.skinning===!1||!z.isSkinnedMesh&&Rt.skinning===!0||z.isInstancedMesh&&Rt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Rt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Rt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Rt.instancingMorph===!1&&z.morphTexture!==null||Rt.envMap!==Tt||$.fog===!0&&Rt.fog!==ft||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==zt.numPlanes||Rt.numIntersection!==zt.numIntersection)||Rt.vertexAlphas!==kt||Rt.vertexTangents!==Vt||Rt.morphTargets!==Nt||Rt.morphNormals!==ne||Rt.morphColors!==Me||Rt.toneMapping!==Se||Rt.morphTargetsCount!==ie)&&(se=!0):(se=!0,Rt.__version=$.version);let bn=Rt.currentProgram;se===!0&&(bn=qr($,F,z));let Yi=!1,sn=!1,Aa=!1;const Ae=bn.getUniforms(),si=Rt.uniforms;if(St.useProgram(bn.program)&&(Yi=!0,sn=!0,Aa=!0),$.id!==C&&(C=$.id,sn=!0),Yi||b!==R){Ae.setValue(U,"projectionMatrix",R.projectionMatrix),Ae.setValue(U,"viewMatrix",R.matrixWorldInverse);const fn=Ae.map.cameraPosition;fn!==void 0&&fn.setValue(U,ct.setFromMatrixPosition(R.matrixWorld)),Jt.logarithmicDepthBuffer&&Ae.setValue(U,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ae.setValue(U,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,sn=!0,Aa=!0)}if(z.isSkinnedMesh){Ae.setOptional(U,z,"bindMatrix"),Ae.setOptional(U,z,"bindMatrixInverse");const fn=z.skeleton;fn&&(fn.boneTexture===null&&fn.computeBoneTexture(),Ae.setValue(U,"boneTexture",fn.boneTexture,Ot))}z.isBatchedMesh&&(Ae.setOptional(U,z,"batchingTexture"),Ae.setValue(U,"batchingTexture",z._matricesTexture,Ot),Ae.setOptional(U,z,"batchingIdTexture"),Ae.setValue(U,"batchingIdTexture",z._indirectTexture,Ot),Ae.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&Ae.setValue(U,"batchingColorTexture",z._colorsTexture,Ot));const wa=j.morphAttributes;if((wa.position!==void 0||wa.normal!==void 0||wa.color!==void 0)&&Yt.update(z,j,bn),(sn||Rt.receiveShadow!==z.receiveShadow)&&(Rt.receiveShadow=z.receiveShadow,Ae.setValue(U,"receiveShadow",z.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(si.envMap.value=Tt,si.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&F.environment!==null&&(si.envMapIntensity.value=F.environmentIntensity),sn&&(Ae.setValue(U,"toneMappingExposure",v.toneMappingExposure),Rt.needsLights&&Vd(si,Aa),ft&&$.fog===!0&&Et.refreshFogUniforms(si,ft),Et.refreshMaterialUniforms(si,$,Z,k,p.state.transmissionRenderTarget[R.id]),Zo.upload(U,ou(Rt),si,Ot)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Zo.upload(U,ou(Rt),si,Ot),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ae.setValue(U,"center",z.center),Ae.setValue(U,"modelViewMatrix",z.modelViewMatrix),Ae.setValue(U,"normalMatrix",z.normalMatrix),Ae.setValue(U,"modelMatrix",z.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const fn=$.uniformsGroups;for(let Ra=0,Wd=fn.length;Ra<Wd;Ra++){const cu=fn[Ra];ue.update(cu,bn),ue.bind(cu,bn)}}return bn}function Vd(R,F){R.ambientLightColor.needsUpdate=F,R.lightProbe.needsUpdate=F,R.directionalLights.needsUpdate=F,R.directionalLightShadows.needsUpdate=F,R.pointLights.needsUpdate=F,R.pointLightShadows.needsUpdate=F,R.spotLights.needsUpdate=F,R.spotLightShadows.needsUpdate=F,R.rectAreaLights.needsUpdate=F,R.hemisphereLights.needsUpdate=F}function Gd(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,F,j){Bt.get(R.texture).__webglTexture=F,Bt.get(R.depthTexture).__webglTexture=j;const $=Bt.get(R);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=j===void 0,$.__autoAllocateDepthBuffer||jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,F){const j=Bt.get(R);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(R,F=0,j=0){E=R,A=F,S=j;let $=!0,z=null,ft=!1,yt=!1;if(R){const Tt=Bt.get(R);Tt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(U.FRAMEBUFFER,null),$=!1):Tt.__webglFramebuffer===void 0?Ot.setupRenderTarget(R):Tt.__hasExternalTextures&&Ot.rebindTextures(R,Bt.get(R.texture).__webglTexture,Bt.get(R.depthTexture).__webglTexture);const kt=R.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(yt=!0);const Vt=Bt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Vt[F])?z=Vt[F][j]:z=Vt[F],ft=!0):R.samples>0&&Ot.useMultisampledRTT(R)===!1?z=Bt.get(R).__webglMultisampledFramebuffer:Array.isArray(Vt)?z=Vt[j]:z=Vt,M.copy(R.viewport),L.copy(R.scissor),D=R.scissorTest}else M.copy(st).multiplyScalar(Z).floor(),L.copy(pt).multiplyScalar(Z).floor(),D=At;if(St.bindFramebuffer(U.FRAMEBUFFER,z)&&$&&St.drawBuffers(R,z),St.viewport(M),St.scissor(L),St.setScissorTest(D),ft){const Tt=Bt.get(R.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,Tt.__webglTexture,j)}else if(yt){const Tt=Bt.get(R.texture),kt=F||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Tt.__webglTexture,j||0,kt)}C=-1},this.readRenderTargetPixels=function(R,F,j,$,z,ft,yt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt){St.bindFramebuffer(U.FRAMEBUFFER,bt);try{const Tt=R.texture,kt=Tt.format,Vt=Tt.type;if(!Jt.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Jt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=R.width-$&&j>=0&&j<=R.height-z&&U.readPixels(F,j,$,z,Dt.convert(kt),Dt.convert(Vt),ft)}finally{const Tt=E!==null?Bt.get(E).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(R,F,j,$,z,ft,yt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=Bt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt){St.bindFramebuffer(U.FRAMEBUFFER,bt);try{const Tt=R.texture,kt=Tt.format,Vt=Tt.type;if(!Jt.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Jt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=R.width-$&&j>=0&&j<=R.height-z){const Nt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Nt),U.bufferData(U.PIXEL_PACK_BUFFER,ft.byteLength,U.STREAM_READ),U.readPixels(F,j,$,z,Dt.convert(kt),Dt.convert(Vt),0),U.flush();const ne=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);await xm(U,ne,4);try{U.bindBuffer(U.PIXEL_PACK_BUFFER,Nt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ft)}finally{U.deleteBuffer(Nt),U.deleteSync(ne)}return ft}}finally{const Tt=E!==null?Bt.get(E).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,Tt)}}},this.copyFramebufferToTexture=function(R,F=null,j=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,R=arguments[1]);const $=Math.pow(2,-j),z=Math.floor(R.image.width*$),ft=Math.floor(R.image.height*$),yt=F!==null?F.x:0,bt=F!==null?F.y:0;Ot.setTexture2D(R,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,yt,bt,z,ft),St.unbindTexture()},this.copyTextureToTexture=function(R,F,j=null,$=null,z=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,R=arguments[1],F=arguments[2],z=arguments[3]||0,j=null);let ft,yt,bt,Tt,kt,Vt;j!==null?(ft=j.max.x-j.min.x,yt=j.max.y-j.min.y,bt=j.min.x,Tt=j.min.y):(ft=R.image.width,yt=R.image.height,bt=0,Tt=0),$!==null?(kt=$.x,Vt=$.y):(kt=0,Vt=0);const Nt=Dt.convert(F.format),ne=Dt.convert(F.type);Ot.setTexture2D(F,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Me=U.getParameter(U.UNPACK_ROW_LENGTH),Se=U.getParameter(U.UNPACK_IMAGE_HEIGHT),nn=U.getParameter(U.UNPACK_SKIP_PIXELS),ie=U.getParameter(U.UNPACK_SKIP_ROWS),Rt=U.getParameter(U.UNPACK_SKIP_IMAGES),Be=R.isCompressedTexture?R.mipmaps[z]:R.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Be.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Be.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,bt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Tt),R.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,z,kt,Vt,ft,yt,Nt,ne,Be.data):R.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,z,kt,Vt,Be.width,Be.height,Nt,Be.data):U.texSubImage2D(U.TEXTURE_2D,z,kt,Vt,ft,yt,Nt,ne,Be),U.pixelStorei(U.UNPACK_ROW_LENGTH,Me),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Se),U.pixelStorei(U.UNPACK_SKIP_PIXELS,nn),U.pixelStorei(U.UNPACK_SKIP_ROWS,ie),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Rt),z===0&&F.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(R,F,j=null,$=null,z=0){R.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,$=arguments[1]||null,R=arguments[2],F=arguments[3],z=arguments[4]||0);let ft,yt,bt,Tt,kt,Vt,Nt,ne,Me;const Se=R.isCompressedTexture?R.mipmaps[z]:R.image;j!==null?(ft=j.max.x-j.min.x,yt=j.max.y-j.min.y,bt=j.max.z-j.min.z,Tt=j.min.x,kt=j.min.y,Vt=j.min.z):(ft=Se.width,yt=Se.height,bt=Se.depth,Tt=0,kt=0,Vt=0),$!==null?(Nt=$.x,ne=$.y,Me=$.z):(Nt=0,ne=0,Me=0);const nn=Dt.convert(F.format),ie=Dt.convert(F.type);let Rt;if(F.isData3DTexture)Ot.setTexture3D(F,0),Rt=U.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)Ot.setTexture2DArray(F,0),Rt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const Be=U.getParameter(U.UNPACK_ROW_LENGTH),se=U.getParameter(U.UNPACK_IMAGE_HEIGHT),bn=U.getParameter(U.UNPACK_SKIP_PIXELS),Yi=U.getParameter(U.UNPACK_SKIP_ROWS),sn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Se.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Se.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Tt),U.pixelStorei(U.UNPACK_SKIP_ROWS,kt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Vt),R.isDataTexture||R.isData3DTexture?U.texSubImage3D(Rt,z,Nt,ne,Me,ft,yt,bt,nn,ie,Se.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(Rt,z,Nt,ne,Me,ft,yt,bt,nn,Se.data):U.texSubImage3D(Rt,z,Nt,ne,Me,ft,yt,bt,nn,ie,Se),U.pixelStorei(U.UNPACK_ROW_LENGTH,Be),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,se),U.pixelStorei(U.UNPACK_SKIP_PIXELS,bn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Yi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,sn),z===0&&F.generateMipmaps&&U.generateMipmap(Rt),St.unbindTexture()},this.initRenderTarget=function(R){Bt.get(R).__webglFramebuffer===void 0&&Ot.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ot.setTextureCube(R,0):R.isData3DTexture?Ot.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ot.setTexture2DArray(R,0):Ot.setTexture2D(R,0),St.unbindTexture()},this.resetState=function(){A=0,S=0,E=null,St.reset(),Ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Bl?"display-p3":"srgb",e.unpackColorSpace=te.workingColorSpace===xa?"display-p3":"srgb"}}class Wl extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class wv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return kl("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new P;class Xl{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),i=oe(i,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ce(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Xl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ph=new P,mh=new ce,gh=new ce,Rv=new P,_h=new Ct,mo=new P,sc=new Ue,xh=new Ct,rc=new qi;class Cv extends Zt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=vu,this.bindMatrix=new Ct,this.bindMatrixInverse=new Ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new pe),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,mo),this.boundingBox.expandByPoint(mo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ue),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,mo),this.boundingSphere.expandByPoint(mo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sc.copy(this.boundingSphere),sc.applyMatrix4(i),t.ray.intersectsSphere(sc)!==!1&&(xh.copy(i).invert(),rc.copy(t.ray).applyMatrix4(xh),!(this.boundingBox!==null&&rc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,rc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new ce,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===vu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;mh.fromBufferAttribute(i.attributes.skinIndex,t),gh.fromBufferAttribute(i.attributes.skinWeight,t),ph.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=gh.getComponent(r);if(o!==0){const a=mh.getComponent(r);_h.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Rv.copy(ph).applyMatrix4(_h),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class yd extends ve{constructor(){super(),this.isBone=!0,this.type="Bone"}}class wr extends Le{constructor(t=null,e=1,n=1,i,r,o,a,c,l=Je,u=Je,h,f){super(null,o,a,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vh=new Ct,Pv=new Ct;class ql{constructor(t=[],e=[]){this.uuid=Pn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ct)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ct;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Pv;vh.multiplyMatrices(a,e[r]),vh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ql(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new wr(e,t,t,en,un);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new yd),this.bones.push(o),this.boneInverses.push(new Ct().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class ml extends Ce{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ms=new Ct,yh=new Ct,go=[],Mh=new pe,Lv=new Ct,or=new Zt,ar=new Ue;class Iv extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ml(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Lv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new pe),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),Mh.copy(t.boundingBox).applyMatrix4(ms),this.boundingBox.union(Mh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ue),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),ar.copy(t.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(ar)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ar.copy(this.boundingSphere),ar.applyMatrix4(n),t.ray.intersectsSphere(ar)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ms),yh.multiplyMatrices(n,ms),or.matrixWorld=yh,or.raycast(t,go);for(let o=0,a=go.length;o<a;o++){const c=go[o];c.instanceId=r,c.object=this,e.push(c)}go.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ml(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new wr(new Float32Array(i*this.count),i,this.count,Nl,un));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}function Dv(s,t){return s.z-t.z}function Nv(s,t){return t.z-s.z}class Uv{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n){const i=this.pool,r=this.list;this.index>=i.length&&i.push({start:-1,count:-1,z:-1,index:-1});const o=i[this.index];r.push(o),this.index++,o.start=t.start,o.count=t.count,o.z=e,o.index=n}reset(){this.list.length=0,this.index=0}}const hi=new Ct,oc=new Ct,Ov=new Ct,Fv=new Gt(1,1,1),Sh=new Ct,ac=new va,_o=new pe,Ui=new Ue,cr=new P,bh=new P,Bv=new P,cc=new Uv,qe=new Zt,xo=[];function zv(s,t,e=0){const n=t.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==t.array.constructor){const i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)t.setComponent(r+e,o,s.getComponent(r,o))}else t.array.set(s.array,e*n);t.needsUpdate=!0}let kv=class extends Zt{get maxInstanceCount(){return this._maxInstanceCount}constructor(t,e,n=e*2,i){super(new Oe,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawInfo=[],this._drawRanges=[],this._reservedRanges=[],this._bounds=[],this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._visibilityChanged=!0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4),n=new wr(e,t,t,en,un);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);const e=new Uint32Array(t*t),n=new wr(e,t,t,_a,Ti);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxIndexCount);t=Math.ceil(t);const e=new Float32Array(t*t*4).fill(1),n=new wr(e,t,t,en,un);n.colorSpace=te.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){const e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const r in t.attributes){const o=t.getAttribute(r),{array:a,itemSize:c,normalized:l}=o,u=new a.constructor(n*c),h=new Ce(u,c,l);e.setAttribute(r,h)}if(t.getIndex()!==null){const r=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new Ce(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){const e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(const n in e.attributes){if(!t.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);const i=t.getAttribute(n),r=e.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pe);const t=this._geometryCount,e=this.boundingBox,n=this._drawInfo;e.makeEmpty();for(let i=0;i<t;i++){if(n[i].active===!1)continue;const r=n[i].geometryIndex;this.getMatrixAt(i,hi),this.getBoundingBoxAt(r,_o).applyMatrix4(hi),e.union(_o)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ue);const t=this.boundingSphere,e=this._drawInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;const r=e[n].geometryIndex;this.getMatrixAt(n,hi),this.getBoundingSphereAt(r,Ui).applyMatrix4(hi),t.union(Ui)}}addInstance(t){if(this._drawInfo.length>=this._maxInstanceCount)throw new Error("BatchedMesh: Maximum item count reached.");this._drawInfo.push({visible:!0,active:!0,geometryIndex:t});const e=this._drawInfo.length-1,n=this._matricesTexture,i=n.image.data;Ov.toArray(i,e*16),n.needsUpdate=!0;const r=this._colorsTexture;return r&&(Fv.toArray(r.image.data,e*4),r.needsUpdate=!0),e}addGeometry(t,e=-1,n=-1){if(this._initializeGeometry(t),this._validateGeometry(t),this._drawInfo.length>=this._maxInstanceCount)throw new Error("BatchedMesh: Maximum item count reached.");const i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1};let r=null;const o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),e===-1?i.vertexCount=t.getAttribute("position").count:i.vertexCount=e,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;const l=t.getIndex(),u=l!==null;if(u&&(n===-1?i.indexCount=l.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");const h=this._geometryCount;return this._geometryCount++,o.push(i),a.push({start:u?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new pe,sphereInitialized:!1,sphere:new Ue}),this.setGeometryAt(h,t),h}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);const n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=e.getIndex(),a=this._reservedRanges[t];if(i&&o.count>a.indexCount||e.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");const c=a.vertexStart,l=a.vertexCount;for(const d in n.attributes){const g=e.getAttribute(d),_=n.getAttribute(d);zv(g,_,c);const p=g.itemSize;for(let m=g.count,x=l;m<x;m++){const v=c+m;for(let y=0;y<p;y++)_.setComponent(v,y,0)}_.needsUpdate=!0,_.addUpdateRange(c*p,l*p)}if(i){const d=a.indexStart;for(let g=0;g<o.count;g++)r.setX(d+g,c+o.getX(g));for(let g=o.count,_=a.indexCount;g<_;g++)r.setX(d+g,c);r.needsUpdate=!0,r.addUpdateRange(d,a.indexCount)}const u=this._bounds[t];e.boundingBox!==null?(u.box.copy(e.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,e.boundingSphere!==null?(u.sphere.copy(e.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;const h=this._drawRanges[t],f=e.getAttribute("position");return h.count=i?o.count:f.count,this._visibilityChanged=!0,t}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;const n=this._bounds[t],i=n.box,r=this.geometry;if(n.boxInitialized===!1){i.makeEmpty();const o=r.index,a=r.attributes.position,c=this._drawRanges[t];for(let l=c.start,u=c.start+c.count;l<u;l++){let h=l;o&&(h=o.getX(h)),i.expandByPoint(cr.fromBufferAttribute(a,h))}n.boxInitialized=!0}return e.copy(i),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;const n=this._bounds[t],i=n.sphere,r=this.geometry;if(n.sphereInitialized===!1){i.makeEmpty(),this.getBoundingBoxAt(t,_o),_o.getCenter(i.center);const o=r.index,a=r.attributes.position,c=this._drawRanges[t];let l=0;for(let u=c.start,h=c.start+c.count;u<h;u++){let f=u;o&&(f=o.getX(f)),cr.fromBufferAttribute(a,f),l=Math.max(l,i.center.distanceToSquared(cr))}i.radius=Math.sqrt(l),n.sphereInitialized=!0}return e.copy(i),e}setMatrixAt(t,e){const n=this._drawInfo,i=this._matricesTexture,r=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?this:(e.toArray(r,t*16),i.needsUpdate=!0,this)}getMatrixAt(t,e){const n=this._drawInfo,i=this._matricesTexture.image.data;return t>=n.length||n[t].active===!1?null:e.fromArray(i,t*16)}setColorAt(t,e){this._colorsTexture===null&&this._initColorsTexture();const n=this._colorsTexture,i=this._colorsTexture.image.data,r=this._drawInfo;return t>=r.length||r[t].active===!1?this:(e.toArray(i,t*4),n.needsUpdate=!0,this)}getColorAt(t,e){const n=this._colorsTexture.image.data,i=this._drawInfo;return t>=i.length||i[t].active===!1?null:e.fromArray(n,t*4)}setVisibleAt(t,e){const n=this._drawInfo;return t>=n.length||n[t].active===!1||n[t].visible===e?this:(n[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){const e=this._drawInfo;return t>=e.length||e[t].active===!1?!1:e[t].visible}raycast(t,e){const n=this._drawInfo,i=this._drawRanges,r=this.matrixWorld,o=this.geometry;qe.material=this.material,qe.geometry.index=o.index,qe.geometry.attributes=o.attributes,qe.geometry.boundingBox===null&&(qe.geometry.boundingBox=new pe),qe.geometry.boundingSphere===null&&(qe.geometry.boundingSphere=new Ue);for(let a=0,c=n.length;a<c;a++){if(!n[a].visible||!n[a].active)continue;const l=n[a].geometryIndex,u=i[l];qe.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(a,qe.matrixWorld).premultiply(r),this.getBoundingBoxAt(l,qe.geometry.boundingBox),this.getBoundingSphereAt(l,qe.geometry.boundingSphere),qe.raycast(t,xo);for(let h=0,f=xo.length;h<f;h++){const d=xo[h];d.object=this,d.batchId=a,e.push(d)}xo.length=0}qe.material=null,qe.geometry.index=null,qe.geometry.attributes={},qe.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._drawRanges=t._drawRanges.map(e=>({...e})),this._reservedRanges=t._reservedRanges.map(e=>({...e})),this._drawInfo=t._drawInfo.map(e=>({...e})),this._bounds=t._bounds.map(e=>({boxInitialized:e.boxInitialized,box:e.box.clone(),sphereInitialized:e.sphereInitialized,sphere:e.sphere.clone()})),this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._geometryCount=t._geometryCount,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.slice()),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null),this}onBeforeRender(t,e,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._drawInfo,l=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled,d=this._indirectTexture,g=d.image.data;f&&(Sh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),ac.setFromProjectionMatrix(Sh,t.coordinateSystem));let _=0;if(this.sortObjects){oc.copy(this.matrixWorld).invert(),cr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(oc),bh.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(oc);for(let x=0,v=c.length;x<v;x++)if(c[x].visible&&c[x].active){const y=c[x].geometryIndex;this.getMatrixAt(x,hi),this.getBoundingSphereAt(y,Ui).applyMatrix4(hi);let A=!1;if(f&&(A=!ac.intersectsSphere(Ui)),!A){const S=Bv.subVectors(Ui.center,cr).dot(bh);cc.push(h[y],S,x)}}const p=cc.list,m=this.customSort;m===null?p.sort(r.transparent?Nv:Dv):m.call(this,p,n);for(let x=0,v=p.length;x<v;x++){const y=p[x];l[_]=y.start*a,u[_]=y.count,g[_]=y.index,_++}cc.reset()}else for(let p=0,m=c.length;p<m;p++)if(c[p].visible&&c[p].active){const x=c[p].geometryIndex;let v=!1;if(f&&(this.getMatrixAt(p,hi),this.getBoundingSphereAt(x,Ui).applyMatrix4(hi),v=!ac.intersectsSphere(Ui)),!v){const y=h[x];l[_]=y.start*a,u[_]=y.count,g[_]=p,_++}}d.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,r,o){this.onBeforeRender(t,null,i,r,o)}};class Md extends Ln{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const la=new P,ua=new P,Th=new Ct,lr=new qi,vo=new Ue,lc=new P,Eh=new P;class Yl extends ve{constructor(t=new Oe,e=new Md){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)la.fromBufferAttribute(e,i-1),ua.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=la.distanceTo(ua);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vo.copy(n.boundingSphere),vo.applyMatrix4(i),vo.radius+=r,t.ray.intersectsSphere(vo)===!1)return;Th.copy(i).invert(),lr.copy(t.ray).applyMatrix4(Th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=u.getX(_),x=u.getX(_+1),v=yo(this,t,lr,c,m,x);v&&e.push(v)}if(this.isLineLoop){const _=u.getX(g-1),p=u.getX(d),m=yo(this,t,lr,c,_,p);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=d,p=g-1;_<p;_+=l){const m=yo(this,t,lr,c,_,_+1);m&&e.push(m)}if(this.isLineLoop){const _=yo(this,t,lr,c,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function yo(s,t,e,n,i,r){const o=s.geometry.attributes.position;if(la.fromBufferAttribute(o,i),ua.fromBufferAttribute(o,r),e.distanceSqToSegment(la,ua,lc,Eh)>n)return;lc.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(lc);if(!(c<t.near||c>t.far))return{distance:c,point:Eh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}const Ah=new P,wh=new P;class Hv extends Yl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ah.fromBufferAttribute(e,i),wh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ah.distanceTo(wh);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Vv extends Yl{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Sd extends Ln{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Rh=new Ct,gl=new qi,Mo=new Ue,So=new P;class Gv extends ve{constructor(t=new Oe,e=new Sd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mo.copy(n.boundingSphere),Mo.applyMatrix4(i),Mo.radius+=r,t.ray.intersectsSphere(Mo)===!1)return;Rh.copy(i).invert(),gl.copy(t.ray).applyMatrix4(Rh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const p=l.getX(g);So.fromBufferAttribute(h,p),Ch(So,p,c,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)So.fromBufferAttribute(h,g),Ch(So,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ch(s,t,e,n,i,r,o){const a=gl.distanceSqToPoint(s);if(a<e){const c=new P;gl.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}class Wv extends Le{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class kn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new ut:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],r=[],o=[],a=new P,c=new Ct;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ee(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Ee(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class jl extends kn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ut){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Xv extends jl{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Kl(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const bo=new P,uc=new Kl,hc=new Kl,fc=new Kl;class qv extends kn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(bo.subVectors(i[0],i[1]).add(i[0]),l=bo);const h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(bo.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=bo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),uc.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,p),hc.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,p),fc.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(uc.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),hc.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),fc.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(uc.calc(c),hc.calc(c),fc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ph(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function Yv(s,t){const e=1-s;return e*e*t}function jv(s,t){return 2*(1-s)*s*t}function Kv(s,t){return s*s*t}function Rr(s,t,e,n){return Yv(s,t)+jv(s,e)+Kv(s,n)}function $v(s,t){const e=1-s;return e*e*e*t}function Zv(s,t){const e=1-s;return 3*e*e*s*t}function Jv(s,t){return 3*(1-s)*s*s*t}function Qv(s,t){return s*s*s*t}function Cr(s,t,e,n,i){return $v(s,t)+Zv(s,e)+Jv(s,n)+Qv(s,i)}class bd extends kn{constructor(t=new ut,e=new ut,n=new ut,i=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(t,i.x,r.x,o.x,a.x),Cr(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ty extends kn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cr(t,i.x,r.x,o.x,a.x),Cr(t,i.y,r.y,o.y,a.y),Cr(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Td extends kn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ey extends kn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ed extends kn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(t,i.x,r.x,o.x),Rr(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ny extends kn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rr(t,i.x,r.x,o.x),Rr(t,i.y,r.y,o.y),Rr(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ad extends kn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Ph(a,c.x,l.x,u.x,h.x),Ph(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ut().fromArray(i))}return this}}var Lh=Object.freeze({__proto__:null,ArcCurve:Xv,CatmullRomCurve3:qv,CubicBezierCurve:bd,CubicBezierCurve3:ty,EllipseCurve:jl,LineCurve:Td,LineCurve3:ey,QuadraticBezierCurve:Ed,QuadraticBezierCurve3:ny,SplineCurve:Ad});class iy extends kn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Lh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Lh[i.type]().fromJSON(i))}return this}}class sy extends iy{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Td(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Ed(this.currentPoint.clone(),new ut(t,e),new ut(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new bd(this.currentPoint.clone(),new ut(t,e),new ut(n,i),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ad(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new jl(t,e,n,i,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class $l extends Oe{constructor(t=[new ut(0,-.5),new ut(.5,0),new ut(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ee(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,h=new P,f=new ut,d=new P,g=new P,_=new P;let p=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(g)}for(let x=0;x<=e;x++){const v=n+x*u*i,y=Math.sin(v),A=Math.cos(v);for(let S=0;S<=t.length-1;S++){h.x=t[S].x*y,h.y=t[S].y,h.z=t[S].x*A,o.push(h.x,h.y,h.z),f.x=x/e,f.y=S/(t.length-1),a.push(f.x,f.y);const E=c[3*S+0]*y,C=c[3*S+1],b=c[3*S+0]*A;l.push(E,C,b)}}for(let x=0;x<e;x++)for(let v=0;v<t.length-1;v++){const y=v+x*t.length,A=y,S=y+t.length,E=y+t.length+1,C=y+1;r.push(A,S,C),r.push(E,C,S)}this.setIndex(r),this.setAttribute("position",new me(o,3)),this.setAttribute("uv",new me(a,2)),this.setAttribute("normal",new me(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $l(t.points,t.segments,t.phiStart,t.phiLength)}}class Zl extends $l{constructor(t=1,e=1,n=4,i=8){const r=new sy;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Zl(t.radius,t.length,t.capSegments,t.radialSegments)}}class ha extends Oe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new P,u=new ut;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=n+h/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new me(o,3)),this.setAttribute("normal",new me(a,3)),this.setAttribute("uv",new me(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ha(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ki extends Oe{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const _=[],p=n/2;let m=0;x(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new me(h,3)),this.setAttribute("normal",new me(f,3)),this.setAttribute("uv",new me(d,2));function x(){const y=new P,A=new P;let S=0;const E=(e-t)/n;for(let C=0;C<=r;C++){const b=[],M=C/r,L=M*(e-t)+t;for(let D=0;D<=i;D++){const N=D/i,O=N*c+a,G=Math.sin(O),k=Math.cos(O);A.x=L*G,A.y=-M*n+p,A.z=L*k,h.push(A.x,A.y,A.z),y.set(G,E,k).normalize(),f.push(y.x,y.y,y.z),d.push(N,1-M),b.push(g++)}_.push(b)}for(let C=0;C<i;C++)for(let b=0;b<r;b++){const M=_[b][C],L=_[b+1][C],D=_[b+1][C+1],N=_[b][C+1];u.push(M,L,N),u.push(L,D,N),S+=6}l.addGroup(m,S,0),m+=S}function v(y){const A=g,S=new ut,E=new P;let C=0;const b=y===!0?t:e,M=y===!0?1:-1;for(let D=1;D<=i;D++)h.push(0,p*M,0),f.push(0,M,0),d.push(.5,.5),g++;const L=g;for(let D=0;D<=i;D++){const O=D/i*c+a,G=Math.cos(O),k=Math.sin(O);E.x=b*k,E.y=p*M,E.z=b*G,h.push(E.x,E.y,E.z),f.push(0,M,0),S.x=G*.5+.5,S.y=k*.5*M+.5,d.push(S.x,S.y),g++}for(let D=0;D<i;D++){const N=A+D,O=L+D;y===!0?u.push(O,O+1,N):u.push(O+1,O,N),C+=3}l.addGroup(m,C,y===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Jl extends Oe{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],u=[];let h=t;const f=(e-t)/i,d=new P,g=new ut;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const m=r+p/n*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<i;_++){const p=_*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,y=x+n+1,A=x+n+2,S=x+1;a.push(v,y,S),a.push(y,A,S)}}this.setIndex(a),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(l,3)),this.setAttribute("uv",new me(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Sa extends Oe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new P,f=new P,d=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const S=A/e;h.x=-t*Math.cos(i+S*r)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(i+S*r)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),p.push(S+y,1-v),x.push(l++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const v=u[m][x+1],y=u[m][x],A=u[m+1][x],S=u[m+1][x+1];(m!==0||o>0)&&d.push(v,y,S),(m!==n-1||c<Math.PI)&&d.push(y,A,S)}this.setIndex(d),this.setAttribute("position",new me(g,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sa(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xs extends Ln{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fl,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sn extends Xs{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Gt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Gt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Gt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class ry extends Ln{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fl,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}function To(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function oy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ay(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Ih(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let c=0;c!==t;++c)i[o++]=s[a+c]}return i}function wd(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}class Wr{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class cy extends Wr{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yu,endingEnd:yu}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Mu:r=t,a=2*e-n;break;case Su:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Mu:o=t,c=2*n-e;break;case Su:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}const l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-e)/(i-e),_=g*g,p=_*g,m=-f*p+2*f*_-f*g,x=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*g+1,v=(-1-d)*p+(1.5+d)*_+.5*g,y=d*p-d*_;for(let A=0;A!==a;++A)r[A]=m*o[u+A]+x*o[l+A]+v*o[c+A]+y*o[h+A];return r}}class ly extends Wr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(i-e),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}}class uy extends Wr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Hn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=To(e,this.TimeBufferType),this.values=To(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:To(t.times,Array),values:To(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new uy(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ly(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new cy(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Or:e=this.InterpolantFactoryMethodDiscrete;break;case Fr:e=this.InterpolantFactoryMethodLinear;break;case Ia:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Or;case this.InterpolantFactoryMethodLinear:return Fr;case this.InterpolantFactoryMethodSmooth:return Ia}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&oy(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ia,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(i)c=!0;else{const h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const _=e[h+g];if(_!==e[f+g]||_!==e[d+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const h=a*n,f=o*n;for(let d=0;d!==n;++d)e[f+d]=e[h+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Hn.prototype.TimeBufferType=Float32Array;Hn.prototype.ValueBufferType=Float32Array;Hn.prototype.DefaultInterpolation=Fr;class Zs extends Hn{constructor(t,e,n){super(t,e,n)}}Zs.prototype.ValueTypeName="bool";Zs.prototype.ValueBufferType=Array;Zs.prototype.DefaultInterpolation=Or;Zs.prototype.InterpolantFactoryMethodLinear=void 0;Zs.prototype.InterpolantFactoryMethodSmooth=void 0;class Rd extends Hn{}Rd.prototype.ValueTypeName="color";class qs extends Hn{}qs.prototype.ValueTypeName="number";class hy extends Wr{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e);let l=t*a;for(let u=l+a;l!==u;l+=4)Bn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Ys extends Hn{InterpolantFactoryMethodLinear(t){return new hy(this.times,this.values,this.getValueSize(),t)}}Ys.prototype.ValueTypeName="quaternion";Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Js extends Hn{constructor(t,e,n){super(t,e,n)}}Js.prototype.ValueTypeName="string";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=Or;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class js extends Hn{}js.prototype.ValueTypeName="vector";class fy{constructor(t="",e=-1,n=[],i=Gp){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Pn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(py(n[o]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Hn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const u=ay(c);c=Ih(c,1,u),l=Ih(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new qs(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],u=l.name.match(r);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,_){if(d.length!==0){const p=[],m=[];wd(d,p,m,g),p.length!==0&&_.push(new h(f,p,m))}},i=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(const _ in d){const p=[],m=[];for(let x=0;x!==f[g].morphTargets.length;++x){const v=f[g];p.push(v.time),m.push(v.morphTarget===_?1:0)}i.push(new qs(".morphTargetInfluence["+_+"]",p,m))}c=d.length*o}else{const d=".bones["+e[h].name+"]";n(js,d+".position",f,"pos",i),n(Ys,d+".quaternion",f,"rot",i),n(js,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function dy(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return qs;case"vector":case"vector2":case"vector3":case"vector4":return js;case"color":return Rd;case"quaternion":return Ys;case"bool":case"boolean":return Zs;case"string":return Js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function py(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=dy(s.type);if(s.times===void 0){const e=[],n=[];wd(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}const xi={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class my{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const gy=new my;class Qs{constructor(t){this.manager=t!==void 0?t:gy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Qs.DEFAULT_MATERIAL_NAME="__DEFAULT";const jn={};class _y extends Error{constructor(t,e){super(t),this.response=e}}class Cd extends Qs{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=xi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(jn[t]!==void 0){jn[t].push({onLoad:e,onProgress:n,onError:i});return}jn[t]=[],jn[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=jn[t],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let _=0;const p=new ReadableStream({start(m){x();function x(){h.read().then(({done:v,value:y})=>{if(v)m.close();else{_+=y.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let S=0,E=u.length;S<E;S++){const C=u[S];C.onProgress&&C.onProgress(A)}m.enqueue(y),x()}},v=>{m.error(v)})}}});return new Response(p)}else throw new _y(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{xi.add(t,l);const u=jn[t];delete jn[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=jn[t];if(u===void 0)throw this.manager.itemError(t),l;delete jn[t];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class xy extends Qs{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=xi.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=Br("img");function c(){u(),xi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(h){u(),i&&i(h),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class vy extends Qs{constructor(t){super(t)}load(t,e,n,i){const r=new Le,o=new xy(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class ba extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const dc=new Ct,Dh=new P,Nh=new P;class Ql{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new va,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dh),Nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nh),e.updateMatrixWorld(),dc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(dc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class yy extends Ql{constructor(){super(new $e(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Gs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class My extends ba{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new yy}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Uh=new Ct,ur=new P,pc=new P;class Sy extends Ql{constructor(){super(new $e(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ut(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(t.matrixWorld),n.position.copy(ur),pc.copy(n.position),pc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pc),n.updateMatrixWorld(),i.makeTranslation(-ur.x,-ur.y,-ur.z),Uh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uh)}}class Pd extends ba{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Sy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class by extends Ql{constructor(){super(new Vl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ld extends ba{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new by}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ty extends ba{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Pr{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Ey extends Qs{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=xi.get(t);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return xi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){i&&i(l),xi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});xi.add(t,c),r.manager.itemStart(t)}}const tu="\\[\\]\\.:\\/",Ay=new RegExp("["+tu+"]","g"),eu="[^"+tu+"]",wy="[^"+tu.replace("\\.","")+"]",Ry=/((?:WC+[\/:])*)/.source.replace("WC",eu),Cy=/(WCOD+)?/.source.replace("WCOD",wy),Py=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",eu),Ly=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",eu),Iy=new RegExp("^"+Ry+Cy+Py+Ly+"$"),Dy=["material","materials","bones","map"];class Ny{constructor(t,e,n){const i=n||ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ae{constructor(t,e,n){this.path=e,this.parsedPath=n||ae.parseTrackName(e),this.node=ae.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ae.Composite(t,e,n):new ae(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ay,"")}static parseTrackName(t){const e=Iy.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Dy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=ae.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[i];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ae.Composite=Ny;ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ae.prototype.GetterByBindingType=[ae.prototype._getValue_direct,ae.prototype._getValue_array,ae.prototype._getValue_arrayElement,ae.prototype._getValue_toArray];ae.prototype.SetterByBindingTypeAndVersioning=[[ae.prototype._setValue_direct,ae.prototype._setValue_direct_setNeedsUpdate,ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_array,ae.prototype._setValue_array_setNeedsUpdate,ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_arrayElement,ae.prototype._setValue_arrayElement_setNeedsUpdate,ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_fromArray,ae.prototype._setValue_fromArray_setNeedsUpdate,ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Oh=new Ct;class Uy{constructor(t,e,n=0,i=1/0){this.ray=new qi(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Hl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Oh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Oh),this}intersectObject(t,e=!0,n=[]){return _l(t,this,n,e),n.sort(Fh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)_l(t[i],this,n,e);return n.sort(Fh),n}}function Fh(s,t){return s.distance-t.distance}function _l(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)_l(r[o],t,e,!0)}}class Bh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const zh=new P,Eo=new P;class ti{constructor(t=new P,e=new P){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){zh.subVectors(t,this.start),Eo.subVectors(this.end,this.start);const n=Eo.dot(Eo);let r=Eo.dot(zh)/n;return e&&(r=Ee(r,0,1)),r}closestPointToPoint(t,e,n){const i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);const kh={type:"change"},mc={type:"start"},Hh={type:"end"},Ao=new qi,Vh=new Un,Oy=Math.cos(70*sd.DEG2RAD);class Fy extends Xi{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:Zi.ROTATE,TWO:Zi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(T){T.addEventListener("keydown",gt),this._domElementKeyEvents=T},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",gt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(kh),n.update(),r=i.NONE},this.update=function(){const T=new P,B=new Bn().setFromUnitVectors(t.up,new P(0,1,0)),X=B.clone().invert(),q=new P,et=new Bn,vt=new P,Lt=2*Math.PI;return function(mt=null){const It=n.object.position;T.copy(It).sub(n.target),T.applyQuaternion(B),a.setFromVector3(T),n.autoRotate&&r===i.NONE&&D(M(mt)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let rt=n.minAzimuthAngle,Qt=n.maxAzimuthAngle;isFinite(rt)&&isFinite(Qt)&&(rt<-Math.PI?rt+=Lt:rt>Math.PI&&(rt-=Lt),Qt<-Math.PI?Qt+=Lt:Qt>Math.PI&&(Qt-=Lt),rt<=Qt?a.theta=Math.max(rt,Math.min(Qt,a.theta)):a.theta=a.theta>(rt+Qt)/2?Math.max(rt,a.theta):Math.min(Qt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let ii=!1;if(n.zoomToCursor&&S||n.object.isOrthographicCamera)a.radius=st(a.radius);else{const Fe=a.radius;a.radius=st(a.radius*l),ii=Fe!=a.radius}if(T.setFromSpherical(a),T.applyQuaternion(X),It.copy(n.target).add(T),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0)),n.zoomToCursor&&S){let Fe=null;if(n.object.isPerspectiveCamera){const Vn=T.length();Fe=st(Vn*l);const Ri=Vn-Fe;n.object.position.addScaledVector(y,Ri),n.object.updateMatrixWorld(),ii=!!Ri}else if(n.object.isOrthographicCamera){const Vn=new P(A.x,A.y,0);Vn.unproject(n.object);const Ri=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ii=Ri!==n.object.zoom;const er=new P(A.x,A.y,0);er.unproject(n.object),n.object.position.sub(er).add(Vn),n.object.updateMatrixWorld(),Fe=T.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Fe!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Fe).add(n.object.position):(Ao.origin.copy(n.object.position),Ao.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ao.direction))<Oy?t.lookAt(n.target):(Vh.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ao.intersectPlane(Vh,n.target))))}else if(n.object.isOrthographicCamera){const Fe=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),Fe!==n.object.zoom&&(n.object.updateProjectionMatrix(),ii=!0)}return l=1,S=!1,ii||q.distanceToSquared(n.object.position)>o||8*(1-et.dot(n.object.quaternion))>o||vt.distanceToSquared(n.target)>o?(n.dispatchEvent(kh),q.copy(n.object.position),et.copy(n.object.quaternion),vt.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",xt),n.domElement.removeEventListener("pointerdown",Ot),n.domElement.removeEventListener("pointercancel",w),n.domElement.removeEventListener("wheel",it),n.domElement.removeEventListener("pointermove",I),n.domElement.removeEventListener("pointerup",w),n.domElement.getRootNode().removeEventListener("keydown",Et,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",gt),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const o=1e-6,a=new Bh,c=new Bh;let l=1;const u=new P,h=new ut,f=new ut,d=new ut,g=new ut,_=new ut,p=new ut,m=new ut,x=new ut,v=new ut,y=new P,A=new ut;let S=!1;const E=[],C={};let b=!1;function M(T){return T!==null?2*Math.PI/60*n.autoRotateSpeed*T:2*Math.PI/60/60*n.autoRotateSpeed}function L(T){const B=Math.abs(T*.01);return Math.pow(.95,n.zoomSpeed*B)}function D(T){c.theta-=T}function N(T){c.phi-=T}const O=function(){const T=new P;return function(X,q){T.setFromMatrixColumn(q,0),T.multiplyScalar(-X),u.add(T)}}(),G=function(){const T=new P;return function(X,q){n.screenSpacePanning===!0?T.setFromMatrixColumn(q,1):(T.setFromMatrixColumn(q,0),T.crossVectors(n.object.up,T)),T.multiplyScalar(X),u.add(T)}}(),k=function(){const T=new P;return function(X,q){const et=n.domElement;if(n.object.isPerspectiveCamera){const vt=n.object.position;T.copy(vt).sub(n.target);let Lt=T.length();Lt*=Math.tan(n.object.fov/2*Math.PI/180),O(2*X*Lt/et.clientHeight,n.object.matrix),G(2*q*Lt/et.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(O(X*(n.object.right-n.object.left)/n.object.zoom/et.clientWidth,n.object.matrix),G(q*(n.object.top-n.object.bottom)/n.object.zoom/et.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function Z(T){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=T:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function W(T){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=T:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ht(T,B){if(!n.zoomToCursor)return;S=!0;const X=n.domElement.getBoundingClientRect(),q=T-X.left,et=B-X.top,vt=X.width,Lt=X.height;A.x=q/vt*2-1,A.y=-(et/Lt)*2+1,y.set(A.x,A.y,1).unproject(n.object).sub(n.object.position).normalize()}function st(T){return Math.max(n.minDistance,Math.min(n.maxDistance,T))}function pt(T){h.set(T.clientX,T.clientY)}function At(T){ht(T.clientX,T.clientX),m.set(T.clientX,T.clientY)}function at(T){g.set(T.clientX,T.clientY)}function Y(T){f.set(T.clientX,T.clientY),d.subVectors(f,h).multiplyScalar(n.rotateSpeed);const B=n.domElement;D(2*Math.PI*d.x/B.clientHeight),N(2*Math.PI*d.y/B.clientHeight),h.copy(f),n.update()}function H(T){x.set(T.clientX,T.clientY),v.subVectors(x,m),v.y>0?Z(L(v.y)):v.y<0&&W(L(v.y)),m.copy(x),n.update()}function ot(T){_.set(T.clientX,T.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),k(p.x,p.y),g.copy(_),n.update()}function ct(T){ht(T.clientX,T.clientY),T.deltaY<0?W(L(T.deltaY)):T.deltaY>0&&Z(L(T.deltaY)),n.update()}function Ut(T){let B=!1;switch(T.code){case n.keys.UP:T.ctrlKey||T.metaKey||T.shiftKey?N(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):k(0,n.keyPanSpeed),B=!0;break;case n.keys.BOTTOM:T.ctrlKey||T.metaKey||T.shiftKey?N(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):k(0,-n.keyPanSpeed),B=!0;break;case n.keys.LEFT:T.ctrlKey||T.metaKey||T.shiftKey?D(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):k(n.keyPanSpeed,0),B=!0;break;case n.keys.RIGHT:T.ctrlKey||T.metaKey||T.shiftKey?D(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):k(-n.keyPanSpeed,0),B=!0;break}B&&(T.preventDefault(),n.update())}function Ht(T){if(E.length===1)h.set(T.pageX,T.pageY);else{const B=Ft(T),X=.5*(T.pageX+B.x),q=.5*(T.pageY+B.y);h.set(X,q)}}function Wt(T){if(E.length===1)g.set(T.pageX,T.pageY);else{const B=Ft(T),X=.5*(T.pageX+B.x),q=.5*(T.pageY+B.y);g.set(X,q)}}function re(T){const B=Ft(T),X=T.pageX-B.x,q=T.pageY-B.y,et=Math.sqrt(X*X+q*q);m.set(0,et)}function U(T){n.enableZoom&&re(T),n.enablePan&&Wt(T)}function ee(T){n.enableZoom&&re(T),n.enableRotate&&Ht(T)}function jt(T){if(E.length==1)f.set(T.pageX,T.pageY);else{const X=Ft(T),q=.5*(T.pageX+X.x),et=.5*(T.pageY+X.y);f.set(q,et)}d.subVectors(f,h).multiplyScalar(n.rotateSpeed);const B=n.domElement;D(2*Math.PI*d.x/B.clientHeight),N(2*Math.PI*d.y/B.clientHeight),h.copy(f)}function Jt(T){if(E.length===1)_.set(T.pageX,T.pageY);else{const B=Ft(T),X=.5*(T.pageX+B.x),q=.5*(T.pageY+B.y);_.set(X,q)}p.subVectors(_,g).multiplyScalar(n.panSpeed),k(p.x,p.y),g.copy(_)}function St(T){const B=Ft(T),X=T.pageX-B.x,q=T.pageY-B.y,et=Math.sqrt(X*X+q*q);x.set(0,et),v.set(0,Math.pow(x.y/m.y,n.zoomSpeed)),Z(v.y),m.copy(x);const vt=(T.pageX+B.x)*.5,Lt=(T.pageY+B.y)*.5;ht(vt,Lt)}function le(T){n.enableZoom&&St(T),n.enablePan&&Jt(T)}function Bt(T){n.enableZoom&&St(T),n.enableRotate&&jt(T)}function Ot(T){n.enabled!==!1&&(E.length===0&&(n.domElement.setPointerCapture(T.pointerId),n.domElement.addEventListener("pointermove",I),n.domElement.addEventListener("pointerup",w)),!Mt(T)&&(Yt(T),T.pointerType==="touch"?zt(T):K(T)))}function I(T){n.enabled!==!1&&(T.pointerType==="touch"?lt(T):Q(T))}function w(T){switch(Pt(T),E.length){case 0:n.domElement.releasePointerCapture(T.pointerId),n.domElement.removeEventListener("pointermove",I),n.domElement.removeEventListener("pointerup",w),n.dispatchEvent(Hh),r=i.NONE;break;case 1:const B=E[0],X=C[B];zt({pointerId:B,pageX:X.x,pageY:X.y});break}}function K(T){let B;switch(T.button){case 0:B=n.mouseButtons.LEFT;break;case 1:B=n.mouseButtons.MIDDLE;break;case 2:B=n.mouseButtons.RIGHT;break;default:B=-1}switch(B){case $i.DOLLY:if(n.enableZoom===!1)return;At(T),r=i.DOLLY;break;case $i.ROTATE:if(T.ctrlKey||T.metaKey||T.shiftKey){if(n.enablePan===!1)return;at(T),r=i.PAN}else{if(n.enableRotate===!1)return;pt(T),r=i.ROTATE}break;case $i.PAN:if(T.ctrlKey||T.metaKey||T.shiftKey){if(n.enableRotate===!1)return;pt(T),r=i.ROTATE}else{if(n.enablePan===!1)return;at(T),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(mc)}function Q(T){switch(r){case i.ROTATE:if(n.enableRotate===!1)return;Y(T);break;case i.DOLLY:if(n.enableZoom===!1)return;H(T);break;case i.PAN:if(n.enablePan===!1)return;ot(T);break}}function it(T){n.enabled===!1||n.enableZoom===!1||r!==i.NONE||(T.preventDefault(),n.dispatchEvent(mc),ct(tt(T)),n.dispatchEvent(Hh))}function tt(T){const B=T.deltaMode,X={clientX:T.clientX,clientY:T.clientY,deltaY:T.deltaY};switch(B){case 1:X.deltaY*=16;break;case 2:X.deltaY*=100;break}return T.ctrlKey&&!b&&(X.deltaY*=10),X}function Et(T){T.key==="Control"&&(b=!0,n.domElement.getRootNode().addEventListener("keyup",dt,{passive:!0,capture:!0}))}function dt(T){T.key==="Control"&&(b=!1,n.domElement.getRootNode().removeEventListener("keyup",dt,{passive:!0,capture:!0}))}function gt(T){n.enabled===!1||n.enablePan===!1||Ut(T)}function zt(T){switch(Dt(T),E.length){case 1:switch(n.touches.ONE){case Zi.ROTATE:if(n.enableRotate===!1)return;Ht(T),r=i.TOUCH_ROTATE;break;case Zi.PAN:if(n.enablePan===!1)return;Wt(T),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(n.touches.TWO){case Zi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;U(T),r=i.TOUCH_DOLLY_PAN;break;case Zi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ee(T),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&n.dispatchEvent(mc)}function lt(T){switch(Dt(T),r){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;jt(T),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Jt(T),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;le(T),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Bt(T),n.update();break;default:r=i.NONE}}function xt(T){n.enabled!==!1&&T.preventDefault()}function Yt(T){E.push(T.pointerId)}function Pt(T){delete C[T.pointerId];for(let B=0;B<E.length;B++)if(E[B]==T.pointerId){E.splice(B,1);return}}function Mt(T){for(let B=0;B<E.length;B++)if(E[B]==T.pointerId)return!0;return!1}function Dt(T){let B=C[T.pointerId];B===void 0&&(B=new ut,C[T.pointerId]=B),B.set(T.pageX,T.pageY)}function Ft(T){const B=T.pointerId===E[0]?E[1]:E[0];return C[B]}n.domElement.addEventListener("contextmenu",xt),n.domElement.addEventListener("pointerdown",Ot),n.domElement.addEventListener("pointercancel",w),n.domElement.addEventListener("wheel",it,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Et,{passive:!0,capture:!0}),this.update()}}function Gh(s,t){if(t===Wp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(t===fl||t===nd){let e=s.getIndex();if(e===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),e=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=e.count-2,i=[];if(t===fl)for(let o=1;o<=n;o++)i.push(e.getX(0)),i.push(e.getX(o)),i.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(e.getX(o)),i.push(e.getX(o+1)),i.push(e.getX(o+2))):(i.push(e.getX(o+2)),i.push(e.getX(o+1)),i.push(e.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),s}class By extends Qs{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Gy(e)}),this.register(function(e){return new Wy(e)}),this.register(function(e){return new Qy(e)}),this.register(function(e){return new tM(e)}),this.register(function(e){return new eM(e)}),this.register(function(e){return new qy(e)}),this.register(function(e){return new Yy(e)}),this.register(function(e){return new jy(e)}),this.register(function(e){return new Ky(e)}),this.register(function(e){return new Vy(e)}),this.register(function(e){return new $y(e)}),this.register(function(e){return new Xy(e)}),this.register(function(e){return new Jy(e)}),this.register(function(e){return new Zy(e)}),this.register(function(e){return new ky(e)}),this.register(function(e){return new nM(e)}),this.register(function(e){return new iM(e)})}load(t,e,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Pr.extractUrlBase(t);o=Pr.resolveURL(l,this.path)}else o=Pr.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){i?i(l):console.error(l),r.manager.itemError(t),r.manager.itemEnd(t)},c=new Cd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{r.parse(l,o,function(u){e(u),r.manager.itemEnd(t)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let r;const o={},a={},c=new TextDecoder;if(typeof t=="string")r=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Id){try{o[$t.KHR_BINARY_GLTF]=new sM(t)}catch(h){i&&i(h);return}r=JSON.parse(o[$t.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(t));else r=t;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new _M(r,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case $t.KHR_MATERIALS_UNLIT:o[h]=new Hy;break;case $t.KHR_DRACO_MESH_COMPRESSION:o[h]=new rM(r,this.dracoLoader);break;case $t.KHR_TEXTURE_TRANSFORM:o[h]=new oM;break;case $t.KHR_MESH_QUANTIZATION:o[h]=new aM;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,r){n.parse(t,e,i,r)})}}function zy(){let s={};return{get:function(t){return s[t]},add:function(t,e){s[t]=e},remove:function(t){delete s[t]},removeAll:function(){s={}}}}const $t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ky{constructor(t){this.parser=t,this.name=$t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const r=e[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const r=e.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[t];let l;const u=new Gt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Ge);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ld(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Pd(u),l.distance=h;break;case"spot":l=new My(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Zn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),i=Promise.resolve(l),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,r=n.json.nodes[t],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}}class Hy{constructor(){this.name=$t.KHR_MATERIALS_UNLIT}getMaterialType(){return _n}extendParams(t,e,n){const i=[];t.color=new Gt(1,1,1),t.opacity=1;const r=e.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Ge),t.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",r.baseColorTexture,ke))}return Promise.all(i)}}class Vy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(e.emissiveIntensity=r),Promise.resolve()}}class Gy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new ut(a,a)}return Promise.all(r)}}class Wy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Xy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class qy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];e.sheenColor=new Gt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Ge)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,ke)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class Yy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class jy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new Gt().setRGB(a[0],a[1],a[2],Ge),Promise.all(r)}}class Ky{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return e.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class $y{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new Gt().setRGB(a[0],a[1],a[2],Ge),o.specularColorTexture!==void 0&&r.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,ke)),Promise.all(r)}}class Zy{constructor(t){this.parser=t,this.name=$t.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(r)}}class Jy{constructor(t){this.parser=t,this.name=$t.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Qy{constructor(t){this.parser=t,this.name=$t.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,r.source,o)}}class tM{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class eM{constructor(t){this.parser=t,this.name=$t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,r=i.textures[t];if(!r.extensions||!r.extensions[e])return null;const o=r.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class nM{constructor(t){this.name=$t.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class iM{constructor(t){this.name=$t.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==pn.TRIANGLES&&l.mode!==pn.TRIANGLE_STRIP&&l.mode!==pn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const _=new Ct,p=new P,m=new Bn,x=new P(1,1,1),v=new Iv(g.geometry,g.material,f);for(let y=0;y<f;y++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,y),c.SCALE&&x.fromBufferAttribute(c.SCALE,y),v.setMatrixAt(y,_.compose(p,m,x));for(const y in c)if(y==="_COLOR_0"){const A=c[y];v.instanceColor=new ml(A.array,A.itemSize,A.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,c[y]);ve.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),d.push(v)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Id="glTF",hr=12,Wh={JSON:1313821514,BIN:5130562};class sM{constructor(t){this.name=$t.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,hr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Id)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-hr,r=new DataView(t,hr);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Wh.JSON){const l=new Uint8Array(t,hr+o,a);this.content=n.decode(l)}else if(c===Wh.BIN){const l=hr+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class rM{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$t.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,r=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const u in o){const h=xl[u]||u.toLowerCase();a[h]=o[u]}for(const u in t.attributes){const h=xl[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[t.attributes[u]],d=Os[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return e.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],p=c[g];p!==void 0&&(_.normalized=p)}h(d)},a,l,Ge,f)})})}}class oM{constructor(){this.name=$t.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class aM{constructor(){this.name=$t.KHR_MESH_QUANTIZATION}}class Dd extends Wr{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i*3+i;for(let o=0;o!==i;o++)e[o]=n[r+o];return e}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-e,h=(n-e)/u,f=h*h,d=f*h,g=t*l,_=g-l,p=-2*d+3*f,m=d-f,x=1-p,v=m-f+h;for(let y=0;y!==a;y++){const A=o[_+y+a],S=o[_+y+c]*u,E=o[g+y+a],C=o[g+y]*u;r[y]=x*A+v*S+p*E+m*C}return r}}const cM=new Bn;class lM extends Dd{interpolate_(t,e,n,i){const r=super.interpolate_(t,e,n,i);return cM.fromArray(r).normalize().toArray(r),r}}const pn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Os={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Xh={9728:Je,9729:ln,9984:qf,9985:Xo,9986:yr,9987:Jn},qh={33071:gi,33648:ia,10497:ks},gc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},xl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},fi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},uM={CUBICSPLINE:void 0,LINEAR:Fr,STEP:Or},_c={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function hM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Xs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:In})),s.DefaultMaterial}function Oi(s,t,e){for(const n in e.extensions)s[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Zn(s,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(s.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function fM(s,t,e){let n=!1,i=!1,r=!1;for(let l=0,u=t.length;l<u;l++){const h=t[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],c=[];for(let l=0,u=t.length;l<u;l++){const h=t[l];if(n){const f=h.POSITION!==void 0?e.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){const f=h.NORMAL!==void 0?e.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){const f=h.COLOR_0!==void 0?e.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function dM(s,t){if(s.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)s.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(s.morphTargetInfluences.length===e.length){s.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)s.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function pM(s){let t;const e=s.extensions&&s.extensions[$t.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+xc(e.attributes):t=s.indices+":"+xc(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)t+=":"+xc(s.targets[n]);return t}function xc(s){let t="";const e=Object.keys(s).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+s[e[n]]+";";return t}function vl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function mM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const gM=new Ct;class _M{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new zy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new vy(this.options.manager):this.textureLoader=new Ey(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Cd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Oi(r,a,i),Zn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=e.length;i<r;i++){const o=e[i].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let i=0,r=t.length;i<r;i++){const o=t[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,u]of o.children.entries())r(u,a.children[l])};return r(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const r=t(e[i]);r&&n.push(r)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(e)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(r,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[$t.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Pr.resolveURL(e.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,r=e.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const o=gc[i.type],a=Os[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Ce(l,o,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=gc[i.type],l=Os[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(d&&d!==h){const m=Math.floor(f/d),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=e.cache.get(x);v||(_=new l(a,m*d,i.count*d/u),v=new wv(_,d/u),e.cache.add(x,v)),p=new Xl(v,c,f%d/u,g)}else a===null?_=new l(i.count*c):_=new l(a,f,i.count*c),p=new Ce(_,c,g);if(i.sparse!==void 0){const m=gc.SCALAR,x=Os[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,A=new x(o[1],v,i.sparse.count*m),S=new l(o[2],y,i.sparse.count*c);a!==null&&(p=new Ce(p.array.slice(),p.itemSize,p.normalized));for(let E=0,C=A.length;E<C;E++){const b=A[E];if(p.setX(b,S[E*c]),c>=2&&p.setY(b,S[E*c+1]),c>=3&&p.setZ(b,S[E*c+2]),c>=4&&p.setW(b,S[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(t){const e=this.json,n=this.options,r=e.textures[t].source,o=e.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,r,a)}loadTextureImage(t,e,n){const i=this,r=this.json,o=r.textures[t],a=r.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Xh[f.magFilter]||ln,u.minFilter=Xh[f.minFilter]||Jn,u.wrapS=qh[f.wrapS]||ks,u.wrapT=qh[f.wrapT]||ks,i.associations.set(u,{textures:t}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,i=this.json,r=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(h=>h.clone());const o=i.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;e.isImageBitmapLoader===!0&&(g=function(_){const p=new Le(_);p.needsUpdate=!0,f(p)}),e.load(Pr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),Zn(h,o),h.userData.mimeType=o.mimeType||mM(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[t]=u,u}assignTexture(t,e,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[$t.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[$t.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[$t.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,r=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Sd,Ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Md,Ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return Xs}loadMaterial(t){const e=this,n=this.json,i=this.extensions,r=n.materials[t];let o;const a={},c=r.extensions||{},l=[];if(c[$t.KHR_MATERIALS_UNLIT]){const h=i[$t.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,e))}else{const h=r.pbrMetallicRoughness||{};if(a.color=new Gt(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Ge),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",h.baseColorTexture,ke)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(t,a)})))}r.doubleSided===!0&&(a.side=cn);const u=r.alphaMode||_c.OPAQUE;if(u===_c.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===_c.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==_n&&(l.push(e.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ut(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==_n&&(l.push(e.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==_n){const h=r.emissiveFactor;a.emissive=new Gt().setRGB(h[0],h[1],h[2],Ge)}return r.emissiveTexture!==void 0&&o!==_n&&l.push(e.assignTexture(a,"emissiveMap",r.emissiveTexture,ke)),Promise.all(l).then(function(){const h=new o(a);return r.name&&(h.name=r.name),Zn(h,r),e.associations.set(h,{materials:t}),r.extensions&&Oi(i,h,r),h})}createUniqueName(t){const e=ae.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[$t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return Yh(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],u=pM(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[$t.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Yh(new Oe,l,e),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,i=this.extensions,r=n.meshes[t],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const u=o[c].material===void 0?hM(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],p=o[d];let m;const x=l[d];if(p.mode===pn.TRIANGLES||p.mode===pn.TRIANGLE_STRIP||p.mode===pn.TRIANGLE_FAN||p.mode===void 0)m=r.isSkinnedMesh===!0?new Cv(_,x):new Zt(_,x),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===pn.TRIANGLE_STRIP?m.geometry=Gh(m.geometry,nd):p.mode===pn.TRIANGLE_FAN&&(m.geometry=Gh(m.geometry,fl));else if(p.mode===pn.LINES)m=new Hv(_,x);else if(p.mode===pn.LINE_STRIP)m=new Yl(_,x);else if(p.mode===pn.LINE_LOOP)m=new Vv(_,x);else if(p.mode===pn.POINTS)m=new Gv(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&dM(m,r),m.name=e.createUniqueName(r.name||"mesh_"+t),Zn(m,r),p.extensions&&Oi(i,m,p),e.assignFinalMaterial(m),h.push(m)}for(let d=0,g=h.length;d<g;d++)e.associations.set(h[d],{meshes:t,primitives:d});if(h.length===1)return r.extensions&&Oi(i,h[0],r),h[0];const f=new _i;r.extensions&&Oi(i,f,r),e.associations.set(f,{meshes:t});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new $e(sd.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Vl(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Zn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,r=e.joints.length;i<r;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){const h=o[l];if(h){a.push(h);const f=new Ct;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new ql(a,c)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],r=i.name?i.name:"animation_"+t,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],g=i.samplers[d.sampler],_=d.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",x)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],_=h[3],p=h[4],m=[];for(let x=0,v=f.length;x<v;x++){const y=f[x],A=d[x],S=g[x],E=_[x],C=p[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const b=n._createAnimationTracks(y,A,S,E,C);if(b)for(let M=0;M<b.length;M++)m.push(b[M])}return new fy(r,void 0,m)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],r=n._loadNodeShallow(t),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,gM)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const r=e.nodes[t],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new yd:l.length>1?u=new _i:l.length===1?u=l[0]:u=new ve,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Zn(u,r),r.extensions&&Oi(n,u,r),r.matrix!==void 0){const h=new Ct;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=t,u}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,r=new _i;n.name&&(r.name=i.createUniqueName(n.name)),Zn(r,n),n.extensions&&Oi(e,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof Ln||f instanceof Le)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(t,e,n,i,r){const o=[],a=t.name?t.name:t.uuid,c=[];fi[r.path]===fi.weights?t.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(fi[r.path]){case fi.weights:l=qs;break;case fi.rotation:l=Ys;break;case fi.position:case fi.scale:l=js;break;default:switch(n.itemSize){case 1:l=qs;break;case 2:case 3:default:l=js;break}break}const u=i.interpolation!==void 0?uM[i.interpolation]:Fr,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+fi[r.path],e.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=vl(e.constructor),i=new Float32Array(e.length);for(let r=0,o=e.length;r<o;r++)i[r]=e[r]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof Ys?lM:Dd;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function xM(s,t,e){const n=t.attributes,i=new pe;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const u=vl(Os[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=t.targets;if(r!==void 0){const a=new P,c=new P;for(let l=0,u=r.length;l<u;l++){const h=r[l];if(h.POSITION!==void 0){const f=e.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const _=vl(Os[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Ue;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Yh(s,t,e){const n=t.attributes,i=[];function r(o,a){return e.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(const o in n){const a=xl[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(t.indices!==void 0&&!s.index){const o=e.getDependency("accessor",t.indices).then(function(a){s.setIndex(a)});i.push(o)}return te.workingColorSpace!==Ge&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${te.workingColorSpace}" not supported.`),Zn(s,t),xM(s,t,e),Promise.all(i).then(function(){return t.targets!==void 0?fM(s,t.targets,e):s})}const Nd=0,vM=1,yM=2,jh=2,vc=1.25,Kh=1,Lr=6*4+4+4,Ta=65535,MM=Math.pow(2,-24),yc=Symbol("SKIP_GENERATION");function SM(s){return s.index?s.index.count:s.attributes.position.count}function tr(s){return SM(s)/3}function bM(s,t=ArrayBuffer){return s>65535?new Uint32Array(new t(4*s)):new Uint16Array(new t(2*s))}function TM(s,t){if(!s.index){const e=s.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=bM(e,n);s.setIndex(new Ce(i,1));for(let r=0;r<e;r++)i[r]=r}}function Ud(s,t){const e=tr(s),n=t||s.drawRange,i=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,i),a=Math.min(e,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function Od(s,t){if(!s.groups||!s.groups.length)return Ud(s,t);const e=[],n=new Set,i=t||s.drawRange,r=i.start/3,o=(i.start+i.count)/3;for(const c of s.groups){const l=c.start/3,u=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,u))}const a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){const l=a[c],u=a[c+1];e.push({offset:Math.floor(l),count:Math.floor(u-l)})}return e}function EM(s,t){const e=tr(s),n=Od(s,t).sort((o,a)=>o.offset-a.offset),i=n[n.length-1];i.count=Math.min(e-i.offset,i.count);let r=0;return n.forEach(({count:o})=>r+=o),e!==r}function Mc(s,t,e,n,i){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,f=1/0,d=1/0,g=-1/0,_=-1/0,p=-1/0;for(let m=t*6,x=(t+e)*6;m<x;m+=6){const v=s[m+0],y=s[m+1],A=v-y,S=v+y;A<r&&(r=A),S>c&&(c=S),v<h&&(h=v),v>g&&(g=v);const E=s[m+2],C=s[m+3],b=E-C,M=E+C;b<o&&(o=b),M>l&&(l=M),E<f&&(f=E),E>_&&(_=E);const L=s[m+4],D=s[m+5],N=L-D,O=L+D;N<a&&(a=N),O>u&&(u=O),L<d&&(d=L),L>p&&(p=L)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=u,i[0]=h,i[1]=f,i[2]=d,i[3]=g,i[4]=_,i[5]=p}function AM(s,t=null,e=null,n=null){const i=s.attributes.position,r=s.index?s.index.array:null,o=tr(s),a=i.normalized;let c;t===null?(c=new Float32Array(o*6*4),e=0,n=o):(c=t,e=e||0,n=n||o);const l=i.array,u=i.offset||0;let h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);const f=["getX","getY","getZ"];for(let d=e;d<e+n;d++){const g=d*3,_=d*6;let p=g+0,m=g+1,x=g+2;r&&(p=r[p],m=r[m],x=r[x]),a||(p=p*h+u,m=m*h+u,x=x*h+u);for(let v=0;v<3;v++){let y,A,S;a?(y=i[f[v]](p),A=i[f[v]](m),S=i[f[v]](x)):(y=l[p+v],A=l[m+v],S=l[x+v]);let E=y;A<E&&(E=A),S<E&&(E=S);let C=y;A>C&&(C=A),S>C&&(C=S);const b=(C-E)/2,M=v*2;c[_+M+0]=E+b,c[_+M+1]=b+(Math.abs(E)+b)*MM}}return c}function be(s,t,e){return e.min.x=t[s],e.min.y=t[s+1],e.min.z=t[s+2],e.max.x=t[s+3],e.max.y=t[s+4],e.max.z=t[s+5],e}function $h(s){let t=-1,e=-1/0;for(let n=0;n<3;n++){const i=s[n+3]-s[n];i>e&&(e=i,t=n)}return t}function Zh(s,t){t.set(s)}function Jh(s,t,e){let n,i;for(let r=0;r<3;r++){const o=r+3;n=s[r],i=t[r],e[r]=n<i?n:i,n=s[o],i=t[o],e[o]=n>i?n:i}}function wo(s,t,e){for(let n=0;n<3;n++){const i=t[s+2*n],r=t[s+2*n+1],o=i-r,a=i+r;o<e[n]&&(e[n]=o),a>e[n+3]&&(e[n+3]=a)}}function fr(s){const t=s[3]-s[0],e=s[4]-s[1],n=s[5]-s[2];return 2*(t*e+e*n+n*t)}const $n=32,wM=(s,t)=>s.candidate-t.candidate,di=new Array($n).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Ro=new Float32Array(6);function RM(s,t,e,n,i,r){let o=-1,a=0;if(r===Nd)o=$h(t),o!==-1&&(a=(t[o]+t[o+3])/2);else if(r===vM)o=$h(s),o!==-1&&(a=CM(e,n,i,o));else if(r===yM){const c=fr(s);let l=vc*i;const u=n*6,h=(n+i)*6;for(let f=0;f<3;f++){const d=t[f],p=(t[f+3]-d)/$n;if(i<$n/4){const m=[...di];m.length=i;let x=0;for(let y=u;y<h;y+=6,x++){const A=m[x];A.candidate=e[y+2*f],A.count=0;const{bounds:S,leftCacheBounds:E,rightCacheBounds:C}=A;for(let b=0;b<3;b++)C[b]=1/0,C[b+3]=-1/0,E[b]=1/0,E[b+3]=-1/0,S[b]=1/0,S[b+3]=-1/0;wo(y,e,S)}m.sort(wM);let v=i;for(let y=0;y<v;y++){const A=m[y];for(;y+1<v&&m[y+1].candidate===A.candidate;)m.splice(y+1,1),v--}for(let y=u;y<h;y+=6){const A=e[y+2*f];for(let S=0;S<v;S++){const E=m[S];A>=E.candidate?wo(y,e,E.rightCacheBounds):(wo(y,e,E.leftCacheBounds),E.count++)}}for(let y=0;y<v;y++){const A=m[y],S=A.count,E=i-A.count,C=A.leftCacheBounds,b=A.rightCacheBounds;let M=0;S!==0&&(M=fr(C)/c);let L=0;E!==0&&(L=fr(b)/c);const D=Kh+vc*(M*S+L*E);D<l&&(o=f,l=D,a=A.candidate)}}else{for(let v=0;v<$n;v++){const y=di[v];y.count=0,y.candidate=d+p+v*p;const A=y.bounds;for(let S=0;S<3;S++)A[S]=1/0,A[S+3]=-1/0}for(let v=u;v<h;v+=6){let S=~~((e[v+2*f]-d)/p);S>=$n&&(S=$n-1);const E=di[S];E.count++,wo(v,e,E.bounds)}const m=di[$n-1];Zh(m.bounds,m.rightCacheBounds);for(let v=$n-2;v>=0;v--){const y=di[v],A=di[v+1];Jh(y.bounds,A.rightCacheBounds,y.rightCacheBounds)}let x=0;for(let v=0;v<$n-1;v++){const y=di[v],A=y.count,S=y.bounds,C=di[v+1].rightCacheBounds;A!==0&&(x===0?Zh(S,Ro):Jh(S,Ro,Ro)),x+=A;let b=0,M=0;x!==0&&(b=fr(Ro)/c);const L=i-x;L!==0&&(M=fr(C)/c);const D=Kh+vc*(b*x+M*L);D<l&&(o=f,l=D,a=y.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function CM(s,t,e,n){let i=0;for(let r=t,o=t+e;r<o;r++)i+=s[r*6+n*2];return i/e}class Sc{constructor(){this.boundingData=new Float32Array(6)}}function PM(s,t,e,n,i,r){let o=n,a=n+i-1;const c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&e[o*6+l]<c;)o++;for(;o<=a&&e[a*6+l]>=c;)a--;if(o<a){for(let u=0;u<3;u++){let h=t[o*3+u];t[o*3+u]=t[a*3+u],t[a*3+u]=h}for(let u=0;u<6;u++){let h=e[o*6+u];e[o*6+u]=e[a*6+u],e[a*6+u]=h}o++,a--}else return o}}function LM(s,t,e,n,i,r){let o=n,a=n+i-1;const c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&e[o*6+l]<c;)o++;for(;o<=a&&e[a*6+l]>=c;)a--;if(o<a){let u=s[o];s[o]=s[a],s[a]=u;for(let h=0;h<6;h++){let f=e[o*6+h];e[o*6+h]=e[a*6+h],e[a*6+h]=f}o++,a--}else return o}}function tn(s,t){return t[s+15]===65535}function hn(s,t){return t[s+6]}function xn(s,t){return t[s+14]}function vn(s){return s+8}function yn(s,t){return t[s+6]}function Fd(s,t){return t[s+7]}let Bd,Sr,Jo,zd;const IM=Math.pow(2,32);function yl(s){return"count"in s?1:1+yl(s.left)+yl(s.right)}function DM(s,t,e){return Bd=new Float32Array(e),Sr=new Uint32Array(e),Jo=new Uint16Array(e),zd=new Uint8Array(e),Ml(s,t)}function Ml(s,t){const e=s/4,n=s/2,i="count"in t,r=t.boundingData;for(let o=0;o<6;o++)Bd[e+o]=r[o];if(i)if(t.buffer){const o=t.buffer;zd.set(new Uint8Array(o),s);for(let a=s,c=s+o.byteLength;a<c;a+=Lr){const l=a/2;tn(l,Jo)||(Sr[a/4+6]+=e)}return s+o.byteLength}else{const o=t.offset,a=t.count;return Sr[e+6]=o,Jo[n+14]=a,Jo[n+15]=Ta,s+Lr}else{const o=t.left,a=t.right,c=t.splitAxis;let l;if(l=Ml(s+Lr,o),l/4>IM)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Sr[e+6]=l/4,l=Ml(l,a),Sr[e+7]=c,l}}function NM(s,t){const e=(s.index?s.index.count:s.attributes.position.count)/3,n=e>2**16,i=n?4:2,r=t?new SharedArrayBuffer(e*i):new ArrayBuffer(e*i),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function UM(s,t,e,n,i){const{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:u}=i,h=s._indirectBuffer,f=s.geometry,d=f.index?f.index.array:null,g=u?LM:PM,_=tr(f),p=new Float32Array(6);let m=!1;const x=new Sc;return Mc(t,e,n,x.boundingData,p),y(x,e,n,p),x;function v(A){l&&l(A/_)}function y(A,S,E,C=null,b=0){if(!m&&b>=r&&(m=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),E<=a||b>=r)return v(S+E),A.offset=S,A.count=E,A;const M=RM(A.boundingData,C,t,S,E,c);if(M.axis===-1)return v(S+E),A.offset=S,A.count=E,A;const L=g(h,d,t,S,E,M);if(L===S||L===S+E)v(S+E),A.offset=S,A.count=E;else{A.splitAxis=M.axis;const D=new Sc,N=S,O=L-S;A.left=D,Mc(t,N,O,D.boundingData,p),y(D,N,O,p,b+1);const G=new Sc,k=L,Z=E-O;A.right=G,Mc(t,k,Z,G.boundingData,p),y(G,k,Z,p,b+1)}return A}}function OM(s,t){const e=s.geometry;t.indirect&&(s._indirectBuffer=NM(e,t.useSharedArrayBuffer),EM(e,t.range)&&!t.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),s._indirectBuffer||TM(e,t);const n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=AM(e),r=t.indirect?Ud(e,t.range):Od(e,t.range);s._roots=r.map(o=>{const a=UM(s,i,o.offset,o.count,t),c=yl(a),l=new n(Lr*c);return DM(0,a,l),l})}class ni{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){const c=t[r][e];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(t,e){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){const a=e[r],c=t.dot(a);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(t){return this.min>t.max||t.min>this.max}}ni.prototype.setFromBox=function(){const s=new P;return function(e,n){const i=n.min,r=n.max;let o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){s.x=i.x*c+r.x*(1-c),s.y=i.y*l+r.y*(1-l),s.z=i.z*u+r.z*(1-u);const h=e.dot(s);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();const FM=function(){const s=new P,t=new P,e=new P;return function(i,r,o){const a=i.start,c=s,l=r.start,u=t;e.subVectors(a,l),s.subVectors(i.end,i.start),t.subVectors(r.end,r.start);const h=e.dot(u),f=u.dot(c),d=u.dot(u),g=e.dot(c),p=c.dot(c)*d-f*f;let m,x;p!==0?m=(h*f-g*d)/p:m=0,x=(h+m*f)/d,o.x=m,o.y=x}}(),nu=function(){const s=new ut,t=new P,e=new P;return function(i,r,o,a){FM(i,r,s);let c=s.x,l=s.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;l<0?h=r.start:h=r.end;const f=t,d=e;if(i.closestPointToPoint(h,!0,t),r.closestPointToPoint(u,!0,e),f.distanceToSquared(h)<=d.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(d);return}}}}(),BM=function(){const s=new P,t=new P,e=new Un,n=new ti;return function(r,o){const{radius:a,center:c}=r,{a:l,b:u,c:h}=o;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a))return!0;const _=o.getPlane(e);if(Math.abs(_.distanceToPoint(c))<=a){const m=_.projectPoint(c,t);if(o.containsPoint(m))return!0}return!1}}(),zM=1e-15;function bc(s){return Math.abs(s)<zM}class Dn extends Ze{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new P),this.satBounds=new Array(4).fill().map(()=>new ni),this.points=[this.a,this.b,this.c],this.sphere=new Ue,this.plane=new Un,this.needsUpdate=!0}intersectsSphere(t){return BM(t,this)}update(){const t=this.a,e=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,i);const l=r[1],u=o[1];l.subVectors(t,e),u.setFromPoints(l,i);const h=r[2],f=o[2];h.subVectors(e,n),f.setFromPoints(h,i);const d=r[3],g=o[3];d.subVectors(n,t),g.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,t),this.needsUpdate=!1}}Dn.prototype.closestPointToSegment=function(){const s=new P,t=new P,e=new ti;return function(i,r=null,o=null){const{start:a,end:c}=i,l=this.points;let u,h=1/0;for(let f=0;f<3;f++){const d=(f+1)%3;e.start.copy(l[f]),e.end.copy(l[d]),nu(e,i,s,t),u=s.distanceToSquared(t),u<h&&(h=u,r&&r.copy(s),o&&o.copy(t))}return this.closestPointToPoint(a,s),u=a.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(a)),this.closestPointToPoint(c,s),u=c.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(h)}}();Dn.prototype.intersectsTriangle=function(){const s=new Dn,t=new Array(3),e=new Array(3),n=new ni,i=new ni,r=new P,o=new P,a=new P,c=new P,l=new P,u=new ti,h=new ti,f=new ti,d=new P;function g(_,p,m){const x=_.points;let v=0,y=-1;for(let A=0;A<3;A++){const{start:S,end:E}=u;S.copy(x[A]),E.copy(x[(A+1)%3]),u.delta(o);const C=bc(p.distanceToPoint(S));if(bc(p.normal.dot(o))&&C){m.copy(u),v=2;break}const b=p.intersectLine(u,d);if(!b&&C&&d.copy(S),(b||C)&&!bc(d.distanceTo(E))){if(v<=1)(v===1?m.start:m.end).copy(d),C&&(y=v);else if(v>=2){(y===1?m.start:m.end).copy(d),v=2;break}if(v++,v===2&&y===-1)break}}return v}return function(p,m=null,x=!1){this.needsUpdate&&this.update(),p.isExtendedTriangle?p.needsUpdate&&p.update():(s.copy(p),s.update(),p=s);const v=this.plane,y=p.plane;if(Math.abs(v.normal.dot(y.normal))>1-1e-10){const A=this.satBounds,S=this.satAxes;e[0]=p.a,e[1]=p.b,e[2]=p.c;for(let b=0;b<4;b++){const M=A[b],L=S[b];if(n.setFromPoints(L,e),M.isSeparated(n))return!1}const E=p.satBounds,C=p.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let b=0;b<4;b++){const M=E[b],L=C[b];if(n.setFromPoints(L,t),M.isSeparated(n))return!1}for(let b=0;b<4;b++){const M=S[b];for(let L=0;L<4;L++){const D=C[L];if(r.crossVectors(M,D),n.setFromPoints(r,t),i.setFromPoints(r,e),n.isSeparated(i))return!1}}return m&&(x||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{const A=g(this,y,h);if(A===1&&p.containsPoint(h.end))return m&&(m.start.copy(h.end),m.end.copy(h.end)),!0;if(A!==2)return!1;const S=g(p,v,f);if(S===1&&this.containsPoint(f.end))return m&&(m.start.copy(f.end),m.end.copy(f.end)),!0;if(S!==2)return!1;if(h.delta(a),f.delta(c),a.dot(c)<0){let N=f.start;f.start=f.end,f.end=N}const E=h.start.dot(a),C=h.end.dot(a),b=f.start.dot(a),M=f.end.dot(a),L=C<b,D=E<M;return E!==M&&b!==C&&L===D?!1:(m&&(l.subVectors(h.start,f.start),l.dot(a)>0?m.start.copy(h.start):m.start.copy(f.start),l.subVectors(h.end,f.end),l.dot(a)<0?m.end.copy(h.end):m.end.copy(f.end)),!0)}}}();Dn.prototype.distanceToPoint=function(){const s=new P;return function(e){return this.closestPointToPoint(e,s),e.distanceTo(s)}}();Dn.prototype.distanceToTriangle=function(){const s=new P,t=new P,e=["a","b","c"],n=new ti,i=new ti;return function(o,a=null,c=null){const l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let f;const d=e[h],g=o[d];this.closestPointToPoint(g,s),f=g.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),c&&c.copy(g));const _=this[d];o.closestPointToPoint(_,s),f=_.distanceToSquared(s),f<u&&(u=f,a&&a.copy(_),c&&c.copy(s))}for(let h=0;h<3;h++){const f=e[h],d=e[(h+1)%3];n.set(this[f],this[d]);for(let g=0;g<3;g++){const _=e[g],p=e[(g+1)%3];i.set(o[_],o[p]),nu(n,i,s,t);const m=s.distanceToSquared(t);m<u&&(u=m,a&&a.copy(s),c&&c.copy(t))}}return Math.sqrt(u)}}();class Qe{constructor(t,e,n){this.isOrientedBox=!0,this.min=new P,this.max=new P,this.matrix=new Ct,this.invMatrix=new Ct,this.points=new Array(8).fill().map(()=>new P),this.satAxes=new Array(3).fill().map(()=>new P),this.satBounds=new Array(3).fill().map(()=>new ni),this.alignedSatBounds=new Array(3).fill().map(()=>new ni),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}Qe.prototype.update=function(){return function(){const t=this.matrix,e=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){const f=1*l|2*u|4*h,d=i[f];d.x=l?n.x:e.x,d.y=u?n.y:e.y,d.z=h?n.z:e.z,d.applyMatrix4(t)}const r=this.satBounds,o=this.satAxes,a=i[0];for(let l=0;l<3;l++){const u=o[l],h=r[l],f=1<<l,d=i[f];u.subVectors(a,d),h.setFromPoints(u,i)}const c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();Qe.prototype.intersectsBox=function(){const s=new ni;return function(e){this.needsUpdate&&this.update();const n=e.min,i=e.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,a[0].isSeparated(s)||(s.min=n.y,s.max=i.y,a[1].isSeparated(s))||(s.min=n.z,s.max=i.z,a[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){const l=o[c],u=r[c];if(s.setFromBox(l,e),u.isSeparated(s))return!1}return!0}}();Qe.prototype.intersectsTriangle=function(){const s=new Dn,t=new Array(3),e=new ni,n=new ni,i=new P;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);const a=this.satBounds,c=this.satAxes;t[0]=o.a,t[1]=o.b,t[2]=o.c;for(let f=0;f<3;f++){const d=a[f],g=c[f];if(e.setFromPoints(g,t),d.isSeparated(e))return!1}const l=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){const d=l[f],g=u[f];if(e.setFromPoints(g,h),d.isSeparated(e))return!1}for(let f=0;f<3;f++){const d=c[f];for(let g=0;g<4;g++){const _=u[g];if(i.crossVectors(d,_),e.setFromPoints(i,t),n.setFromPoints(i,h),e.isSeparated(n))return!1}}return!0}}();Qe.prototype.closestPointToPoint=function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}}();Qe.prototype.distanceToPoint=function(){const s=new P;return function(e){return this.closestPointToPoint(e,s),e.distanceTo(s)}}();Qe.prototype.distanceToBox=function(){const s=["x","y","z"],t=new Array(12).fill().map(()=>new ti),e=new Array(12).fill().map(()=>new ti),n=new P,i=new P;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;const u=a*a,h=o.min,f=o.max,d=this.points;let g=1/0;for(let p=0;p<8;p++){const m=d[p];i.copy(m).clamp(h,f);const x=m.distanceToSquared(i);if(x<g&&(g=x,c&&c.copy(m),l&&l.copy(i),x<u))return Math.sqrt(x)}let _=0;for(let p=0;p<3;p++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){const v=(p+1)%3,y=(p+2)%3,A=m<<v|x<<y,S=1<<p|m<<v|x<<y,E=d[A],C=d[S];t[_].set(E,C);const M=s[p],L=s[v],D=s[y],N=e[_],O=N.start,G=N.end;O[M]=h[M],O[L]=m?h[L]:f[L],O[D]=x?h[D]:f[L],G[M]=f[M],G[L]=m?h[L]:f[L],G[D]=x?h[D]:f[L],_++}for(let p=0;p<=1;p++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){i.x=p?f.x:h.x,i.y=m?f.y:h.y,i.z=x?f.z:h.z,this.closestPointToPoint(i,n);const v=i.distanceToSquared(n);if(v<g&&(g=v,c&&c.copy(n),l&&l.copy(i),v<u))return Math.sqrt(v)}for(let p=0;p<12;p++){const m=t[p];for(let x=0;x<12;x++){const v=e[x];nu(m,v,n,i);const y=n.distanceToSquared(i);if(y<g&&(g=y,c&&c.copy(n),l&&l.copy(i),y<u))return Math.sqrt(y)}}return Math.sqrt(g)}}();class iu{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class kM extends iu{constructor(){super(()=>new Dn)}}const Mn=new kM;class HM{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const fe=new HM;let vi,Cs;const gs=[],Co=new iu(()=>new pe);function VM(s,t,e,n,i,r){vi=Co.getPrimitive(),Cs=Co.getPrimitive(),gs.push(vi,Cs),fe.setBuffer(s._roots[t]);const o=Sl(0,s.geometry,e,n,i,r);fe.clearBuffer(),Co.releasePrimitive(vi),Co.releasePrimitive(Cs),gs.pop(),gs.pop();const a=gs.length;return a>0&&(Cs=gs[a-1],vi=gs[a-2]),o}function Sl(s,t,e,n,i=null,r=0,o=0){const{float32Array:a,uint16Array:c,uint32Array:l}=fe;let u=s*2;if(tn(u,c)){const g=hn(s,l),_=xn(u,c);return be(s,a,vi),n(g,_,!1,o,r+s,vi)}else{let D=function(O){const{uint16Array:G,uint32Array:k}=fe;let Z=O*2;for(;!tn(Z,G);)O=vn(O),Z=O*2;return hn(O,k)},N=function(O){const{uint16Array:G,uint32Array:k}=fe;let Z=O*2;for(;!tn(Z,G);)O=yn(O,k),Z=O*2;return hn(O,k)+xn(Z,G)};var f=D,d=N;const g=vn(s),_=yn(s,l);let p=g,m=_,x,v,y,A;if(i&&(y=vi,A=Cs,be(p,a,y),be(m,a,A),x=i(y),v=i(A),v<x)){p=_,m=g;const O=x;x=v,v=O,y=A}y||(y=vi,be(p,a,y));const S=tn(p*2,c),E=e(y,S,x,o+1,r+p);let C;if(E===jh){const O=D(p),k=N(p)-O;C=n(O,k,!0,o+1,r+p,y)}else C=E&&Sl(p,t,e,n,i,r,o+1);if(C)return!0;A=Cs,be(m,a,A);const b=tn(m*2,c),M=e(A,b,v,o+1,r+m);let L;if(M===jh){const O=D(m),k=N(m)-O;L=n(O,k,!0,o+1,r+m,A)}else L=M&&Sl(m,t,e,n,i,r,o+1);return!!L}}const dr=new P,Tc=new P;function GM(s,t,e={},n=0,i=1/0){const r=n*n,o=i*i;let a=1/0,c=null;if(s.shapecast({boundsTraverseOrder:u=>(dr.copy(t).clamp(u.min,u.max),dr.distanceToSquared(t)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(t,dr);const f=t.distanceToSquared(dr);return f<a&&(Tc.copy(dr),a=f,c=h),f<r}}),a===1/0)return null;const l=Math.sqrt(a);return e.point?e.point.copy(Tc):e.point=Tc.clone(),e.distance=l,e.faceIndex=c,e}const _s=new P,xs=new P,vs=new P,Po=new ut,Lo=new ut,Io=new ut,Qh=new P,tf=new P,ef=new P,Do=new P;function WM(s,t,e,n,i,r,o,a){let c;if(r===Ve?c=s.intersectTriangle(n,e,t,!0,i):c=s.intersectTriangle(t,e,n,r!==cn,i),c===null)return null;const l=s.origin.distanceTo(i);return l<o||l>a?null:{distance:l,point:i.clone()}}function XM(s,t,e,n,i,r,o,a,c,l,u){_s.fromBufferAttribute(t,r),xs.fromBufferAttribute(t,o),vs.fromBufferAttribute(t,a);const h=WM(s,_s,xs,vs,Do,c,l,u);if(h){n&&(Po.fromBufferAttribute(n,r),Lo.fromBufferAttribute(n,o),Io.fromBufferAttribute(n,a),h.uv=Ze.getInterpolation(Do,_s,xs,vs,Po,Lo,Io,new ut)),i&&(Po.fromBufferAttribute(i,r),Lo.fromBufferAttribute(i,o),Io.fromBufferAttribute(i,a),h.uv1=Ze.getInterpolation(Do,_s,xs,vs,Po,Lo,Io,new ut)),e&&(Qh.fromBufferAttribute(e,r),tf.fromBufferAttribute(e,o),ef.fromBufferAttribute(e,a),h.normal=Ze.getInterpolation(Do,_s,xs,vs,Qh,tf,ef,new P),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));const f={a:r,b:o,c:a,normal:new P,materialIndex:0};Ze.getNormal(_s,xs,vs,f.normal),h.face=f,h.faceIndex=r}return h}function Ea(s,t,e,n,i,r,o){const a=n*3;let c=a+0,l=a+1,u=a+2;const h=s.index;s.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));const{position:f,normal:d,uv:g,uv1:_}=s.attributes,p=XM(e,f,d,g,_,c,l,u,t,r,o);return p?(p.faceIndex=n,i&&i.push(p),p):null}function Re(s,t,e,n){const i=s.a,r=s.b,o=s.c;let a=t,c=t+1,l=t+2;e&&(a=e.getX(a),c=e.getX(c),l=e.getX(l)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}function qM(s,t,e,n,i,r,o,a){const{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++)Ea(c,t,e,u,r,o,a)}function YM(s,t,e,n,i,r,o){const{geometry:a,_indirectBuffer:c}=s;let l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=Ea(a,t,e,h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function jM(s,t,e,n,i,r,o){const{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let u=s,h=t+s;u<h;u++){let f;if(f=u,Re(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}function KM(s,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=s.geometry,n=e.index?e.index.array:null,i=e.attributes.position;let r,o,a,c,l=0;const u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){const _=f*2;if(a[_+15]===Ta){const m=o[f+6],x=a[_+14];let v=1/0,y=1/0,A=1/0,S=-1/0,E=-1/0,C=-1/0;for(let b=3*m,M=3*(m+x);b<M;b++){let L=n[b];const D=i.getX(L),N=i.getY(L),O=i.getZ(L);D<v&&(v=D),D>S&&(S=D),N<y&&(y=N),N>E&&(E=N),O<A&&(A=O),O>C&&(C=O)}return c[f+0]!==v||c[f+1]!==y||c[f+2]!==A||c[f+3]!==S||c[f+4]!==E||c[f+5]!==C?(c[f+0]=v,c[f+1]=y,c[f+2]=A,c[f+3]=S,c[f+4]=E,c[f+5]=C,!0):!1}else{const m=f+8,x=o[f+6],v=m+d,y=x+d;let A=g,S=!1,E=!1;t?A||(S=t.has(v),E=t.has(y),A=!S&&!E):(S=!0,E=!0);const C=A||S,b=A||E;let M=!1;C&&(M=h(m,d,A));let L=!1;b&&(L=h(x,d,A));const D=M||L;if(D)for(let N=0;N<3;N++){const O=m+N,G=x+N,k=c[O],Z=c[O+3],W=c[G],ht=c[G+3];c[f+N]=k<W?k:W,c[f+N+3]=Z>ht?Z:ht}return D}}}function Ai(s,t,e,n,i){let r,o,a,c,l,u;const h=1/e.direction.x,f=1/e.direction.y,d=1/e.direction.z,g=e.origin.x,_=e.origin.y,p=e.origin.z;let m=t[s],x=t[s+3],v=t[s+1],y=t[s+3+1],A=t[s+2],S=t[s+3+2];return h>=0?(r=(m-g)*h,o=(x-g)*h):(r=(x-g)*h,o=(m-g)*h),f>=0?(a=(v-_)*f,c=(y-_)*f):(a=(y-_)*f,c=(v-_)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),d>=0?(l=(A-p)*d,u=(S-p)*d):(l=(S-p)*d,u=(A-p)*d),r>u||l>o)?!1:((l>r||r!==r)&&(r=l),(u<o||o!==o)&&(o=u),r<=i&&o>=n)}function $M(s,t,e,n,i,r,o,a){const{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++){let f=l?l[u]:u;Ea(c,t,e,f,r,o,a)}}function ZM(s,t,e,n,i,r,o){const{geometry:a,_indirectBuffer:c}=s;let l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=Ea(a,t,e,c?c[h]:h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function JM(s,t,e,n,i,r,o){const{geometry:a}=e,{index:c}=a,l=a.attributes.position;for(let u=s,h=t+s;u<h;u++){let f;if(f=e.resolveTriangleIndex(u),Re(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}function QM(s,t,e,n,i,r,o){fe.setBuffer(s._roots[t]),bl(0,s,e,n,i,r,o),fe.clearBuffer()}function bl(s,t,e,n,i,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=fe,u=s*2;if(tn(u,c)){const f=hn(s,l),d=xn(u,c);qM(t,e,n,f,d,i,r,o)}else{const f=vn(s);Ai(f,a,n,r,o)&&bl(f,t,e,n,i,r,o);const d=yn(s,l);Ai(d,a,n,r,o)&&bl(d,t,e,n,i,r,o)}}const tS=["x","y","z"];function eS(s,t,e,n,i,r){fe.setBuffer(s._roots[t]);const o=Tl(0,s,e,n,i,r);return fe.clearBuffer(),o}function Tl(s,t,e,n,i,r){const{float32Array:o,uint16Array:a,uint32Array:c}=fe;let l=s*2;if(tn(l,a)){const h=hn(s,c),f=xn(l,a);return YM(t,e,n,h,f,i,r)}else{const h=Fd(s,c),f=tS[h],g=n.direction[f]>=0;let _,p;g?(_=vn(s),p=yn(s,c)):(_=yn(s,c),p=vn(s));const x=Ai(_,o,n,i,r)?Tl(_,t,e,n,i,r):null;if(x){const A=x.point[f];if(g?A<=o[p+h]:A>=o[p+h+3])return x}const y=Ai(p,o,n,i,r)?Tl(p,t,e,n,i,r):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}const No=new pe,ys=new Dn,Ms=new Dn,pr=new Ct,nf=new Qe,Uo=new Qe;function nS(s,t,e,n){fe.setBuffer(s._roots[t]);const i=El(0,s,e,n);return fe.clearBuffer(),i}function El(s,t,e,n,i=null){const{float32Array:r,uint16Array:o,uint32Array:a}=fe;let c=s*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),nf.set(e.boundingBox.min,e.boundingBox.max,n),i=nf),tn(c,o)){const u=t.geometry,h=u.index,f=u.attributes.position,d=e.index,g=e.attributes.position,_=hn(s,a),p=xn(c,o);if(pr.copy(n).invert(),e.boundsTree)return be(s,r,Uo),Uo.matrix.copy(pr),Uo.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:x=>Uo.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let v=_*3,y=(p+_)*3;v<y;v+=3)if(Re(Ms,v,h,f),Ms.needsUpdate=!0,x.intersectsTriangle(Ms))return!0;return!1}});for(let m=_*3,x=(p+_)*3;m<x;m+=3){Re(ys,m,h,f),ys.a.applyMatrix4(pr),ys.b.applyMatrix4(pr),ys.c.applyMatrix4(pr),ys.needsUpdate=!0;for(let v=0,y=d.count;v<y;v+=3)if(Re(Ms,v,d,g),Ms.needsUpdate=!0,ys.intersectsTriangle(Ms))return!0}}else{const u=s+8,h=a[s+6];return be(u,r,No),!!(i.intersectsBox(No)&&El(u,t,e,n,i)||(be(h,r,No),i.intersectsBox(No)&&El(h,t,e,n,i)))}}const Oo=new Ct,Ec=new Qe,mr=new Qe,iS=new P,sS=new P,rS=new P,oS=new P;function aS(s,t,e,n={},i={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Ec.set(t.boundingBox.min,t.boundingBox.max,e),Ec.needsUpdate=!0;const a=s.geometry,c=a.attributes.position,l=a.index,u=t.attributes.position,h=t.index,f=Mn.getPrimitive(),d=Mn.getPrimitive();let g=iS,_=sS,p=null,m=null;i&&(p=rS,m=oS);let x=1/0,v=null,y=null;return Oo.copy(e).invert(),mr.matrix.copy(Oo),s.shapecast({boundsTraverseOrder:A=>Ec.distanceToBox(A),intersectsBounds:(A,S,E)=>E<x&&E<o?(S&&(mr.min.copy(A.min),mr.max.copy(A.max),mr.needsUpdate=!0),!0):!1,intersectsRange:(A,S)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:C=>mr.distanceToBox(C),intersectsBounds:(C,b,M)=>M<x&&M<o,intersectsRange:(C,b)=>{for(let M=C,L=C+b;M<L;M++){Re(d,3*M,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let D=A,N=A+S;D<N;D++){Re(f,3*D,l,c),f.needsUpdate=!0;const O=f.distanceToTriangle(d,g,p);if(O<x&&(_.copy(g),m&&m.copy(p),x=O,v=D,y=M),O<r)return!0}}}});{const E=tr(t);for(let C=0,b=E;C<b;C++){Re(d,3*C,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let M=A,L=A+S;M<L;M++){Re(f,3*M,l,c),f.needsUpdate=!0;const D=f.distanceToTriangle(d,g,p);if(D<x&&(_.copy(g),m&&m.copy(p),x=D,v=M,y=C),D<r)return!0}}}}}),Mn.releasePrimitive(f),Mn.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(_):n.point=_.clone(),n.distance=x,n.faceIndex=v,i&&(i.point?i.point.copy(m):i.point=m.clone(),i.point.applyMatrix4(Oo),_.applyMatrix4(Oo),i.distance=_.sub(i.point).length(),i.faceIndex=y),n)}function cS(s,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=s.geometry,n=e.index?e.index.array:null,i=e.attributes.position;let r,o,a,c,l=0;const u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){const _=f*2;if(a[_+15]===Ta){const m=o[f+6],x=a[_+14];let v=1/0,y=1/0,A=1/0,S=-1/0,E=-1/0,C=-1/0;for(let b=m,M=m+x;b<M;b++){const L=3*s.resolveTriangleIndex(b);for(let D=0;D<3;D++){let N=L+D;N=n?n[N]:N;const O=i.getX(N),G=i.getY(N),k=i.getZ(N);O<v&&(v=O),O>S&&(S=O),G<y&&(y=G),G>E&&(E=G),k<A&&(A=k),k>C&&(C=k)}}return c[f+0]!==v||c[f+1]!==y||c[f+2]!==A||c[f+3]!==S||c[f+4]!==E||c[f+5]!==C?(c[f+0]=v,c[f+1]=y,c[f+2]=A,c[f+3]=S,c[f+4]=E,c[f+5]=C,!0):!1}else{const m=f+8,x=o[f+6],v=m+d,y=x+d;let A=g,S=!1,E=!1;t?A||(S=t.has(v),E=t.has(y),A=!S&&!E):(S=!0,E=!0);const C=A||S,b=A||E;let M=!1;C&&(M=h(m,d,A));let L=!1;b&&(L=h(x,d,A));const D=M||L;if(D)for(let N=0;N<3;N++){const O=m+N,G=x+N,k=c[O],Z=c[O+3],W=c[G],ht=c[G+3];c[f+N]=k<W?k:W,c[f+N+3]=Z>ht?Z:ht}return D}}}function lS(s,t,e,n,i,r,o){fe.setBuffer(s._roots[t]),Al(0,s,e,n,i,r,o),fe.clearBuffer()}function Al(s,t,e,n,i,r,o){const{float32Array:a,uint16Array:c,uint32Array:l}=fe,u=s*2;if(tn(u,c)){const f=hn(s,l),d=xn(u,c);$M(t,e,n,f,d,i,r,o)}else{const f=vn(s);Ai(f,a,n,r,o)&&Al(f,t,e,n,i,r,o);const d=yn(s,l);Ai(d,a,n,r,o)&&Al(d,t,e,n,i,r,o)}}const uS=["x","y","z"];function hS(s,t,e,n,i,r){fe.setBuffer(s._roots[t]);const o=wl(0,s,e,n,i,r);return fe.clearBuffer(),o}function wl(s,t,e,n,i,r){const{float32Array:o,uint16Array:a,uint32Array:c}=fe;let l=s*2;if(tn(l,a)){const h=hn(s,c),f=xn(l,a);return ZM(t,e,n,h,f,i,r)}else{const h=Fd(s,c),f=uS[h],g=n.direction[f]>=0;let _,p;g?(_=vn(s),p=yn(s,c)):(_=yn(s,c),p=vn(s));const x=Ai(_,o,n,i,r)?wl(_,t,e,n,i,r):null;if(x){const A=x.point[f];if(g?A<=o[p+h]:A>=o[p+h+3])return x}const y=Ai(p,o,n,i,r)?wl(p,t,e,n,i,r):null;return x&&y?x.distance<=y.distance?x:y:x||y||null}}const Fo=new pe,Ss=new Dn,bs=new Dn,gr=new Ct,sf=new Qe,Bo=new Qe;function fS(s,t,e,n){fe.setBuffer(s._roots[t]);const i=Rl(0,s,e,n);return fe.clearBuffer(),i}function Rl(s,t,e,n,i=null){const{float32Array:r,uint16Array:o,uint32Array:a}=fe;let c=s*2;if(i===null&&(e.boundingBox||e.computeBoundingBox(),sf.set(e.boundingBox.min,e.boundingBox.max,n),i=sf),tn(c,o)){const u=t.geometry,h=u.index,f=u.attributes.position,d=e.index,g=e.attributes.position,_=hn(s,a),p=xn(c,o);if(gr.copy(n).invert(),e.boundsTree)return be(s,r,Bo),Bo.matrix.copy(gr),Bo.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:x=>Bo.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let v=_,y=p+_;v<y;v++)if(Re(bs,3*t.resolveTriangleIndex(v),h,f),bs.needsUpdate=!0,x.intersectsTriangle(bs))return!0;return!1}});for(let m=_,x=p+_;m<x;m++){const v=t.resolveTriangleIndex(m);Re(Ss,3*v,h,f),Ss.a.applyMatrix4(gr),Ss.b.applyMatrix4(gr),Ss.c.applyMatrix4(gr),Ss.needsUpdate=!0;for(let y=0,A=d.count;y<A;y+=3)if(Re(bs,y,d,g),bs.needsUpdate=!0,Ss.intersectsTriangle(bs))return!0}}else{const u=s+8,h=a[s+6];return be(u,r,Fo),!!(i.intersectsBox(Fo)&&Rl(u,t,e,n,i)||(be(h,r,Fo),i.intersectsBox(Fo)&&Rl(h,t,e,n,i)))}}const zo=new Ct,Ac=new Qe,_r=new Qe,dS=new P,pS=new P,mS=new P,gS=new P;function _S(s,t,e,n={},i={},r=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Ac.set(t.boundingBox.min,t.boundingBox.max,e),Ac.needsUpdate=!0;const a=s.geometry,c=a.attributes.position,l=a.index,u=t.attributes.position,h=t.index,f=Mn.getPrimitive(),d=Mn.getPrimitive();let g=dS,_=pS,p=null,m=null;i&&(p=mS,m=gS);let x=1/0,v=null,y=null;return zo.copy(e).invert(),_r.matrix.copy(zo),s.shapecast({boundsTraverseOrder:A=>Ac.distanceToBox(A),intersectsBounds:(A,S,E)=>E<x&&E<o?(S&&(_r.min.copy(A.min),_r.max.copy(A.max),_r.needsUpdate=!0),!0):!1,intersectsRange:(A,S)=>{if(t.boundsTree){const E=t.boundsTree;return E.shapecast({boundsTraverseOrder:C=>_r.distanceToBox(C),intersectsBounds:(C,b,M)=>M<x&&M<o,intersectsRange:(C,b)=>{for(let M=C,L=C+b;M<L;M++){const D=E.resolveTriangleIndex(M);Re(d,3*D,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let N=A,O=A+S;N<O;N++){const G=s.resolveTriangleIndex(N);Re(f,3*G,l,c),f.needsUpdate=!0;const k=f.distanceToTriangle(d,g,p);if(k<x&&(_.copy(g),m&&m.copy(p),x=k,v=N,y=M),k<r)return!0}}}})}else{const E=tr(t);for(let C=0,b=E;C<b;C++){Re(d,3*C,h,u),d.a.applyMatrix4(e),d.b.applyMatrix4(e),d.c.applyMatrix4(e),d.needsUpdate=!0;for(let M=A,L=A+S;M<L;M++){const D=s.resolveTriangleIndex(M);Re(f,3*D,l,c),f.needsUpdate=!0;const N=f.distanceToTriangle(d,g,p);if(N<x&&(_.copy(g),m&&m.copy(p),x=N,v=M,y=C),N<r)return!0}}}}}),Mn.releasePrimitive(f),Mn.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(_):n.point=_.clone(),n.distance=x,n.faceIndex=v,i&&(i.point?i.point.copy(m):i.point=m.clone(),i.point.applyMatrix4(zo),_.applyMatrix4(zo),i.distance=_.sub(i.point).length(),i.faceIndex=y),n)}function xS(){return typeof SharedArrayBuffer<"u"}const Ir=new fe.constructor,fa=new fe.constructor,pi=new iu(()=>new pe),Ts=new pe,Es=new pe,wc=new pe,Rc=new pe;let Cc=!1;function vS(s,t,e,n){if(Cc)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Cc=!0;const i=s._roots,r=t._roots;let o,a=0,c=0;const l=new Ct().copy(e).invert();for(let u=0,h=i.length;u<h;u++){Ir.setBuffer(i[u]),c=0;const f=pi.getPrimitive();be(0,Ir.float32Array,f),f.applyMatrix4(l);for(let d=0,g=r.length;d<g&&(fa.setBuffer(r[d]),o=wn(0,0,e,l,n,a,c,0,0,f),fa.clearBuffer(),c+=r[d].length,!o);d++);if(pi.releasePrimitive(f),Ir.clearBuffer(),a+=i[u].length,o)break}return Cc=!1,o}function wn(s,t,e,n,i,r=0,o=0,a=0,c=0,l=null,u=!1){let h,f;u?(h=fa,f=Ir):(h=Ir,f=fa);const d=h.float32Array,g=h.uint32Array,_=h.uint16Array,p=f.float32Array,m=f.uint32Array,x=f.uint16Array,v=s*2,y=t*2,A=tn(v,_),S=tn(y,x);let E=!1;if(S&&A)u?E=i(hn(t,m),xn(t*2,x),hn(s,g),xn(s*2,_),c,o+t,a,r+s):E=i(hn(s,g),xn(s*2,_),hn(t,m),xn(t*2,x),a,r+s,c,o+t);else if(S){const C=pi.getPrimitive();be(t,p,C),C.applyMatrix4(e);const b=vn(s),M=yn(s,g);be(b,d,Ts),be(M,d,Es);const L=C.intersectsBox(Ts),D=C.intersectsBox(Es);E=L&&wn(t,b,n,e,i,o,r,c,a+1,C,!u)||D&&wn(t,M,n,e,i,o,r,c,a+1,C,!u),pi.releasePrimitive(C)}else{const C=vn(t),b=yn(t,m);be(C,p,wc),be(b,p,Rc);const M=l.intersectsBox(wc),L=l.intersectsBox(Rc);if(M&&L)E=wn(s,C,e,n,i,r,o,a,c+1,l,u)||wn(s,b,e,n,i,r,o,a,c+1,l,u);else if(M)if(A)E=wn(s,C,e,n,i,r,o,a,c+1,l,u);else{const D=pi.getPrimitive();D.copy(wc).applyMatrix4(e);const N=vn(s),O=yn(s,g);be(N,d,Ts),be(O,d,Es);const G=D.intersectsBox(Ts),k=D.intersectsBox(Es);E=G&&wn(C,N,n,e,i,o,r,c,a+1,D,!u)||k&&wn(C,O,n,e,i,o,r,c,a+1,D,!u),pi.releasePrimitive(D)}else if(L)if(A)E=wn(s,b,e,n,i,r,o,a,c+1,l,u);else{const D=pi.getPrimitive();D.copy(Rc).applyMatrix4(e);const N=vn(s),O=yn(s,g);be(N,d,Ts),be(O,d,Es);const G=D.intersectsBox(Ts),k=D.intersectsBox(Es);E=G&&wn(b,N,n,e,i,o,r,c,a+1,D,!u)||k&&wn(b,O,n,e,i,o,r,c,a+1,D,!u),pi.releasePrimitive(D)}}return E}const ko=new Qe,rf=new pe,yS={strategy:Nd,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class su{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,i=t._roots,r=t._indirectBuffer,o=n.getIndex();let a;return e.cloneBuffers?a={roots:i.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:i,index:o?o.array:null,indirectBuffer:r},a}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:i,roots:r,indirectBuffer:o}=t,a=new su(e,{...n,[yc]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){const c=e.getIndex();if(c===null){const l=new Ce(t.index,1,!1);e.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(e=Object.assign({...yS,[yc]:!1},e),e.useSharedArrayBuffer&&!xS())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=t,this._roots=null,this._indirectBuffer=null,e[yc]||(OM(this,e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new pe))),this.resolveTriangleIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n}refit(t=null){return(this.indirect?cS:KM)(this,t)}traverse(t,e=0){const n=this._roots[e],i=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){const l=a*2,u=r[l+15]===Ta;if(u){const h=i[a+6],f=r[l+14];t(c,u,new Float32Array(n,a*4,6),h,f)}else{const h=a+Lr/4,f=i[a+6],d=i[a+7];t(c,u,new Float32Array(n,a*4,6),d)||(o(h,c+1),o(f,c+1))}}}raycast(t,e=In,n=0,i=1/0){const r=this._roots,o=this.geometry,a=[],c=e.isMaterial,l=Array.isArray(e),u=o.groups,h=c?e.side:e,f=this.indirect?lS:QM;for(let d=0,g=r.length;d<g;d++){const _=l?e[u[d].materialIndex].side:h,p=a.length;if(f(this,d,_,t,a,n,i),l){const m=u[d].materialIndex;for(let x=p,v=a.length;x<v;x++)a[x].face.materialIndex=m}}return a}raycastFirst(t,e=In,n=0,i=1/0){const r=this._roots,o=this.geometry,a=e.isMaterial,c=Array.isArray(e);let l=null;const u=o.groups,h=a?e.side:e,f=this.indirect?hS:eS;for(let d=0,g=r.length;d<g;d++){const _=c?e[u[d].materialIndex].side:h,p=f(this,d,_,t,n,i);p!=null&&(l==null||p.distance<l.distance)&&(l=p,c&&(p.face.materialIndex=u[d].materialIndex))}return l}intersectsGeometry(t,e){let n=!1;const i=this._roots,r=this.indirect?fS:nS;for(let o=0,a=i.length;o<a&&(n=r(this,o,t,e),!n);o++);return n}shapecast(t){const e=Mn.getPrimitive(),n=this.indirect?JM:jM;let{boundsTraverseOrder:i,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=t;if(o&&a){const h=o;o=(f,d,g,_,p)=>h(f,d,g,_,p)?!0:n(f,d,this,a,g,_,e)}else o||(a?o=(h,f,d,g)=>n(h,f,this,a,d,g,e):o=(h,f,d)=>d);let c=!1,l=0;const u=this._roots;for(let h=0,f=u.length;h<f;h++){const d=u[h];if(c=VM(this,h,r,o,i,l),c)break;l+=d.byteLength}return Mn.releasePrimitive(e),c}bvhcast(t,e,n){let{intersectsRanges:i,intersectsTriangles:r}=n;const o=Mn.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{const _=this.resolveTriangleIndex(g);Re(o,_*3,a,c)}:g=>{Re(o,g*3,a,c)},u=Mn.getPrimitive(),h=t.geometry.index,f=t.geometry.attributes.position,d=t.indirect?g=>{const _=t.resolveTriangleIndex(g);Re(u,_*3,h,f)}:g=>{Re(u,g*3,h,f)};if(r){const g=(_,p,m,x,v,y,A,S)=>{for(let E=m,C=m+x;E<C;E++){d(E),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let b=_,M=_+p;b<M;b++)if(l(b),o.needsUpdate=!0,r(o,u,b,E,v,y,A,S))return!0}return!1};if(i){const _=i;i=function(p,m,x,v,y,A,S,E){return _(p,m,x,v,y,A,S,E)?!0:g(p,m,x,v,y,A,S,E)}}else i=g}return vS(this,t,e,i)}intersectsBox(t,e){return ko.set(t.min,t.max,e),ko.needsUpdate=!0,this.shapecast({intersectsBounds:n=>ko.intersectsBox(n),intersectsTriangle:n=>ko.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},i={},r=0,o=1/0){return(this.indirect?_S:aS)(this,t,e,n,i,r,o)}closestPointToPoint(t,e={},n=0,i=1/0){return GM(this,t,e,n,i)}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{be(0,new Float32Array(n),rf),t.union(rf)}),t}}function of(s,t,e){return s===null?null:(s.point.applyMatrix4(t.matrixWorld),s.distance=s.point.distanceTo(e.ray.origin),s.object=t,s)}const af=kv||null,Ho=new qi,cf=new P,lf=new Ct,MS=Zt.prototype.raycast,SS=af!==null?af.prototype.raycast:null,uf=new P,ze=new Zt,Vo=[];function bS(s,t){this.isBatchedMesh?TS.call(this,s,t):ES.call(this,s,t)}function TS(s,t){if(this.boundsTrees){const e=this.boundsTrees,n=this._drawInfo,i=this._drawRanges,r=this.matrixWorld;ze.material=this.material,ze.geometry=this.geometry;const o=ze.geometry.boundsTree,a=ze.geometry.drawRange;ze.geometry.boundingSphere===null&&(ze.geometry.boundingSphere=new Ue);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;const u=n[c].geometryIndex;if(ze.geometry.boundsTree=e[u],this.getMatrixAt(c,ze.matrixWorld).premultiply(r),!ze.geometry.boundsTree){this.getBoundingBoxAt(u,ze.geometry.boundingBox),this.getBoundingSphereAt(u,ze.geometry.boundingSphere);const h=i[u];ze.geometry.setDrawRange(h.start,h.count)}ze.raycast(s,Vo);for(let h=0,f=Vo.length;h<f;h++){const d=Vo[h];d.object=this,d.batchId=c,t.push(d)}Vo.length=0}ze.geometry.boundsTree=o,ze.geometry.drawRange=a,ze.material=null,ze.geometry=null}else SS.call(this,s,t)}function ES(s,t){if(this.geometry.boundsTree){if(this.material===void 0)return;lf.copy(this.matrixWorld).invert(),Ho.copy(s.ray).applyMatrix4(lf),uf.setFromMatrixScale(this.matrixWorld),cf.copy(Ho.direction).multiply(uf);const e=cf.length(),n=s.near/e,i=s.far/e,r=this.geometry.boundsTree;if(s.firstHitOnly===!0){const o=of(r.raycastFirst(Ho,this.material,n,i),this,s);o&&t.push(o)}else{const o=r.raycast(Ho,this.material,n,i);for(let a=0,c=o.length;a<c;a++){const l=of(o[a],this,s);l&&t.push(l)}}}else MS.call(this,s,t)}function AS(s={}){return this.boundsTree=new su(this,s),this.boundsTree}function wS(){this.boundsTree=null}function RS(){const s=new _i;s.name="eVTOL_Default";const t=new Xs({color:2830131,metalness:.7,roughness:.45}),e=new Sn({color:1054237,metalness:0,roughness:.08,transparent:!0,opacity:.6}),n=(d,g,_=[0,0,0],p=[0,0,0],m=null)=>{const x=new Zt(d,m||void 0);return x.name=g,x.position.set(..._),x.rotation.set(...p),m&&(x.material=m),s.add(x),x};n(new Zl(.85,3.2,12,40),"Fuselage",[0,0,0],[Math.PI/2,0,0]),n(new Cn(.08,.9,.7,1,8,6),"TailFin",[0,1,-2.2]),n(new Cn(8.8,.14,1.2,48,1,8),"WingMain",[0,.5,.1]),n(new Cn(3,.1,.65,20,1,4),"WingTail",[0,.55,-2.15]),n(new Cn(.07,.9,1.2,1,10,12),"Door_L",[.82,0,.5]),n(new Cn(.07,.9,1.2,1,10,12),"Door_R",[-.82,0,.5]);const i=new Sa(.62,24,16,0,Math.PI*2,0,Math.PI/2);n(i,"CanopyGlass",[0,.5,1.3],[0,0,0],e).scale.set(1,.75,1.35);const o=new ki(.07,.07,1.9,10),a=new ki(.13,.16,.5,12),c=new ki(.85,.85,.02,32),l=[[3.6,"R"],[-3.6,"L"]],u=[[.85,"F"],[-.85,"B"]];for(const[d,g]of l){n(o,`RotorArm_${g}`,[d,.5,0],[Math.PI/2,0,0],t);for(const[_,p]of u)n(a,`RotorPod_${g}${p}`,[d,.62,_],[0,0,0],t),n(c,`Prop_${g}${p}`,[d,.92,_],[0,0,0],t)}const h=new ki(.05,.05,3.4,8),f=new ki(.035,.035,.5,8);for(const[d,g]of[[.55,"R"],[-.55,"L"]])n(h,`Skid_${g}`,[d,-1.05,0],[Math.PI/2,0,0],t),n(f,`Strut_${g}F`,[d,-.82,.9],[0,0,0],t),n(f,`Strut_${g}B`,[d,-.82,-.9],[0,0,0],t);return s}class CS extends Wl{constructor(t=null){super();const e=new Cn;e.deleteAttribute("uv");const n=new Xs({side:Ve}),i=new Xs,r=new Pd(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const o=new Zt(e,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const a=new Zt(e,i);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const c=new Zt(e,i);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);const l=new Zt(e,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const u=new Zt(e,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const h=new Zt(e,i);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const f=new Zt(e,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const d=new Zt(e,As(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const g=new Zt(e,As(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);const _=new Zt(e,As(17));_.position.set(14.904,12.198,-1.832),_.scale.set(.15,4.265,6.331),this.add(_);const p=new Zt(e,As(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const m=new Zt(e,As(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const x=new Zt(e,As(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function As(s){const t=new _n;return t.color.setScalar(s),t}function PS(s){const t=new ca(s),e=t.fromScene(new CS,.04).texture;return t.dispose(),e}function LS(s){const t=new Wl,e=document.createElement("canvas");e.width=4,e.height=256;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,0,256);i.addColorStop(0,"#16244d"),i.addColorStop(.45,"#4a3a6e"),i.addColorStop(.62,"#ff8c42"),i.addColorStop(.72,"#c94f2e"),i.addColorStop(1,"#1c1210"),n.fillStyle=i,n.fillRect(0,0,4,256);const r=new Wv(e);r.colorSpace=ke;const o=new Zt(new Sa(50,32,16),new _n({map:r,side:Ve}));t.add(o);const a=new _n({side:cn});a.color.setRGB(18,9,3.5);const c=new Zt(new ha(3.5,32),a);c.position.set(18,7,-32),c.lookAt(0,0,0),t.add(c);const l=new Zt(new ha(60,32),new _n({color:1577488}));l.rotation.x=-Math.PI/2,l.position.y=-3,t.add(l);const u=new ca(s),h=u.fromScene(t,.08).texture;return u.dispose(),r.dispose(),h}Oe.prototype.computeBoundsTree=AS;Oe.prototype.disposeBoundsTree=wS;Zt.prototype.raycast=bS;const IS=[[/fuselage|body|hull|cabin|机身/i,"fuselage"],[/wing|aileron|flap|机翼/i,"wing"],[/door|hatch|舱门/i,"door"]],DS=/glass|window|canopy|rotor|prop|gear|wheel|skid|strut|light|antenna/i;function NS(s){for(const[t,e]of IS)if(t.test(s))return e;return"fuselage"}function Go(s){const t=new Gt(s);return[t.r,t.g,t.b]}class US{constructor(){this.paintables=[],this.otherMeshes=[],this.model=null,this.modelRadius=4.5,this.painting=!1,this.envTextures=[null,null],this._tmpV=new P}init(t){this.canvas=t,this.renderer=new Av({canvas:t,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=Wf,this.renderer.toneMappingExposure=1,this.renderer.outputColorSpace=ke,this.scene=new Wl,this.camera=new $e(45,1,.05,500),this.camera.position.set(6.5,3.5,7.5),this.controls=new Fy(this.camera,t),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.maxDistance=80;const e=new Ld(16777215,.9);e.position.set(5,9,4),this.scene.add(e,new Ty(16777215,.15)),this.paintMaterial=new Sn({vertexColors:!0,metalness:.75,roughness:.3,clearcoat:.8,clearcoatRoughness:.25,envMapIntensity:1.1}),this.normalMaterial=new ry,this.brushCursor=new Zt(new Jl(.85,1,48),new _n({color:16777215,side:cn,transparent:!0,opacity:.9,depthTest:!1})),this.brushCursor.renderOrder=999,this.brushCursor.visible=!1,this.scene.add(this.brushCursor),this.raycaster=new Uy,this.raycaster.firstHitOnly=!0,this._bindEvents(),this._subscribeStores(),this._applyMaterial(),this._applyEnvironment(),this._applyDisplayMode(),this.loadDefaultModel();const n=()=>{const r=t.clientWidth||t.parentElement.clientWidth,o=t.clientHeight||t.parentElement.clientHeight;!r||!o||(this.renderer.setSize(r,o,!1),this.camera.aspect=r/o,this.camera.updateProjectionMatrix())};new ResizeObserver(n).observe(t.parentElement),n();const i=()=>{requestAnimationFrame(i),this.controls.update(),this.renderer.render(this.scene,this.camera)};i()}loadDefaultModel(){this._setModel(RS(),"内置 eVTOL 演示模型")}async loadGLTF(t){const e=new By;try{const n=await t.arrayBuffer(),i=await new Promise((o,a)=>e.parse(n,"",o,a)),r=i.scene||i.scenes[0];if(!r)throw new Error("空场景");this._setModel(r,t.name),yi(`已导入模型:${t.name}`)}catch(n){console.error(n),yi("模型导入失败:"+(n.message||n),5e3)}}_setModel(t,e){this.model&&(this.scene.remove(this.model),this.model.traverse(o=>{var a,c;o.isMesh&&((c=(a=o.geometry).disposeBoundsTree)==null||c.call(a),o.geometry.dispose())})),this.paintables=[],this.otherMeshes=[],this.model=t;const i=new pe().setFromObject(t).getBoundingSphere(new Ue),r=i.radius>0?4.5/i.radius:1;t.scale.setScalar(r),t.position.sub(i.center.clone().multiplyScalar(r)),t.updateMatrixWorld(!0),this.modelRadius=4.5,t.traverse(o=>{if(!o.isMesh)return;if(o.geometry.computeBoundsTree(),DS.test(o.name)){this.otherMeshes.push(o);return}o.geometry=o.geometry.clone(),o.geometry.computeBoundsTree(),o.material=this.paintMaterial;const a=o.geometry.attributes.position.count,c={mesh:o,name:o.name||`mesh_${this.paintables.length}`,zone:NS(o.name||""),mask:new Uint8Array(a),paintCol:new Uint8Array(a*3)};o.userData.paint=c,o.geometry.setAttribute("color",new Ce(new Float32Array(a*3),3)),this.paintables.push(c)}),this._recomputeAllColors(),this._syncMeshList(),this._applyDisplayMode(),this._frameCamera(),ma.set(e)}_frameCamera(){const t=this.modelRadius;this.camera.position.set(t*1.5,t*.8,t*1.7),this.controls.target.set(0,0,0),this.controls.update()}_syncMeshList(){Cl.set([...this.paintables.map(t=>({name:t.name,zone:t.zone,paintable:!0,verts:t.mask.length})),...this.otherMeshes.map(t=>({name:t.name||"(未命名)",zone:null,paintable:!1,verts:t.geometry.attributes.position.count}))])}setZone(t,e){const n=this.paintables.find(i=>i.name===t);n&&(n.zone=e,this._syncMeshList())}_recomputeAllColors(){const t=Go(ge(an).primer);for(const e of this.paintables)this._recomputeMeshColors(e,t)}_recomputeMeshColors(t,e=Go(ge(an).primer)){const n=t.mesh.geometry.attributes.color,i=n.array,{mask:r,paintCol:o}=t;for(let a=0;a<r.length;a++){const c=a*3;r[a]?(i[c]=o[c]/255,i[c+1]=o[c+1]/255,i[c+2]=o[c+2]/255):(i[c]=e[0],i[c+1]=e[1],i[c+2]=e[2])}n.needsUpdate=!0}clearZone(t){for(const e of this.paintables)e.zone===t&&(e.mask.fill(0),this._recomputeMeshColors(e));yi("已清除该分区的漆面遮罩")}_paintAt(t){const e=t.object.userData.paint;if(!e)return;const n=t.object,i=n.geometry,r=i.attributes.position,o=i.attributes.color,a=n.getWorldScale(this._tmpV).x||1,c=du[ge(Fs)]*this.modelRadius/4.5/a,l=n.worldToLocal(t.point.clone()),u=c*c,h=ge(ea),[f,d,g]=Go(ge(Tr)).map(y=>Math.round(y*255)),_=Go(ge(an).primer),p=o.array,m=y=>{const A=y*3;h?(e.mask[y]=0,p[A]=_[0],p[A+1]=_[1],p[A+2]=_[2]):(e.mask[y]=1,e.paintCol[A]=f,e.paintCol[A+1]=d,e.paintCol[A+2]=g,p[A]=f/255,p[A+1]=d/255,p[A+2]=g/255)},x=this._tmpV,v=y=>{x.fromBufferAttribute(r,y),x.distanceToSquared(l)<=u&&m(y)};if(i.boundsTree&&i.index){const y=new Ue(l.clone(),c);i.boundsTree.shapecast({intersectsBounds:A=>A.intersectsSphere(y),intersectsTriangle:(A,S)=>{const E=S*3;return v(i.index.getX(E)),v(i.index.getX(E+1)),v(i.index.getX(E+2)),!1}})}else for(let y=0;y<r.count;y++)v(y);o.needsUpdate=!0}_activeZoneTargets(){const t=ge(Nc);return this.paintables.filter(e=>e.zone===t).map(e=>e.mesh)}_pick(t){const e=this.canvas.getBoundingClientRect(),n=new ut((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);return this.raycaster.setFromCamera(n,this.camera),this.raycaster.intersectObjects(this._activeZoneTargets(),!1)[0]||null}_bindEvents(){const t=this.canvas;t.addEventListener("pointerdown",n=>{if(n.button!==0||ge(Is)!=="paint")return;const i=this._pick(n);i&&(this.painting=!0,this.controls.enabled=!1,t.setPointerCapture(n.pointerId),this._paintAt(i))}),t.addEventListener("pointermove",n=>{if(ge(Is)!=="paint"){this.brushCursor.visible=!1;return}const i=this._pick(n);i?(this._updateCursor(i),this.painting&&this._paintAt(i)):this.brushCursor.visible=!1});const e=()=>{this.painting=!1,this.controls.enabled=!0};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("pointerleave",()=>{this.brushCursor.visible=!1})}_updateCursor(t){const e=du[ge(Fs)]*this.modelRadius/4.5,n=t.face.normal.clone().transformDirection(t.object.matrixWorld);this.brushCursor.position.copy(t.point).addScaledVector(n,.01*this.modelRadius),this.brushCursor.lookAt(this._tmpV.copy(t.point).add(n)),this.brushCursor.scale.setScalar(e),this.brushCursor.material.color.set(ge(ea)?"#ffffff":ge(Tr)),this.brushCursor.visible=!0}_subscribeStores(){an.subscribe(()=>this._applyMaterial()),Fn.subscribe(()=>this._applyEnvironment()),bi.subscribe(()=>this._applyDisplayMode()),Is.subscribe(t=>{t!=="paint"&&(this.brushCursor.visible=!1)})}_applyMaterial(){if(!this.paintMaterial)return;const t=ge(an);this.paintMaterial.metalness=xr[t.metalness],this.paintMaterial.roughness=vr[t.roughness],this.paintMaterial.clearcoat=t.clearcoat,this.paintMaterial.clearcoatRoughness=1-t.clearcoatGloss,this.paintMaterial.needsUpdate=!0,this._recomputeAllColors()}_applyEnvironment(){if(!this.renderer)return;const t=ge(Fn);this.envTextures[t]||(this.envTextures[t]=t===0?PS(this.renderer):LS(this.renderer));const e=this.envTextures[t];this.scene.environment=e,this.scene.background=e,this.scene.backgroundBlurriness=.45,this.scene.backgroundIntensity=t===0?.5:.8}_applyDisplayMode(){if(!this.scene)return;const t=ge(bi),e=(i,r)=>{i&&"wireframe"in i&&(i.wireframe=r)},n=[...this.paintables.map(i=>i.mesh),...this.otherMeshes];for(const i of n)i.userData.origMat||(i.userData.origMat=i.material),t==="normal"?i.material=this.normalMaterial:(i.material=i.userData.origMat,e(i.material,t==="wireframe"))}getLiveryData(){return{paintables:this.paintables,modelRadius:this.modelRadius}}applyLivery(t){let e=0,n=0;for(const i of this.paintables){const r=t.paint[i.name];if(!r||r.verts!==i.mask.length){r&&n++;continue}i.mask.set(r.mask),i.paintCol.set(r.paintCol),this._recomputeMeshColors(i),e++}if(t.zones){for(const i of this.paintables)t.zones[i.name]&&(i.zone=t.zones[i.name]);this._syncMeshList()}return{restored:e,skipped:n}}}const Hi=new US;function hf(s,t,e){const n=s.slice();return n[9]=t[e],n}function ff(s,t,e){const n=s.slice();return n[12]=t[e],n}function OS(s){let t;return{c(){t=nt("div"),t.textContent="左键旋转 · 右键平移 · 滚轮缩放",J(t,"class","hint svelte-x7hfn5")},m(e,n){Te(e,t,n)},d(e){e&&ye(t)}}}function FS(s){let t;return{c(){t=nt("div"),t.textContent="左键涂抹漆面 · 右键/拖拽空白处旋转视角 · 滚轮缩放",J(t,"class","hint svelte-x7hfn5")},m(e,n){Te(e,t,n)},d(e){e&&ye(t)}}}function df(s){let t,e,n;function i(){return s[7](s[12])}return{c(){t=nt("button"),t.textContent=`${s[12].label}`,J(t,"class","svelte-x7hfn5"),Pe(t,"active",s[3]===s[12].id)},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&8&&Pe(t,"active",s[3]===s[12].id)},d(r){r&&ye(t),e=!1,n()}}}function pf(s){let t,e,n;function i(){return s[8](s[9])}return{c(){t=nt("button"),t.textContent=`${s[9].label}`,J(t,"class","svelte-x7hfn5"),Pe(t,"active",s[4]===s[9].id)},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&16&&Pe(t,"active",s[4]===s[9].id)},d(r){r&&ye(t),e=!1,n()}}}function mf(s){let t,e;return{c(){t=nt("div"),e=_e(s[5]),J(t,"class","toast svelte-x7hfn5")},m(n,i){Te(n,t,i),V(t,e)},p(n,i){i&32&&mn(e,n[5])},d(n){n&&ye(t)}}}function BS(s){let t,e,n,i,r,o,a,c,l,u,h,f,d;function g(S,E){return S[2]==="paint"?FS:OS}let _=g(s),p=_(s),m=xe(Qo),x=[];for(let S=0;S<m.length;S+=1)x[S]=df(ff(s,m,S));let v=xe(ta),y=[];for(let S=0;S<v.length;S+=1)y[S]=pf(hf(s,v,S));let A=s[5]&&mf(s);return{c(){t=nt("div"),e=nt("canvas"),n=wt(),i=nt("div"),r=nt("div"),o=_e(s[1]),a=wt(),p.c(),c=wt(),l=nt("div"),u=nt("div");for(let S=0;S<x.length;S+=1)x[S].c();h=wt(),f=nt("div");for(let S=0;S<y.length;S+=1)y[S].c();d=wt(),A&&A.c(),J(e,"class","svelte-x7hfn5"),J(r,"class","model-name svelte-x7hfn5"),J(i,"class","overlay top-left svelte-x7hfn5"),J(u,"class","seg svelte-x7hfn5"),J(f,"class","seg svelte-x7hfn5"),J(l,"class","overlay top-right svelte-x7hfn5"),J(t,"class","viewport svelte-x7hfn5")},m(S,E){Te(S,t,E),V(t,e),s[6](e),V(t,n),V(t,i),V(i,r),V(r,o),V(i,a),p.m(i,null),V(t,c),V(t,l),V(l,u);for(let C=0;C<x.length;C+=1)x[C]&&x[C].m(u,null);V(l,h),V(l,f);for(let C=0;C<y.length;C+=1)y[C]&&y[C].m(f,null);V(t,d),A&&A.m(t,null)},p(S,[E]){if(E&2&&mn(o,S[1]),_!==(_=g(S))&&(p.d(1),p=_(S),p&&(p.c(),p.m(i,null))),E&8){m=xe(Qo);let C;for(C=0;C<m.length;C+=1){const b=ff(S,m,C);x[C]?x[C].p(b,E):(x[C]=df(b),x[C].c(),x[C].m(u,null))}for(;C<x.length;C+=1)x[C].d(1);x.length=m.length}if(E&16){v=xe(ta);let C;for(C=0;C<v.length;C+=1){const b=hf(S,v,C);y[C]?y[C].p(b,E):(y[C]=pf(b),y[C].c(),y[C].m(f,null))}for(;C<y.length;C+=1)y[C].d(1);y.length=v.length}S[5]?A?A.p(S,E):(A=mf(S),A.c(),A.m(t,null)):A&&(A.d(1),A=null)},i:He,o:He,d(S){S&&ye(t),s[6](null),p.d(),gn(x,S),gn(y,S),A&&A.d()}}}function zS(s,t,e){let n,i,r,o,a;Ye(s,ma,f=>e(1,n=f)),Ye(s,Is,f=>e(2,i=f)),Ye(s,Fn,f=>e(3,r=f)),Ye(s,bi,f=>e(4,o=f)),Ye(s,Uc,f=>e(5,a=f));let c;$d(()=>{Hi.init(c)});function l(f){Nr[f?"unshift":"push"](()=>{c=f,e(0,c)})}return[c,n,i,r,o,a,l,f=>Fn.set(f.id),f=>bi.set(f.id)]}class kS extends Vr{constructor(t){super(),Hr(this,t,zS,BS,Ks,{})}}const kd="evtol-livery-studio",HS=1;function gf(s){let t="";for(let n=0;n<s.length;n+=32768)t+=String.fromCharCode.apply(null,s.subarray(n,n+32768));return btoa(t)}function _f(s){const t=atob(s),e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function VS(s){const{paintables:t}=s.getLiveryData();if(!t.length){yi("当前没有可涂装的部件,无法导出");return}const e={},n={};for(const l of t)n[l.name]=l.zone,l.mask.some(u=>u!==0)&&(e[l.name]={verts:l.mask.length,mask:gf(l.mask),colors:gf(l.paintCol)});const i={app:kd,version:HS,savedAt:new Date().toISOString(),model:ge(ma),material:ge(an),env:ge(Fn),zones:n,paint:e},r=new Blob([JSON.stringify(i)],{type:"application/json"}),o=URL.createObjectURL(r),a=document.createElement("a"),c=new Date().toISOString().slice(0,16).replace(/[-:T]/g,"");a.href=o,a.download=`evtol-livery-${c}.json`,a.click(),URL.revokeObjectURL(o),yi(`涂装文件已导出(${Object.keys(e).length} 个部件含漆面数据)`)}async function GS(s,t){let e;try{e=JSON.parse(await s.text())}catch{yi("涂装文件解析失败:不是有效的 JSON",5e3);return}if(e.app!==kd){yi("涂装文件格式不匹配",5e3);return}e.material&&an.set({...ge(an),...e.material}),typeof e.env=="number"&&Fn.set(e.env);const n={};for(const[a,c]of Object.entries(e.paint||{}))n[a]={verts:c.verts,mask:_f(c.mask),paintCol:_f(c.colors)};const{restored:i,skipped:r}=t.applyLivery({paint:n,zones:e.zones});let o=`涂装文件已导入:还原 ${i} 个部件漆面`;r&&(o+=`,${r} 个部件因顶点数不匹配被跳过`),yi(o,5e3)}function xf(s,t,e){const n=s.slice();return n[13]=t[e],n}function WS(s,t,e){const n=s.slice();return n[16]=t[e],n}function XS(s){let t;return{c(){t=nt("span"),t.textContent="固定材质",J(t,"class","fixed svelte-1c1lx76")},m(e,n){Te(e,t,n)},p:He,d(e){e&&ye(t)}}}function qS(s){let t,e,n,i,r=xe(Dc),o=[];for(let c=0;c<r.length;c+=1)o[c]=YS(WS(s,r,c));function a(...c){return s[12](s[13],...c)}return{c(){t=nt("select");for(let c=0;c<o.length;c+=1)o[c].c();J(t,"class","svelte-1c1lx76")},m(c,l){Te(c,t,l);for(let u=0;u<o.length;u+=1)o[u]&&o[u].m(t,null);uu(t,s[13].zone),n||(i=de(t,"change",a),n=!0)},p(c,l){s=c,l&8&&e!==(e=s[13].zone)&&uu(t,s[13].zone)},d(c){c&&ye(t),gn(o,c),n=!1,i()}}}function YS(s){let t;return{c(){t=nt("option"),t.textContent=`${s[16].label}`,t.__value=s[16].id,Pc(t,t.__value)},m(e,n){Te(e,t,n)},p:He,d(e){e&&ye(t)}}}function vf(s){let t,e,n=s[13].name+"",i,r,o,a;function c(h,f){return h[13].paintable?qS:XS}let l=c(s),u=l(s);return{c(){t=nt("div"),e=nt("span"),i=_e(n),o=wt(),u.c(),a=wt(),J(e,"class","mesh-name svelte-1c1lx76"),J(e,"title",r=s[13].name),J(t,"class","mesh-row svelte-1c1lx76")},m(h,f){Te(h,t,f),V(t,e),V(e,i),V(t,o),u.m(t,null),V(t,a)},p(h,f){f&8&&n!==(n=h[13].name+"")&&mn(i,n),f&8&&r!==(r=h[13].name)&&J(e,"title",r),l===(l=c(h))&&u?u.p(h,f):(u.d(1),u=l(h),u&&(u.c(),u.m(t,a)))},d(h){h&&ye(t),u.d()}}}function jS(s){let t,e,n,i,r,o,a=(s[2]||"未加载")+"",c,l,u,h,f,d,g,_,p,m,x,v,y,A,S,E,C,b,M,L,D,N,O,G,k=s[3].length+"",Z,W,ht,st,pt,At,at=xe(s[3]),Y=[];for(let H=0;H<at.length;H+=1)Y[H]=vf(xf(s,at,H));return{c(){t=nt("div"),e=nt("section"),n=nt("h3"),n.textContent="机体模型",i=wt(),r=nt("div"),o=_e("当前:"),c=_e(a),l=wt(),u=nt("button"),u.textContent="加载内置演示模型",h=wt(),f=nt("button"),f.textContent="导入 glTF / GLB 模型…",d=wt(),g=nt("input"),_=wt(),p=nt("p"),p.textContent="导入后按部件名称自动分区(fuselage/wing/door 等关键词),也可在下方手动调整。",m=wt(),x=nt("section"),v=nt("h3"),v.textContent="涂装文件",y=wt(),A=nt("button"),A.textContent="导出涂装文件(遮罩 + 材质)",S=wt(),E=nt("button"),E.textContent="导入涂装文件…",C=wt(),b=nt("input"),M=wt(),L=nt("p"),L.textContent="导入涂装文件可还原全部漆面遮罩、部件分区与材质参数。",D=wt(),N=nt("section"),O=nt("h3"),G=_e("部件分区("),Z=_e(k),W=_e(")"),ht=wt(),st=nt("div");for(let H=0;H<Y.length;H+=1)Y[H].c();J(n,"class","svelte-1c1lx76"),J(r,"class","current svelte-1c1lx76"),J(u,"class","btn svelte-1c1lx76"),J(f,"class","btn svelte-1c1lx76"),J(g,"type","file"),J(g,"accept",".glb,.gltf"),g.hidden=!0,J(p,"class","note svelte-1c1lx76"),J(e,"class","svelte-1c1lx76"),J(v,"class","svelte-1c1lx76"),J(A,"class","btn primary svelte-1c1lx76"),J(E,"class","btn svelte-1c1lx76"),J(b,"type","file"),J(b,"accept",".json"),b.hidden=!0,J(L,"class","note svelte-1c1lx76"),J(x,"class","svelte-1c1lx76"),J(O,"class","svelte-1c1lx76"),J(st,"class","mesh-list svelte-1c1lx76"),J(N,"class","svelte-1c1lx76"),J(t,"class","panel svelte-1c1lx76")},m(H,ot){Te(H,t,ot),V(t,e),V(e,n),V(e,i),V(e,r),V(r,o),V(r,c),V(e,l),V(e,u),V(e,h),V(e,f),V(e,d),V(e,g),s[8](g),V(e,_),V(e,p),V(t,m),V(t,x),V(x,v),V(x,y),V(x,A),V(x,S),V(x,E),V(x,C),V(x,b),s[11](b),V(x,M),V(x,L),V(t,D),V(t,N),V(N,O),V(O,G),V(O,Z),V(O,W),V(N,ht),V(N,st);for(let ct=0;ct<Y.length;ct+=1)Y[ct]&&Y[ct].m(st,null);pt||(At=[de(u,"click",s[6]),de(f,"click",s[7]),de(g,"change",s[4]),de(A,"click",s[9]),de(E,"click",s[10]),de(b,"change",s[5])],pt=!0)},p(H,[ot]){if(ot&4&&a!==(a=(H[2]||"未加载")+"")&&mn(c,a),ot&8&&k!==(k=H[3].length+"")&&mn(Z,k),ot&8){at=xe(H[3]);let ct;for(ct=0;ct<at.length;ct+=1){const Ut=xf(H,at,ct);Y[ct]?Y[ct].p(Ut,ot):(Y[ct]=vf(Ut),Y[ct].c(),Y[ct].m(st,null))}for(;ct<Y.length;ct+=1)Y[ct].d(1);Y.length=at.length}},i:He,o:He,d(H){H&&ye(t),s[8](null),s[11](null),gn(Y,H),pt=!1,wi(At)}}}function KS(s,t,e){let n,i;Ye(s,ma,p=>e(2,n=p)),Ye(s,Cl,p=>e(3,i=p));let r,o;function a(p){const m=p.target.files[0];m&&Hi.loadGLTF(m),p.target.value=""}function c(p){const m=p.target.files[0];m&&GS(m,Hi),p.target.value=""}const l=()=>Hi.loadDefaultModel(),u=()=>r.click();function h(p){Nr[p?"unshift":"push"](()=>{r=p,e(0,r)})}const f=()=>VS(Hi),d=()=>o.click();function g(p){Nr[p?"unshift":"push"](()=>{o=p,e(1,o)})}return[r,o,n,i,a,c,l,u,h,f,d,g,(p,m)=>Hi.setZone(p.name,m.currentTarget.value)]}class $S extends Vr{constructor(t){super(),Hr(this,t,KS,jS,Ks,{})}}function yf(s,t,e){const n=s.slice();return n[13]=t[e],n[15]=e,n}function Mf(s,t,e){const n=s.slice();return n[16]=t[e],n}function Sf(s,t,e){const n=s.slice();return n[19]=t[e],n}function bf(s){let t,e,n=s[19].label+"",i,r,o,a=s[0](s[19].id)+"",c,l,u,h;function f(){return s[7](s[19])}return{c(){t=nt("button"),e=nt("span"),i=_e(n),r=wt(),o=nt("span"),c=_e(a),l=wt(),J(e,"class","dot svelte-16yocqr"),J(o,"class","count svelte-16yocqr"),J(t,"class","zone svelte-16yocqr"),zf(t,"--zc",s[19].color),Pe(t,"active",s[1]===s[19].id)},m(d,g){Te(d,t,g),V(t,e),V(t,i),V(t,r),V(t,o),V(o,c),V(t,l),u||(h=de(t,"click",f),u=!0)},p(d,g){s=d,g&1&&a!==(a=s[0](s[19].id)+"")&&mn(c,a),g&2&&Pe(t,"active",s[1]===s[19].id)},d(d){d&&ye(t),u=!1,h()}}}function Tf(s){let t,e,n;function i(){return s[9](s[16])}return{c(){t=nt("button"),J(t,"class","swatch svelte-16yocqr"),zf(t,"background",s[16]),J(t,"title",s[16]),Pe(t,"active",s[2]===s[16])},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&36&&Pe(t,"active",s[2]===s[16])},d(r){r&&ye(t),e=!1,n()}}}function Ef(s){let t,e,n;function i(){return s[10](s[15])}return{c(){t=nt("button"),t.textContent=`${s[13]}`,J(t,"class","svelte-16yocqr"),Pe(t,"active",s[3]===s[15])},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&8&&Pe(t,"active",s[3]===s[15])},d(r){r&&ye(t),e=!1,n()}}}function ZS(s){let t,e,n,i,r,o,a,c,l,u,h,f,d,g,_,p,m,x,v,y,A,S,E,C,b,M,L,D,N,O,G,k,Z=xe(Dc),W=[];for(let at=0;at<Z.length;at+=1)W[at]=bf(Sf(s,Z,at));let ht=xe(s[5]),st=[];for(let at=0;at<ht.length;at+=1)st[at]=Tf(Mf(s,ht,at));let pt=xe(pu),At=[];for(let at=0;at<pt.length;at+=1)At[at]=Ef(yf(s,pt,at));return{c(){t=nt("div"),e=nt("section"),n=nt("h3"),n.textContent="选择分区",i=wt(),r=nt("div");for(let at=0;at<W.length;at+=1)W[at].c();o=wt(),a=nt("p"),a.textContent="笔刷只会作用于当前选中的分区。",c=wt(),l=nt("section"),u=nt("h3"),u.textContent="漆面颜色(分色遮罩)",h=wt(),f=nt("div"),d=nt("input"),g=wt(),_=nt("span"),p=_e(s[2]),m=wt(),x=nt("div");for(let at=0;at<st.length;at+=1)st[at].c();v=wt(),y=nt("section"),A=nt("h3"),A.textContent="笔刷",S=wt(),E=nt("div");for(let at=0;at<At.length;at+=1)At[at].c();C=wt(),b=nt("label"),M=nt("input"),L=_e(`
      橡皮擦(恢复底漆)`),D=wt(),N=nt("section"),O=nt("button"),O.textContent="清除当前分区漆面",J(n,"class","svelte-16yocqr"),J(r,"class","zones svelte-16yocqr"),J(a,"class","note svelte-16yocqr"),J(e,"class","svelte-16yocqr"),J(u,"class","svelte-16yocqr"),J(d,"type","color"),J(d,"class","svelte-16yocqr"),J(_,"class","hex svelte-16yocqr"),J(f,"class","color-row svelte-16yocqr"),J(x,"class","presets svelte-16yocqr"),J(l,"class","svelte-16yocqr"),J(A,"class","svelte-16yocqr"),J(E,"class","seg svelte-16yocqr"),J(M,"type","checkbox"),J(b,"class","check svelte-16yocqr"),J(y,"class","svelte-16yocqr"),J(O,"class","btn danger svelte-16yocqr"),J(N,"class","svelte-16yocqr"),J(t,"class","panel svelte-16yocqr")},m(at,Y){Te(at,t,Y),V(t,e),V(e,n),V(e,i),V(e,r);for(let H=0;H<W.length;H+=1)W[H]&&W[H].m(r,null);V(e,o),V(e,a),V(t,c),V(t,l),V(l,u),V(l,h),V(l,f),V(f,d),Pc(d,s[2]),V(f,g),V(f,_),V(_,p),V(l,m),V(l,x);for(let H=0;H<st.length;H+=1)st[H]&&st[H].m(x,null);V(t,v),V(t,y),V(y,A),V(y,S),V(y,E);for(let H=0;H<At.length;H+=1)At[H]&&At[H].m(E,null);V(y,C),V(y,b),V(b,M),M.checked=s[4],V(b,L),V(t,D),V(t,N),V(N,O),G||(k=[de(d,"input",s[8]),de(M,"change",s[11]),de(O,"click",s[12])],G=!0)},p(at,[Y]){if(Y&3){Z=xe(Dc);let H;for(H=0;H<Z.length;H+=1){const ot=Sf(at,Z,H);W[H]?W[H].p(ot,Y):(W[H]=bf(ot),W[H].c(),W[H].m(r,null))}for(;H<W.length;H+=1)W[H].d(1);W.length=Z.length}if(Y&4&&Pc(d,at[2]),Y&4&&mn(p,at[2]),Y&36){ht=xe(at[5]);let H;for(H=0;H<ht.length;H+=1){const ot=Mf(at,ht,H);st[H]?st[H].p(ot,Y):(st[H]=Tf(ot),st[H].c(),st[H].m(x,null))}for(;H<st.length;H+=1)st[H].d(1);st.length=ht.length}if(Y&8){pt=xe(pu);let H;for(H=0;H<pt.length;H+=1){const ot=yf(at,pt,H);At[H]?At[H].p(ot,Y):(At[H]=Ef(ot),At[H].c(),At[H].m(E,null))}for(;H<At.length;H+=1)At[H].d(1);At.length=pt.length}Y&16&&(M.checked=at[4])},i:He,o:He,d(at){at&&ye(t),gn(W,at),gn(st,at),gn(At,at),G=!1,wi(k)}}}function JS(s,t,e){let n,i,r,o,a,c;Ye(s,Cl,p=>e(6,i=p)),Ye(s,Nc,p=>e(1,r=p)),Ye(s,Tr,p=>e(2,o=p)),Ye(s,Fs,p=>e(3,a=p)),Ye(s,ea,p=>e(4,c=p));const l=["#c8102e","#1c4f9c","#f2a900","#0e7a4f","#e8e6e1","#1a1a1c","#7a2e8f","#00a3b4"],u=p=>Nc.set(p.id);function h(){o=this.value,Tr.set(o)}const f=p=>Tr.set(p),d=p=>Fs.set(p);function g(){c=this.checked,ea.set(c)}const _=()=>Hi.clearZone(r);return s.$$.update=()=>{s.$$.dirty&64&&e(0,n=p=>i.filter(m=>m.zone===p).length)},[n,r,o,a,c,l,i,u,h,f,d,g,_]}class QS extends Vr{constructor(t){super(),Hr(this,t,JS,ZS,Ks,{})}}function Af(s,t,e){const n=s.slice();return n[13]=t[e],n}function wf(s,t,e){const n=s.slice();return n[16]=t[e],n}function Rf(s,t,e){const n=s.slice();return n[19]=t[e],n[21]=e,n}function Cf(s,t,e){const n=s.slice();return n[19]=t[e],n[21]=e,n}function Pf(s){let t,e,n;function i(){return s[6](s[21])}return{c(){t=nt("button"),t.textContent=`${s[21]+1}`,J(t,"class","svelte-16oy60n"),Pe(t,"active",s[0].metalness===s[21])},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&1&&Pe(t,"active",s[0].metalness===s[21])},d(r){r&&ye(t),e=!1,n()}}}function Lf(s){let t,e,n;function i(){return s[7](s[21])}return{c(){t=nt("button"),t.textContent=`${s[21]+1}`,J(t,"class","svelte-16oy60n"),Pe(t,"active",s[0].roughness===s[21])},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&1&&Pe(t,"active",s[0].roughness===s[21])},d(r){r&&ye(t),e=!1,n()}}}function If(s){let t,e,n;function i(){return s[10](s[16])}return{c(){t=nt("button"),t.textContent=`${s[16].label}`,J(t,"class","svelte-16oy60n"),Pe(t,"active",s[1]===s[16].id)},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&2&&Pe(t,"active",s[1]===s[16].id)},d(r){r&&ye(t),e=!1,n()}}}function Df(s){let t,e,n;function i(){return s[11](s[13])}return{c(){t=nt("button"),t.textContent=`${s[13].label}`,J(t,"class","svelte-16oy60n"),Pe(t,"active",s[2]===s[13].id)},m(r,o){Te(r,t,o),e||(n=de(t,"click",i),e=!0)},p(r,o){s=r,o&4&&Pe(t,"active",s[2]===s[13].id)},d(r){r&&ye(t),e=!1,n()}}}function tb(s){let t,e,n,i,r,o,a,c,l,u,h,f=s[0].primer+"",d,g,_,p,m,x,v,y,A,S=xr[s[0].metalness].toFixed(2)+"",E,C,b,M,L,D,N,O=vr[s[0].roughness].toFixed(2)+"",G,k,Z,W,ht,st,pt,At,at,Y,H,ot,ct,Ut,Ht,Wt=s[0].clearcoat.toFixed(2)+"",re,U,ee,jt,Jt,St,le,Bt,Ot,I=s[0].clearcoatGloss.toFixed(2)+"",w,K,Q,it,tt,Et,dt,gt,zt,lt,xt,Yt,Pt,Mt,Dt,Ft,ue,T=xe(xr),B=[];for(let mt=0;mt<T.length;mt+=1)B[mt]=Pf(Cf(s,T,mt));let X=xe(vr),q=[];for(let mt=0;mt<X.length;mt+=1)q[mt]=Lf(Rf(s,X,mt));let et=xe(Qo),vt=[];for(let mt=0;mt<et.length;mt+=1)vt[mt]=If(wf(s,et,mt));let Lt=xe(ta),Kt=[];for(let mt=0;mt<Lt.length;mt+=1)Kt[mt]=Df(Af(s,Lt,mt));return{c(){t=nt("div"),e=nt("section"),n=nt("h3"),n.textContent="① 底漆层",i=wt(),r=nt("div"),o=nt("span"),o.textContent="底漆颜色",a=wt(),c=nt("input"),u=wt(),h=nt("span"),d=_e(f),g=wt(),_=nt("p"),_.textContent="未涂漆区域显示为底漆,作为分色遮罩的底色。",p=wt(),m=nt("section"),x=nt("h3"),x.textContent="② 金属漆层",v=wt(),y=nt("span"),A=_e("金属度("),E=_e(S),C=_e(")"),b=wt(),M=nt("div");for(let mt=0;mt<B.length;mt+=1)B[mt].c();L=wt(),D=nt("span"),N=_e("粗糙度("),G=_e(O),k=_e(")"),Z=wt(),W=nt("div");for(let mt=0;mt<q.length;mt+=1)q[mt].c();ht=wt(),st=nt("section"),pt=nt("h3"),pt.textContent="③ 清漆层",At=wt(),at=nt("div"),Y=nt("span"),Y.textContent="厚度",H=wt(),ot=nt("input"),Ut=wt(),Ht=nt("span"),re=_e(Wt),U=wt(),ee=nt("div"),jt=nt("span"),jt.textContent="光泽",Jt=wt(),St=nt("input"),Bt=wt(),Ot=nt("span"),w=_e(I),K=wt(),Q=nt("section"),it=nt("h3"),it.textContent="环境光照(查看反射变化)",tt=wt(),Et=nt("div");for(let mt=0;mt<vt.length;mt+=1)vt[mt].c();dt=wt(),gt=nt("section"),zt=nt("h3"),zt.textContent="显示模式",lt=wt(),xt=nt("div");for(let mt=0;mt<Kt.length;mt+=1)Kt[mt].c();Yt=wt(),Pt=nt("button"),Pt.textContent="重置材质参数",Mt=wt(),Dt=nt("p"),Dt.textContent="材质配置会自动保存到浏览器本地存储。",J(n,"class","svelte-16oy60n"),J(o,"class","label svelte-16oy60n"),J(c,"type","color"),c.value=l=s[0].primer,J(c,"class","svelte-16oy60n"),J(h,"class","val svelte-16oy60n"),J(r,"class","row svelte-16oy60n"),J(_,"class","note svelte-16oy60n"),J(e,"class","svelte-16oy60n"),J(x,"class","svelte-16oy60n"),J(y,"class","label svelte-16oy60n"),J(M,"class","seg svelte-16oy60n"),J(D,"class","label svelte-16oy60n"),J(W,"class","seg svelte-16oy60n"),J(m,"class","svelte-16oy60n"),J(pt,"class","svelte-16oy60n"),J(Y,"class","label svelte-16oy60n"),J(ot,"type","range"),J(ot,"min","0"),J(ot,"max","1"),J(ot,"step","0.01"),ot.value=ct=s[0].clearcoat,J(ot,"class","svelte-16oy60n"),J(Ht,"class","val svelte-16oy60n"),J(at,"class","row svelte-16oy60n"),J(jt,"class","label svelte-16oy60n"),J(St,"type","range"),J(St,"min","0"),J(St,"max","1"),J(St,"step","0.01"),St.value=le=s[0].clearcoatGloss,J(St,"class","svelte-16oy60n"),J(Ot,"class","val svelte-16oy60n"),J(ee,"class","row svelte-16oy60n"),J(st,"class","svelte-16oy60n"),J(it,"class","svelte-16oy60n"),J(Et,"class","seg svelte-16oy60n"),J(Q,"class","svelte-16oy60n"),J(zt,"class","svelte-16oy60n"),J(xt,"class","seg svelte-16oy60n"),J(gt,"class","svelte-16oy60n"),J(Pt,"class","btn svelte-16oy60n"),J(Dt,"class","note svelte-16oy60n"),J(t,"class","panel svelte-16oy60n")},m(mt,It){Te(mt,t,It),V(t,e),V(e,n),V(e,i),V(e,r),V(r,o),V(r,a),V(r,c),V(r,u),V(r,h),V(h,d),V(e,g),V(e,_),V(t,p),V(t,m),V(m,x),V(m,v),V(m,y),V(y,A),V(y,E),V(y,C),V(m,b),V(m,M);for(let rt=0;rt<B.length;rt+=1)B[rt]&&B[rt].m(M,null);V(m,L),V(m,D),V(D,N),V(D,G),V(D,k),V(m,Z),V(m,W);for(let rt=0;rt<q.length;rt+=1)q[rt]&&q[rt].m(W,null);V(t,ht),V(t,st),V(st,pt),V(st,At),V(st,at),V(at,Y),V(at,H),V(at,ot),V(at,Ut),V(at,Ht),V(Ht,re),V(st,U),V(st,ee),V(ee,jt),V(ee,Jt),V(ee,St),V(ee,Bt),V(ee,Ot),V(Ot,w),V(t,K),V(t,Q),V(Q,it),V(Q,tt),V(Q,Et);for(let rt=0;rt<vt.length;rt+=1)vt[rt]&&vt[rt].m(Et,null);V(t,dt),V(t,gt),V(gt,zt),V(gt,lt),V(gt,xt);for(let rt=0;rt<Kt.length;rt+=1)Kt[rt]&&Kt[rt].m(xt,null);V(t,Yt),V(t,Pt),V(t,Mt),V(t,Dt),Ft||(ue=[de(c,"input",s[5]),de(ot,"input",s[8]),de(St,"input",s[9]),de(Pt,"click",s[12])],Ft=!0)},p(mt,[It]){if(It&1&&l!==(l=mt[0].primer)&&(c.value=l),It&1&&f!==(f=mt[0].primer+"")&&mn(d,f),It&1&&S!==(S=xr[mt[0].metalness].toFixed(2)+"")&&mn(E,S),It&17){T=xe(xr);let rt;for(rt=0;rt<T.length;rt+=1){const Qt=Cf(mt,T,rt);B[rt]?B[rt].p(Qt,It):(B[rt]=Pf(Qt),B[rt].c(),B[rt].m(M,null))}for(;rt<B.length;rt+=1)B[rt].d(1);B.length=T.length}if(It&1&&O!==(O=vr[mt[0].roughness].toFixed(2)+"")&&mn(G,O),It&17){X=xe(vr);let rt;for(rt=0;rt<X.length;rt+=1){const Qt=Rf(mt,X,rt);q[rt]?q[rt].p(Qt,It):(q[rt]=Lf(Qt),q[rt].c(),q[rt].m(W,null))}for(;rt<q.length;rt+=1)q[rt].d(1);q.length=X.length}if(It&1&&ct!==(ct=mt[0].clearcoat)&&(ot.value=ct),It&1&&Wt!==(Wt=mt[0].clearcoat.toFixed(2)+"")&&mn(re,Wt),It&1&&le!==(le=mt[0].clearcoatGloss)&&(St.value=le),It&1&&I!==(I=mt[0].clearcoatGloss.toFixed(2)+"")&&mn(w,I),It&2){et=xe(Qo);let rt;for(rt=0;rt<et.length;rt+=1){const Qt=wf(mt,et,rt);vt[rt]?vt[rt].p(Qt,It):(vt[rt]=If(Qt),vt[rt].c(),vt[rt].m(Et,null))}for(;rt<vt.length;rt+=1)vt[rt].d(1);vt.length=et.length}if(It&4){Lt=xe(ta);let rt;for(rt=0;rt<Lt.length;rt+=1){const Qt=Af(mt,Lt,rt);Kt[rt]?Kt[rt].p(Qt,It):(Kt[rt]=Df(Qt),Kt[rt].c(),Kt[rt].m(xt,null))}for(;rt<Kt.length;rt+=1)Kt[rt].d(1);Kt.length=Lt.length}},i:He,o:He,d(mt){mt&&ye(t),gn(B,mt),gn(q,mt),gn(vt,mt),gn(Kt,mt),Ft=!1,wi(ue)}}}function eb(s,t,e){let n,i,r;Ye(s,an,p=>e(0,n=p)),Ye(s,Fn,p=>e(1,i=p)),Ye(s,bi,p=>e(2,r=p));const o={primer:"#8a8f94",metalness:3,roughness:1,clearcoat:.8,clearcoatGloss:.75};function a(p,m){an.update(x=>({...x,[p]:m}))}return[n,i,r,o,a,p=>a("primer",p.currentTarget.value),p=>a("metalness",p),p=>a("roughness",p),p=>a("clearcoat",+p.currentTarget.value),p=>a("clearcoatGloss",+p.currentTarget.value),p=>Fn.set(p.id),p=>bi.set(p.id),()=>an.set({...o})]}class nb extends Vr{constructor(t){super(),Hr(this,t,eb,tb,Ks,{})}}function Nf(s,t,e){const n=s.slice();return n[2]=t[e],n[4]=e,n}function Uf(s){let t,e,n=s[2].label+"",i,r,o,a;function c(){return s[1](s[2])}return{c(){t=nt("button"),e=nt("span"),e.textContent=`${s[4]+1}`,i=_e(n),r=wt(),J(e,"class","num svelte-zptic3"),J(t,"class","svelte-zptic3"),Pe(t,"active",s[0]===s[2].id)},m(l,u){Te(l,t,u),V(t,e),V(t,i),V(t,r),o||(a=de(t,"click",c),o=!0)},p(l,u){s=l,u&1&&Pe(t,"active",s[0]===s[2].id)},d(l){l&&ye(t),o=!1,a()}}}function ib(s){let t,e;return t=new nb({}),{c(){da(t.$$.fragment)},m(n,i){zr(t,n,i),e=!0},i(n){e||(Gi(t.$$.fragment,n),e=!0)},o(n){Ls(t.$$.fragment,n),e=!1},d(n){kr(t,n)}}}function sb(s){let t,e;return t=new QS({}),{c(){da(t.$$.fragment)},m(n,i){zr(t,n,i),e=!0},i(n){e||(Gi(t.$$.fragment,n),e=!0)},o(n){Ls(t.$$.fragment,n),e=!1},d(n){kr(t,n)}}}function rb(s){let t,e;return t=new $S({}),{c(){da(t.$$.fragment)},m(n,i){zr(t,n,i),e=!0},i(n){e||(Gi(t.$$.fragment,n),e=!0)},o(n){Ls(t.$$.fragment,n),e=!1},d(n){kr(t,n)}}}function ob(s){let t,e,n,i,r,o,a,c,l,u,h,f,d,g=xe(fu),_=[];for(let v=0;v<g.length;v+=1)_[v]=Uf(Nf(s,g,v));const p=[rb,sb,ib],m=[];function x(v,y){return v[0]==="import"?0:v[0]==="paint"?1:2}return l=x(s),u=m[l]=p[l](s),f=new kS({}),{c(){t=nt("div"),e=nt("header"),n=nt("div"),n.innerHTML=`<span class="logo svelte-zptic3">✈</span>
      eVTOL 涂装材质预览工具`,i=wt(),r=nt("nav");for(let v=0;v<_.length;v+=1)_[v].c();o=wt(),a=nt("main"),c=nt("aside"),u.c(),h=wt(),da(f.$$.fragment),J(n,"class","title svelte-zptic3"),J(r,"class","svelte-zptic3"),J(e,"class","svelte-zptic3"),J(c,"class","svelte-zptic3"),J(a,"class","svelte-zptic3"),J(t,"class","app svelte-zptic3")},m(v,y){Te(v,t,y),V(t,e),V(e,n),V(e,i),V(e,r);for(let A=0;A<_.length;A+=1)_[A]&&_[A].m(r,null);V(t,o),V(t,a),V(a,c),m[l].m(c,null),V(a,h),zr(f,a,null),d=!0},p(v,[y]){if(y&1){g=xe(fu);let S;for(S=0;S<g.length;S+=1){const E=Nf(v,g,S);_[S]?_[S].p(E,y):(_[S]=Uf(E),_[S].c(),_[S].m(r,null))}for(;S<_.length;S+=1)_[S].d(1);_.length=g.length}let A=l;l=x(v),l!==A&&(ep(),Ls(m[A],1,1,()=>{m[A]=null}),np(),u=m[l],u||(u=m[l]=p[l](v),u.c()),Gi(u,1),u.m(c,null))},i(v){d||(Gi(u),Gi(f.$$.fragment,v),d=!0)},o(v){Ls(u),Ls(f.$$.fragment,v),d=!1},d(v){v&&ye(t),gn(_,v),m[l].d(),kr(f)}}}function ab(s,t,e){let n;return Ye(s,Is,r=>e(0,n=r)),[n,r=>Is.set(r.id)]}class cb extends Vr{constructor(t){super(),Hr(this,t,ab,ob,Ks,{})}}new cb({target:document.getElementById("app")});

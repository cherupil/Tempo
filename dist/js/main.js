(()=>{var M=Object.defineProperty;var O=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var w=(r,e,t)=>(O(r,typeof e!="symbol"?e+"":e,t),t);var u=class{static get(e){switch(e){case"linear":return this._easeLinear;case"easeOut":return this._easeOutSine;case"easeOutExpo":return this._easeOutExpo;case"easeOutSpring":return this._easeOutSpring;case"easeOutBack":return this._easeOutBack;default:return this._easeLinear}}static _easeLinear(e){return e}static _easeOutSine(e){return Math.sin(e*(Math.PI/2))}static _easeOutExpo(e){return 1-Math.pow(2,-10*e)}static _easeOutSpring(e){let t=1,s=.3,a=s/(Math.PI*2)*(Math.asin(1/t)||0);return t*Math.pow(2,-10*e)*Math.sin((e-a)*(Math.PI*2)/s)+1}static _easeOutBack(e){let t=1.70158;return(e=e-1)*e*((t+1)*e+t)+1}};var l=class{constructor(e,t,s){this.target=e,this.properties=t,this.propertyDeltas=[],this.setProperties(s)}setProperties(e){switch(e){case"to":for(let t in this.properties)this.propertyDeltas[t]={start:this.target[t],delta:this.properties[t]-this.target[t]};break;case"from":for(let t in this.properties)this.propertyDeltas[t]={start:this.properties[t],delta:this.target[t]-this.properties[t]};break;default:break}}update(e){for(let t in this.properties)this.target[t]=this.propertyDeltas[t].start+e*this.propertyDeltas[t].delta}};var E=class{constructor(){this.timeScale=1e3,this.moments=[]}play(){this.moments.forEach((e,t)=>{let s=0;t>0&&(e.offset==null?s=this.moments[t-1].timings.totalDuration:s=e.offset*this.timeScale),this._animate(e.animations,e.timings,e.options,s)})}to(e,t,s,a=null){let i=this._setTargets(e),o=this._setTimings(i,s),n=[];i.forEach(h=>{n.push(new l(h,t,"to"))}),this._add(n,o,s,a)}from(e,t,s,a=null){let i=this._setTargets(e),o=this._setTimings(i,s),n=[];i.forEach(h=>{n.push(new l(h,t,"from"))}),this._add(n,o,s,a)}_add(e,t,s,a){this.moments.length===0?this.moments.push({animations:e,timings:t,options:s,offset:0}):this.moments.push({animations:e,timings:t,options:s,offset:a})}_animate(e,t,s,a){function i(n){let h=n-o-(t.delay+a),_=Math.min(h/t.totalDuration,1);e.forEach((y,p)=>{let f=Math.min((h-t.stagger*p)/t.duration,1);if(f>0){let S=t.easing(f);y.update(S)}}),_<1?(s.onUpdate?.(),requestAnimationFrame(i)):s.onComplete?.()}s.onStart?.();let o=performance.now();requestAnimationFrame(i)}_setTargets(e){let t=null;return Array.isArray(e)?t=e:t=[e],t}_setTimings(e,t){let s={};return s.duration=t.duration*this.timeScale,s.delay=t.delay?t.delay*this.timeScale:0,s.stagger=t.stagger?t.stagger*this.timeScale:0,s.totalDuration=s.duration+(e.length-1)*s.stagger,s.easing=u.get(t.ease),s}};var m=class{static to(e,t,s){let a=this._setTargets(e),i=this._setTimings(a,s),o=[];a.forEach(n=>{o.push(new l(n,t,"to"))}),this._animate(o,i,s)}static from(e,t,s){let a=this._setTargets(e),i=this._setTimings(a,s),o=[];a.forEach(n=>{o.push(new l(n,t,"from"))}),this._animate(o,i,s)}static _animate(e,t,s){function a(o){let n=o-i-t.delay,h=Math.min(n/t.totalDuration,1);e.forEach((_,y)=>{let p=Math.min((n-t.stagger*y)/t.duration,1);if(p>0){let f=t.easing(p);_.update(f)}}),h<1?(s.onUpdate?.(),requestAnimationFrame(a)):s.onComplete?.()}s.onStart?.();let i=performance.now();requestAnimationFrame(a)}static _setTargets(e){let t=null;return Array.isArray(e)?t=e:t=[e],t}static _setTimings(e,t){let s=1e3,a={};return a.duration=t.duration*s,a.delay=t.delay?t.delay*s:0,a.stagger=t.stagger?t.stagger*s:0,a.totalDuration=a.duration+(e.length-1)*a.stagger,a.easing=u.get(t.ease),a}};w(m,"scene",E);var c=document.getElementById("canvas"),x=devicePixelRatio;c.width=c.clientWidth*x;c.height=c.clientHeight*x;var g=c.getContext("2d"),d=[],T=["#FFE7E5","#FFBDAF","#E65F5C","#E8FFEE","#36EFB1","#32D789","#E8F4FF","#6EE4FF","#41C0EC","#72FFF9","#67E6E0","#387D7A"];for(var F=0;F<3;F++)d.push({fill:T[Math.floor(Math.random()*T.length)],x:c.width/3,y:c.height/4*(F+1),scale:32});var D=()=>{d.forEach(r=>{g.fillStyle=r.fill,g.beginPath(),g.arc(r.x,r.y,r.scale,0,Math.PI*2),g.fill()})},A=()=>{g.clearRect(0,0,c.width,c.height),D(),requestAnimationFrame(A)};requestAnimationFrame(A);window.addEventListener("click",r=>{let e=new m.scene;e.to(d[0],{x:c.width/3*2},{duration:1,ease:"easeOutExpo"}),e.from(d[1],{x:c.width/3*2},{duration:2,ease:"easeOutExpo"}),e.to(d[2],{x:c.width/3*2},{duration:2,ease:"easeOutExpo"},0),e.play()});})();

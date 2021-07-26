(()=>{var M=Object.defineProperty;var x=(a,t,e)=>t in a?M(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var F=(a,t,e)=>(x(a,typeof t!="symbol"?t+"":t,e),e);var p=class{static get(t){switch(t){case"linear":return this._easeLinear;case"easeOut":return this._easeOutSine;case"easeOutExpo":return this._easeOutExpo;case"easeOutSpring":return this._easeOutSpring;case"easeOutBack":return this._easeOutBack;default:return this._easeLinear}}static _easeLinear(t){return t}static _easeOutSine(t){return Math.sin(t*(Math.PI/2))}static _easeOutExpo(t){return 1-Math.pow(2,-10*t)}static _easeOutSpring(t){let e=1,s=.3,r=s/(Math.PI*2)*(Math.asin(1/e)||0);return e*Math.pow(2,-10*t)*Math.sin((t-r)*(Math.PI*2)/s)+1}static _easeOutBack(t){let e=1.70158;return(t=t-1)*t*((e+1)*t+e)+1}};var u=class{constructor(t,e,s){this.target=t,this.properties=e,this.direction=s,this.propertyDeltas={},this.setProperties()}setProperties(){switch(this.direction){case"to":for(let t in this.properties)this.propertyDeltas[t]={start:this.target[t],delta:this.properties[t]-this.target[t]};break;case"from":for(let t in this.properties)this.propertyDeltas[t]={start:this.properties[t],delta:this.target[t]-this.properties[t]};break;default:break}}update(t){for(let e in this.properties)this.target[e]=this.propertyDeltas[e].start+t*this.propertyDeltas[e].delta}};var y=class{constructor(){this.timeScale=1e3,this.duration=0,this.startTime=0,this.currentTime=0,this.progress=0,this.paused=!1,this.rewinding=!1,this.currentAnimationFrame=null,this.previousActionDuration=0,this.actions=[]}play(){this.rewinding=!1,this.paused?this.startTime=performance.now()-this.duration*this.progress:this.startTime=performance.now(),this.paused=!1;let t=e=>{let s=e-this.startTime;this.progress=Math.min(s/this.duration,1),this._animate(),this.progress<1&&(this.currentAnimationFrame=requestAnimationFrame(t))};this.currentAnimationFrame=requestAnimationFrame(t)}pause(){this.paused=!0,cancelAnimationFrame(this.currentAnimationFrame)}rewind(){this.rewinding=!0,this.paused?this.startTime=performance.now()-this.duration*(1-this.progress):this.startTime=performance.now(),this.paused=!1;let t=e=>{let s=this.duration-(e-this.startTime);this.progress=Math.min(s/this.duration,1),this._animate(),this.progress>0&&(this.currentAnimationFrame=requestAnimationFrame(t))};this.currentAnimationFrame=requestAnimationFrame(t)}setProgress(t){this.progress=t;let e=s=>{let r=this.duration*this.progress;this._animate()};this.currentAnimationFrame=requestAnimationFrame(e)}_animate(){this.currentTime=this.duration*this.progress,this.actions.forEach((t,e)=>{t.progress=(this.currentTime-t.timings.start)/t.timings.totalDuration,t.started&&!t.completed&&(t.options.onUpdate?.(),t.moments.forEach((s,r)=>{let o=Math.max(this.currentTime-t.timings.start-t.timings.stagger*r,0),i=Math.min(o/t.timings.duration,1),n=t.timings.easing(i);s.update(n)})),t.progress>0?(t.started||(t.options.onStart?.(),t.timings.start!==0&&t.moments.forEach(s=>{s.setProperties()})),t.started=!0):(t.started&&t.direction==="from"?t.timings.start!==0?t.moments.forEach(s=>{s.update(1)}):t.moments.forEach(s=>{s.update(0)}):!t.started&&!t.initialized&&t.direction==="from"&&(t.moments.forEach(s=>{s.update(0)}),t.initialized=!0),t.started=!1),t.progress>=1?(t.completed||(t.options.onComplete?.(),t.moments.forEach(s=>{s.update(1)})),t.completed=!0):t.completed=!1})}to(t,e,s,r=null){let o=this._setTargets(t),i=this._setTimings(o,s,r),n=[];o.forEach(m=>{n.push(new u(m,e,"to"))}),this._add(n,i,s,"to")}from(t,e,s,r=null){let o=this._setTargets(t),i=this._setTimings(o,s,r),n=[];o.forEach(m=>{n.push(new u(m,e,"from"))}),this._add(n,i,s,"from")}_add(t,e,s,r){this.actions.push({moments:t,timings:e,options:s,direction:r,progress:0,initialized:!1,started:!1,completed:!1}),this.setProgress(0)}_setTargets(t){let e=null;return Array.isArray(t)?e=t:e=[t],e}_setTimings(t,e,s){let r={},o=e.duration*this.timeScale,i=0;s!==null?i=s*this.timeScale:i=this.previousActionDuration,r.stagger=e.stagger?e.stagger*this.timeScale:0;let n=e.delay?e.delay*this.timeScale+i:i,m=o+(t.length-1)*r.stagger;return r.start=n,r.end=n+m,r.duration=o,r.totalDuration=m,r.easing=p.get(e.ease),this.previousActionDuration=r.end,this.duration=Math.max(this.previousActionDuration,this.duration),r}};var f=class{static to(t,e,s){let r=this._setTargets(t),o=this._setTimings(r,s),i=[];r.forEach(n=>{i.push(new u(n,e,"to"))}),this._animate(i,o,s)}static from(t,e,s){let r=this._setTargets(t),o=this._setTimings(r,s),i=[];r.forEach(n=>{i.push(new u(n,e,"from"))}),this._animate(i,o,s)}static _animate(t,e,s){function r(i){let n=i-o-e.delay,m=Math.min(n/e.totalDuration,1);t.forEach((S,D)=>{let E=Math.min((n-e.stagger*D)/e.duration,1);if(E>0){let P=e.easing(E);S.update(P)}}),m<1?(s.onUpdate?.(),requestAnimationFrame(r)):s.onComplete?.()}s.onStart?.();let o=performance.now();requestAnimationFrame(r)}static _setTargets(t){let e=null;return Array.isArray(t)?e=t:e=[t],e}static _setTimings(t,e){let s=1e3,r={};return r.duration=e.duration*s,r.delay=e.delay?e.delay*s:0,r.stagger=e.stagger?e.stagger*s:0,r.totalDuration=r.duration+(t.length-1)*r.stagger,r.easing=p.get(e.ease),r}};F(f,"scene",y);var X=document.getElementById("webgl"),J=X.getContext("webgl",{powerPreference:"high-performance"});var d=[];d.push({yOffset:50,opacity:0});d.push({yOffset:50,opacity:0});d.push({yOffset:50,opacity:0});var l=[];l.push({scale:1,rotateY:0,rotateX:0,translateX:0,translateZ:0});l.push({scale:1,rotateY:0,rotateX:0,translateX:0,translateZ:0});l.push({scale:1,rotateY:0,rotateX:0,translateX:0,translateZ:0});var h={position:50,angle:45,scale:1,offset:0,intensity:.125,falloff:.03125},q=document.querySelectorAll(".copy-item"),k=document.querySelectorAll(".image-item"),v=document.querySelector(".images"),g=document.documentElement,A=0,_=()=>{v.style.transform=`rotateY(${l[0].rotateY}deg) rotateX(${l[0].rotateX}deg)`,k.forEach((a,t)=>{a.style.transform=`translateZ(${l[t].translateZ}px) translateX(${l[t].translateX}px) scale(${l[t].scale})`}),q.forEach((a,t)=>{a.style.opacity=d[t].opacity,a.style.transform=`translateY(${d[t].yOffset}px)`}),g.style.setProperty("--gradient-position",`${h.position}%`),g.style.setProperty("--gradient-angle",`${h.angle}deg`),g.style.setProperty("--gradient-scale",h.scale),g.style.setProperty("--gradient-offset",`${h.offset}px`),g.style.setProperty("--gradient-intensity",h.intensity),g.style.setProperty("--gradient-falloff",h.falloff),requestAnimationFrame(_),c.setProgress(A)};requestAnimationFrame(_);var c=new f.scene;d.forEach((a,t)=>{c.to(a,{yOffset:-50},{duration:1,ease:"linear"}),c.to(a,{opacity:1},{duration:.25,ease:"linear"},0+t),c.to(a,{opacity:0},{duration:.25,ease:"linear"},.75+t)});c.from(l,{scale:0},{duration:1,ease:"easeOutExpo"},0);c.from(h,{position:100,intensity:0,falloff:0},{duration:1,ease:"easeOutExpo"},0);c.to(l[0],{translateX:-320,translateZ:-250},{duration:1,ease:"easeOutBack"},1);c.to(l[1],{translateX:320,translateZ:-250},{duration:1,ease:"easeOutBack"},1);c.to(l[0],{translateX:-280},{duration:1,ease:"easeOutSine"},2);c.to(l[1],{translateX:280},{duration:1,ease:"easeOutSine"},2);c.to(l,{rotateY:30,rotateX:30},{duration:1,ease:"easeOutSine"},2);c.to(h,{position:25,angle:30,offset:4},{duration:1,ease:"easeOutSine"},2);c.to(l[2],{translateZ:80},{duration:1,ease:"easeOutSine"},2);var $=document.querySelector(".sticky-element"),b=new IntersectionObserver(a=>{a.forEach(t=>{t.isIntersecting?window.addEventListener("scroll",O):window.removeEventListener("scroll",O)})},{threshold:1});b.observe($);var T=1,w=document.querySelector(".sticky-wrapper");w.style.height=`${T*c.duration+window.innerHeight}px`;var I=T*c.duration,O=a=>{let e=a.target.scrollingElement.scrollTop-w.offsetTop;A=Math.min(Math.max(e/I,0),1)};})();

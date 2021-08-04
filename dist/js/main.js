(()=>{var g=class{static get(t){switch(t){case"linear":return this._easeLinear;case"easeInSine":return this._easeInSine;case"easeOutSine":return this._easeOutSine;case"easeInOutSine":return this._easeInOutSine;case"easeInQuad":return this._easeInQuad;case"easeOutQuad":return this._easeOutQuad;case"easeInOutQuad":return this._easeInOutQuad;case"easeInCubic":return this._easeInCubic;case"easeOutCubic":return this._easeOutCubic;case"easeInOutCubic":return this._easeInOutCubic;case"easeInQuart":return this._easeInQuartic;case"easeOutQuart":return this._easeOutQuartic;case"easeInOutQuart":return this._easeInOutQuartic;case"easeInQuint":return this._easeInQuintic;case"easeOutQuint":return this._easeOutQuintic;case"easeInOutQuint":return this._easeInOutQuintic;case"easeInExpo":return this._easeInExpo;case"easeOutExpo":return this._easeOutExpo;case"easeInOutExpo":return this._easeInOutExpo;case"easeOutSpring":return this._easeOutSpring;case"easeOutBack":return this._easeOutBack;default:return this._easeLinear}}static _easeLinear(t){return t}static _easeInSine(t){return-Math.cos(t*(Math.PI/2))+1}static _easeOutSine(t){return Math.sin(t*(Math.PI/2))}static _easeInOutSine(t){return-.5*(Math.cos(Math.PI*t)-1)}static _easeInQuad(t){return t**2}static _easeOutQuad(t){return 1-(1-t)**2}static _easeInOutQuad(t){return t<.5?(t*2)**2/2:1-((1-t)*2)**2/2}static _easeInCubic(t){return t**3}static _easeOutCubic(t){return 1-(1-t)**3}static _easeInOutCubic(t){return t<.5?(t*2)**3/2:1-((1-t)*2)**3/2}static _easeInQuartic(t){return t**4}static _easeOutQuartic(t){return 1-(1-t)**4}static _easeInOutQuartic(t){return t<.5?(t*2)**4/2:1-((1-t)*2)**4/2}static _easeInQuintic(t){return t**5}static _easeOutQuintic(t){return 1-(1-t)**5}static _easeInOutQuintic(t){return t<.5?(t*2)**5/2:1-((1-t)*2)**5/2}static _easeInExpo(t){return Math.pow(2,10*(t-1))-.001}static _easeOutExpo(t){return 1-Math.pow(2,-10*t)}static _easeInOutExpo(t){return(t*=2)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))}static _easeOutSpring(t){let s=1,e=.3,i=e/(Math.PI*2)*(Math.asin(1/s)||0);return s*Math.pow(2,-10*t)*Math.sin((t-i)*(Math.PI*2)/e)+1}static _easeOutBack(t){let s=1.70158;return(t=t-1)*t*((s+1)*t+s)+1}};var m=class{static multiply2DMatricies(t,s){let e=t[0*3+0],i=t[0*3+1],a=t[0*3+2],r=t[1*3+0],n=t[1*3+1],o=t[1*3+2],c=t[2*3+0],h=t[2*3+1],p=t[2*3+2],w=s[0*3+0],O=s[0*3+1],T=s[0*3+2],I=s[1*3+0],D=s[1*3+1],x=s[1*3+2],y=s[2*3+0],F=s[2*3+1],L=s[2*3+2];return[w*e+O*r+T*c,w*i+O*n+T*h,w*a+O*o+T*p,I*e+D*r+x*c,I*i+D*n+x*h,I*a+D*o+x*p,y*e+F*r+L*c,y*i+F*n+L*h,y*a+F*o+L*p]}static translate2D(t,s){return[1,0,t,0,1,s,0,0,1]}static scale2D(t,s){return[t,0,0,0,s,0,0,0,1]}static rotate2D(t){return[Math.cos(t),-Math.sin(t),0,Math.sin(t),Math.cos(t),0,0,0,1]}};var u=class{constructor(t,s,e,i,a,r){this.target=t,this.property=s,this.targetValue=e,this.currentValue=i,this.units=a,this.direction=r,this.propertyDelta={},this.setProperties()}setProperties(){switch(this.direction){case"to":this.propertyDelta={start:this.currentValue,delta:this.targetValue-this.currentValue};break;case"from":this.propertyDelta={start:this.targetValue,delta:this.currentValue-this.targetValue};break;case"addClass":this.classFunction=()=>{this.target.classList.add(this.targetValue)};break;case"removeClass":this.classFunction=()=>{this.target.classList.remove(this.targetValue)};break;default:break}}update(t){this.property!=="class"?this.target[this.property]=this.propertyDelta.start+t*this.propertyDelta.delta+this.units:(t===0&&(this.direction==="addClass"?this.target.classList.remove(this.targetValue):this.target.classList.add(this.targetValue)),t===1&&this.classFunction())}};var l=class{constructor(t,s,e,i){this.target=t,this.properties=s,this.direction=e,this.isDOM=i,this.unitExpression=/[a-z]+|%/,this.hasTransform=!1,this.transformPropertyKeys=["translateX","translateY","rotate","scale","scaleX","scaleY"],this.transformMatrix={},this.setProperties()}getTransformMatrix(t){if(t==="none"||t===void 0)return{translateX:0,translateY:0,scaleX:1,scaleY:1,rotate:0};this.transformType=t.includes("3d")?"3d":"2d";let s=t.match(/matrix.*\((.+)\)/)[1].split(", ");if(this.transformType==="2d")return{translateX:s[4],translateY:s[5],scaleX:s[0],scaleY:s[3],rotate:Math.atan2(s[1],s[0])*(180/Math.PI)}}setProperties(){if(this.actions=[],this.isDOM){let t=getComputedStyle(this.target);this.transformMatrix=this.getTransformMatrix(t.transform);for(let s in this.properties)if(this.transformPropertyKeys.includes(s))this.hasTransform=!0,s==="scale"?(this.actions.push(new u(this.transformMatrix,"scaleX",this.properties.scale,parseFloat(this.transformMatrix.scaleX),null,this.direction)),this.actions.push(new u(this.transformMatrix,"scaleY",this.properties.scale,parseFloat(this.transformMatrix.scaleY),null,this.direction))):this.actions.push(new u(this.transformMatrix,s,this.properties[s],parseFloat(this.transformMatrix[s]),null,this.direction));else if(s!=="class"){let e=this.unitExpression.exec(t[s]),i=parseFloat(t[s].split(e)[0]);this.actions.push(new u(this.target.style,s,this.properties[s],i,e,this.direction))}else this.actions.push(new u(this.target,s,this.properties[s],null,null,this.direction))}else for(let t in this.properties)this.actions.push(new u(this.target,t,this.properties[t],this.target[t],null,this.direction));for(let t of this.actions)t.setProperties()}update(t){for(let s of this.actions)s.update(t);if(this.hasTransform){let s=m.multiply2DMatricies(m.multiply2DMatricies(m.scale2D(this.transformMatrix.scaleX,this.transformMatrix.scaleY),m.rotate2D(this.transformMatrix.rotate*(Math.PI/180))),m.translate2D(this.transformMatrix.translateX,this.transformMatrix.translateY));this.target.style.transform=`matrix(${s[0]}, ${s[3]}, ${s[1]}, ${s[4]}, ${s[2]}, ${s[5]})`}}};var _=class{constructor(){this.timeScale=1e3,this.duration=0,this.startTime=0,this.currentTime=0,this.progress=0,this.paused=!1,this.rewinding=!1,this.currentAnimationFrame=null,this.previousActionDuration=0,this.actions=[]}play(){this.rewinding=!1,this.paused?this.startTime=performance.now()-this.duration*this.progress:this.startTime=performance.now(),this.paused=!1;let t=s=>{let e=s-this.startTime;this.progress=Math.min(e/this.duration,1),this._animate(),this.progress<1&&(this.currentAnimationFrame=requestAnimationFrame(t))};this.currentAnimationFrame=requestAnimationFrame(t)}pause(){this.paused=!0,cancelAnimationFrame(this.currentAnimationFrame)}rewind(){this.rewinding=!0,this.paused?this.startTime=performance.now()-this.duration*(1-this.progress):this.startTime=performance.now(),this.paused=!1;let t=s=>{let e=this.duration-(s-this.startTime);this.progress=Math.min(e/this.duration,1),this._animate(),this.progress>0&&(this.currentAnimationFrame=requestAnimationFrame(t))};this.currentAnimationFrame=requestAnimationFrame(t)}setProgress(t){this.progress=t;let s=e=>{let i=this.duration*this.progress;this._animate()};this.currentAnimationFrame=requestAnimationFrame(s)}_animate(){this.currentTime=this.duration*this.progress,this.actions.forEach((t,s)=>{t.progress=(this.currentTime-t.timings.start)/t.timings.totalDuration,t.started&&!t.completed&&(t.options.onUpdate?.(),t.moments.forEach((e,i)=>{let a=Math.max(this.currentTime-t.timings.start-t.timings.stagger*i,0),r=Math.min(a/t.timings.duration,1),n=t.timings.easing(r);e.update(n),t.options.toggle&&r!==1&&e.update(0)})),t.progress>0?(t.started||(t.options.onStart?.(),t.timings.start!==0&&t.moments.forEach(e=>{e.setProperties()})),t.started=!0):(t.started&&t.direction==="from"?t.timings.start!==0?t.moments.forEach(e=>{e.update(1)}):t.moments.forEach(e=>{e.update(0)}):!t.started&&!t.initialized&&t.direction==="from"&&(t.moments.forEach(e=>{e.update(0)}),t.initialized=!0),t.options.toggle&&t.moments.forEach(e=>{e.update(0)}),t.started=!1),t.progress>=1?(t.completed||(t.options.onComplete?.(),t.moments.forEach(e=>{e.update(1)})),t.completed=!0):t.completed=!1})}to(t,s,e,i=null){let a=!1,r=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(a=!0,t instanceof window.NodeList&&(r=[...t]));let n=this._setTargets(r),o=this._setTimings(n,e,i),c=[];n.forEach(h=>{c.push(new l(h,s,"to",a))}),this._add(c,o,e,"to")}from(t,s,e,i=null){let a=!1,r=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(a=!0,t instanceof window.NodeList&&(r=[...t]));let n=this._setTargets(r),o=this._setTimings(n,e,i),c=[];n.forEach(h=>{c.push(new l(h,s,"from",a))}),this._add(c,o,e,"from")}addClass(t,s,e,i=null){let a=!1,r=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(a=!0,t instanceof window.NodeList&&(r=[...t]));let n=this._setTargets(r),o=this._setTimings(n,e,i),c=[];n.forEach(h=>{c.push(new l(h,s,"addClass",a))}),this._add(c,o,e,"addClass")}removeClass(t,s,e,i=null){let a=!1,r=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(a=!0,t instanceof window.NodeList&&(r=[...t]));let n=this._setTargets(r),o=this._setTimings(n,e,i),c=[];n.forEach(h=>{c.push(new l(h,s,"removeClass",a))}),this._add(c,o,e,"removeClass")}_add(t,s,e,i){this.actions.push({moments:t,timings:s,options:e,direction:i,progress:0,initialized:!1,started:!1,completed:!1}),this.setProgress(0)}_setTargets(t){let s=null;return Array.isArray(t)?s=t:s=[t],s}_setTimings(t,s,e){let i={},a=s.duration?s.duration*this.timeScale:0,r=0;e!==null?r=e*this.timeScale:r=this.previousActionDuration,i.stagger=s.stagger?s.stagger*this.timeScale:0;let n=s.delay?s.delay*this.timeScale+r:r,o=a+(t.length-1)*i.stagger;return i.start=n,i.end=n+o,i.duration=a,i.totalDuration=o,i.easing=g.get(s.ease),this.previousActionDuration=i.end,this.duration=Math.max(this.previousActionDuration,this.duration),i}};var M=class{constructor(t,s,e={}){this.element=t,this.scene=s,this.options=e,this.observer=null,this.progress=0,this.scrollDistance=0,this.scrollPosition=0,this.options.pinned?(this.threshold=1,this.offset=this.element.parentElement.offsetTop,this.scrollHeight=this.scene.duration,this._scrollListener=this._pinnedScrollListener.bind(this),this._setScrollHeight()):(this.threshold=0,this.offset=this.element.offsetTop,this.viewportHeight=window.innerHeight,this.scrollHeight=this.element.getBoundingClientRect().height+this.offset,this._scrollListener=this._defaultScrollListener.bind(this)),this._createObserver()}_setScrollHeight(){this.element.parentElement.style.height=`${this.scrollHeight+window.innerHeight}px`}_defaultScrollListener(t){this.scrollDistance=t.target.scrollingElement.scrollTop,this.scrollPosition=this.scrollDistance+this.viewportHeight-this.offset,this.progress=Math.min(Math.max(this.scrollPosition/this.scrollHeight,0),1)}_pinnedScrollListener(t){this.scrollDistance=t.target.scrollingElement.scrollTop,this.scrollPosition=this.scrollDistance-this.offset,this.progress=Math.min(Math.max(this.scrollPosition/this.scrollHeight,0),1)}_createObserver(){this.observer=new IntersectionObserver(t=>{t.forEach(s=>{s.isIntersecting?window.addEventListener("scroll",this._scrollListener):window.removeEventListener("scroll",this._scrollListener)})},{threshold:this.threshold}),this.observer.observe(this.element)}};var d=class{static to(t,s,e){let i=!1,a=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(i=!0,t instanceof window.NodeList&&(a=[...t]));let r=this._setTargets(a),n=this._setTimings(r,e),o=[];r.forEach(c=>{o.push(new l(c,s,"to",i))}),this._animate(o,n,e)}static from(t,s,e){let i=!1,a=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(i=!0,t instanceof window.NodeList&&(a=[...t]));let r=this._setTargets(a),n=this._setTimings(r,e),o=[];r.forEach(c=>{o.push(new l(c,s,"from",i))}),this._animate(o,n,e)}static addClass(t,s,e){let i=!1,a=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(i=!0,t instanceof window.NodeList&&(a=[...t]));let r=this._setTargets(a),n=this._setTimings(r,e),o=[];r.forEach(c=>{o.push(new l(c,s,"addClass",i))}),this._animate(o,n,e)}static removeClass(t,s,e){let i=!1,a=t;(t instanceof window.HTMLElement||t instanceof window.NodeList)&&(i=!0,t instanceof window.NodeList&&(a=[...t]));let r=this._setTargets(a),n=this._setTimings(r,e),o=[];r.forEach(c=>{o.push(new l(c,s,"removeClass",i))}),this._animate(o,n,e)}static _animate(t,s,e){function i(r){let n=r-a-s.delay,o=Math.min(n/s.totalDuration,1);t.forEach((c,h)=>{let p=Math.min((n-s.stagger*h)/s.duration,1);if(p>0){let w=s.easing(p);c.update(w)}}),o<1?(e.onUpdate?.(),requestAnimationFrame(i)):(e.onComplete?.(),t.forEach(c=>{c.update(1)}))}e.onStart?.();let a=performance.now();requestAnimationFrame(i)}static _setTargets(t){let s=null;return Array.isArray(t)?s=t:s=[t],s}static _setTimings(t,s){let e=1e3,i={};return i.duration=s.duration?s.duration*e:0,i.delay=s.delay?s.delay*e:0,i.stagger=s.stagger?s.stagger*e:0,i.totalDuration=i.duration+(t.length-1)*i.stagger,i.easing=g.get(s.ease),i}};d.scene=_;d.camera=M;var C=document.getElementById("webgl"),J=C.getContext("webgl",{powerPreference:"high-performance"});var S={test:0};var b=document.querySelectorAll("p"),A=()=>{requestAnimationFrame(A),E.setProgress(v.progress)};requestAnimationFrame(A);var E=new d.scene;E.to(S,{test:100},{duration:4,ease:"linear"});E.addClass(b,{class:"show"},{toggle:!0,stagger:.2},3.95);var Q=document.querySelector(".sticky-element"),v=new d.camera(Q,E,{pinned:!0}),W=document.querySelector("h1");})();

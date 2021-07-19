(()=>{var p=class{static get(e){switch(e){case"linear":return this._easeLinear;case"easeOut":return this._easeOutSine;case"easeOutExpo":return this._easeOutExpo;case"easeOutSpring":return this._easeOutSpring;case"easeOutBack":return this._easeOutBack;default:return this._easeLinear}}static _easeLinear(e){return e}static _easeOutSine(e){return Math.sin(e*(Math.PI/2))}static _easeOutExpo(e){return 1-Math.pow(2,-10*e)}static _easeOutSpring(e){let t=1,a=.3,s=a/(Math.PI*2)*(Math.asin(1/t)||0);return t*Math.pow(2,-10*e)*Math.sin((e-s)*(Math.PI*2)/a)+1}static _easeOutBack(e){let t=1.70158;return(e=e-1)*e*((t+1)*e+t)+1}};var h=class{constructor(e,t,a){this.target=e,this.properties=t,this.propertyDeltas=[],this.setProperties(a)}setProperties(e){switch(e){case"to":for(let t in this.properties)this.propertyDeltas[t]={start:this.target[t],delta:this.properties[t]-this.target[t]};break;case"from":for(let t in this.properties)this.propertyDeltas[t]={start:this.properties[t],delta:this.target[t]-this.properties[t]};break;default:break}}update(e){for(let t in this.properties)this.target[t]=this.propertyDeltas[t].start+e*this.propertyDeltas[t].delta}};var u=class{static to(e,t,a){let s=this._setTargets(e),c=this._setTimings(s,a),o=[];s.forEach(n=>{o.push(new h(n,t,"to"))}),this._animate(o,c,a)}static from(e,t,a){let s=this._setTargets(e),c=this._setTimings(s,a),o=[];s.forEach(n=>{o.push(new h(n,t,"from"))}),this._animate(o,c,a)}static _animate(e,t,a){function s(o){let n=o-c-t.delay,_=Math.min(n/t.totalDuration,1);e.forEach((y,w)=>{let g=Math.min((n-t.stagger*w)/t.duration,1);if(g>0){let M=t.easing(g);y.update(M)}}),_<1?(a.onUpdate?.(),requestAnimationFrame(s)):a.onComplete?.()}a.onStart?.();let c=performance.now();requestAnimationFrame(s)}static _setTargets(e){let t=null;return Array.isArray(e)?t=e:t=[e],t}static _setTimings(e,t){let a=1e3,s={};return s.duration=t.duration*a,s.delay=t.delay?t.delay*a:0,s.stagger=t.stagger?t.stagger*a:0,s.totalDuration=s.duration+(e.length-1)*s.stagger,s.easing=p.get(t.ease),s}};var r=document.getElementById("canvas"),m=devicePixelRatio;r.width=r.clientWidth*m;r.height=r.clientHeight*m;var l=r.getContext("2d"),d=[],f=["#FFE7E5","#FFBDAF","#E65F5C","#E8FFEE","#36EFB1","#32D789","#E8F4FF","#6EE4FF","#41C0EC","#72FFF9","#67E6E0","#387D7A"];for(var E=0;E<1e3;E++)d.push({fill:f[Math.floor(Math.random()*f.length)],x:Math.floor(Math.random()*(r.width*2))-r.width/2,y:r.height+32,scale:32});var x=()=>{d.forEach(i=>{l.fillStyle=i.fill,l.beginPath(),l.arc(i.x,i.y,i.scale,0,Math.PI*2),l.fill()})},F=()=>{l.clearRect(0,0,r.width,r.height),x(),requestAnimationFrame(F)};requestAnimationFrame(F);window.addEventListener("click",i=>{u.from(d,{x:r.width/2,y:0,scale:0},{duration:1,ease:"easeOutSine",stagger:.01,onStart:()=>{console.log("started")},onUpdate:()=>{console.log("updated")},onComplete:()=>{console.log("completed")}})});})();
/**
 * The scroll-reveal engine: a few lines of plain script, inlined first in <body> so it runs before
 * anything paints and does not depend on React.
 *
 * It sets `data-rv-on` on <html>; every hidden "before" state in the stylesheet is written against
 * that attribute. No script (or reduced motion) means no attribute, which means nothing is ever hidden.
 * Elements marked `data-rv` get `data-in` the first time they enter the viewport and are never touched
 * again. It marks with an attribute, not a class, because React re-renders can overwrite `className`
 * but never remove an attribute they do not know about.
 */
const script = `(function(){
var d=document,h=d.documentElement,w=window;
if(!('IntersectionObserver' in w)||!('MutationObserver' in w)||w.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
function step(t){var p=t.parentElement;return t.getAttribute('data-rv-step')==='s'||(p&&p.getAttribute('data-rv-step')==='s')?40:60}
/* Everything arriving together plays in reading order; nothing waits longer than six steps. */
function show(seen){
seen.sort(function(a,b){return Math.round(a.r.top-b.r.top)||a.r.left-b.r.left});
var wait=0;
seen.forEach(function(s,i){
var t=s.t;
t.style.setProperty('--d',wait+'ms');
if(i<6)wait+=step(t);
t.setAttribute('data-in','');io.unobserve(t);
});
}
/* An element counts as arrived once it is a tenth of the viewport above the bottom edge. */
var io=new IntersectionObserver(function(es){
var seen=[];
es.forEach(function(e){
var t=e.target;
if(e.isIntersecting)seen.push({t:t,r:e.boundingClientRect});
else if(e.boundingClientRect.bottom<=0){
/* Already above the viewport (deep link, restored scroll): show it without playing anything. */
t.setAttribute('data-now','');t.setAttribute('data-in','');io.unobserve(t);
}
});
show(seen);
},{rootMargin:'0px 0px -10% 0px'});
/* The last tenth of the page can never rise past that line, so at the end of the scroll whatever is on screen arrives. */
function end(){
if(!d.querySelector('[data-rv]:not([data-in])'))return;
if(w.innerHeight+w.scrollY<h.scrollHeight-2)return;
var l=d.querySelectorAll('[data-rv]:not([data-in])'),seen=[];
for(var i=0;i<l.length;i++){var r=l[i].getBoundingClientRect();if(r.top<w.innerHeight)seen.push({t:l[i],r:r})}
show(seen);
}
w.addEventListener('scroll',end,{passive:true});
w.addEventListener('resize',end);
w.addEventListener('load',end);
function watch(n){
if(n.nodeType!==1)return;
if(n.hasAttribute('data-rv')&&!n.hasAttribute('data-in'))io.observe(n);
var l=n.querySelectorAll('[data-rv]:not([data-in])');
for(var i=0;i<l.length;i++)io.observe(l[i]);
}
/* Catches the elements as the parser adds them, and later the pages of client-side navigations. */
new MutationObserver(function(ms){
for(var i=0;i<ms.length;i++)for(var j=0;j<ms[i].addedNodes.length;j++)watch(ms[i].addedNodes[j]);
end();
}).observe(d.body,{childList:true,subtree:true});
watch(d.body);
/* Tabbing ahead of the scroll must never land on an invisible control. */
d.addEventListener('focusin',function(e){
var t=e.target&&e.target.closest?e.target.closest('[data-rv]'):null;
while(t){
if(!t.hasAttribute('data-in')){t.setAttribute('data-in','');io.unobserve(t)}
t=t.parentElement?t.parentElement.closest('[data-rv]'):null;
}
});
/* Armed last: had anything above thrown, nothing would ever have been hidden. Still before first paint. */
h.setAttribute('data-rv-on','');
})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

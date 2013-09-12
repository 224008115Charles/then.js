'use strict';
/*global module, process*/

var testThen = (function(){function p(c){return null===c||"undefined"===typeof c}function k(c){return"function"===typeof c}function l(c,a,d){return Error("Argument "+c+' in "'+a+'" function is not a '+d+"!")}function v(c,a,d,g){function e(a,f,b){h-=1;m[a]=b;(0>=h||!p(f))&&c(f||null,m)}var b,f,h,m=[];e._this_then=!0;if(q(a))if(k(d))if(h=f=a.length)for(b=0;b<f;b++)d.call(g,e.bind(null,b),a[b],b,a);else c(null,m);else c(l(d,"each","function"));else c(l(a,"each","array"))}function w(c,a,d,g){function e(m,B){h[f]=B;
f+=1;f<b&&p(m)?d.call(g,e,a[f],f,a):(delete h[-1],c(m||null,h))}var b,f=-1,h=[];e._this_then=!0;q(a)?k(d)?(b=a.length)?e():c(null,h):c(l(d,"eachSeries","function")):c(l(a,"eachSeries","array"))}function x(c,a,d){function g(a,b,d){f-=1;h[a]=d;(0>=f||!p(b))&&c(b||null,h)}var e,b,f,h=[];g._this_then=!0;if(q(a))if(f=b=a.length)for(e=0;e<b;e++)k(a[e])?a[e].call(d,g.bind(null,e),e):c(l(a[e],"parallel","function"));else c(null,h);else c(l(a,"parallel","array"))}function y(c,a,d){function g(h,m){f[b]=m;b+=
1;b<e&&p(h)?k(a[b])?a[b].call(d,g,b):c(l(a[b],"series","function")):(delete f[-1],c(h||null,f))}var e,b=-1,f=[];g._this_then=!0;q(a)?(e=a.length)?g():c(null,f):c(l(a,"series","array"))}function s(c,a){C(function(){try{a()}catch(d){c(d)}})}function r(c,a){return k(a)?a._this_then?a:a.bind(null,c):null}function t(c){function a(a,c){var b=new e,d=b.defer.bind(b);d._this_then=b;a(d,c);return b}var d=[],g=0,e=function(){},b=e.prototype;b.debug=c;b.all=function(f){return a(function(a,b){b._all=r(a,f)},
this)};b.then=function(b,c){return a(function(a,d){d._success=r(a,b);d._error=r(a,c)},this)};b.fail=function(b){return a(function(a,c){c._fail=r(a,b);c._success=a.bind(a,null);c._fail&&d.push(c._fail)},this)};b.each=function(b,c,d){return a(function(a,e){e._each=function(e,g,k){v(a,b||e,c||g,d||k)}},this)};b.eachSeries=function(b,c,d){return a(function(a,e){e._eachSeries=function(e,g,k){w(a,b||e,c||g,d||k)}},this)};b.parallel=function(b,c){return a(function(a,d){d._parallel=function(d,e){x(a,b||d,
c||e)}},this)};b.series=function(b,c){return a(function(a,d){d._series=function(d,e){y(a,b||d,c||e)}},this)};b.defer=function(a){g+=1;this._error=this._fail?d.shift():this._error;if(this.debug){var b=u.call(arguments);b.unshift("Then chain "+g+":");k(this.debug)?this.debug.apply(this.debug,b):"object"===typeof console&&k(console.log)&&console.log.apply(console,b)}if(this._all)try{this._all.apply(this._all._this_then,u.call(arguments)),a=null}catch(c){a=c}else if(p(a)){this._success=this._success||
this._each||this._eachSeries||this._parallel||this._series;try{return this._success&&this._success.apply(this._success._this_then,u.call(arguments,1))}catch(e){a=e}}if(!p(a)){if(this._error||d.length)return this._error?this._error(a):d.shift()(a);throw a;}};return a}function z(c){return function(a,d,g,e){return t(e)(function(b){s(b,c.bind(null,b,a,d,g))})}}function A(c){return function(a,d,g){return t(g)(function(e){s(e,c.bind(null,e,a,d))})}}function n(c,a,d){return t(d)(function(d){s(d,k(c)?c.bind(a,
d):d)})}var u=[].slice,q=Array.isArray,C="object"===typeof process&&k(process.nextTick)?process.nextTick:setTimeout;n.each=z(v);n.eachSeries=z(w);n.parallel=A(x);n.series=A(y);"undefined"!==typeof module&&module.exports?module.exports=n:"function"===typeof define&&define(function(){return n});"object"===typeof window&&(window.then=n);return n})();
// TEST begin

function asnycTask(n, callback) {
    setTimeout(function () {
        callback(null, n);
    }, n * 1000);
}

testThen(function (defer) {
    console.log(111);
    asnycTask(1, defer);
}, null, true).then(function (defer, a) {
    console.log(222, a);
    asnycTask(2, defer);
}).then(function (defer, a) {
    console.log(333, a);
    asnycTask(3, function (err, b) {
        console.log(3332, err, b);
        defer(null, 'hello!', b);
    });
}).then(function (defer, a, b) {
    console.log(444, a, b);
    defer('Error1!');
}).then(function (defer) {
    console.log(555);
    defer('Error2!');
}).fail(function (defer, err) {
    console.log(666, err);
    defer(null, 'aaa');
}).then(function (defer, a) {
    console.log(777, a);
    defer('Error3!');
}).fail(function (defer, err) {
    console.log(888, err);
});
// TEST end

(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{285:function(t,e,n){"use strict";n.r(e);n(4),n(3),n(1),n(5),n(2),n(6);var r=n(21),o=n(0),c=(n(44),n(58));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"Home",layout:"menu",components:{},data:function(){return{}},computed:f({},Object(c.c)("auth",["token"])),mounted:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},methods:f(f({},Object(c.b)("auth",["login"])),{},{handleFormResult:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.login();case 2:case"end":return e.stop()}}),e)})))()},get:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.$get("https://novumcolombia.com/api/posts/");case 3:n=e.sent,t.token=n,console.log(n),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},post:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={title:"1",body:"dsadassa",userId:1},t.prev=1,t.next=4,e.$axios.$post("https://jsonplaceholder.typicode.com/posts",n);case 4:r=t.sent,console.log(r),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})))()}})},v=n(53),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("section",{staticClass:"section"},[n("h3",{staticClass:"subtitle is-6 has-text-grey"},[t._v("\n      3 Status:\n      "),t.$nuxt.isOffline?n("a",{attrs:{href:"#"}},[t._v("\n        IS OFFLINE\n      ")]):n("a",{attrs:{href:"#"}},[t._v("\n        IS ONLINE\n      ")])]),t._v(" "),n("div",{staticClass:"columns is-mobile"},[n("button",{on:{click:t.get}},[t._v("Hacer GET")])]),t._v(" "),n("div",{staticClass:"columns is-mobile mt-3"},[n("button",{on:{click:t.post}},[t._v("Hacer POST")])]),t._v(" "),n("div",{staticClass:"columns is-mobile mt-3"},[t._v("\n      "+t._s(JSON.stringify(t.token))+"\n    ")])])])}),[],!1,null,null,null);e.default=component.exports}}]);
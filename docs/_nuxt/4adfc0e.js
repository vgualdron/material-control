(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{265:function(t,e,n){var content=n(268);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("1b7833da",content,!0,{sourceMap:!1})},267:function(t,e,n){"use strict";n(265)},268:function(t,e,n){var o=n(65)(!1);o.push([t.i,'.container{margin:0 auto;min-height:100vh;display:flex;justify-content:center;align-items:center;text-align:center}.title{font-family:"Quicksand","Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;display:block;font-weight:300;font-size:100px;color:#35495e;letter-spacing:1px}.subtitle{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links{padding-top:15px}',""]),t.exports=o},271:function(t,e,n){"use strict";n.r(e);var o=n(25),r=(n(54),{name:"HomePage",components:{},methods:{handleFormResult:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={title:"titulo",body:{contenido:"dsadsad"},userId:1},e.prev=1,e.next=4,t.$axios.$post("https://jsonplaceholder.typicode.com/posts",n);case 4:o=e.sent,console.log(o),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()}}}),c=(n(267),n(62)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("section",{staticClass:"section"},[n("h3",{staticClass:"subtitle is-6 has-text-grey"},[t._v("\n      Status:\n      "),t.$nuxt.isOffline?n("a",{attrs:{href:"#"}},[t._v("\n        IS OFFLINE\n      ")]):n("a",{attrs:{href:"#"}},[t._v("\n        IS ONLINE\n      ")])]),t._v(" "),n("div",{staticClass:"columns is-mobile"},[n("card",{attrs:{title:"POST",icon:"github"}},[n("button",{on:{click:t.handleFormResult}},[t._v("Hacer POST")])])],1)])])}),[],!1,null,null,null);e.default=component.exports}}]);
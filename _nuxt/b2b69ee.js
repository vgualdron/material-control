(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{547:function(e,t,r){"use strict";r.r(t);r(15),r(14),r(12),r(10),r(16),r(13),r(17);var n=r(8),o=r(3),c=(r(34),r(31)),l=r(43);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"Login",components:{BannerMenu:r(355).default},layout:"default",data:function(){return{user:"",password:"",labelTextFieldRequired:"Campo obligatorio"}},computed:f(f(f({},Object(c.d)(l.typesAuth.PATH,["activeToken","authorizationToken"])),Object(c.c)(l.typesAuth.PATH,{isLoggedIn:l.typesAuth.getters.IS_LOGGED_IN})),{},{validationUser:function(){return this.user.length>0},validationPassword:function(){return this.password.length>0}}),mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getActiveToken();case 2:case"end":return t.stop()}}),t)})))()},methods:f(f({},Object(c.b)(l.typesAuth.PATH,{getActiveToken:l.typesAuth.actions.GET_ACTIVE_TOKEN,login:l.typesAuth.actions.LOGIN,getSession:l.typesAuth.actions.GET_DATA_SESSION})),{},{handleForm:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.preventDefault(),data={activeToken:t.activeToken,username:t.user,password:t.password},r.next=4,t.login(data);case 4:return r.next=6,t.getSession();case 6:case"end":return r.stop()}}),r)})))()}})},m=r(73),component=Object(m.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("BannerMenu"),e._v(" "),r("b-row",[r("b-col"),e._v(" "),r("b-col",{attrs:{cols:"8",md:"auto"}},[r("b-card",{staticClass:"mt-3",attrs:{header:"Iniciar sesión","header-tag":"header"}},[r("b-form",{attrs:{id:"form-login"},on:{submit:e.handleForm}},[r("b-form-group",[r("label",{attrs:{for:"feedback-user"}},[e._v("Usuario")]),e._v(" "),r("b-form-input",{attrs:{id:"feedback-user",state:e.validationUser,required:""},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleForm.apply(null,arguments)}},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{state:e.validationUser}},[e._v("\n              "+e._s(e.labelTextFieldRequired)+"\n            ")])],1),e._v(" "),r("label",{staticClass:"mt-3",attrs:{for:"feedback-password"}},[e._v("Contraseña")]),e._v(" "),r("b-form-input",{attrs:{id:"feedback-password",state:e.validationPassword,type:"password"},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleForm.apply(null,arguments)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{state:e.validationPassword}},[e._v("\n            "+e._s(e.labelTextFieldRequired)+"\n          ")]),e._v(" "),r("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-login",type:"submit",href:"#",variant:"primary",disabled:!e.validationUser||!e.validationPassword},on:{click:e.handleForm}},[e._v("\n            Iniciar sesión\n          ")])],1)],1)],1),e._v(" "),r("b-col")],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{485:function(e,t,r){"use strict";r.r(t);r(14),r(13),r(11),r(15),r(12),r(16);var n=r(8),o=r(3),d=(r(32),r(45),r(30)),l=r(46),c=r(37),m=r(55);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"modal-form",data:function(){return{id:"user-modal",title:"Crear usuario",textBtnSubmit:"Registrar",document_number:"",name:"",phone:"",yard:"",conveyor_company:"",role:[],labelTextFieldRequired:"Campo obligatorio",disabledElements:!1}},watch:{typeAction:function(e){"create"===e&&(this.title="Crear Usuario",this.id="create-user-modal",this.textBtnSubmit="Registrar",this.disabledElements=!1),"edit"===e&&(this.title="Modificar Usuario",this.id="edit-user-modal",this.textBtnSubmit="Guardar cambios",this.disabledElements=!1),"delete"===e&&(this.title="Eliminar Usuario",this.id="delete-user-modal",this.textBtnSubmit="Eliminar",this.disabledElements=!0)},user:function(e){"create"===this.typeAction&&(this.document_number="",this.name="",this.phone="",this.role=[],this.yard=""),"edit"!==this.typeAction&&"delete"!==this.typeAction||(this.document_number=e.documentNumber,this.phone=e.phoneNumber,this.role=e.role,this.name=e.name,this.yard=parseInt(e.yard))}},components:{BIconX:r(0).Uw},computed:h(h(h(h({},Object(d.d)(l.typesUser.PATH,["showModalForm","user","typeAction"])),Object(d.d)(c.typesYard.PATH,["yards"])),Object(d.d)(m.typesRole.PATH,["roles"])),{},{validationDocumentNumber:function(){return this.document_number.length>0},validationName:function(){return this.name.length>0},validationPhone:function(){return this.phone.length>0}}),mounted:function(){},methods:h(h(h({},Object(d.b)(l.typesUser.PATH,{setShowModalForm:l.typesUser.actions.SET_SHOW_MODAL_FORM,save:l.typesUser.actions.SAVE,delete:l.typesUser.actions.DELETE,edit:l.typesUser.actions.EDIT})),Object(d.b)(c.typesYard.PATH,{getYards:c.typesYard.actions.GET_YARDS})),{},{resetInfoModal:function(){this.name="",this.document_number="",this.role=[],this.setShowModalForm(!1)},handleForm:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e.preventDefault(),"create"!==t.typeAction){r.next=4;break}return r.next=4,t.save({document_number:t.document_number,name:t.name,phone:t.phone,yard:t.yard,role:t.role});case 4:if("edit"!==t.typeAction){r.next=7;break}return r.next=7,t.edit({id:t.user.id,document_number:t.document_number,name:t.name,phone:t.phone,yard:t.yard,role:t.role});case 7:if("delete"!==t.typeAction){r.next=10;break}return r.next=10,t.delete(t.user.id);case 10:case"end":return r.stop()}}),r)})))()},searchYards:function(e){var data={perPage:10,page:1,text:e,yard:this.yard};this.getYards(data)}})},_=r(69),component=Object(_.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("b-modal",{attrs:{id:e.id,"no-close-on-backdrop":"","no-close-on-esc":""},on:{hide:e.resetInfoModal},scopedSlots:e._u([{key:"modal-header",fn:function(){return[r("h5",[e._v(e._s(e.title))]),e._v(" "),r("b-icon-x",{staticClass:"icon-close",attrs:{"font-scale":"2"},on:{click:function(t){return e.resetInfoModal()}}})]},proxy:!0},{key:"modal-footer",fn:function(){return[r("div",{staticClass:"w-100"},[r("b-button",{staticClass:"float-right",attrs:{variant:"secondary",size:"sm"},on:{click:function(t){return e.resetInfoModal()}}},[e._v("\n        Cancelar\n      ")])],1)]},proxy:!0}]),model:{value:e.showModalForm,callback:function(t){e.showModalForm=t},expression:"showModalForm"}},[e._v(" "),r("b-form",{on:{submit:e.handleForm}},[r("b-form-group",[r("label",{attrs:{for:"feedback-document"}},[e._v("Documento")]),e._v(" "),r("b-form-input",{attrs:{id:"feedback-document",state:e.validationDocumentNumber,type:"text",disabled:e.disabledElements,required:""},model:{value:e.document_number,callback:function(t){e.document_number=t},expression:"document_number"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{state:e.validationDocumentNumber}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-name"}},[e._v("Nombre")]),e._v(" "),r("b-form-input",{attrs:{id:"feedback-name",state:e.validationName,type:"text",disabled:e.disabledElements,required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{state:e.validationName}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-phone"}},[e._v("Teléfono")]),e._v(" "),r("b-form-input",{attrs:{id:"feedback-phone",state:e.validationPhone,type:"text",disabled:e.disabledElements,required:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),r("b-form-invalid-feedback",{attrs:{state:e.validationPhone}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-yars"}},[e._v("Patio")]),e._v(" "),e.yards&&e.yards.data?r("v-select",{attrs:{filterable:!1,id:"feedback-yard",disabled:e.disabledElements,required:"",options:e.yards.data,label:"name",reduce:function(data){return data.id}},on:{search:e.searchYards,close:e.searchYards},model:{value:e.yard,callback:function(t){e.yard=t},expression:"yard"}}):e._e(),e._v(" "),r("b-form-invalid-feedback",[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),e.roles&&e.roles.data&&e.roles.data.length>0?r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-role"}},[e._v("Rol")]),e._v(" "),r("b-card",e._l(e.roles.data,(function(t){return r("b-form-checkbox",{key:t.id,attrs:{name:"user-role",value:t.name,disabled:e.disabledElements},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}},[e._v(e._s(t.name)+"\n        ")])})),1),e._v(" "),r("b-form-invalid-feedback",[e._v("\n          "+e._s(e.labelTextFieldRequired)+"\n      ")])],1):e._e(),e._v(" "),r("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!e.validationDocumentNumber||!e.validationName},on:{click:e.handleForm}},[e._v("\n      "+e._s(e.textBtnSubmit)+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);
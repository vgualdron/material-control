(window.webpackJsonp=window.webpackJsonp||[]).push([[34,14,15],{498:function(t,e,r){"use strict";r.d(e,"b",(function(){return n})),r.d(e,"a",(function(){return o}));r(103),r(110);var n=function(t,e){return e.includes(t)},o=function(t,e){return-1!==e.indexOf(t)}},511:function(t,e,r){"use strict";r.r(e);r(15),r(14),r(16),r(13),r(17);var n=r(3),o=(r(37),r(12),r(10),r(28),r(184),r(31)),l=r(49),c=r(4),d=r(0),m=r(498);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={name:"table-list",components:{BIconPencilFill:d.er,BIconTrashFill:d.Pv},data:function(){return{view:"material",fields:[{key:"code",label:"Código",sortable:!0,class:"text-center"},{key:"name",label:"Nombre",sortable:!0,class:"text-center"},{key:"actions",label:"Acciones",class:"text-center"}],totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,{value:100,text:"Mostrar muchos"}],sortBy:"",filter:null,showInsert:!1,showList:!1}},computed:h(h(h({},Object(o.d)(c.typesCommon.PATH,["userPermisionsGroup"])),Object(o.d)(l.typesMaterial.PATH,["materials","material"])),{},{items:function(){var t=this;return this.materials.data.map((function(e){return h(h({},e),{},{showDetail:Object(m.b)("".concat(t.view,".get"),t.userPermisionsGroup),showEdit:Object(m.b)("".concat(t.view,".update"),t.userPermisionsGroup),showDelete:Object(m.b)("".concat(t.view,".delete"),t.userPermisionsGroup)})}))},sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}}),watch:{materials:function(t){this.totalRows=t.total,this.showInsert=Object(m.b)("".concat(this.view,".insert"),this.userPermisionsGroup),this.showList=Object(m.b)("".concat(this.view,".list"),this.userPermisionsGroup)}},created:function(){this.search()},methods:h(h({},Object(o.b)(l.typesMaterial.PATH,{getMaterials:l.typesMaterial.actions.GET_MATERIALS,setMaterial:l.typesMaterial.actions.SET_MATERIAL,setShowModalForm:l.typesMaterial.actions.SET_SHOW_MODAL_FORM,setTypeAction:l.typesMaterial.actions.SET_TYPE_ACTION})),{},{showModal:function(t,e){"create"!==e&&this.setMaterial(h({},t)),this.setTypeAction(e),this.setShowModalForm(!0)},search:function(){var data={perPage:this.perPage,page:this.currentPage,text:this.filter};this.getMaterials(data)}})},y=r(73),component=Object(y.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-card",{attrs:{title:"Gestionar materiales","sub-title":"Opciones de listar, crear, modificar y eliminar materiales"}},[r("b-row",[r("b-col",{staticClass:"my-1",attrs:{lg:"12"}},[r("b-input-group",{staticClass:"mb-3 mt-5",attrs:{size:"sm"}},[r("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Buscar ..."},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search.apply(null,arguments)}},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),r("b-input-group-append",[r("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Limpiar")]),t._v(" "),t.showInsert?r("b-button",{staticClass:"ml-3",on:{click:function(e){return t.showModal(null,"create")}}},[t._v("Nuevo")]):t._e()],1)],1)],1)],1),t._v(" "),t.showList?[r("b-table",{attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":0,stacked:"md","show-empty":"",small:""},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[e.item.showDetail?r("b-button",{attrs:{size:"sm",title:"Ver detalle"},on:{click:e.toggleDetails}},[t._v("\n          "+t._s(e.detailsShowing?"Ocultar":"Ver")+" detalle\n        ")]):t._e(),t._v(" "),e.item.showEdit?r("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Editar"},on:{click:function(r){return t.showModal(e.item,"edit")}}},[r("b-icon-pencil-fill")],1):t._e(),t._v(" "),e.item.showDelete?r("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Eliminar"},on:{click:function(r){return t.showModal(e.item,"delete")}}},[r("b-icon-trash-fill")],1):t._e()]}},{key:"row-details",fn:function(e){return[r("b-card",[r("ul",t._l(e.item,(function(e,n){return r("div",{key:n},["_showDetails"!==n?r("li",[t._v("\n                "+t._s(n)+": "+t._s(e)+"\n              ")]):t._e()])})),0)])]}}],null,!1,2285885428)}),t._v(" "),r("b-row",[r("b-col",{staticClass:"my-1",staticStyle:{float:"right"},attrs:{sm:"9",md:"9"}},[r("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm",pills:""},on:{input:t.search},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),t._v(" "),r("b-col",{staticClass:"my-1",staticStyle:{display:"inline-block"},attrs:{sm:"3",md:"3"}},[r("b-form-group",{staticClass:"mb-0",attrs:{label:"Por página","label-for":"per-page-select","label-cols-sm":"8","label-cols-md":"8","label-cols-lg":"8","label-align-sm":"right","label-size":"sm"}},[r("b-form-select",{attrs:{id:"per-page-select",options:t.pageOptions,size:"sm"},on:{change:t.search},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1)]:t._e()],2)}),[],!1,null,null,null);e.default=component.exports},512:function(t,e,r){"use strict";r.r(e);r(15),r(14),r(12),r(10),r(16),r(13),r(17);var n=r(8),o=r(3),l=(r(34),r(48),r(31)),c=r(49);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={name:"modal-form",data:function(){return{id:"material-modal",title:"Crear material",textBtnSubmit:"Registrar",code:"",name:"",unit:"U",labelTextFieldRequired:"Campo obligatorio",disabledElements:!1,units:[{value:"U",text:"Unidad"},{value:"T",text:"Tonelada"}]}},watch:{typeAction:function(t){"create"===t&&(this.title="Crear Material",this.id="create-material-modal",this.textBtnSubmit="Registrar",this.disabledElements=!1),"edit"===t&&(this.title="Modificar Material",this.id="edit-material-modal",this.textBtnSubmit="Guardar cambios",this.disabledElements=!1),"delete"===t&&(this.title="Eliminar Material",this.id="delete-material-modal",this.textBtnSubmit="Eliminar",this.disabledElements=!0)},material:function(t){"create"===this.typeAction&&(this.code="",this.name="",this.unit=""),"edit"!==this.typeAction&&"delete"!==this.typeAction||(this.code=t.code,this.name=t.name,this.unit=t.unit)}},components:{BIconX:r(0).Uw},computed:m(m({},Object(l.d)(c.typesMaterial.PATH,["showModalForm","material","typeAction"])),{},{validationCode:function(){return this.code.length>0},validationName:function(){return this.name.length>0}}),mounted:function(){},methods:m(m({},Object(l.b)(c.typesMaterial.PATH,{setShowModalForm:c.typesMaterial.actions.SET_SHOW_MODAL_FORM,save:c.typesMaterial.actions.SAVE,delete:c.typesMaterial.actions.DELETE,edit:c.typesMaterial.actions.EDIT})),{},{resetInfoModal:function(){this.name="",this.code="",this.setShowModalForm(!1)},handleForm:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.preventDefault(),"create"!==e.typeAction){r.next=4;break}return r.next=4,e.save({code:e.code,name:e.name,unit:e.unit});case 4:if("edit"!==e.typeAction){r.next=7;break}return r.next=7,e.edit({id:e.material.id,code:e.code,name:e.name,unit:e.unit});case 7:if("delete"!==e.typeAction){r.next=10;break}return r.next=10,e.delete(e.material.id);case 10:case"end":return r.stop()}}),r)})))()},upperFormatter:function(t){return t.toUpperCase()}})},h=r(73),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-modal",{attrs:{id:t.id,"no-close-on-backdrop":"","no-close-on-esc":""},on:{hide:t.resetInfoModal},scopedSlots:t._u([{key:"modal-header",fn:function(){return[r("h5",[t._v(t._s(t.title))]),t._v(" "),r("b-icon-x",{staticClass:"icon-close",attrs:{"font-scale":"2"},on:{click:function(e){return t.resetInfoModal()}}})]},proxy:!0},{key:"modal-footer",fn:function(){return[r("div",{staticClass:"w-100"},[r("b-button",{staticClass:"float-right",attrs:{variant:"secondary",size:"sm"},on:{click:function(e){return t.resetInfoModal()}}},[t._v("\n        Cancelar\n      ")])],1)]},proxy:!0}]),model:{value:t.showModalForm,callback:function(e){t.showModalForm=e},expression:"showModalForm"}},[t._v(" "),r("b-form",{on:{submit:t.handleForm}},[r("b-form-group",[r("label",{attrs:{for:"feedback-code"}},[t._v("Código")]),t._v(" "),r("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"A##",expression:"'A##'"}],attrs:{id:"feedback-code",state:t.validationCode,type:"text",disabled:t.disabledElements,required:""},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t._v(" "),r("b-form-invalid-feedback",{attrs:{state:t.validationCode}},[t._v("\n        "+t._s(t.labelTextFieldRequired)+"\n      ")])],1),t._v(" "),r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-name"}},[t._v("Nombre")]),t._v(" "),r("b-form-input",{attrs:{id:"feedback-name",state:t.validationName,type:"text",formatter:t.upperFormatter,disabled:t.disabledElements},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),r("b-form-invalid-feedback",{attrs:{state:t.validationName}},[t._v("\n        "+t._s(t.labelTextFieldRequired)+"\n      ")])],1),t._v(" "),r("b-form-group",[r("label",{staticClass:"mt-3",attrs:{for:"feedback-unit"}},[t._v("Unidad")]),t._v(" "),r("b-form-select",{attrs:{id:"feedback-unit",options:t.units,type:"text",disabled:t.disabledElements,required:""},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}})],1),t._v(" "),r("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!t.validationCode||!t.validationName},on:{click:t.handleForm}},[t._v("\n      "+t._s(t.textBtnSubmit)+"\n    ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},548:function(t,e,r){"use strict";r.r(e);var n=r(511),o=r(512),l={name:"Material",layout:"menu",components:{TableList:n.default,ModalForm:o.default},data:function(){return{}},computed:{},mounted:function(){},methods:{}},c=r(73),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",{attrs:{fluid:""}},[r("table-list"),t._v(" "),r("modal-form")],1)}),[],!1,null,null,null);e.default=component.exports}}]);
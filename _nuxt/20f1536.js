(window.webpackJsonp=window.webpackJsonp||[]).push([[41,23,24],{498:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}));n(103),n(110);var r=function(e,t){return t.includes(e)},o=function(e,t){return-1!==t.indexOf(e)}},520:function(e,t,n){"use strict";n.r(t);n(15),n(14),n(16),n(13),n(17);var r=n(8),o=n(3),l=(n(34),n(37),n(12),n(10),n(28),n(184),n(31)),c=n(38),d=n(57),m=n(4),f=n(0),h=n(498);function v(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function y(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var O={name:"table-list",components:{BIconPencilFill:f.er,BIconTrashFill:f.Pv},data:function(){return{view:"yard",fields:[{key:"code",label:"Código",sortable:!0,class:"text-center"},{key:"name",label:"Nombre",sortable:!0,class:"text-center"},{key:"zoneName",label:"Zona",sortable:!0,class:"text-center"},{key:"actions",label:"Acciones",class:"text-center"}],totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,{value:100,text:"Mostrar muchos"}],sortBy:"",filter:null,showInsert:!1,showList:!1}},computed:y(y(y({},Object(l.d)(m.typesCommon.PATH,["userPermisionsGroup"])),Object(l.d)(c.typesYard.PATH,["yards","yard"])),{},{items:function(){var e=this;return this.yards.data.map((function(t){return y(y({},t),{},{showDetail:Object(h.b)("".concat(e.view,".get"),e.userPermisionsGroup),showEdit:Object(h.b)("".concat(e.view,".update"),e.userPermisionsGroup),showDelete:Object(h.b)("".concat(e.view,".delete"),e.userPermisionsGroup)})}))},sortOptions:function(){return this.fields.filter((function(e){return e.sortable})).map((function(e){return{text:e.label,value:e.key}}))}}),watch:{yards:function(e){this.totalRows=e.total,this.showInsert=Object(h.b)("".concat(this.view,".insert"),this.userPermisionsGroup),this.showList=Object(h.b)("".concat(this.view,".list"),this.userPermisionsGroup)}},created:function(){this.search()},methods:y(y(y({},Object(l.b)(c.typesYard.PATH,{getYards:c.typesYard.actions.GET_YARDS,setYard:c.typesYard.actions.SET_YARD,setShowModalForm:c.typesYard.actions.SET_SHOW_MODAL_FORM,setTypeAction:c.typesYard.actions.SET_TYPE_ACTION})),Object(l.b)(d.typesZone.PATH,{getZones:d.typesZone.actions.GET_ZONES})),{},{showModal:function(e,t){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.setTypeAction(t),n.setShowModalForm(!0),data={perPage:10,page:1,text:"",zone:null==e?void 0:e.zone},r.next=5,n.getZones(data);case 5:if("create"===t){r.next=8;break}return r.next=8,n.setYard(y({},e));case 8:case"end":return r.stop()}}),r)})))()},search:function(){var data={perPage:this.perPage,page:this.currentPage,text:this.filter};this.getYards(data)}})},_=n(73),component=Object(_.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-card",{attrs:{title:"Gestionar patios","sub-title":"Opciones de listar, crear, modificar y eliminar patios"}},[n("b-row",[n("b-col",{staticClass:"my-1",attrs:{lg:"12"}},[n("b-input-group",{staticClass:"mb-3 mt-5",attrs:{size:"sm"}},[n("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Buscar ..."},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search.apply(null,arguments)}},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),e._v(" "),n("b-input-group-append",[n("b-button",{attrs:{disabled:!e.filter},on:{click:function(t){e.filter=""}}},[e._v("Limpiar")]),e._v(" "),e.showInsert?n("b-button",{staticClass:"ml-3",on:{click:function(t){return e.showModal(null,"create")}}},[e._v("Nuevo")]):e._e()],1)],1)],1)],1),e._v(" "),e.showList?[n("b-table",{attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:e.items,fields:e.fields,"current-page":e.currentPage,"per-page":0,stacked:"md","show-empty":"",small:""},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[t.item.showEdit?n("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Editar"},on:{click:function(n){return e.showModal(t.item,"edit")}}},[n("b-icon-pencil-fill")],1):e._e(),e._v(" "),t.item.showDelete?n("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Eliminar"},on:{click:function(n){return e.showModal(t.item,"delete")}}},[n("b-icon-trash-fill")],1):e._e()]}}],null,!1,2929339942)},[e._v(" "),n("b-row",[n("b-col",{staticClass:"my-1",staticStyle:{float:"right"},attrs:{sm:"9",md:"9"}},[n("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.totalRows,"per-page":e.perPage,align:"fill",size:"sm",pills:""},on:{input:e.search},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),n("b-col",{staticClass:"my-1",staticStyle:{display:"inline-block"},attrs:{sm:"3",md:"3"}},[n("b-form-group",{staticClass:"mb-0",attrs:{label:"Por página","label-for":"per-page-select","label-cols-sm":"8","label-cols-md":"8","label-cols-lg":"8","label-align-sm":"right","label-size":"sm"}},[n("b-form-select",{attrs:{id:"per-page-select",options:e.pageOptions,size:"sm"},on:{change:e.search},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)],1)],1)]:e._e()],2)}),[],!1,null,null,null);t.default=component.exports},521:function(e,t,n){"use strict";n.r(t);n(15),n(14),n(12),n(16),n(13),n(17);var r=n(8),o=n(3),l=(n(34),n(48),n(28),n(137),n(10),n(74),n(31)),c=n(38),d=n(57);function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h={name:"modal-form",data:function(){return{id:"yard-modal",title:"Crear Patio",textBtnSubmit:"Registrar",code:"",name:"",zone:"",latitude:null,longitude:null,searchInput:"",labelTextFieldRequired:"Campo obligatorio",disabledElements:!1}},watch:{typeAction:function(e){"create"===e&&(this.title="Crear Patio",this.id="create-yard-modal",this.textBtnSubmit="Registrar",this.disabledElements=!1),"edit"===e&&(this.title="Modificar Patio",this.id="edit-yard-modal",this.textBtnSubmit="Guardar cambios",this.disabledElements=!1),"delete"===e&&(this.title="Eliminar Patio",this.id="delete-yard-modal",this.textBtnSubmit="Eliminar",this.disabledElements=!0)},yard:function(e){"create"===this.typeAction&&(this.code="",this.name="",this.zone="",this.longitude="",this.latitude=""),"edit"!==this.typeAction&&"delete"!==this.typeAction||(this.code=e.code,this.name=e.name,this.zone=parseInt(e.zone),this.longitude=e.longitude,this.latitude=e.latitude)}},components:{BIconX:n(0).Uw},computed:f(f(f({},Object(l.d)(c.typesYard.PATH,["showModalForm","yard","typeAction"])),Object(l.d)(d.typesZone.PATH,["zones"])),{},{validationCode:function(){return this.code.length>0},validationName:function(){return this.name.length>0},validationZone:function(){return null!==this.zone&&""!==this.zone}}),mounted:function(){},methods:f(f(f({},Object(l.b)(c.typesYard.PATH,{setShowModalForm:c.typesYard.actions.SET_SHOW_MODAL_FORM,save:c.typesYard.actions.SAVE,delete:c.typesYard.actions.DELETE,edit:c.typesYard.actions.EDIT})),Object(l.b)(d.typesZone.PATH,{getZones:d.typesZone.actions.GET_ZONES})),{},{resetInfoModal:function(){this.name="",this.code="",this.zone="",this.longitude=null,this.latitude=null,this.setShowModalForm(!1)},handleForm:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e.preventDefault(),"create"!==t.typeAction){n.next=4;break}return n.next=4,t.save({code:t.code,name:t.name,zone:t.zone,longitude:null===t.longitude||""===t.longitude?null:t.longitude,latitude:null===t.latitude||""===t.latitude?null:t.latitude});case 4:if("edit"!==t.typeAction){n.next=8;break}return console.log(t.latitude),n.next=8,t.edit({id:t.yard.id,code:t.code,name:t.name,zone:t.zone,longitude:null===t.longitude||""===t.longitude?null:t.longitude,latitude:null===t.latitude||""===t.latitude?null:t.latitude});case 8:if("delete"!==t.typeAction){n.next=11;break}return n.next=11,t.delete(t.yard.id);case 11:case"end":return n.stop()}}),n)})))()},searchZones:function(e){var data={perPage:10,page:1,text:e,zone:this.zone,loaderState:!1};this.getZones(data)},formatLongitude:function(e){var t=null!==(e=null!==e&&""!==e?parseFloat(e):null)?parseFloat(e):null;return null!==e&&(t=e>180?180:e<-180?-180:parseFloat(e.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0])),t},formatLatitude:function(e){var t=null!==(e=null!==e&&""!==e?parseFloat(e):null)?parseFloat(e):null;return null!==e&&(t=e>90?90:e<-90?-90:parseFloat(e.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0])),t},upperFormatter:function(e){return e.toUpperCase()}})},v=n(73),component=Object(v.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-modal",{attrs:{id:e.id,"no-close-on-backdrop":"","no-close-on-esc":""},on:{hide:e.resetInfoModal},scopedSlots:e._u([{key:"modal-header",fn:function(){return[n("h5",[e._v(e._s(e.title))]),e._v(" "),n("b-icon-x",{staticClass:"icon-close",attrs:{"font-scale":"2"},on:{click:function(t){return e.resetInfoModal()}}})]},proxy:!0},{key:"modal-footer",fn:function(){return[n("div",{staticClass:"w-100"},[n("b-button",{staticClass:"float-right",attrs:{variant:"secondary",size:"sm"},on:{click:function(t){return e.resetInfoModal()}}},[e._v("\n        Cancelar\n      ")])],1)]},proxy:!0}]),model:{value:e.showModalForm,callback:function(t){e.showModalForm=t},expression:"showModalForm"}},[e._v(" "),n("b-form",{on:{submit:e.handleForm}},[n("b-form-group",{staticClass:"mb-1"},[n("label",{attrs:{for:"feedback-code"}},[e._v("Código")]),e._v(" "),n("b-form-input",{directives:[{name:"mask",rawName:"v-mask",value:"AA##",expression:"'AA##'"}],attrs:{id:"feedback-code",type:"text",disabled:e.disabledElements,required:""},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),e._v(" "),n("b-form-invalid-feedback",{attrs:{state:e.validationCode}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),n("b-form-group",{staticClass:"mb-1"},[n("label",{attrs:{for:"feedback-name"}},[e._v("Nombre")]),e._v(" "),n("b-form-input",{attrs:{id:"feedback-name",type:"text",disabled:e.disabledElements,formatter:e.upperFormatter,required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("b-form-invalid-feedback",{attrs:{state:e.validationName}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),n("b-form-group",{staticClass:"mb-1"},[n("label",{attrs:{for:"feedback-zone"}},[e._v("Zona")]),e._v(" "),e.zones&&e.zones.data?n("v-select",{attrs:{filterable:!1,id:"feedback-zone",disabled:e.disabledElements,required:"",options:e.zones.data,label:"name",reduce:function(data){return data.id}},on:{search:e.searchZones,close:e.searchZones},model:{value:e.zone,callback:function(t){e.zone=t},expression:"zone"}}):e._e(),e._v(" "),n("b-form-invalid-feedback",{attrs:{state:e.validationZone}},[e._v("\n        "+e._s(e.labelTextFieldRequired)+"\n      ")])],1),e._v(" "),n("b-form-group",{staticClass:"mb-1"},[n("label",{attrs:{for:"feedback-longitude"}},[e._v("Longitud")]),e._v(" "),n("b-form-input",{attrs:{id:"feedback-longitude",step:"0.000001",type:"number",disabled:e.disabledElements,formatter:e.formatLongitude},model:{value:e.longitude,callback:function(t){e.longitude=t},expression:"longitude"}})],1),e._v(" "),n("b-form-group",{staticClass:"mb-1"},[n("label",{attrs:{for:"feedback-latitude"}},[e._v("Latitud")]),e._v(" "),n("b-form-input",{attrs:{id:"feedback-latitude",step:"0.000001",type:"number",disabled:e.disabledElements,formatter:e.formatLatitude},model:{value:e.latitude,callback:function(t){e.latitude=t},expression:"latitude"}})],1),e._v(" "),n("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!e.validationCode||!e.validationName||!e.validationZone},on:{click:e.handleForm}},[e._v("\n      "+e._s(e.textBtnSubmit)+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports},555:function(e,t,n){"use strict";n.r(t);var r=n(520),o=n(521),l={name:"Yard",layout:"menu",components:{TableList:r.default,ModalForm:o.default},data:function(){return{}},computed:{},mounted:function(){},methods:{}},c=n(73),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",{attrs:{fluid:""}},[n("table-list"),e._v(" "),n("modal-form")],1)}),[],!1,null,null,null);t.default=component.exports}}]);
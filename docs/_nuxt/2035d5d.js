(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{355:function(e,t,o){"use strict";o.r(t);o(12),o(11),o(13),o(10),o(14);var r=o(3),n=(o(27),o(9),o(48)),l=o(40),c=o(17),m=o(0),f=(o(79),o(86),function(e,t){return t.includes(e)});function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var w={name:"table-list",data:function(){return{view:"zone",fields:[{key:"code",label:"Código",sortable:!0,class:"text-center"},{key:"name",label:"Nombre",sortable:!0,class:"text-center"},{key:"actions",label:"Acciones",class:"text-center"}],totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,{value:100,text:"Mostrar muchos"}],sortBy:"",filter:null,showInsert:!1,showList:!1}},watch:{zones:function(e){this.totalRows=e.length,this.showInsert=f("".concat(this.view,".insert"),this.userPermisionsGroup),this.showList=f("".concat(this.view,".list"),this.userPermisionsGroup)}},components:{BIconPencilFill:m.er,BIconTrashFill:m.Pv},computed:h(h(h({},Object(n.d)(c.typesCommon.PATH,["userPermisionsGroup"])),Object(n.d)(l.typesZone.PATH,["zones","zone"])),{},{items:function(){var e=this;return this.zones.map((function(t){return h(h({},t),{},{showDetail:f("".concat(e.view,".get"),e.userPermisionsGroup),showEdit:f("".concat(e.view,".update"),e.userPermisionsGroup),showDelete:f("".concat(e.view,".delete"),e.userPermisionsGroup)})}))},sortOptions:function(){return this.fields.filter((function(e){return e.sortable})).map((function(e){return{text:e.label,value:e.key}}))}}),mounted:function(){this.getZones()},methods:h(h({},Object(n.b)(l.typesZone.PATH,{getZones:l.typesZone.actions.GET_ZONES,setZone:l.typesZone.actions.SET_ZONE,setShowModalForm:l.typesZone.actions.SET_SHOW_MODAL_FORM,setTypeAction:l.typesZone.actions.SET_TYPE_ACTION})),{},{onFiltered:function(e){this.totalRows=e.length,this.currentPage=1},showModal:function(e,t){this.setZone(h({},e)),this.setTypeAction(t),this.setShowModalForm(!0)}})},y=o(60),component=Object(y.a)(w,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-card",{attrs:{title:"Gestionar zonas","sub-title":"Opciones de listar, crear, modificar y eliminar zonas"}},[o("b-row",[o("b-col",{staticClass:"my-1",attrs:{lg:"12"}},[o("b-input-group",{staticClass:"mb-3 mt-5",attrs:{size:"sm"}},[o("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Buscar ..."},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),e._v(" "),o("b-input-group-append",[o("b-button",{attrs:{disabled:!e.filter},on:{click:function(t){e.filter=""}}},[e._v("Limpiar")]),e._v(" "),e.showInsert?o("b-button",{staticClass:"ml-3",on:{click:function(t){return e.showModal(null,"create")}}},[e._v("Nuevo")]):e._e()],1)],1)],1)],1),e._v(" "),e.showList?[o("b-table",{attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:e.items,fields:e.fields,"current-page":e.currentPage,"per-page":e.perPage,filter:e.filter,stacked:"md","show-empty":"",small:""},on:{filtered:e.onFiltered},scopedSlots:e._u([{key:"cell(actions)",fn:function(t){return[t.item.showDetail?o("b-button",{attrs:{size:"sm",title:"Ver detalle"},on:{click:t.toggleDetails}},[e._v("\n          "+e._s(t.detailsShowing?"Ocultar":"Ver")+" detalle\n        ")]):e._e(),e._v(" "),t.item.showEdit?o("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Editar"},on:{click:function(o){return e.showModal(t.item,"edit")}}},[o("b-icon-pencil-fill")],1):e._e(),e._v(" "),t.item.showDelete?o("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Eliminar"},on:{click:function(o){return e.showModal(t.item,"delete")}}},[o("b-icon-trash-fill")],1):e._e()]}},{key:"row-details",fn:function(t){return[o("b-card",[o("ul",e._l(t.item,(function(t,r){return o("div",{key:r},["_showDetails"!==r?o("li",[e._v("\n                "+e._s(r)+": "+e._s(t)+"\n              ")]):e._e()])})),0)])]}}],null,!1,2285885428)}),e._v(" "),o("b-row",[o("b-col",{staticClass:"my-1",staticStyle:{float:"right"},attrs:{sm:"9",md:"9"}},[o("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.totalRows,"per-page":e.perPage,align:"fill",size:"sm",pills:""},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),o("b-col",{staticClass:"my-1",staticStyle:{display:"inline-block"},attrs:{sm:"3",md:"3"}},[o("b-form-group",{staticClass:"mb-0",attrs:{label:"Por página","label-for":"per-page-select","label-cols-sm":"8","label-cols-md":"8","label-cols-lg":"8","label-align-sm":"right","label-size":"sm"}},[o("b-form-select",{attrs:{id:"per-page-select",options:e.pageOptions,size:"sm"},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)],1)]:e._e()],2)}),[],!1,null,null,null);t.default=component.exports}}]);
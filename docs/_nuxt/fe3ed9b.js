(window.webpackJsonp=window.webpackJsonp||[]).push([[29,10,11],{464:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return o}));n(100),n(105);var r=function(t,e){return e.includes(t)},o=function(t,e){return-1!==e.indexOf(t)}},473:function(t,e,n){"use strict";n.r(e);n(14),n(13),n(15),n(12),n(16);var r=n(3),o=(n(34),n(11),n(31),n(144),n(30)),l=n(62),c=n(4),d=n(0),m=n(464);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"table-list",components:{BIconPencilFill:d.er},data:function(){return{view:"adminMaterialSettlement",fields:[{key:"date",label:"Fecha",sortable:!0,class:"text-center"},{key:"consecutive",label:"Consecutivo",sortable:!0,class:"text-center"},{key:"third",label:"Tercero",sortable:!0,class:"text-center"},{key:"subtotalSettlement",label:"Subtotal",sortable:!0,class:"text-center"},{key:"retentions",label:"Retención",sortable:!0,class:"text-center"},{key:"royalties",label:"Regalias",sortable:!0,class:"text-center"},{key:"totalSettle",label:"Total",sortable:!0,class:"text-center"},{key:"actions",label:"Acciones",class:"text-center"}],totalRows:1,currentPage:1,perPage:10,pageOptions:[10,25,50,{value:100,text:"Mostrar muchos"}],sortBy:"",filter:null,showInsert:!1,showList:!1}},computed:v(v(v({},Object(o.d)(c.typesCommon.PATH,["userPermisionsGroup"])),Object(o.d)(l.typesAdminMaterialSettlement.PATH,["adminMaterialSettlements","adminMaterialSettlement"])),{},{items:function(){var t=this;return this.adminMaterialSettlements.data.map((function(e){return v(v({},e),{},{showEdit:Object(m.b)("".concat(t.view,".update"),t.userPermisionsGroup)})}))},sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}}),watch:{adminMaterialSettlements:function(t){this.totalRows=t.total,this.showList=Object(m.b)("".concat(this.view,".list"),this.userPermisionsGroup)}},created:function(){this.search()},methods:v(v({},Object(o.b)(l.typesAdminMaterialSettlement.PATH,{getAdminMaterialSettlement:l.typesAdminMaterialSettlement.actions.GET_ADMIN_MATERIAL_SETTLEMENTS,setAdminMaterialSettlement:l.typesAdminMaterialSettlement.actions.SET_ADMIN_MATERIAL_SETTLEMENT,setShowModalForm:l.typesAdminMaterialSettlement.actions.SET_SHOW_MODAL_FORM,setTypeAction:l.typesAdminMaterialSettlement.actions.SET_TYPE_ACTION})),{},{showModal:function(t,e){"create"!==e&&this.setAdminMaterialSettlement(v({},t)),this.setTypeAction(e),this.setShowModalForm(!0)},search:function(){var data={perPage:this.perPage,page:this.currentPage,text:this.filter};this.getAdminMaterialSettlement(data)}})},y=n(69),component=Object(y.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card",{attrs:{title:"Administrar Liquidaciones de Material","sub-title":"Opciones de listar, editar liquidaciones de material"}},[n("b-row",[n("b-col",{staticClass:"my-1",attrs:{lg:"12"}},[n("b-input-group",{staticClass:"mb-3 mt-5",attrs:{size:"sm"}},[n("b-form-input",{attrs:{id:"filter-input",type:"search",placeholder:"Buscar ..."},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),n("b-input-group-append",[n("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Limpiar")])],1)],1)],1)],1),t._v(" "),t.showList?[n("b-table",{attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":0,stacked:"md","show-empty":"",small:""},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[e.item.showEdit?n("b-button",{staticClass:"mr-1",attrs:{size:"sm",title:"Editar"},on:{click:function(n){return t.showModal(e.item,"edit")}}},[n("b-icon-pencil-fill")],1):t._e()]}}],null,!1,1264012281)}),t._v(" "),n("b-row",[n("b-col",{staticClass:"my-1",staticStyle:{float:"right"},attrs:{sm:"9",md:"9"}},[n("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm",pills:""},on:{input:t.search},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),t._v(" "),n("b-col",{staticClass:"my-1",staticStyle:{display:"inline-block"},attrs:{sm:"3",md:"3"}},[n("b-form-group",{staticClass:"mb-0",attrs:{label:"Por página","label-for":"per-page-select","label-cols-sm":"8","label-cols-md":"8","label-cols-lg":"8","label-align-sm":"right","label-size":"sm"}},[n("b-form-select",{attrs:{id:"per-page-select",options:t.pageOptions,size:"sm"},on:{change:t.search},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1)]:t._e()],2)}),[],!1,null,null,null);e.default=component.exports},474:function(t,e,n){"use strict";n.r(e);n(14),n(13),n(11),n(15),n(12),n(16);var r=n(8),o=n(3),l=(n(32),n(34),n(30)),c=n(62);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={name:"modal-form",data:function(){return{fields:[{key:"type",label:"Tipo",sortable:!0,class:"text-center"},{key:"date",label:"Fecha",sortable:!0,class:"text-center"},{key:"referral_number",label:"Número Referencia",sortable:!0,class:"text-center"},{key:"receipt_number",label:"Número Recibo",sortable:!0,class:"text-center"},{key:"origin_supplier",label:"Patio Origen / Proveedor",sortable:!0,class:"text-center"},{key:"destiny_customer",label:"Patio Destino / Cliente",sortable:!0,class:"text-center"},{key:"unit_value",label:"Valor Unitario",sortable:!0,class:"text-center"},{key:"material_settle_receipt_weight",label:"Liquidado Con Peso Destino",class:"text-center"}],id:"admin-material-settlement-modal",title:"Modificar Liquidación de Material",textBtnSubmit:"Guardar",consecutive:"",date:"",third:"",subtotalAmount:"",subtotalSettlement:"",totalSettle:"",retentionsPercentage:"",retentions:"",baseRoyalties:"",royalties:"",observation:"",invoice:"",invoiceDate:"",internalDocument:"",labelTextFieldRequired:"Campo obligatorio",disabledElements:!1}},watch:{typeAction:function(t){"edit"===t&&(this.title="Modificar Liquidación de Material",this.id="edit-admin-material-settlement-modal",this.textBtnSubmit="Guardar cambios",this.disabledElements=!1)},adminMaterialSettlement:function(t){"edit"===this.typeAction&&(this.consecutive=t.consecutive,this.date=t.date,this.third=t.third,this.subtotalAmount=t.subtotalAmount,this.subtotalSettlement=t.subtotalSettlement,this.totalSettle=t.totalSettle,this.baseRoyalties=t.unitRoyalties,this.royalties=t.royalties,this.retentionsPercentage=t.retentionsPercentage,this.retentions=t.retentions,this.invoice=t.invoice,this.invoiceDate=t.invoiceDate,this.internalDocument=t.internalDocument,this.observation=t.observation)}},components:{BIconX:n(0).Uw},computed:m(m({},Object(l.d)(c.typesAdminMaterialSettlement.PATH,["showModalForm","adminMaterialSettlement","typeAction"])),{},{items:function(){var t;return this.adminMaterialSettlement&&null!==(t=this.adminMaterialSettlement)&&void 0!==t&&t.tiquets?this.adminMaterialSettlement.tiquets.map((function(t){return m({},t)})):[]},validationCode:function(){return!1}}),mounted:function(){},methods:m(m({},Object(l.b)(c.typesAdminMaterialSettlement.PATH,{setShowModalForm:c.typesAdminMaterialSettlement.actions.SET_SHOW_MODAL_FORM,edit:c.typesAdminMaterialSettlement.actions.EDIT,print:c.typesAdminMaterialSettlement.actions.PRINT})),{},{resetInfoModal:function(){this.consecutive="",this.date="",this.third="",this.subtotalAmount="",this.subtotalSettlement="",this.totalSettle="",this.retentionsPercentaje="",this.retentions="",this.observation="",this.invoice="",this.invoiceDate=null,this.internalDocument=null,this.setShowModalForm(!1)},handleForm:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),"edit"!==e.typeAction){n.next=4;break}return n.next=4,e.edit({id:e.adminMaterialSettlement.id,invoice:e.invoice,invoiceDate:e.invoiceDate,internalDocument:e.internalDocument});case 4:case"end":return n.stop()}}),n)})))()},upperFormatter:function(t){return t.toUpperCase()},printReport:function(){null!==this.adminMaterialSettlement&&this.print(this.adminMaterialSettlement)}})},v=n(69),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-modal",{attrs:{id:t.id,"no-close-on-backdrop":"","no-close-on-esc":"",size:"xl"},on:{hide:t.resetInfoModal},scopedSlots:t._u([{key:"modal-header",fn:function(){return[n("h5",[t._v(t._s(t.title))]),t._v(" "),n("b-icon-x",{staticClass:"icon-close",attrs:{"font-scale":"2"},on:{click:function(e){return t.resetInfoModal()}}})]},proxy:!0},{key:"modal-footer",fn:function(){return[n("div",{staticClass:"w-100"},[n("b-button",{staticClass:"float-right",attrs:{variant:"secondary",size:"sm"},on:{click:function(e){return t.resetInfoModal()}}},[t._v("\n        Cancelar\n      ")])],1)]},proxy:!0}]),model:{value:t.showModalForm,callback:function(e){t.showModalForm=e},expression:"showModalForm"}},[t._v(" "),n("b-form",{on:{submit:t.handleForm}},[n("b-form-group",{staticClass:"mb-1"},[n("b-form-row",[n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-consecutive"}},[t._v("Consecutivo")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-consecutive",type:"text",disabled:!0,required:""},model:{value:t.consecutive,callback:function(e){t.consecutive=e},expression:"consecutive"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-date"}},[t._v("Fecha")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-date",type:"text",disabled:!0,required:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-third"}},[t._v("Tercero")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-third",type:"text",disabled:!0,required:""},model:{value:t.third,callback:function(e){t.third=e},expression:"third"}})],1)],1),t._v(" "),n("b-form-row",[n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-amount"}},[t._v("Cantidad")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-amount",type:"text",disabled:!0,required:""},model:{value:t.subtotalAmount,callback:function(e){t.subtotalAmount=e},expression:"subtotalAmount"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-retention-percentage"}},[t._v("Porcentaje Retencion")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-retention-precentage",type:"text",disabled:!0,required:""},model:{value:t.retentionsPercentage,callback:function(e){t.retentionsPercentage=e},expression:"retentionsPercentage"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-retention"}},[t._v("Retención")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-retention",type:"text",disabled:!0,required:""},model:{value:t.retentions,callback:function(e){t.retentions=e},expression:"retentions"}})],1)],1),t._v(" "),n("b-form-row",[n("b-col",[n("label",{attrs:{for:"feedback-base-royalties"}},[t._v("Base Regalías")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-base-royalties",type:"text",disabled:!0,required:""},model:{value:t.baseRoyalties,callback:function(e){t.baseRoyalties=e},expression:"baseRoyalties"}})],1),t._v(" "),n("b-col",[n("label",{attrs:{for:"feedback-royalties"}},[t._v("Regalías")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-royalties",type:"text",disabled:!0,required:""},model:{value:t.royalties,callback:function(e){t.royalties=e},expression:"royalties"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-subtotal"}},[t._v("Subtotal")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-subtotal",type:"text",disabled:!0,required:""},model:{value:t.subtotalSettlement,callback:function(e){t.subtotalSettlement=e},expression:"subtotalSettlement"}})],1)],1),t._v(" "),n("b-form-row",[n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-total"}},[t._v("Total")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-total",type:"text",disabled:!0,required:""},model:{value:t.totalSettle,callback:function(e){t.totalSettle=e},expression:"totalSettle"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-invoice"}},[t._v("Factura")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-invoice",type:"text",required:""},model:{value:t.invoice,callback:function(e){t.invoice=e},expression:"invoice"}})],1),t._v(" "),n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-invoice-date"}},[t._v("Fecha Factura")]),t._v(" "),n("b-form-datepicker",{attrs:{id:"feedback-invoice-date",type:"text",required:""},model:{value:t.invoiceDate,callback:function(e){t.invoiceDate=e},expression:"invoiceDate"}})],1)],1),t._v(" "),n("b-form-row",[n("b-col",{attrs:{md:"4"}},[n("label",{attrs:{for:"feedback-internal-document"}},[t._v("Documento Interno")]),t._v(" "),n("b-form-input",{attrs:{id:"feedback-internal-document",type:"text",required:""},model:{value:t.internalDocument,callback:function(e){t.internalDocument=e},expression:"internalDocument"}})],1)],1),t._v(" "),n("b-form-group",[n("label",{attrs:{for:"feedbackobservation"}},[t._v("Observaciones")]),t._v(" "),n("b-form-textarea",{attrs:{id:"feedbackobservation",maxlength:"200","no-resize":"",rows:"3",disabled:!0},model:{value:t.observation,callback:function(e){t.observation=e},expression:"observation"}})],1)],1),t._v(" "),n("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!1},on:{click:t.handleForm}},[t._v("\n      "+t._s(t.textBtnSubmit)+"\n    ")]),t._v(" "),n("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!1},on:{click:t.printReport}},[t._v("\n      Imprimir\n    ")])],1),t._v(" "),t._v(" "),[n("b-table",{staticClass:"mt-4",attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:t.items,fields:t.fields,stacked:"md","show-empty":"",small:""},scopedSlots:t._u([{key:"cell(material_settle_receipt_weight)",fn:function(t){return[n("b-form-checkbox",{attrs:{checked:"1"===t.item.material_settle_receipt_weight,disabled:!0}})]}}])})]],2)}),[],!1,null,null,null);e.default=component.exports},509:function(t,e,n){"use strict";n.r(e);var r=n(473),o=n(474),l={name:"adminMaterialSettlement",layout:"menu",components:{TableList:r.default,ModalForm:o.default},data:function(){return{}},computed:{},mounted:function(){},methods:{}},c=n(69),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{attrs:{fluid:""}},[n("table-list"),t._v(" "),n("modal-form")],1)}),[],!1,null,null,null);e.default=component.exports}}]);
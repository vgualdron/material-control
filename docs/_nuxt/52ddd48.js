(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{474:function(e,t,o){"use strict";o.r(t);o(14),o(13),o(11),o(15),o(12),o(16);var n=o(8),r=o(3),l=(o(32),o(34),o(30)),c=o(62);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={name:"modal-form",data:function(){return{fields:[{key:"type",label:"Tipo",sortable:!0,class:"text-center"},{key:"date",label:"Fecha",sortable:!0,class:"text-center"},{key:"referral_number",label:"Número Referencia",sortable:!0,class:"text-center"},{key:"receipt_number",label:"Número Recibo",sortable:!0,class:"text-center"},{key:"origin_supplier",label:"Patio Origen / Proveedor",sortable:!0,class:"text-center"},{key:"destiny_customer",label:"Patio Destino / Cliente",sortable:!0,class:"text-center"},{key:"unit_value",label:"Valor Unitario",sortable:!0,class:"text-center"},{key:"material_settle_receipt_weight",label:"Liquidado Con Peso Destino",class:"text-center"}],id:"admin-material-settlement-modal",title:"Modificar Liquidación de Material",textBtnSubmit:"Guardar",consecutive:"",date:"",third:"",subtotalAmount:"",subtotalSettlement:"",totalSettle:"",retentionsPercentage:"",retentions:"",baseRoyalties:"",royalties:"",observation:"",invoice:"",invoiceDate:"",internalDocument:"",labelTextFieldRequired:"Campo obligatorio",disabledElements:!1}},watch:{typeAction:function(e){"edit"===e&&(this.title="Modificar Liquidación de Material",this.id="edit-admin-material-settlement-modal",this.textBtnSubmit="Guardar cambios",this.disabledElements=!1)},adminMaterialSettlement:function(e){"edit"===this.typeAction&&(this.consecutive=e.consecutive,this.date=e.date,this.third=e.third,this.subtotalAmount=e.subtotalAmount,this.subtotalSettlement=e.subtotalSettlement,this.totalSettle=e.totalSettle,this.baseRoyalties=e.unitRoyalties,this.royalties=e.royalties,this.retentionsPercentage=e.retentionsPercentage,this.retentions=e.retentions,this.invoice=e.invoice,this.invoiceDate=e.invoiceDate,this.internalDocument=e.internalDocument,this.observation=e.observation)}},components:{BIconX:o(0).Uw},computed:m(m({},Object(l.d)(c.typesAdminMaterialSettlement.PATH,["showModalForm","adminMaterialSettlement","typeAction"])),{},{items:function(){var e;return this.adminMaterialSettlement&&null!==(e=this.adminMaterialSettlement)&&void 0!==e&&e.tiquets?this.adminMaterialSettlement.tiquets.map((function(e){return m({},e)})):[]},validationCode:function(){return!1}}),mounted:function(){},methods:m(m({},Object(l.b)(c.typesAdminMaterialSettlement.PATH,{setShowModalForm:c.typesAdminMaterialSettlement.actions.SET_SHOW_MODAL_FORM,edit:c.typesAdminMaterialSettlement.actions.EDIT,print:c.typesAdminMaterialSettlement.actions.PRINT})),{},{resetInfoModal:function(){this.consecutive="",this.date="",this.third="",this.subtotalAmount="",this.subtotalSettlement="",this.totalSettle="",this.retentionsPercentaje="",this.retentions="",this.observation="",this.invoice="",this.invoiceDate=null,this.internalDocument=null,this.setShowModalForm(!1)},handleForm:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(e.preventDefault(),"edit"!==t.typeAction){o.next=4;break}return o.next=4,t.edit({id:t.adminMaterialSettlement.id,invoice:t.invoice,invoiceDate:t.invoiceDate,internalDocument:t.internalDocument});case 4:case"end":return o.stop()}}),o)})))()},upperFormatter:function(e){return e.toUpperCase()},printReport:function(){null!==this.adminMaterialSettlement&&this.print(this.adminMaterialSettlement)}})},v=o(69),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-modal",{attrs:{id:e.id,"no-close-on-backdrop":"","no-close-on-esc":"",size:"xl"},on:{hide:e.resetInfoModal},scopedSlots:e._u([{key:"modal-header",fn:function(){return[o("h5",[e._v(e._s(e.title))]),e._v(" "),o("b-icon-x",{staticClass:"icon-close",attrs:{"font-scale":"2"},on:{click:function(t){return e.resetInfoModal()}}})]},proxy:!0},{key:"modal-footer",fn:function(){return[o("div",{staticClass:"w-100"},[o("b-button",{staticClass:"float-right",attrs:{variant:"secondary",size:"sm"},on:{click:function(t){return e.resetInfoModal()}}},[e._v("\n        Cancelar\n      ")])],1)]},proxy:!0}]),model:{value:e.showModalForm,callback:function(t){e.showModalForm=t},expression:"showModalForm"}},[e._v(" "),o("b-form",{on:{submit:e.handleForm}},[o("b-form-group",{staticClass:"mb-1"},[o("b-form-row",[o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-consecutive"}},[e._v("Consecutivo")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-consecutive",type:"text",disabled:!0,required:""},model:{value:e.consecutive,callback:function(t){e.consecutive=t},expression:"consecutive"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-date"}},[e._v("Fecha")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-date",type:"text",disabled:!0,required:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-third"}},[e._v("Tercero")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-third",type:"text",disabled:!0,required:""},model:{value:e.third,callback:function(t){e.third=t},expression:"third"}})],1)],1),e._v(" "),o("b-form-row",[o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-amount"}},[e._v("Cantidad")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-amount",type:"text",disabled:!0,required:""},model:{value:e.subtotalAmount,callback:function(t){e.subtotalAmount=t},expression:"subtotalAmount"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-retention-percentage"}},[e._v("Porcentaje Retencion")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-retention-precentage",type:"text",disabled:!0,required:""},model:{value:e.retentionsPercentage,callback:function(t){e.retentionsPercentage=t},expression:"retentionsPercentage"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-retention"}},[e._v("Retención")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-retention",type:"text",disabled:!0,required:""},model:{value:e.retentions,callback:function(t){e.retentions=t},expression:"retentions"}})],1)],1),e._v(" "),o("b-form-row",[o("b-col",[o("label",{attrs:{for:"feedback-base-royalties"}},[e._v("Base Regalías")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-base-royalties",type:"text",disabled:!0,required:""},model:{value:e.baseRoyalties,callback:function(t){e.baseRoyalties=t},expression:"baseRoyalties"}})],1),e._v(" "),o("b-col",[o("label",{attrs:{for:"feedback-royalties"}},[e._v("Regalías")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-royalties",type:"text",disabled:!0,required:""},model:{value:e.royalties,callback:function(t){e.royalties=t},expression:"royalties"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-subtotal"}},[e._v("Subtotal")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-subtotal",type:"text",disabled:!0,required:""},model:{value:e.subtotalSettlement,callback:function(t){e.subtotalSettlement=t},expression:"subtotalSettlement"}})],1)],1),e._v(" "),o("b-form-row",[o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-total"}},[e._v("Total")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-total",type:"text",disabled:!0,required:""},model:{value:e.totalSettle,callback:function(t){e.totalSettle=t},expression:"totalSettle"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-invoice"}},[e._v("Factura")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-invoice",type:"text",required:""},model:{value:e.invoice,callback:function(t){e.invoice=t},expression:"invoice"}})],1),e._v(" "),o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-invoice-date"}},[e._v("Fecha Factura")]),e._v(" "),o("b-form-datepicker",{attrs:{id:"feedback-invoice-date",type:"text",required:""},model:{value:e.invoiceDate,callback:function(t){e.invoiceDate=t},expression:"invoiceDate"}})],1)],1),e._v(" "),o("b-form-row",[o("b-col",{attrs:{md:"4"}},[o("label",{attrs:{for:"feedback-internal-document"}},[e._v("Documento Interno")]),e._v(" "),o("b-form-input",{attrs:{id:"feedback-internal-document",type:"text",required:""},model:{value:e.internalDocument,callback:function(t){e.internalDocument=t},expression:"internalDocument"}})],1)],1),e._v(" "),o("b-form-group",[o("label",{attrs:{for:"feedbackobservation"}},[e._v("Observaciones")]),e._v(" "),o("b-form-textarea",{attrs:{id:"feedbackobservation",maxlength:"200","no-resize":"",rows:"3",disabled:!0},model:{value:e.observation,callback:function(t){e.observation=t},expression:"observation"}})],1)],1),e._v(" "),o("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!1},on:{click:e.handleForm}},[e._v("\n      "+e._s(e.textBtnSubmit)+"\n    ")]),e._v(" "),o("b-button",{staticClass:"mt-3 form-control",attrs:{id:"button-submit",type:"submit",href:"#",variant:"primary",disabled:!1},on:{click:e.printReport}},[e._v("\n      Imprimir\n    ")])],1),e._v(" "),e._v(" "),[o("b-table",{staticClass:"mt-4",attrs:{striped:!0,bordered:!0,hover:!0,fixed:!0,items:e.items,fields:e.fields,stacked:"md","show-empty":"",small:""},scopedSlots:e._u([{key:"cell(material_settle_receipt_weight)",fn:function(e){return[o("b-form-checkbox",{attrs:{checked:"1"===e.item.material_settle_receipt_weight,disabled:!0}})]}}])})]],2)}),[],!1,null,null,null);t.default=component.exports}}]);
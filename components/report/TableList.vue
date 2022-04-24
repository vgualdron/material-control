<template>
  <b-card
    title="Reportes"
    sub-title="Opción Para Generación de Informes">
    <!-- User Interface controls -->
    <label for="feedback-report-type">Seleccione el informe a generar</label>
    <b-form-select id = "feedback-report-type" v-model="report" @change="cleanFilter">
      <option
         v-for="(report, index) in reports"
         :key="index"
         :value="report.value"
      >
        {{ $t(report.value) }}
      </option>
    </b-form-select>
    <b-form-group class="mt-2 mb-1" id="movementsReport" v-if="report==='movementsReport'">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-start-date-mr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-mr"
              v-model="start_date_mr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_mr"
            />
            <b-form-invalid-feedback :state="stateStartDateMR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-final-date-mr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-mr"
              v-model="final_date_mr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_mr"
            />
            <b-form-invalid-feedback :state="stateFinalDateMR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-type">Movimiento</label>
            <b-form-select
              id="feedback-type"
              v-model="movement_mr"
              :options="movements"
            />
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="4">
            <label for="feedback-material">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material"
              size="lg"
              required
              v-model="material_mr"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              @search="searchMaterials"
              @close="searchMaterials"
              @open="searchMaterials"
            />
          </b-col>
          <b-col md="4" v-if="movement_mr==='C'">
            <label for="feedback-supplier_mr">Proveedor</label>
            <v-select
              v-if="localeSupplierThirds && localeSupplierThirds.data"
              id="feedback-supplier_mr"
              required
              v-model="supplier_mr"
              :options="localeSupplierThirds.data"
              label="name"
              :reduce="data => data.id"
            />
          </b-col>
          <b-col md="4" v-if="movement_mr==='V'">
            <label for="feedback-customer_mr">Cliente</label>
            <v-select
              v-if="localeCustomerThirds && localeCustomerThirds.data"
              id="feedback-customer_mr"
              required
              v-model="customer_mr"
              :options="localeCustomerThirds.data"
              label="name"
              :reduce="data => data.id"
            />
          </b-col>
          <b-col md="4" v-if="movement_mr==='V' || movement_mr==='T'">
            <label for="feedback-origin-yard-mr">Patio Despacho</label>
            <v-select
              v-if="originYards && originYards.data"
              :filterable="false"
              id="feedback-origin-yard-mr"
              v-model="origin_yard_mr"
              :options="originYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchOriginYards"
              @close="searchOriginYards"
              @open="searchOriginYards"
            />
          </b-col>
          <b-col md="4" v-if="movement_mr==='C' || movement_mr==='T'">
            <label for="feedback-destiny-yard-mr">Patio Recepción</label>
            <v-select
              v-if="destinyYards && destinyYards.data"
              :filterable="false"
              id="feedback-destiny-yard-mr"
              v-model="destiny_yard_mr"
              :options="destinyYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchDestinyYards"
              @close="searchDestinyYards"
              @open="searchDestinyYards"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="yardStockReport" v-else-if="report==='yardStockReport'">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-date-ysr">Fecha de Corte</label>
            <b-form-datepicker
              id="feedback-date-ysr"
              v-model="date_ysr"
              placeholder="Seleccione la Fecha de Corte"
            />
            <b-form-invalid-feedback :state="stateDateYSR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="completeTransfersReport" v-else-if="report==='completeTransfersReport'">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date-ctr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-ctr"
              v-model="start_date_ctr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_ctr"
            />
            <b-form-invalid-feedback :state="stateStartDateCTR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date-mr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-mr"
              v-model="final_date_ctr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_ctr"
            />
            <b-form-invalid-feedback :state="stateFinalDateCTR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="6">
            <label for="feedback-origin-yard-ctr">Patio Despacho</label>
            <v-select
              v-if="originYards && originYards.data"
              :filterable="false"
              id="feedback-origin-yard-ctr"
              v-model="origin_yard_ctr"
              :options="originYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchOriginYards"
              @close="searchOriginYards"
              @open="searchOriginYards"
            />
          </b-col>
          <b-col md="6">
            <label for="feedback-destiny-yard-ctr">Patio Recepción</label>
            <v-select
              v-if="destinyYards && destinyYards.data"
              :filterable="false"
              id="feedback-destiny-yard-ctr"
              v-model="destiny_yard_ctr"
              :options="destinyYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchDestinyYards"
              @close="searchDestinyYards"
              @open="searchDestinyYards"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="uncompleteTransfersReport" v-else-if="report==='uncompleteTransfersReport'">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date-utr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-utr"
              v-model="start_date_utr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_utr"
            />
            <b-form-invalid-feedback :state="stateStartDateUTR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date-utr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-utr"
              v-model="final_date_utr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_utr"
            />
            <b-form-invalid-feedback :state="stateFinalDateUTR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="6">
            <label for="feedback-origin-yard-utr">Patio Despacho</label>
            <v-select
              v-if="originYards && originYards.data"
              :filterable="false"
              id="feedback-origin-yard-utr"
              v-model="origin_yard_utr"
              :options="originYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchOriginYards"
              @close="searchOriginYards"
              @open="searchOriginYards"
            />
          </b-col>
          <b-col md="6">
            <label for="feedback-destiny-yard-utr">Patio Recepción</label>
            <v-select
              v-if="destinyYards && destinyYards.data"
              :filterable="false"
              id="feedback-destiny-yard-utr"
              v-model="destiny_yard_utr"
              :options="destinyYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchDestinyYards"
              @close="searchDestinyYards"
              @open="searchDestinyYards"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="unbilledPurchasesReport" v-else-if="report==='unbilledPurchasesReport'">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date-upr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-upr"
              v-model="start_date_upr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_upr"
            />
            <b-form-invalid-feedback :state="stateStartDateUPR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date-upr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-upr"
              v-model="final_date_upr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_upr"
            />
            <b-form-invalid-feedback :state="stateFinalDateUPR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="6">
            <label for="feedback-supplier-upr">Proveedor</label>
            <v-select
              v-if="localeSupplierThirds && localeSupplierThirds.data"
              id="feedback-supplier-upr"
              required
              v-model="supplier_upr"
              :options="localeSupplierThirds.data"
              label="name"
              :reduce="data => data.id"
            />
          </b-col>
          <b-col md="6">
            <label for="feedback-material-upr">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material-upr"
              size="lg"
              required
              v-model="material_upr"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              @search="searchMaterials"
              @close="searchMaterials"
              @open="searchMaterials"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="unbilledSalesReport" v-else-if="report==='unbilledSalesReport'">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date-usr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-usr"
              v-model="start_date_usr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_usr"
            />
            <b-form-invalid-feedback :state="stateStartDateUSR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date-usr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-usr"
              v-model="final_date_usr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_usr"
            />
            <b-form-invalid-feedback :state="stateFinalDateUSR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="6">
            <label for="feedback-customer-usr">Cliente</label>
            <v-select
              v-if="localeCustomerThirds && localeCustomerThirds.data"
              id="feedback-customer-usr"
              required
              v-model="customer_usr"
              :options="localeCustomerThirds.data"
              label="name"
              :reduce="data => data.id"
            />
          </b-col>
          <b-col md="6">
            <label for="feedback-material-usr">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material-usr"
              size="lg"
              required
              v-model="material_usr"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              @search="searchMaterials"
              @close="searchMaterials"
              @open="searchMaterials"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mt-2 mb-1" id="unbilledFreightReport" v-else-if="report==='unbilledFreightReport'">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-start-date-ufr">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date-ufr"
              v-model="start_date_ufr"
              placeholder="Seleccione la Fecha Inicial"
              :max="final_date_ufr"
            />
            <b-form-invalid-feedback :state="stateStartDateUFR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date-ufr">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date-ufr"
              v-model="final_date_ufr"
              placeholder="Seleccione la Fecha Final"
              :min="start_date_ufr"
            />
            <b-form-invalid-feedback :state="stateFinalDateUFR">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="6">
            <label for="feedback-conveyor-company-ufr">Empresa Transportadora</label>
            <v-select
              v-if="localeConveyorThirds && localeConveyorThirds.data"
              id="feedback-conveyor-company-ufr"
              required
              v-model="conveyor_company_ufr"
              :options="localeConveyorThirds.data"
              label="name"
              :reduce="data => data.id"
            />
          </b-col>
          <b-col md="6">
            <label for="feedback-material-ufr">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material-ufr"
              size="lg"
              required
              v-model="material_ufr"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              @search="searchMaterials"
              @close="searchMaterials"
              @open="searchMaterials"
            />
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-button class="mt-2 mb-2" :disabled="disableSearchButton" @click="search">Buscar</b-button>
      <download-excel :data="items" :fields="exportHeaders" v-if="items.length > 0" name="report.xls" class="d-inline">
        <b-button class="mr-1" title="Exportar">
          Exportar
          <b-icon-file-excel></b-icon-file-excel>
        </b-button>
      </download-excel>
    <!-- Main table element -->
    <template>
      <b-table
        responsive
        :striped="true"
        :bordered="true"
        :hover="true"
        :items="items"
        :fields="fields"
        stacked="md"
        show-empty
        small
      >
      </b-table>
    </template>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import JsonExcel from 'vue-json-excel';
import { BIconFileExcel } from 'bootstrap-vue';
import { typesReport as types } from '@/store/report/types';
import { typesThird } from '@/store/third/types';
import { typesCommon } from '@/store/common/typesCommon';
import { typesMaterial } from '@/store/material/types';
import { typesYard } from '@/store/yard/types';

export default {
  name: 'table-list',
  components: {
    'download-excel': JsonExcel,
    BIconFileExcel
  },
  data () {
    return {
      view: 'freightSettlement',
      movements: [
        { value: null, text: 'TODOS' },
        { value: 'T', text: 'TRASLADO' },
        { value: 'C', text: 'COMPRA' },
        { value: 'V', text: 'VENTA' }
      ],
      report: '',
      // movements report
      start_date_mr: null,
      final_date_mr: null,
      material_mr: null,
      movement_mr: null,
      supplier_mr: null,
      customer_mr: null,
      origin_yard_mr: null,
      destiny_yard_mr: null,
      // yard stock report
      date_ysr: null,
      // complete transfers report
      start_date_ctr: null,
      final_date_ctr: null,
      origin_yard_ctr: null,
      destiny_yard_ctr: null,
      // uncomplete transfers report
      start_date_utr: null,
      final_date_utr: null,
      origin_yard_utr: null,
      destiny_yard_utr: null,
      // uncomplete purchase report
      start_date_upr: null,
      final_date_upr: null,
      supplier_upr: null,
      material_upr: null,
      // uncomplete sales report
      start_date_usr: null,
      final_date_usr: null,
      customer_usr: null,
      material_usr: null,
      // uncomplete sales report
      start_date_ufr: null,
      final_date_ufr: null,
      conveyor_company_ufr: null,
      material_ufr: null,

      labelTextFieldRequired: 'Campo obligatorio',
      items: []
    };
  },
  watch: {
    dataReports (val) {
      this.items = val.map((items) => { return { ...items }; });
    }
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'userPermisionsGroup'
    ]),
    ...mapState(types.PATH, [
      'dataReports'
    ]),
    ...mapState(typesThird.PATH, [
      'localeSupplierThirds',
      'localeConveyorThirds',
      'localeCustomerThirds'
    ]),
    ...mapState(typesYard.PATH, [
      'originYards',
      'destinyYards'
    ]),
    ...mapState(typesMaterial.PATH, [
      'materials'
    ]),
    fields () {
      if (this.report === 'movementsReport') {
        return [
          { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Número Remisión', sortable: true, class: 'text-center' },
          { key: 'license_plate', label: 'Placa', sortable: true, class: 'text-center' },
          { key: 'trailer_number', label: 'Trailer', sortable: true, class: 'text-center' },
          { key: 'driver_name', label: 'Conductor', sortable: true, class: 'text-center' },
          { key: 'origin_yard_supplier', label: 'Patio Despacho / Proveedor', sortable: true, class: 'text-center' },
          { key: 'destiny_yard_costumer', label: 'Patio Recepción / Cliente', sortable: true, class: 'text-center' },
          { key: 'conveyor_company', label: 'Empresa Transportadora', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'origin_net_weight', label: 'Peso Neto Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_net_weight', label: 'Peso Neto Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_date', label: 'Fecha Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_date', label: 'Fecha Recepción', sortable: true, class: 'text-center' },
          { key: 'freight_settlement_unit_value', label: 'Valor Unitario Flete', sortable: true, class: 'text-center' },
          { key: 'freight_settlement_net_value', label: 'Valor Flete', sortable: true, class: 'text-center' },
          { key: 'material_settlement_unit_value', label: 'Valor Unitario Material', sortable: true, class: 'text-center' },
          { key: 'material_settlement_net_value', label: 'Valor Material', sortable: true, class: 'text-center' },
          { key: 'unit_royalties', label: 'Valor Unitario Regalías', sortable: true, class: 'text-center' },
          { key: 'royalties', label: 'Valor Regalías', sortable: true, class: 'text-center' },
          { key: 'freight_settlement_consecutive', label: 'Liquidación Flete', sortable: true, class: 'text-center' },
          { key: 'material_settlement_consecutive', label: 'Liquidación Material', sortable: true, class: 'text-center' },
          { key: 'tns_upload_date', label: 'Fecha Subida TNS', sortable: true, class: 'text-center' },
          { key: 'tns_id', label: 'ID TNS', sortable: true, class: 'text-center' },
          { key: 'freight_invoice_date', label: 'Fecha Factura Flete', sortable: true, class: 'text-center' },
          { key: 'freight_invoice', label: 'Factura Flete', sortable: true, class: 'text-center' },
          { key: 'freight_internal_document', label: 'Documento Interno Flete', sortable: true, class: 'text-center' },
          { key: 'material_invoice_date', label: 'Fecha Factura Material', sortable: true, class: 'text-center' },
          { key: 'material_invoice', label: 'Factura Material', sortable: true, class: 'text-center' },
          { key: 'material_internal_document', label: 'Documento Interno Material', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'yardStockReport') {
        return [
          { key: 'yard', label: 'Patio', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'unit', label: 'Unidad de Medida', sortable: true, class: 'text-center' },
          { key: 'amount', label: 'Cantidad', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'completeTransfersReport') {
        return [
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Número Remisión', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'origin_date', label: 'Fecha Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_date', label: 'Fecha Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_license_plate', label: 'Placa Vehículo Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_license_plate', label: 'Placa Vehículo Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_trailer_number', label: 'Número Trailer Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_trailer_number', label: 'Número Trailer Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_driver_name', label: 'Nombre Conductor Despacho', sortable: true, class: 'text-center' },
          { key: 'origin_driver_document', label: 'Nombre Conductor Recepción', sortable: true, class: 'text-center' },
          { key: 'destiny_driver_name', label: 'Documento Conductor Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_driver_document', label: 'Documento Conductor Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_origin_yard', label: 'Patio Despacho (Despacho)', sortable: true, class: 'text-center' },
          { key: 'origin_destiny_yard', label: 'Patio Recepción (Despacho)', sortable: true, class: 'text-center' },
          { key: 'destiny_origin_yard', label: 'Patio Despacho (Recepción)', sortable: true, class: 'text-center' },
          { key: 'destiny_destiny_yard', label: 'Patio Recepción (Recepción)', sortable: true, class: 'text-center' },
          { key: 'origin_conveyor_company_name', label: 'Empresa Transportadora Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_conveyor_company_name', label: 'Empresa Transportadora Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_material', label: 'Material Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_material', label: 'Material Recepción', sortable: true, class: 'text-center' },
          { key: 'origin_net_weight', label: 'Peso Neto Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_net_weight', label: 'Peso Neto Recepción', sortable: true, class: 'text-center' },
          { key: 'weight_differences', label: 'Diferencia Peso', sortable: true, class: 'text-center' },
          { key: 'percent_weight_differences', label: 'Porcentaje Diferencia Peso', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'uncompleteTransfersReport') {
        return [
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Número Remisión', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'origin_date', label: 'Fecha Despacho', sortable: true, class: 'text-center' },
          { key: 'license_plate', label: 'Placa Vehículo', sortable: true, class: 'text-center' },
          { key: 'trailer_number', label: 'Número Trailer', sortable: true, class: 'text-center' },
          { key: 'driver_name', label: 'Nombre Conductor', sortable: true, class: 'text-center' },
          { key: 'driver_document', label: 'Documento Conductor', sortable: true, class: 'text-center' },
          { key: 'origin_yard', label: 'Patio Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_yard', label: 'Patio Recepción', sortable: true, class: 'text-center' },
          { key: 'conveyor_company', label: 'Empresa Transportadora', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'net_weight', label: 'Peso Neto', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'unbilledPurchasesReport') {
        return [
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Numero Remisión', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
          { key: 'license_plate', label: 'Placa Vehículo', sortable: true, class: 'text-center' },
          { key: 'trailer_number', label: 'Número Trailer', sortable: true, class: 'text-center' },
          { key: 'driver_name', label: 'Nombre Conductor', sortable: true, class: 'text-center' },
          { key: 'driver_document', label: 'Documento Conductor', sortable: true, class: 'text-center' },
          { key: 'supplier_name', label: 'Proveedor', sortable: true, class: 'text-center' },
          { key: 'destiny_yard', label: 'Patio Destino', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'net_weight', label: 'Peso Neto', sortable: true, class: 'text-center' },
          { key: 'material_settlement_unit_value', label: 'Valor Unitario Material', sortable: true, class: 'text-center' },
          { key: 'material_settlement_net_value', label: 'Valor Material', sortable: true, class: 'text-center' },
          { key: 'unit_royalties', label: 'Valor Unitario Regalias', sortable: true, class: 'text-center' },
          { key: 'royalties', label: 'Valor Regalias', sortable: true, class: 'text-center' },
          { key: 'settlement_consecutive', label: 'Consecutivo Liquidación', sortable: true, class: 'text-center' },
          { key: 'tns_upload_date', label: 'Fecha Subida TNS', sortable: true, class: 'text-center' },
          { key: 'tns_id', label: 'ID TNS', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'unbilledSalesReport') {
        return [
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Numero Remisión', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
          { key: 'license_plate', label: 'Placa Vehículo', sortable: true, class: 'text-center' },
          { key: 'trailer_number', label: 'Número Trailer', sortable: true, class: 'text-center' },
          { key: 'driver_name', label: 'Nombre Conductor', sortable: true, class: 'text-center' },
          { key: 'driver_document', label: 'Documento Conductor', sortable: true, class: 'text-center' },
          { key: 'customer_name', label: 'Cliente', sortable: true, class: 'text-center' },
          { key: 'destiny_yard', label: 'Patio Destino', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'net_weight', label: 'Peso Neto', sortable: true, class: 'text-center' },
          { key: 'material_settlement_unit_value', label: 'Valor Unitario Material', sortable: true, class: 'text-center' },
          { key: 'material_settlement_net_value', label: 'Valor Material', sortable: true, class: 'text-center' },
          { key: 'unit_royalties', label: 'Valor Unitario Regalias', sortable: true, class: 'text-center' },
          { key: 'royalties', label: 'Valor Regalias', sortable: true, class: 'text-center' },
          { key: 'settlement_consecutive', label: 'Consecutivo Liquidación', sortable: true, class: 'text-center' },
          { key: 'tns_upload_date', label: 'Fecha Subida TNS', sortable: true, class: 'text-center' },
          { key: 'tns_id', label: 'ID TNS', sortable: true, class: 'text-center' }
        ];
      } else if (this.report === 'unbilledFreightReport') {
        return [
          { key: 'movement', label: 'Tipo Movimiento', sortable: true, class: 'text-center' },
          { key: 'referral_number', label: 'Numero Remisión', sortable: true, class: 'text-center' },
          { key: 'receipt_number', label: 'Número Recibo', sortable: true, class: 'text-center' },
          { key: 'origin_date', label: 'Fecha Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_date', label: 'Fecha Recepción', sortable: true, class: 'text-center' },
          { key: 'license_plate', label: 'Placa Vehículo', sortable: true, class: 'text-center' },
          { key: 'trailer_number', label: 'Número Trailer', sortable: true, class: 'text-center' },
          { key: 'driver_name', label: 'Nombre Conductor', sortable: true, class: 'text-center' },
          { key: 'driver_document', label: 'Documento Conductor', sortable: true, class: 'text-center' },
          { key: 'origin_yard_supplier', label: 'Patio Despacho / Proveedor', sortable: true, class: 'text-center' },
          { key: 'destiny_yard_customer', label: 'Patio Recepción / Cliente', sortable: true, class: 'text-center' },
          { key: 'material', label: 'Material', sortable: true, class: 'text-center' },
          { key: 'conveyor_company', label: 'Empresa Transportadora', sortable: true, class: 'text-center' },
          { key: 'origin_net_weight', label: 'Peso Neto Despacho', sortable: true, class: 'text-center' },
          { key: 'destiny_net_weight', label: 'Peso Neto Recepción', sortable: true, class: 'text-center' },
          { key: 'freight_settlement_unit_value', label: 'Valor Unitario Flete', sortable: true, class: 'text-center' },
          { key: 'freight_settlement_net_value', label: 'Valor Flete', sortable: true, class: 'text-center' },
          { key: 'settlement_consecutive', label: 'Consecutivo Liquidación', sortable: true, class: 'text-center' },
          { key: 'tns_upload_date', label: 'Fecha Subida TNS', sortable: true, class: 'text-center' },
          { key: 'tns_id', label: 'ID TNS', sortable: true, class: 'text-center' }
        ];
      } else {
        return [];
      }
    },
    exportHeaders () {
      if (this.report === 'movementsReport') {
        return {
          Fecha: 'date',
          'Tipo Movimiento': 'movement',
          'Número Recibo': 'receipt_number',
          'Número Remisión': 'referral_number',
          Placa: 'license_plate',
          Trailer: 'trailer_number',
          Conductor: 'driver_name',
          'Patio Origen / Proveedor': 'origin_yard_supplier',
          'Patio Destino / Cliente': 'destiny_yard_costumer',
          'Empresa Transportadora': 'conveyor_company',
          Material: 'material',
          'Peso Neto Origen': 'origin_net_weight',
          'Peso Neto Destino': 'destiny_net_weight',
          'Fecha Despacho': 'origin_date',
          'Fecha Recepción': 'destiny_date',
          'Valor Unitario Flete': 'freight_settlement_unit_value',
          'Valor Flete': 'freight_settlement_net_value',
          'Valor Unitario Material': 'material_settlement_unit_value',
          'Valor Material': 'material_settlement_net_value',
          'Valor Unitario Regalías': 'unit_royalties',
          'Valor Regalías': 'royalties',
          'Liquidación Flete': 'freight_settlement_consecutive',
          'Liquidación Material': 'material_settlement_consecutive',
          'Fecha Subida TNS': 'tns_upload_date',
          'ID TNS': 'tns_id',
          'Fecha Factura Flete': 'freight_invoice_date',
          'Factura Flete': 'freight_invoice',
          'Documento Interno Flete': 'freight_internal_document',
          'Fecha Factura Material': 'material_invoice_date',
          'Factura Material': 'material_invoice',
          'Documento Interno Material': 'material_internal_document'
        };
      } else if (this.report === 'yardStockReport') {
        return {
          Patio: 'yard',
          Material: 'material',
          'Unidad de Medida': 'unit',
          Cantidad: 'amount'
        };
      } else if (this.report === 'completeTransfersReport') {
        return {
          'Tipo Movimiento': 'movement',
          'Número Remisión': 'referral_number',
          'Número Recibo': 'receipt_number',
          'Fecha Despacho': 'origin_date',
          'Fecha Recepción': 'destiny_date',
          'Placa Vehículo Despacho': 'origin_license_plate',
          'Placa Vehículo Recepción': 'destiny_license_plate',
          'Número Trailer Despacho': 'origin_trailer_number',
          'Número Trailer Recepción': 'destiny_trailer_number',
          'Nombre Conductor Despacho': 'origin_driver_name',
          'Nombre Conductor Recepción': 'destiny_driver_name',
          'Documento Conductor Despacho': 'origin_driver_document',
          'Documento Conductor Recepción': 'destiny_driver_document',
          'Patio Despacho (Despacho)': 'origin_origin_yard',
          'Patio Destino (Despacho)': 'origin_destiny_yard',
          'Patio Despacho (Recepción)': 'destiny_origin_yard',
          'Patio Destino (Recepción)': 'destiny_destiny_yard',
          'Empresa Transportadora Despacho': 'origin_conveyor_company_name',
          'Empresa Transportadora Recepción': 'destiny_conveyor_company_name',
          'Material Despacho': 'origin_material',
          'Material Recepción': 'destiny_material',
          'Peso Neto Despacho': 'origin_net_weight',
          'Peso Neto Recepción': 'destiny_net_weight',
          'Diferencia Peso': 'weight_differences',
          'Porcentaje Diferencia Peso': 'percent_weight_differences'
        };
      } else if (this.report === 'uncompleteTransfersReport') {
        return {
          'Tipo Movimiento': 'movement',
          'Número Remisión': 'referral_number',
          'Número Recibo': 'receipt_number',
          'Fecha Despacho': 'date',
          'Placa Vehículo': 'license_plate',
          'Número Trailer': 'trailer_number',
          'Nombre Conductor': 'driver_name',
          'Documento Conductor': 'driver_document',
          'Patio Despacho': 'origin_yard',
          'Patio Recepción': 'destiny_yard',
          'Empresa Transportadora': 'conveyor_company',
          Material: 'material',
          'Peso Neto': 'net_weight'
        };
      } else if (this.report === 'unbilledPurchasesReport') {
        return {
          'Tipo Movimiento': 'movement',
          'Numero Remisión': 'referral_number',
          'Número Recibo': 'receipt_number',
          Fecha: 'date',
          'Placa Vehículo': 'license_plate',
          'Número Trailer': 'trailer_number',
          'Nombre Conductor': 'driver_name',
          'Documento Conductor': 'driver_document',
          Proveedor: 'supplier_name',
          'Patio Destino': 'destiny_yard',
          Material: 'material',
          'Peso Neto': 'net_weight',
          'Valor Unitario Material': 'material_settlement_unit_value',
          'Valor Material': 'material_settlement_net_value',
          'Valor Unitario Regalias': 'unit_royalties',
          'Valor Regalias': 'royalties',
          'Consecutivo Liquidación': 'settlement_consecutive',
          'Fecha Subida TNS': 'tns_upload_date',
          'ID TNS': 'tns_id'
        };
      } else if (this.report === 'unbilledSalesReport') {
        return {
          'Tipo Movimiento': 'movement',
          'Numero Remisión': 'referral_number',
          Fecha: 'date',
          'Placa Vehículo': 'license_plate',
          'Número Trailer': 'trailer_number',
          'Nombre Conductor': 'driver_name',
          'Documento Conductor': 'driver_document',
          Cliente: 'customer_name',
          'Patio Destino': 'destiny_yard',
          Material: 'material',
          'Peso Neto': 'net_weight',
          'Valor Unitario Material': 'material_settlement_unit_value',
          'Valor Material': 'material_settlement_net_value',
          'Valor Unitario Regalias': 'unit_royalties',
          'Valor Regalias': 'royalties',
          'Consecutivo Liquidación': 'settlement_consecutive',
          'Fecha Subida TNS': 'tns_upload_date',
          'ID TNS': 'tns_id'
        };
      } else if (this.report === 'unbilledFreightReport') {
        return {
          'Tipo Movimiento': 'movement',
          'Numero Remisión': 'referral_number',
          'Número Recibo': 'receipt_number',
          'Fecha Despacho': 'origin_date',
          'Fecha Recepción': 'destiny_date',
          'Placa Vehículo': 'license_plate',
          'Número Trailer': 'trailer_number',
          'Nombre Conductor': 'driver_name',
          'Documento Conductor': 'driver_document',
          'Patio Despacho / Proveedor': 'origin_yard_supplier',
          'Patio Recepción / Cliente': 'destiny_yard_customer',
          Material: 'material',
          'Empresa Transportadora': 'conveyor_company',
          'Peso Neto Despacho': 'origin_net_weight',
          'Peso Neto Recepción': 'destiny_net_weight',
          'Valor Unitario Flete': 'freight_settlement_unit_value',
          'Valor Flete': 'freight_settlement_net_value',
          'Consecutivo Liquidación': 'settlement_consecutive',
          'Fecha Subida TNS': 'tns_upload_date',
          'ID TNS': 'tns_id'
        };
      } else {
        return {};
      }
    },
    reports () {
      const data = [];
      this.userPermisionsGroup.forEach((element) => {
        if (element.match(/report..*/)) {
          const object = {};
          object.value = element.split('.')[1];
          object.text = element.split('.')[1];
          data.push(object);
        }
      });
      return data;
    },
    stateStartDateMR () {
      if (this.start_date_mr !== '' && this.start_date_mr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateMR () {
      if (this.final_date_mr !== '' && this.final_date_mr === null) {
        return false;
      }
      return true;
    },
    stateDateYSR () {
      if (this.date_ysr !== '' && this.date_ysr === null) {
        return false;
      }
      return true;
    },
    stateStartDateCTR () {
      if (this.start_date_ctr !== '' && this.start_date_ctr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateCTR () {
      if (this.final_date_ctr !== '' && this.final_date_ctr === null) {
        return false;
      }
      return true;
    },
    stateStartDateUTR () {
      if (this.start_date_utr !== '' && this.start_date_utr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateUTR () {
      if (this.final_date_utr !== '' && this.final_date_utr === null) {
        return false;
      }
      return true;
    },
    stateStartDateUPR () {
      if (this.start_date_upr !== '' && this.start_date_upr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateUPR () {
      if (this.final_date_upr !== '' && this.final_date_upr === null) {
        return false;
      }
      return true;
    },
    stateStartDateUSR () {
      if (this.start_date_usr !== '' && this.start_date_usr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateUSR () {
      if (this.final_date_usr !== '' && this.final_date_usr === null) {
        return false;
      }
      return true;
    },
    stateStartDateUFR () {
      if (this.start_date_ufr !== '' && this.start_date_ufr === null) {
        return false;
      }
      return true;
    },
    stateFinalDateUFR () {
      if (this.final_date_ufr !== '' && this.final_date_ufr === null) {
        return false;
      }
      return true;
    },
    disableSearchButton () {
      if ((this.report === 'movementsReport' && this.stateStartDateMR === false && this.stateFinalDateMR === false) ||
          (this.report === 'yardStockReport' && this.stateDateYSR === false) ||
          (this.report === 'completeTransfersReport' && this.stateStartDateCTR === false && this.stateFinalDateCTR === false) ||
          (this.report === 'uncompleteTransfersReport' && this.stateStartDateUTR === false && this.stateFinalDateUTR === false) ||
          (this.report === 'unbilledPurchasesReport' && this.stateStartDateUPR === false && this.stateFinalDateUPR === false) ||
          (this.report === 'unbilledSalesReport' && this.stateStartDateUSR === false && this.stateFinalDateUSR === false) ||
          (this.report === 'unbilledFreightReport' && this.stateStartDateUFR === false && this.stateFinalDateUFR === false)) {
        return true;
      }
      return false;
    }
  },
  created () {
    this.searchConveyorThirds();
    this.searchCustomerThirds();
    this.searchSupplierThirds();
    this.searchMaterials();
    this.searchDestinyYards();
    this.searchOriginYards();
  },
  methods: {
    ...mapActions(types.PATH, {
      getMovementsReport: types.actions.GET_MOVEMENTS_REPORT,
      getYardStockReport: types.actions.GET_YARD_STOCK_REPORT,
      getCompleteTransfersReport: types.actions.GET_COMPLETE_TRANSFER_REPORT,
      getUncompleteTransfersReport: types.actions.GET_UNCOMPLETE_TRANSFERS_REPORT,
      getUnbilledPurchasesReport: types.actions.GET_UNBILLED_PURCHASES_REPORT,
      getUnbilledSalesReport: types.actions.GET_UNBILLED_SALES_REPORT,
      getUnbilledFreightReport: types.actions.GET_UNBILLED_FREIGHT_REPORT
    }),
    ...mapActions(typesThird.PATH, {
      getSupplierThirds: typesThird.actions.GET_SUPPLIER_THIRDS,
      getCustomerThirds: typesThird.actions.GET_CUSTOMER_THIRDS,
      getConveyorThirds: typesThird.actions.GET_CONVEYOR_THIRDS
    }),
    ...mapActions(typesYard.PATH, {
      getOriginYards: typesYard.actions.GET_ORIGIN_YARDS,
      getDestinyYards: typesYard.actions.GET_DESTINY_YARDS
    }),
    ...mapActions(typesMaterial.PATH, {
      getMaterials: typesMaterial.actions.GET_MATERIALS
    }),
    searchSupplierThirds (search) {
      const data = {
        type: 'ASOCIADO'
      };
      this.getSupplierThirds(data);
    },
    searchCustomerThirds (search) {
      const data = {
        type: 'CLIENTE'
      };
      this.getCustomerThirds(data);
    },
    searchConveyorThirds (search) {
      const data = {
        type: 'CONTRATISTA'
      };
      this.getConveyorThirds(data);
    },
    searchOriginYards (search) {
      const data = {
        text: search,
        yard: parseInt(this.origin_yard),
        excludedYard: this.movement_mr === 'T' ? this.destiny_yard : null
      };
      this.getOriginYards(data);
    },
    searchDestinyYards (search) {
      const data = {
        text: search,
        yard: parseInt(this.destiny_yard),
        excludedYard: this.movement_mr === 'T' ? this.origin_yard_mr : null
      };
      this.getDestinyYards(data);
    },
    searchMaterials (search) {
      const data = {
        text: search,
        material: this.material,
        loaderState: false
      };
      this.getMaterials(data);
    },
    async search () {
      if (this.report === 'movementsReport') {
        const data = {
          movement: this.movement_mr,
          start_date: this.start_date_mr,
          final_date: this.final_date_mr,
          origin_yard_supplier: this.movement_mr === 'V' || this.movement_mr === 'T' ? this.origin_yard_mr : this.supplier_mr,
          destiny_yard_customer: this.movement_mr === 'C' || this.movement_mr === 'T' ? this.destiny_yard : this.customer_mr,
          material: this.material_mr
        };
        await this.getMovementsReport(data);
      } else if (this.report === 'yardStockReport') {
        const data = {
          date: this.date_ysr
        };
        await this.getYardStockReport(data);
      } else if (this.report === 'completeTransfersReport') {
        const data = {
          start_date: this.start_date_ctr,
          final_date: this.final_date_ctr,
          origin_yard: this.origin_yard_ctr,
          destiny_yard: this.destiny_yard_ctr
        };
        await this.getCompleteTransfersReport(data);
      } else if (this.report === 'uncompleteTransfersReport') {
        const data = {
          start_date: this.start_date_utr,
          final_date: this.final_date_utr,
          origin_yard: this.origin_yard_utr,
          destiny_yard: this.destiny_yard_utr
        };
        await this.getUncompleteTransfersReport(data);
      } else if (this.report === 'unbilledPurchasesReport') {
        const data = {
          start_date: this.start_date_upr,
          final_date: this.final_date_upr,
          supplier: this.supplier_upr,
          material: this.material_upr
        };
        await this.getUnbilledSalessReport(data);
      } else if (this.report === 'unbilledSalesReport') {
        const data = {
          start_date: this.start_date_usr,
          final_date: this.final_date_usr,
          customer: this.customer_usr,
          material: this.material_usr
        };
        await this.getUnbilledSalesReport(data);
      } else if (this.report === 'unbilledFreightReport') {
        const data = {
          start_date: this.start_date_ufr,
          final_date: this.final_date_ufr,
          conveyor_company: this.conveyor_company_ufr,
          material: this.material_ufr
        };
        await this.getUnbilledFreightReport(data);
      }
    },
    cleanFilter () {
      this.items = [];
      this.start_date_mr = null;
      this.final_date_mr = null;
      this.material_mr = null;
      this.movement_mr = null;
      this.supplier_mr = null;
      this.customer_mr = null;
      this.origin_yard_mr = null;
      this.destiny_yard_mr = null;
      this.date_ysr = null;
      this.start_date_ctr = null;
      this.final_date_ctr = null;
      this.origin_yard_ctr = null;
      this.destiny_yard_ctr = null;
      this.start_date_utr = null;
      this.final_date_utr = null;
      this.origin_yard_utr = null;
      this.destiny_yard_utr = null;
      this.start_date_upr = null;
      this.final_date_upr = null;
      this.supplier_upr = null;
      this.material_upr = null;
      this.start_date_usr = null;
      this.final_date_usr = null;
      this.customer_usr = null;
      this.material_usr = null;
      this.start_date_ufr = null;
      this.final_date_ufr = null;
      this.conveyor_company_ufr = null;
      this.material_ufr = null;
    }
  }
};
</script>

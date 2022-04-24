<template>
  <b-modal
    v-model="showModalForm"
    :id="id"
    size="lg"
    no-close-on-backdrop
    no-close-on-esc
    >
    <template #modal-header>
      <h5>{{ title }}</h5>
      <b-icon-x @click="closeModal()" class="icon-close" font-scale="2"></b-icon-x>
    </template>
    <b-form
      @submit="handleForm">
      <b-form-group class="mb-1">
        <label for="feedback-type">Tipo</label>
        <b-form-select
          id="feedback-type"
          v-model="type"
          :options="types"
          :disabled="disabledElements"
        >
        </b-form-select>
        <b-form-invalid-feedback :state="stateType">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-if="type=='OC' || type=='OP'" class="mb-1">
        <label for="feedback-operation">Tipo de operación</label>
        <b-form-radio-group
          id="feedback-operation"
          v-model="operation"
          name="radio-operation"
          :disabled="disabledElements"
        >
          <b-form-radio value="P">Prestamo</b-form-radio>
          <b-form-radio value="D">Devolución</b-form-radio>
        </b-form-radio-group>
        <b-form-invalid-feedback :state="stateOperation">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="8">
            <label for="feedback-date">Fecha</label>
            <b-form-datepicker
              id="feedback-date"
              v-model="date"
              placeholder="Seleccione la Fecha"
              :disabled="disabledElements"
            >
            </b-form-datepicker>
            <b-form-invalid-feedback :state="stateDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-time">Hora</label>
            <b-form-timepicker
              id="feedback-time"
              v-model="time"
              placeholder="Hora"
              :disabled="disabledElements"
            >
            </b-form-timepicker>
            <b-form-invalid-feedback :state="stateTime">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-license-plate">Placa Vehículo</label>
            <b-form-input
              id="feedback-license-plate"
              v-model="license_plate"
              v-mask="'XXXXXX'"
              :formatter="upperFormatter"
              type="text"
              :disabled="disabledElements"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="statePlate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-trailer-number">Número de Trailer</label>
            <b-form-input
              id="feedback-trailer-number"
              v-model="trailer_number"
              v-mask="'XXXXXXXX'"
              :formatter="upperFormatter"
              type="text"
              :disabled="disabledElements"
            >
            </b-form-input>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col :md="showReceiptNumber ? 6 : 12">
            <label for="feedback-referral-number">Número de Remisión</label>
            <b-form-input
              id="feedback-referral-number"
              v-model="referral_number"
              type="text"
              :disabled="disabledElements"
              v-mask="'XXXXXXXXXXXXXXXXXXXX'"
              :formatter="upperFormatter"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateReferral">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6" v-if="type=='C' || type=='R' || ((type=='OC' || type=='OP') && operation=='D')">
            <label for="feedback-receipt">Número de Recibo</label>
            <b-form-input
              id="feedback-receipt"
              v-model="receipt_number"
              type="text"
              :disabled="disabledElements"
              v-mask="'XXXXXXXXXXXXXXXXXXXX'"
              :formatter="upperFormatter"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateReceipt">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col :md="renderDestinyYard ? 6 : 12"  v-if="renderOriginYard">
            <label for="feedback-origin-yard">Patio Despacho</label>
            <v-select
              v-if="originYards && originYards.data"
              :filterable="false"
              id="feedback-origin-yard"
              :disabled="disabledElements"
              v-model="origin_yard"
              :options="originYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchOriginYards"
              @close="searchOriginYards"
              @open="searchOriginYards"
            />
            <b-form-invalid-feedback :state="stateOriginYard">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col :md="renderOriginYard ? 6 : 12" v-if="renderDestinyYard">
            <label for="feedback-destiny-yard">Patio Recepción</label>
            <v-select
              v-if="destinyYards && destinyYards.data"
              :filterable="false"
              id="feedback-destiny-yard"
              :disabled="disabledElements"
              required
              v-model="destiny_yard"
              :options="destinyYards.data"
              label="name"
              :reduce="data => data.id"
              @search="searchDestinyYards"
              @close="searchDestinyYards"
              @open="searchDestinyYards"
            />
            <b-form-invalid-feedback :state="stateDestinyYard">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group v-if="type=='C' || type=='OP'" class="mb-1">
        <label for="feedback-supplier">Proveedor</label>
        <v-select
          v-if="localeSupplierThirds && localeSupplierThirds.data"
          id="feedback-supplier"
          :disabled="disabledElements"
          required
          v-model="supplier"
          :options="localeSupplierThirds.data"
          label="name"
          :reduce="data => data.id"
        />
        <b-form-invalid-feedback :state="stateSupplier">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-if="type=='V' || type=='OC'" class="mb-1">
        <label for="feedback-customer">Cliente</label>
        <v-select
          v-if="localeCustomerThirds && localeCustomerThirds.data"
          id="feedback-customer"
          :disabled="disabledElements"
          required
          v-model="customer"
          :options="localeCustomerThirds.data"
          label="name"
          :reduce="data => data.id"
        />
        <b-form-invalid-feedback :state="stateCustomer">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <label for="feedback-conveyor">Empresa Transportadora</label>
        <v-select
          v-if="localeConveyorThirds && localeConveyorThirds.data"
          id="feedback-conveyor"
          :disabled="disabledElements"
          required
          v-model="conveyor_company"
          :options="localeConveyorThirds.data"
          label="name"
          :reduce="data => data.id"
        />
        <b-form-invalid-feedback :state="stateConveyorCompany">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="6">
            <label for="feedback-driver-name">Nombre Conductor</label>
            <b-form-input
              id="feedback-driver-name"
              v-model="driver_name"
              :formatter="upperFormatter"
              type="text"
              :disabled="disabledElements"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateDriverName">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-driver-document">Documento Conductor</label>
            <b-form-input
              id="feedback-driver-document"
              v-model="driver_document"
              :formatter="upperFormatter"
              type="text"
              :disabled="disabledElements"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateDriverDocument">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="8">
            <label for="feedback-material">Material</label>
            <v-select
              v-if="materials && materials.data"
              :filterable="false"
              id="feedback-material"
              size="lg"
              required
              v-model="material"
              :options="materials.data"
              label="name"
              :reduce="data => data.id"
              :disabled="disabledElements"
              @search="searchMaterials"
              @close="searchMaterials"
              @open="searchMaterials"
            />
            <b-form-invalid-feedback :state="stateMaterial">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-ash-percentage">Porcentaje Cenizas</label>
            <b-form-input
              id="feedback-ash-percentage"
              v-model="ash_percentage"
              maxLenght="4"
              type="text"
              :disabled="disabledElements"
              :formatter="formatDecimal"
            >
            </b-form-input>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="4">
            <label for="feedback-gross-weight">Peso Bruto</label>
            <b-form-input
              id="feedback-gross-weight"
              v-model="gross_weight"
              type="text"
              :disabled="disabledElements"
              maxlength="15"
              :formatter="formatDecimal"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateGrossWeight">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-tare-weight">Peso Tara</label>
            <b-form-input
              id="feedback-tare-weight"
              v-model="tare_weight"
              type="text"
              maxlength="15"
              :disabled="disabledElements"
              :formatter="formatDecimal"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateTareWeight">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4">
            <label for="feedback-net-weight">Peso Neto</label>
            <b-form-input
              id="feedback-net-weight"
              v-model="net_weight"
              type="text"
              :disabled="true"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateNetWeight">
              {{ labelTextFieldRequiredWeight }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <label for="feedback-seals">Precintos</label>
        <b-form-tags
          input-id="feedback-seals"
          :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
          v-model="seals"
          placeholder="Ingrese los precintos"
          add-button-text="Agregar"
          v-mask="'XXXXXXX'"
          duplicate-tag-text="Este precinto ya esta agregado"
          @input="upperTags"
          remove-on-delete
          :disabled="disabledElements"
        ></b-form-tags>
      </b-form-group>
      <b-form-group>
        <label for="feedbackobservation">Observaciones</label>
        <b-form-textarea
          id="feedbackobservation"
          v-model="observation"
          maxlength="200"
          no-resize
          rows="3"
          :disabled="disabledElements"
          >
        </b-form-textarea>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          size="lg"
          v-model="round_trip"
          v-if="type=='D' || type=='R'"
          :disabled="disabledElements"
        >Viaje Redondo
        </b-form-checkbox>
      </b-form-group>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="form-control"
        :disabled="!stateButton"
        @click="handleForm">
        {{ textBtnSubmit }}
      </b-button>
    </b-form>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="secondary"
          size="sm"
          class="float-right"
          @click="closeModal()"
        >
          Cancelar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { BIconX } from 'bootstrap-vue';
import { typesAdminTiquet as types } from '@/store/adminTiquet/types';
import { typesYard } from '@/store/yard/types';
import { typesAuth } from '@/store/auth/types';
import { typesMaterial } from '@/store/material/types';
import { typesThird } from '@/store/third/types';
export default {
  name: 'modal-form',
  data () {
    const stringFullDate = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '');
    const arrayFullDate = stringFullDate.split(' ');
    let arrayDate = arrayFullDate[0].split('/');
    let arrayTime = arrayFullDate[1].split(':');
    arrayDate = arrayDate.map(function (x) { return x.padStart(2, '0'); });
    arrayTime = arrayTime.map(function (x) { return x.padStart(2, '0'); });
    return {
      id: 'tiquet-modal',
      title: 'Crear tiquet',
      textBtnSubmit: 'Registrar',
      types: [
        { value: 'D', text: 'Despacho' },
        { value: 'R', text: 'Recepción' },
        { value: 'C', text: 'Compra' },
        { value: 'V', text: 'Venta' }/* ,
        { value: 'OC', text: 'Operación con Cliente' },
        { value: 'OP', text: 'Operación con Proveedor' } */
      ],
      mark_entry: false,
      type: 'D',
      operation: 'P',
      origin_yard: '',
      destiny_yard: '',
      supplier: '',
      customer: '',
      material: '',
      ash_percentage: 0,
      receipt_number: '',
      referral_number: '',
      date: arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0],
      time: arrayTime[0] + ':' + arrayTime[1],
      license_plate: '',
      trailer_number: '',
      driver_document: '',
      driver_name: '',
      gross_weight: '',
      tare_weight: '',
      conveyor_company: '',
      observation: '',
      seals: [],
      round_trip: false,
      labelTextFieldRequired: 'Campo obligatorio',
      labelTextFieldRequiredWeight: 'Debe ser mayor a cero',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.resetInfoModal();
        this.title = 'Crear Tiquet';
        this.id = 'create-tiquet-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Tiquet';
        this.id = 'edit-tiquet-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Tiquet';
        this.id = 'delete-tiquet-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    adminTiquet (val) {
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.type = val.type;
        this.operation = val.operation;
        this.referral_number = val.referral_number;
        this.receipt_number = val.receipt_number;
        this.date = val.date;
        this.time = val.time;
        this.material = val.material ? parseInt(val.material) : null;
        this.ash_percentage = val.ash_percentage;
        this.origin_yard = val.origin_yard ? parseInt(val.origin_yard) : null;
        this.destiny_yard = val.destiny_yard ? parseInt(val.destiny_yard) : null;
        this.conveyor_company = val.conveyor_company ? parseInt(val.conveyor_company) : null;
        this.driver_document = val.driver_document;
        this.driver_name = val.driver_name;
        this.license_plate = val.license_plate;
        this.trailer_number = val.trailer_number;
        this.gross_weight = this.formatDecimal(val.gross_weight);
        this.tare_weight = this.formatDecimal(val.tare_weight);
        this.seals = val.seals && val.seals.length > 0 ? val.seals.split(',') : [];
        this.supplier = val.supplier ? parseInt(val.supplier) : null;
        this.customer = val.customer ? parseInt(val.customer) : null;
        this.observation = val.observation;
        this.round_trip = parseInt(val.round_trip) === 1;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'adminTiquet',
      'typeAction'
    ]),
    ...mapState(typesYard.PATH, [
      'originYards',
      'destinyYards'
    ]),
    ...mapState(typesThird.PATH, [
      'localeSupplierThirds',
      'localeConveyorThirds',
      'localeCustomerThirds'
    ]),
    ...mapState(typesMaterial.PATH, [
      'materials'
    ]),
    ...mapState(typesAuth.PATH, [
      'dataSession'
    ]),
    net_weight () {
      const localeGrossWeight = this.gross_weight === null || this.gross_weight === '' ? 0 : parseFloat(this.gross_weight.toString().replace(/,/g, ''));
      const localeTareWeight = this.tare_weight === null || this.tare_weight === '' ? 0 : parseFloat(this.tare_weight.toString().replace(/,/g, ''));
      const netWeight = parseFloat((localeGrossWeight - localeTareWeight) > 0 ? (localeGrossWeight - localeTareWeight) : 0).toFixed(2);
      return this.formatDecimal(netWeight);
    },
    showReceiptNumber () {
      return this.type === 'C' || this.type === 'R' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D');
    },
    stateType () {
      if (!this.type || this.type === '') {
        return false;
      }
      return true;
    },
    stateOperation () {
      if ((!this.operation || this.operation === '') && (this.type === 'OC' || this.type === 'OP')) {
        return false;
      }
      return true;
    },
    stateDate () {
      if (!this.date || this.date === '') {
        return false;
      }
      return true;
    },
    stateTime () {
      if (!this.time || this.time === '') {
        return false;
      }
      return true;
    },
    stateReferral () {
      if ((!this.referral_number || this.referral_number === '') && (this.type === 'R' || this.type === 'D' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P'))) {
        return false;
      }
      return true;
    },
    stateReceipt () {
      if ((!this.receipt_number || this.receipt_number === '') && (this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D'))) {
        return false;
      }
      return true;
    },
    stateMaterial () {
      if (!this.material || this.material === '') {
        return false;
      }
      return true;
    },
    statePlate () {
      if (!this.license_plate || this.license_plate === '') {
        return false;
      }
      return true;
    },
    stateTareWeight () {
      const tareWeight = this.tare_weight === '' || this.tare_weight === null ? this.tare_weight : this.tare_weight.toString().replace(/,/g, '');
      if (!tareWeight || tareWeight === '' || parseFloat(tareWeight) <= 0) {
        return false;
      }
      return true;
    },
    stateGrossWeight () {
      const grossWeight = this.gross_weight === '' || this.gross_weight === null ? this.gross_weight : this.gross_weight.toString().replace(/,/g, '');
      if (!grossWeight || grossWeight === '' || parseFloat(grossWeight) <= 0) {
        return false;
      }
      return true;
    },
    stateNetWeight () {
      const netWeight = this.net_weight === '' || this.net_weight === null ? this.net_weight : this.net_weight.toString().replace(/,/g, '');
      if (!netWeight || netWeight === '' || parseFloat(netWeight) <= 0) {
        return false;
      }
      return true;
    },
    stateOriginYard () {
      if ((!this.origin_yard || this.origin_yard === '') && this.renderOriginYard) {
        return false;
      }
      return true;
    },
    stateDestinyYard () {
      if ((!this.destiny_yard || this.destiny_yard === '') && this.renderDestinyYard) {
        return false;
      }
      return true;
    },
    stateConveyorCompany () {
      if (!this.conveyor_company || this.conveyor_company === '') {
        return false;
      }
      return true;
    },
    stateDriverDocument () {
      if (!this.driver_document || this.driver_document === '') {
        return false;
      }
      return true;
    },
    stateDriverName () {
      if (!this.driver_name || this.driver_name === '') {
        return false;
      }
      return true;
    },
    stateSupplier () {
      if ((!this.supplier || this.supplier === '') && (this.type === 'C' || this.type === 'OP')) {
        return false;
      }
      return true;
    },
    stateCustomer () {
      if ((!this.customer || this.customer === '') && (this.type === 'V' || this.type === 'OC')) {
        return false;
      }
      return true;
    },
    stateButton () {
      return this.stateType && this.stateOperation && this.stateDate && this.stateTime && this.stateReferral &&
        this.stateReceipt && this.stateMaterial && this.statePlate && this.stateGrossWeight && this.stateTareWeight &&
        this.stateNetWeight && this.stateOriginYard && this.stateDestinyYard && this.stateConveyorCompany &&
        this.stateDriverDocument && this.stateDriverName && this.stateSupplier && this.stateCustomer;
    },
    renderOriginYard () {
      return this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P');
    },
    renderDestinyYard () {
      return this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D');
    }
  },
  methods: {
    ...mapActions(types.PATH, {
      setShowModalForm: types.actions.SET_SHOW_MODAL_FORM,
      save: types.actions.SAVE,
      delete: types.actions.DELETE,
      edit: types.actions.EDIT,
      setTypeAction: types.actions.SET_TYPE_ACTION
    }),
    ...mapActions(typesYard.PATH, {
      getOriginYards: typesYard.actions.GET_ORIGIN_YARDS,
      getDestinyYards: typesYard.actions.GET_DESTINY_YARDS
    }),
    ...mapActions(typesThird.PATH, {
      getSupplierThirds: typesThird.actions.GET_SUPPLIER_THIRDS,
      getCustomerThirds: typesThird.actions.GET_CUSTOMER_THIRDS,
      getConveyorThirds: typesThird.actions.GET_CONVEYOR_THIRDS
    }),
    ...mapActions(typesMaterial.PATH, {
      getMaterials: typesMaterial.actions.GET_MATERIALS
    }),
    resetInfoModal () {
      this.type = 'D';
      this.operation = 'P';
      this.referral_number = '';
      const stringFullDate = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '');
      const arrayFullDate = stringFullDate.split(' ');
      let arrayDate = arrayFullDate[0].split('/');
      let arrayTime = arrayFullDate[1].split(':');
      arrayDate = arrayDate.map(function (x) { return x.padStart(2, '0'); });
      arrayTime = arrayTime.map(function (x) { return x.padStart(2, '0'); });
      this.date = arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0];
      this.time = arrayTime[0] + ':' + arrayTime[1];
      this.material = null;
      this.ash_percentage = 0;
      this.origin_yard = '';
      this.destiny_yard = '';
      this.conveyor_company = null;
      this.driver_document = '';
      this.driver_name = '';
      this.license_plate = '';
      this.trailer_number = '';
      this.gross_weight = '';
      this.tare_weight = '';
      this.seals = [];
      this.supplier = null;
      this.customer = null;
      this.observation = '';
      this.round_trip = false;
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          type: this.type,
          operation: (this.type === 'OC' || this.type === 'OP') ? this.operation : null,
          referral_number: this.referral_number,
          receipt_number: this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.receipt_number : null,
          date: this.date,
          time: this.time,
          material: this.material,
          ash_percentage: this.ash_percentage && this.ash_percentage !== '' ? this.ash_percentage.toString().replace(/,/g, '') : 0,
          origin_yard: this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P') ? this.origin_yard : null,
          destiny_yard: this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.destiny_yard : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.nit)[0] + '/' + this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          driver_document: this.driver_document,
          driver_name: this.driver_name,
          license_plate: this.license_plate,
          trailer_number: this.trailer_number,
          gross_weight: this.gross_weight.replace(/,/g, ''),
          tare_weight: this.tare_weight.replace(/,/g, ''),
          net_weight: this.net_weight.replace(/,/g, ''),
          supplier: this.type === 'C' || this.type === 'OP' ? this.supplier : null,
          supplier_name: this.type === 'C' || this.type === 'OP' ? (this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.nit)[0] + '/' + this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0]) : null,
          customer: this.type === 'V' || this.type === 'OC' ? this.customer : null,
          customer_name: this.type === 'V' || this.type === 'OC' ? (this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.nit)[0] + '/' + this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0]) : null,
          seals: this.seals.join(','),
          observation: this.observation,
          round_trip: this.round_trip && (this.type === 'D' || this.type === 'R') ? 1 : 0,
          user: this.dataSession.userId
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.adminTiquet.id,
          type: this.type,
          operation: (this.type === 'OC' || this.type === 'OP') ? this.operation : null,
          referral_number: this.referral_number,
          receipt_number: this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.receipt_number : null,
          date: this.date,
          time: this.time,
          material: this.material,
          ash_percentage: this.ash_percentage && this.ash_percentage !== '' ? this.ash_percentage.toString().replace(/,/g, '') : 0,
          origin_yard: this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P') ? this.origin_yard : null,
          destiny_yard: this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.destiny_yard : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.nit)[0] + '/' + this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          driver_document: this.driver_document,
          driver_name: this.driver_name,
          license_plate: this.license_plate,
          trailer_number: this.trailer_number,
          gross_weight: this.gross_weight.replace(/,/g, ''),
          tare_weight: this.tare_weight.replace(/,/g, ''),
          net_weight: this.net_weight.replace(/,/g, ''),
          supplier: this.type === 'C' || this.type === 'OP' ? this.supplier : null,
          supplier_name: this.type === 'C' || this.type === 'OP' ? (this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.nit)[0] + '/' + this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0]) : null,
          customer: this.type === 'V' || this.type === 'OC' ? this.customer : null,
          customer_name: this.type === 'V' || this.type === 'OC' ? (this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.nit)[0] + '/' + this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0]) : null,
          seals: this.seals.join(','),
          observation: this.observation,
          round_trip: this.round_trip && (this.type === 'D' || this.type === 'R') ? 1 : 0
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.adminTiquet.id);
      }
    },
    searchOriginYards (search) {
      const data = {
        text: search,
        yard: parseInt(this.origin_yard),
        excludedYard: parseInt(this.destiny_yard)
      };
      this.getOriginYards(data);
    },
    searchDestinyYards (search) {
      const data = {
        text: search,
        yard: parseInt(this.destiny_yard),
        excludedYard: parseInt(this.origin_yard)
      };
      this.getDestinyYards(data);
    },
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
    searchMaterials (search) {
      const data = {
        text: search,
        material: this.material,
        loaderState: false
      };
      this.getMaterials(data);
    },
    upperFormatter (value) {
      return value.toUpperCase();
    },
    upperTags () {
      this.seals = this.seals.length > 0 ? this.seals.join(',').toUpperCase().split(',') : [];
    },
    formatDecimal (value) {
      if (value === '.' || value === '0.') {
        return '0.';
      } else {
        value = value === null || value.toString().trim() === '' || value.toString().trim() === '-' ? 0 : value;
        value = value.toString().replace(/[^0-9.-]/g, '');
        value = value.toString();
        if (value === null || value === '' || parseFloat(value) === 0) {
          return 0;
        } else {
          value = value.substring(0, 2) === '0.' ? value : value.replace(/^0+/, '');
          value = value.replace(/[^0-9.-]/g, '');
          value = parseFloat(value) < 0 ? (parseFloat(value) * -1) : value;
          value = value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return value;
        }
      }
    },
    closeModal () {
      this.setTypeAction('');
      this.setShowModalForm(false);
    }
  }
};
</script>

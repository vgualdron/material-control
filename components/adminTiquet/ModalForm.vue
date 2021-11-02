<template>
  <b-modal
    v-model="showModalForm"
    :id="id"
    no-close-on-backdrop
    no-close-on-esc
    @hide="resetInfoModal">
    <template #modal-header>
      <h5>{{ title }}</h5>
      <b-icon-x @click="resetInfoModal()" class="icon-close" font-scale="2"></b-icon-x>
    </template>
    <b-form
      @submit="handleForm">
      <b-form-group>
        <label for="feedback-type" class="mb-3">Tipo</label>
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
      <b-form-group v-if="type=='OC' || type=='OP'">
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
      <b-form-group class="mb-0">
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
      </b-form-group>
      <b-form-group class="mb-0 mt-3" v-if="type=='C' || type=='R' || ((type=='OC' || type=='OP') && operation=='D')">
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
      </b-form-group>
      <b-form-group class="mb-0">
        <b-form-row>
          <b-col md="8">
            <label for="feedback-date" class="mt-3">Fecha</label>
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
            <label for="feedback-time" class="mt-3">Hora</label>
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
      <b-form-group class="mb-0">
        <label for="feedback-material" class="mt-3">Material</label>
        <v-select
          v-if="materials && materials.data"
          :filterable="false"
          id="feedback-material"
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
      </b-form-group>
      <b-form-group v-if="renderOriginYard" class="mb-0">
        <label for="feedback-origin-yard" class="mt-3">Patio Despacho</label>
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
      </b-form-group>
      <b-form-group v-if="renderDestinyYard" class="mb-0">
        <label for="feedback-destiny-yard" class="mt-3">Patio Recepción</label>
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
      </b-form-group>
      <b-form-group class="mb-0">
        <label for="feedback-conveyor" class="mt-3">Empresa Transportadora</label>
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
      <b-form-group class="mb-0">
        <label for="feedback-driver" class="mt-3">Conductor</label>
        <b-form-input
          id="feedback-driver"
          v-model="driver"
          :formatter="upperFormatter"
          type="text"
          :disabled="disabledElements"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="stateDriver">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-0">
        <label for="feedback-license-plate" class="mt-3">Placa Vehículo</label>
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
      </b-form-group>
      <b-form-group class="mb-0">
        <label for="feedback-trailer-number" class="mt-3">Número de Trailer</label>
        <b-form-input
          id="feedback-trailer-number"
          v-model="trailer_number"
          v-mask="'XXXXXXXX'"
          :formatter="upperFormatter"
          type="text"
          :disabled="disabledElements"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-row>
          <b-col md="4" class="mt-3">
            <label for="feedback-gross-weight">Peso Bruto</label>
            <b-form-input
              id="feedback-gross-weight"
              v-model="gross_weight"
              min="0.0"
              type="number"
              :disabled="disabledElements"
              step="0.01"
              :formatter="formatDecimal"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateGrossWeight">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4" class="mt-3">
            <label for="feedback-tare-weight">Peso Tara</label>
            <b-form-input
              id="feedback-tare-weight"
              v-model="tare_weight"
              type="number"
              :disabled="disabledElements"
              :formatter="formatDecimal"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateTareWeight">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="4" class="mt-3">
            <label for="feedback-net-weight">Peso Neto</label>
            <b-form-input
              id="feedback-net-weight"
              v-model="net_weight"
              type="number"
              :disabled=true
            >
            </b-form-input>
            <b-form-invalid-feedback :state="stateNetWeight">
              {{ labelTextFieldRequiredWeight }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-0 mt-3">
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
      <b-form-group v-if="type=='C' || type=='OP'" class="mb-0">
        <label for="feedback-supplier" class="mt-3">Proveedor</label>
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
      <b-form-group v-if="type=='V' || type=='OC'" class="mb-0">
        <label for="feedback-customer" class="mt-3">Cliente</label>
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
      <b-form-group>
        <label for="feedbackobservation" class="mt-3">Observaciones</label>
        <b-form-textarea
          id="feedbackobservation"
          v-model="observation"
          maxlength="200"
          no-resize
          rows="3"
          :disabled="disabledElements"
          >
        </b-form-textarea>
        <b-form-invalid-feedback>
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
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
          @click="resetInfoModal()">
          Cancelar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesAdminTiquet as types } from '@/store/adminTiquet/types';
import { typesYard } from '@/store/yard/types';
import { typesAuth } from '@/store/auth/types';
import { typesMaterial } from '@/store/material/types';
import { typesThird } from '@/store/third/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'tiquet-modal',
      title: 'Crear tiquet',
      textBtnSubmit: 'Registrar',
      types: [
        { value: 'D', text: 'Despacho' },
        { value: 'R', text: 'Recepción' },
        { value: 'C', text: 'Compra' },
        { value: 'V', text: 'Venta' },
        { value: 'OC', text: 'Operación con Cliente' },
        { value: 'OP', text: 'Operación con Proveedor' }
      ],
      mark_entry: false,
      type: 'D',
      operation: 'P',
      origin_yard: '',
      destiny_yard: '',
      supplier: '',
      customer: '',
      material: '',
      receipt_number: '',
      referral_number: '',
      date: (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(6, 10) +
        '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(3, 5) +
        '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(0, 2),
      time: (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(11, 16),
      license_plate: '',
      trailer_number: '',
      driver: '',
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
      if (this.typeAction === 'create') {
        this.type = 'D';
        this.operation = 'P';
        this.referral_number = '';
        this.date = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(6, 10) +
                    '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(3, 5) +
                    '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(0, 2);
        this.time = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(11, 16);
        this.material = '';
        this.origin_yard = '';
        this.destiny_yard = '';
        this.conveyor_company = '';
        this.driver = '';
        this.license_plate = '';
        this.trailer_number = '';
        this.gross_weight = '';
        this.tare_weight = '';
        this.seals = [];
        this.supplier = '';
        this.customer = '';
        this.observation = '';
        this.round_trip = false;
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.type = val.type;
        this.operation = val.operation;
        this.referral_number = val.referral_number;
        this.receipt_number = val.receipt_number;
        this.date = val.date;
        this.time = val.time;
        this.material = val.material ? parseInt(val.material) : null;
        this.origin_yard = val.origin_yard ? parseInt(val.origin_yard) : null;
        this.destiny_yard = val.destiny_yard ? parseInt(val.destiny_yard) : null;
        this.conveyor_company = val.conveyor_company ? parseInt(val.conveyor_company) : null;
        this.driver = val.driver;
        this.license_plate = val.license_plate;
        this.trailer_number = val.trailer_number;
        this.gross_weight = val.gross_weight;
        this.tare_weight = val.tare_weight;
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
      return ((this.gross_weight - this.tare_weight).toFixed(2));
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
    stateGrossWeight () {
      if (!this.gross_weight || this.gross_weight === '' || this.gross_weight <= 0) {
        return false;
      }
      return true;
    },
    stateTareWeight () {
      if (!this.tare_weight || this.tare_weight === '' || this.tare_weight <= 0) {
        return false;
      }
      return true;
    },
    stateNetWeight () {
      if (!this.net_weight || this.net_weight === '' || this.net_weight <= 0) {
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
    stateDriver () {
      if (!this.driver || this.driver === '') {
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
        this.stateDriver && this.stateSupplier && this.stateCustomer;
    },
    renderOriginYard () {
      return this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P');
    },
    renderDestinyYard () {
      return this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D');
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(types.PATH, {
      setShowModalForm: types.actions.SET_SHOW_MODAL_FORM,
      save: types.actions.SAVE,
      delete: types.actions.DELETE,
      edit: types.actions.EDIT
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
      this.date = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(6, 10) +
                    '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(3, 5) +
                    '-' + (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(0, 2);
      this.time = (new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', hour12: false }).format(new Date())).replace(',', '').slice(11, 16);
      this.material = null;
      this.origin_yard = '';
      this.destiny_yard = '';
      this.conveyor_company = null;
      this.driver = '';
      this.license_plate = '';
      this.trailer_number = '';
      this.gross_weight = '';
      this.tare_weight = '';
      this.seals = [];
      this.supplier = null;
      this.customer = null;
      this.observation = '';
      this.round_trip = false;
      this.setShowModalForm(false);
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
          origin_yard: this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P') ? this.origin_yard : null,
          destiny_yard: this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.destiny_yard : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          driver: this.driver,
          license_plate: this.license_plate,
          trailer_number: this.trailer_number,
          gross_weight: this.gross_weight,
          tare_weight: this.tare_weight,
          net_weight: this.net_weight,
          supplier: this.type === 'C' || this.type === 'OP' ? this.supplier : null,
          supplier_name: this.type === 'C' || this.type === 'OP' ? this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0] : null,
          customer: this.type === 'V' || this.type === 'OC' ? this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0] : null,
          customer_name: this.type === 'V' || this.type === 'OC' ? this.customer : null,
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
          origin_yard: this.type === 'D' || this.type === 'R' || this.type === 'V' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'P') ? this.origin_yard : null,
          destiny_yard: this.type === 'D' || this.type === 'R' || this.type === 'C' || ((this.type === 'OC' || this.type === 'OP') && this.operation === 'D') ? this.destiny_yard : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          driver: this.driver,
          license_plate: this.license_plate,
          trailer_number: this.trailer_number,
          gross_weight: this.gross_weight,
          tare_weight: this.tare_weight,
          net_weight: this.net_weight,
          supplier: this.type === 'C' || this.type === 'OP' ? this.supplier : null,
          supplier_name: this.type === 'C' || this.type === 'OP' ? this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0] : null,
          customer: this.type === 'V' || this.type === 'OC' ? this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0] : null,
          customer_name: this.type === 'V' || this.type === 'OC' ? this.customer : null,
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
      return value && value !== '' ? value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : '';
    }
  }
};
</script>

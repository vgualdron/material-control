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
      <b-form-group class="mb-1">
        <label for="feedback-movement">Movimiento</label>
        <b-form-select
          id="feedback-movement"
          v-model="movement"
          :options="movements"
          :disabled="disabledElements"
        >
        </b-form-select>
        <b-form-invalid-feedback :state="stateMovement">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col :md="renderDestinyYard ? 6 : 12" v-if="renderOriginYard">
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
      <b-form-group v-if="renderSupplier" class="mb-1">
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
      <b-form-group class="mb-1" v-if="renderCustomer">
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
            <label for="feedback-start-date">Fecha Inicial</label>
            <b-form-datepicker
              id="feedback-start-date"
              v-model="start_date"
              placeholder="Seleccione la Fecha Inicial"
              :disabled="disabledElements"
            >
            </b-form-datepicker>
            <b-form-invalid-feedback :state="stateStartDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
          <b-col md="6">
            <label for="feedback-final-date">Fecha Final</label>
            <b-form-datepicker
              id="feedback-final-date"
              v-model="final_date"
              placeholder="Seleccione la Fecha Final"
              :disabled="disabledElements"
            >
            </b-form-datepicker>
            <b-form-invalid-feedback :state="stateFinalDate">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
      </b-form-group>
      <b-form-group class="mb-1">
        <b-form-row>
          <b-col md="8" v-if="type === 'M'">
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
          <b-col :md="type === 'M' ? 4 : 12">
            <label for="feedback-price">Valor</label>
            <b-form-input
              id="feedback-price"
              v-model="price"
              min="0.0"
              type="number"
              :disabled="disabledElements"
              step="0.01"
              :formatter="formatDecimal"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="statePrice">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
          </b-col>
        </b-form-row>
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
          v-if="movement=='T'"
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
import { typesRate as types } from '@/store/rate/types';
import { typesYard } from '@/store/yard/types';
import { typesAuth } from '@/store/auth/types';
import { typesMaterial } from '@/store/material/types';
import { typesThird } from '@/store/third/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'rate-modal',
      title: 'Crear tarifa',
      textBtnSubmit: 'Registrar',
      types: [
        { value: 'M', text: 'MATERIAL' },
        { value: 'F', text: 'FLETE' }
      ],
      movements: [
        { value: 'T', text: 'TRASLADO (DESPACHO/RECEPCIÓN)' },
        { value: 'C', text: 'COMPRA' },
        { value: 'V', text: 'VENTA' }
      ],
      type: 'M',
      movement: 'T',
      origin_yard: null,
      destiny_yard: null,
      supplier: null,
      supplier_name: null,
      customer: null,
      customer_name: null,
      conveyor_company: null,
      conveyor_company_name: null,
      start_date: null,
      final_date: null,
      material: null,
      price: null,
      observation: null,
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
        this.title = 'Crear Tarifa';
        this.id = 'create-tarifa-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Tarifa';
        this.id = 'edit-tarifa-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Tarifa';
        this.id = 'delete-tarifa-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    rate (val) {
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.type = val.type;
        this.movement = val.movement;
        this.origin_yard = val.originYard ? parseInt(val.originYard) : null;
        this.destiny_yard = val.destinyYard ? parseInt(val.destinyYard) : null;
        this.supplier = val.supplier ? parseInt(val.supplier) : null;
        this.supplier_name = val.supplier_name;
        this.customer = val.customer ? parseInt(val.customer) : null;
        this.customer_name = val.customer_name;
        this.conveyor_company = val.conveyorCompany ? parseInt(val.conveyorCompany) : null;
        this.conveyor_company_name = val.conveyorCompanyName;
        this.start_date = val.startDate;
        this.final_date = val.finalDate;
        this.material = val.material ? parseInt(val.material) : null;
        this.price = val.price;
        this.observation = val.observation;
        this.round_trip = parseInt(val.roundTrip) === 1;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'rate',
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
    stateType () {
      if (!this.type || this.type === '') {
        return false;
      }
      return true;
    },
    stateMovement () {
      if (!this.movement || this.movement === '') {
        return false;
      }
      return true;
    },
    stateOriginYard () {
      if ((this.movement === 'V' || this.movement === 'T') && (!this.origin_yard || this.origin_yard === '')) {
        return false;
      }
      return true;
    },
    stateDestinyYard () {
      if ((this.movement === 'C' || this.movement === 'T') && (!this.destiny_yard || this.destiny_yard === '')) {
        return false;
      }
      return true;
    },
    renderOriginYard () {
      if (this.movement === 'V' || this.movement === 'T') {
        return true;
      }
      return false;
    },
    renderDestinyYard () {
      if (this.movement === 'C' || this.movement === 'T') {
        return true;
      }
      return false;
    },
    stateSupplier () {
      if (this.movement === 'C' && (!this.supplier || this.supplier === '')) {
        return false;
      }
      return true;
    },
    renderSupplier () {
      if (this.movement !== 'C') {
        return false;
      }
      return true;
    },
    stateCustomer () {
      if (this.movement === 'V' && (!this.customer || this.customer === '')) {
        return false;
      }
      return true;
    },
    renderCustomer () {
      if (this.movement !== 'V') {
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
    stateStartDate () {
      if (!this.start_date || this.start_date === '') {
        return false;
      }
      return true;
    },
    stateFinalDate () {
      if (!this.final_date || this.final_date === '') {
        return false;
      }
      return true;
    },
    stateMaterial () {
      if (this.type === 'M' && (!this.material || this.material === '')) {
        return false;
      }
      return true;
    },
    statePrice () {
      if (!this.price || this.price === '' || parseFloat(this.price) === 0) {
        return false;
      }
      return true;
    },
    stateButton () {
      return this.stateType && this.stateMovement && this.stateOriginYard && this.stateDestinyYard && this.stateSupplier && this.stateCustomer &&
            this.stateConveyorCompany && this.stateStartDate && this.stateFinalDate && this.stateMaterial && this.statePrice;
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
      this.type = 'M';
      this.movement = 'T';
      this.origin_yard = null;
      this.destiny_yard = null;
      this.supplier = null;
      this.supplier_name = null;
      this.customer = null;
      this.customer_name = null;
      this.conveyor_company = null;
      this.conveyor_company_name = null;
      this.start_date = null;
      this.final_date = null;
      this.material = null;
      this.price = null;
      this.observation = null;
      this.round_trip = false;
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          type: this.type,
          movement: this.movement,
          origin_yard: this.renderOriginYard ? this.origin_yard : null,
          destiny_yard: this.renderDestinyYard ? this.destiny_yard : null,
          supplier: this.renderSupplier ? this.supplier : null,
          supplier_name: this.supplier_name ? this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0] : null,
          customer: this.renderCustomer ? this.customer : null,
          customer_name: this.customer_name ? this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0] : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          start_date: this.start_date,
          final_date: this.final_date,
          material: this.type === 'M' ? this.material : null,
          price: this.price,
          observation: this.observation,
          round_trip: this.movement === 'T' && this.round_trip ? 1 : 0
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.rate.id,
          type: this.type,
          movement: this.movement,
          origin_yard: this.renderOriginYard ? this.origin_yard : null,
          destiny_yard: this.renderDestinyYard ? this.destiny_yard : null,
          supplier: this.renderSupplier ? this.supplier : null,
          supplier_name: this.supplier_name ? this.localeSupplierThirds?.data?.filter(item => item.id === this.supplier).map(item => item.name)[0] : null,
          customer: this.renderCustomer ? this.customer : null,
          customer_name: this.customer_name ? this.localeCustomerThirds?.data?.filter(item => item.id === this.customer).map(item => item.name)[0] : null,
          conveyor_company: this.conveyor_company,
          conveyor_company_name: this.localeConveyorThirds?.data?.filter(item => item.id === this.conveyor_company).map(item => item.name)[0],
          start_date: this.start_date,
          final_date: this.final_date,
          material: this.type === 'M' ? this.material : null,
          price: this.price,
          observation: this.observation,
          round_trip: this.movement === 'T' && this.round_trip ? 1 : 0
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.rate.id);
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
      return value && value !== '' ? parseFloat(value.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]) : 0;
    },
    closeModal () {
      this.setTypeAction('');
      this.setShowModalForm(false);
    }
  }
};
</script>

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
      <b-form-group class="mb-1" v-if="date !== null && date !== ''">
        <label for="feedback-date" class='mb-0'>Fecha</label>
        <b-form-input
          id="feedback-date"
          v-model="date"
          type="text"
          :disabled="true"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group class="mb-1">
        <label for="feedback-type" class='mb-0'>Tipo</label>
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
        <label for="feedback-yard" class='mb-0'>Patio</label>
        <v-select
          v-if="yards && yards.data"
          :filterable="false"
          id="feedback-yard"
          :disabled="disabledElements"
          v-model="yard"
          :options="yards.data"
          label="name"
          :reduce="data => data.id"
          @search="searchYards"
          @close="searchYards"
          @open="searchYards"
        />
        <b-form-invalid-feedback :state="stateYard">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <label for="feedback-material" class='mb-0'>Material</label>
        <v-select
          v-if="materials && materials.data"
          :filterable="false"
          id="feedback-material"
          :disabled="disabledElements"
          v-model="material"
          :options="materials.data"
          label="name"
          :reduce="data => data.id"
          @search="searchMaterials"
          @close="searchMaterials"
          @open="searchMaterials"
        />
        <b-form-invalid-feedback :state="stateMaterial">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-1">
        <label for="feedback-amount" class='mb-0'>Cantidad</label>
        <b-form-input
          id="feedback-amount"
          v-model="amount"
          type="text"
          :disabled="disabledElements"
          maxlength="15"
          :formatter="formatDecimal"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="stateAmount">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
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
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="form-control"
        :disabled="false"
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
import { typesAdjustment as types } from '@/store/adjustment/types';
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
        { value: 'A', text: 'Aumento' },
        { value: 'D', text: 'Disminución' }
      ],
      type: 'A',
      yard: null,
      material: null,
      amount: null,
      observation: null,
      date: null,
      labelTextFieldRequired: 'Campo obligatorio',
      labelTextFieldRequiredWeight: 'Debe ser mayor a cero',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.resetInfoModal();
        this.title = 'Crear Ajuste';
        this.id = 'create-adjustment-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Ajuste';
        this.id = 'edit-adjustment-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Ajuste';
        this.id = 'delete-adjustment-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    adjustment (val) {
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.date = val.date;
        this.type = val.type;
        this.yard = parseInt(val.yard);
        this.material = parseInt(val.material);
        this.amount = this.formatDecimal(val.amount);
        this.observation = val.observation;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'adjustment',
      'typeAction'
    ]),
    ...mapState(typesYard.PATH, [
      'yards'
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
    stateYard () {
      if (!this.yard || this.yard === '') {
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
    stateAmount () {
      if (!this.amount || this.amount === '' || parseFloat(this.amount) === 0) {
        return false;
      }
      return true;
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
      getYards: typesYard.actions.GET_YARDS
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
      this.type = 'A';
      this.yard = null;
      this.material = null;
      this.amount = null;
      this.observation = null;
      this.date = null;
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          type: this.type,
          yard: this.yard,
          material: this.material,
          amount: this.amount.replace(/,/g, ''),
          observation: this.observation
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.adjustment.id,
          type: this.type,
          yard: this.yard,
          material: this.material,
          amount: this.amount.replace(/,/g, ''),
          observation: this.observation
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(
          this.adjustment.id
        );
      }
    },
    searchYards (search) {
      const data = {
        text: search,
        yard: this.yard,
        excludedYard: null,
        loaderState: false
      };
      this.getYards(data);
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

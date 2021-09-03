<template>
  <b-modal
    :id="id"
    v-model="showModalForm"
    no-close-on-backdrop
    no-close-on-esc
    @hide="resetInfoModal"
  >
    <template #modal-header>
      <h5>{{ title }}</h5>
      <b-icon-x class="icon-close" font-scale="2" @click="resetInfoModal()" />
    </template>
    <b-form @submit="handleForm">
      <b-form-group>
        <label for="feedback-code">Código</label>
        <b-form-input
          id="feedback-code"
          v-model="code"
          :state="validationCode"
          type="text"
          :disabled="disabledElements"
          v-mask="'AA##'"
          required
        />
        <b-form-invalid-feedback :state="validationCode">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="feedback-name" class="mt-3">Nombre</label>
        <b-form-input
          id="feedback-name"
          v-model="name"
          :state="validationName"
          type="text"
          :disabled="disabledElements"
          :formatter="upperFormatter"
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationName">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="feedback-zone" class="mt-3">Zona</label>
        <v-select
          v-if="zones && zones.data"
          :filterable="false"
          id="feedback-zone"
          :disabled="disabledElements"
          required
          v-model="zone"
          :options="zones.data"
          label="name"
          :reduce="data => data.id"
          @search="searchZones"
          @close="searchZones"
        />
        <b-form-invalid-feedback>
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="mt-3 form-control"
        :disabled="!validationCode || !validationName || !validationZone"
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
import { typesYard as types } from '@/store/yard/types';
import { typesZone } from '@/store/zone/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'yard-modal',
      title: 'Crear Patio',
      textBtnSubmit: 'Registrar',
      code: '',
      name: '',
      zone: '',
      searchInput: '',
      labelTextFieldRequired: 'Campo obligatorio',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.title = 'Crear Patio';
        this.id = 'create-yard-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Patio';
        this.id = 'edit-yard-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Patio';
        this.id = 'delete-yard-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    yard (val) {
      if (this.typeAction === 'create') {
        this.code = '';
        this.name = '';
        this.zone = '';
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.code = val.code;
        this.name = val.name;
        this.zone = parseInt(val.zone);
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'yard',
      'typeAction'
    ]),
    ...mapState(typesZone.PATH, [
      'zones'
    ]),
    validationCode () {
      return this.code.length > 0;
    },
    validationName () {
      return this.name.length > 0;
    },
    validationZone () {
      return this.zone;
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
    ...mapActions(typesZone.PATH, {
      getZones: typesZone.actions.GET_ZONES
    }),
    resetInfoModal () {
      this.name = '';
      this.code = '';
      this.zone = '';
      this.setShowModalForm(false);
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          code: this.code,
          name: this.name,
          zone: this.zone
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.yard.id,
          code: this.code,
          name: this.name,
          zone: this.zone
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.yard.id);
      }
    },
    searchZones (search) {
      const data = {
        perPage: 10,
        page: 1,
        text: search,
        zone: this.zone,
        loaderState: false
      };
      this.getZones(data);
    },
    upperFormatter (value) {
      return value.toUpperCase();
    }
  }
};
</script>

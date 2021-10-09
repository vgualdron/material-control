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
        <label for="feedback-code">Código</label>
        <b-form-input
          id="feedback-code"
          v-model="code"
          :state="validationCode"
          type="text"
          :disabled="disabledElements"
          v-mask="'A##'"
          required>
        </b-form-input>
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
          :formatter="upperFormatter"
          :disabled="disabledElements"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="validationName">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="feedback-unit" class="mt-3">Unidad</label>
        <b-form-select
          id="feedback-unit"
          v-model="unit"
          :options="units"
          type="text"
          :disabled="disabledElements"
          required>
        </b-form-select>
      </b-form-group>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="mt-3 form-control"
        :disabled="!validationCode || !validationName"
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
import { typesMaterial as types } from '@/store/material/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'material-modal',
      title: 'Crear material',
      textBtnSubmit: 'Registrar',
      code: '',
      name: '',
      unit: 'U',
      labelTextFieldRequired: 'Campo obligatorio',
      disabledElements: false,
      units: [
        { value: 'U', text: 'Unidad' },
        { value: 'T', text: 'Tonelada' }
      ]
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.title = 'Crear Material';
        this.id = 'create-material-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Material';
        this.id = 'edit-material-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Material';
        this.id = 'delete-material-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    material (val) {
      if (this.typeAction === 'create') {
        this.code = '';
        this.name = '';
        this.unit = '';
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.code = val.code;
        this.name = val.name;
        this.unit = val.unit;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'material',
      'typeAction'
    ]),
    validationCode () {
      return this.code.length > 0;
    },
    validationName () {
      return this.name.length > 0;
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
    resetInfoModal () {
      this.name = '';
      this.code = '';
      this.setShowModalForm(false);
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          code: this.code,
          name: this.name,
          unit: this.unit
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.material.id,
          code: this.code,
          name: this.name,
          unit: this.unit
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.material.id);
      }
    },
    upperFormatter (value) {
      return value.toUpperCase();
    }
  }
};
</script>

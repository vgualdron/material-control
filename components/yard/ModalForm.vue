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
          type="number"
          :disabled="disabledElements"
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationCode">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <label for="feedback-name" class="mt-3">Nombre</label>
      <b-form-input
        id="feedback-name"
        v-model="name"
        :state="validationName"
        type="text"
        :disabled="disabledElements"
        required>
      </b-form-input>
      <b-form-invalid-feedback :state="validationName">
        {{ labelTextFieldRequired }}
      </b-form-invalid-feedback>
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
import { typesYard as types } from '@/store/yard/types';
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
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.code = val.code;
        this.name = val.name;
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
          name: this.name
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.yard.id,
          code: this.code,
          name: this.name
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.yard.id);
      }
    }
  }
};
</script>

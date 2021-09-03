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
        <label for="feedback-name">Nombre</label>
        <b-form-input
          id="feedback-name"
          v-model="name"
          :state="validationName"
          :disabled="disabledElements"
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationName">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-if="permissionsGroup">
        <label for="feedback-permissions">Permisos</label>
        <b-card>
          <b-form-checkbox
            v-for="item in permissionsGroup"
            v-model="permissions"
            name="role-permission"
            :value="item.name"
            :key="item.id"
            :disabled="disabledElements"
          >{{item.displayName}}
          </b-form-checkbox>
        </b-card>
      </b-form-group>
      <b-button
        id="button-submit"
        type="submit"
        href="#"
        variant="primary"
        class="mt-3 form-control"
        :disabled="!validationName"
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
import { typesCommon } from '@/store/common/typesCommon';
import { typesRole as types } from '@/store/role/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'role-modal',
      title: 'Crear rol',
      textBtnSubmit: 'Registrar',
      name: '',
      guard_name: 'api',
      permissions: [],
      labelTextFieldRequired: 'Campo obligatorio',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.title = 'Crear Rol';
        this.id = 'create-role-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Rol';
        this.id = 'edit-role-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Rol';
        this.id = 'delete-role-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    role (val) {
      if (this.typeAction === 'create') {
        this.name = '';
        this.permissions = [];
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.name = val.name;
        this.permissions = val.permissions;
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'role',
      'typeAction'
    ]),
    ...mapState(typesCommon.PATH, [
      'permissionsGroup'
    ]),
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
      this.permissions = [];
      this.setShowModalForm(false);
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          name: this.name,
          guard_name: this.guard_name,
          permissions: this.permissions
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.role.id,
          name: this.name,
          guard_name: this.guard_name,
          permissions: this.permissions
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.role.id);
      }
    }
  }
};
</script>

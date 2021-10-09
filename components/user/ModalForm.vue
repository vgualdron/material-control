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
        <label for="feedback-document">Documento</label>
        <b-form-input
          id="feedback-document"
          v-model="document_number"
          :state="validationDocumentNumber"
          type="text"
          :disabled="disabledElements"
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationDocumentNumber">
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
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationName">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="feedback-phone" class="mt-3">Teléfono</label>
        <b-form-input
          id="feedback-phone"
          v-model="phone"
          :state="validationPhone"
          type="text"
          :disabled="disabledElements"
          required>
        </b-form-input>
        <b-form-invalid-feedback :state="validationPhone">
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="feedback-yars" class="mt-3">Patio</label>
        <v-select
          v-if="yards && yards.data"
          :filterable="false"
          id="feedback-yard"
          :disabled="disabledElements"
          required
          v-model="yard"
          :options="yards.data"
          label="name"
          :reduce="data => data.id"
          @search="searchYards"
          @close="searchYards"
        />
        <b-form-invalid-feedback>
          {{ labelTextFieldRequired }}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group v-if="roles && roles.data && roles.data.length > 0">
        <label for="feedback-role" class="mt-3">Rol</label>
        <b-card>
          <b-form-checkbox
            v-for="item in roles.data"
            v-model="role"
            name="user-role"
            :value="item.name"
            :key="item.id"
            :disabled="disabledElements"
          >{{item.name}}
          </b-form-checkbox>
        </b-card>
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
        :disabled="!validationDocumentNumber || !validationName"
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
import { typesUser as types } from '@/store/user/types';
import { typesYard } from '@/store/yard/types';
import { typesRole } from '@/store/role/types';
import { BIconX } from 'bootstrap-vue';
export default {
  name: 'modal-form',
  data () {
    return {
      id: 'user-modal',
      title: 'Crear usuario',
      textBtnSubmit: 'Registrar',
      document_number: '',
      name: '',
      phone: '',
      yard: '',
      conveyor_company: '',
      role: [],
      labelTextFieldRequired: 'Campo obligatorio',
      disabledElements: false
    };
  },
  watch: {
    typeAction (val) {
      if (val === 'create') {
        this.title = 'Crear Usuario';
        this.id = 'create-user-modal';
        this.textBtnSubmit = 'Registrar';
        this.disabledElements = false;
      }
      if (val === 'edit') {
        this.title = 'Modificar Usuario';
        this.id = 'edit-user-modal';
        this.textBtnSubmit = 'Guardar cambios';
        this.disabledElements = false;
      }
      if (val === 'delete') {
        this.title = 'Eliminar Usuario';
        this.id = 'delete-user-modal';
        this.textBtnSubmit = 'Eliminar';
        this.disabledElements = true;
      }
    },
    user (val) {
      if (this.typeAction === 'create') {
        this.document_number = '';
        this.name = '';
        this.phone = '';
        this.role = [];
        this.yard = '';
      }
      if (this.typeAction === 'edit' || this.typeAction === 'delete') {
        this.document_number = val.documentNumber;
        this.phone = val.phoneNumber;
        this.role = val.role;
        this.name = val.name;
        this.yard = parseInt(val.yard);
      }
    }
  },
  components: {
    BIconX
  },
  computed: {
    ...mapState(types.PATH, [
      'showModalForm',
      'user',
      'typeAction'
    ]),
    ...mapState(typesYard.PATH, [
      'yards'
    ]),
    ...mapState(typesRole.PATH, [
      'roles'
    ]),
    validationDocumentNumber () {
      return this.document_number.length > 0;
    },
    validationName () {
      return this.name.length > 0;
    },
    validationPhone () {
      return this.phone.length > 0;
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
      getYards: typesYard.actions.GET_YARDS
    }),
    resetInfoModal () {
      this.name = '';
      this.document_number = '';
      this.role = [];
      this.setShowModalForm(false);
    },
    async handleForm (event) {
      event.preventDefault();
      if (this.typeAction === 'create') {
        await this.save({
          document_number: this.document_number,
          name: this.name,
          phone: this.phone,
          yard: this.yard,
          role: this.role
        });
      }
      if (this.typeAction === 'edit') {
        await this.edit({
          id: this.user.id,
          document_number: this.document_number,
          name: this.name,
          phone: this.phone,
          yard: this.yard,
          role: this.role
        });
      }
      if (this.typeAction === 'delete') {
        await this.delete(this.user.id);
      }
    },
    searchYards (search) {
      const data = {
        perPage: 10,
        page: 1,
        text: search,
        yard: this.yard
      };
      this.getYards(data);
    }
  }
};
</script>

<template>
  <div>
    <b-modal
      id="modal-profile"
      v-model="showProfile"
      no-close-on-backdrop
      no-close-on-esc
    >
      <template #modal-header>
        <h5>Cambiar Contraseña</h5>
        <b-icon-x
          class="icon-close"
          font-scale="2"
          @click="setShowProfile(false)"
        />
      </template>
      <b-form>
        <b-form-group>
          <label for="feedback-password">Contraseña</label>
          <b-form-input
            id="feedback-code"
            v-model.trim="password"
            v-b-tooltip.focus
            :title="passwordToolTip"
            type="password"
            required
          />
          <b-form-invalid-feedback :state="statePassword">
            {{ labelTextFieldRequiredPassword }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group>
          <label for="feedback-confirm-password">Confirmar Contraseña</label>
          <b-form-input
            id="feedback-confirm-password"
            v-model.trim="confirm_password"
            type="password"
            required
          />
          <b-form-invalid-feedback :state="stateConfirmPassword">
            {{ labelTextFieldRequiredConfirmPassword }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button
          id="button-submit"
          type="submit"
          href="#"
          variant="primary"
          class="mt-3 form-control"
          :disabled="stateButton"
          @click="handleForm"
        >
          Actualizar
        </b-button>
      </b-form>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="secondary"
            size="sm"
            class="float-right"
            @click="setShowProfile(false)"
          >
            Cancelar
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { typesCommon as types } from '@/store/common/typesCommon';
import { typesUser } from '@/store/user/types';
import { typesAuth } from '@/store/auth/types';
import { BIconX } from 'bootstrap-vue';
export default {
  components: {
    BIconX
  },
  data () {
    return {
      password: '',
      confirm_password: '',
      passwordToolTip: 'La contraseña es sensible a minúsculas y mayúsculas'
    };
  },
  computed: {
    ...mapState(types.PATH, [
      'loaderStatus',
      'showProfile'
    ]),
    ...mapState(typesAuth.PATH, [
      'dataSession'
    ]),
    labelTextFieldRequiredPassword () {
      if (this.confirm_password === '' || this.confirm_password === null) {
        return 'Campo obligatorio';
      } else if (this.confirm_password !== this.password) {
        return 'La contraseña y su confirmación no coinciden';
      } else if (this.password.length < 5) {
        return 'La contraseña debe ser de al menos 5 caracteres';
      }
      return '';
    },
    labelTextFieldRequiredConfirmPassword () {
      if (this.confirm_password === '' || this.confirm_password === null) {
        return 'Campo obligatorio';
      } else if (this.confirm_password !== this.password) {
        return 'La contraseña y su confirmación no coinciden';
      }
      return '';
    },
    statePassword () {
      if (this.password === '' || this.password === null || this.password.length < 5 || this.confirm_password !== this.password) {
        return false;
      }
      return true;
    },
    stateConfirmPassword () {
      if (this.confirm_password === '' || this.confirm_password === null || this.confirm_password !== this.password) {
        return false;
      }
      return true;
    },
    stateButton () {
      if (!this.statePassword || !this.stateConfirmPassword) {
        return true;
      }
      return false;
    }
  },
  watch: {
    showProfile (val) {
      this.password = '';
      this.confirm_password = '';
    }
  },
  methods: {
    setShowProfile (value) {
      this.$parent.setShowProfile(value);
    },
    ...mapActions(typesUser.PATH, {
      updateProfile: typesUser.actions.UPDATE_PROFILE
    }),
    async handleForm (event) {
      await event.preventDefault();
      await this.updateProfile({
        id: this.dataSession.userId,
        password: this.password,
        confirm_password: this.confirm_password
      });
    }
  }
};
</script>

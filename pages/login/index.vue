<template>
  <div>
    <BannerMenu />
    <b-row>
      <b-col></b-col>
      <b-col cols="8" md="auto">
        <b-card
          header="Iniciar sesión nueva xxx"
          header-tag="header"
          class="mt-3"
        >
          <b-form
            id="form-login"
            @submit="handleForm">
            <b-form-group>
              <label for="feedback-user">Usuario</label>
              <b-form-input
                id="feedback-user"
                v-model="user"
                :state="validationUser"
                @keyup.enter="handleForm"
                required>
              </b-form-input>
              <b-form-invalid-feedback :state="validationUser">
                {{ labelTextFieldRequired }}
              </b-form-invalid-feedback>
            </b-form-group>
            <label for="feedback-password" class="mt-3">Contraseña</label>
            <b-form-input
              id="feedback-password"
              v-model="password"
              :state="validationPassword"
              type="password"
              @keyup.enter="handleForm">
            </b-form-input>
            <b-form-invalid-feedback :state="validationPassword">
              {{ labelTextFieldRequired }}
            </b-form-invalid-feedback>
            <b-button
              id="button-login"
              type="submit"
              href="#"
              variant="primary"
              class="mt-3 form-control"
              :disabled="!validationUser || !validationPassword"
              @click="handleForm">
              Iniciar sesión
            </b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { typesAuth as types } from '@/store/auth/types';
import BannerMenu from '@/components/common/BannerMenu.vue';
export default {
  name: 'Login',
  components: {
    BannerMenu
  },
  layout: 'default',
  data () {
    return {
      user: '',
      password: '',
      labelTextFieldRequired: 'Campo obligatorio'
    };
  },
  computed: {
    ...mapState(types.PATH, [
      'activeToken',
      'authorizationToken'
    ]),
    ...mapGetters(types.PATH, {
      isLoggedIn: types.getters.IS_LOGGED_IN
    }),
    validationUser () {
      return this.user.length > 0;
    },
    validationPassword () {
      return this.password.length > 0;
    }
  },
  async mounted () {
    await this.getActiveToken();
  },
  methods: {
    ...mapActions(types.PATH, {
      getActiveToken: types.actions.GET_ACTIVE_TOKEN,
      login: types.actions.LOGIN,
      getSession: types.actions.GET_DATA_SESSION
    }),
    async handleForm (event) {
      event.preventDefault();
      const data = {
        activeToken: this.activeToken,
        username: this.user,
        password: this.password
      };
      await this.login(data);
      await this.getSession();
    }
  }
};
</script>

<style>

</style>

<template>
  <div class="container">
    <section class="section">
      <h3 class="subtitle is-6 has-text-grey">
        Status:
        <a v-if="$nuxt.isOffline" href="#">
          IS OFFLINE
        </a>
        <a v-else href="#">
          IS ONLINE
        </a>
      </h3>
      <div class="columns is-mobile">
        <button @click="handleFormResult">Hacer GET</button>
      </div>
      <div>
        {{ JSON.stringify(token) }}
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState('auth', [
      'token'
    ])
  },
  async mounted () {
  },
  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    async handleFormResult () {
      await this.login();
    }
  }
};
</script>

<style>

</style>

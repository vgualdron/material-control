<template>
  <div class="container">
    <section class="section">
      <h3 class="subtitle is-6 has-text-grey">
        * Status:
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
      <div class="columns is-mobile mt-3">
        <button @click="post">Hacer POST</button>
      </div>
      <div class="columns is-mobile mt-3">
        {{ JSON.stringify(token) }}
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Login',
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
    },
    async post (formObj) {
      const post = {
        title: '1',
        body: 'dsadassa',
        userId: 1
      };
      try {
        const result = await this.$axios.$post('https://jsonplaceholder.typicode.com/posts', post);
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style>

</style>

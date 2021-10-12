<template>
  <div class="container">
    <section class="section">
      <h3 class="subtitle is-6 has-text-grey">
        {{ $t('home') }}
        <a v-if="$nuxt.isOffline" href="#">
          IS OFFLINE
        </a>
        <a v-else href="#">
          IS ONLINE
        </a>
      </h3>
      <div class="columns is-mobile">
        <button @click="get">Hacer GET</button>
      </div>
      <div class="columns is-mobile mt-3">
        <button @click="post">Hacer POST</button>
      </div>
      <div class="columns is-mobile mt-3">
        <button @click="sync">SINCRONIZAR</button>
      </div>
      <div class="columns is-mobile mt-3">
        <button @click="setDataToServer">ENVIAR TIQUETS</button>
      </div>
      <div class="columns is-mobile mt-3">
        {{ JSON.stringify(token) }}
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesSynchronize } from '@/store/synchronize/types';
import { typesTiquet } from '@/store/tiquet/types';
export default {
  name: 'Home',
  layout: 'menu',
  components: {
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState('auth', [
      'token'
    ]),
    ...mapState(typesTiquet.PATH, [
      'tiquets'
    ])
  },
  async mounted () {
    await this.sync();
  },
  methods: {
    ...mapActions(typesSynchronize.PATH, {
      sync: typesSynchronize.actions.GET_DATA_FROM_SERVER,
      setData: typesSynchronize.actions.SET_DATA_TO_SERVER
    }),
    ...mapActions(typesTiquet.PATH, {
      getNotSynchronizedTiquets: typesTiquet.actions.GET_NOT_SYNCHRONIZED_TIQUETS
    }),
    async handleFormResult () {
      await this.login();
    },
    async get () {
      try {
        const result = await this.$axios.$get('https://novumcolombia.com/api/posts/');
        this.token = result;
        console.log(result);
      } catch (e) {
        console.log(e);
      }
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
    },
    async setDataToServer () {
      await this.getNotSynchronizedTiquets();
      await this.setData(this.tiquets);
    }
  }
};
</script>

<style>

</style>

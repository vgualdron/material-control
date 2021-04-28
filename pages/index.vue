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
        <button @click="handleFormResult">Hacer POST</button>
      </div>
      <div>
        {{JSON.stringify(items.length)}}
      </div>
    </section>
  </div>
</template>

<script>
import environmentConfig from '../config/env.config.js'
const envConfig = environmentConfig[process.env.NODE_ENV]
export default {
  name: 'HomePage',
  components: {
  },
  data () {
    return {
      items: []
    }
  },
  async mounted () {
    await this.getResults()
  },
  methods: {
    async handleFormResult () {
      const post = {
        title: 'titulo',
        body: {
          contenido: 'dsadsad'
        },
        userId: 1
      }
      try {
        const result = await this.$axios.$post('https://vgualdron.github.io/material-control/api/db', post)
        await this.getResults()
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    },
    async getResults () {
      try {
        const result = await this.$axios.$get('https://vgualdron.github.io/material-control/api/db')
        console.log(result)
        this.items = [...result]
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

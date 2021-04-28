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
        <card
          title="POST"
          icon="github"
        >
          <button @click="handleFormResult">Hacer POST</button>
        </card>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
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
        const result = await this.$axios.$post('https://jsonplaceholder.typicode.com/posts', post)
        console.log(result)
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

<template>
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
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',
  components: {
    Card
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

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
      <!-- <button @click="refresh">Refresh</button> -->
    </h3>
    <div class="columns is-mobile">
      <card
        title="Free"
        icon="github"
      >
        Open source on <a href="https://github.com/buefy/buefy">
          GitHub
        </a>
      </card>

      <card
        title="Responsive"
        icon="cellphone-link"
      >
        <b class="has-text-grey">
          Every
        </b> component is responsive
      </card>

      <card
        title="Modern"
        icon="alert-decagram"
      >
        Built with <a href="https://vuejs.org/">
          Vue.js
        </a> and <a href="http://bulma.io/">
          Bulma
        </a>
      </card>

      <card
        title="Lightweight"
        icon="arrange-bring-to-front"
      >
        No other internal dependency
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
    refresh () {
      this.$nuxt.refresh()
    }
  }
}
</script>

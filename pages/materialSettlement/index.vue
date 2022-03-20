<template>
  <b-container fluid>
    <table-list />
  </b-container>
</template>

<script>
import TableList from '@/components/materialSettlement/TableList.vue';
export default {
  name: 'settlematerial',
  layout: 'menu',
  components: {
    TableList
  },
  data () {
    return {
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
};
</script>

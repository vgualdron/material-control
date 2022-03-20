<template>
  <b-container fluid>
    <table-list />
  </b-container>
</template>

<script>
import TableList from '@/components/freightSettlement/TableList.vue';
export default {
  name: 'settleFreight',
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

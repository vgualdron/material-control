<template>
  <b-container fluid>
    <table-list />
  </b-container>
</template>

<script>
import TableList from '@/components/report/TableList.vue';
export default {
  name: 'report',
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

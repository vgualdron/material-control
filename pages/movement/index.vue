<template>
  <b-container fluid>
    <table-list />
  </b-container>
</template>

<script>
import TableList from '@/components/movement/TableList.vue';
export default {
  name: 'movement',
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

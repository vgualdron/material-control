<template>
  <b-container fluid>
    <table-list />
    <modal-form />
  </b-container>
</template>

<script>
import TableList from '@/components/rate/TableList.vue';
import ModalForm from '@/components/rate/ModalForm.vue';
export default {
  name: 'Rate',
  layout: 'menu',
  components: {
    TableList,
    ModalForm
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

<style>
</style>

<template>
  <b-container fluid>
    <table-list />
    <modal-form />
  </b-container>
</template>

<script>
import TableList from '@/components/zone/TableList.vue';
import ModalForm from '@/components/zone/ModalForm.vue';
export default {
  name: 'Zone',
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

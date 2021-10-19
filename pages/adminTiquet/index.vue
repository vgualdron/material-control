<template>
  <b-container fluid>
    <table-list />
    <modal-form />
  </b-container>
</template>

<script>
import TableList from '@/components/adminTiquet/TableList.vue';
import ModalForm from '@/components/adminTiquet/ModalForm.vue';
export default {
  name: 'Tiquet',
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

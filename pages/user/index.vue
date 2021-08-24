<template>
  <b-container fluid>
    <table-list />
    <modal-form />
  </b-container>
</template>

<script>
import TableList from '@/components/user/TableList.vue';
import ModalForm from '@/components/user/ModalForm.vue';
export default {
  name: 'User',
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

<template>
  <b-container fluid>
    <table-list />
    <modal-form />
  </b-container>
</template>

<script>
import TableList from '@/components/adminMaterialSettlement/TableList.vue';
import ModalForm from '@/components/adminMaterialSettlement/ModalForm.vue';
export default {
  name: 'adminMaterialSettlement',
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

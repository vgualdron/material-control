<template>
  <div>
    <SidebarMenu />
    <Nuxt />
    <Loader />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { typesCommon } from '@/store/common/typesCommon';
import SidebarMenu from '@/components/common/SidebarMenu.vue';
import Loader from '../components/common/Loader';
export default {
  name: 'Menu',
  components: {
    SidebarMenu,
    Loader
  },
  watch: {
    toast (val) {
      this.makeToast(val);
    }
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'toast'
    ])
  },
  methods: {
    makeToast (toast) {
      this.$bvToast.toast(toast.content, {
        title: toast.title,
        variant: toast.variant,
        solid: toast.solid
      });
    }
  },
  middleware: 'auth'
};
</script>

<template>
  <div>
    <SidebarMenu />
    <Nuxt />
    <Loader />
  </div>
</template>

<script>
import SidebarMenu from '@/components/common/SidebarMenu.vue';
import Loader from '../components/common/Loader';
export default {
  name: 'Menu',
  components: {
    SidebarMenu,
    Loader
  },
  middleware: 'auth'
};
</script>

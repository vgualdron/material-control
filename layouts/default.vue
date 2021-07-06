<template>
  <div>
    <Nuxt />
    <Loader />
  </div>
</template>
<script>
import Loader from '../components/common/Loader';
export default {
  name: 'Default',
  components: {
    Loader
  }
};
</script>

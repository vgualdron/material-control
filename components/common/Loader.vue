<template>
  <div>
    <div class="loader" v-show="loaderStatus">
      <div class="spin reel">
        <img class="image-loader" src="~/assets/images/loader.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { typesCommon as types } from '@/store/common/typesCommon';
export default {
  computed: {
    ...mapState(types.PATH, [
      'loaderStatus'
    ])
  }
};
</script>

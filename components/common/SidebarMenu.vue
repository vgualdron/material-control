<template>
  <div>
    <b-sidebar
      id="sidebar-left"
      bg-variant="light"
      backdrop-variant="dark"
      text-variant="secondary"
      title="Funcionalidades"
      backdrop
      left
      shadow
    >
      <div class="px-3 py-2">
        <b-img
          src="~/assets/images/logo-banner.png"
          fluid
          thumbnail
        />
        <nav class="mb-3 mt-3">
          <b-nav vertical>
            <b-nav-item
              :class="routerActive === '/' ? 'active' : ''"
              @click="go('/')"
            >
              {{ toCapitalCaseText($t('home')) }}
            </b-nav-item>
            <b-nav-item
              v-for="(permision, index) in userPermisions"
              :key="'nav-item' + index"
              :class="routerActive === permision.name ? 'active' : ''"
              @click="go(permision.name)"
            >
              {{ toCapitalCaseText($t(permision.name)) }}
            </b-nav-item>
            <b-nav-item
              @click="setShowProfile(true)"
            >
              {{ toCapitalCaseText($t('updateProfile')) }}
            </b-nav-item>
            <b-nav-item
              @click="close('/login')"
            >
              {{ toCapitalCaseText($t('logout')) }}
            </b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
    <BannerMenu :show-btn="true" />
    <UpdateProfile />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { typesCommon } from '@/store/common/typesCommon';
import { typesAuth } from '@/store/auth/types';
import BannerMenu from '@/components/common/BannerMenu.vue';
import UpdateProfile from '@/components/common/UpdateProfile.vue';
import { toCapitalCase } from '@/helpers/common/string';
export default {
  components: {
    BannerMenu,
    UpdateProfile
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState(typesCommon.PATH, [
      'routerActive',
      'userPermisions'
    ])
  },
  mounted () {
    this.getUserPermisions();
    this.getUserPermisionsGroup();
  },
  methods: {
    ...mapActions(typesCommon.PATH, {
      setRouterActive: typesCommon.actions.SET_ROUTER_ACTIVE,
      getUserPermisions: typesCommon.actions.GET_USER_PERMISIONS,
      getUserPermisionsGroup: typesCommon.actions.GET_USER_PERMISIONS_GROUP,
      setShowProfile: typesCommon.actions.SET_SHOW_PROFILE
    }),
    ...mapActions(typesAuth.PATH, {
      setAuthorizationToken: typesAuth.actions.SET_AUTHORIZATION_TOKEN,
      logout: typesAuth.actions.LOGOUT
    }),
    go (router) {
      this.setRouterActive(router);
    },
    close (router) {
      this.setRouterActive(router);
      this.logout({});
    },
    toCapitalCaseText (text) {
      return toCapitalCase(text);
    }
  }
};
</script>

<style>
.nav li {
  border-bottom: 3px solid rgba(0, 0, 0, 0);
}
.nav li:hover {
  border-bottom: 3px solid #eee;
}
li.nav-item.active > a.nav-link {
  border-bottom: 3px solid #4a60a9;
  background: #dee2e6;
  color: #4a60a9;
  font-weight: bold;
}
</style>

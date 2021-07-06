<template>
  <b-navbar toggleable variant="light">
    <b-navbar-brand href="#">
      <button
        v-if="showBtn"
        type="button"
        aria-label="Toggle navigation"
        class="navbar-toggler collapsed"
        aria-expanded="false"
        aria-controls="nav-collapse"
        style="overflow-anchor: none;"
        v-b-toggle.sidebar-left>
        <span class="navbar-toggler-icon"></span>
      </button>
    </b-navbar-brand>
    <b-navbar-brand href="#">Control de materiales</b-navbar-brand>
  </b-navbar>
</template>
<script>
export default {
  components: {
  },
  props: {
    showBtn: {
      type: Boolean,
      default: false
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

<template>
  <div>
    <b-sidebar id="sidebar-left" title="Sidebar" left shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
        <nav class="mb-3">
          <b-nav vertical>
            <b-nav-item active to="/">Home</b-nav-item>
            <b-nav-item to="/calendar">Calendar</b-nav-item>
            <b-nav-item to="/media">Media</b-nav-item>
            <b-nav-item to="/modal">Modal</b-nav-item>
            <b-nav-item to="/card">Card</b-nav-item>
            <b-nav-item to="/logo">Logo</b-nav-item>
          </b-nav>
        </nav>
      </div>
    </b-sidebar>
    <b-navbar toggleable type="dark" variant="info">
      <b-navbar-brand href="#">Control de materiales</b-navbar-brand>
      <b-navbar-brand href="#">
        <button
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
    </b-navbar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  components: {
  }
};
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

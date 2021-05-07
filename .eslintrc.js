module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
<<<<<<< HEAD
  rules: {}
=======
  rules: {
    'semi': [2, "always"]
  }
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
}

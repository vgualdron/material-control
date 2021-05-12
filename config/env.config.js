const production = {
  appName: 'Control de materiales', // Nombre de la aplicación html - title
  appBaseDir: '/', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
  baseUrl: '../../../',
  themeColor: '#000',
  description: 'Aplicación web para el control de materiales de la empresa Novum Energy'
}
const development = {
  ...production, // traer todas las keys de la const de production,
  rootUrl: `http://localhost:3000/`,
  baseUrl: `http://localhost:3000${production.appBaseDir}/`
}

export default {
  development,
  production
}

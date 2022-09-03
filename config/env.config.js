const production = {
  appName: 'Control de materiales', // Nombre de la aplicación html - title
  appBaseDir: '/material-control', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
  baseUrl: '../../../',
  themeColor: '#000',
  description: 'Aplicación web para el control de materiales de la empresa Novum Energy',
  urlApi: 'https://colombiawebapp1.novumenergy.com/api/index.php',
  url: 'https://colombiawebapp1.novumenergy.com'
};
const development = {
  ...production, // traer todas las keys de la const de production,
  rootUrl: 'http://localhost:3000/',
  baseUrl: `http://localhost:3000${production.appBaseDir}/`,
  urlApi: '/api',
  url: 'https://colombiawebapp1.novumenergy.com'
};
export default {
  development,
  production
};

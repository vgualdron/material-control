const production = {
  appName: 'Control de materiales', // Nombre de la aplicación html - title
  appBaseDir: '/material-control', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
  baseUrl: '../../../', //Url del apí por default
}

const development = {
  ...production, // traer todas las keys de la const de production,
  rootUrl: `http://localhost:3000/`,
  baseUrl: `http://localhost:3000/${production.appBaseDir}/`
}

export default {
  development,
  production
}

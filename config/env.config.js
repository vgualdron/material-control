const production = {
  appName: 'Control de materiales', // Nombre de la aplicación html - title
  appBaseDir: '/material-control', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
<<<<<<< HEAD
  baseUrl: '../../../' //Url del apí por default
}

const development = {
  ...production, // spread,
  rootUrl: 'http://localhost:3000/',
  baseUrl: 'http://localhost:3000/material-control/'
=======
  baseUrl: '../../../'
}
const development = {
  ...production, // traer todas las keys de la const de production,
  rootUrl: `http://localhost:3000/`,
  baseUrl: `http://localhost:3000/${production.appBaseDir}/`
>>>>>>> 61cced6b8353627a20622a28d942d0ba3d1ef172
}

export default {
  development,
  production
}

const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './dist'; // apunta a la carpeta donde están los archivos compilados JS
const paths = {
  '@/*': ['*']
};

tsConfigPaths.register({
  baseUrl,
  paths
});
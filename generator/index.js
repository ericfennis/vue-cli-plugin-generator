module.exports = (api, options) => {

  const packageJson = require(api.resolve('package.json'));

  if (!packageJson.scripts.hasOwnProperty('make')) {
    console.log(packageJson);
    
    require('./init')(api, options)
  } else {
    require('./generator')(api, options)
  }
}
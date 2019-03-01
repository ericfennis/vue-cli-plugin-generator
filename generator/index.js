const _ = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: _.camelCase(string),
 pascalCase: _.upperFirst(_.camelCase(string)),
 kebabCase: _.kebabCase(string),
})

module.exports = (api, options) => {

  const packageJson = require(api.resolve('package.json'));

  if (!packageJson.scripts.hasOwnProperty('make')) {
    console.log(packageJson);
    
    require('./init')(api, options)
  } else {
    require('./generator')(api, options)
  }
}
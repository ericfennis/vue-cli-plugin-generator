const { camelCase, upperFirst, kebabCase } = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: camelCase(string),
 pascalCase: upperFirst(camelCase(string)),
 kebabCase: kebabCase(string),
})

module.exports = (api, options) => {

  const generatorConfig = require(api.resolve('generator.config.js'));
  const [ templateObject ] = generatorConfig.templates.filter(template => template.name === options.type);
  
  const templateFolderLocation = '.generator/templates/';

  let files = {};
  let { name } = templateObject;

  //Set namings
  if(options && options.name) {
    options.name = getNamings(options.name);
    name = options.name;
  }

  Object.keys(templateObject.template).forEach(target => {
    const resolveTemplateFile = api.resolve(templateFolderLocation + templateObject.template[target]);

    files[[eval('`'+target+'`')]] = eval('`'+resolveTemplateFile+'`');
  });
  
  api.render(files, {
    ...options
  });
}
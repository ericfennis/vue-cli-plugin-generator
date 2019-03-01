const _ = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: _.camelCase(string),
 pascalCase: _.upperFirst(_.camelCase(string)),
 kebabCase: _.kebabCase(string),
})

module.exports = (api, options) => {

  const generatorConfig = require(api.resolve('generator.config.js'));
  const templateObject = generatorConfig.templates.filter(template => template.name === options.type)[0];
  
  const templateFolderLocation = '.generator/templates/';

  let files = {};
  let name = templateObject.name;

  //Set namings
  if(options.hasOwnProperty('name')) {
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
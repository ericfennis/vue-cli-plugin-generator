const { camelCase, upperFirst, kebabCase } = require('lodash/string');

const getNamings = string => ({
 value: string,
 camelCase: camelCase(string),
 pascalCase: upperFirst(camelCase(string)),
 kebabCase: kebabCase(string),
})

module.exports = (api, options) => {
  const generatorConfig = require(api.resolve('generator.config.js')) || require(api.resolve('.generator/generator.config.js'));

  if (!(generatorConfig && generatorConfig.templates)) {
    throw 'No Template file found';
  }

  const templateObject = generatorConfig.templates.find(template => template.name === options.type);
  
  const templateFolderLocation = '.generator/templates/';

  if (templateObject) {
    let files = {};
    let { name } = templateObject;

    if(options.name) {
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

  } else {
    throw 'No Template selected';
  }
  
}
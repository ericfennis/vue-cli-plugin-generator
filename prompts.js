const path = require('path');

let questions = [];

module.exports = api => {
  if(api.scripts.make) {
    const generatorConfig = require(path.resolve(process.cwd()+'/generator.config.js'));

    if(generatorConfig) {
      
      const types = generatorConfig.templates.map(type => (
        {
          name: type.label,
          value: type.name,
        }
      ));
      
      // Check if file need to be renamed
      let renameFileQuestion = generatorConfig.templates.filter(type => type && type.renameFile);

      if(renameFileQuestion.length) {
        renameFileQuestion = renameFileQuestion.map(type => (
          {
            type: 'input',
            name: 'name',
            message: `Name for the ${type.label}?`,
            group: `${type.name}`,
            validate: input => !!input,
            when: answers => answers.type === `${type.name}`,
          }
        ));
      }
      const hasCustomPrompts = generatorConfig.templates.some(type => type.prompts);
      const allPromptsFromConfig = generatorConfig.templates.map(type => type.prompts)

      let customPrompts = [];

      if (hasCustomPrompts && allPromptsFromConfig && allPromptsFromConfig.length) {
        customPrompts = [].concat.apply([],allPromptsFromConfig);        
      }

      questions = [
        {
          type: 'list',
          name: 'type',
          message: 'What do you want to generate?',
          choices: [
            ...types
          ],
        },
        ...renameFileQuestion,
        ...customPrompts
      ]
    } else {
      throw 'No `generator.config.js` in you root folder.';
    }
  }
  
  return questions;
}

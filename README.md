# Vue CLI Plugin Generator

Vue CLI Plugin Generator is a Vue ClI plugin to generate (.vue)files in your project. For Example for scaffolding Vue Component files. The Plugin uses the buildin plugin generator of Vue CLI.

> Still in Alpha!

## Getting Started

Install the package:

```bash
vue add generator
```

```bash
yarn make
```

## Configure your template

To config the generator, you can use the `generator.config.js` in the root of the folder.

```javascript
module.exports = {
  templates: [
    {
      name: 'component',
      label: 'Component',
      template: {
         // Define your templates here, first array is the target location, the value is the location of the template, the default location is in ROOT/.generator/templates/.
         // You can also define multiple templates
        ['./src/components/${name.pascalCase}.vue']: 'component.vue'
      },
      renameFile: true, // can be true || false
      prompts: [
        // Config your custom questions
        {
          type: 'confirm',
          name: 'scoped',
          message: 'This component with scoped styling?',
          default: true,
          group: 'component',
          when: answers => answers.type === 'component',
        },
      ]
    },
  ]
}
```

In the `.generator/templates`folder you can place your templates for the generator. For example your Vue component.

## Templating files

The questions that are defined in the `generator.config.js`you can use to generate you templates. name`key in the questions you can use in the template files. For example the qeustion: Scoped styling. With [EJS](https://ejs.co/) used by Vue CLI you can make for example If-statements to generate part of your template.

``` vue
<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: '<%%= name.pascalCase %%>',
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<%% if (scoped) { %%>
<style scoped>
<%% } else { %%>
<style>
<%% } %%>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

## Issues

Please help with improving this package, if you have issues you can make the issues in the [issues](https://github.com/ericfennis/vue-cli-plugin-generator/issues) tab.

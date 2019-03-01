const { clientAddonConfig } = require('@vue/cli-ui')

module.exports = {
  ...clientAddonConfig({
    id: 'org.vue.webpack.vue-cli-plugin-structure-generator',
    port: 8042
  })
}

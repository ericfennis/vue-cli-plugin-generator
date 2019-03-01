module.exports = (api, options) => {

  if(api.invoking) {
    api.extendPackage({
      scripts: {
        make: 'vue invoke generator'
      }
    })
  }

  api.render('./template')
}
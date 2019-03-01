module.exports = (api, options) => {
  // WIP
  console.log(api.getCwd());
  api.registerCommand('make', args => {
    console.log(args);
    console.log("Make!")
  })
}
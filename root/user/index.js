var counter = 0;

module.exports.render = function(req) {
  return 'This site has been visited '+ counter++ +' times.' + req.urlArgs[0]
}

module.exports.settings = {
  urlArgs: 1
}

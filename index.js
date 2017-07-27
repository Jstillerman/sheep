const express = require('express')
const app = express()

const fs = require('fs')

const defaultSettings = {
  urlArgs: 0
}

function explore(path){
  fs.readdir(path, (err, items) => {
    items.forEach(item => {
      if(item == 'index.js'){
        var mod = require("./"+path)
        register(path, mod.render, (mod.settings || defaultSettings))
      }
      if(fs.lstatSync('root/'+item).isDirectory()) explore(path+"/"+item)
    })
  })
}

function register(path, fn, settings) {
  console.log("Registering", "/"+path+getRestOfPath(settings));
  app.get("/"+path+getRestOfPath(settings), function(req, res) {
    req.urlArgs = Object.values(req.params)
    res.send(fn(req))
  })
}


function getRestOfPath(settings){
  var path = "/"
  for(var i = 0; i < settings.urlArgs; i++){
    path += ":var"+i+"/"
  }
  return path
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

explore('root')


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

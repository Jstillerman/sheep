#!/usr/bin/env node

const express = require('express')
const app = express()

const fs = require('fs')

const defaultSettings = {
  urlArgs: 0
}

function explore(newpath){
  let path = basepath + newpath
  fs.readdir(path, (err, items) => {
    if(!items) console.log("Path:", path, "appears to be empty")
    items.forEach(item => {
      if(item == 'index.js'){
        var mod = require(path)
        register(newpath, mod.render, (mod.settings || defaultSettings))
      }
      if(fs.lstatSync(path+'/'+item).isDirectory()) explore(newpath +"/"+item)
    })
  })
}

function register(path, fn, settings) {
  console.log("Registering", path+getRestOfPath(settings));
  app.get(path+getRestOfPath(settings), function(req, res) {
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


var basepath = process.cwd()+"/"+process.argv[2]
explore("")


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

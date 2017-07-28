# Sheep
Attaching javascript functions to HTTP endpoints with no configuration

## Installation
```
git clone https://github.com/jstillerman/sheep
cd sheep
npm install -g . 
```
## Usage
`sheep [directory name]`
In that directory there needs to be an index.js that exports a render function.

_index.js_
```
module.exports.render = function(req) {
  return "Hello World"
}
```

Then proceed to add folders, each with their own index.js files in them, corresponding to each endpoint you would like.

## Settings
You can also export a settings object in an endpoint.
```
module.exports.settings = {
  urlArgs: 1 // One url argument ie /users/{argument}
}
```

In that settings object you can express options for the endpoint


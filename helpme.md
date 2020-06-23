Serverless with netlify
(Tutorial from Traversy Media)[https://www.youtube.com/watch?v=drJwMlD9Mjo]

(netlify lambda)[https://github.com/netlify/netlify-lambda] - tool for using AWS Functions on netlify
server-side tasks

Install netlify-lambda package on npm
create functions folder in root of app
create netlify.toml file with shown content

netlify.toml:

```
[build]
    functions = "lambda"
```

(One install has finished) update package.json with simple build and serve scripts:

```javascript
{
  ...
  "scripts": {
    "lambda-serve": "netlify-lambda serve functions",
    "lambda-build": "netlify-lambda build functions",
    ...
  },
  ...
  "dependencies": {
    "netlify-lambda": "^1.6.3"
  }
}

```

### General Purpose Lambda functions

within functions folder, create a getusers.js file (this function will get user data from github)

in getusers.js create a function that exports a handler method with the basic given syntax:

```javascript
// sample syntax:
exports.handler = function(event, context, callback) {
  // your server-side functionality
};
```

in getusers.js:

```javascript
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World",
  });
};
```

run lambda serve to build the lambda folder and start a server

```bash
$ npm run lambda serve
```

the newly built lambda folder now has a copy of getusers.js (minified by the serve process) which we will want to upload to netlify (we shouldn't change this file on our end: our changes go to **our** copy of getusers.js in the functions directory)

Tool: API requests with Postman to quickly check responses
-- added in functionalify to get a name variable from the body and respond with Hello, <Name>:

```javascript
exports.handler = function(event, context, callback) {
  const { name } = JSON.parse(event.body);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Hello " + name }),
  });
};
```

Postman is then sent with a header (Content-Type application/json)
and a body: {"name": "Some name"}

<hr>

### To deal with github in particular:

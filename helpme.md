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

Get a client ID and secret (github developer settings)
These allow the app to retrieve more than the 60/hr limitation github puts on api requests.
(5000 requests/hr on API requests using Basic Authentication or OAuth)

Client ID: public identifier for apps
Client Secret: Secret only known to application and authorization server

These IDs and Secrets can be used to create OAuth "tokens" used to Authorize apps
(also possible to get tokens from github site directly)

### Query Parameter Auth:

- Uses URL parameters to authenticate user request:

Request URL:

https://api.github.com/users?client_id=<**given client id**>&client_secret=<**given client secret**>
**Note: as of May 21, 2020 authentication to the API is disallowed
(Github Notice)[https://developer.github.com/v3]**

e.g.:

```javascript
fetch(
  `https://api.github.com/users?client_id=<**given client id**>&client_secret=<**given client secret**>`
);
```

### Token Auth:

- Uses a pre-registered token (associated with a github user/app) to authenticate

Request URL:

https://api.github.com/users

uses init obect to authenticate

```javascript
fetch("https://api.github.com/users", {
  headers: {
    Authorization: "token ***YOUR_GITHUB_TOKEN***",
  },
});
```

### Basic Auth:

- Uses a username and password to authenticate

Request URL:

https://api.github.com/users

uses init obect to authenticate

**Note: can encode user data to base64 before sending (second option)**

```javascript
const rawUsernameandPassword = "<GitHubUsername>:<GitHubPassword>";
let buffer = new Buffer(rawUsernameandPassword);
let base64Auth = buffer.toString("base64");
// let base64Auth = btoa(rawUsernameandPassword);  (For requests originating from a browser supporting btoa functionality)

fetch("https://api.github.com/users", {
  headers: {
    Authorization: "Basic " + rawUsernameandPassword, // first option
    Authorization: "Basic " + base64Auth, // second option
  },
});
```

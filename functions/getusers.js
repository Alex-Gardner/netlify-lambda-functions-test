import axios from "axios";

exports.handler = function(event, context, callback) {
  const { API_CLIENT_ID, API_CLIENT_SECRET, API_CLIENT_TOKEN } = process.env;
  // personal secrets and tokens have been sent via process.env to netlify
  const API_URL = "https://api.github.com/users";
  const initObject = {
    method: "GET",
    headers: {
      //   Authorization: "Basic " + basicAuthInfo,
      Authorization: "token " + API_CLIENT_TOKEN,
    },
  };
  //Send user response
  const send = (body) => {
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify(body),
    });
  };
  const getUsers = () => {
    axios
      .get(API_URL, initObject)
      .then((res) => send(res.data))
      .catch((err) => send(err));
  };
  if (event.httpMethod === "GET") {
    getUsers();
  }
};

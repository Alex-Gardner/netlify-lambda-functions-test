import axios from "axios";

exports.handler = function(event, context, callback) {
  const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;
  // set process env variables during deployment
  const API_URL = "https://api.github.com/users";
  const API_CLIENT_ID = "1702d37d87758d91f3fc";
  const API_CLIENT_SECRET = "5468008171adb1816e7436d1d05a997ec422958e";
  const initObject = {
    method: "GET",
    headers: {
      //   Authorization: "Basic " + basicAuthInfo,
      Authorization: "token 4824a24539b592518d566ff58de0a27f06da41d3",
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

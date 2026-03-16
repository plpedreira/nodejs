import http from "node:http"; // indica que o http faz parte do node, que não é uma dependência externa

import { jsonHandler } from "./middlewares/jsonHandler.js";
import { routeHandler } from "./middlewares/routeHandler.js";

async function listener(request, response) {
  await jsonHandler(request, response);
  console.log(request.body);
  routeHandler(request, response);
}

// const server = http.createServer((request, response) => {
//   jsonHandler...
// })

// const server = http.createServer(listener);

// server.listen(3333);

// * o código comentado acima é resumido pelo código abaixo:
http.createServer(listener).listen(3333);
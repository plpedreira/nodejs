import { Database } from "../database/database.js";
import { routes } from "../routes/index.js";
import { extractQueryParams } from "../utils/extractQueryParams.js";

const database = new Database();

export function routeHandler(request, response) {
  const route = routes.find((route) => {
    // console.log("route:", route);
    // console.log("test:", route.path.test(request.url));

    // return route.method === request.method && route.path === request.url;
    return route.method === request.method && route.path.test(request.url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);
    // console.log("routeParams:", routeParams);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    // console.log("extractQueryParams", extractQueryParams(query));
    request.query = query ? extractQueryParams(query) : {};

    return route.controller({ request, response, database });
  }

  return response.writeHead(404).end();
}
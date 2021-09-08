import { logger } from "./logger.js";

export default class Routes {
  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end("hello world");
  }

  async options(request, response) {
    response.writeHead(204);
    response.end("Ola mundo");
  }

  async post(request, response) {
    logger.info("ae");
    response.end("hello world");
  }
  async get(request, response) {
    logger.info("ae");
    response.end("hola mundo");
  }

  handler(request, response) {
    response.setHeader("Access-Control-Allow-origin", "*");
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;
    chosen.apply(this,[request,response])
  }
}

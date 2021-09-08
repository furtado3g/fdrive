import { describe, test, expect, jest } from "@jest/globals";
import Routes from "../../src/routes.js";
describe("Routes Test Suite", () => {
  test("#setSocketInstance", () => {
    const routes = new Routes();
    const ioObject = {
      to: (id) => ioObject,
      emit: (event, message) => {},
    };
    routes.setSocketInstance(ioObject);
    expect(routes.io).toStrictEqual(ioObject);
  });

  describe("#Handler method Test", () => {
    const defaultParams = {
      request: {
        headers: {
          "Content-type": "multipart/form-data",
        },
        method: "POST",
        body: {},
      },
      response: {
        setHeader: jest.fn(),
        writeHead: jest.fn(),
        end: jest.fn(),
      },
      values: () => Object.values(defaultParams),
    };

    test("given a inexistent route it should choose default route async", () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "inexistent";
      await routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
    test("it should set any request with CORS enabled", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "inexistent";
      await routes.handler(...params.values());
      expect(params.response.setHeader).toHaveBeenCalledWith(
        "Access-Control-Allow-origin",
        "*"
      );
    });
    test("give method OPTIONS it should chose option route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "OPTIONS";
      await routes.handler(...params.values());
      expect(params.response.writeHead).toHaveBeenCalledWith(204);
      expect(params.response.end).toHaveBeenCalledWith("Ola mundo");
    });
    test("give method GET it should chose get route", async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "GET";
      await routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hola mundo");
    });
    test("give method POST it should chose post async route", () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "POST";
      await routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
  });
});

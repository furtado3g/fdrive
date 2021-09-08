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

    test("given a inexistent route it should choose default route", () => {
      const routes = new Routes();
      const params = {
        ...defaultParams,
      };
      params.request.method = "inexistent";
      routes.handler(...params.values());
      expect(params.response.end).toHaveBeenCalledWith("hello world");
    });
    test.todo("it should set any request with CORS enabled");
    test.todo("give method OPTIONS it should chose option route");
    test.todo("give method GET it should chose get route");
    test.todo("give method POST it should chose post route");
  });
});

const request = require("supertest");
const app = require("../index");
const mockedRequest = require("request-promise");

// mocking request promise module
jest.mock("request-promise");

// test suite
describe("GET /generate-report", () => {
  beforeEach(() => {
    // default mock response
    mockedRequest.mockResolvedValue([]);
  });

  //   ensuring that the response is with csv
  it("should respond with csv", async () => {
    const response = await request(app).get("/generate-report");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/csv");
  });

  //   ensuring that the csv has the correct headers
  it("should have correct headers", async () => {
    const response = await request(app).get("/generate-report");
    const expectedHeaders = "User,FirstName,LastName,Date,Holding,Value";

    expect(response.text).toContain(expectedHeaders);
  });

  //   ensuring that errors are handled
  it("should handle errors", async () => {
    mockedRequest.mockImplementation(() =>
      Promise.reject(new Error("Network error"))
    );

    const response = await request(app).get("/generate-report");

    expect(response.status).toBe(500);
    expect(response.text).toContain("error with report");

    mockedRequest.mockReset();
  });

  //   clearing all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

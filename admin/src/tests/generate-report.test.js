const request = require("supertest");
const app = require("../index");

// test suite
describe("GET /generate-report", () => {
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
});

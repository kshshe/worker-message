const path = require("path");
const serveStatic = require("serve-static");
const http = require("http");

var serve = serveStatic(path.resolve("file://", __dirname, "../example"), {
  index: ["index.html", "index.htm"]
});
var server = http.createServer(function onRequest(req, res) {
  serve(req, res);
});
server.listen(5001);

describe("Worker Side", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:5001");
  });

  it('should display "google" text on page', async () => {
    await expect(page).toMatch("google");
  });
});

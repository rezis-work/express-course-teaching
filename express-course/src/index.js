const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end();
  }
});

server.listen(3001, () => {
  console.log(`server on http://localhost:3001`);
});

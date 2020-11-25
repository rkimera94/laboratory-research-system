const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    if (req.method === "GET") {
      console.log("i am a get method");
    }
    res.write("iam listening at ome page");
    res.end();
  } else if (req.url === "/another") {
    res.write("iam listening at another route ");
    res.end();
  } else {
    res.write("I am listening");
    res.end();
  }
});
server.listen(3040, () => {
  console.log("server started on port 3040...");
});

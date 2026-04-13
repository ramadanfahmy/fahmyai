import fetch from "node-fetch";
import http from "http";

const PORT = 3000;

const server = http.createServer(async (req, res) => {

  if (req.url === "/api" && req.method === "GET") {

    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      message: "API شغالة تمام ✅",
      joke: data.value
    }));

  } else {
    res.writeHead(404);
    res.end("Not Found");
  }

});

server.listen(PORT, () => {
  console.log(Server شغال على http://localhost:${PORT});
});

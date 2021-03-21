const express = require("express");
const app = express();

const PORT = process.env.PORT || 3010;

app.get("/", async function (req, res) {
  return res.send(req.url);
});

app.listen(PORT, () =>
  console.info(`[info] Listening at http://localhost:${PORT}`)
);

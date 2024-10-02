import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as http from "http";
import * as fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

// If not found, doesn't throw an error.
const clientLocation = getClientLocation(__dirname);
app.use(express.static(clientLocation));
console.log(clientLocation);

app.get("/api/gnomes", (_, res) => {
  const data = JSON.parse(fs.readFileSync("./assets/data.json"));
  res.json(data);
});

// Provide configuration on /config

// Other requests should be redirected to our Angular client
app.use("*", (_req, res) => {
  res.sendFile(`${clientLocation}/index.html`);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

function getClientLocation(dirname) {
  const parts = [...dirname.split("/")];
  parts.pop();
  parts.push("client", "browser");

  return parts.join("/");
}

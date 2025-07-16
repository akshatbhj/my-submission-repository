require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Entry = require("./models/entry");

const app = express();

app.use(express.static("dist"));

// Middlewares
app.use(express.json());
// app.use(morgan("tiny"));

morgan.token("body", (req) => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => {
    const normalized = entries.map((entry) => ({
      id: entry.id,
      name: entry.Name, // Capital → lowercase
      number: entry.Number, // Capital → lowercase
    }));
    response.json(normalized);
  });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(404).json({ error: "Name and number are required" });
  }

  const newEntry = new Entry({
    name: name,
    number: number,
  });

  newEntry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((err) => {
      console.error("Error saving entry:", err.message);
      res.status(500).json({ error: "Failed to save entry" });
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

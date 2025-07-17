require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Entry = require("./models/entry");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
// app.use(morgan("tiny"));

// Middlewares
morgan.token("body", (req) => {
  return req.method === "POST" || req.method === "PUT"
    ? JSON.stringify(req.body)
    : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Get all entries from database
app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => {
    const normalized = entries.map((entry) => ({
      id: entry.id,
      name: entry.name, // Capital → lowercase
      number: entry.number, // Capital → lowercase
    }));
    response.json(normalized);
  });
});

// Get single entry from database
app.get("/api/persons/:id", (request, response, next) => {
  Entry.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })

    .catch((error) => next(error));
});

// Save an entry in database
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

// Remove an entry from database
app.delete("/api/persons/:id", (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Update an entry in database
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Entry.findById(request.params.id)
    .then((entry) => {
      if (!entry) {
        return response.status(404).end();
      }

      entry.name = name;
      entry.number = number;

      return entry.save().then((updatedEntry) => {
        response.json(updatedEntry);
      });
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const phonebookRouter = require("express").Router();
const Entry = require("../models/entry");

phonebookRouter.get("/", (request, response) => {
  Entry.find({}).then((entries) => {
    const normalized = entries.map((entry) => ({
      id: entry.id,
      name: entry.name,
      number: entry.number,
    }));
    response.json(normalized);
  });
});

phonebookRouter.get("/:id", (request, response, next) => {
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

phonebookRouter.post("/", (request, response) => {
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
    .catch((error) => {
      logger.error(error.message);
      response.status(500).json({ error: "Failed to save entry" });
    });
});

phonebookRouter.delete("/:id", (request, response, next) => {
  Entry.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

phonebookRouter.put("/:id", (request, response, next) => {
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

module.exports = phonebookRouter;

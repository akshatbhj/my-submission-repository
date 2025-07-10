const express = require("express");

const app = express();

const personsList = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const numberOfPersons = personsList.length;

app.get("/", (request, response) => {
  response.send("<h1>Hello From Backend</h1>");
});

app.get("/info", (request, response) => {
  const timestamp = new Date();

  response.send(
    `<p>Phonebook has info for ${numberOfPersons} people</p> <p>${timestamp}</p> `
  );
});

app.get("/api/persons", (request, response) => {
  //   console.log(response);
  response.json(personsList);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

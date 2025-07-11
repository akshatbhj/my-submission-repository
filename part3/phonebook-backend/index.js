const express = require("express");
const morgan = require("morgan");

const app = express();

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

let personsList = [
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

function generateRandomId(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

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

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = personsList.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  person = personsList.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  const id = generateRandomId(numberOfPersons + 1, 999);

  person.id = id;
  personsList = personsList.concat(person);

  response.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

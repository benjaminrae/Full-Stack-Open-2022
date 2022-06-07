const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);
app.use(cors());

morgan.token("body", (request, response) => {
    return JSON.stringify(request.body);
});
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/", (request, response) => {
    response.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: "name missing" });
    } else if (!body.number) {
        return response.status(400).json({ error: "number missing" });
    } else if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const maxId =
        persons.length > 0
            ? Math.max(...persons.map((person) => person.id))
            : 0;

    const person = {
        id: maxId + 1,
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);
    console.log(persons);
    response.json(person);
});

app.get("/info", (request, response) => {
    const numberPersons = `There are ${persons.length} entries in the phonebook`;
    const date = new Date();
    response.send(`<p>${numberPersons}</p><p>${date}</p>`);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on PORT ${PORT}`);

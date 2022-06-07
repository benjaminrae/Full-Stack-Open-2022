const express = require("express");
const app = express();

app.use(express.json());

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
    const id = request.params.id;
    const person = persons.find((person) => {
        console.log(
            person.id,
            typeof person.id,
            id,
            typeof id,
            person.id === id
        );
        return person.id === id;
    });
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
    console.log(person);
    response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const person = request.body;
    console.log(person);
    response.json(person);
});

app.get("/info", (request, response) => {
    const numberPersons = `There are ${persons.length} entries in the phonebook`;
    const date = new Date();
    response.send(`<p>${numberPersons}</p><p>${date}</p>`);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on PORT ${PORT}`);

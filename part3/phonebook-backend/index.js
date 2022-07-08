const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/mongo");
const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);
app.use(cors());

morgan.token("body", (request, response) => {
    return JSON.stringify(request.body);
});

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((result) => {
            response.json(result);
        })
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Person.findById({ _id: id })
        .then((result) => {
            if (result) {
                response.json(result);
            } else {
                response.status(404).json({ error: "id not found" });
            }
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    console.log(id);
    Person.findByIdAndDelete({ _id: id })
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({ error: "name missing" });
    } else if (!body.number) {
        return response.status(400).json({ error: "number missing" });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then((result) => response.json(result))
        .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const updatedPerson = request.body;
    const id = updatedPerson.id;
    Person.findByIdAndUpdate({ _id: id }, updatedPerson, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((result) => response.json(result))
        .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
    Person.find({})
        .then((result) => {
            const numberPersons = `There are ${result.length} entries in the phonebook`;
            const date = new Date();
            response.send(`<p>${numberPersons}</p><p>${date}</p>`);
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on PORT ${PORT}`);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === "CaseError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

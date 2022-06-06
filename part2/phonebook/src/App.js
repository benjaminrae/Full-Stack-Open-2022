import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/persons").then((response) => {
            console.log("promise fulfilled");
            setPersons(response.data);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        if (checkDuplicateNames) {
            setNewName("");
            setNewNumber("");
            return alert(`${newName} is already added to phonebook`);
        }
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };
        axios.post("http://localhost:3001/persons", person).then((response) => {
            console.log("response", response);
            setPersons(persons.concat(response.data));
            setNewName("");
            setNewNumber("");
        });
    };

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setNewSearch(event.target.value);
    };

    const checkDuplicateNames = persons.some(
        (person) => person.name === newName
    );

    const personsToShow = persons.filter((person) =>
        newSearch
            ? person.name.toLowerCase().includes(newSearch.toLowerCase())
            : person
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newSearch} onChange={handleSearchChange} />
            <div>
                <h2>add a new</h2>
            </div>
            <PersonForm
                nameValue={newName}
                nameOnChange={handleNameChange}
                numberValue={newNumber}
                numberOnChange={handleNumberChange}
                buttonOnClick={addPerson}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;

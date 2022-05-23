import { useState } from "react";

const Name = (props) => {
    return (
        <li>
            {props.name} - {props.number}
        </li>
    );
};

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
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
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
            <div>
                filter shown with
                <input value={newSearch} onChange={handleSearchChange} />
            </div>
            <div>
                <h2>add a new</h2>
            </div>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>
                        Add name
                    </button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {personsToShow.map((person) => (
                    <Name
                        key={person.id}
                        name={person.name}
                        number={person.number}
                    />
                ))}
            </ul>
        </div>
    );
};

export default App;

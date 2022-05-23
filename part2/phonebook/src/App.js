import { useState } from "react";

const Name = (props) => {
    return (
        <li>
            {props.name} - {props.number}
        </li>
    );
};

const Filter = (props) => {
    return (
        <div>
            filter shown with
            <input value={props.value} onChange={props.onChange} />
        </div>
    );
};

const PersonForm = (props) => {
    return (
        <form>
            <div>
                name:{" "}
                <input value={props.nameValue} onChange={props.nameOnChange} />
            </div>
            <div>
                number:{" "}
                <input
                    value={props.numberValue}
                    onChange={props.numberOnChange}
                />
            </div>
            <div>
                <button type="submit" onClick={props.buttonOnClick}>
                    Add name
                </button>
            </div>
        </form>
    );
};

const Persons = (props) => {
    return (
        <ul>
            {props.persons.map((person) => (
                <Name
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />
            ))}
        </ul>
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

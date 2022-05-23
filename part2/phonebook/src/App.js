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
        { name: "Arto Hellas", number: 666555444, id: 1 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

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

    const checkDuplicateNames = persons.some(
        (person) => person.name === newName
    );

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map((person) => (
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

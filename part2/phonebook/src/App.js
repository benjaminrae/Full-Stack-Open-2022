import { useState } from "react";

const Name = (props) => {
    return <li>{props.name}</li>;
};

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
    const [newName, setNewName] = useState("");

    const addPerson = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        const person = {
            name: newName,
            id: persons.length + 1,
        };
        setPersons(persons.concat(person));
        setNewName("");
    };

    const handlePhonebookChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name:{" "}
                    <input value={newName} onChange={handlePhonebookChange} />
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
                    <Name key={person.id} name={person.name} />
                ))}
            </ul>
        </div>
    );
};

export default App;

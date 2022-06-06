import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import personService from "./services/persons";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    return <div className="notification">{message}</div>;
};

const Error = ({ message }) => {
    if (message === null) {
        return null;
    }
    return <div className="error">{message}</div>;
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
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        console.log("effect");
        personService.getAll().then((response) => {
            console.log("promise fulfilled");
            setPersons(response);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target);
        if (checkDuplicateNames) {
            window.confirm(
                `${newName} is already in the phonebook, do you want to replace the old number with a new one? `
            )
                ? updatePhoneNumber(newName, newNumber)
                : console.log("cancelled");
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`${newName} updated`);
            setTimeout(() => {
                setNotificationMessage(null);
            }, 5000);
            return;
        }
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };
        personService.create(person).then((response) => {
            console.log("response", response);
            setPersons(persons.concat(response));
            setNewName("");
            setNewNumber("");
        });
        setNotificationMessage(`${newName} added`);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    const deletePerson = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target.value);
        const targetUrl = `http://localhost:3001/persons/${event.target.value}`;
        window.confirm(`Delete ${event.target.name}?`)
            ? axios
                  .delete(targetUrl)
                  .then((response) => {
                      console.log(response);
                      personService
                          .getAll()
                          .then((response) => setPersons(response));
                      setNotificationMessage(`${event.target.name} deleted`);
                      setTimeout(() => {
                          setNotificationMessage(null);
                      }, 5000);
                  })
                  .catch((error) => {
                      setErrorMessage(
                          `${event.target.name} already deleted from server`
                      );
                      setTimeout(() => {
                          setErrorMessage(null);
                      }, 5000);
                      personService
                          .getAll()
                          .then((response) => setPersons(response));
                  })
            : setErrorMessage(`Delete cancelled`);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
        console.log("Delete cancelled");
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

    const updatePhoneNumber = (name, newNumber) => {
        const personToUpdate = persons.find((person) => person.name === name);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
            .update(updatedPerson.id, updatedPerson)
            .then((returnedPerson) => {
                setPersons(
                    persons.map((person) =>
                        person.id !== updatedPerson.id ? person : returnedPerson
                    )
                );
            });
    };

    const personsToShow = persons.filter((person) =>
        newSearch
            ? person.name.toLowerCase().includes(newSearch.toLowerCase())
            : person
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
            <Error message={errorMessage} />
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
            <Persons persons={personsToShow} deleteOnClick={deletePerson} />
        </div>
    );
};

export default App;

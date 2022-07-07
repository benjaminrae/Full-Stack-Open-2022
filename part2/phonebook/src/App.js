import { useState, useEffect } from "react";
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
        personService.getAll().then((response) => {
            console.log("promise fulfilled");
            setPersons(response);
        });
    }, []);

    const addPerson = (event) => {
        event.preventDefault();

        if (checkDuplicateNames) {
            window.confirm(
                `${newName} is already in the phonebook, do you want to replace the old number with a new one? `
            )
                ? updatePhoneNumber(newName, newNumber)
                : setErrorMessage("update cancelled");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
            return;
        }
        const person = {
            name: newName,
            number: newNumber,
        };
        personService
            .create(person)
            .then((response) => {
                setPersons(persons.concat(response));
                setNewName("");
                setNewNumber("");
                setNotificationMessage(`${newName} added`);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
            });
    };

    const deletePerson = (event) => {
        event.preventDefault();
        if (window.confirm(`Delete ${event.target.name}?`)) {
            personService
                .remove(event.target.value)
                .then((response) => {
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
                });
        } else {
            setErrorMessage(`Delete cancelled`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            console.log("Delete cancelled");
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value);
    };

    const checkDuplicateNames = persons
        ? persons.some((person) => person.name === newName)
        : null;

    const updatePhoneNumber = (name, newNumber) => {
        const personToUpdate = persons.find((person) => person.name === name);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
            .update(updatedPerson.id, updatedPerson)
            .then((returnedPerson) => {
                personService.getAll().then((result) => {
                    setPersons(result);
                    setNotificationMessage(`${newName} updated`);
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
                });
            })
            .catch((error) => {
                setErrorMessage(error.response.data.error);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
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

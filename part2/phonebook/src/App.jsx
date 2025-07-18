import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import SearchFilter from "./components/SearchFilter";
import PersonForm from "./components/PersonForm";
import Phonebook from "./components/Phonebook";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // console.log("effect");
    phonebookService.getAll().then((response) => {
      console.log("promise fullfilled");
      setPersons(response);
    });
  }, []);

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the number?`
        )
      ) {
        phonebookService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons((prev) =>
              prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
            );
            setNewName("");
            setNewNumber("");
            setNotification(`${updatedPerson.name} was updated successfully.`);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((error) => {
            alert(`Update failed: ${error.response?.data || error.message}`);
          });
      }
      return;
    }

    phonebookService
      .create(personObject)
      .then((newPerson) => {
        setPersons((prev) => prev.concat(newPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`${newPerson.name} was added successfully.`);
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((error) => {
        setNotification(`${error}`);
        setTimeout(() => setNotification(null), 5000);
      });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(
          () =>
            setPersons((persons) =>
              persons.filter((person) => person.id !== id)
            ),
          setNotification(`${name} was deleted successfully.`),
          setTimeout(() => setNotification(null), 5000)
        )
        .catch((error) => {
          setNotification(
            `Failed to delete ${name}. It might already be removed.`
          );
          setTimeout(() => setNotification(null), 5000);
          console.log(error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Notification message={notification} />
      <h1>Phonebook</h1>
      <SearchFilter value={filter} onChange={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm
        onSubmit={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook
        filteredPersons={filteredPersons}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;

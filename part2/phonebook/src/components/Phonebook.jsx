import React from "react";

function Phonebook({ filteredPersons, handleDelete }) {
  return (
    <div>
      {filteredPersons.length === 0 ? (
        <p>No match found</p>
      ) : (
        filteredPersons.map((person, index) => (
          <div key={index}>
            <p>
              {person.name} : {person.number}{" "}
              <button onClick={() => handleDelete(person.id, person.name)}>
                Delete
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Phonebook;

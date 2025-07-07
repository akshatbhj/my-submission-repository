import React from "react";

function Phonebook({filteredPersons}) {
  return (
    <div>
      {filteredPersons.length === 0 ? (
        <p>No match found</p>
      ) : (
        filteredPersons.map((person, index) => (
          <p key={index}>
            {person.name} : {person.number}
          </p>
        ))
      )}
    </div>
  );
}

export default Phonebook;

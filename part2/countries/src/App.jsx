import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState("");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country..", error);
      });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([]);
      return;
    }

    const matches = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(matches);
  }, [search, allCountries]);

  const handleSearchChange = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      Find Countries :{" "}
      <input type="text" onChange={handleSearchChange} value={search} />
      <div>
        {filtered.length === 0 && search && <p>No results found.</p>}

        {filtered.length > 10 && (
          <p>Too many matches, please narrow your search.</p>
        )}

        {filtered.length > 1 && filtered.length <= 10 && (
          <ul>
            {filtered.map((country) => (
              <li key={country.cca3}>{country.name.common}</li>
            ))}
          </ul>
        )}

        {filtered.length === 1 && (
          <div>
            <h1>{filtered[0].name.common}</h1>
            <h3>Official Name : {filtered[0].name.official}</h3>
            <p>Capital: {filtered[0].capital?.[0]}</p>
            <p>Area: {filtered[0].area}</p>
            <p>Population: {filtered[0].population}</p>
            <h2>Languages</h2>
            {Object.values(filtered[0].languages).map((language) => {
              return <li>{language}</li>;
            })}
            <div>
              <img src={filtered[0].flags.png} alt={filtered[0].flags.alt} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

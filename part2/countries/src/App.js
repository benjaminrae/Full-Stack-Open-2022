import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

const Profile = (props) => {
    console.log(props, props.country, "profile props");

    const countryProfile = props.countryS.results.map((result, key) => (
        <div key={key}>
            <h2>{result.name.common}</h2>
            <p>capital {result.capital}</p>
            <p>area {result.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(result.languages).map((language, key) => (
                    <li key={key}>{language}</li>
                ))}
            </ul>
            <img src={result.flags.png} alt="" />
        </div>
    ));
    return <>{countryProfile}</>;
};

const App = () => {
    const [newSearch, setNewSearch] = useState("");
    const [countries, setCountries] = useState([]);

    let countriesToShow;
    useEffect(() => {
        console.log("effect");
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            console.log("promise fulfilled");
            setCountries(response.data);
        });
    }, []);

    countriesToShow = countries.filter((country) =>
        newSearch
            ? country.name.common
                  .toLowerCase()
                  .includes(newSearch.toLowerCase())
            : "Too many results"
    );

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setNewSearch(event.target.value);
    };

    return (
        <>
            <Search onChange={handleSearchChange} />
            <SearchResults
                results={countriesToShow}
                updateSearch={setNewSearch}
            />
        </>
    );
};

export default App;

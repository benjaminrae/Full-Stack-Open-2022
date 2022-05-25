import { useState, useEffect } from "react";
import axios from "axios";
const Search = (props) => {
    return (
        <div>
            find countries: <input onChange={props.onChange} />
        </div>
    );
};

const Results = (props) => {
    console.log(props, "props");
    const results = props.results.map((result) => result.name.common);
    let resultsToDisplay;
    if (results.length > 10) {
        resultsToDisplay = "Too many results, please narrow your search";
    } else if (results.length > 1) {
        resultsToDisplay = results.map((result, key) => (
            <li key={key}>{result}</li>
        ));
    } else {
        resultsToDisplay = props.results.map((result, key) => (
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
    }

    return <ul>{resultsToDisplay}</ul>;
};

const App = () => {
    const [newSearch, setNewSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesCopy, setCountriesCopy] = useState([]);

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
    console.log(countriesCopy, "copy");

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setNewSearch(event.target.value);
    };

    console.log(countriesToShow, "toshow");
    return (
        <>
            <Search onChange={handleSearchChange} />
            <Results results={countriesToShow} />
        </>
    );
};

export default App;

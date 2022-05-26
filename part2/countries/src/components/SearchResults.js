import { useState } from "react";

const SearchResults = (props) => {
    const [showCountryIndex, setShowCountryIndex] = useState(0);

    let results = props.results.map((result) => result);
    console.log(results, "results");
    let targetCountry;
    let resultsToDisplay;

    const handleShowClick = (event) => {
        event.preventDefault();
        console.log("button clicked", event.target.value);
        results = props.results.filter(
            (result) => result.name.common === event.target.value
        );
        console.log(results, "TC");
        props.updateSearch(event.target.value);
    };

    if (results.length > 10) {
        resultsToDisplay = "Too many results, please narrow your search";
    } else if (results.length > 1) {
        resultsToDisplay = results.map((result, key) => (
            <li key={key}>
                {result.name.common}{" "}
                <button onClick={handleShowClick} value={result.name.common}>
                    show
                </button>
            </li>
        ));
    } else {
        resultsToDisplay = results.map((result, key) => (
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

    return (
        <>
            <ul>{resultsToDisplay}</ul>
        </>
    );
};

export default SearchResults;

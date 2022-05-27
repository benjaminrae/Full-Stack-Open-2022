import { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
    const [weather, setWeather] = useState("");
    console.log(weather);

    useEffect(() => {
        console.log("effect weather");
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${props.apiKey}&units=metric`
            )
            .then((response) => {
                console.log("promise fulfilled weather");
                setWeather(response.data);
            });
    }, []);

    return weather ? (
        <>
            <h3>Weather in {props.capital}</h3>
            <p>temperature {weather.main.temp} Celcius</p>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    ) : (
        ""
    );
};

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
                <h4>languages</h4>
                <ul>
                    {Object.values(result.languages).map((language, key) => (
                        <li key={key}>{language}</li>
                    ))}
                </ul>
                <img src={result.flags.png} alt="" />
                <Weather capital={result.capital} apiKey={props.apiKey} />
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

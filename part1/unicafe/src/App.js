import { useState } from "react";

const Title = () => {
    return <h1>Unicafe</h1>;
};

const Header = (props) => {
    return <h2>{props.header}</h2>;
};

const Button = (props) => {
    return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
    console.log(props);
    return (
        <p>
            {props.text} : {props.counter}
        </p>
    );
};

const Footer = () => {
    return <footer>Thanks for coming to Unicafe!</footer>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const headers = ["Give feedback", "Statistics"];

    return (
        <>
            <Title />
            <Header header={headers[0]} />
            <Button handleClick={() => setGood(good + 1)} text="GOOD" />
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text="NEUTRAL"
            />
            <Button handleClick={() => setBad(bad + 1)} text="BAD" />
            <Header header={headers[1]} />
            <Statistics counter={good} text="Good" />
            <Statistics counter={neutral} text="Neutral" />
            <Statistics counter={bad} text="Bad" />

            <Footer />
        </>
    );
};

export default App;

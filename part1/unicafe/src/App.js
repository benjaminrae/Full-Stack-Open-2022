import { useState } from "react";

const Title = () => {
    return <h1>Unicafe</h1>;
};

const Header = (props) => {
    return <h2>{props.header}</h2>;
};

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistic = (props) => {
    console.log(props, "here");
    return (
        <p>
            {props.text} : {props.counter}
        </p>
    );
};

const StatisticsGroup = (props) => {
    const { good, neutral, bad, total, average, percent } = props.statistics;
    if (total) {
        return (
            <div>
                <Statistic counter={good} text="Good" />
                <Statistic counter={neutral} text="Neutral" />
                <Statistic counter={bad} text="Bad" />
                <Statistic counter={total} text="Total" />
                <Statistic counter={average ? average : 0} text="Average" />
                <Statistic
                    counter={percent ? percent + "%" : 0 + "%"}
                    text="Positive"
                />
            </div>
        );
    }
    return (
        <div>
            <p>No feedback given</p>
        </div>
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
    const total = good + neutral + bad;
    const headers = ["Give feedback", "Statistics"];
    const average = (good + bad * -1) / total;
    const percent = (good / (good + neutral + bad)) * 100;
    let statisticsObject = {
        good: good,
        neutral: neutral,
        bad: bad,
        total: total,
        average: average,
        percent: percent,
    };

    const handleClick = (button) => {
        switch (button) {
            case "good":
                setGood(good + 1);
                break;
            case "neutral":
                setNeutral(neutral + 1);
                break;
            case "bad":
                setBad(bad + 1);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Title />
            <Header header={headers[0]} />
            <Button onClick={() => handleClick("good")} text="GOOD" />
            <Button onClick={() => handleClick("neutral")} text="NEUTRAL" />
            <Button onClick={() => handleClick("bad")} text="BAD" />
            <Header header={headers[1]} />
            <StatisticsGroup statistics={statisticsObject} />
            {/* <Statistic counter={good} text="Good" />
            <Statistic counter={neutral} text="Neutral" />
            <Statistic counter={bad} text="Bad" />
            <Statistic counter={total} text="Total" />
            <Statistic counter={average ? average : 0} text="Average" />
            <Statistic
                counter={percent ? percent + "%" : 0 + "%"}
                text="Positive"
            /> */}

            <Footer />
        </>
    );
};

export default App;

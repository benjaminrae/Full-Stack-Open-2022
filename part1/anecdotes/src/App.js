import { useState } from "react";

const Title = () => <h1>Anecdotes</h1>;

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>;
};

const Anecdote = (props) => {
    return <p>{props.selectedAnecdote}</p>;
};

const VoteCount = (props) => {
    return <p>has {props.voteCount} votes</p>;
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
    ];

    const [selected, setSelected] = useState(0);

    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const votesCopy = [...votes];

    const randomNumber = () => Math.floor(Math.random() * anecdotes.length);

    const handleAnecdoteClick = () => {
        setSelected(randomNumber());
    };

    const handleVoteClick = () => {
        votesCopy[selected] += 1;
        setVotes(votesCopy);
        console.log(votesCopy);
        console.log(votes);
    };

    return (
        <>
            <Title />
            <Anecdote selectedAnecdote={anecdotes[selected]} />
            <VoteCount voteCount={votes[selected]} />
            <Button onClick={() => handleVoteClick()} text="Vote" />
            <Button
                onClick={() => handleAnecdoteClick()}
                text="Generate Random Anecdote"
            />
        </>
    );
};

export default App;

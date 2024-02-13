import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <td>{props.text}</td>
          <td>&nbsp;</td>
          <td>{props.value}</td>
        </tr>
      </thead>
    </table>
  );
};

const Statistics = (props) => {
  const totalFeedback = props.good + props.neutral + props.bad;
  const avgFeedback = totalFeedback / 3;
  const positiveFeedback = (props.good / totalFeedback) * 100;
  if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
    return (
      <div>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <p>average {avgFeedback}</p>
        <p>positive {positiveFeedback} %</p>
      </div>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const anecdotesVote = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(anecdotesVote);
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [anectodeWithMostVotes, setAnectodeWithMostVotes] = useState("");
  const [mostVotes, setMostVotes] = useState(0);

  const handleGoodFeedback = () => {
    const goodFeedback = good + 1;
    setGood(goodFeedback);
  };

  const handleNeutralFeedback = () => {
    const neutralFeedback = neutral + 1;
    setNeutral(neutralFeedback);
  };

  const handleBadFeedback = () => {
    const badFeedback = bad + 1;
    setBad(badFeedback);
  };

  const displayAnecdote = () => {
    const newAnectodeIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newAnectodeIndex);
  };

  const voteAnecdote = () => {
    const anecdotesVoteCopy = [...vote];
    anecdotesVoteCopy[selected] += 1;
    setVote(anecdotesVoteCopy);
    const anecdoteWithHighestVote = Math.max(...vote);
    const indexOfAnecdoteWithHighestVote = vote.findIndex(
      (item) => item === anecdoteWithHighestVote
    );
    if (indexOfAnecdoteWithHighestVote !== -1) {
      const displayAnecdoteWithMostVotes =
        anecdotes[indexOfAnecdoteWithHighestVote];
      setAnectodeWithMostVotes(displayAnecdoteWithMostVotes);
    }
    if (vote[selected] === anecdoteWithHighestVote) {
      setMostVotes(anecdoteWithHighestVote + 1);
    }
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={displayAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <p>{anectodeWithMostVotes}</p>
      <p>has {mostVotes} votes</p>
    </div>
  );
};

export default App;

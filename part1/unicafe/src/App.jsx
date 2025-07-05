import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;

  if (totalFeedback === 0) {
    return <p>No Feedbacks given yet.</p>;
  }

  const averageFeedback = (good * 1 + bad * -1) / totalFeedback;
  const positivePercentage = (good / totalFeedback) * 100;

  return (
    <div>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text="Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={totalFeedback} />
      <StatisticsLine text="Average" value={averageFeedback.toFixed(2)} />
      <StatisticsLine
        text="Positive "
        value={`${positivePercentage.toFixed(2)} %`}
      />
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  return (
    <>
      <div>
        <h1>Give Feedback!</h1>
        <Button onClick={goodHandler} text="Good" />
        <Button onClick={neutralHandler} text="Neutral" />
        <Button onClick={badHandler} text="Bad" />
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
}

export default App;

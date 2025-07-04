import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => setGood(good + 1);
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  const totalFeedback = good + neutral + bad;

  return (
    <>
      <div>
        <h1>Give Feedback!</h1>

        <Button onClick={goodHandler} text="Good" />
        <Button onClick={neutralHandler} text="Neutral" />
        <Button onClick={badHandler} text="Bad" />

        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {totalFeedback}</p>
      </div>
    </>
  );
}

export default App;

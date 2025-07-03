const course = "Half Stack application development";
const exercises1 = 10;
const exercises2 = 7;
const exercises3 = 14;
const part1 = "Fundamentals of React";
const part2 = "Using props to pass data";
const part3 = "State of a component";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <>
      <h4>{props.part}</h4>
      <p>{props.exercise}</p>
    </>
  );
};

const Content = () => {
  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <>
      <p>Total Number of exercises {props.exercises}</p>
    </>
  );
};

const App = () => {
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;

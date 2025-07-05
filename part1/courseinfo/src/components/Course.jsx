const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        const totalExercises = course.parts.reduce(
          (sum, part) => sum + part.exercises,
          0
        );

        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map((part) => (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}
            <h4>Total exercises: {totalExercises}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Course;

const Header = ({ course }) => {
  const initialValue = 0;
  const totalSum = course.parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, initialValue);
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map((part) => (
          <Content key={part.id} part={part} />
        ))}
      </ul>
      <h3>total of {totalSum} exercises</h3>
    </div>
  );
};

const Content = ({ part }) => {
  return (
    <div>
      <li>
        {part.name} {part.exercises}
      </li>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <Header key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Course;

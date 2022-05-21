const Course = (courses) => {
    const { name, parts } = courses.course;

    const total = Object.values(parts).reduce(
        (total, object) => total + object.exercises,
        0
    );

    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total sum={total} />
        </>
    );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ parts }) => (
    <>
        {parts.map((part) => (
            <Part key={part.id} part={part} />
        ))}
    </>
);

export default Course;

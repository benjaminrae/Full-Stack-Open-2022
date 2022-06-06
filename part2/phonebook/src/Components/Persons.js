import Name from "./Name";

const Persons = (props) => {
    return (
        <ul>
            {props.persons.map((person) => (
                <Name
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />
            ))}
        </ul>
    );
};

export default Persons;

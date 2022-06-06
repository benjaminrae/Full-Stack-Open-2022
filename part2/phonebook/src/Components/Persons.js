import Name from "./Name";

const Persons = (props) => {
    return (
        <ul>
            {props.persons.map((person) => (
                <Name
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    number={person.number}
                    deleteOnClick={props.deleteOnClick}
                />
            ))}
        </ul>
    );
};

export default Persons;

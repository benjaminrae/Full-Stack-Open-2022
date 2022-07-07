const Name = (props) => {
    return (
        <li>
            {props.name} - {props.number}{" "}
            <button
                onClick={props.deleteOnClick}
                value={props.id}
                name={props.name}
            >
                delete
            </button>
        </li>
    );
};

export default Name;

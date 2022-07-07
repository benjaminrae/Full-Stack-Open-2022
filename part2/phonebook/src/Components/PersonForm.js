const PersonForm = (props) => {
    return (
        <form>
            <div>
                name:{" "}
                <input value={props.nameValue} onChange={props.nameOnChange} />
            </div>
            <div>
                number:{" "}
                <input
                    value={props.numberValue}
                    onChange={props.numberOnChange}
                />
            </div>
            <div>
                <button type="submit" onClick={props.buttonOnClick}>
                    Add name
                </button>
            </div>
        </form>
    );
};

export default PersonForm;

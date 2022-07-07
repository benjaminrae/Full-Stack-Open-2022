const Search = (props) => {
    return (
        <div>
            find countries: <input onChange={props.onChange} />
        </div>
    );
};

export default Search;

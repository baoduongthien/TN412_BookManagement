
function SearchBook({ name, setName, setCurrentPage }) {

    function handleChange(e) {
        setName(e.target.value);
        setCurrentPage(0);
    }

    return (
        <>
            <form>
                <label htmlFor="name" style={{marginRight: '4px'}}>Tên sách: </label>
                <input type="text" id="name" placeholder="Tìm theo tên sách..." value={name} onChange={(e) => handleChange(e)} />
            </form>
        </>
    );
}

export default SearchBook;
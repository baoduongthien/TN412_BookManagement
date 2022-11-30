
import { useEffect, useState } from "react";

function Pagination({
    currentPage,
    totalPages,
    onFetchNewData,
}) {

    function createPagesArray(totalPages) {
        let res = [];
        for (let i = 1; i <= totalPages; i++) {
            res.push(i);
        }
        return res;
    }

    const [ pageButtons, setPageButtons ] = useState(() => createPagesArray(totalPages));
    const [ currentButton, setCurrentButton ] = useState(() => currentPage + 1);

    useEffect(() => {
        const pages = createPagesArray(totalPages);
        let tempNumberOfPages = [ ...pages ];
        
        if (pages.length > 5) {
            if (currentButton >= 1 && currentButton <= 3) {
                tempNumberOfPages = [1, 2, 3, 4, '...', totalPages];
            }
            if (currentButton >= 4 && currentButton <= totalPages - 2) {
                const sliced1 = pages.slice(currentButton - 2, currentButton);
                const sliced2 = pages.slice(currentButton, currentButton + 1);
    
                tempNumberOfPages = [1, '...', ...sliced1, ...sliced2, '...', totalPages];
            }
            if (currentButton > totalPages - 2) {
                const sliced = pages.slice(totalPages - 4);

                tempNumberOfPages = [1, '...', ...sliced];
            }
        }

        setPageButtons(tempNumberOfPages);
    }, [currentButton, totalPages]);
    
    function handleClick(page) {
        onFetchNewData(page);
        setCurrentButton(page + 1);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">

                <li className="page-item"><button className="page-link" onClick={() => handleClick(0)}>{'<<'}</button></li>

                <li className="page-item">
                    <button
                        className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
                        onClick={() => handleClick(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        {'<'}
                    </button>
                </li>

                {pageButtons.map((value, index) => (
                    <li key={index} className="page-item">
                        <button
                            className={`page-link ${currentPage === value - 1 && 'active'} ${value === '...' && 'disabled'}`}
                            onClick={() => (value !== '...') && handleClick(value - 1)}
                            disabled={value === '...'}
                        >
                            {value}
                        </button>
                    </li>
                ))}

                <li className="page-item">
                    <button
                        className={`page-link ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
                        onClick={() => handleClick(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        {'>'}
                    </button>
                </li>

                <li className="page-item"><button className="page-link" onClick={() => handleClick(totalPages - 1)}>{'>>'}</button></li>
            </ul>
        </nav>
    );
}

export default Pagination;
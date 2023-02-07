import { observer } from "mobx-react-lite";
import _ from 'lodash';
import { useCallback, useState } from 'react';
import rootStore from "../../store";

const Pagination = observer(({
    minPage,
    maxPage,
    prevPage,
    nextPage,
    currentPage,
    onPageChange,
    onNextPage,
    onPrevPage
}) => {
    const [inputValue, setInputValue] = useState(10);
    const debounceFn = useCallback(_.debounce(onPageChange, 1000), []);
    
    const onInputChange = (e) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        debounceFn(value);
    };

    console.log(maxPage)
    return (
        <div>
            Текущая страница: <b>{currentPage}</b>/{maxPage}<br />
            
            <button disabled={!prevPage} onClick={onPrevPage}>{'<'}</button>
            <button disabled={!nextPage} onClick={onNextPage}>{'>'}</button>
            <br/>
            <p>Число записей:</p>
            <input value={inputValue} type='number' onChange={onInputChange} /><br />
        </div>
    )
})

export default Pagination;

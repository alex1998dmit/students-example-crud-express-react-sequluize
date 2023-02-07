import { useState } from "react";
import rootStore from "../../store";
import { observer } from "mobx-react-lite";

const FilterOptions = observer(() => {
    const [inputs, setInputs] = useState({
        title_book: '',
        pages: 0,
        AuthorId: null,
        PublishHouseId: null
    })
    const [pageFilter, setPageFilter] = useState('less');

    const onInputChange = (key, value) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }))
    };

    const handlePageFilter = (value) => {
        setPageFilter(value);
    }

    const filter = async () => {
        rootStore.booksStore.udpateFilters(inputs);
        await rootStore.booksStore.fetchBooks();
    }

    const reset = async () => {
        rootStore.booksStore.reset();
        await rootStore.booksStore.fetchBooks();
    }

    return (
        <div>
            <h2>Фильтры</h2>
            Название книги <input placeholder="Название книги" onChange={(e) => onInputChange('title_book', e.currentTarget.value)} value={inputs.title_book} /><br />
            {/* Число страниц <select value={pageFilter} onChange={(e) => handlePageFilter(e.target.value)}>
                <option  value="less">{'<'}</option>
                <option  value="more">{'>'}</option>
                <option  value="equal">{'='}</option>
            </select><br /> */}
            {/* <input onChange={(e) => onInputChange('pages', e.currentTarget.value)} value={inputs.pages} /><br /> */}
            Издатель <select value={inputs.PublishHouseId} onChange={(e) => onInputChange('PublishHouseId', e.target.value)}>
                {rootStore.housesStore.houses.map((house) => (
                    <option key={house.id} value={house.id}>{house.publish}(г. {house.city})</option>
                ))}
            </select><br />
            Автор <select value={inputs.AuthorId} onChange={(e) => onInputChange('AuthorId', e.target.value)}>
                {rootStore.authorsStore.authors.map((author) => (
                    <option key={author.id} value={author.id}>{author.name_author}</option>
                ))}
            </select><br />
            <br />
            <button onClick={reset}>Сбросить</button>
            <button onClick={filter}>Отфильтровать</button>
            <br />
            <br />
        </div>
    );
})

export default FilterOptions;

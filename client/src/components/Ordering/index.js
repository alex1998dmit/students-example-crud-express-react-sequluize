import { observer } from "mobx-react-lite";
import { useState } from "react";
import rootStore from "../../store";

const Ordering = observer(() => {
    const [orderName, setOrderName] = useState('title_book');
    const [orderDirection, setOrderDirection] = useState('ASC');

    const handleChangeOrderName = (value) => {
        setOrderName(value);
        rootStore.booksStore.updateOrderField(value);
    }

    const handleChangeOrderDirection = (value) => {
        setOrderDirection(value);
        rootStore.booksStore.updateOrderDirection(value);
    }

    const order = async () => {
        await rootStore.booksStore.fetchBooks();
    }

    return (
        <div>
            <h2>Сортировка</h2>
            <div>
                <select value={orderName} onChange={(e) => handleChangeOrderName(e.target.value)}>
                    <option value={'id'}>ID книги</option>
                    <option value={'title_book'}>Названию книги</option>
                    <option value={'AuthorId'}>Автору</option>
                    <option value={'pages'}>Страницам</option>
                    <option value={'PublishHouseId'}>Издателю</option>
                </select>
                <select value={orderDirection} onChange={(e) => handleChangeOrderDirection(e.target.value)}>
                    <option value={'ASC'}>Возрастанию</option>
                    <option value={'DESC'}>Убыванию</option>
                </select>
                <button onClick={order}>
                    Отсортировать
                </button>
            </div>
            <br />
        </div>
    )
})

export default Ordering;

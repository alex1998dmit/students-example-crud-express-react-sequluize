import { useEffect, useState } from "react";
import rootStore from "../../store";

const { observer } = require("mobx-react-lite");

const CreateBook = observer(() => {
    const [inputs, setInputs] = useState({
        title_book: '',
        pages: 0,
        AuthorId: null,
        PublishHouseId: null
    })

    useEffect(() => {
        if (rootStore.authorsStore.authors.length > 0) {
            setInputs((prev) => ({
                ...prev,
                AuthorId: rootStore.authorsStore.authors[0].id
            }))
        }

    }, [rootStore.authorsStore.authors]);

    useEffect(() => {
        if (rootStore.housesStore.houses.length > 0) {
            setInputs((prev) => ({
                ...prev,
                PublishHouseId: rootStore.housesStore.houses[0].id
            }))
        }

    }, [rootStore.housesStore.houses]);

    const onInputChange = (key, value) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const save = async () => {
        await rootStore.booksStore.createBook(inputs);
        await rootStore.booksStore.fetchBooks();
    }

    if (rootStore.authorsStore.authors.length === 0 || rootStore.housesStore.houses.length === 0) {return null;}

    return (
        <div>
            <h2>Добавить книгу</h2>
            <input onChange={(e) => onInputChange('title_book', e.currentTarget.value)} value={inputs.title_book} placeholder="Название книги" /> <br />
            <input onChange={(e) => onInputChange('pages', e.currentTarget.value)} value={inputs.pages} /> <br />
            <select value={inputs.AuthorId} onChange={(e) => onInputChange('AuthorId', e.target.value)}>
                {rootStore.authorsStore.authors.map((author) => (
                    <option key={author.id} value={author.id}>{author.name_author}</option>
                ))}
            </select>
            <select value={inputs.PublishHouseId} defaultChecked={rootStore.housesStore.houses[0].id} onChange={(e) => onInputChange('PublishHouseId', e.target.value)}>
                {rootStore.housesStore.houses.map((house) => (
                    <option key={house.id} value={house.id}>{house.publish}(г. {house.city})</option>
                ))}
            </select>
            <button type='button' onClick={save}>Сохранить</button>
        </div>
    )
});

export default CreateBook;

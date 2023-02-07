import { useState, useEffect } from "react";
import rootStore from "../../store";
import axios from "axios";

const { observer } = require("mobx-react-lite");

const SelectedBook = observer(() => {
    const [inputs, setInputs] = useState({
        title_book: '',
        pages: 0,
        AuthorId: 0,
        PublishHouseId: 0
    })

    useEffect(() => {
        const updObj = {
            title_book: rootStore.booksStore?.selected?.title_book || '',
            pages: rootStore.booksStore?.selected?.pages || 0,
            AuthorId: rootStore.booksStore?.selected?.AuthorId || 0,
            PublishHouseId: rootStore.booksStore?.selected?.PublishHouseId || 0
        } 
        setInputs(updObj);
    }, [rootStore.booksStore.selected])
    
    
    const onInputChange = (key, value) => {
        setInputs(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const save = async () => {
        await rootStore.booksStore.saveSelectedBook(inputs);
        await rootStore.booksStore.fetchBooks();
    }

    if (!rootStore.booksStore.selected) return null;

    return (
        <form>
            <h2>О книге</h2>
            <input onChange={(e) => onInputChange('title_book', e.currentTarget.value)} value={inputs.title_book} /> <br />
            <input onChange={(e) => onInputChange('pages', e.currentTarget.value)} value={inputs.pages} /> <br />
            <select value={inputs.AuthorId} onChange={(e) => onInputChange('AuthorId', e.target.value)}>
                {rootStore.authorsStore.authors.map((author) => (
                    <option key={author.id} value={author.id}>{author.name_author}</option>
                ))}
            </select>
            <select value={inputs.PublishHouseId} onChange={(e) => onInputChange('PublishHouseId', e.target.value)}>
                {rootStore.housesStore.houses.map((house) => (
                    <option key={house.id} value={house.id}>{house.publish}(г. {house.city})</option>
                ))}
            </select>
            <button type='button' onClick={save}>Сохранить</button>
        </form>  
    )
})

export default SelectedBook;

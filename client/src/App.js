import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [houses, setHouses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [inputs, setInputs] = useState({
    title_book: '',
    pages: 0,
    AuthorId: 0,
    PublishHouseId: 0
  })
  const [newInputs, setNewInputs] = useState({
    title_book: '',
    pages: 0,
    AuthorId: 0,
    PublishHouseId: 0
  })

  useEffect(() => {
    const start = async () => {
      const { data: { books} } = await axios.get('http://localhost:3000/books');
      const { data: { authors} } = await axios.get('http://localhost:3000/authors');
      const { data: { houses} } = await axios.get('http://localhost:3000/publish_houses');
      setBooks(books);
      setAuthors(authors);
      setHouses(houses);
    }

    start();
  }, []);


  const open = (document) => {
    setSelected(document);
    setInputs(prev => ({
      ...prev,
      ...document
    }))
  }

  const onInputChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const onNewInputChange = () => {
    setNewInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const save = async () => {
    await axios.patch(`http://localhost:3000/books/${selected.id}`, inputs);
    setBooks(prev => prev.map((colBook) => colBook.id === inputs.id ? inputs : colBook))
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>code_book</td>
            <td>title_book</td>
            <td>code_author</td>
            <td>pages</td>
            <td>code_publish</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title_book}</td>
              <td>{book.AuthorId}</td>
              <td>{book.pages}</td>
              <td>{book.PublishHouseId}</td>
              <td><button onClick={() => open(book)}>o</button></td>
              <td><button>x</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {selected && (
          <form>
            <h2>О книге</h2>
            <input onChange={(e) => onInputChange('title_book', e.currentTarget.value)} value={inputs.title_book} /> <br />
            <input onChange={(e) => onInputChange('pages', e.currentTarget.value)} value={inputs.pages} /> <br />
            <select value={inputs.AuthorId} onChange={(e) => onInputChange('AuthorId', e.target.value)}>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>{author.name_author}</option>
              ))}
            </select>
            <select value={inputs.PublishHouseId} onChange={(e) => onInputChange('PublishHouseId', e.target.value)}>
              {houses.map((house) => (
                <option key={house.id} value={house.id}>{house.publish}(г. {house.city})</option>
              ))}
            </select>
            <button type='button' onClick={save}>Сохранить</button>
          </form>  
        )}
      </div>
      <div>
        <h2>Добавить книгу</h2>
        <input onChange={(e) => onInputChange('title_book', e.currentTarget.value)} value={inputs.title_book} /> <br />
        <input onChange={(e) => onInputChange('pages', e.currentTarget.value)} value={inputs.pages} /> <br />
        <select value={inputs.AuthorId} onChange={(e) => onInputChange('AuthorId', e.target.value)}>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>{author.name_author}</option>
          ))}
        </select>
        <select value={inputs.PublishHouseId} onChange={(e) => onInputChange('PublishHouseId', e.target.value)}>
          {houses.map((house) => (
            <option key={house.id} value={house.id}>{house.publish}(г. {house.city})</option>
          ))}
        </select>
        <button type='button' onClick={save}>Сохранить</button>
      </div>
    </div>
  );
}

export default App;

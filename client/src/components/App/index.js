import { useState, useEffect } from 'react';
import axios from 'axios';
import rootStore from '../../store';
import BooksTable from '../BooksTable';
import { observer } from 'mobx-react-lite';
import SelectedBook from '../SelectedBook';
import CreateBook from '../CreateBook';
import FilterOptions from '../FilterOptions';
import Ordering from '../Ordering';

const App = observer(() => {
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

  useEffect(() => {
    const start = async () => {
        await rootStore.authorsStore.fetchAuthors();
        await rootStore.booksStore.fetchBooks();
        await rootStore.housesStore.fetchHouses();
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

//   const onNewInputChange = () => {
//         setInputs(prev => ({
//       ...prev,
//       [key]: value
//     }))
//   }

  const save = async () => {
    await axios.patch(`http://localhost:3000/books/${selected.id}`, inputs);
    setBooks(prev => prev.map((colBook) => colBook.id === inputs.id ? inputs : colBook))
  }

  return (
    <>
        <CreateBook />
        <FilterOptions />
        <Ordering />
        <BooksTable />
        <SelectedBook />
        <h2>Работа выполнена: Дмитриевой Елизаветой</h2>
    </>
  );
})

export default App;

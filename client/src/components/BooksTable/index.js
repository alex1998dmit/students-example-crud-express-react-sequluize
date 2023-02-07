import {observer} from 'mobx-react-lite'
import rootStore from '../../store';
import Pagination from '../Pagination';

const BooksTable = observer(() => {
    return (
        <>
            <h2>
                Таблица
            </h2>
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
                    {rootStore.booksStore.books.map((book) => (
                        <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title_book}</td>
                        <td>{book.AuthorId}</td>
                        <td>{book.pages}</td>
                        <td>{book.PublishHouseId}</td>
                        <td><button onClick={() => rootStore.booksStore.setSelected(book)}>o</button></td>
                        <td><button onClick={() => rootStore.booksStore.deleteBook(book.id)}>x</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                minPage={1}
                maxPage={rootStore.booksStore.pagesAmount}
                currentPage={rootStore.booksStore.page}
                onPageChange={(newPage) => rootStore.booksStore.updateLimit(newPage)}
                nextPage={!!rootStore.booksStore.nextPage}
                prevPage={!!rootStore.booksStore.prevPage}
                onNextPage={rootStore.booksStore.changePageNext}
                onPrevPage={rootStore.booksStore.changePageBack}
            />
        </>
    )
})

export default BooksTable;

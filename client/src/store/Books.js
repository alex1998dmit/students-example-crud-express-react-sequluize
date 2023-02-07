import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios";

class BooksStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.books = [];
        this.selected = null;
        this.limit = 10;
        this.offset = 0;
        this.page = 1;
        this.AuthorId = null;
        this.PublishHouseId = null;
        this.title_book = null;
        this.ordering = 'id';
        this.orderDirection = 'DESC';
        this.nextPage = false;
        this.prevPage = false;
        this.total = 0;
        makeAutoObservable(this, { rootStore: false })
    }

    udpateFilters = (filter) => {
        console.log(filter);
        this.AuthorId = filter.AuthorId ?? this.AuthorId;
        this.PublishHouseId = filter.PublishHouseId ?? this.PublishHouseId;
        this.title_book = filter.title_book ?? this.title_book;
    }

    updateOrderDirection = (newVal) => {
        this.orderDirection = newVal;
    }

    updateOrderField = (newVal) => {
        this.ordering = newVal;
    }

    updateLimit = async (limit) => {
        this.limit = limit;
        await this.fetchBooks();
    }

    reset = () => {
        this.AuthorId = null;
        this.PublishHouseId = null;
        this.title_book = null;
    }

    fetchBooks = async () => {
        console.log(this.AuthorId, this.PublishHouseId, this.title_book)
        const { data: { data, nextPage, total, previousPage } } = await axios.get(`http://localhost:3000/books`, {
            params: {
                page: this.page,
                ...(this.AuthorId && { AuthorId: this.AuthorId }),
                ...(this.PublishHouseId && { PublishHouseId: this.PublishHouseId }),
                ...(this.title_book && { title_book: this.title_book }),
                ordering: this.ordering,
                orderDirection: this.orderDirection,
                limit: this.limit,
            }
        });
        runInAction(() => {
            this.books = data;
            this.total = total;
            this.nextPage = nextPage;
            this.prevPage = previousPage;
        })
    }

    changePageBack = async () => {
        this.page = this.page - 1;
        await this.fetchBooks();
    }

    changePageNext = async () => {
        this.page = this.page + 1;
        await this.fetchBooks();
    }

    createBook = async (inputs) => {
        const { data: { book: { id } } } = await axios.post('http://localhost:3000/books', inputs)
    }

    updateSelectedBook = (book) => {
        this.books.map((bookCol) => bookCol.id === this.selected.id ?
            { ...bookCol, ...book } :
            bookCol
        )
    }

    setSelected = (book) => {
        this.selected = book;
    }

    saveSelectedBook = async (inputs) => {
        await axios.patch(`http://localhost:3000/books/${this.selected.id}`, inputs);
    }

    changePage = async (newPage) => {
        this.page = newPage;
        await this.fetchBooks();
    }

    deleteBook = async (id) => {
        await axios.delete(`http://localhost:3000/books/${id}`);
        await this.fetchBooks();
    }

    get pagesAmount() {
        return Math.ceil(this.total / this.limit)
    }
}

export default BooksStore;

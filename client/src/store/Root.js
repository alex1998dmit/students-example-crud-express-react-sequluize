import AuthorsStore from "./Authors";
import BooksStore from "./Books";
import HousesStore from "./Houses";

class RootStore {
    constructor() {
        this.housesStore = new HousesStore(this);
        this.authorsStore = new AuthorsStore(this);
        this.booksStore = new BooksStore(this);
    }
}

export default RootStore;

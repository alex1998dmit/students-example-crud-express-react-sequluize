import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios";

class AuthorsStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authors = [];
        makeAutoObservable(this, { rootStore: false })
    }

    fetchAuthors = async () => {
        const { data: { authors} } = await axios.get('http://localhost:3000/authors');
        runInAction(() => {
            this.authors = authors;
        })
    }
}

export default AuthorsStore;

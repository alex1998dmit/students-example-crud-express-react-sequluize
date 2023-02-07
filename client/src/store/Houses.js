import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios";

class HousesStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.houses = [];
        makeAutoObservable(this, { rootStore: false })
    }

    fetchHouses = async () => {
        const { data: { houses} } = await axios.get('http://localhost:3000/publish_houses');
        runInAction(() => {
            this.houses = houses;
        })
    }
}

export default HousesStore;

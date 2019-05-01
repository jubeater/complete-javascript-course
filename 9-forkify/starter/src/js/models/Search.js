import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(){
    const key = '3b0cdce4641f6840f059b3b7461f3037';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}

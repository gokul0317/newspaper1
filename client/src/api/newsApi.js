import axios from "axios";


const BASE_URL = "https://newsapi.org/v2";

class NewApiService {
    #apiKey = "a5813d56377844fa9514e3ad80fee1fa";

    fetchNewsFeed() {
        const URL = `${BASE_URL}/top-headlines?country=us&category=business&apiKey=${this.#apiKey}`;
        return axios.get(URL);
    }

    searchNews(searchText) {
        const URL = `${BASE_URL}/everything?q=${searchText}&sortBy=popularity&apiKey=${this.#apiKey}`
        return axios.get(URL);
    }
}

export const newsApiService = new NewApiService()
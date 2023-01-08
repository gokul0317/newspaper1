import axios from "axios";
import { NEWS_API_BASE_URL } from "../utils/constant";

class NewApiService {
    #apiKey = "a5813d56377844fa9514e3ad80fee1fa";

    fetchNewsFeed() {
        const URL = `${NEWS_API_BASE_URL}/top-headlines?country=us&category=business&apiKey=${this.#apiKey}`;
        return axios.get(URL);
    }

    searchNews(searchText) {
        const URL = `${NEWS_API_BASE_URL}/everything?q=${searchText}&sortBy=popularity&apiKey=${this.#apiKey}`
        return axios.get(URL);
    }
}

export const newsApiService = new NewApiService();
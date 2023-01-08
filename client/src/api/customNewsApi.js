import axios from "axios";
import { APP_BASE_URL } from "../utils/constant";

class CustomNewsService {
    async getAllCustomNews(token) {
        return await axios.get(`${APP_BASE_URL}/news`, { headers: { Authorization: token } });
    }

    async saveCustomNews(customNews, token) {
        return await axios.post(`${APP_BASE_URL}/news`, customNews, { headers: { Authorization: token } });
    }

    async getBookmarks(token) {
        return await axios.get(`${APP_BASE_URL}/bookmark`, { headers: { Authorization: token } });
    }

    async addBookmarks(item, token) {
        return await axios.post(`${APP_BASE_URL}/bookmark`, item, { headers: { Authorization: token } });
    }

    async deleteBookmarks(id, token) {
        return await axios.delete(`${APP_BASE_URL}/bookmark/${id}`, { headers: { Authorization: token } });
    }
}

export const customNewsService = new CustomNewsService();

import axios from "axios";
import { APP_BASE_URL } from "../utils/constant";

export class UserService {

    async login({ email, password }) {
        const URL = `${APP_BASE_URL}/login`;
        const resp = await axios.post(URL, { email, password });
        return resp;
    }

    async register({ password, email, firstName, lastName }) {
        const URL = `${APP_BASE_URL}/register`;
        const resp = await axios.post(URL, { password, email, firstName, lastName });
        return resp;
    }

    async getProfile(token) {
        const URL = `${APP_BASE_URL}/profile/get`;
        const resp = await axios.get(URL, { headers: { Authorization: token } });
        return resp;
    }

    async updateprofile(token, { password, email, firstName, lastName }) {
        const URL = `${APP_BASE_URL}/profile/update`;
        const resp = await axios.put(URL, { password, email, firstName, lastName }, { headers: { Authorization: token } });
        return resp;
    }

}

export const userService = new UserService();

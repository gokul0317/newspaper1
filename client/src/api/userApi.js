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
        const resp =  await axios.post(URL, { password, email, firstName, lastName });
        return resp;
    }

    async profile(token) {
        const URL = `${APP_BASE_URL}/profile`;
        const resp =  await axios.get(URL, { Headers: { Authorization: token } });
        return resp;
    }

}

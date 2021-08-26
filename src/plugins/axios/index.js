import axios from "axios";
import interceptors from "./interceptors";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // params: {
    //     apiKey: process.env.VUE_APP_API_KEY,
    //     plot: "full",
    // }
});

interceptors(instance);

export default instance;

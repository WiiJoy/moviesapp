import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // params: {
    //     apiKey: process.env.VUE_APP_API_KEY,
    //     plot: "full",
    // }
});

export default instance;

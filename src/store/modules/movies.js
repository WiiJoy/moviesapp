import axios from "@/plugins/axios";

const moviesStore = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async fetchMovies(context) {
            console.log(context);

            const response = await axios.get("/", {
                params: {
                    i: "tt0111161"
                }
            });
            console.log(response);
        },
    },
};

export default moviesStore;

import IDs from "@/store/mock/imdb_top250";
import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializeResponse(movies) {
    return movies.reduce((acc, movie) => {
        acc[movie.imdbID] = movie;

        return acc;
    }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
    namespaced: true,
    state: {
        top250IDs: IDs,
        moviesPerPage: 12,
        currentPage: 1,
        movies: {},
    },
    getters: {
        slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({ currentPage }) => currentPage,
        moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        }
    },
    actions: {
        async fetchMovies({ getters, commit }) {
            try {
                const { currentPage, moviesPerPage, slicedIDs } = getters;
                // задаем начальный и конечный элементы для вывода из массива
                const from = (currentPage * moviesPerPage) - moviesPerPage;
                const to = currentPage * moviesPerPage;

                // создаем список для вывода
                const moviesToFetch = slicedIDs(from, to);

                // создание запроса на сервер для получения 12 итемов
                const requests = moviesToFetch.map((id) => axios.get(`/?i=${id}`));

                // получение ответа после отправки всех 12 запросов
                const response = await Promise.all(requests);
                const movies = serializeResponse(response);
                console.log(movies);
                // const response = await axios.get("/", {
                //     params: {
                //         i: "tt0111161"
                //     }
                // });
                commit(MOVIES, movies);
            } catch(err) {
                console.log(err);
            }
        },
    },
};

export default moviesStore;

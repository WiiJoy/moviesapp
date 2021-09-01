import IDs from "@/store/mock/imdb_top250";
import axios from "@/plugins/axios";
import mutations from "@/store/mutations";

function serializeResponse(movies) {
    return movies.reduce((acc, movie) => {
        acc[movie.imdbID] = movie;

        return acc;
    }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

const moviesStore = {
    namespaced: true,
    state: {
        top250IDs: IDs,
        moviesPerPage: 12,
        currentPage: 1,
        movies: {},
    },
    getters: {
        moviesList: ({ movies }) => movies,
        slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
        currentPage: ({ currentPage }) => currentPage,
        moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
        moviesLength: ({ top250IDs }) => Object.keys(top250IDs).length,
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
        [CURRENT_PAGE](state, value) {
            state.currentPage = value;
        },
        [REMOVE_MOVIE](state, index) {
            state.top250IDs.splice(index, 1);
        },
    },
    actions: {
        initMoviesStore: {
            handler({ dispatch }) {
                dispatch("fetchMovies");
            },
            root: true,
        },

        async fetchMovies({ getters, commit, dispatch }) {
            try {
                dispatch("toggleLoader", true, { root: true });
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
            } finally {
                dispatch("toggleLoader", false, { root: true });
            }
        },
        changeCurrentPage({ commit, dispatch }, page) {
            commit(CURRENT_PAGE, page);
            dispatch("fetchMovies");
        },
        removeMovie({ commit, dispatch, state }, id) {
            const index = state.top250IDs.findIndex(item => item === id);

            if (index !== -1) {
                commit(REMOVE_MOVIE, index);
                dispatch("fetchMovies");
            }
        }
    },
};

export default moviesStore;

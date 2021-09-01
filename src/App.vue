<template>
  <div id="app">
    <Loader />
    <PosterBG :poster="posterBg" />
    <Header />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBG from "@/components/PosterBG";
import MoviesPagination from "@/components/MoviesPagination";
import Loader from "@/components/Loader";
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBG,
    MoviesPagination,
    Loader,
    Header,
  },
  data: () => ({
    posterBg: "",
  }),
  computed: {
    ...mapGetters("movies", ["moviesList", "currentPage", "moviesPerPage", "moviesLength"]),
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    onChangePoster(poster) {
      console.log(poster);
      this.posterBg = poster;
    },
    onPageChanged(page) {
      console.log(this.$route);
      this.$router.push({ query: { page } });
      // this.changeCurrentPage(page);
    },
  },
  // created() {
  //   if (this.$route.query.page) {
  //     this.changeCurrentPage(Number(this.$route.query.page));
  //   }
  // },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>

<template>
  <div id="app">
    <PosterBG :poster="posterBg" />
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

export default {
  name: "App",
  components: {
    MoviesList,
    PosterBG,
    MoviesPagination,
  },
  data: () => ({
    posterBg: "",
  }),
  computed: {
    ...mapGetters("movies", ["moviesList", "currentPage", "moviesPerPage", "moviesLength"]),
  },
  methods: {
    ...mapActions("movies", ["changeCurrentPage"]),
    onChangePoster(poster) {
      console.log(poster);
      this.posterBg = poster;
    },
    onPageChanged(page) {
      this.changeCurrentPage(page);
    },
  },
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

<template>
  <div id="app">
    <PosterBG :poster="posterBg"/>
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination />
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
    ...mapGetters("movies", ["moviesList"]),
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"]),
    onChangePoster(poster) {
      console.log(poster);
      this.posterBg = poster;
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

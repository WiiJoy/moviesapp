<template>
    <header class="header">
        <BNavbar class="navbar" type="dark" variant="dark">
            <BContainer>
                <BNavbarBrand href="#">MovieDB</BNavbarBrand>
                <BNavForm>
                    <BFormInput
                        class="mr-sm-2 search-input"
                        placeholder="Search"
                        v-model="searchValue"
                        debounce="500"
                    ></BFormInput>
                </BNavForm>
            </BContainer>
        </BNavbar>
    </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Header",
    data: () => ({
        searchValue: "",
    }),
    watch: {
        searchValue: "onSearchValueChanged",
    },
    methods: {
        ...mapActions("movies", ["searchMovies", "fetchMovies", "toggleSearchState"]),
        onSearchValueChanged(val) {
            console.log(val);

            if (val) {
                this.searchMovies(val);
                this.toggleSearchState(true);
            } else {
                this.fetchMovies();
                this.toggleSearchState(false);
            }
            // this.searchMovies(val);
        },
    },
}
</script>

<style scoped>
.header {
    margin-bottom: 30px;
}
/* убирание маркера списка (почему отобразился?) */
.header li {
    list-style-type: none;
}
.navbar {
    background-color: rgba(0, 0, 0, 0.7) !important;
}
.search-input {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(0, 0, 0, 0.6);
}
.search-input:focus {
    box-shadow: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(0, 0, 0, 0.6);
    color: #fff;
}
</style>
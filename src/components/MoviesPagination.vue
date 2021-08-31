<template>
    <div class="movies-pagination d-flex justify-content-center">
        <BPagination 
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="total"
            prev-text="Prev"
            next-text="Next"
        />

        {{ currentPage }}
    </div>
</template>

<script>
export default {
    name: "MoviesPagination",
    data: () => ({
        currentPage: 1,
        total: 100,
        perPage: 12,

    }),
}
</script>

<style scoped>
.movies-pagination {
    margin-top: 30px;
}

.movies-pagination >>> .pagination .page-item .page-link {
    background-color: transparent;
    font-size: 12px;
    color: #fff;
    box-shadow: none;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
    border-color: #fff;
    background-color: #fff;
    color: #000;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
    color: lightgray;
}
</style>
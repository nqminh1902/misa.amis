<template lang="">
    <div class="pagination-count">
        <span class="pagination-count-title">Tổng số bản ghi/trang: </span>
        <span class="pagination-count-number">{{ currentPage }} </span>
        <div
            class="pagination-count-dropdown"
            @click="onTogglePagination"
            :class="[{ dropup: isPaginationActive }]"
        ></div>
        <ul class="pagination-dropdown-list" v-if="isPaginationActive">
            <li
                v-for="(page, index) in pageSize"
                :key="index"
                class="pagination-dropdown-item"
                @click="onPageActive(page)"
                :class="[page == currentPage && active]"
            >
                {{ page }}
                <div class="check-icon">
                    <i class="fa-solid fa-check"></i>
                </div>
            </li>
        </ul>
        <div
            class="overlay-feature"
            v-if="isPaginationActive"
            @click="onTogglePagination()"
        ></div>
    </div>
</template>
<script>
export default {
    name: "BaseDropdownPagin",
    watch: {
        // Chuyền pageSize hiện tại lên thằng cha
        currentPage() {
            this.$emit("pageSize", this.currentPage);
        },
    },
    methods: {
        /**
         * Thực hiện xử lý ẩn hiện dropdown department
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onTogglePagination() {
            this.isPaginationActive = !this.isPaginationActive;
        },
        /**
         * Thực hiện active giá trị được chọn
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onPageActive(page) {
            this.currentPage = page;
            this.onTogglePagination();
        },
    },
    data() {
        return {
            isPaginationActive: false,
            pageSize: ["10", "25", "50", "100"],
            currentPage: 25,
            active: "active",
        };
    },
};
</script>
<style lang=""></style>

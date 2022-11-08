<template lang="">
    <div class="content" @click="closeRepairOption">
        <div class="content-header">
            <div class="content-header-title">Nhân viên</div>
            <BaseButton
                class="pri-btn"
                title="Thêm nhân viên mới"
                @click="onToggleModal"
            />
        </div>
        <div class="staff-table">
            <div class="staff-table-check"></div>
            <div class="staff-table-search">
                <div class="delete-all">
                    <p v-show="selected.length > 0">
                        Đã chọn: <span>{{ pageSize }}</span> bản ghi
                    </p>
                    <button
                        class="btn delete-btn margleft-12"
                        v-show="selected.length > 0"
                    >
                        Xóa
                    </button>
                </div>
                <div class="search-box">
                    <BaseInput
                        id="search-employee"
                        type="text"
                        class="input-width-230"
                        placeholder="Tìm theo mã, tên nhân viên"
                        @value="onFilterEmployee($event)"
                    />
                    <div class="search-icon"></div>

                    <div
                        class="rotate-icon margleft-12"
                        title="Làm mới"
                        @click="onRefresh"
                    ></div>
                </div>
            </div>
            <div class="data-table">
                <BaseTable
                    @totalPage="getTotalPage($event)"
                    :pageSize="pageSize"
                    :pageNumber="pageNumber"
                    :filter="filter"
                    :refresh="refresh"
                    :idForm="isShowModal && idForm"
                    @checkAll="toggleCheckAll($event)"
                    @addForm="onToggleModal"
                    @pageFilter="changePageNumber($event)"
                    @refreshData="onRefresh"
                />
            </div>
        </div>
        <div class="content-footer">
            <div class="total-page">
                <p>
                    Tổng: <span>{{ totalPage || 0 }}</span> bản ghi
                </p>
            </div>
            <div class="pagination">
                <BaseDropdownPagin @pageSize="getPageSize($event)" />
                <div class="pagination-table-row margleft-16">
                    <span class="pagination-table-row-number">{{
                        updatePage(totalPage)
                    }}</span>
                    <span class="pagination-table-row-title">bản ghi</span>
                </div>
                <div class="pagination-button">
                    <div
                        class="pagination-button-prev margleft-16"
                        @click="onPrevPage"
                    ></div>
                    <div
                        class="pagination-button-next margleft-16"
                        @click="onNextPage"
                    ></div>
                </div>
            </div>
        </div>
    </div>

    <!-- <BaseModalVue
        v-if="isShowModal"
        @closeModal="onToggleModal"
        id="add-form"
    /> -->
</template>
<script>
import BaseTable from "../base/BaseTable.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseInput from "../base/BaseInput.vue";
import BaseModalVue from "../base/BaseModal.vue";
import BaseDropdownPagin from "../base/BaseDropdownPagin.vue";
export default {
    name: "TheMain",
    components: {
        BaseTable,
        BaseButton,
        BaseInput,
        BaseModalVue,
        BaseDropdownPagin,
    },
    watch: {
        // Kiểm tra khi pageSize thay đổi thì....
        pageSize(newpage, oldpage) {
            //Nếu pageSize mới lớn hơn pageSize cũ
            if (newpage > oldpage) {
                this.pageNumber = "1";
            } else {
                this.pageNumber = "1";
            }
            //Nếu pageSize mới = 100
            if (newpage == 100) {
                this.pageNumber = "1";
            }
        },
    },
    methods: {
        /**
         * Thực hiện UI xử lí chuyền dữ liệu ẩn hiện form
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onToggleModal() {
            this.isShowModal = !this.isShowModal;
        },
        /**
         * Thực hiện UI xử lí chuyền dữ liệu ẩn hiện phân trang chọn pageSize
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onTogglePagination() {
            this.isPaginationActive = !this.isPaginationActive;
        },
        /**
         * Thực hiện hiện tổng số bản ghi
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        getTotalPage(data) {
            this.totalPage = data;
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageSize vào table
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        getPageSize(page) {
            this.pageSize = page;
            this.filter = "";
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onNextPage() {
            if (Math.ceil(this.totalPage / this.pageSize) > this.pageNumber) {
                this.pageNumber++;
            }
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onPrevPage() {
            if (this.pageNumber > 1) {
                this.pageNumber = this.pageNumber - 1;
            }
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table để tìm kiếm nhân viên
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onFilterEmployee(value) {
            this.filter = value;
        },
        /**
         * Thực hiện xử lý chuyển dữ liệu pageNumber vào table làm mới
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onRefresh() {
            this.refresh = !this.refresh;
            this.filter = "";
            this.pageNumber = "1";
        },
        /**
         * Thực hiện xử lý Số trang và hiện lên view
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        updatePage(totalPage) {
            return `${this.pageSize * (this.pageNumber - 1) + 1} - ${
                this.pageSize * this.pageNumber > totalPage
                    ? totalPage
                    : this.pageSize * this.pageNumber
            } `;
        },
        /**
         * Thực hiện xử lý xóa toàn bộ bản ghi
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        toggleCheckAll(e) {
            this.isChecked = !this.isChecked;
            this.selected = e;
        },
        /**
         * Thực hiện xử lý chuyển trang về trang đầu tiên khi tìm kiếm nhân viên
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        changePageNumber(e) {
            this.pageNumber = e;
        },
    },

    data() {
        return {
            isShowModal: false,
            isPaginationActive: false,
            totalPage: null,
            pageSize: "25",
            pageNumber: "1",
            filter: "",
            refresh: false,
            title: "",
            isChecked: false,
            idForm: "add-form",
            selected: [],
        };
    },
};
</script>
<style lang=""></style>

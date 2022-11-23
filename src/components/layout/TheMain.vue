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
                        Đã chọn: <span>{{ selected.length }}</span> bản ghi
                    </p>
                    <BaseButton
                        v-show="selected.length > 0"
                        title="Bỏ chọn"
                        class="remove-checkall"
                        @click="removeCheckbox"
                    />
                    <button
                        class="btn delete-btn margleft-12"
                        v-show="selected.length > 0"
                        @click="toggleDeleteMultiple"
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
                        :IsRefresh="refresh"
                        @value="onFilterEmployee($event)"
                    />
                    <div class="search-icon"></div>

                    <div
                        class="rotate-icon margleft-12"
                        title="Làm mới"
                        @click="onRefresh"
                    ></div>
                    <div
                        title="Xuất khẩu"
                        class="export-excel margleft-12"
                        @click="exportExcelFile"
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
                    :deleted="refreshDataSelected"
                    :notDeleteAll="notDeleteMultiple"
                    @check="toggleCheckAll($event)"
                    @addForm="onToggleModal"
                    @pageFilter="changePageNumber($event)"
                    @refreshData="onRefresh"
                    @toast="toggleToast($event)"
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
                        :class="pageNumber == 1 && 'opacity03'"
                        @click="onPrevPage"
                        title="Quay về"
                    ></div>
                    <div
                        class="pagination-button-next margleft-16"
                        :class="
                            Math.ceil(this.totalPage / this.pageSize) ==
                                pageNumber && 'opacity03'
                        "
                        @click="onNextPage"
                        title="Sang trang tiếp"
                    ></div>
                </div>
            </div>
        </div>
        <BaseDialogInforVue
            v-if="deleteMultiple"
            dialogName="deleteMultiple"
            :deleteBatch="selected"
            @deleteSuccess="deleteSuccess()"
            @closeDialog="toggleDeleteMultiple"
            @Success="toggleToast($event)"
        />
        <BaseToastVue v-if="isSuccess" :success="success" />
    </div>
</template>
<script>
import BaseTable from "../base/BaseTable.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseInput from "../base/BaseInput.vue";
import BaseModalVue from "../base/BaseModal.vue";
import BaseDropdownPagin from "../base/BaseDropdownPagin.vue";
import BaseDialogInforVue from "../base/BaseDialogInfor.vue";
import BaseToastVue from "../base/BaseToast.vue";
import axios from "axios";

export default {
    name: "TheMain",
    components: {
        BaseTable,
        BaseButton,
        BaseInput,
        BaseModalVue,
        BaseDropdownPagin,
        BaseDialogInforVue,
        BaseToastVue,
    },
    mounted() {
        // Sự kiện ấn bàn phím
        const me = this;
        window.addEventListener("keyup", function (event) {
            // Mở form thêm nhân viên
            if (event.keyCode === 45) {
                me.onToggleModal();
            }
        });
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
        selected() {
            this.selected;
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
            this.selected = e;
            if (this.selected.length > 0) {
                this.isChecked = !this.isChecked;
            }
        },
        /**
         * Thực hiện xử lý chuyển trang về trang đầu tiên khi tìm kiếm nhân viên
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        changePageNumber(e) {
            this.pageNumber = e;
        },

        /**
         * Thực hiện xử lý để bật đóng dialog
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        toggleDeleteMultiple() {
            this.deleteMultiple = !this.deleteMultiple;
        },

        /**
         * Thực hiện xử lý load lại dữ liệu và mảng id muốn xóa
         **  Author: Nguyễn Quang Minh(24/11/2022)
         */
        deleteSuccess() {
            this.selected = [];
            this.onRefresh();
            this.deleteMultiple = !this.deleteMultiple;
        },

        /**
         * Thực hiện xử lý bỏ chọn tất cả checkbox
         **  Author: Nguyễn Quang Minh(24/11/2022)
         */
        removeCheckbox() {
            this.selected = [];
            this.notDeleteMultiple = !this.notDeleteMultiple;
        },

        toggleToast(e) {
            this.success = e;
            this.isSuccess = !this.isSuccess;
            setTimeout(() => {
                this.isSuccess = !this.isSuccess;
            }, 3000);
        },

        /**
         * Thực hiện xử lý xuất dữ liệu ra excel
         **  Author: Nguyễn Quang Minh(22/11/2022)
         */
        exportExcelFile() {
            try {
                axios
                    .post("http://localhost:5165/api/Employees/exportExcel")
                    .then((res) => {
                        res.config.responseType = "blob";
                        axios(res.config).then((res) => {
                            const url = window.URL.createObjectURL(
                                new Blob([res.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute("download", "file.xlsx");
                            document.body.appendChild(link);
                            link.click();
                        });
                    })
                    .catch((err) => {
                        console.log("Không lấy được excel");
                    });
            } catch (error) {
                console.log("Không lấy được excel");
            }
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
            refreshDataSelected: false,
            deleteMultiple: false,
            notDeleteMultiple: false,
            success: "",
            isSuccess: false,
        };
    },
};
</script>
<style lang=""></style>

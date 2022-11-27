<template lang="">
    <table id="tblEmployee">
        <thead>
            <tr class="data-table-header">
                <th class="sticky-checkbox table-header-color">
                    <input
                        id="checkbox-header"
                        type="checkbox"
                        class="checkbox-size"
                        @click="onToggleCheckAll"
                        :checked="selectAll"
                    />
                </th>
                <th class="sticky-id table-header-color">
                    <div class="truncate">{{ dataResource.employeeCode }}</div>
                </th>
                <th class="sticky-name table-header-color">
                    <div class="truncate">{{ dataResource.employeeName }}</div>
                </th>
                <th>
                    <div class="truncate">{{ dataResource.gender }}</div>
                </th>
                <th>
                    <div class="truncate text-centre">
                        {{ dataResource.dob }}
                    </div>
                </th>
                <th class="text-right">
                    <div class="truncate" title="Số chứng minh nhân dân">
                        {{ dataResource.identityNumber }}
                    </div>
                </th>
                <th>
                    <div class="truncate">
                        {{ dataResource.jobPositionName }}
                    </div>
                </th>
                <th>
                    <div class="truncate">
                        {{ dataResource.departmentName }}
                    </div>
                </th>
                <th class="text-right">
                    <div class="truncate">{{ dataResource.bankNumber }}</div>
                </th>
                <th style="min-width: 174px">
                    <div class="truncate">{{ dataResource.bankName }}</div>
                </th>
                <th>
                    <div class="truncate" title="Chi nhánh tài khoản ngân hàng">
                        {{ dataResource.bankBranchName }}
                    </div>
                </th>
                <th class="sticky-function table-header-color">
                    <div class="truncate text-centre">
                        {{ dataResource.feature }}
                    </div>
                </th>
            </tr>
        </thead>
        <tbody v-if="totalPage == 0">
            <tr>
                <th class="not-found" colspan="12">
                    {{ dataResource.notFound }}
                </th>
            </tr>
        </tbody>
        <tbody v-else>
            <tr
                class="data-table-detail"
                v-for="(employee, index) in employees"
                :key="employee.employeeID"
                :class="{ 'background-table': employee.IsChecked }"
            >
                <td
                    class="sticky-checkbox"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <input
                        type="checkbox"
                        class="checkbox-size"
                        v-model="employee.IsChecked"
                        @click="
                            handleClickCheck(
                                employee.IsChecked,
                                index,
                                employee.employeeID
                            )
                        "
                    />
                </td>
                <td
                    @dblclick="onToggleModal(index, 'edit-form')"
                    class="sticky-id"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <div class="truncate">
                        {{ employee.employeeCode }}
                    </div>
                </td>
                <td
                    @dblclick="onToggleModal(index, 'edit-form')"
                    class="sticky-name"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <div class="truncate">
                        {{ employee.employeeName || "" }}
                    </div>
                </td>
                <td @dblclick="onToggleModal(index, 'edit-form')">
                    <div class="truncate">
                        {{ handleGender(employee.gender) || "" }}
                    </div>
                </td>
                <td
                    class="text-centre"
                    @dblclick="onToggleModal(index, 'edit-form')"
                >
                    <div class="truncate">
                        {{ handleDOB(employee.dateOfBirth) || "" }}
                    </div>
                </td>
                <td
                    class="text-right"
                    @dblclick="onToggleModal(index, 'edit-form')"
                >
                    <div class="truncate">
                        {{ employee.identityNumber || "" }}
                    </div>
                </td>
                <td @dblclick="onToggleModal(index, 'edit-form')">
                    <div class="truncate">
                        {{ employee.jobPositionName || "" }}
                    </div>
                </td>
                <td
                    style="min-width: 174px"
                    @dblclick="onToggleModal(index, 'edit-form')"
                >
                    <div class="truncate">
                        {{ employee.departmentName || "" }}
                    </div>
                </td>
                <td
                    @dblclick="onToggleModal(index, 'edit-form')"
                    class="text-right"
                    style="min-width: 144px"
                >
                    {{ employee.bankAccountNumber || "" }}
                </td>
                <td @dblclick="onToggleModal(index, 'edit-form')">
                    {{ employee.bankName || "" }}
                </td>
                <td @dblclick="onToggleModal(index, 'edit-form')">
                    {{ employee.bankBranchName || "" }}
                </td>
                <td
                    class="text-centre sticky-function repeat"
                    :class="[
                        featureDropdown == index && zIndex5,
                        employee.IsChecked && backGroundTbl,
                    ]"
                >
                    <div
                        class="truncate repair"
                        @click.self="onToggleModal(index, 'edit-form')"
                    >
                        {{ dataResource.edit }}
                        <i
                            class="fa-solid fa-caret-down repair-icon"
                            @click="
                                onToggleRepair(
                                    index,
                                    employee.employeeCode,
                                    employee.employeeID
                                )
                            "
                            :class="[
                                index == featureDropdown &&
                                    isDropdown &&
                                    dropdownIconBorder,
                            ]"
                        ></i>
                    </div>
                    <ul v-show="showDelete == index" class="repair-option">
                        <li @click="onToggleModal(index, 'duplicate')">
                            {{ dataResource.duplicate }}
                        </li>
                        <li id="delete" @click="onDeleteEmployee()">
                            {{ dataResource.deleteButton }}
                        </li>
                    </ul>
                    <div
                        class="overlay-feature"
                        v-if="isDropdown"
                        @click="onToggleRepair()"
                    ></div>
                </td>
                <BaseModalVue
                    v-if="isModal == index"
                    :employeeCode="employee.employeeCode"
                    :employeeID="employee.employeeID"
                    :id="id"
                    @closeModal="onToggleModal"
                    @refreshData="resfreshToPageOne"
                    @removeLoading="() => (isLoading = false)"
                    @Success="toastAlert($event)"
                />
            </tr>
        </tbody>

        <BaseDialogInforVue
            v-show="isDialog"
            dialogName="delete"
            :employeeCode="codeEmployee"
            :employeeID="idEmployee"
            @closeDialog="onDeleteEmployee"
            @deleteSuccess="
                () => {
                    this.onLoadData();
                    this.selected = [];
                }
            "
            @Success="toastAlert($event)"
        />
        <BaseLoadingVue v-if="isLoading" />
    </table>
</template>
<script lang="ts">
import BaseLoadingVue from "./BaseLoading.vue";
import BaseDialogInforVue from "./BaseDialogInfor.vue";
import BaseModalVue from "../base/BaseModal.vue";
import BaseButtonVue from "./BaseButton.vue";
import * as resource from "../../common/resources";
import { Male, Female, Orther } from "../../common/enum";
import axios from "axios";

export default {
    name: "BaseTable",
    components: {
        BaseLoadingVue,
        BaseDialogInforVue,
        BaseModalVue,
        BaseButtonVue,
    },
    mounted() {
        /**
         * Thực hiện render dữ liệu nhân viên
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        this.onLoadData();
    },

    watch: {
        /**
         * Thực hiện đưa dữ liệu tổng sô bản ghi lên component BaseTable
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        employees() {
            this.$emit("totalPage", this.totalPage);
        },
        /**
         * Thực hiện Load lại dữ liệu khi chuyển pageSize
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        pageSize() {
            this.selectAll = false;
            //Load lại data dựa theo limit và tìm kiếm
            this.onFilterData(this.filter, this.pageNumber);
        },
        /**
         * Thực hiện xử lý load dữ liệu chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        pageNumber() {
            this.selectAll = false;
            //Nếu ở trang 2 trở lên mà muốn tìm kiếm thì trang sẽ trở về 1
            if (this.filter) {
                this.onFilterData(this.filter, this.pageNumber);
            } else {
                // Load lại trang
                this.onLoadData();
            }
        },
        // Thực thi hàm Tìm kiếm
        filter() {
            this.onFilterData(this.filter);
        },
        //Thực thi load lại trang
        refresh() {
            this.onLoadData();
            this.selectAll = false;
        },
        // Emit data isChecked lên component cha
        isChecked() {
            this.$emit("checkAll", this.isChecked);
        },
        // Xử lý chuyển idForm prop vào data id mở modal
        idForm() {
            if (this.idForm) {
                this.id = this.idForm;
                this.onToggleModal();
            }
        },

        // Prop theo dõi khi xóa thành công thì gán lại mảng selected rỗng
        deleted() {
            this.selected = [];
            this.selectAll = false;
        },
        notDeleteAll() {
            this.selectAll = true;
            this.onToggleCheckAll();
        },
    },
    methods: {
        /**
         * Thực hiện checked và bỏ checked tất cả các bản ghi
         **  Author: Nguyễn Quang Minh(4/11/2022)
         */
        onToggleCheckAll() {
            try {
                var select = this.selectAll;
                this.selected = [];
                const me = this;
                this.employees.forEach(function (employee) {
                    employee.IsChecked = !select;
                    if (!select) {
                        me.selected.push(employee.employeeID);
                    } else {
                        me.selected = [];
                    }
                });
                this.selectAll = !select;
                this.$emit("check", this.selected);
            } catch (error) {
                console.log("Check all bị lỗi");
            }
        },

        /**
         * Thực hiện xử lý từng checkbox khi check bằng tay đủ tất cả hoặc
         * bỏ chọn 1 checkbox khi đang checkbox all
         **  Author: Nguyễn Quang Minh(4/11/2022)
         */
        handleClickCheck(employeeCheck, index, id) {
            try {
                const me = this;
                //Khi bỏ một check box khi đang check all
                if (employeeCheck) {
                    this.selectAll = false;
                    // Bỏ phần tử không muốn xóa khỏi mảng
                    this.selected = this.selected.filter((item) => {
                        return item != id;
                    });
                    this.$emit("check", this.selected);
                }
                //Khi chọn tất cả các check box bằng tay từng cái 1
                else {
                    //Lấy ra list mảng các nhân viên còn lại ngoại trừ checkbox nhân viên đã chọn
                    const checkList = this.employees.filter((item, i) => {
                        return index != i;
                    });
                    // Kiểm tra tất cả list nhân viên đó Employee.IsChecked = true k
                    const check = checkList.every((item) => {
                        return item.IsChecked;
                    });
                    // Nếu true thì bật checkall input
                    if (check) {
                        me.selected = [];
                        this.employees.forEach((employee) => {
                            employee.IsChecked = true;
                            me.selected.push(employee.employeeID);
                        });
                        this.selectAll = true;
                        this.$emit("check", this.selected);
                    } else {
                        this.selected.push(id);
                        this.$emit("check", this.selected);
                    }
                }
            } catch (error) {}
        },

        /**
         * Thực hiện xử lý dropdown chức năng
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onToggleRepair(index, code, id) {
            //Nếu data isDropdown = true
            if (this.isDropdown) {
                this.showDelete = null;
                this.isDropdown = !this.isDropdown;
                this.featureDropdown = null;
            } else {
                this.showDelete = index;
                this.isDropdown = !this.isDropdown;
                this.featureDropdown = index;
                this.codeEmployee = code;
                this.idEmployee = id;
            }
        },

        /**
         * Thực hiện xử lý load data vào table
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onLoadData() {
            try {
                this.isLoading = true;
                axios
                    .get(
                        `http://localhost:5165/api/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
                    )
                    .then((response) => {
                        this.employees = response.data.data;
                        this.employees.forEach((element) => {
                            element.IsChecked = false;
                        });
                        this.totalPage = response.data.totalCount;
                        this.selected = [];
                        this.$emit("check", this.selected);
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        this.$emit("toast", "false");
                        this.isLoading = false;
                    });
            } catch (error) {
                this.$emit("toast", "false");
            }
        },
        /**
         * Thực hiện xử lý tìm kiếm dữ liệu hiển thị vào trong bảng
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onFilterData(filter, pageNumber, pageSize) {
            try {
                this.isLoading = true;
                if (pageNumber > 1) {
                    this.pageFilter = pageNumber;
                } else {
                    this.pageFilter = 1;
                }
                axios
                    .get(
                        `http://localhost:5165/api/Employees/filter?keyword=${filter}&pageSize=${
                            pageSize || this.pageSize
                        }&pageNumber=${this.pageFilter}`
                    )
                    .then((response) => {
                        this.employees = response.data.data;
                        this.totalPage = response.data.totalCount;
                        this.$emit("pageFilter", this.pageFilter);
                        this.selected = [];
                        this.$emit("check", this.selected);
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        this.$emit("toast", "false");
                        this.isLoading = false;
                    });
            } catch (error) {
                this.$emit("toast", "false");
            }
        },
        /**
         * Thực hiện xử lý dữ liệu DateOfBirth trả về từ api hiển thị ra bảng
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        handleDOB(dob) {
            if (dob) {
                dob = new Date(dob);
                let date = dob.getDate(dob);
                let month = dob.getMonth(dob) + 1;
                let year = dob.getFullYear(dob);

                return `${date < 10 ? "0" + date : date}/${
                    month < 10 ? "0" + month : month
                }/${year}`;
            }
            return false;
        },

        /**
         * Thực hiện xử lý dữ liệu Gender trả về từ api hiển thị ra bảng
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        handleGender(gender) {
            if (gender == Male) {
                return "Nam";
            }
            if (gender == Female) {
                return "Nữ";
            }
            if (gender == Orther) {
                return "Khác";
            }
        },

        /**
         * Thực hiện xử lý UI khi click feature Xóa hiện thị Dialog Xóa nhân viên
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        onDeleteEmployee() {
            this.isDialog = !this.isDialog;
            this.isDropdown = false;
            this.featureDropdown = null;
            this.showDelete = null;
        },
        /**
         * Thực hiện xử lý UI ẩn hiện form nhân viên hoặc sửa
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        onToggleModal(index, typeform) {
            this.isDropdown = false;
            this.showDelete = null;
            this.featureDropdown = null;

            // Nểu isShowModal = true thì chuyển về false và đóng form
            if (this.isShowModal) {
                this.isShowModal = !this.isShowModal;
                this.isModal = null;
                if (this.idForm) {
                    // Chuyền thông báo tới thằng cha là form add nhân viên đã đóng
                    this.$emit("addForm");
                }
            } else {
                this.isModal = index;
                // Mở form edit nếu có argument edit
                if (typeform == "edit-form") {
                    this.id = typeform;
                    this.isLoading = !this.isLoading;
                }
                // Mở form edit nếu có argument edit
                if (typeform == "duplicate") {
                    this.id = typeform;
                }
                // Mở form add nhân viên
                if (!this.isModal) {
                    this.isModal = 0;
                }
                // Mở form
                this.isShowModal = !this.isShowModal;
            }
        },
        /**
         * Thực hiện xử lý chuyền thông báo tới thằng cha và thằng cha sẽ sử lý reset lại dữ liệu
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        resfreshToPageOne() {
            this.$emit("refreshData");
            this.isDropdown = false;
        },

        toastAlert(e) {
            this.$emit("toast", e);
        },
    },

    props: {
        // Truyền sữ liêu số bản ghi trên 1 trang
        pageSize: Number,
        // Truyền dữ liệu khi muốn sang trang hoặc quay về
        pageNumber: Number,
        // Prop truyền string muốn tìm kiếm
        filter: String,
        // Prop truyền thông báo load lại data
        refresh: Boolean,
        // Prop truyền id form thêm nhân viên
        idForm: String,
        // Prop Truyền thông báo xóa tất cả bản ghi
        deleted: Boolean,
        // Prop bỏ chọn tất cả checkbox
        notDeleteAll: Boolean,
    },

    data() {
        return {
            dataResource: resource,
            isDropdown: false,
            employees: null,
            totalPage: 0,
            featureDropdown: null,
            showDelete: null,
            dropdownIconBorder: "repair-icon-border",
            backGroundTbl: "background-table",
            zIndex5: "z-index5",
            isDialog: false,
            codeEmployee: null,
            idEmployee: null,
            isShowModal: false,
            isModal: null,
            isLoading: false,
            selected: [],
            id: "",
            pageFilter: this.pageNumber,
            selectAll: false,
        };
    },
};
</script>
<style lang=""></style>

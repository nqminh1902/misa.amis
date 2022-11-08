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
                    <div class="truncate">Mã nhân viên</div>
                </th>
                <th class="sticky-name table-header-color">
                    <div class="truncate">Tên nhân viên</div>
                </th>
                <th>
                    <div class="truncate">Giới tính</div>
                </th>
                <th>
                    <div class="truncate text-centre">Ngày sinh</div>
                </th>
                <th>
                    <div class="truncate" title="Số chứng minh nhân dân">
                        Số CMND
                    </div>
                </th>
                <th>
                    <div class="truncate">Chức danh</div>
                </th>
                <th>
                    <div class="truncate">Tên đơn vị</div>
                </th>
                <th>
                    <div class="truncate">Số tài khoản</div>
                </th>
                <th>
                    <div class="truncate">Tên ngân hàng</div>
                </th>
                <th>
                    <div class="truncate">Chi nhánh TK ngân hàng</div>
                </th>
                <th class="sticky-function table-header-color">
                    <div class="truncate text-centre">Chức năng</div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="data-table-detail"
                v-for="(employee, index) in employees"
                :key="employee.EmployeeId"
                :class="{ 'background-table': employee.IsChecked }"
                @dblclick="onToggleModal(index, 'edit-form')"
            >
                <td
                    class="sticky-checkbox"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <input
                        type="checkbox"
                        class="checkbox-size"
                        v-model="employee.IsChecked"
                        @click="handleClickCheck(employee.IsChecked, index)"
                    />
                </td>
                <td
                    class="sticky-id"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <div class="truncate">
                        {{ employee.EmployeeCode }}
                    </div>
                </td>
                <td
                    class="sticky-name"
                    :class="{ 'background-table': employee.IsChecked }"
                >
                    <div class="truncate">
                        {{ employee.EmployeeName || "" }}
                    </div>
                </td>
                <td>
                    <div class="truncate">{{ employee.GenderName || "" }}</div>
                </td>
                <td>
                    <div class="truncate text-centre">
                        {{ handleDOB(employee.DateOfBirth) || "" }}
                    </div>
                </td>
                <td>
                    <div class="truncate text-right">
                        {{ employee.PhoneNumber || "" }}
                    </div>
                </td>
                <td>
                    <div class="truncate">
                        {{ employee.EmployeePosition || "" }}
                    </div>
                </td>
                <td>
                    <div class="truncate">
                        {{ employee.DepartmentName || "" }}
                    </div>
                </td>
                <td class="text-right">
                    {{ employee.BankAccountNumber || "" }}
                </td>
                <td>{{ employee.BankName || "" }}</td>
                <td>{{ employee.BankBranchName || "" }}</td>
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
                        Sửa
                        <i
                            class="fa-solid fa-caret-down repair-icon"
                            @click="
                                onToggleRepair(
                                    index,
                                    employee.EmployeeCode,
                                    employee.EmployeeId
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
                        <li id="delete" @click="onDeleteEmployee()">Xóa</li>
                    </ul>
                    <div
                        class="overlay-feature"
                        v-if="isDropdown"
                        @click="onToggleRepair()"
                    ></div>
                </td>
                <BaseModalVue
                    v-if="isModal == index"
                    :employeeCode="employee.EmployeeCode"
                    :employeeId="employee.EmployeeId"
                    :id="id"
                    @closeModal="onToggleModal"
                    @refreshData="resfreshToPageOne"
                />
            </tr>
        </tbody>
        <BaseDialogInforVue
            v-show="isDialog"
            dialogName="delete"
            :employeeCode="codeEmployee"
            :employeeId="idEmployee"
            @closeDialog="onDeleteEmployee"
            @deleteSuccess="onLoadData"
        />
        <BaseLoadingVue v-if="isLoading" />
    </table>
</template>
<script>
import BaseLoadingVue from "./BaseLoading.vue";
import BaseDialogInforVue from "./BaseDialogInfor.vue";
import BaseModalVue from "../base/BaseModal.vue";
import axios from "axios";
export default {
    name: "BaseTable",
    components: {
        BaseLoadingVue,
        BaseDialogInforVue,
        BaseModalVue,
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
            this.onLoadData();
        },
        /**
         * Thực hiện xử lý load dữ liệu chuyển trang
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        pageNumber() {
            // Nếu ở trang 2 trở lên mà muốn tìm kiếm thì trang sẽ trở về 1
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
        // Thực thi load lại trang
        refresh() {
            this.onLoadData();
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
    },
    methods: {
        /**
         * Thực hiện checked và bỏ checked tất cả các bản ghi
         **  Author: Nguyễn Quang Minh(4/11/2022)
         */
        onToggleCheckAll() {
            var select = this.selectAll;
            const me = this;
            this.employees.forEach(function (employee) {
                employee.IsChecked = !select;
                if (!select) {
                    me.selected.push(employee.EmployeeId);
                } else {
                    me.selected = [];
                }
            });
            this.selectAll = !select;
            this.$emit("checkAll", this.selected);
        },

        /**
         * Thực hiện xử lý từng checkbox khi check bằng tay đủ tất cả hoặc
         * bỏ chọn 1 checkbox khi đang checkbox all
         **  Author: Nguyễn Quang Minh(4/11/2022)
         */
        handleClickCheck(employeeCheck, index) {
            const me = this;
            //Khi bỏ một check box khi đang check all
            if (employeeCheck) {
                this.selectAll = false;
                this.selected = [];
                this.$emit("checkAll", this.selected);
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
                // Nếu true thì bật checkall input và hiển thị button xóa tất cả ở component cha
                if (check) {
                    this.employees.forEach((employee) => {
                        employee.IsChecked = true;
                        me.selected.push(employee.EmployeeId);
                    });
                    this.selectAll = true;
                    this.$emit("checkAll", this.selected);
                }
            }
        },

        /**
         * Thực hiện xử lý dropdown Xóa
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onToggleRepair(index, code, id) {
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
            this.isLoading = true;
            axios
                .get(
                    `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
                )
                .then((response) => {
                    this.employees = response.data.Data;
                    this.employees.forEach((element) => {
                        element.IsChecked = false;
                    });
                    this.totalPage = response.data.TotalRecord;

                    this.isLoading = false;
                })
                .catch((error) => {
                    alert("bi lỗi");
                });
        },
        /**
         * Thực hiện xử lý tìm kiếm dữ liệu hiển thị vào trong bảng
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onFilterData(filter, pageNumber) {
            this.isLoading = true;
            if (pageNumber > 1) {
                this.pageFilter = pageNumber;
            } else {
                this.pageFilter = 1;
            }
            axios
                .get(
                    `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageFilter}&employeeFilter=${filter}`
                )
                .then((response) => {
                    this.employees = response.data.Data;
                    this.totalPage = response.data.TotalRecord;
                    this.$emit("pageFilter", this.pageFilter);
                    this.isLoading = false;
                })
                .catch((error) => {
                    alert("bi lỗi");
                });
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
        onToggleModal(index, edit) {
            // Nểu isShowModal = true thì chuyển về false và đóng form
            if (this.isShowModal) {
                this.isShowModal = !this.isShowModal;
                this.isModal = null;
                if (this.idForm) {
                    // Chuyền thông báo tới thằng cha là form add nhân viên đã đóng
                    this.$emit("addForm");
                }
            } else {
                // Mở form
                this.isShowModal = !this.isShowModal;
                this.isModal = index;
                // Mở form edit nếu có argument edit
                if (edit) {
                    this.id = edit;
                }
                // Mở form add nhân viên nếu có argument edit

                if (!this.isModal) {
                    this.isModal = 0;
                }
            }
        },
        /**
         * Thực hiện xử lý chuyền thông báo tới thằng cha và thằng cha sẽ sử lý reset lại dữ liệu
         **  Author: Nguyễn Quang Minh(27/10/2022)
         */
        resfreshToPageOne() {
            this.$emit("refreshData");
        },
    },

    props: ["pageSize", "pageNumber", "filter", "refresh", "idForm"],
    data() {
        return {
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

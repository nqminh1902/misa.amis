<template lang="">
    <div
        class="modal"
        :id="id"
        @click.self="onCloseModal"
        @keyup.esc="onCloseModal"
    >
        <div class="modal-container">
            <div class="modal-icon">
                <div class="icon-help" title="Giúp"></div>
                <div
                    class="icon-close margleft-6"
                    title="Đóng"
                    @click="onCloseModal"
                ></div>
            </div>
            <div class="modal-wrap">
                <div class="modal-header">
                    <div class="modal-header-title">{{ title }}</div>
                    <div class="modal-header-checkbox">
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            class="checkbox"
                            tabindex="22"
                        />Là khách hàng
                    </div>
                    <div class="modal-header-checkbox margleft-6">
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            class="checkbox"
                            tabindex="23"
                        />Là nhà cung cấp
                    </div>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="save" ref="resetForm">
                        <div class="modal-body-top">
                            <div class="form-left">
                                <div class="form-left-top">
                                    <div class="form width-40">
                                        <label class="form-label"
                                            >Mã <span>*</span></label
                                        >
                                        <input
                                            class="form-input"
                                            type="text"
                                            name="input"
                                            placeholder="Mã"
                                            v-model="employee.employeeCode"
                                            tabindex="1"
                                            :class="error.EmployeeCode"
                                            required
                                            ref="inputEmployeeCode"
                                            :readonly="id == 'edit-form'"
                                            @blur="
                                                validateEmployeeCode(
                                                    employee.employeeCode
                                                )
                                            "
                                            @input="
                                                validateEmployeeCode(
                                                    employee.employeeCode
                                                )
                                            "
                                        />
                                        <label
                                            class="error-text"
                                            title="Trường này không được để
                                        trống"
                                            v-if="error.EmployeeCode"
                                            >Trường này không được để
                                            trống</label
                                        >
                                    </div>
                                    <div class="form width-60 margleft-6">
                                        <label class="form-label"
                                            >Tên <span>*</span></label
                                        >
                                        <input
                                            id="txtTenNhanVien"
                                            class="form-input"
                                            type="text"
                                            name="input"
                                            placeholder="Tên"
                                            tabindex="2"
                                            ref="inputEmployeeName"
                                            v-model="employee.employeeName"
                                            :class="error.EmployeeName"
                                            required
                                            @blur="
                                                validateEmployeeName(
                                                    employee.employeeName
                                                )
                                            "
                                            @input="
                                                validateEmployeeName(
                                                    employee.employeeName
                                                )
                                            "
                                        />
                                        <label
                                            v-if="error.EmployeeName"
                                            class="error-text"
                                            title="Trường này không được để trống hoặc
                                        là số"
                                            >Trường này không được để trống hoặc
                                            là số</label
                                        >
                                    </div>
                                </div>
                                <BaseDropdownVue
                                    type="text"
                                    placeholder="Đơn vị"
                                    id="DepartmentName"
                                    tabindex="3"
                                    label="Đơn vị"
                                    ref="inputDeparment"
                                    :departmentList="departmentList"
                                    :departmentId="employee.departmentID"
                                    :departmentName="employee.departmentName"
                                    :departmentError="error.DepartmentName"
                                    @departmentId="getDepartmentId($event)"
                                    @departmentName="getDepartmentName($event)"
                                />
                                <div class="form">
                                    <label class="form-label">Chức danh</label>
                                    <input
                                        class="form-input"
                                        type="text"
                                        name="input"
                                        placeholder="Chức danh"
                                        tabindex="4"
                                        id="txtChucDanh"
                                        v-model="employee.jobPositionName"
                                    />
                                </div>
                            </div>
                            <div class="form-right">
                                <div class="form-right-top">
                                    <div class="form width-40">
                                        <label class="form-label"
                                            >Ngày sinh
                                        </label>
                                        <input
                                            class="form-input"
                                            type="date"
                                            name="input"
                                            placeholder="Ngày sinh"
                                            tabindex="5"
                                            id="txtNgaySinh"
                                            v-model="employee.dateOfBirth"
                                            :class="error.DateOfBirth"
                                            @blur="
                                                validateDOB(
                                                    employee.dateOfBirth
                                                )
                                            "
                                            @input="
                                                validateDOB(
                                                    employee.dateOfBirth
                                                )
                                            "
                                        />
                                        <label
                                            class="error-text"
                                            title="Ngày sinh không lớn hơn ngày hiện
                                            tại"
                                            v-if="error.DateOfBirth"
                                            >Ngày sinh không lớn hơn ngày hiện
                                            tại</label
                                        >
                                    </div>
                                    <div class="form width-60 margleft-16">
                                        <label class="form-label"
                                            >Giới tính
                                        </label>
                                        <div class="form-radio">
                                            <BaseRadioVue
                                                title="Nam"
                                                value="0"
                                                tabindex="6"
                                                :genderValue="employee.gender"
                                                @gender="getGender($event)"
                                            />
                                            <BaseRadioVue
                                                title="Nữ"
                                                value="1"
                                                tabindex="7"
                                                :genderValue="employee.gender"
                                                @gender="getGender($event)"
                                            />
                                            <BaseRadioVue
                                                title="Khác"
                                                value="2"
                                                tabindex="8"
                                                :genderValue="employee.gender"
                                                @gender="getGender($event)"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-right-body">
                                    <div class="form width-60">
                                        <label
                                            class="form-label"
                                            title="Số chứng minh nhân dân"
                                            >Số CMND
                                        </label>
                                        <input
                                            id="txtCMND"
                                            class="form-input number"
                                            type="text"
                                            name="input"
                                            placeholder="Số CMND"
                                            tabindex="9"
                                            v-model="employee.identityNumber"
                                        />
                                        <label
                                            class="error-text"
                                            title="Trường này phải là số, nhỏ hơn 11
                                        ký tự"
                                            >Trường này phải là số, nhỏ hơn 10
                                            ký tự
                                        </label>
                                    </div>
                                    <div class="form width-40 margleft-6">
                                        <label class="form-label"
                                            >Ngày cấp</label
                                        >
                                        <input
                                            class="form-input"
                                            type="date"
                                            name="input"
                                            tabindex="10"
                                            id="txtNgayCapCMND"
                                            v-model="employee.identityDate"
                                        />
                                    </div>
                                </div>
                                <div class="form">
                                    <label class="form-label">Nơi cấp </label>
                                    <input
                                        class="form-input"
                                        type="text"
                                        name="input"
                                        placeholder="Nơi cấp"
                                        tabindex="11"
                                        id="txtNoiCap"
                                        v-model="employee.identityPlace"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-body-bottom">
                            <div class="form">
                                <label class="form-label">Địa chỉ</label>
                                <input
                                    class="form-input"
                                    type="text"
                                    name="input"
                                    placeholder="Địa chỉ"
                                    tabindex="12"
                                    id="txtDiaChi"
                                    v-model="employee.address"
                                />
                            </div>
                            <div class="form-body-bottom-wrap">
                                <div class="form flex-1">
                                    <label
                                        class="form-label"
                                        title="Điện thoại di động"
                                        >ĐT di động
                                    </label>
                                    <input
                                        class="form-input number phoneNumber"
                                        type="text"
                                        name="input"
                                        placeholder="ĐT di động"
                                        tabindex="13"
                                        id="txtDTDiDong"
                                        v-model="employee.phoneNumber"
                                    />
                                </div>
                                <div class="form flex-1 margleft-6">
                                    <label
                                        class="form-label"
                                        title="Điện thoại cố định"
                                        >ĐT cố định
                                    </label>
                                    <input
                                        class="form-input number phoneNumber"
                                        type="text"
                                        name="input"
                                        placeholder="ĐT cố định"
                                        title="Điện thoại cố định"
                                        tabindex="14"
                                        id="txtDTCoDinh"
                                        v-model="employee.telephoneNumber"
                                    />
                                </div>
                                <div class="form flex-1 margleft-6">
                                    <label class="form-label">Email </label>
                                    <input
                                        class="form-input"
                                        type="email"
                                        name="input"
                                        placeholder="Email"
                                        tabindex="15"
                                        id="txtEmail"
                                        v-model="employee.email"
                                        :class="error.Email"
                                        @blur="validateEmail(employee.email)"
                                    />
                                    <label
                                        v-if="error.Email"
                                        class="error-text"
                                        title="Trường này phải là email"
                                        >Trường này phải là email</label
                                    >
                                </div>
                                <div class="form flex-1 margleft-6"></div>
                            </div>
                            <div class="form-body-bottom-wrap">
                                <div class="form flex-1">
                                    <label class="form-label"
                                        >Tài khoản ngân hàng
                                    </label>
                                    <input
                                        class="form-input number"
                                        type="text"
                                        name="input"
                                        placeholder="Tài khoản ngân hàng"
                                        tabindex="16"
                                        id="txtTKNH"
                                        v-model="employee.bankAccountNumber"
                                    />
                                </div>
                                <div class="form flex-1 margleft-6">
                                    <label class="form-label"
                                        >Tên ngân hàng
                                    </label>
                                    <input
                                        class="form-input"
                                        type="text"
                                        name="input"
                                        placeholder="Tên ngân hàng"
                                        tabindex="17"
                                        id="txtTenNH"
                                        v-model="employee.bankName"
                                    />
                                </div>
                                <div class="form flex-1 margleft-6">
                                    <label class="form-label">Chi nhánh</label>
                                    <input
                                        class="form-input"
                                        type="text"
                                        name="input"
                                        placeholder="Chi nhánh"
                                        tabindex="18"
                                        id="txtChiNhanh"
                                        v-model="employee.bankBranchName"
                                    />
                                </div>
                                <div class="form flex-1 margleft-6"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="modal-footer-left flex-1">
                        <BaseButtonVue
                            class="dialog-footer-cancel"
                            tabindex="21"
                            id="cancel-add-form"
                            title="Hủy"
                            @click="onCloseModal"
                            @blur="tabOrder"
                        />
                    </div>
                    <div class="modal-footer-right flex-1">
                        <BaseButtonVue
                            tabindex="20"
                            id="cancel-add-form"
                            title="Cất"
                            type="submit"
                            :class="[id == 'edit-form' && 'pri-btn']"
                            @click="save()"
                        />

                        <BaseButtonVue
                            v-if="id != 'edit-form'"
                            tabindex="19"
                            :id="idButton"
                            :title="titleButton"
                            class="pri-btn margleft-12"
                            type="submit"
                            @click="saveAndAdd()"
                        />
                    </div>
                </div>
            </div>
        </div>
        <BaseDialogInforVue
            v-if="isError"
            :employeeCode="this.employee.employeeCode"
            :statusValidate="errorMgs"
            @closeDialog="onCloseDialog"
        />
    </div>
</template>
<script>
import BaseInputVue from "./BaseInput.vue";
import BaseButtonVue from "./BaseButton.vue";
import BaseDropdownVue from "./BaseDropdown.vue";
import BaseRadioVue from "./BaseRadio.vue";
import BaseDialogInforVue from "./BaseDialogInfor.vue";
import axios from "axios";
export default {
    name: "BaseModal",
    components: {
        BaseInputVue,
        BaseButtonVue,
        BaseDropdownVue,
        BaseRadioVue,
        BaseDialogInforVue,
    },

    props: {
        id: String,
        employeeCode: String,
        employeeID: String,
    },
    beforeMount() {
        // Xử lý UI form thêm hoặc sửa trước khi mở form
        this.handleUI();
        // Lấy danh sách phòng ban đưa lên UI
        this.getDepartment();
    },
    // Tự động focus mã nhân viên khi form mở
    mounted() {
        const me = this;
        this.$refs.inputEmployeeCode.focus();
        window.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                me.save();
            }
            if (event.keyCode === 16 && event.keyCode === 13) {
                me.saveAndAdd();
            }
        });
    },
    methods: {
        /**
         * Thực hiện xử lý tab order
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        tabOrder() {
            this.$refs.inputEmployeeCode.focus();
        },
        /**
         * Thực hiện xử lý đóng form
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onCloseModal() {
            this.$emit("closeModal");
        },
        /**
         * Thực hiện xử lý đóng dialog
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        onCloseDialog() {
            this.isError = !this.isError;
        },
        /**
         * Thực hiện xử lý UI form thêm nhân viên, sửa nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        handleUI() {
            // Thêm nhân viên
            if (this.id == "add-form") {
                this.title = "Thêm nhân viên";
                this.idButton = "save";
                this.titleButton = "Cất và Thêm";
                // Xử lý Lấy mã nhân viên mới
                this.getNewEmployeeCode();
            }
            // Sửa nhân viên
            if (this.id == "edit-form") {
                this.title = "Sửa nhân viên";
                this.idButton = "edit";
                // Lấy dữ liệu nhân viên đưa vào trong form
                this.userInfo(this.employeeID);
            }
            // Nhân bản nhân viên
            if (this.id == "duplicate") {
                this.title = "Thêm nhân viên";
                this.idButton = "save";
                this.titleButton = "Cất và Thêm";
                this.employee.employeeCode = "";
                // Lấy dữ liệu nhân viên đưa vào trong form
                this.userInfo(this.employeeID);
                // Xử lý Lấy mã nhân viên mới
                this.getNewEmployeeCode();
            }
        },
        /**
         * Thực hiện lấy dữ giới tính
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getGender(event) {
            this.employee.gender = event;
        },
        /**
         * Thực hiện lấy dữ liệu đơn vị gồm id và tên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getDepartmentId(event) {
            this.employee.departmentID = event;
        },
        getDepartmentName(event) {
            this.employee.departmentName = event;
        },
        /**
         * Thực hiện xử lý validate dữ liệu mã nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        validateEmployeeCode(code) {
            if (!code) {
                this.error.EmployeeCode = "form-input-error";
            } else {
                this.error.EmployeeCode = "";
            }
        },
        /**
         * Thực hiện xử lý validate dữ liệu tên nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        validateEmployeeName(name) {
            if (!name) {
                this.error.EmployeeName = "form-input-error";
            } else {
                this.error.EmployeeName = "";
            }
        },
        /**
         * Thực hiện xử lý validate dữ liệu trường email
         **  Author: Nguyễn Quang Minh(22/11/2022)
         */
        validateEmail(email) {
            if (email != "") {
                // regex email xem có hợp lệ nếu đúng là true
                let check = String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                if (check) {
                    this.error.Email = "";
                } else {
                    this.error.Email = "form-input-error";
                }
            } else {
                this.error.Email = "";
            }
        },
        /**
         * Thực hiện xử lý validate dữ liệu ngày sinh
         **  Author: Nguyễn Quang Minh(22/11/2022)
         */
        validateDOB(txtDate) {
            // Đổi date từ date value => Javascript date
            var today = new Date();
            var BODate = new Date(txtDate);
            //Điểu kiện

            if (BODate > today) {
                this.error.DateOfBirth = "form-input-error";
            } else {
                this.error.DateOfBirth = "";
            }
        },

        /**
         * Thực hiện validate dữ liệu khi ấn lưu
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        validateForm() {
            // validate trường mã
            if (!this.employee.employeeCode) {
                this.error.EmployeeCode = "form-input-error";
                this.$refs.inputEmployeeCode.focus();

                return false;
            } else {
                this.error.EmployeeCode = "";
            }
            // validate trường tên
            if (!this.employee.employeeName) {
                this.error.EmployeeName = "form-input-error";
                this.$refs.inputEmployeeName.focus();
                return false;
            } else {
                this.error.EmployeeName = "";
            }
            //validate trường đơn vị
            if (!this.employee.departmentName) {
                this.error.DepartmentName = false;
                return false;
            }
            return true;
        },
        /**
         * Thực hiện format date từ api trả về
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        formatDate(date) {
            if (date) {
                var d = new Date(date),
                    month = "" + (d.getMonth() + 1),
                    day = "" + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                return [year, month, day].join("-");
            } else {
                return null;
            }
        },
        /**
         * Thực hiện lấy mã nhân viên mới nhất
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getNewEmployeeCode() {
            try {
                const me = this;
                if (this.id != "edit-form") {
                    axios
                        .get(
                            "http://localhost:5165/api/Employees/NewEmployeeCode"
                        )
                        .then((response) => {
                            this.employee.employeeCode = response.data;
                        })
                        .catch((error) => {
                            me.$emit("Success", "false");
                        });
                }
            } catch (error) {
                this.$emit("Success", "false");
            }
        },
        /**
         * Thực hiện lấy Danh sách đơn vị
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getDepartment() {
            const me = this;
            try {
                axios
                    .get("http://localhost:5165/api/Departments")
                    .then((res) => {
                        this.departmentList = res.data;
                    })
                    .catch((res) => {
                        me.$emit("Success", "false");
                    });
            } catch (error) {
                me.$emit("Success", "false");
            }
        },
        /**
         * Thực hiện lấy dữ liệu nhân viên đưa ra form
         **  Author: Nguyễn Quang Minh(29/10/2022)
         */

        userInfo(id) {
            try {
                if (this.id != "add-form") {
                    const me = this;
                    axios
                        .get(`http://localhost:5165/api/Employees/${id}`)
                        .then((response) => {
                            me.employee = response.data;
                            me.employee.dateOfBirth = this.formatDate(
                                response.data.dateOfBirth
                            );
                            me.employee.identityDate = this.formatDate(
                                response.data.identityDate
                            );
                            me.employee.gender = response.data.gender;
                            me.$emit("removeLoading");
                        })
                        .catch((error) => {
                            me.$emit("Success", "false");
                        });
                }
            } catch (error) {
                this.$emit("Success", "false");
            }
        },
        /**
         * Thực hiện Lưu dữ liệu thêm mới hoặc sửa nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */

        save() {
            const validate = this.validateForm();

            const me = this;

            try {
                // Thêm mới nhân viên
                if (
                    validate &&
                    (this.id == "add-form" || this.id == "duplicate")
                ) {
                    // Kiểm tra giá trị ô ngày sinh
                    if (this.employee.dateOfBirth) {
                        // Format dữ liệu ngày tháng
                        this.employee.dateOfBirth = new Date(
                            this.employee.dateOfBirth
                        );
                    } else {
                        this.employee.dateOfBirth = null;
                    }
                    // Kiểm tra giá trị ô ngày cấp
                    if (this.employee.identityDate) {
                        // Format dữ liệu ngày tháng
                        this.employee.identityDate = new Date(
                            this.employee.identityDate
                        );
                    } else {
                        this.employee.identityDate = null;
                    }
                    // Đổi kiểu dữ liệu trường gender sang emun
                    this.employee.gender =
                        this.employee.gender || this.employee.gender == 0
                            ? parseInt(this.employee.gender)
                            : 2;
                    axios
                        .post(
                            "http://localhost:5165/api/Employees",
                            this.employee
                        )
                        .then(function (response) {
                            // Đóng và load lại trang
                            me.onCloseModal();
                            me.$emit("refreshData");
                            me.$emit("Success", "success");
                        })
                        .catch(function (error) {
                            if (error) {
                                // Thông báo lỗi
                                me.isError = !me.isError;
                                me.errorMgs = error.response.data.userMsg;
                            }
                        });
                }
                // Sửa nhân viên
                if (validate && this.id == "edit-form") {
                    // Kiểm tra giá trị ô ngày sinh
                    if (this.employee.dateOfBirth) {
                        // Format dữ liệu ngày tháng
                        this.employee.dateOfBirth = new Date(
                            this.employee.dateOfBirth
                        );
                    }
                    // Kiểm tra giá trị ô ngày sinh
                    if (this.employee.identityDate) {
                        // Format dữ liệu ngày tháng
                        this.employee.identityDate = new Date(
                            this.employee.identityDate
                        );
                    }
                    // Đổi kiểu dữ liệu trường gender sang emun
                    this.employee.gender =
                        this.employee.gender || this.employee.gender == 0
                            ? parseInt(this.employee.gender)
                            : 2;
                    axios
                        .put(
                            `http://localhost:5165/api/Employees/${this.employeeID}`,
                            this.employee
                        )
                        .then((response) => {
                            // Đóng và load loại data
                            me.onCloseModal();
                            me.$emit("refreshData");
                            me.$emit("Success", "success");
                        })
                        .catch((error) => {
                            if (error) {
                                // Thông báo lỗi
                                me.isError = !me.isError;
                                me.errorMgs = error.response.data.userMsg;
                            }
                        });
                }
            } catch (error) {
                me.$emit("Success", "false");
            }
        },
        /**
         * Thực hiện xử lý Lưu nhân viên khi ấn button thêm và cất
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        saveAndAdd() {
            // Validate dữ liệu
            const validate = this.validateForm();

            const me = this;
            try {
                if (validate) {
                    // Kiểm tra giá trị ô ngày sinh
                    if (this.employee.dateOfBirth) {
                        // Format dữ liệu ngày tháng
                        this.employee.dateOfBirth = new Date(
                            this.employee.dateOfBirth
                        );
                    } else {
                        this.employee.dateOfBirth = null;
                    }
                    // Kiểm tra giá trị ô ngày sinh
                    if (this.employee.identityDate) {
                        // Format dữ liệu ngày tháng
                        this.employee.identityDate = new Date(
                            this.employee.identityDate
                        );
                    } else {
                        this.employee.identityDate = null;
                    }
                    // Đổi kiểu dữ liệu trường gender sang emun
                    this.employee.gender =
                        this.employee.gender || this.employee.gender == 0
                            ? parseInt(this.employee.gender)
                            : 2;
                    axios
                        .post(
                            "http://localhost:5165/api/Employees",
                            this.employee
                        )
                        .then(function (response) {
                            // Load lại dữ liệu và form
                            me.$emit("refreshData");
                            me.employee = {
                                employeeCode: "",
                                employeeName: "",
                                departmentID: "",
                                gender: "",
                                jobPositionName: "",
                                dateOfBirth: "",
                                identityNumber: "",
                                identityDate: "",
                                identityPlace: "",
                                address: "",
                                phoneNumber: "",
                                telephoneNumber: "",
                                email: "",
                                bankAccountNumber: "",
                                bankName: "",
                                bankBranchName: "",
                                departmentName: "",
                            };
                        })
                        .catch(function (error) {
                            if (error) {
                                // Thông báo lỗi
                                me.isError = !me.isError;
                                me.errorMgs = error.response.data.userMsg;
                            }
                        });
                    // Lấy mã nhân viên mới
                    me.getNewEmployeeCode();
                }
            } catch (error) {
                me.$emit("Success", "false");
            }
        },
    },
    data() {
        return {
            isDialog: false,
            error: {
                EmployeeCode: "",
                EmployeeName: "",
                DepartmentName: true,
                DateOfBirth: "",
                Email: "",
            },
            employee: {
                employeeCode: "",
                employeeName: "",
                departmentID: "",
                gender: "",
                jobPositionName: "",
                dateOfBirth: "",
                identityNumber: "",
                identityDate: "",
                identityPlace: "",
                address: "",
                phoneNumber: "",
                telephoneNumber: "",
                email: "",
                bankAccountNumber: "",
                bankName: "",
                bankBranchName: "",
                departmentName: "",
            },
            idButton: "",
            titleButton: "",
            title: "",
            errorMgs: "",
            isError: false,
            departmentList: [],
        };
    },
};
</script>
<style lang=""></style>

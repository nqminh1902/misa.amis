<template lang="">
    <div class="modal" :id="id" @click.self="onCloseModal">
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
                            @blur="tabOrder"
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
                                            v-model="employee.EmployeeCode"
                                            tabindex="1"
                                            :class="error.EmployeeCode"
                                            required
                                            ref="input"
                                            @blur="
                                                validateEmployeeCode(
                                                    employee.EmployeeCode
                                                )
                                            "
                                            @input="
                                                validateEmployeeCode(
                                                    employee.EmployeeCode
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
                                            v-model="employee.EmployeeName"
                                            :class="error.EmployeeName"
                                            required
                                            @blur="
                                                validateEmployeeName(
                                                    employee.EmployeeName
                                                )
                                            "
                                            @input="
                                                validateEmployeeName(
                                                    employee.EmployeeName
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
                                    :departmentList="departmentList"
                                    :departmentId="employee.DepartmentId"
                                    :departmentName="employee.DepartmentName"
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
                                        v-model="employee.EmployeePosition"
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
                                            v-model="employee.DateOfBirth"
                                        />
                                        <label class="error-text" title=""
                                            >Nhập lại ngày sinh</label
                                        >
                                    </div>
                                    <div class="form width-60 margleft-16">
                                        <label class="form-label"
                                            >Giới tính
                                        </label>
                                        <BaseRadioVue
                                            :genderValue="employee.Gender"
                                            @gender="getGender($event)"
                                        />
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
                                            v-model="employee.IdentityNumber"
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
                                            v-model="employee.IdentityDate"
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
                                        v-model="employee.IdentityPlace"
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
                                    v-model="employee.Address"
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
                                        v-model="employee.PhoneNumber"
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
                                        v-model="employee.TelephoneNumber"
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
                                        v-model="employee.Email"
                                    />
                                    <label class="error-text" title=""
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
                                        v-model="employee.BankAccountNumber"
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
                                        v-model="employee.BankName"
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
                                        v-model="employee.BankBranchName"
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
                        />
                    </div>
                    <div class="modal-footer-right flex-1">
                        <BaseButtonVue
                            tabindex="19"
                            id="cancel-add-form"
                            title="Cất"
                            type="submit"
                            :class="[id == 'edit-form' && 'pri-btn']"
                            @click="save()"
                        />

                        <BaseButtonVue
                            v-if="id == 'add-form'"
                            tabindex="20"
                            :id="idButton"
                            :title="titleButton"
                            class="pri-btn margleft-12"
                            type="submit"
                            @click="saveAndAdd(e)"
                        />
                    </div>
                </div>
            </div>
        </div>
        <BaseDialogInforVue
            v-if="isError"
            dialogName="validate"
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
        employeeId: String,
    },
    beforeMount() {
        // Xử lý UI form thêm hoặc sửa trước khi mở form
        this.handleUI();
        // Xử lý Lấy mã nhân viên mới
        this.getNewEmployeeCode();
        // Lấy danh sách phòng ban đưa lên UI
        this.getDepartment();
        // Lấy dữ liệu nhân viên đưa vào trong form
        this.userInfo(this.employeeCode);
    },
    // Tự động focus mã nhân viên khi form mở
    mounted() {
        this.$refs.input.focus();
    },
    methods: {
        /**
         * Thực hiện xử lý tab order
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        tabOrder() {
            this.$refs.input.focus();
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
            }
            // Sửa nhân viên
            if (this.id == "edit-form") {
                this.title = "Sửa nhân viên";
                this.idButton = "edit";
                this.titleButton = "Cất và Sửa";
            }
        },
        /**
         * Thực hiện lấy dữ giới tính
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getGender(event) {
            this.employee.Gender = event;
        },
        /**
         * Thực hiện lấy dữ liệu đơn vị gồm id và tên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getDepartmentId(event) {
            this.employee.DepartmentId = event;
        },
        getDepartmentName(event) {
            this.employee.DepartmentName = event;
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
         * Thực hiện validate dữ liệu khi ấn lưu
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        validateForm() {
            if (!this.employee.EmployeeCode) {
                this.error.EmployeeCode = "form-input-error";
                return false;
            } else {
                this.error.EmployeeCode = "";
            }
            if (!this.employee.EmployeeName) {
                this.error.EmployeeName = "form-input-error";
                return false;
            } else {
                this.error.EmployeeName = "";
            }
            if (!this.employee.DepartmentName) {
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
            if (this.id == "add-form") {
                axios
                    .get(
                        "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode"
                    )
                    .then((response) => {
                        this.employee.EmployeeCode = response.data;
                    })
                    .catch((error) => {
                        alert("bi lỗi lấy mã nhân viên");
                    });
            }
        },
        /**
         * Thực hiện lấy Danh sách đơn vị
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        getDepartment() {
            axios
                .get("https://amis.manhnv.net/api/v1/Departments")
                .then((res) => {
                    this.departmentList = res.data;
                })
                .catch((res) => {});
        },
        /**
         * Thực hiện lấy dữ liệu nhân viên đưa ra form
         **  Author: Nguyễn Quang Minh(29/10/2022)
         */

        userInfo(id) {
            try {
                if (this.id == "edit-form") {
                    const me = this;
                    axios
                        .get(
                            `https://amis.manhnv.net/api/v1/Employees/filter?employeeFilter=${id}`
                        )
                        .then((response) => {
                            me.employee = response.data.Data[0];
                            me.employee.DateOfBirth = this.formatDate(
                                response.data.Data[0].DateOfBirth
                            );
                            me.employee.IdentityDate = this.formatDate(
                                response.data.Data[0].IdentityDate
                            );
                            me.employee.Gender = response.data.Data[0].Gender;
                        })
                        .catch((error) => {
                            if (error) {
                                me.isError = !me.isError;
                                me.errorMgs = error.response.data.userMsg;
                            }
                        });
                }
            } catch (error) {}
        },
        /**
         * Thực hiện Lưu dữ liệu thêm mới hoặc sửa nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */

        save() {
            const validate = this.validateForm();

            const me = this;
            // Thêm mới nhân viên
            if (validate && this.id == "add-form") {
                if (this.employee.DateOfBirth) {
                    this.employee.DateOfBirth = new Date(
                        this.employee.DateOfBirth
                    );
                }
                if (this.employee.IdentityDate) {
                    this.employee.IdentityDate = new Date(
                        this.employee.IdentityDate
                    );
                }
                axios
                    .post(
                        "https://amis.manhnv.net/api/v1/Employees",
                        this.employee
                    )
                    .then(function (response) {
                        me.onCloseModal();
                        me.$emit("refreshData");
                    })
                    .catch(function (error) {
                        if (error) {
                            me.isError = !me.isError;
                            me.errorMgs = error.response.data.userMsg;
                        }
                    });
            }
            // Sửa nhân viên
            if (validate && this.id == "edit-form") {
                if (this.employee.DateOfBirth) {
                    this.employee.DateOfBirth = new Date(
                        this.employee.DateOfBirth
                    );
                }
                if (this.employee.IdentityDate) {
                    this.employee.IdentityDate = new Date(
                        this.employee.IdentityDate
                    );
                }
                axios
                    .put(
                        `https://amis.manhnv.net/api/v1/Employees/${this.employeeId}`,
                        this.employee
                    )
                    .then((response) => {
                        me.onCloseModal();
                        me.$emit("refreshData");
                    })
                    .catch((error) => {
                        if (error) {
                            me.isError = !me.isError;
                            me.errorMgs = error.response.data.userMsg;
                        }
                    });
            }
        },
        /**
         * Thực hiện xử lý Lưu nhân viên khi ấn button thêm và cất
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        saveAndAdd() {
            const validate = this.validateForm();

            const me = this;
            if (validate && this.id == "add-form") {
                if (this.employee.DateOfBirth) {
                    this.employee.DateOfBirth = new Date(
                        this.employee.DateOfBirth
                    );
                }
                if (this.employee.IdentityDate) {
                    this.employee.IdentityDate = new Date(
                        this.employee.IdentityDate
                    );
                }
                axios
                    .post(
                        "https://amis.manhnv.net/api/v1/Employees",
                        this.employee
                    )
                    .then(function (response) {
                        me.$emit("refreshData");
                        me.employee = {
                            EmployeeCode: "",
                            EmployeeName: "",
                            DepartmentId: "",
                            DepartmentName: "",
                            Gender: "",
                            EmployeePosition: "",
                            DateOfBirth: "",
                            IdentityNumber: "",
                            IdentityDate: "",
                            IdentityPlace: "",
                            Address: "",
                            PhoneNumber: "",
                            TelephoneNumber: "",
                            Email: "",
                            BankAccountNumber: "",
                            BankName: "",
                            BankBranchName: "",
                        };
                    })
                    .catch(function (error) {
                        if (error) {
                            me.isError = !me.isError;
                            me.errorMgs = error.response.data.userMsg;
                        }
                    });
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
            },
            employee: {
                EmployeeCode: "",
                EmployeeName: "",
                DepartmentId: "",
                DepartmentName: "",
                Gender: "",
                EmployeePosition: "",
                DateOfBirth: "",
                IdentityNumber: "",
                IdentityDate: "",
                IdentityPlace: "",
                Address: "",
                PhoneNumber: "",
                TelephoneNumber: "",
                Email: "",
                BankAccountNumber: "",
                BankName: "",
                BankBranchName: "",
            },
            idButton: "",
            titleButton: "",
            title: "",
            errorMgs: "",
            isError: false,
            departmentList: {},
        };
    },
};
</script>
<style lang=""></style>

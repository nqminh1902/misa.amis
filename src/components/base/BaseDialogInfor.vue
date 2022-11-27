<template lang="">
    <div class="overlay" :id="dialogName" @click.self="onClose">
        <div class="dialog-container">
            <div class="dialog-body">
                <div
                    v-if="statusValidate == 'Mã nhân viên bị trùng'"
                    class="dialog-body-warning"
                ></div>
                <div
                    v-else-if="dialogName == 'validate'"
                    class="dialog-body-validate"
                ></div>

                <div v-else class="dialog-body-warning"></div>

                <span class="warning-status">
                    {{ renderStatus() }}
                </span>
            </div>
            <div
                class="dialog-footer"
                :class="dialogName == 'validate' && 'dialog-footer-cancel'"
            >
                <div>
                    <button
                        class="btn"
                        @click="onClose"
                        v-if="dialogName == 'delete'"
                    >
                        Không
                    </button>
                    <button
                        class="btn"
                        @click="onClose"
                        v-else-if="dialogName == 'deleteMultiple'"
                    >
                        Không
                    </button>
                </div>
                <div class="dialog-footer-btn">
                    <button
                        class="btn pri-btn"
                        id="{{buttonId}}"
                        @click="handleDialog"
                    >
                        {{ buttonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "BaseDialogInfor",
    props: [
        "dialogName",
        "employeeID",
        "employeeCode",
        "statusValidate",
        "deleteBatch",
    ],
    data() {
        return {
            deleteStatus: "",
            waringValidateStatus: null,
            buttonId: null,
            buttonText: "",
            selected: this.deleteBatch || [],
        };
    },

    mounted() {
        this.buttonTextUI();
    },

    methods: {
        /**
         * Thực hiện chuyên thông báo đóng dialog vào component cha
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onClose() {
            this.$emit("closeDialog");
        },

        handleDialog() {
            if (this.dialogName == "delete") {
                this.onDelete();
            } else if (this.dialogName == "deleteMultiple") {
                this.deleteMultiple();
            } else {
                this.onClose();
            }
        },

        /**
         * Thực hiện xử lý api xóa dữ liệu nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        onDelete() {
            const me = this;
            try {
                axios
                    .delete(
                        `http://localhost:5165/api/Employees/${me.employeeID}`
                    )
                    .then((response) => {
                        me.onClose();
                        me.$emit("deleteSuccess");
                        me.$emit("Success", "successUpdate");
                    })
                    .catch((error) => {
                        me.$emit("Success", "false");
                    });
            } catch (error) {
                me.$emit("Success", "false");
            }
        },

        /**
         * Thực hiện xử lý Xóa các bản ghi đã chọn
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        deleteMultiple() {
            const me = this;
            try {
                axios
                    .post("http://localhost:5165/api/Employees/deleteBatch", {
                        EmployeeIDs: me.selected,
                    })
                    .then((response) => {
                        // Mảng id bản ghi đã chọn cho bằng mảng trống
                        me.$emit("deleteSuccess");
                        me.$emit("Success", "successUpdate");
                    })
                    .catch((error) => {
                        me.$emit("Success", "false");
                    });
            } catch (error) {
                me.$emit("Success", "false");
            }
        },

        /**
         * Thực hiện thông báo status khi xóa nhân viện hoặc hiển thị lỗi khi lưu hoặc sửa form
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        renderStatus() {
            if (this.dialogName == "delete") {
                return `Bạn có thực sự muốn xóa Nhân viên <${this.employeeCode}> không?`;
            }
            if (this.dialogName == "deleteMultiple") {
                return "Bạn có thực sự muốn xóa nhân viên đã chọn không";
            }
            if (this.dialogName == "validate") {
                if (this.statusValidate == "Mã nhân viên bị trùng") {
                    return `Mã nhân viên <${this.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại`;
                }
                return this.statusValidate;
            }
        },

        /**
         * Thực hiện Text button trong dialog
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        buttonTextUI() {
            if (
                this.dialogName == "delete" ||
                this.dialogName == "deleteMultiple"
            ) {
                this.buttonText = "Có";
            } else if (this.dialogName == "validate") {
                this.buttonText = "Đóng";
            } else {
                this.buttonText = "Đồng ý";
            }
        },
    },
};
</script>
<style lang=""></style>

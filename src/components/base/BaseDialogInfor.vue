<template lang="">
    <div class="overlay" :id="dialogName" @click.self="onClose">
        <div class="dialog-container">
            <div class="dialog-body">
                <div class="dialog-body-warning"></div>

                <span class="warning-status">
                    {{ renderStatus() }}
                </span>
            </div>
            <div class="dialog-footer">
                <div>
                    <button
                        class="btn dialog-footer-cancel"
                        @click="onClose"
                        v-if="dialogName"
                    >
                        Không
                    </button>
                </div>
                <div class="dialog-footer-btn">
                    <button
                        class="btn delete-btn"
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
        const me = this;
        window.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                me.handleDialog();
            }
            if (event.keyCode === 27) {
                me.onClose();
            }
        });
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
                        me.$emit("Success", "success");
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
                        me.$emit("Success", "success");
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
            if (this.statusValidate) {
                return `Mã nhân viên <${this.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại`;
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
            } else {
                this.buttonText = "Đồng ý";
            }
        },
    },
};
</script>
<style lang=""></style>

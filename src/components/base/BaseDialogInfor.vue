<template lang="">
    <div class="overlay" :id="dialogName" @click.self="onClose">
        <div class="dialog-container">
            <div class="dialog-body">
                <div
                    v-if="dialogName == 'delete'"
                    class="dialog-body-warning"
                ></div>
                <div v-else class="dialog-body-validate"></div>

                <span class="warning-status">
                    {{ renderStatus() }}
                </span>
            </div>
            <div
                class="dialog-footer"
                :class="dialogName == 'validate' && 'alig-centre'"
            >
                <div>
                    <button
                        class="btn dialog-footer-cancel"
                        @click="onClose"
                        :class="dialogName == 'validate' && 'pri-btn'"
                    >
                        {{ (dialogName == "delete" && buttonText) || "Đóng" }}
                    </button>
                </div>
                <div class="dialog-footer-btn">
                    <button
                        class="btn delete-btn"
                        id="{{buttonId}}"
                        @click="handleDelete"
                        v-if="dialogName == 'delete'"
                    >
                        Có
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
    props: ["dialogName", "employeeId", "employeeCode", "statusValidate"],
    data() {
        return {
            deleteStatus: "",
            waringValidateStatus: null,
            buttonId: null,
            buttonText: "Hủy",
        };
    },
    methods: {
        /**
         * Thực hiện chuyên thông báo đóng dialog vào component cha
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onClose() {
            this.$emit("closeDialog");
        },
        /**
         * Thực hiện xử lý api xóa dữ liệu nhân viên
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        handleDelete() {
            axios
                .delete(
                    `https://amis.manhnv.net/api/v1/Employees/${this.employeeId}`
                )
                .then((response) => {
                    this.onClose();
                    this.$emit("deleteSuccess");
                })
                .catch((error) => {
                    alert("bi lỗi");
                });
        },
        /**
         * Thực hiện thông báo status khi xóa nhân viện hoặc hiển thị lỗi khi lưu hoặc sửa form
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        renderStatus() {
            if (this.dialogName == "delete") {
                return `Bạn có thực sự muốn xóa Nhân viên <${this.employeeCode}> không?`;
            }
            if (this.dialogName == "validate") {
                return this.statusValidate;
            }
        },
    },
};
</script>
<style lang=""></style>

<template lang="">
    <div class="toast">
        <div class="toast-content">
            <i :class="icon" class="icon"></i>

            <div class="message">
                <span
                    class="text text-1"
                    :class="
                        (success == 'false' && 'color-warning') ||
                        'color-success'
                    "
                    >{{ `${title}` }}</span
                >
                <span class="text margleft-6">{{ description }}</span>
            </div>
            <div class="closeToast">
                <a href="">Hoàn tác</a>
                <i
                    class="fa-sharp fa-solid fa-xmark close margleft-10"
                    @click="onClose"
                ></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BaseToast",
    props: {
        success: String,
    },
    mounted() {
        this.handleUI();
    },
    methods: {
        onClose() {
            this.$emit("closeToast");
        },
        handleUI() {
            if (this.success == "successInsert") {
                this.icon = "fa-solid fa-circle-check color-success";
                this.title = "Thành công";
                this.description = "Đã thêm mới";
            } else if (this.success == "successDelete") {
                this.icon = "fa-solid fa-circle-check color-success";
                this.title = "Thành công";
                this.description = "Đã bị xóa";
            } else if (this.success == "successUpdate") {
                this.icon = "fa-solid fa-circle-check color-success";
                this.title = "Thành công";
                this.description = "Đã cập nhật";
            } else {
                this.icon = "fa-sharp fa-solid fa-circle-xmark color-warning";
                this.title = "Lỗi!";
                this.description =
                    "Không thể cập nhật được dữ liệu vui lòng liên hệ với Misa";
            }
        },
    },
    data() {
        return {
            icon: "",
            title: "",
            description: "",
        };
    },
};
</script>
<style scoped>
a {
    font-weight: 500;
    color: #1f1f1f;
    font-size: 14px;
}
.toast {
    position: absolute;
    left: 50%;
    max-width: 650px;
    min-height: 56px;
    border-radius: 4px;
    background: #fff;
    padding: 20px 16px 20px 16px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
    overflow: hidden;
    transform: translateX(-50%);
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 669;
}

.icon {
    font-size: 21px;
}

.color-success {
    color: #089740;
}

.color-warning {
    color: #e60000;
}
.toast.active {
    transform: translateX(0%);
}

.toast .toast-content {
    display: flex;
}

.toast-content .check {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 35px;
    background-color: #2770ff;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
}

.toast-content .message {
    display: flex;
    margin: 0 12px;
    max-width: 460px;
}

.message .text {
    font-size: 16px;
    font-weight: 400;
}

.message .text.text-1 {
    font-weight: 600;
}

.closeToast {
    width: 126px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.toast .close {
    cursor: pointer;
    opacity: 0.7;
    width: 16px;
}

.toast .close:hover {
    opacity: 1;
}

.toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
}

@keyframes progress {
    100% {
        right: 100%;
    }
}
</style>

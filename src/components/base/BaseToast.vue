<template lang="">
    <div class="toast active">
        <div class="toast-content">
            <i :class="icon" class="icon"></i>

            <div class="message">
                <span
                    class="text text-1"
                    :class="(success && 'color-success') || 'color-warning'"
                    >{{ title }}</span
                >
                <span class="text text-2">{{ description }}</span>
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
        handleUI() {
            if (this.success == "success") {
                this.icon = "fa-solid fa-circle-check color-success";
                this.title = "Thành công";
                this.description = "";
            } else {
                this.icon = "fa-solid fa-triangle-exclamation color-warning";
                this.title = "Thất bại";
                this.description = "Vui lòng liên hệ với MISA";
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
.toast {
    position: absolute;
    bottom: 100px;
    right: 30px;
    border-radius: 12px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
    z-index: 669;
}

.icon {
    font-size: 32px;
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
    align-items: center;
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
    flex-direction: column;
    margin: 0 20px;
}

.message .text {
    font-size: 16px;
    font-weight: 400;
}

.message .text.text-1 {
    font-weight: 600;
}

.toast .close {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
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

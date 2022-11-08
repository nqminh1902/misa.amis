<template lang="">
    <div class="sidebar" :class="[isSmallSidebar && sideBarWidth]">
        <ul class="sidebar-list">
            <li class="sidebar-list-item" title="Tổng quan">
                <div class="icon-tong-quan"></div>
                <span v-if="!isSmallSidebar">Tổng quan</span>
            </li>
            <li class="sidebar-list-item" title="Tiền mặt">
                <div class="icon-tien-mat"></div>
                <span v-if="!isSmallSidebar">Tiền mặt</span>
            </li>
            <li class="sidebar-list-item" title="Tiền gửi">
                <div class="icon-hop-dong"></div>
                <span v-if="!isSmallSidebar">Tiền gửi</span>
            </li>
            <li class="sidebar-list-item" title="Mua hàng">
                <div class="icon-mua-hang"></div>
                <span v-if="!isSmallSidebar">Mua hàng</span>
            </li>
            <li class="sidebar-list-item" title="Bán hàng">
                <div class="icon-ban-hang"></div>
                <span v-if="!isSmallSidebar">Bán hàng</span>
            </li>
            <li class="sidebar-list-item" title="Quản lý hóa đơn">
                <div class="icon-qlhd"></div>
                <span v-if="!isSmallSidebar">Quản lý hóa đơn</span>
            </li>
            <li class="sidebar-list-item" title="Kho">
                <div class="icon-kho"></div>
                <span v-if="!isSmallSidebar">Kho</span>
            </li>
            <li class="sidebar-list-item" title="Công cụ dụng cụ">
                <div class="icon-cong-dung-cu"></div>
                <span v-if="!isSmallSidebar">Công cụ dụng cụ</span>
            </li>
            <li class="sidebar-list-item" title="Tài sản cố định">
                <div class="icon-tai-san-co-dinh"></div>
                <span v-if="!isSmallSidebar">Tài sản cố định</span>
            </li>
            <li class="sidebar-list-item" title="Thuế">
                <div class="icon-thue"></div>
                <span v-if="!isSmallSidebar">Thuế</span>
            </li>
            <li class="sidebar-list-item" title="Giá thành">
                <div class="icon-gia-thanh"></div>
                <span v-if="!isSmallSidebar">Giá thành</span>
            </li>
            <li class="sidebar-list-item" title="Tổng hợp">
                <div class="icon-tong-hop"></div>
                <span v-if="!isSmallSidebar">Tổng hợp</span>
            </li>
            <li class="sidebar-list-item" title="Ngân sách">
                <div class="icon-ngan-sach"></div>
                <span v-if="!isSmallSidebar">Ngân sách</span>
            </li>
            <li class="sidebar-list-item" title="Báo cáo">
                <div class="icon-bao-cao"></div>
                <span v-if="!isSmallSidebar">Báo cáo</span>
            </li>
            <li class="sidebar-list-item" title="Phân tích tài chính">
                <div class="icon-pttc"></div>
                <span v-if="!isSmallSidebar">Phân tích tài chính</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "TheSidebar",
    data() {
        return {
            isSmallSidebar: false,

            sideBarWidth: "sidebar-small",
        };
    },
    mounted() {
        // Thực hiện to nhỏ sidebar
        this.emitter.on("toggle-sidebar", (isOpen) => {
            this.isSmallSidebar = isOpen;
        });
    },
};
</script>
<style lang=""></style>

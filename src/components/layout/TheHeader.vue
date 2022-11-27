<template lang="">
    <div class="header">
        <div class="top-sidebar" :class="[isSmallSidebar && sideBarWidth]">
            <div v-if="isSmallSidebar == false" class="top-sidebar-wrap">
                <div class="icon-9-cham"></div>
                <img src="../../assets/img/favicon.ico" alt="" />
                <span>{{ dataResources.webTitle }}</span>
            </div>
            <div
                v-else
                class="icon-3-gach-sidebar"
                @click="toggleSidebar"
            ></div>
        </div>
        <div class="header-wrap">
            <div class="header-left">
                <div
                    v-if="isSmallSidebar == false"
                    class="icon-3-gach"
                    @click="toggleSidebar"
                ></div>
                <span
                    title="Công ty tnhh sản xuất - thương mại - dịch vụ qui phúc"
                    >{{ dataResources.companyName }}</span
                >
                <div class="icon-down margleft-10"></div>
            </div>
            <div class="header-right">
                <div class="icon-bell"></div>
                <div class="header-right-user">
                    <div class="icon-user"></div>
                    <span>{{ dataResources.userName }}</span>
                </div>
                <div class="icon-down-small"></div>
            </div>
        </div>
    </div>
</template>
<script>
import * as resources from "../../common/resources";

export default {
    name: "TheHeader",

    methods: {
        /**
         * Thực hiện xử lý thu nhỏ sideBar
         **  Author: Nguyễn Quang Minh(28/10/2022)
         */
        toggleSidebar() {
            this.isSmallSidebar = !this.isSmallSidebar;
            this.emitter.emit("toggle-sidebar", this.isSmallSidebar);
        },
    },
    data() {
        return {
            isSmallSidebar: false,
            sideBarWidth: "sidebar-small",
            dataResources: resources,
        };
    },
};
</script>
<style scoped></style>

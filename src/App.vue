<template>
    <TheHeader />
    <div class="container">
        <TheSidebar />
        <TheMain />
    </div>
</template>
<script setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheMain from "./components/layout/TheMain.vue";
</script>
<style>
@import url("./components/css/style.css");
</style>

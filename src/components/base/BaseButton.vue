<template lang="">
    <button
        class="btn"
        :class="class"
        :id="id"
        :tabindex="tabindex"
        :type="type"
    >
        {{ title }}
    </button>
</template>
<script>
export default {
    name: "BaseButton",
    props: {
        class: String,
        disable: Boolean,
        title: String,
        id: String,
        tabindex: String,
        type: String,
    },
};
</script>
<style lang=""></style>

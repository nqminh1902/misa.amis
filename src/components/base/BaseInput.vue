<template lang="">
    <main>
        <label v-if="label" class="form-label" :title="title"
            >{{ label }} <span v-if="required">*</span></label
        >
        <input
            class="form-input"
            :class="class"
            :type="type"
            :placeholder="placeholder"
            v-model.lazy="value"
            :tabindex="tabindex"
            :id="id"
            required
        />
    </main>
</template>
<script>
export default {
    name: "BaseInput",
    props: {
        label: String,
        tabindex: String,
        disable: Boolean,
        readOnly: Boolean,
        type: String,
        id: String,
        placeholder: String,
        class: String,
        required: Boolean,
        title: String,
        IsRefresh: Boolean,
    },
    watch: {
        value() {
            this.$emit("value", this.value);
        },
    },
    data() {
        return {
            value: "",
        };
    },
};
</script>
<style lang=""></style>

<template lang="">
    <span
        class="radio-index"
        :tabindex="tabindex"
        :class="value != '0' && 'margleft-12'"
        @focus="radioActive"
    >
        <input
            class="radio"
            type="radio"
            name="gender"
            :value="value"
            v-model="gender"
        />
    </span>
    <span class="radio-title">{{ title }}</span>
</template>
<script>
export default {
    name: "BaseRadio",
    watch: {
        // Chuyền dữ liệu được chọn ra component cha
        gender() {
            this.$emit("gender", this.gender);
        },
        // Nhận dữ liệu từ prop và hiển thị giới tính nhân viên
        genderValue() {
            this.gender = this.genderValue;
        },
    },
    methods: {
        radioActive() {
            if (this.title == "Nam") {
                this.gender = "0";
            }
            if (this.title == "Nữ") {
                this.gender = "1";
            }
            if (this.title == "Khác") {
                this.gender = "2";
            }
        },
    },
    props: {
        label: String,
        tabindex: String,
        type: String,
        id: String,
        class: String,
        required: Boolean,
        value: String,
        name: String,
        title: String,
        genderValue: Number,
    },
    data() {
        return {
            gender: "",
        };
    },
};
</script>
<style lang=""></style>

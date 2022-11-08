<template lang="">
    <div class="form-radio">
        <input
            class="radio"
            type="radio"
            name="gender"
            value="1"
            v-model="gender"
            id="rdMale"
        /><span class="radio-title">Nam</span>
        <input
            class="radio margleft-16"
            type="radio"
            name="gender"
            value="0"
            v-model="gender"
            id="rdFemale"
        /><span class="radio-title">Nữ</span>
        <input
            class="radio margleft-16"
            type="radio"
            name="gender"
            value="2"
            v-model="gender"
            id="rdOrther"
        /><span class="radio-title">Khác</span>
    </div>
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

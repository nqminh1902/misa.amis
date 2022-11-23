<template lang="">
    <div class="form-dropdown">
        <label v-if="label" class="form-label"
            >{{ label }} <span>*</span></label
        >
        <input
            :type="type"
            readonly
            required
            class="dropdown input-employeeDepartment"
            :placeholder="label"
            :value="currentDepartment"
            :id="id"
            :tabindex="tabindex"
            :class="{ 'form-input-error': error }"
            @blur="validateDropdown()"
            @click="ToggleDropdown"
        />
        <label
            v-if="error"
            class="error-text"
            title="Trường này không được để trống"
            >Trường này không được để trống</label
        >
        <div
            class="icon-down absolute-dropdown"
            :class="[{ dropup: isOpenDropdown }]"
        ></div>
        <label class="error-text" title="Trường này không được để trống"
            >Trường này không được để trống</label
        >
        <ul class="dropdown-list" v-if="isOpenDropdown">
            <li
                v-for="(department, index) in departmentList"
                :key="index"
                class="dropdown-list-item"
                :class="[
                    department.departmentName == currentDepartment && active,
                ]"
                id=""
                @click="
                    onDepartmentValue(
                        department.departmentName,
                        department.departmentID
                    )
                "
            >
                {{ department.departmentName }}
            </li>
        </ul>
        <div
            class="overlay-feature"
            v-if="isOpenDropdown"
            @click="ToggleDropdown"
        ></div>
    </div>
</template>
<script>
export default {
    name: "BaseDropdown",
    props: {
        label: String,
        tabindex: String,
        disable: Boolean,
        type: String,
        id: String,
        placeholder: String,
        class: String,
        departmentList: Array,
        departmentId: String,
        departmentName: String,
        departmentError: Boolean,
    },
    watch: {
        // Nhận dữ liệu từ prop và chuyền vào combobox
        departmentName() {
            this.getDepartmentEdit();
        },
        // Chuyền thông báo lỗi khi validate
        departmentError() {
            this.error = !this.error;
        },
    },
    methods: {
        /**
         * Thực hiện xử lý gán giá trị current currentDepartment để active giá trị được chọn
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        onDepartmentValue(departmentName, departmentId) {
            this.currentDepartment = departmentName;
            this.currentId = departmentId;
            this.$emit("departmentId", this.currentId);
            this.$emit("departmentName", this.currentDepartment);
            this.error = false;
            this.isOpenDropdown = !this.isOpenDropdown;
        },
        /**
         * Thực hiện xử lý ẩn hiện dropdown pageSize
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        ToggleDropdown() {
            this.isOpenDropdown = !this.isOpenDropdown;
        },
        /**
         * Thực hiện xử lý validate dropdown đơn vị
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        validateDropdown() {
            if (this.currentDepartment) {
                this.error = false;
            } else {
                this.error = true;
            }
        },
        /**
         * Thực hiện xử lý gán giá trị được chọn vào combobox
         **  Author: Nguyễn Quang Minh(26/10/2022)
         */
        getDepartmentEdit() {
            (this.currentDepartment = this.departmentName),
                (this.currentId = this.departmentId);
        },
    },
    data() {
        return {
            isOpenDropdown: false,
            currentDepartment: null,
            currentId: null,
            active: "active",
            error: false,
        };
    },
};
</script>
<style lang=""></style>

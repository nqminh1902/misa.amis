<template lang="">
    <div class="form-dropdown" @keydown="onDepartmentKeycodeValue">
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
            @keydown.enter="ToggleDropdown"
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
    // mounted() {
    //     // Sự kiện phím tắt
    //     window.addEventListener("keyup", this.openDropdown);
    // },
    // beforeUnmount() {
    //     // Hủy sự kiện phím tắt
    //     window.removeEventListener("keyup", this.openDropdown);
    // },
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
        openDropdown(e) {
            e.preventDefault();
            let index = 0;
            if (e.keyCode == 13) {
                this.ToggleDropdown();
            }
            if (e.keyCode == 34) {
                index++;
                let department = departmentList[index];
                this.onDepartmentKeycodeValue(department);
            }
        },
        onDepartmentKeycodeValue(e) {
            if (e.keyCode == 40 && this.index <= 5) {
                let department = this.departmentList[this.index];
                this.currentDepartment = department.departmentName;
                this.currentId = department.departmentID;
                this.$emit("departmentId", this.currentId);
                this.$emit("departmentName", this.currentDepartment);
                console.log(this.currentId);
                this.error = false;
                this.index == 5 ? this.index : this.index++;
            }
            if (e.keyCode == 38 && this.index >= 0) {
                this.index == 0 ? this.index : this.index--;
                let department = this.departmentList[this.index];
                this.currentDepartment = department.departmentName;
                this.currentId = department.departmentID;
                console.log(this.currentId);
                this.$emit("departmentId", this.currentId);
                this.$emit("departmentName", this.currentDepartment);
                this.error = false;
            }
        },
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
            index: 0,
        };
    },
};
</script>
<style lang=""></style>

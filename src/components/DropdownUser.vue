<template>
    <div class="config">
        <el-dropdown :hide-on-click="false"  @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ fullUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "DropdownUser",
    computed: {
        ...mapGetters({
            fullUserName: 'auth/getFullUserName'
        })
    },
    methods: {
        ...mapActions({
            logout: "auth/logout"
        }),
        handleCommand(command) {
            switch(command) {
                case "logout": this.logout(); break;
            }
        }
    }
}
</script>

<style scoped>
    .config {
        float: right;
        height: 60px;
        line-height: 60px;
        margin-right: 10px;
        border-bottom: 2px solid transparent;
        color: #909399;
        cursor: pointer;
    }
</style>

<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item>BUDGET MONITORING</el-menu-item>
        <el-menu-item index="1">Dashboard</el-menu-item>
<!--        <el-menu-item index="2">Budget</el-menu-item>-->
<!--        <el-menu-item index="3">Spesa</el-menu-item>-->
        <dropdown-user></dropdown-user>
    </el-menu>
</template>

<script>
import {mapActions} from "vuex";
import DropdownUser from "@/components/DropdownUser";
export default {
    name: "Navmenu",
    components: {DropdownUser},
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        ...mapActions({
            setDrawer: 'app/setDrawer',
        }),
        handleSelect(key) {
            this.activeIndex = key;
            switch(key) {
                case '1': {
                    this.$router.push({name: 'homepage'})
                    break;
                }
                case '2': {
                    this.$router.push({name: 'budget'})
                    break;
                }
                case '3': {
                    this.$router.push({name: 'expense'})
                    break;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>

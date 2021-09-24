<template>
  <div id="app" style="height: 100%">
      <div v-if="!isLogged">
          <login></login>
      </div>
      <div v-if="isLogged" style="height: 100%">
          <el-container style="height: 100%">
              <el-header class="p-0">
                    <navmenu></navmenu>
              </el-header>
              <el-container style="height: 100%">
                  <el-main style="height: 100%;padding: 0">
                      <div>
                          <router-view style="height: 100%;padding:20px; overflow-y: scroll;"></router-view>
                      </div>
                  </el-main>
                  <el-drawer
                      size="40%"
                      :title="drawer.title"
                      :visible.sync="drawer.show"
                      direction="rtl">
                      <div class="p-4">
                          <component :is="drawer.component"/>
                      </div>
                  </el-drawer>
              </el-container>
          </el-container>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Login from "@/views/auth/Login";
import Navmenu from "@/layouts/Navmenu";
export default {
    components: {Login, Navmenu},
    data() {
        return {
            breadcrumb: []
        }
    },
    computed: {
        ...mapGetters({
            isLogged: 'auth/isLogged',
            drawer: 'app/getDrawer'
        }),
    }
}
</script>

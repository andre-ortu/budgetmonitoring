import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import moment from 'moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/it'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Logo from '@/assets/img/budget.jpg'
import {mapActions, mapGetters} from "vuex";
library.add(faEye, faEyeSlash)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI, { locale });
require('./styles/_fonts.scss');
require('./styles/app.scss');
require('./components');

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

Vue.prototype.$http.interceptors.response.use(
    response => response,
    error => {
        switch(error.response.status) {
            case 401: {
                store.dispatch("auth/logout");
                break;
            }
            case 403: {
                //forbidden
                break;
            }
        }
        return Promise.reject(error)
    }
)

Vue.mixin({
    data() {
        return {
            logo: Logo,
            bmLoading: false
        }
    },
    computed: {
        ...mapGetters({
            primaryLoading: 'app/getPrimaryLoading',
            getBudgets: 'app/getBudgets'
        }),
    },
    methods: {
        ...mapActions({
            setPrimaryLoading: 'app/setPrimaryloading',
            setBudgets: 'app/setBudgets'
        }),
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

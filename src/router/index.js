import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from "@/views/auth/Login";
import Homepage from "@/views/homepage/Homepage";
import Budget from "@/views/budget/Budget";
import Expense from "@/views/expense/Expense";
import FirstAccess from "@/views/homepage/FirstAccess";

Vue.use(VueRouter)

const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'homepage',
        path: '/',
        component: Homepage,
        meta: {
            requiresAuth: true,
            middleware: ["auth", "firstAccess"],
        },
    },
    {
        name: 'firstAccess',
        path: '/firstAccess',
        component: FirstAccess,
        meta: {
            requiresAuth: true,
            middleware: ["auth", "firstAccess"],
        },
    },
    {
        name: 'budget',
        path: '/budget',
        component: Budget,
        meta: {
            requiresAuth: true,
            middleware: ["auth", "firstAccess"],
        },
    },
    {
        name: 'expense',
        path: '/expense',
        component: Expense,
        meta: {
            requiresAuth: true,
            middleware: ["auth", "firstAccess"],
        },
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.path === "/login" && store.state.auth.authenticate) {
      next({ name: "home" });
      return;
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.state.auth.authenticate) {
        next();
        return;
      }
      next("/login");
    } else {
        next();
    }
})

router.afterEach((to) => {
  if (to.matched.some((record) => record.meta.middleware && record.meta.middleware.includes("firstAccess"))) {
    if(store.state.auth.user.firstAccess) {
        router.push({name: 'firstAccess'});
    }
  }
});

export default router


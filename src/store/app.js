import axios from '../axios';

export default {
    namespaced: true,

    state: {
        drawer: {
            show: false,
            component: '',
            title: ''
        },
        loading: {
            primary: false
        },
        budgets: []
    },

    getters: {
        getDrawer(state) {
            return state.drawer;
        },
        getPrimaryLoading(state) {
            return state.loading.primary;
        },
        getBudgets(state) {
            return state.budgets;
        },
    },

    mutations: {
        setDrawer(state, drawer) {
            state.drawer = drawer;
        },
        setPrimaryLoading(state, loading) {
            state.loading.primary = loading;
        },
        setBudgets(state, budgets) {
            state.budgets = budgets;
        },
    },

    actions: {
        setDrawer({commit}, drawer) {
            commit('setDrawer', drawer)
        },
        setPrimaryloading({commit}, loading) {
            commit('setPrimaryLoading', loading);
        },
        setBudgets({commit}) {
            axios.get('/api/budget')
                .then(({data}) => {
                    commit('setBudgets', data);
                })
                .catch(() => {
                    console.log('asd');
                })

        }
    }
}

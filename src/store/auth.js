import axios from '../axios';
export default {
    namespaced: true,

    state: {
        user: null,
        authenticate: false
    },

    getters : {
        getUser(state) {
            return state.user;
        },
        isLogged(state) {
            return state.authenticate;
        },
        getFullUserName(state) {
            return state.user.name + ' ' + state.user.surname
        }
    },

    mutations: {
        setUserData (state, userData) {
            console.log(userData);
            state.user = {
                'id': userData.id,
                'name': userData.name,
                'surname': userData.surname,
                'email': userData.email,
                'firstAccess': userData.firstAccess
            }
        },
        isAuthenticate(state, value) {
            state.authenticate = value
        },
        clearUserData (state) {
            state.user = null;
        },
        setFirstAccess (state) {
            state.user.firstAccess = false
        }
    },

    actions: {
         signIn ({commit}, credentials) {
             return new Promise((resolve, reject) => {
                 axios.get('/sanctum/csrf-cookie').then(() => {
                     axios.post('/login', credentials).then((data) => {
                         commit('setUserData', data.data)
                         commit('isAuthenticate', true);
                         resolve(data);
                     })
                         .catch((err) => {
                             commit('isAuthenticate', false);
                             commit('clearUserData')
                            reject(err)
                         })
                 })
             })
        },

        setUserData({commit}, user) {
            commit('setUserData', user)
        },

        logout ({commit}) {
            commit('isAuthenticate', false);
            commit('clearUserData');
            this.$router.push({name: 'login'});
        },
        setFirstAccess({commit}) {
            commit('setFirstAccess');
        }
    }
}

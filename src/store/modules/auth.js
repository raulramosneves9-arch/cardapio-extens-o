export default {
    namespaced: true,
    state: () => ({
        user: null
    }),
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        HYDRATE(state, payload) {
            state.user = payload?.user || null;
        }
    },
    actions: {
        login({ commit }, username) {
            commit('SET_USER', { username });
        },
        logout({ commit }) {
            commit('SET_USER', null);
        }
    },
    getters: {
        isAuthenticated: state => !!state.user,
        username: state => state.user?.username || ''
    }
};

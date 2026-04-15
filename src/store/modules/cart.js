function findItemIndex(items, id) {
    return items.findIndex(item => item.id === id);
}

export default {
    namespaced: true,
    state: () => ({
        items: []
    }),
    mutations: {
        ADD_ITEM(state, item) {
            const idx = findItemIndex(state.items, item.id);
            if (idx !== -1) {
                state.items[idx].quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        REMOVE_ITEM(state, id) {
            state.items = state.items.filter(item => item.id !== id);
        },
        DECREMENT_ITEM(state, id) {
            const idx = findItemIndex(state.items, id);
            if (idx !== -1) {
                if (state.items[idx].quantity > 1) {
                    state.items[idx].quantity -= 1;
                } else {
                    state.items.splice(idx, 1);
                }
            }
        },
        CLEAR(state) {
            state.items = [];
        },
        HYDRATE(state, payload) {
            state.items = payload?.items || [];
        }
    },
    actions: {
        addToCart({ commit }, item) {
            commit('ADD_ITEM', item);
        },
        removeFromCart({ commit }, id) {
            commit('REMOVE_ITEM', id);
        },
        decrement({ commit }, id) {
            commit('DECREMENT_ITEM', id);
        },
        clearCart({ commit }) {
            commit('CLEAR');
        }
    },
    getters: {
        items: state => state.items,
        count: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
        total: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isEmpty: state => state.items.length === 0
    }
};

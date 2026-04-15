import { createStore } from 'vuex';
import auth from './modules/auth';
import cart from './modules/cart';

const STORAGE_KEY = 'cardapio-store';

function loadPersistedState() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return data || {};
    } catch {
        return {};
    }
}

const persisted = loadPersistedState();

const store = createStore({
    state: () => ({
        theme: 'light',
    }),
    modules: {
        auth,
        cart,
    },
});

// Hidratar módulos
store.commit('auth/HYDRATE', persisted.auth);
store.commit('cart/HYDRATE', persisted.cart);

// Persistência automática
store.subscribe((mutation, state) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            auth: state.auth,
            cart: state.cart,
        })
    );
});

export default store;

<template>
  <nav class="navbar">
    <router-link class="logo" to="/">Cardápio Digital</router-link>
    <div class="links">
      <router-link to="/menu">Cardápio</router-link>
      <router-link to="/cart">
        Carrinho <span v-if="cartCount" class="badge">{{ cartCount }}</span>
      </router-link>
      <router-link to="/about">Sobre</router-link>
    </div>
    <div class="user-actions">
      <span v-if="isAuthenticated">Olá, {{ username }}!</span>
      <button v-if="isAuthenticated" @click="logout">Sair</button>
      <router-link v-else to="/login">Entrar</router-link>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const cartCount = computed(() => store.getters['cart/count']);
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
    const username = computed(() => store.getters['auth/username']);
    function logout() {
      store.dispatch('auth/logout');
      router.push('/');
    }
    return { cartCount, isAuthenticated, username, logout };
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #222;
  color: #fff;
  padding: 1rem 2rem;
}
.logo {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}
.links {
  display: flex;
  gap: 1.5rem;
}
.links a {
  color: #fff;
  text-decoration: none;
}
.badge {
  background: #e74c3c;
  color: #fff;
  border-radius: 50%;
  padding: 0 0.5em;
  margin-left: 0.3em;
  font-size: 0.9em;
}
.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.user-actions button {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3em 0.8em;
  cursor: pointer;
}
</style>

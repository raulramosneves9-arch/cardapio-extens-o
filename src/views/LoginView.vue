<template>
    <div class="login-view">
        <BaseCard title="Login">
            <form @submit.prevent="handleLogin">
                <div>
                    <label>Usuário:</label>
                    <input v-model="username" required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </BaseCard>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { inject } from 'vue';
import BaseCard from '@/components/BaseCard.vue';

export default {
    name: 'LoginView',
    components: { BaseCard },
    setup() {
        const username = ref('');
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const notify = inject('notify');

        async function handleLogin() {
            if (!username.value) {
                notify && notify('Informe o nome de usuário', 'error');
                return;
            }
            await store.dispatch('auth/login', username.value);
            notify && notify('Login realizado!', 'success');
            const redirect = route.query.redirect || '/';
            router.replace(redirect);
        }

        return { username, handleLogin };
    }
};
</script>

<style scoped>
.login-view {
    max-width: 400px;
    margin: 2rem auto;
}
</style>

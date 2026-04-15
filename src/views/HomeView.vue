<template>
    <div class="home-view">
        <BaseCard title="Bem-vindo ao Cardápio Digital">
            <template #default>
                <p>Gerencie seu pedido de forma prática e rápida!</p>
            </template>
        </BaseCard>
        <div class="home-links">
            <BaseCard>
                <router-link to="/menu">Ver Cardápio</router-link>
            </BaseCard>
            <BaseCard>
                <router-link to="/cart">
                    Carrinho <span v-if="cartCount">({{ cartCount }})</span>
                </router-link>
            </BaseCard>
            <BaseCard>
                <router-link to="/about">Sobre</router-link>
            </BaseCard>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseCard from '@/components/BaseCard.vue';

export default {
    name: 'HomeView',
    components: { BaseCard },
    setup() {
        const store = useStore();
        const cartCount = computed(() => store.getters['cart/count']);
        return { cartCount };
    }
};
</script>

<style scoped>
.home-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}
</style>

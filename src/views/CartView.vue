<template>
    <div class="cart-view">
        <BaseCard title="Carrinho de Compras">
            <div v-if="isEmpty">Seu carrinho está vazio.</div>
            <div v-else>
                <ul>
                    <li v-for="item in items" :key="item.id">
                        {{ item.name }} (x{{ item.quantity }}) - R$ {{ item.price.toFixed(2) }}
                        <button @click="increment(item)">+</button>
                        <button @click="decrement(item)">-</button>
                        <button @click="remove(item)">Remover</button>
                    </li>
                </ul>
                <div class="cart-total">Total: R$ {{ total.toFixed(2) }}</div>
                <button @click="checkout">Finalizar Pedido</button>
            </div>
        </BaseCard>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { inject } from 'vue';
import BaseCard from '@/components/BaseCard.vue';

export default {
    name: 'CartView',
    components: { BaseCard },
    setup() {
        const store = useStore();
        const notify = inject('notify');
        const items = computed(() => store.getters['cart/items']);
        const isEmpty = computed(() => store.getters['cart/isEmpty']);
        const total = computed(() => store.getters['cart/total']);

        function increment(item) {
            store.dispatch('cart/addToCart', item);
        }
        function decrement(item) {
            store.dispatch('cart/decrement', item.id);
        }
        function remove(item) {
            store.dispatch('cart/removeFromCart', item.id);
        }
        function checkout() {
            store.dispatch('cart/clearCart');
            notify && notify('Pedido finalizado!', 'success');
        }

        return { items, isEmpty, total, increment, decrement, remove, checkout };
    }
};
</script>

<style scoped>
.cart-total {
    margin-top: 1rem;
    font-weight: bold;
}
</style>

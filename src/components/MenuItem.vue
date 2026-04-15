<template>
    <div class="menu-item">
        <div class="info">
            <strong>{{ item.name }}</strong>
            <span>R$ {{ item.price.toFixed(2) }}</span>
            <span v-if="!item.available" class="unavailable">Indisponível</span>
        </div>
        <div class="actions">
            <button @click="$emit('remove')">Remover</button>
            <button @click="addToCart" :disabled="!item.available">+ Carrinho</button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { inject } from 'vue';

export default {
    name: 'MenuItem',
    props: {
        item: { type: Object, required: true }
    },
    emits: ['remove'],
    setup(props) {
        const store = useStore();
        const notify = inject('notify');
        function addToCart() {
            store.dispatch('cart/addToCart', props.item);
            notify && notify('Adicionado ao carrinho!', 'success');
        }
        return { addToCart };
    }
};
</script>

<style scoped>
.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7em 0;
    border-bottom: 1px solid #eee;
}

.info {
    display: flex;
    flex-direction: column;
}

.unavailable {
    color: #e74c3c;
    font-size: 0.9em;
    margin-left: 0.5em;
}

.actions button {
    margin-left: 0.5em;
}
</style>

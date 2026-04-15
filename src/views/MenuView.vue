<template>
  <div class="menu-view">
    <BaseCard title="Cardápio">
      <div>
        <label>Filtrar por categoria:</label>
        <select v-model="category">
          <option value="">Todas</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
        <button @click="loadSuggestions" :disabled="loading">Carregar Sugestões</button>
      </div>
      <div v-if="loading">Carregando sugestões...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul>
        <li v-for="item in filteredItems" :key="item.id">
          {{ item.name }} - R$ {{ item.price.toFixed(2) }}
          <button @click="addToCart(item)" :disabled="!item.available">+ Carrinho</button>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import BaseCard from '@/components/BaseCard.vue';
import { fetchSuggestions } from '@/services/api';

const STORAGE_KEY = 'menu-items';

export default {
  name: 'MenuView',
  components: { BaseCard },
  setup() {
    const store = useStore();
    const notify = inject('notify');
    const items = ref([]);
    const category = ref('');
    const loading = ref(false);
    const error = ref('');

    function saveItems() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
    }
    function loadItems() {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        items.value = Array.isArray(data) ? data : [];
      } catch {
        items.value = [];
      }
    }

    async function loadSuggestions() {
      loading.value = true;
      error.value = '';
      try {
        const suggestions = await fetchSuggestions();
        items.value = suggestions;
        saveItems();
        notify && notify('Sugestões carregadas!', 'success');
      } catch (err) {
        error.value = err.message || 'Erro ao carregar sugestões';
        notify && notify(error.value, 'error');
      } finally {
        loading.value = false;
      }
    }

    function addToCart(item) {
      store.dispatch('cart/addToCart', item);
      notify && notify('Adicionado ao carrinho!', 'success');
    }

    const categories = computed(() => {
      const cats = items.value.map(i => i.category).filter(Boolean);
      return [...new Set(cats)];
    });
    const filteredItems = computed(() => {
      if (!category.value) return items.value;
      return items.value.filter(i => i.category === category.value);
    });

    watch(items, saveItems, { deep: true });
    watch(category, () => {
      document.title = category.value ? `Cardápio - ${category.value}` : 'Cardápio';
    });

    onMounted(() => {
      loadItems();
      document.title = 'Cardápio';
    });

    return { items, category, categories, filteredItems, loading, error, addToCart, loadSuggestions };
  }
};
</script>

<style scoped>
.menu-view {
  max-width: 600px;
  margin: 2rem auto;
}
.error {
  color: red;
  margin: 1rem 0;
}
</style>

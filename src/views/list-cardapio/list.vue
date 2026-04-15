<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ itens: Array })
const emit = defineEmits(['deletarItem'])

const filtroAtivo = ref('todos')

const lanches = computed(() => props.itens.filter(i => i.category === 'lanche'))
const bebidas = computed(() => props.itens.filter(i => i.category === 'bebida'))
const sobremesas = computed(() => props.itens.filter(i => i.category === 'sobremesa'))

const mostrarLanches = computed(() => filtroAtivo.value === 'todos' || filtroAtivo.value === 'lanches')
const mostrarBebidas = computed(() => filtroAtivo.value === 'todos' || filtroAtivo.value === 'bebidas')
const mostrarSobremesas = computed(() => filtroAtivo.value === 'todos' || filtroAtivo.value === 'sobremesas')
</script>

<template>
    <div class="page-wrapper">
        <main class="page-inner">

            <header class="page-header">
                <span class="page-icon">🍔</span>
                <h1 class="page-title">Cardápio</h1>
                <p class="page-subtitle">Escolha o que você quer administrar</p>

                <nav class="filter-nav">
                    <button :class="['btn-filter', { active: filtroAtivo === 'todos' }]"
                        @click="filtroAtivo = 'todos'">Todos</button>
                    <button :class="['btn-filter', { active: filtroAtivo === 'lanches' }]"
                        @click="filtroAtivo = 'lanches'">Lanches</button>
                    <button :class="['btn-filter', { active: filtroAtivo === 'bebidas' }]"
                        @click="filtroAtivo = 'bebidas'">Bebidas</button>
                    <button :class="['btn-filter', { active: filtroAtivo === 'sobremesas' }]"
                        @click="filtroAtivo = 'sobremesas'">Sobremesas</button>
                </nav>
            </header>

            <section class="menu-grid">

                <!-- LANCHES -->
                <article class="card" v-show="mostrarLanches">
                    <header class="card-header">
                        <h2 class="category-title">🍔 Lanches</h2>
                    </header>

                    <ul class="card-body">
                        <li class="item-card" :class="{ off: !item.available }" v-for="item in lanches" :key="item.id">

                            <div class="item-info">
                                <span class="item-nome">
                                    <span v-if="!item.available" class="linha"></span>
                                    {{ item.name }}
                                    <span v-if="!item.available" class="linha"></span>
                                </span>

                                <span class="item-price">R$ {{ item.price }}</span>
                            </div>

                            <button class="btn-delete" @click="emit('deletarItem', item.id)">🗑️</button>
                        </li>

                        <li class="item-vazio" v-if="lanches.length === 0">Nenhum item cadastrado</li>
                    </ul>
                </article>

                <!-- BEBIDAS -->
                <article class="card" v-show="mostrarBebidas">
                    <header class="card-header">
                        <h2 class="category-title">🥤 Bebidas</h2>
                    </header>

                    <ul class="card-body">
                        <li class="item-card" :class="{ off: !item.available }" v-for="item in bebidas" :key="item.id">

                            <div class="item-info">
                                <span class="item-nome">
                                    <span v-if="!item.available" class="linha"></span>
                                    {{ item.name }}
                                    <span v-if="!item.available" class="linha"></span>
                                </span>

                                <span class="item-price">R$ {{ item.price }}</span>
                            </div>

                            <button class="btn-delete" @click="emit('deletarItem', item.id)">🗑️</button>
                        </li>

                        <li class="item-vazio" v-if="bebidas.length === 0">Nenhum item cadastrado</li>
                    </ul>
                </article>

                <!-- SOBREMESAS -->
                <article class="card" v-show="mostrarSobremesas">
                    <header class="card-header">
                        <h2 class="category-title">🍰 Sobremesas</h2>
                    </header>

                    <ul class="card-body">
                        <li class="item-card" :class="{ off: !item.available }" v-for="item in sobremesas"
                            :key="item.id">

                            <div class="item-info">
                                <span class="item-nome">
                                    <span v-if="!item.available" class="linha"></span>
                                    {{ item.name }}
                                    <span v-if="!item.available" class="linha"></span>
                                </span>

                                <span class="item-price">R$ {{ item.price }}</span>
                            </div>

                            <button class="btn-delete" @click="emit('deletarItem', item.id)">🗑️</button>
                        </li>

                        <li class="item-vazio" v-if="sobremesas.length === 0">Nenhum item cadastrado</li>
                    </ul>
                </article>

            </section>
        </main>
    </div>
</template>

<style scoped>
.page-wrapper {
    min-height: 50vh;
    background-color: #1a1008;
    background-image:
        radial-gradient(ellipse at bottom left, #3d1f00 0%, transparent 50%),
        radial-gradient(ellipse at top right, #2a0f00 0%, transparent 50%);
    display: flex;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    padding: 3rem 1.5rem;
}

.page-inner {
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.page-header {
    text-align: center;
}

.page-icon {
    font-size: 3.5rem;
}

.page-title {
    font-size: 3rem;
    color: #ff9a00;
}

.page-subtitle {
    color: #7a5a3a;
    font-size: 0.9rem;
}

.filter-nav {
    display: flex;
    gap: 0.6rem;
    justify-content: center;
    margin-top: 10px;
}

.btn-filter {
    background: transparent;
    border: 1px solid #c8760055;
    border-radius: 999px;
    color: #c87600;
    padding: 0.4rem 1rem;
    cursor: pointer;
}

.btn-filter.active {
    background: #ff9a00;
    color: #1a0a00;
}

.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
}

/* CARD */
.card {
    background: #1f1209;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card-header {
    background: linear-gradient(135deg, #c87600, #ff9a00);
    padding: 0.8rem 1rem;
}

.category-title {
    color: #1a0a00;
    font-size: 1.2rem;
}

/* GRID DOS ITENS */
.card-body {
    padding: 0.8rem;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
}

/* ITEM (quadrado) */
.item-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #2a1a08;
    border-radius: 8px;
    padding: 0.7rem;
    min-height: 100px;
    transition: 0.2s;
}

.item-card:hover {
    background: #3a2a10;
    transform: translateY(-2px);
}

/* INDISPONÍVEL */
.item-card.off {
    opacity: 0.5;
    filter: grayscale(60%);
}

.item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.item-nome {
    color: #f5deb3;
    font-weight: 700;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.item-price {
    color: #ff9a00;
    font-size: 0.8rem;
}

/* LINHA */
.linha {
    width: 20px;
    height: 1px;
    background: #aaa;
    margin: 0 4px;
}

/* DELETE */
.btn-delete {
    align-self: flex-end;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    opacity: 0.7;
}

.btn-delete:hover {
    opacity: 1;
}

/* VAZIO */
.item-vazio {
    grid-column: 1 / -1;
    text-align: center;
    color: #6a4a2a;
}
</style>
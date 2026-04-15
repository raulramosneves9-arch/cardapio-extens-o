<script setup>
import { computed } from 'vue'

const props = defineProps({
    itens: Array
})

const totalItens = computed(() => props.itens.length)

const mediaPreco = computed(() => {
    if (!props.itens.length) return 0
    const soma = props.itens.reduce((acc, i) => acc + Number(i.price), 0)
    return (soma / props.itens.length).toFixed(2)
})

const disponiveis = computed(() =>
    props.itens.filter(i => i.available).length
)
</script>
<template>
    <div class="stats-box">
        <div class="stat">
            <span class="stat-value">{{ totalItens }}</span>
            <span class="stat-label">Itens</span>
        </div>

        <div class="stat">
            <span class="stat-value">R$ {{ mediaPreco }}</span>
            <span class="stat-label">Média</span>
        </div>

        <div class="stat">
            <span class="stat-value">{{ disponiveis }}</span>
            <span class="stat-label">Disponíveis</span>
        </div>
    </div>
</template>

<style scoped>
/* ===== STATS BOX ===== */
.stats-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    background: linear-gradient(145deg, #1a0f05, #241407);
    padding: 0.9rem;

    box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.4),
        inset 0 0 0 1px #c8760011;
}

/* ===== CARD INDIVIDUAL ===== */
.stat {
    background: #2a1a08;
    border: 1px solid #c8760022;
    border-radius: 12px;
    padding: 0.7rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    transition: all 0.2s ease;
    cursor: default;
}

/* HOVER SUAVE */
.stat:hover {
    transform: translateY(-2px);
    background: #33200d;
    border-color: #c8760055;
}

/* ===== NÚMERO ===== */
.stat-value {
    font-size: 1.4rem;
    font-weight: 800;
    color: #ff9a00;
    letter-spacing: 1px;
}

/* ===== TEXTO ===== */
.stat-label {
    font-size: 0.7rem;
    color: #7a5a3a;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
}

/* ===== RESPONSIVO ===== */
@media (max-width: 600px) {
    .stats-box {
        grid-template-columns: 1fr;
    }
}
</style>
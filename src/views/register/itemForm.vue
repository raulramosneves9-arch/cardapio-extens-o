<script setup>
import { reactive, ref } from 'vue';

const emit = defineEmits(['adicionarItem'])

const formData = reactive({
    name: '',
    price: '',
    category: '',
    available: true,
    id: 0
})

const modalVisivel = ref(false)

const submitForm = () => {
    if (!formData.name || !formData.price || !formData.category) return

    formData.id++
    emit('adicionarItem', { ...formData })
    modalVisivel.value = true

    formData.name = ''
    formData.price = ''
    formData.category = ''
    formData.available = true
}

defineExpose({ formData })
</script>

<template>
    <div class="page-wrapper">
        <div class="container py-5">
            <div class="form-card mx-auto">

                <!-- Header -->
                <div class="form-header text-center mb-4">
                    <div class="burger-icon-wrapper mb-3">
                        <div class="burger-icon">🍔</div>
                    </div>
                    <h1 class="form-title">Cadastrar Item</h1>
                    <p class="form-subtitle">Adicione um novo item ao cardápio</p>
                </div>

                <!-- Form -->
                <div class="form-body">

                    <div class="field-group">
                        <label class="form-label">Nome do Item</label>
                        <input type="text" class="form-control custom-input" placeholder="Ex: X-Burguer"
                            v-model="formData.name" />
                    </div>

                    <div class="field-group">
                        <label class="form-label">Preço</label>
                        <div class="price-wrapper">
                            <span class="price-prefix">R$</span>
                            <input type="number" class="form-control custom-input price-input" placeholder="0,00"
                                v-model="formData.price" />
                        </div>
                    </div>

                    <div class="field-group">
                        <label class="form-label">Categoria</label>
                        <select class="form-select custom-input" name="category" v-model="formData.category">
                            <option value="" disabled class="placeholder-option">Selecione uma categoria</option>
                            <option value="lanche">🍔 Lanche</option>
                            <option value="bebida">🥤 Bebida</option>
                            <option value="sobremesa">🍨 Sobremesa</option>
                        </select>
                    </div>

                    <div class="field-group">
                        <div class="disponivel-row">
                            <div class="disponivel-text">
                                <span class="disponivel-label">Disponível</span>
                                <span class="disponivel-hint">Item aparece no cardápio</span>
                            </div>
                            <div class="form-check form-switch mb-0">
                                <input class="form-check-input custom-switch" type="checkbox" role="switch"
                                    v-model="formData.available" />
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-cadastrar w-100" @click="submitForm">
                        Cadastrar Item
                    </button>

                </div>
            </div>
        </div>

        <!-- ===== MODAL ===== -->
        <div class="modal-overlay" v-show="modalVisivel" @click.self="modalVisivel = false">
            <div class="modal-box">
                <div class="modal-icon">✅</div>
                <h2 class="modal-title">Item cadastrado!</h2>
                <p class="modal-msg">O item foi adicionado ao cardápio com sucesso.</p>
                <button class="btn btn-cadastrar" @click="modalVisivel = false">OK</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;600;700&display=swap');

.page-wrapper {
    min-height: 100vh;
    background-color: #1a1008;
    background-image:
        radial-gradient(ellipse at top left, #3d1f00 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, #2a0f00 0%, transparent 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    padding: 1rem;
}

.form-card {
    margin-top: 2rem;
    background: #1f1209;
    border: 1px solid #c8760033;
    border-radius: 24px;
    overflow: hidden;
    width: 100%;
    max-width: 900px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px #c8760011;
}

.form-header {
    background: linear-gradient(135deg, #c87600, #ff9a00);
    padding: 2.5rem 2rem 2.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.form-body {
    padding: 2.5rem;
    display: grid;
    gap: 1.5rem;
}

@media (min-width: 768px) {
    .form-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .field-group:nth-child(1) {
        grid-column: span 2;
    }

    .field-group:nth-child(4) {
        grid-column: span 2;
    }

    .btn-cadastrar {
        grid-column: span 2;
    }
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    color: #f0c080;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
}

.custom-input {
    background-color: #2a1a08 !important;
    border: 1.5px solid #c8760033 !important;
    border-radius: 12px !important;
    color: #f5deb3 !important;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-input::placeholder {
    color: #6a4a2a !important;
}

.custom-input:focus {
    border-color: #ff9a00 !important;
    box-shadow: 0 0 0 3px #ff9a0022 !important;
    outline: none;
}

.placeholder-option {
    color: #6a4a2a;
}

.price-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.price-prefix {
    position: absolute;
    left: 1rem;
    color: #ff9a00;
    font-weight: 700;
    font-size: 0.95rem;
    pointer-events: none;
    z-index: 1;
}

.price-input {
    padding-left: 3rem !important;
}

.disponivel-row {
    background: #2a1a0855;
    border: 1.5px solid #c8760022;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.disponivel-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.disponivel-label {
    color: #f0c080;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}

.disponivel-hint {
    color: #7a5a3a;
    font-size: 0.78rem;
}

.custom-switch {
    width: 3.2em !important;
    height: 1.7em !important;
    cursor: pointer;
    background-color: #3d1f00 !important;
    border-color: #c8760055 !important;
}

.custom-switch:checked {
    background-color: #ff9a00 !important;
    border-color: #ff9a00 !important;
}

.btn-cadastrar {
    background: linear-gradient(135deg, #c87600, #ff9a00);
    color: #1a0a00;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.25rem;
    letter-spacing: 2.5px;
    border: none;
    border-radius: 12px;
    padding: 0.9rem;
    margin-top: 0.5rem;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 20px #ff9a0044;
}

.btn-cadastrar:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px #ff9a0066;
    color: #1a0a00;
}

.btn-cadastrar:active {
    transform: translateY(0);
}

.burger-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.burger-icon {
    font-size: 3.2rem;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top, #ffb347, #ff9a00);
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.burger-icon:hover {
    transform: scale(1.08) rotate(-3deg);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px #ff9a0055;
}

.form-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.6rem;
    color: #1a0a00;
    letter-spacing: 3px;
    margin: 0;
    line-height: 1;
}

.form-subtitle {
    color: #1a0a00bb;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-weight: 600;
    text-align: center;
    max-width: 260px;
}

/* ===== MODAL ===== */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: #00000099;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(4px);
}

.modal-box {
    background: #1f1209;
    border: 1px solid #c8760033;
    border-radius: 24px;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 360px;
    width: 90%;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}

.modal-icon {
    font-size: 3rem;
}

.modal-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: #ff9a00;
    letter-spacing: 3px;
    margin: 0;
}

.modal-msg {
    color: #7a5a3a;
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
}
</style>
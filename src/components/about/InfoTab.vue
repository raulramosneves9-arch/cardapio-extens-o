<template>
    <div>
        <h2>Sobre o Projeto</h2>
        <p>Este é um projeto de Cardápio Digital desenvolvido em Vue 3, seguindo boas práticas de SPA, estado global e
            rotas protegidas.</p>
        <div>Montado <span>{{ count }}</span> vezes.</div>
    </div>
</template>

<script>
export default {
    name: 'InfoTab',
    data() {
        return { count: 0 };
    },
    mounted() {
        this.count++;
    }
};
</script>

<template>
    <div>
        <h2>Tecnologias Utilizadas</h2>
        <ul>
            <li v-for="tech in stack" :key="tech">{{ tech }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'TechTab',
    data() {
        return {
            stack: [
                'Vue 3',
                'Vue Router 4',
                'Vuex 4',
                'Axios',
                'Vite',
                'JavaScript',
                'HTML/CSS'
            ]
        };
    }
};
</script>

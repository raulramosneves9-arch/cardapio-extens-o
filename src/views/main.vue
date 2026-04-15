<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import CreateCard from './register/createCard.vue'
import ListItem from './list-cardapio/list.vue'
import InfItem from './infoItem/infItem.vue' // 🔥 ajuste aqui

const itens = ref(JSON.parse(localStorage.getItem('itens') || '[]'))

function adicionarItem(item) {
    itens.value.push(item)
    localStorage.setItem('itens', JSON.stringify(itens.value))
}

function deletarItem(id) {
    itens.value = itens.value.filter(i => i.id !== id)
    localStorage.setItem('itens', JSON.stringify(itens.value))
}

onMounted(() => {
    alert('Bem-vindo ao Cardápio Digital! Aqui você pode criar, listar e obter informações sobre os itens do seu cardápio. Aproveite a experiência de gerenciar seu cardápio de forma fácil e eficiente!')
})

onUpdated(() => {
    console.log('Itens atualizados:', itens.value)
})

onUnmounted(() => {
    console.log('Componente desmontado. Itens finais:', itens.value)
})

</script>

<template>
    <CreateCard @adicionarItem="adicionarItem" />

    <ListItem :itens="itens" @deletarItem="deletarItem" />

    <InfItem :itens="itens" />
</template>
<script setup>
import { ref } from 'vue'
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
</script>

<template>
    <CreateCard @adicionarItem="adicionarItem" />

    <ListItem :itens="itens" @deletarItem="deletarItem" />

    <InfItem :itens="itens" />
</template>
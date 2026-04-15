<script setup>
import ItemForm from './itemForm.vue'

const emit = defineEmits(['adicionarItem'])
</script>

<template>
    <ItemForm @adicionarItem="emit('adicionarItem', $event)" />
</template>
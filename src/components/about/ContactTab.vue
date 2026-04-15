<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label>Email:</label>
            <input v-model="email" type="email" required />
        </div>
        <div>
            <label>Mensagem:</label>
            <textarea v-model="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
    </form>
</template>

<script>
export default {
    name: 'ContactTab',
    inject: ['notify'],
    data() {
        return {
            email: '',
            message: ''
        };
    },
    methods: {
        handleSubmit() {
            if (!this.email || !this.message) {
                this.notify('Preencha todos os campos!', 'error');
                return;
            }
            this.notify('Mensagem enviada com sucesso!', 'success');
            this.email = '';
            this.message = '';
        }
    }
};
</script>

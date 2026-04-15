<template>
    <div class="base-card">
        <header class="base-card__header">
            <slot name="header">
                <h3>{{ title || 'Título' }}</h3>
            </slot>
        </header>
        <section class="base-card__body">
            <slot />
        </section>
        <footer class="base-card__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BaseCard',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.base-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    margin-bottom: 1rem;
}

.base-card__header {
    margin-bottom: 0.5rem;
}

.base-card__footer {
    margin-top: 0.5rem;
    text-align: right;
}
</style>

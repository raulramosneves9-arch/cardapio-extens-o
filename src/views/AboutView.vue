<template>
    <div class="about-view">
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="{ active: tab.name === current }"
                @click="selectTab(tab.name)">
                {{ tab.label }}
            </button>
        </div>
        <keep-alive>
            <component :is="currentComponent" />
        </keep-alive>
    </div>
</template>

<script>
import { markRaw, ref, computed } from 'vue';
import InfoTab from '@/components/about/InfoTab.vue';
import TechTab from '@/components/about/TechTab.vue';
import ContactTab from '@/components/about/ContactTab.vue';

export default {
    name: 'AboutView',
    setup() {
        const tabs = [
            { name: 'info', label: 'Info', component: markRaw(InfoTab) },
            { name: 'tech', label: 'Tecnologias', component: markRaw(TechTab) },
            { name: 'contact', label: 'Contato', component: markRaw(ContactTab) }
        ];
        const current = ref('info');
        const currentComponent = computed(() => {
            const tab = tabs.find(t => t.name === current.value);
            return tab ? tab.component : null;
        });
        function selectTab(name) {
            current.value = name;
        }
        return { tabs, current, currentComponent, selectTab };
    }
};
</script>

<style scoped>
.tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.tabs button.active {
    font-weight: bold;
    text-decoration: underline;
}
</style>

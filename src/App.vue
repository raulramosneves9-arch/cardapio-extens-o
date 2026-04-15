<script setup>
import { ref, provide, readonly } from 'vue';
import NavBar from '@/components/NavBar.vue';

const notifications = ref([]);
function notify(message, type = 'info') {
  notifications.value.push({ message, type, id: Date.now() });
  setTimeout(() => {
    notifications.value.shift();
  }, 2500);
}
provide('notify', notify);
provide('notifications', readonly(notifications));
</script>

<template>
  <NavBar />
  <main>
    <router-view />
  </main>
  <div class="notifications">
    <div v-for="n in notifications" :key="n.id" :class="['notification', n.type]">
      {{ n.message }}
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
}

main {
  padding: 2rem 0;
  min-height: 80vh;
}

.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

.notification {
  background: #222;
  color: #fff;
  padding: 0.7em 1.2em;
  border-radius: 6px;
  margin-bottom: 0.5em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0.95;
}

.notification.success {
  background: #27ae60;
}

.notification.error {
  background: #e74c3c;
}

.notification.info {
  background: #2980b9;
}
</style>

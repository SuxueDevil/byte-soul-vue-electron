<template>
  <div class="app" :data-theme="theme">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from './stores/config'

const configStore = useConfigStore()
const theme = computed(() => configStore.theme)
</script>

<style>
.app {
  width: 100vw;
  height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-ui);
}
</style>

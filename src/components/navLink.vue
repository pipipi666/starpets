<template>
  <router-link class="link" :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

defineProps<{
  to: RouteLocationRaw;
}>();
</script>

<style scoped lang="scss">
.link {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;

  &:hover {
    color: var(--text-hover);
  }
}
</style>

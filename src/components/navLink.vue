<template>
  <router-link class="link" :class="{ active }" :to="to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";

defineProps<{
  to: RouteLocationRaw;
  active?: boolean;
}>();
</script>

<style scoped lang="scss">
.link {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;

  &:hover {
    color: var(--text-hover);
  }

  &.active {
    &::after {
      position: absolute;
      content: "";
      height: 3px;
      width: calc(100% - 40px);
      bottom: 0;
      background-color: rgb(164, 95, 127);
    }
  }
}
</style>

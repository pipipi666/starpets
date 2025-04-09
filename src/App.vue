<template>
  <nav-header />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const navHeader = defineAsyncComponent(
  () => import("./components/navHeader.vue")
);
</script>

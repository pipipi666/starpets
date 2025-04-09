<template>
  <nav-header />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import { useSystemStore } from "./store/system";

const navHeader = defineAsyncComponent(
  () => import("./components/navHeader.vue")
);

const store = useSystemStore();

onMounted(async () => {
  fetch("https://status.neuralgeneration.com/api/currency")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      store.exchangeRates = data;
    });
});
</script>

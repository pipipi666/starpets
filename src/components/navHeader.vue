<template>
  <header class="header">
    <div class="content">
      <nav class="nav">
        <ul class="list">
          <li>
            <nav-link :to="{ name: 'main' }" :active="isActive('main')"
              >Главная</nav-link
            >
          </li>
          <li>
            <nav-link :to="{ name: 'convert' }" :active="isActive('convert')"
              >Конвертация</nav-link
            >
          </li>
        </ul>
      </nav>

      <drop-down v-model="currency" :options="currencyList" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { currencyList } from "../consts/consts";
import { useSystemStore } from "../store/system";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const navLink = defineAsyncComponent(() => import("./navLink.vue"));
const dropDown = defineAsyncComponent(() => import("./dropDown.vue"));

const route = useRoute();

const store = useSystemStore();
const { currency } = storeToRefs(store);

const isActive = (name: string) => {
  return !!route.matched.find((x) => x.name === name);
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  background-color: var(--medium-color);
  display: flex;
  justify-content: center;

  .content {
    width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav {
      height: 100%;

      .list {
        height: 100%;
        display: flex;
      }
    }
  }
}
</style>

<template>
  <header class="header">
    <div class="content">
      <nav class="nav">
        <ul class="list">
          <li>
            <nav-link :to="{ name: 'main' }">Главная</nav-link>
          </li>
          <li>
            <nav-link :to="{ name: 'convert' }">Конвертация</nav-link>
          </li>
        </ul>
      </nav>

      <drop-down v-model="currency" :options="currencyList" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { currencyList } from "../consts/consts";

const navLink = defineAsyncComponent(() => import("./navLink.vue"));
const dropDown = defineAsyncComponent(() => import("./dropDown.vue"));

const currency = ref("RUB");
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

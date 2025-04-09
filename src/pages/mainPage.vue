<template>
  <div class="wrapper">
    <h2 v-for="item in list">{{ getTitle(item) }}</h2>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSystemStore } from "../store/system";
import { computed } from "vue";
import { currencyList } from "../consts/consts";

interface ICurrListItem {
  title: string;
  value: number;
}

const store = useSystemStore();
const { currency, exchangeRates } = storeToRefs(store);

const currTitle = computed(
  () => currencyList.find((curr) => curr.id === currency.value)?.title
);

const list = computed(() => {
  const res: ICurrListItem[] = [];

  if (!exchangeRates.value) return [];

  for (const key in exchangeRates.value) {
    if (key.endsWith(`-${currency.value}`)) {
      const curr = currencyList.find((x) => key.startsWith(`${x.id}-`));

      if (curr) {
        res.push({ title: curr.title, value: exchangeRates.value[key] });

        if (res.length === currencyList.length - 1) {
          break;
        }
      }

      continue;
    }
  }

  return res;
});

const getTitle = (item: ICurrListItem) => {
  return `1 ${item.title} = ${item.value} ${currTitle.value}`;
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  gap: 20px;
  font-size: 24px;
}
</style>

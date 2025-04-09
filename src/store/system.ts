import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemStore = defineStore("system", () => {
  const currency = ref("rub");
  const exchangeRates = ref<Record<string, number>>({});

  return { currency, exchangeRates };
});

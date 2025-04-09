<template>
  <form class="form">
    <div class="currency">
      <drop-down
        v-model="firstCurr"
        :options="currencyList"
        @update:modelValue="calcSecond"
      />
      <number-input
        v-model="firstCurrValue"
        :min="0"
        @update:modelValue="calcSecond"
      />
    </div>
    <div class="currency">
      <drop-down
        v-model="secondCurr"
        :options="currencyList"
        @update:modelValue="calcSecond"
      />
      <number-input
        v-model="secondCurrValue"
        :min="0"
        @update:modelValue="calcFirst"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { currencyList } from "../consts/consts";
import { useSystemStore } from "../store/system";
import { storeToRefs } from "pinia";

const numberInput = defineAsyncComponent(
  () => import("../components/numberInput.vue")
);
const dropDown = defineAsyncComponent(
  () => import("../components/dropDown.vue")
);

const store = useSystemStore();
const { exchangeRates } = storeToRefs(store);

const firstCurr = ref("usd");
const firstCurrValue = ref<number | null>(0);

const secondCurr = ref("rub");
const secondCurrValue = ref<number | null>(0);

const calcFirst = () => {
  if (secondCurrValue.value === null || secondCurrValue.value < 0) {
    firstCurrValue.value = null;

    return;
  }

  if (firstCurr.value === secondCurr.value) {
    firstCurrValue.value = secondCurrValue.value;

    return;
  }

  const rate = exchangeRates.value[`${secondCurr.value}-${firstCurr.value}`];

  firstCurrValue.value = Math.round(rate * secondCurrValue.value * 100) / 100;
};

const calcSecond = () => {
  if (firstCurrValue.value === null || firstCurrValue.value < 0) {
    secondCurrValue.value = null;

    return;
  }

  if (firstCurr.value === secondCurr.value) {
    secondCurrValue.value = firstCurrValue.value;

    return;
  }

  const rate = exchangeRates.value[`${firstCurr.value}-${secondCurr.value}`];

  secondCurrValue.value = Math.round(rate * firstCurrValue.value * 100) / 100;
};
</script>

<style scoped lang="scss">
.form {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 60px auto;

  .currency {
    display: flex;
    gap: 20px;

    input {
      flex-grow: 1;
    }
  }
}
</style>

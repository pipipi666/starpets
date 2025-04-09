<template>
  <input
    class="input"
    :class="{ error }"
    type="number"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue?: number | null;
  min?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

const error = ref(false);

const handleInput = (e: Event) => {
  const value = e.target instanceof HTMLInputElement ? e.target.value : null;
  const numVelue = value ? parseFloat(value) : null;

  if ((numVelue || numVelue === 0) && (props.min || props.min === 0)) {
    error.value = numVelue < props.min;
  } else if (error.value) {
    error.value = false;
  }

  emit("update:modelValue", numVelue);
};

const updateError = (value?: number | null) => {
  if ((value || value === 0) && (props.min || props.min === 0)) {
    error.value = value < props.min;
  } else if (error.value) {
    error.value = false;
  }
};

watch(
  () => props.modelValue,
  (value) => {
    updateError(value);
  }
);
</script>

<style scoped lang="scss">
.input {
  outline: none;
  border: 1px solid var(--main-color);
  border-radius: 16px;
  padding: 0 20px;
  font-size: 16px;

  &.error {
    border: 1px solid red;
  }
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

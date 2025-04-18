<template>
  <div :class="{ [`dd_${id}`]: true }" class="dropdown">
    <div class="currValue" @click="toggleMenu">{{ title }}</div>
    <ul v-if="show" class="menu">
      <li
        v-for="item in options"
        :key="item.id"
        class="menuItem"
        @click="selectItem(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

interface IOption {
  id: string;
  title: string;
}

const props = defineProps<{
  modelValue: string;
  options: IOption[];
}>();

const emit = defineEmits(["update:modelValue"]);

const id = self.crypto.randomUUID();

const show = ref(false);

const title = computed(
  () => props.options.find((opt) => opt.id === props.modelValue)?.title
);

const toggleMenu = () => {
  show.value = !show.value;
};

const selectItem = (item: IOption) => {
  emit("update:modelValue", item.id);
  show.value = false;
};

const closeMenu = (e: Event) => {
  const target = e.target;

  if (
    !e.target ||
    !(target instanceof HTMLElement) ||
    !(target.closest(".dropdown") && target.closest(`.dd_${id}`))
  ) {
    show.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  .currValue {
    min-width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    padding: 10px 20px;
    border-radius: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
      color: var(--text-hover);
    }
  }

  .menu {
    position: absolute;
    top: 44px;
    min-width: 80px;
    background-color: var(--main-color);
    border-radius: 16px;
    padding: 4px;
    z-index: 10;

    .menuItem {
      display: flex;
      justify-content: center;
      padding: 6px 20px;
      cursor: pointer;
      border-radius: 16px;

      &:hover {
        opacity: 0.8;
        color: var(--text-hover);
      }
    }
  }
}
</style>

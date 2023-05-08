<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/mainStore.ts";
import SearchForm from "@/components/main-page/SearchForm.vue";
import CitiesList from "@/components/main-page/CitiesList.vue";

const store = useMainStore();
const { cities } = storeToRefs(store);
</script>

<template>
  <main class="main-page">
    <SearchForm />
    <CitiesList
      v-if="cities.length"
      :cities-list="cities"
    />
  </main>
</template>

<style lang="scss" scoped>
.main-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 4rem;
}
</style>

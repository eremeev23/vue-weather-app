<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useMainStore } from "@/stores/mainStore.ts";
import UiNotification from "@/components/ui/UiNotification.vue";

const store = useMainStore();
const { setCitiesFromLocalStorage } = store;
onBeforeMount(() => {
  setCitiesFromLocalStorage();
})
</script>

<template>
  <div class="container">
    <UiNotification />
    <router-view />
  </div>
</template>

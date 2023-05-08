<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/mainStore.ts";

const route = useRoute();
const store = useMainStore();
const { error } = storeToRefs(store);

watch(
  () => error.value,
  () => {
    if (error.value) {
      setTimeout(() => error.value = null, 5000)
    }
  }
)

watch(
  () => route,
  () => error.value = null,
  {
    deep: true
  }
)
</script>

<template>
  <div class="notification" v-if="error">
    <span>Error {{ error.status }}</span>
    <p>{{ error.message }}</p>
  </div>
</template>

<style scoped lang="scss">
.notification {
  padding: .8rem;
  position: fixed;
  top: 20px;
  right: 40px;
  transform: translateX(0);
  width: 200px;
  text-align: center;
  font-size: 14px;
  background-color: rgba(0 0 0 / .4);
  border: 2px solid #fff;
  border-radius: 8px;
  animation: fromLeft .5s;
  z-index: 100;

  p {
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    right: 10px;
  }
}
</style>

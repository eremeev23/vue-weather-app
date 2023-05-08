<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMainStore } from "@/stores/mainStore.ts";
import { WeatherCity } from "@/types";

const store = useMainStore();
const { currentCity, cities } = storeToRefs(store);
const { saveCity, removeCity } = store;

const isSaved = computed(
  () => cities.value.some(
    (city: WeatherCity) => city.name === currentCity.value?.name
  )
)

const fullCity = computed(() => `${currentCity.value?.name}, ${currentCity.value?.country}`)
</script>

<template>
  <header v-if="currentCity" class="weather-header">
    <router-link class="weather-header__back" to="/">
      <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" />
      <span> BACK</span>
    </router-link>
    <h1>
      {{ fullCity }}
    </h1>
    <button
      v-if="!isSaved"
      @click="saveCity(currentCity)"
      class="weather-header__button weather-header__button_save"
    >
      SAVE LOCATION
    </button>
    <button
      v-else
      @click="removeCity(currentCity?.name || '')"
      class="weather-header__button weather-header__button_delete"
    >
      DELETE LOCATION
    </button>
  </header>
</template>

<style scoped lang="scss">
.weather-header {
  position: relative;
  padding: 1.4rem 0;

  &__back {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 10px;

    span {
      display: block;
      font-size: 14px;
    }
  }

  &__button {
    position: absolute;
    right: 0;
    top: 0;
    width: 210px;
    padding: 10px 20px;
    border-radius: 0 0 16px 16px;
    font-size: 18px;
    font-weight: 700;
    transition: background-color .2s ease-in-out, color .2s ease-in-out;

    &_save {
      background-color: $yellow;

      &:hover {
        background-color: lighten($yellow, 20%);
      }
    }

    &_delete {
      background-color: lighten($red, 7%);
      color: #fff;

      &:hover {
        background-color: lighten($red, 20%);
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 0;

    &__back {
      span {
        font-size: 12px;
      }
    }

    &__button {
      padding: 10px;
      font-size: 14px;
      width: 160px;
    }
  }
}
</style>

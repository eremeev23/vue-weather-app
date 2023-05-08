<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMainStore } from "@/stores/mainStore.ts";
import { WeatherCity } from "@/types";

interface IProps {
  citiesList: WeatherCity[]
}
defineProps<IProps>();

const store = useMainStore();
const { removeCity } = store;
</script>

<template>
  <div class="saved-cities">
    <h2 class="saved-cities__title">
      Saved cities
    </h2>
    <ul class="saved-cities__list">
      <li
        v-for="city in citiesList"
        :key="city.name"
        class="saved-cities__list-item"
      >
        <router-link :to="`/city?name=${city.name}`">
          {{ city.name }}, {{ city.country }}
        </router-link>
        <button
          class="saved-cities__list-item-delete"
          @click="removeCity(city.name)"
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.saved-cities {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;

  &__title {
    font-size: 40px;
    text-align: center;
    animation: fadeIn .2s ease-in-out;
  }

  &__list {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    &-item {
      position: relative;
      animation: fadeIn .2s ease-in-out;

      a {
        display: block;
        padding: 12px 25px;
        background-color: rgba(23 23 23 / .4);
        text-transform: uppercase;
        font-size: 20px;
        border-radius: 4px;
        transition: background-color .2s ease-in-out;
      }

      &-delete {
        position: absolute;
        right: 0;
        top: 0;
        width: 22px;
        height: 22px;
        transform: translate(35%, -35%);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $red;
        color: $white;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        z-index: 2;
        transition: opacity .2s ease-in-out;
      }

      &:hover {
        a {
          background-color: rgba(23 23 23 / .7);
        }

        button {
          opacity: .85;
          pointer-events: all;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    &__list-item-delete {
      opacity: .85;
      pointer-events: all;
    }
  }

  @media screen and (max-width: 768px) {
    gap: .5rem;

    &__title {
      margin-bottom: .5rem;
      font-size: 30px;
    }

    &__list {
      gap: 1rem;

      &-item {
        a {
          padding: 8px 20px;
          font-size: 14px;
        }

        &-delete {
          width: 20px;
          height: 20px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>

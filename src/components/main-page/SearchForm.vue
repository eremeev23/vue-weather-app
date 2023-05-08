<script setup lang="ts">
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMainStore } from "@/stores/mainStore.ts";
import { Weather } from "@/types";
import UiInput from "@/components/ui/UiInput.vue";

const router = useRouter();
const store = useMainStore();
const { getWeatherData } = store;

const searchCity = ref<string | undefined>();

const getLocationCity = () => {
  const geo = navigator.geolocation;
  let lat, lon;

  geo.getCurrentPosition(async (pos) => {
    lat = pos.coords.latitude.toString();
    lon = pos.coords.longitude.toString();

    await getWeatherData({ lat, lon })
      .then((response: Weather | false) => {
        if (response) {
          searchCity.value = "";
          router.push(`/city?name=${response.city.name}`)
        }
      })
  })
}

const submitHandler = async () => {
  await getWeatherData(undefined, searchCity.value)
    .then((response: Weather | false) => {
      if (response) {
        searchCity.value = "";
        router.push(`/city?name=${response.city.name}`)
      }
    })
}
</script>

<template>
  <form
    class="search-form"
    @submit.prevent="submitHandler"
  >
    <UiInput
      v-model="searchCity"
      input-label="Search for a city"
      input-type="search"
    />
    <div class="search-form__buttons">
      <button
        type="submit"
        class="search-form__buttons-submit"
      >
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-long" />
      </button>
      <button
        type="button"
        class="search-form__buttons-location"
        @click="getLocationCity"
      >
        <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search-form {
  position: relative;

  &__buttons {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;

    &-location, &-submit {
      padding: 5px 15px;
      font-size: 18px;
      color: $gray;
      transition: color .1s ease-in-out;
    }

    &-submit {
      &:hover {
        color: $black;
      }
    }

    &-location {
      border-left: 2px solid $gray;
      animation: location-button 1.4s infinite linear;

      &:hover {
        color: $red;
        animation: none;
      }
    }

    @media screen and (max-width: 768px) {
      &-location, &-submit {
        padding: 5px 10px;
        font-size: 16px;
        color: $gray;
        transition: color .1s ease-in-out;
      }
    }
  }
}
</style>

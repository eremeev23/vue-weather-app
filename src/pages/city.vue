<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useMainStore } from "@/stores/mainStore.ts";
import { WeatherListItem } from "@/types";
import WeatherHeader from "@/components/weather/WeatherHeader.vue";
import WeatherTodayCard from "@/components/weather/WeatherTodayCard.vue";
import WeatherTodayByHour from "@/components/weather/WeatherTodayByHour.vue";
import WeatherByDay from "@/components/weather/WeatherByDay.vue";

const store = useMainStore();
const { weatherData, currentCity } = storeToRefs(store);
const { getWeatherData } = store;

const route = useRoute();
const cityName = route.query.name || "";

const weatherTodayByHours = computed<WeatherListItem[] | null>(() => {
  if (weatherData.value && weatherData.value.list?.length) {
    return weatherData.value.list.filter(
      (weather: WeatherListItem, index: number) => weather && index < 7
    )
  }

  return null;
})

const weatherByDay = computed<{ string: WeatherListItem }>(() => {
  const hash = {} as { string: WeatherListItem };
  // SET WEATHER FOR NEXT 3 DAY
  if (weatherData.value && weatherData.value.list?.length) {
    weatherData.value.list.forEach((weather: WeatherListItem) => {
      const date = new Date(weather.dt_txt).getDate().toString();

      // @ts-ignore
      if (!hash[date] && new Date(weather.dt_txt).getHours() > 12 && Object.keys(hash).length < 3) {
        // @ts-ignore
        hash[date] = weather;
      }
    })
  }

  return hash;
})

onBeforeMount(async () => {
  if (typeof cityName === "string") {
    await getWeatherData({ q: cityName });
  }
})

onBeforeUnmount(() => {
  weatherData.value = null;
  currentCity.value = null;
})
</script>

<template>
  <main class="city-page">
    <WeatherHeader />
    <WeatherTodayCard
      :weather-today="weatherData?.list[0]"
    />
    <section v-if="weatherTodayByHours" class="by-hours">
      <h2>
        Today's weather
      </h2>
      <div class="by-hours__list">
        <WeatherTodayByHour
          v-for="weather in weatherTodayByHours"
          :key="weather.dt"
          :weather="weather"
        />
      </div>
    </section>
    <section v-if="weatherTodayByHours" class="by-days">
      <h2>
        Next 3 days
      </h2>
      <div class="by-days__list">
        <WeatherByDay
          v-for="value in weatherByDay"
          :key="value.dt"
          :weather="value"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.by-hours, .by-days {
  margin: 2rem 0 4rem;

  @media screen and (max-width: 768px) {
    margin: 1.4rem 0 2.2rem;
  }
}

.by-hours {
  &__list {
    padding-bottom: .5rem;
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $yellow;
      border-radius: 90px;
    }

    @media screen and (max-width: 768px) {
      gap: .6rem;
    }
  }
}

.by-days {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media screen and (max-width: 768px) {
      gap: .5rem;
    }
  }
}
</style>

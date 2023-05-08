<script setup lang="ts">
import { computed } from "vue";
import { WeatherListItem } from "@/types";

interface IProps {
  weather: WeatherListItem;
}
const props = defineProps<IProps>();

const time = computed(() => props.weather?.dt_txt
  ? `${new Date(props.weather.dt_txt).getHours()}:00`
  : ''
)
</script>

<template>
  <div class="weather-by-hour">
    <div class="weather-by-hour__time">
      {{ time }}
    </div>
    <img
      :src="`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`"
      alt=""
      width="64"
      height="64"
    />
    <div class="weather-by-hour__degrees">
      {{ weather.main.temp.toFixed(1) }}°C
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-by-hour {
  min-width: 100px;
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0 0 0 / .25);
  border-radius: 8px;

  &__degrees {
    font-size: 20px;
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    min-width: 80px;
    padding: .7rem 0;

    img {
      width: 42px;
      height: 42px;
    }

    &__degrees {
      font-size: 16px;
    }
  }
}
</style>

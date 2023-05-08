<script setup lang="ts">
import { WeatherListItem } from "@/types";

interface IProps {
  weather: WeatherListItem;
}
const props = defineProps<IProps>();
const today = computed(() => new Date(props.weather.dt_txt).toLocaleString('en-GB').split(',')[0]);
</script>

<template>
  <div class="one-day">
    <div>
      {{ today }}
    </div>
    <div>
      <img
        :src="`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`"
        alt=""
        width="64"
        height="64"
      />
    </div>
    <div>
      <span>{{ weather.main.temp_max.toFixed(1) }}°C</span>
      <span>High</span>
    </div>
    <div>
      <span>{{ weather.main.temp_min.toFixed(1) }}°C</span>
      <span>Low</span>
    </div>
    <div>
      <span>{{ weather.wind.speed }} m/sec</span>
      <span>Wind</span>
    </div>
    <div>
      <span>{{ weather.rain ? weather.rain['3h'] : 0 }} mm</span>
      <span>Rain</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.one-day {
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0 0 0 / .25);
  border-radius: 8px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: .3rem;
  }

  @media screen and (max-width: 768px) {
    padding: .7rem 0;

    img {
      width: 32px;
      height: 32px;
    }

    span {
      font-size: 12px;
    }
  }
}
</style>

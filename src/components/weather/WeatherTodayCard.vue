<script setup lang="ts">
import { WeatherListItem } from "@/types";
import { useDateToday } from "@/composables/useDateToday.ts";

interface IProps {
  weatherToday: WeatherListItem | undefined;
}
defineProps<IProps>();
</script>

<template>
  <section v-if="weatherToday" class="">
    <h2>
      {{ useDateToday }}
    </h2>
    <div class="today">
      <div class="today__main">
        <img
          class="today__main-icon"
          :src="`http://openweathermap.org/img/wn/${weatherToday.weather[0].icon}@2x.png`"
          alt=""
        />
        <div class="today__main-weather">
          <span class="today__main-degrees">
            {{ weatherToday.main.temp.toFixed(1) }}°C
          </span>
          <span>
            {{ weatherToday.weather[0].main }}
          </span>
        </div>
      </div>
      <div class="today__secondary">
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.main.temp_max.toFixed(1) }}°C</span>
          <span class="today__secondary-block-title">High</span>
        </div>
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.wind.speed }} m/sec</span>
          <span class="today__secondary-block-title">Wind</span>
        </div>
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.main.humidity }}%</span>
          <span class="today__secondary-block-title">Humidity</span>
        </div>
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.main.temp_min.toFixed(1) }}°C</span>
          <span class="today__secondary-block-title">Low</span>
        </div>
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.main.pressure }} hPa</span>
          <span class="today__secondary-block-title">Pressure</span>
        </div>
        <div class="today__secondary-block">
          <span class="today__secondary-block-value">{{ weatherToday.pop * 100 }}%</span>
          <span class="today__secondary-block-title">Precipitation</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.today {
  display: flex;
  align-items: stretch;
  margin-bottom: 3rem;

  &__main, &__secondary {
    width: 50%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  &__main {
    padding-right: 3rem;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 2px solid rgba(255 255 255 / .5);

    &-icon {
      transform: scale(1.5);
    }

    &-weather {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    &-degrees {
      font-size: 52px;
      font-weight: 500;
    }
  }

  &__secondary {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;

    &-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .1rem;

      &-value {
        font-size: 22px;
      }

      &-title {
        font-size: 13px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    &__main, &__secondary {
      width: 100%;
      padding-bottom: .4rem;
    }

    &__main {
      padding-right: 0;
      padding-left: 0;
      justify-content: flex-start;
      gap: 5rem;
      border-bottom: 2px solid rgba(255 255 255 / .5);
      border-right: none;

      &-weather {
        gap: .5rem;
      }

      &-degrees {
        font-size: 38px;
      }
    }

    &__secondary {
      gap: 1rem;

      &-block {
        &-value {
          font-size: 16px;
        }

        &-title {
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (max-width: 540px) {
    &__main {
      justify-content: space-between;

      &-icon {
        transform: scale(1);
      }
    }
  }
}
</style>

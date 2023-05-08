<script setup lang="ts">
import { watch, ref } from "vue";
import { useRandomString } from "@/composables/useRandomString.ts";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface IProps {
  inputLabel: string;
  inputType: string;
  modelValue: string | undefined;
}
const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue'])

const inputId = useRandomString();

const isValid = ref<boolean>(false);
const updateValue = (e: any) => {
  if (e) {
    isValid.value = !!e.value?.length;
    emits('update:modelValue', e.value);
  }
}

watch(
  () => props.modelValue,
  () => isValid.value = !!props.modelValue
)
</script>

<template>
  <div class="input-wrapper">
    <FontAwesomeIcon
      v-if="props.inputType === 'search'"
      icon="fa-solid fa-magnifying-glass"
      class="input-wrapper__search-icon"
    />
    <input
      @input="updateValue($event.target)"
      :value="modelValue"
      :type="inputType"
      :id="inputId"
      :class="{ valid: isValid, search: props.inputType === 'search' }"
    />
    <label :for="inputId">
      {{ inputLabel }}
    </label>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;

  input {
    padding: 12px 100px 12px 15px;
    width: 100%;
    font-size: 18px;
    border-radius: 4px;

    & + label {
      padding: 1px 2px;
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 18px;
      color: $gray;
      background-color: #fff;
      border-radius: 3px;
      transition: top .2s ease-in-out, font-size .2s ease-in-out, color .2s ease-in-out;
    }

    &.search {
      padding: 12px 100px 12px 45px;

      & + label {
        left: 42px;
      }
    }

    &:focus + label, &.valid + label {
      top: 0;
      font-size: 12px;
      color: $black;
    }
  }

  &__search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: $gray;
  }

  @media screen and (max-width: 768px) {
    input {
      font-size: 14px;

      & + label {
        font-size: 14px;
      }

      &.search {
        padding: 10px 75px 12px 35px;

        & + label {
          left: 32px;
        }
      }

      &:focus + label, &.valid + label {
        font-size: 10px;
      }
    }

    &__search-icon {
      left: 12px;
    }
  }
}
</style>

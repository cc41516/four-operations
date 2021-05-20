<template>
  <div>
    <q-range
      class="q-my-lg"
      v-model="num1"
      :min="range[0]"
      :max="range[1]"
      color="primary"
      label-always
    />
    <q-range
      class="q-my-lg"
      v-model="num2"
      :min="range[2]"
      :max="range[3]"
      color="secondary"
      label-always
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    let $number = $store.state.number;
    let range = ref()
    let num1, num2;

    switch ($number.operation) {
      case "add":
        range.value = $number.globalRange.add;
        num1 = computed({
          get: () => $number.addNum1,
          set: (val) => $store.commit("number/updateAddNum1", val),
        });
        num2 = computed({
          get: () => $number.addNum2,
          set: (val) => $store.commit("number/updateAddNum2", val),
        });
        break;

      case "sub":
        range.value = $number.globalRange.sub;
        num1 = computed({
          get: () => $number.subNum1,
          set: (val) => $store.commit("number/updateSubNum1", val),
        });
        num2 = computed({
          get: () => $number.subNum2,
          set: (val) => $store.commit("number/updateSubNum2", val),
        });
        break;

      case "mul":
        range.value = $number.globalRange.mul;
        num1 = computed({
          get: () => $number.mulNum1,
          set: (val) => $store.commit("number/updateMulNum1", val),
        });
        num2 = computed({
          get: () => $number.mulNum2,
          set: (val) => $store.commit("number/updateMulNum2", val),
        });
        break;

      case "div":
        range.value = $number.globalRange.div;
        num1 = computed({
          get: () => $number.divNum1,
          set: (val) => $store.commit("number/updateDivNum1", val),
        });
        num2 = computed({
          get: () => $number.divNum2,
          set: (val) => $store.commit("number/updateDivNum2", val),
        });
        break;
      default:
        break;
    }

    return {
      range,
      num1,
      num2,
    };
  },
};
</script>
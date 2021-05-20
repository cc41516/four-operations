<template>
  <q-knob
    readonly
    show-value
    v-model="timeLeft"
    :min="0"
    :max="max"
    size="4rem"
    font-size="0.4em"
    :thickness="0.2"
    :color="color"
    track-color="grey-3"
    class="q-ma-md"
    :class="[{'animated headShake': endAnimate}, `text-${color}`]"
    @animationend="endAnimate = false"
  />
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    max: { type: Number, required: true },
    color: { type: String, required: true },
  },

  setup(props) {
    let timeLeft = ref(props.max);
    let _id = ref(0);
    let endAnimate = ref(false);

    watch(
      () => props.max,
      (value) => {
        timeLeft.value = value;
      }
    );

    function initialize() {
      timeLeft.value = props.max;
      _id.value = Math.random();
      return _id.value;
    }

    function start(id, callback = null) {
      if (timeLeft.value === 0 && callback !== null) {
        endAnimate.value = true
        callback();
      } else if (timeLeft.value > 0) {
        setTimeout(() => {
          if (id === _id.value) {
            timeLeft.value--;
            start(id, callback);
          }
        }, 1000);
      }
    }

    function resetTimeLeft() {
      _id.value = Math.random(); // stop countdown
      timeLeft.value = props.max;
    }

    return {
      timeLeft,
      endAnimate,
      initialize,
      start,
      resetTimeLeft,
    };
  },
};
</script>
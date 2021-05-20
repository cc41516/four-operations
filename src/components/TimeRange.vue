<template>
  <div class="q-gutter-y-md">
    <q-checkbox v-model="turnSpeed" label="回合秒數限制" />

    <q-item>
      <q-item-section avatar>
        <div class="column flex-center">
          <q-icon color="primary" name="hourglass_bottom" size="lg" />
          {{ Math.floor(totalSec / 60) }} :
          {{ ("0" + (totalSec % 60).toString()).slice(-2) }}
        </div>
      </q-item-section>
      <q-item-section>
        <q-slider
          v-model="totalSec"
          :min="10"
          :max="300"
          :step="5"
          color="primary"
        />
      </q-item-section>
    </q-item>

    <q-item v-if="turnSpeed">
      <q-item-section avatar>
        <div class="column flex-center">
          <q-icon color="primary" name="refresh" size="lg" />
          {{ turnSec }} 秒
        </div>
      </q-item-section>
      <q-item-section>
        <q-slider v-model="turnSec" :min="2" :max="20" color="primary" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const turnSpeed = computed({
      get: () => $store.state.time.turnSpeed,
      set: (val) => {
        $store.commit("time/updateTurnSpeed", val);
      },
    });
    const totalSec = computed({
      get: () => $store.state.time.totalSec,
      set: (val) => {
        $store.commit("time/updateTotalSec", val);
      },
    });
    const turnSec = computed({
      get: () => $store.state.time.turnSec,
      set: (val) => {
        $store.commit("time/updateTurnSec", val);
      },
    });
    
    return {
      turnSpeed,
      totalSec,
      turnSec,
    };
  },
};
</script>
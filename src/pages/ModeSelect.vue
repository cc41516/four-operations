<template>
  <div class="q-gutter-y-lg q-pa-md">
    <div class="q-gutter-y-md">
      <q-btn-toggle
        v-model="operation"
        toggle-color="primary"
        outline
        spread
        :options="[
          { label: '加', value: 'add' },
          { label: '減', value: 'sub' },
          { label: '乘', value: 'mul' },
          { label: '除', value: 'div' },
        ]"
      />

      <q-tab-panels
        v-model="operation"
        animated
        class="shadow-2 rounded-borders q-px-sm"
      >
        <q-tab-panel name="add">
          <NumberAvatar symbol="&plus;" />
          <NumberRange />
        </q-tab-panel>
        <q-tab-panel name="sub">
          <NumberAvatar symbol="&minus;" />
          <NumberRange />
        </q-tab-panel>
        <q-tab-panel name="mul">
          <NumberAvatar symbol="&times;" />
          <NumberRange />
        </q-tab-panel>
        <q-tab-panel name="div">
          <NumberAvatar symbol="&divide;" />
          <NumberRange />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div class="q-gutter-y-md">
      <q-btn-toggle
        v-model="timeMode"
        toggle-color="primary"
        outline
        spread
        :options="[
          { label: '限時', value: 'timed' },
          { label: '無限制', value: 'unlimited' },
        ]"
      />
      <q-tab-panels
        v-model="timeMode"
        animated
        class="shadow-2 rounded-borders"
      >
        <q-tab-panel name="timed"> <TimeRange /> </q-tab-panel>
        <q-tab-panel name="unlimited"> 這是無限制模式。</q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NumberRange from "src/components/NumberRange";
import NumberAvatar from "src/components/NumberAvatar";
import TimeRange from "src/components/TimeRange";

export default {
  components: { NumberRange, NumberAvatar, TimeRange },
  setup() {
    const $store = useStore();
    const operation = computed({
      get: () => $store.state.number.operation,
      set: (val) => $store.commit("number/updateOperation", val),
    });
    const timeMode = computed({
      get: () => $store.state.time.timeMode,
      set: (val) => $store.commit("time/updateTimeMode", val),
    });

    return {
      operation,
      timeMode,
    };
  },
};
</script>
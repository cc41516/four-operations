<template>
  <div class="row justify-center" style="width: 80%">
    <q-item class="col-4">
      <q-item-section>
        <q-icon name="check" size="lg" color="positive" thumbnail />
      </q-item-section>
      <q-item-section>
        <h5 class="text-left">{{ correct }}</h5>
      </q-item-section>
    </q-item>
    <q-item class="col-4">
      <q-item-section>
        <q-icon name="clear" size="lg" color="negative" thumbnail />
      </q-item-section>
      <q-item-section>
        <h5 class="text-left">{{ wrong }}</h5>
      </q-item-section>
    </q-item>
    <q-item class="col-4">
      <q-item-section>
        <q-icon name="flag" size="lg" color="primary" thumbnail />
      </q-item-section>
      <q-item-section>
        <h5 class="text-left">{{ percentage }}%</h5>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
  },
  setup(props) {
    let total = computed(() => props.correct + props.wrong)
    return {
      percentage: computed(() =>
        total.value === 0 ? 0 : Math.round((props.correct / total.value) * 100)
      ),
    };
  },
};
</script>

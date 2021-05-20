<template>
  <div class="q-pa-md">
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-center" style="font-size: 1em">時間</th>
          <th class="text-center" style="font-size: 1em">正確</th>
          <th class="text-center" style="font-size: 1em">錯誤</th>
          <th class="text-center" style="font-size: 1em">正確率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in state.score" :key="index">
          <td class="text-center" style="font-size: 1.2em">{{ item.time }}s</td>
          <td class="text-center" style="font-size: 1.2em">
            {{ item.correct }}
          </td>
          <td class="text-center" style="font-size: 1.2em">{{ item.wrong }}</td>
          <td class="text-center" style="font-size: 1.2em">
            {{ item.percentage }}%
          </td>
        </tr>
        <tr v-if="state.score.length > 0">
          <th class="text-center" style="font-size: 1em">總計</th>
          <th class="text-center" style="font-size: 1.2em">
            {{ state.accumulatedCorrect }}
          </th>
          <th class="text-center" style="font-size: 1.2em">
            {{ state.accumulatedWrong }}
          </th>
          <th class="text-center" style="font-size: 1.2em">
            {{ state.accumulatedPercentage }}%
          </th>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const state = reactive({
      score: computed(() => $store.state.history.score),
      accumulatedCorrect: computed(() =>
        state.score.reduce((accu, curr) => accu + curr.correct, 0)
      ),
      accumulatedWrong: computed(() =>
        state.score.reduce((accu, curr) => accu + curr.wrong, 0)
      ),
      accumulatedTotal: computed(
        () => state.accumulatedCorrect + state.accumulatedWrong
      ),
      accumulatedPercentage: computed(() =>
        state.accumulatedTotal === 0
          ? 0
          : Math.round(state.accumulatedCorrect / state.accumulatedTotal * 100)
      ),
    });

    return {
      state
    };
  },
};
</script>
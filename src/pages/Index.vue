<template>
  <q-page class="column items-center">
    <div
      class="row items-center q-mt-lg q-mb-sm"
      :class="{ 'animated fadeOutLeft': animate.nextQuestion }"
      @animationend.self="setNewQuestion"
    >
      <div class="text-h3 text-weight-thin non-selectable">
        {{ state.questionRepr }}
      </div>
      <q-btn
        class="q-mx-sm text-h3 text-weight-thin no-pointer-events"
        :class="{ 'animated shakeX slow': animate.errNumField }"
        @animationend="animate.errNumField = false"
        style="width: 1.5em; min-height: 1.5em"
        :style="[state.isWrong ? 'border: 1px solid red' : '']"
        color="grey-3"
        text-color="dark"
        unelevated
        v-for="i in Array(state.correctAnswerDigit).keys()"
        :key="i"
        :label="state.answer[i]"
      >
      </q-btn>
    </div>
    <div
      class="text-h6 text-weight-light text-negative"
      :class="{ invisible: !state.isStarted || !state.isWrong }"
    >
      答錯囉，請再試試看。
    </div>
    <div class="row">
      <CountdownTimer
        :max="state.totalSec"
        ref="totalSecTimerRef"
        color="primary"
        v-show="state.timeMode === 'timed'"
      />
      <CountdownTimer
        :max="state.turnSec"
        ref="turnSecTimerRef"
        color="warning"
        v-if="state.timeMode === 'timed' && state.turnSpeed"
      />
    </div>
    <div class="row reverse justify-center">
      <NumberPadBtn
        v-for="i in Array.from({ length: 9 }, (_, i) => (9 - i) % 10)"
        :label="i"
        :key="i"
        @click="appendNum(i)"
      />
      <NumberPadBtn />
      <NumberPadBtn label="0" @click="appendNum(0)" />
      <NumberPadBtn icon="o_backspace" @click="popNum" />
      <Statistics
        :correct="state.correctCount"
        :wrong="state.wrongCount"
        v-if="state.isStarted"
      />
    </div>
    <q-btn
      label="start"
      class="q-my-md"
      size="xl"
      outline
      color="negative"
      @click="start"
      v-if="!state.isStarted"
    />
  </q-page>
</template>

<script>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import NumberPadBtn from "src/components/NumberPadBtn";
import CountdownTimer from "src/components/CountdownTimer";
import Statistics from "src/components/Statistics";
import questionGenerator from "src/utils/QuestionGenerator";

export default {
  components: { NumberPadBtn, CountdownTimer, Statistics },

  setup() {
    const $store = useStore();
    const totalSecTimerRef = ref();
    const turnSecTimerRef = ref();
    const state = reactive({
      questionRepr: null,
      questionEval: null,
      answer: [],
      correctAnswer: null,
      correctAnswerDigit: 0,
      correctCount: 0,
      wrongCount: 0,
      totalCount: computed(() => state.correctCount + state.wrongCount),
      operation: computed(() => $store.state.number.operation),
      timeMode: computed(() => $store.state.time.timeMode),
      turnSpeed: computed(() => $store.state.time.turnSpeed),
      totalSec: computed(() => $store.state.time.totalSec),
      turnSec: computed(() => $store.state.time.turnSec),
      isStarted: false,
      isSubmitted: false,
      isWrong: false,
    });

    const animate = reactive({
      errNumField: false,
      nextQuestion: false,
    });

    const correctSoundEffect = new Audio(require('../assets/correct_01.mp3'))
    correctSoundEffect.volume = 0.5

    watch(
      () => state.timeMode,
      () => _reset()
    );

    const _reset = () => {
      state.questionRepr = null;
      state.questionEval = null;
      state.answer = [];
      state.correctAnswer = null;
      state.correctAnswerDigit = 0;
      state.correctCount = 0;
      state.wrongCount = 0;
      state.isStarted = false;
      state.isSubmitted = false;
      state.isWrong = false;

      animate.errNumField = false;
      animate.nextQuestion = false;


      if (state.timeMode === "timed") {
        totalSecTimerRef.value.resetTimeLeft();
        if (state.turnSpeed) {
          turnSecTimerRef.value.resetTimeLeft();
        }
      }
    };

    const appendNum = (num) => {
      if (state.answer.length < state.correctAnswerDigit) {
        state.answer.push(num);
        if (state.answer.length === state.correctAnswerDigit) {
          let answer = [...state.answer] // to avoid someone press backspace before submit (300ms gap)
          setTimeout(() => submit(answer), 300);
        }
      }
    };

    const popNum = () => {
      if (state.answer.length !== 0) {
        state.answer.pop();
      }
    };

    const setNewQuestion = () => {
      let x = questionGenerator();
      state.questionRepr = x.questionRepr;
      state.questionEval = x.questionEval;
      state.correctAnswer = eval(state.questionEval.replace("=", ""));
      state.correctAnswerDigit = state.correctAnswer.toString().length;
      state.isSubmitted = false;
      state.isWrong = false;
      animate.errNumField = false;
      animate.nextQuestion = false;
    };

    const submit = (answer) => {
      if (parseInt(answer.join("")) !== state.correctAnswer) {
        if (!state.isSubmitted) {
          state.wrongCount++;
        }
        state.isSubmitted = true;
        state.isWrong = true;
        animate.errNumField = true;
      } else {
        correctSoundEffect.load()
        correctSoundEffect.play()
        if (!state.isSubmitted) {
          state.correctCount++;
        }
        if (state.timeMode === "timed" && state.turnSpeed) {
          turnSecTimerRef.value.start(
            turnSecTimerRef.value.initialize(),
            _endOfTurn
          );
        }
        animate.nextQuestion = true; // this will trigger setNewQuestion
      }
      state.answer = [];
    };

    const start = () => {
      _startTimer();
      setNewQuestion();
      state.isStarted = true;
    };

    const _timeup = () => {
      $store.commit("history/updateScore", {
        time: state.totalSec,
        correct: state.correctCount,
        wrong: state.wrongCount,
        percentage:
          state.totalCount === 0
            ? 0
            : Math.round((state.correctCount / state.totalCount) * 100),
      });
      _reset();
    };

    const _endOfTurn = () => {
      if (!state.isSubmitted) {
        state.wrongCount++;
      }
      state.isSubmitted = true;
    };

    const _startTimer = () => {
      if (state.timeMode !== "timed") {
        return;
      }

      totalSecTimerRef.value.start(
        totalSecTimerRef.value.initialize(),
        _timeup
      );
      if (state.turnSpeed) {
        turnSecTimerRef.value.start(
          turnSecTimerRef.value.initialize(),
          _endOfTurn
        );
      }
    };

    return {
      totalSecTimerRef,
      turnSecTimerRef,
      state,
      animate,
      appendNum,
      popNum,
      setNewQuestion,
      submit,
      start,
    };
  },
};
</script>

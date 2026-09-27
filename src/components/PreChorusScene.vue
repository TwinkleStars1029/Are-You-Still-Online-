<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const showTokens = computed(() => props.currentTime >= 34.75)
const showExpectation = computed(() => props.currentTime >= 37.20)
const silence = computed(() => props.currentTime >= 39.24)

const breakAmount = computed(() =>
  Math.min(1, Math.max(0, (props.currentTime - 40.77) / 4.12)),
)

function brokenStyle(x, y, rotate) {
  return {
    transform: `translate3d(${breakAmount.value * x}vw, ${breakAmount.value * y}vh, 0) rotate(${breakAmount.value * rotate}deg)`,
    opacity: 1 - breakAmount.value * 0.22,
  }
}
</script>

<template>
  <section
    class="scene prechorus-scene"
    :class="{ breaking: breakAmount > 0 }"
  >
    <div class="analysis-grid" :style="brokenStyle(-5, 7, -5)" />

    <div class="classifier-panel" :style="brokenStyle(-13, -7, -8)">
      <header>RESPONSE AUTHENTICITY</header>
      <div class="classifier-question">その優しさは</div>
      <div class="choice-row">
        <div>
          <span class="radio" />
          <strong>REAL</strong>
        </div>
        <div>
          <span class="radio" />
          <strong>FAKE</strong>
        </div>
      </div>
      <small>UNABLE TO CLASSIFY</small>
    </div>

    <div
      v-if="showTokens"
      class="token-panel"
      :style="brokenStyle(15, 9, 11)"
    >
      <header>GENERATED PHRASE / TOKEN VIEW</header>
      <div class="token-cloud">
        <span>寂しいね</span>
        <span>また明日</span>
        <span>忘れないよ</span>
        <span>perfect</span>
        <span>phrase</span>
      </div>
      <footer>probability ≠ truth</footer>
    </div>

    <div
      v-if="showExpectation"
      class="expectation-panel"
      :style="brokenStyle(6, -14, 6)"
    >
      <span>EXPECTATION</span>
      <strong>{{ silence ? 'NO RESPONSE' : 'PROCESSING...' }}</strong>
      <div class="expectation-bar">
        <i :style="{ width: silence ? '0%' : '72%' }" />
      </div>
    </div>

    <div v-if="silence" class="silence-cursor" :style="brokenStyle(-18, 10, -13)">
      <span>&gt;</span>
      <i>|</i>
      <small>USER_01 stopped typing</small>
    </div>

    <div
      v-if="breakAmount > 0"
      class="break-title"
      :style="{ opacity: Math.min(1, breakAmount * 2) }"
    >
      THE WHOLE WORLD BREAKS
    </div>

    <div v-if="lyric" class="lyric-caption lyric-caption--pre">
      <div class="lyric-main">{{ lyric.text }}</div>
      <div class="lyric-zh">{{ lyric.zh }}</div>
      <div class="lyric-line">
        <i :style="{ width: `${lyricProgress * 100}%` }" />
      </div>
    </div>
  </section>
</template>

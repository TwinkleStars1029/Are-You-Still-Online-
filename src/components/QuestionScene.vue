<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const opacity = computed(() =>
  Math.min(1, Math.max(0, props.progress * 3)),
)

const failed = computed(() => props.currentTime >= 48.35)
const secondary = computed(() => props.currentTime >= 47.01)
</script>

<template>
  <section class="scene question-scene question-scene--v2">
    <div class="question-terminal" :style="{ opacity }">
      <div class="question-meta">
        <span>DIRECT MESSAGE // USER_01</span>
        <span>SIGNAL 0%</span>
      </div>

      <div class="question-input">
        <span>&gt;</span>
        <strong>{{ secondary ? 'Can you hear me now?' : 'Are you still online?' }}</strong>
        <i>|</i>
      </div>

      <div class="send-state" :class="{ failed }">
        {{ failed ? 'UNABLE TO DELIVER MESSAGE' : 'SENDING...' }}
      </div>

      <div v-if="lyric" class="question-translation">
        {{ lyric.zh }}
        <i :style="{ width: `${lyricProgress * 100}%` }" />
      </div>
    </div>
  </section>
</template>

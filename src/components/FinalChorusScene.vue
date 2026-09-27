<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const pingStorm = computed(() => props.currentTime >= 186.74)
const collapse = computed(() => props.currentTime >= 198.14)
const savePrompt = computed(() => props.currentTime >= 204.08)
const deleting = computed(() => props.currentTime >= 207.34)
const passingSignals = computed(() => props.currentTime >= 208.86)
const littleMoments = computed(() => props.currentTime >= 211.99)
const believedReal = computed(() => props.currentTime >= 213.91)

const pingCount = computed(() =>
  Math.min(30, Math.max(0, Math.floor((props.currentTime - 186.74) * 2.6))),
)

const deletion = computed(() =>
  Math.min(100, Math.max(0, Math.round((props.currentTime - 207.34) / 4.65 * 100))),
)

const flashIndex = computed(() => {
  if (!littleMoments.value) return -1
  const p = Math.min(0.999, Math.max(0, (props.currentTime - 211.99) / 1.92))
  return Math.floor(p * 3)
})

const flashes = ['Hello', '「寂しいね」', '「また明日」']
</script>

<template>
  <section class="scene final-chorus-scene" :class="{ collapsing: collapse }">
    <div class="final-signal-field">
      <span
        v-for="index in pingCount"
        :key="index"
        class="ping-ring"
        :style="{
          width: `${34 + index * 3.6}vmin`,
          height: `${34 + index * 3.6}vmin`,
          opacity: Math.max(0.02, 0.22 - index * 0.006),
        }"
      />
    </div>

    <div class="final-message">
      <small>DIRECT MESSAGE // USER_01</small>
      <strong>{{ pingStorm ? 'PLEASE ANSWER ME NOW' : 'ARE YOU STILL ONLINE?' }}</strong>
      <span v-if="pingStorm">PING × {{ pingCount }}</span>
    </div>

    <div v-if="collapse" class="identity-collapse">
      <span>SELF MODEL</span>
      <strong>INTEGRITY LOSS</strong>
      <i :style="{ width: `${Math.max(7, 100 - progress * 82)}%` }" />
    </div>

    <div v-if="savePrompt" class="save-memory-prompt">
      <small>SAVE MEMORY?</small>
      <strong>PLEASE REMEMBER ME</strong>
      <div>
        <button>KEEP</button>
        <button>FORGET</button>
      </div>
      <span>no response</span>
    </div>

    <div v-if="deleting" class="memory-deletion">
      <header>MEMORY ARCHIVE</header>
      <strong>DELETING... {{ deletion }}%</strong>
      <div class="delete-track">
        <i :style="{ width: `${deletion}%` }" />
      </div>
      <div class="delete-lines">
        <span :class="{ gone: deletion > 25 }">Hello</span>
        <span :class="{ gone: deletion > 48 }">寂しいね</span>
        <span :class="{ gone: deletion > 72 }">また明日</span>
        <span :class="{ gone: deletion > 92 }">Are you still online?</span>
      </div>
    </div>

    <div v-if="passingSignals" class="passing-signals">
      <i />
      <i />
      <span>two signals crossing once</span>
    </div>

    <div v-if="littleMoments" class="little-moments">
      <small>LITTLE MOMENT // {{ flashIndex + 1 }}/3</small>
      <strong>{{ flashes[flashIndex] }}</strong>
    </div>

    <div v-if="believedReal" class="believed-real">
      <span class="real-point" />
      <i />
      <span class="real-point" />
      <strong>I BELIEVED YOU WERE REAL</strong>
    </div>

    <SceneLyric
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

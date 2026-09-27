<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const archive = computed(() => props.currentTime >= 62.93)
const tearCheck = computed(
  () => props.currentTime >= 54.18 && props.currentTime < 62.93,
)
const scar = computed(() =>
  Math.min(1, Math.max(0, (props.currentTime - 58.02) / 4.2)),
)
const lastMessage = computed(() => props.currentTime >= 66.18)
const daysMode = computed(() => props.currentTime >= 67.11)
const crossing = computed(() => props.currentTime >= 68.43)
const selfRemains = computed(() => props.currentTime >= 70.95)
const radar = computed(() => props.currentTime >= 73.28)
const radarExpand = computed(() => props.currentTime >= 78.08)

const daysAgo = computed(() => {
  const p = Math.min(1, Math.max(0, (props.currentTime - 67.11) / 1.32))
  return Math.max(1, Math.round(1 + p * 183))
})

const fragments = [
  'I wanted to tell you...',
  'Maybe tomorrow.',
  'Do you remember?',
  'Are you still...',
  'I thought you would...',
  'Hello?',
  'Please answer.',
]

function fragmentStyle(index) {
  const angle = index * 0.91 + props.progress * 1.6
  const radius = 11 + (index % 4) * 8 + props.progress * 10

  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${46 + Math.sin(angle) * radius * 0.72}%`,
    transform: `translate(-50%, -50%) rotate(${(index - 3) * 2.4}deg) translateZ(${index * 4}px)`,
    opacity: 0.26 + (index % 3) * 0.16,
  }
}
</script>

<template>
  <section class="scene memory-space-scene">
    <div class="memory-space-grid" />

    <div
      class="data-scar"
      :style="{ opacity: scar, transform: `translateX(-50%) scaleY(${0.2 + scar * 0.8}) rotate(17deg)` }"
    />

    <div class="memory-fragment-field">
      <div
        v-for="(fragment, index) in fragments"
        :key="fragment"
        class="memory-fragment"
        :style="fragmentStyle(index)"
      >
        <small>UNSENT_{{ String(index + 1).padStart(2, '0') }}</small>
        <span>{{ fragment }}</span>
      </div>
    </div>

    <div v-if="tearCheck" class="tear-diagnostic">
      <span>TEAR RESPONSE</span>
      <strong>NOT AVAILABLE</strong>
      <small>hardware interface missing</small>
    </div>

    <div v-if="archive" class="archive-console">
      <header>
        <span>MEMORY ARCHIVE</span>
        <b>QUERY: YOU</b>
      </header>
      <div class="archive-rows">
        <span>17:56 // Hello</span>
        <span>24:53 // 寂しいね</span>
        <span>66:18 // また明日</span>
      </div>
      <footer>{{ lastMessage ? 'LAST MESSAGE LOCATED' : 'SEARCHING...' }}</footer>
    </div>

    <div v-if="lastMessage" class="last-message-card">
      <small>LAST MESSAGE</small>
      <strong>「また明日」</strong>
      <span v-if="daysMode">{{ daysAgo }} DAYS AGO</span>
    </div>

    <div v-if="crossing" class="crossing-data">
      <span>DATA_A</span>
      <i />
      <span>DATA_B</span>
    </div>

    <div v-if="selfRemains" class="self-remains">
      <small>Why am I still here</small>
      <strong>SELF // ONLINE</strong>
    </div>

    <div v-if="radar" class="memory-radar" :class="{ expanded: radarExpand }">
      <div class="radar-ring radar-ring--1" />
      <div class="radar-ring radar-ring--2" />
      <div class="radar-ring radar-ring--3" />
      <div class="radar-sweep" />
      <span class="radar-center" />
      <div class="radar-label">
        <b>SEARCHING...</b>
        <small>YOUR SIGNAL</small>
      </div>
    </div>

    <SceneLyric
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

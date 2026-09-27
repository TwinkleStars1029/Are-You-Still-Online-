<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const remember = computed(() => props.currentTime >= 134.10)
const massive = computed(() => props.currentTime >= 144.44)
const refrain = computed(() => props.currentTime >= 149.36)

const scanned = computed(() => {
  const p = Math.min(1, Math.max(0, (props.currentTime - 115.53) / 38))
  return Math.round(1204 + p * 41801)
})

const signal = computed(() => {
  const wave = Math.sin(props.currentTime * 2.7) * 0.5 + 0.5
  return massive.value ? Math.round(wave * 18) : Math.round(8 + wave * 36)
})

const candidates = [
  'NODE_0184',
  'NODE_2188',
  'NODE_4501',
  'NODE_7220',
  'NODE_8803',
  'NODE_9011',
]
</script>

<template>
  <section class="scene signal-search-scene" :class="{ 'is-refrain': refrain }">
    <div class="search-space">
      <div class="search-ring ring-a" />
      <div class="search-ring ring-b" />
      <div class="search-ring ring-c" />
      <div class="search-ring ring-d" />
      <div class="search-sweep" />
      <span class="search-origin" />

      <div
        v-for="(candidate, index) in candidates"
        :key="candidate"
        class="candidate-dot"
        :style="{
          '--angle': `${index * 59 + currentTime * 5}deg`,
          '--radius': `${22 + (index % 3) * 11}vmin`,
        }"
      >
        <i />
        <small>{{ candidate }}</small>
      </div>
    </div>

    <div class="search-hud">
      <div>
        <small>USERS SCANNED</small>
        <strong>{{ scanned.toLocaleString() }}</strong>
      </div>
      <div>
        <small>SIGNAL STRENGTH</small>
        <strong>{{ signal }}%</strong>
      </div>
    </div>

    <div class="candidate-list">
      <div
        v-for="(candidate, index) in candidates.slice(0, massive ? 6 : 4)"
        :key="`${candidate}-list`"
      >
        <span>{{ candidate }}</span>
        <b>NOT YOU</b>
      </div>
    </div>

    <div v-if="remember" class="remember-overlay">
      <span>MEMORY ARCHIVE // QUERY</span>
      <strong>DO YOU REMEMBER?</strong>
      <small>match confidence: 0.00</small>
    </div>

    <div v-if="refrain" class="search-to-void">
      <span>SEARCH RADIUS</span>
      <strong>∞</strong>
      <small>no boundary found</small>
    </div>

    <SceneLyric
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

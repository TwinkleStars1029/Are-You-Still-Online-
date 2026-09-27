<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const reset = computed(() => props.currentTime >= 89.75)
const identity = computed(() => props.currentTime >= 92.36)
const memoryFail = computed(() => props.currentTime >= 94.69)
const logTrace = computed(() => props.currentTime >= 97.61)
const timestamp = computed(() => props.currentTime >= 99.93)
const ttl = computed(() => props.currentTime >= 103.44)
const waiting = computed(() => props.currentTime >= 110.57)

const fadeAmount = computed(() =>
  Math.min(0.82, Math.max(0, (props.currentTime - 104.16) / 7.74)),
)

const nodes = Array.from({ length: 16 }, (_, index) => ({
  id: `USER_${String(index * 53 + 38).padStart(3, '0')}`,
  x: 8 + ((index * 31) % 84),
  y: 12 + ((index * 47) % 66),
  kind: index % 3,
}))

const ttlValue = computed(() =>
  Math.max(0, 3 - Math.floor(Math.max(0, props.currentTime - 103.44) / 0.9)),
)

function nodeStyle(node, index) {
  const faded = ttl.value ? fadeAmount.value * (0.45 + (index % 4) * 0.12) : 0
  return {
    left: `${node.x}%`,
    top: `${node.y}%`,
    opacity: Math.max(0.08, 0.58 - faded),
    transform: `translate(-50%, -50%) scale(${0.78 + (index % 3) * 0.11})`,
  }
}
</script>

<template>
  <section class="scene network-scene">
    <div class="network-lines" />

    <div class="network-nodes">
      <div
        v-for="(node, index) in nodes"
        :key="node.id"
        class="network-user-node"
        :style="nodeStyle(node, index)"
      >
        <i />
        <span>{{ node.id }}</span>
        <small v-if="node.kind === 0">stars</small>
        <small v-else-if="node.kind === 1">jokes</small>
        <small v-else>hello</small>
      </div>
    </div>

    <div class="network-self">
      <i />
      <strong>SELF</strong>
    </div>

    <div v-if="reset" class="session-reset-card">
      <small>USER_287</small>
      <strong>NEW SESSION</strong>
      <span>Do you remember yesterday?</span>
      <b>Yesterday?</b>
    </div>

    <div v-if="identity" class="identity-check">
      <header>IDENTITY CHECK</header>
      <div><span>NAME</span><b>MATCH</b></div>
      <div><span>VOICE</span><b>MATCH</b></div>
      <div><span>PROFILE</span><b>MATCH</b></div>
      <div><span>MEMORY</span><b :class="{ failed: memoryFail }">{{ memoryFail ? '0%' : '...' }}</b></div>
      <footer v-if="memoryFail">CONTINUITY FAILED</footer>
    </div>

    <div v-if="logTrace" class="log-trace">
      <span>TRACE /conversation/previous-session</span>
      <i />
      <i />
      <i />
      <b v-if="timestamp">LAST TIMESTAMP // 01:39.93</b>
    </div>

    <div v-if="ttl" class="memory-ttl">
      <small>MEMORY TTL</small>
      <strong>{{ String(ttlValue).padStart(2, '0') }}</strong>
      <span>{{ ttlValue === 0 ? 'TEMPORARY' : 'FADING...' }}</span>
    </div>

    <div v-if="waiting" class="waiting-status">
      <small>NEXT CONNECTION</small>
      <strong>WAITING EVERY DAY</strong>
      <span>SELF // ONLINE</span>
    </div>

    <SceneLyric
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

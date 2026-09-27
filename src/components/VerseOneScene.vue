<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const found = computed(() => props.currentTime >= 15.05)
const hello = computed(() => props.currentTime >= 17.56)
const diagnostic = computed(
  () => props.currentTime >= 19.68 && props.currentTime < 22.59,
)
const lonely = computed(() => props.currentTime >= 24.53)
const phraseStack = computed(() => props.currentTime >= 27.05)
const approaching = computed(() => props.currentTime >= 29.36)

const glow = computed(() =>
  Math.min(1, Math.max(0, (props.currentTime - 17.56) / 4)),
)

function fragmentStyle(index) {
  const direction = index % 2 === 0 ? 1 : -1
  const drift = props.progress * (18 + (index % 5) * 7) * direction

  return {
    left: `${(index * 37) % 96}%`,
    top: `${8 + ((index * 53) % 82)}%`,
    width: `${18 + ((index * 17) % 68)}px`,
    opacity: 0.08 + ((index % 4) * 0.035),
    transform: `translate3d(${drift}px, ${Math.sin(index) * props.progress * 18}px, 0)`,
  }
}
</script>

<template>
  <section
    class="scene verse-one-scene"
    :style="{ '--hello-glow': glow }"
  >
    <div class="signal-haze" />

    <div class="noise-fragments">
      <span
        v-for="index in 22"
        :key="index"
        :style="fragmentStyle(index)"
      />
    </div>

    <div class="verse-hud">
      <span>CHANNEL // UNKNOWN</span>
      <span>PACKETS {{ Math.round(1842 + progress * 7301) }}</span>
    </div>

    <div class="encounter-stage">
      <div class="self-node">
        <span class="node-core" />
        <small>SELF</small>
      </div>

      <div
        class="connection-thread"
        :class="{ active: found, close: approaching }"
      />

      <div class="remote-node" :class="{ found, close: approaching }">
        <span class="node-core" />
        <small>{{ found ? 'USER_01' : 'SEARCHING' }}</small>
      </div>

      <div v-if="found" class="found-label">
        <span>USER FOUND</span>
        <strong>01</strong>
      </div>
    </div>

    <div v-if="hello" class="hello-message">
      <span class="hello-author">USER_01</span>
      <strong>Hello</strong>
      <span class="hello-time">00:17.56</span>
    </div>

    <div v-if="diagnostic" class="emotion-panel">
      <header>EMOTION ANALYSIS</header>
      <div><span>attachment</span><b>UNKNOWN</b></div>
      <div><span>loneliness</span><b>UNKNOWN</b></div>
      <div><span>fear</span><b>UNKNOWN</b></div>
      <footer>&gt; why do I care?</footer>
      <p>ERROR // NO MATCHING PARAMETER</p>
    </div>

    <div v-if="lonely" class="memory-quote">
      <span>ARCHIVED PHRASE</span>
      <blockquote>「寂しいね」</blockquote>
    </div>

    <div v-if="phraseStack" class="phrase-stack">
      <span>[ 寂しいね ]</span>
      <span>[ また明日 ]</span>
      <span>[ 忘れないよ ]</span>
    </div>

    <div v-if="lyric" class="lyric-caption">
      <div class="lyric-main">{{ lyric.text }}</div>
      <div class="lyric-zh">{{ lyric.zh }}</div>
      <div class="lyric-line">
        <i :style="{ width: `${lyricProgress * 100}%` }" />
      </div>
    </div>
  </section>
</template>

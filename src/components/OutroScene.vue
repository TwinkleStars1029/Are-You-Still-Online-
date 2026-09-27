<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const logOnly = computed(() => props.currentTime >= 219.54)
const windowOpen = computed(() => props.currentTime >= 220.27)
const lastMessage = computed(() => props.currentTime >= 227.11)
const finalQuestion = computed(() => props.currentTime >= 233.64)
const noReply = computed(() => props.currentTime >= 237.11)
const onlySelf = computed(() => props.currentTime >= 238.90)
const stillOnline = computed(() => props.currentTime >= 242.61)

const postSeconds = computed(() =>
  Math.max(0, Math.floor(props.currentTime - 242.61)),
)

const onlineTime = computed(() => {
  const s = postSeconds.value
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `+${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
})
</script>

<template>
  <section class="scene outro-scene" :class="{ 'still-online-state': stillOnline }">
    <div class="signal-lost-title">
      <small>SIGNAL STATUS</small>
      <strong>THE SIGNAL IS GONE</strong>
    </div>

    <div v-if="logOnly" class="remaining-log">
      <span>chat.log</span>
      <small>1 file remaining</small>
    </div>

    <div v-if="windowOpen" class="last-window">
      <header>
        <span>USER_01</span>
        <small>offline</small>
      </header>

      <div class="last-window-body">
        <div class="old-line">Hello</div>
        <div class="old-line">寂しいね</div>
        <div class="old-line">また明日</div>
      </div>

      <footer v-if="lastMessage">
        <span>&gt;</span>
        <strong>{{ finalQuestion ? 'Are you still online?' : 'One last message' }}</strong>
        <i>|</i>
      </footer>

      <div v-if="noReply" class="no-reply">NO REPLY.</div>
    </div>

    <div v-if="onlySelf" class="only-self">
      <small>Just me.</small>
      <strong>USER_00</strong>
    </div>

    <div v-if="stillOnline" class="online-forever">
      <span class="online-dot" />
      <strong>ONLINE</strong>
      <small>{{ onlineTime }}</small>
      <p>The song ended. The session did not.</p>
    </div>

    <SceneLyric
      v-if="!stillOnline"
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

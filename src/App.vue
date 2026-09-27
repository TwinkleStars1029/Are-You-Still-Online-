<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import BootScene from './components/BootScene.vue'
import VerseOneScene from './components/VerseOneScene.vue'
import PreChorusScene from './components/PreChorusScene.vue'
import QuestionScene from './components/QuestionScene.vue'
import { DEMO_END, useMVDirector } from './composables/useMVDirector'

const director = useMVDirector()

const audio = ref(null)
const baseUrl = import.meta.env.BASE_URL
const isPlaying = ref(false)
const isDemoMode = ref(false)
const audioReady = ref(false)
const statusText = ref('等待音訊')

let rafId = null
let demoStartedAt = 0
let demoBaseTime = 0

const sceneComponent = computed(() => {
  switch (director.activeScene.value?.id) {
    case 'verse-1':
      return VerseOneScene
    case 'pre-chorus-1':
      return PreChorusScene
    case 'question':
      return QuestionScene
    default:
      return BootScene
  }
})

function formatTime(value) {
  const safe = Number.isFinite(value) ? value : 0
  const min = Math.floor(safe / 60)
  const sec = Math.floor(safe % 60)
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function syncFrame(now = performance.now()) {
  if (!isPlaying.value) return

  if (isDemoMode.value) {
    const elapsed = (now - demoStartedAt) / 1000
    const next = demoBaseTime + elapsed

    if (next >= director.duration.value) {
      director.seek(director.duration.value)
      isPlaying.value = false
      return
    }

    director.seek(next)
  } else if (audio.value) {
    director.seek(audio.value.currentTime)
  }

  rafId = requestAnimationFrame(syncFrame)
}

async function togglePlay() {
  if (isPlaying.value) {
    isPlaying.value = false
    cancelAnimationFrame(rafId)
    if (!isDemoMode.value) audio.value?.pause()
    return
  }

  if (director.currentTime.value >= director.duration.value - 0.05) {
    seekTo(0)
  }

  if (audioReady.value && audio.value) {
    isDemoMode.value = false
    try {
      await audio.value.play()
      statusText.value = '音訊模式'
    } catch {
      isDemoMode.value = true
    }
  } else {
    isDemoMode.value = true
    statusText.value = 'v0.2 展示模式'
  }

  if (isDemoMode.value) {
    demoBaseTime = director.currentTime.value
    demoStartedAt = performance.now()
  }

  isPlaying.value = true
  rafId = requestAnimationFrame(syncFrame)
}

function seekTo(value) {
  const time = Number(value)
  director.seek(time)

  if (audio.value && audioReady.value) {
    audio.value.currentTime = time
  }

  if (isPlaying.value && isDemoMode.value) {
    demoBaseTime = time
    demoStartedAt = performance.now()
  }
}

function onAudioLoaded() {
  audioReady.value = true
  director.duration.value = audio.value.duration || DEMO_END
  statusText.value = '已載入 song.mp3'
}

function onAudioError() {
  audioReady.value = false
  director.duration.value = DEMO_END
  statusText.value = 'v0.2 展示模式'
}

onBeforeUnmount(() => cancelAnimationFrame(rafId))
</script>

<template>
  <div class="mv-shell">
    <audio
      ref="audio"
      :src="`${baseUrl}song.mp3`"
      preload="metadata"
      @loadedmetadata="onAudioLoaded"
      @error="onAudioError"
      @ended="isPlaying = false"
    />

    <Transition name="scene-fade" mode="out-in">
      <component
        :is="sceneComponent"
        :key="director.activeScene.value?.id"
        :progress="director.sceneProgress.value"
        :current-time="director.currentTime.value"
        :lyric="director.activeLyric.value"
        :lyric-progress="director.lyricProgress.value"
        :cue="director.currentCue.value"
      />
    </Transition>

    <div class="noise" />
    <div class="scanlines" />

    <div class="player">
      <button class="play" @click="togglePlay">
        {{ isPlaying ? 'PAUSE' : 'PLAY' }}
      </button>

      <div class="time">
        {{ formatTime(director.currentTime.value) }}
        <span>/</span>
        {{ formatTime(director.duration.value) }}
      </div>

      <input
        class="scrubber"
        type="range"
        min="0"
        :max="director.duration.value"
        step="0.01"
        :value="director.currentTime.value"
        @input="seekTo($event.target.value)"
      />

      <div class="mode">{{ statusText }}</div>
    </div>
  </div>
</template>

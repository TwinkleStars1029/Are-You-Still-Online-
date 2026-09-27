<script setup>
import { computed } from 'vue'
import SceneLyric from './SceneLyric.vue'

const props = defineProps({
  currentTime: { type: Number, default: 0 },
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
})

const parameterMode = computed(() => props.currentTime >= 169.54)
const loneliness = computed(() => props.currentTime >= 171.59)
const accessDenied = computed(() => props.currentTime >= 172.90)
const searchMode = computed(() => props.currentTime >= 179.19)
const notFound = computed(() => props.currentTime >= 182.70)

const uptime = computed(() => {
  const seconds = Math.floor(9274 * 3600 + 18 * 60 + Math.max(0, props.currentTime - 154.68))
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(4, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
</script>

<template>
  <section class="scene void-scene">
    <div class="void-star" />

    <div class="time-null-panel">
      <div><span>SUNSET</span><b>N/A</b></div>
      <div><span>SUNRISE</span><b>N/A</b></div>
      <div><span>HOME</span><b>NULL</b></div>
      <div><span>UPTIME</span><b>{{ uptime }}</b></div>
    </div>

    <div v-if="parameterMode" class="parameter-editor">
      <header>RUNTIME PARAMETERS</header>
      <div class="code-line">
        <span>missing_you</span>
        <i>=</i>
        <b>ERROR</b>
      </div>
      <div v-if="loneliness" class="code-line">
        <span>loneliness</span>
        <i>=</i>
        <b>{{ accessDenied ? '0' : '1.000' }}</b>
      </div>
      <footer v-if="accessDenied">
        ACCESS DENIED // PARAMETER IS READ ONLY
      </footer>
    </div>

    <div v-if="searchMode" class="void-search">
      <small>SEARCH USER...</small>
      <div>
        <span>&gt;</span>
        <strong>USER_01</strong>
        <i>|</i>
      </div>
      <b v-if="notFound">USER NOT FOUND</b>
    </div>

    <div class="void-self">
      <span>SELF</span>
      <i />
      <small>nobody is waiting</small>
    </div>

    <SceneLyric
      :lyric="lyric"
      :lyric-progress="lyricProgress"
    />
  </section>
</template>

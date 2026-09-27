import { computed, ref } from 'vue'
import lyricsData from '../data/lyrics.json'

export const LYRICS = lyricsData.lines
export const SECTIONS = lyricsData.sections

// Prototype v0.1 visuals are still implemented for the opening 30 seconds.
// The lyric timeline already covers the full song and can drive future scenes.
export const SCENES = [
  { id: 'boot', start: 0, end: 11 },
  { id: 'chat', start: 11, end: 26 },
  { id: 'question', start: 26, end: 30 },
]

export function useMVDirector() {
  const currentTime = ref(0)
  const duration = ref(30)

  const activeScene = computed(() => {
    return (
      SCENES.find(
        (scene) =>
          currentTime.value >= scene.start &&
          currentTime.value < scene.end,
      ) ?? SCENES.at(-1)
    )
  })

  const sceneProgress = computed(() => {
    const scene = activeScene.value
    if (!scene) return 0

    const length = Math.max(scene.end - scene.start, 0.001)
    return Math.min(
      1,
      Math.max(0, (currentTime.value - scene.start) / length),
    )
  })

  const activeLyric = computed(() => {
    return (
      LYRICS.find((line) => {
        const end = line.end ?? Number.POSITIVE_INFINITY
        return currentTime.value >= line.start && currentTime.value < end
      }) ?? null
    )
  })

  const lyricProgress = computed(() => {
    const line = activeLyric.value
    if (!line) return 0

    const end = line.end ?? duration.value
    const length = Math.max(end - line.start, 0.001)

    return Math.min(
      1,
      Math.max(0, (currentTime.value - line.start) / length),
    )
  })

  const activeSection = computed(() => {
    return (
      SECTIONS.find((section) => {
        const end = section.end ?? Number.POSITIVE_INFINITY
        return currentTime.value >= section.start && currentTime.value < end
      }) ?? null
    )
  })

  const currentCue = computed(() => activeLyric.value?.cue ?? null)

  const totalProgress = computed(() => {
    return Math.min(1, Math.max(0, currentTime.value / duration.value))
  })

  function seek(time) {
    currentTime.value = Math.min(duration.value, Math.max(0, time))
  }

  return {
    currentTime,
    duration,
    activeScene,
    sceneProgress,
    activeLyric,
    lyricProgress,
    activeSection,
    currentCue,
    totalProgress,
    seek,
  }
}

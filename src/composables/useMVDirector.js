import { computed, ref } from 'vue'
import lyricsData from '../data/lyrics.json'

export const LYRICS = lyricsData.lines
export const SECTIONS = lyricsData.sections

export const DEMO_END = 49.34

export const SCENES = [
  { id: 'boot', start: 0, end: 12.73 },
  { id: 'verse-1', start: 12.73, end: 32.08 },
  { id: 'pre-chorus-1', start: 32.08, end: 44.89 },
  { id: 'question', start: 44.89, end: DEMO_END },
]

export function useMVDirector() {
  const currentTime = ref(0)
  const duration = ref(DEMO_END)

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

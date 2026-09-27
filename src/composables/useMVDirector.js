import { computed, ref } from 'vue'

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
    totalProgress,
    seek,
  }
}

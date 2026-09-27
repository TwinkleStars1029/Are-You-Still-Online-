<script setup>
defineProps({
  lyric: { type: Object, default: null },
  lyricProgress: { type: Number, default: 0 },
  align: { type: String, default: 'center' },
})
</script>

<template>
  <div
    v-if="lyric"
    class="scene-lyric"
    :class="`scene-lyric--${align}`"
  >
    <div class="scene-lyric__main">{{ lyric.text }}</div>
    <div class="scene-lyric__zh">{{ lyric.zh }}</div>
    <div class="scene-lyric__track">
      <i :style="{ width: `${lyricProgress * 100}%` }" />
    </div>
  </div>
</template>

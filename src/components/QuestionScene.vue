<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
})

const opacity = computed(() =>
  Math.min(1, Math.max(0, props.progress * 2.2)),
)

const drift = computed(() => `${(1 - props.progress) * 22}px`)
</script>

<template>
  <section class="scene question-scene">
    <div
      class="question"
      :style="{ opacity, transform: `translateY(${drift})` }"
    >
      <div class="tiny">MESSAGE NOT SENT</div>
      <h1>Are you still online?</h1>
      <div class="offline"><span /> offline</div>
    </div>
  </section>
</template>

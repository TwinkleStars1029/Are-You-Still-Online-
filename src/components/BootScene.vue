<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
})

const percent = computed(() => {
  if (props.progress < 0.15) return 6
  if (props.progress < 0.34) return 17
  if (props.progress < 0.52) return 31
  if (props.progress < 0.72) return 47
  if (props.progress < 0.88) return 78
  return 100
})

const established = computed(() => props.progress > 0.9)
</script>

<template>
  <section class="scene boot-scene">
    <div class="boot-grid" />

    <div class="boot-center">
      <div class="eyebrow">SOCIAL LINK // NODE 01</div>

      <div class="orb" :class="{ connected: established }">
        <span />
      </div>

      <template v-if="!established">
        <h1>CONNECTING...</h1>
        <p class="muted">Searching for user</p>
        <div class="percent">{{ percent }}%</div>
      </template>

      <template v-else>
        <h1 class="success">CONNECTION ESTABLISHED</h1>
        <p class="muted">1 archived contact found</p>
      </template>
    </div>

    <div class="boot-footer">
      <span>MEMORY: OK</span>
      <span>NETWORK: OK</span>
      <span>ESC TO DISCONNECT</span>
    </div>
  </section>
</template>

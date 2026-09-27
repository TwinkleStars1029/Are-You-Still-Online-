<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
})

const messages = [
  { at: 0.08, side: 'other', text: 'hey' },
  { at: 0.20, side: 'self', text: 'are you awake?' },
  { at: 0.35, side: 'other', text: 'I found something interesting today' },
  { at: 0.51, side: 'other', text: '▒▒▒▒▒▒▒▒▒▒▒' },
  { at: 0.67, side: 'other', text: 'see you tomorrow' },
]

const visibleMessages = computed(() =>
  messages.filter((message) => props.progress >= message.at),
)

const typing = computed(() => {
  if (props.progress < 0.76) return ''
  if (props.progress < 0.82) return 'A'
  if (props.progress < 0.86) return 'Are you'
  if (props.progress < 0.91) return 'Are you still'
  return 'Are you still online?'
})
</script>

<template>
  <section class="scene chat-scene">
    <header class="chat-header">
      <div>
        <div class="contact-name">USER_01</div>
        <div class="status">last seen 184 days ago</div>
      </div>
      <div class="signal">SIGNAL 0%</div>
    </header>

    <main class="messages">
      <div
        v-for="(message, index) in visibleMessages"
        :key="index"
        class="message-row"
        :class="message.side"
      >
        <div class="message">{{ message.text }}</div>
      </div>
    </main>

    <footer class="composer">
      <span class="prompt">&gt;</span>
      <span class="typed">{{ typing }}</span>
      <span class="caret">|</span>
      <button disabled>SEND</button>
    </footer>
  </section>
</template>

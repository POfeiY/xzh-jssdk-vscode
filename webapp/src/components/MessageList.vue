<script setup lang="ts">
import { ref } from 'vue'
import { useMessagesStore } from '../store/messages'

import MessageItem from './MessageItem.vue'

const { messages } = useMessagesStore()

const bottomAnchorRef = ref<HTMLDivElement | null>(null)
function autoScrollToBottom() {
  bottomAnchorRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
onMounted(() => {
  autoScrollToBottom()
})
</script>

<template>
  <div class="message-list-container">
    <MessageItem v-for="(m, idx) in messages" :key="idx" :msg="m" />
    <div id="bottomAnchorRef" ref="bottomAnchorRef" />
  </div>
</template>

<style scoped lang="less">
.message-list-container {
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  height: calc(100% - 74px);
  overflow-y: scroll;
}
</style>

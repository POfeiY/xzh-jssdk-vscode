<script setup lang="ts">
import type { Message } from '../types'
import { Bot24Regular, PersonFeedback24Regular } from '@vicons/fluent'

const props = defineProps<{ msg: Message }>()

const messageContainerClass = computed(() => props.msg.role === 'assistant' ? 'message-item message-item-left' : 'message-item message-item-right')
const roleIcon = computed(() => props.msg.role === 'assistant' ? Bot24Regular : PersonFeedback24Regular)
</script>

<template>
  <div :class="messageContainerClass">
    <section class="role-avatar-icon">
      <i><n-icon :component="roleIcon" size="24" /></i>
    </section>
    <section class="message-content">
      <p>{{ props.msg.content }}</p>
    </section>
  </div>
</template>

<style scoped lang="less">
.message-item {
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  .role-avatar-icon {
    text-align: left;
  }
  .message-content {
    padding: 8px 14px;
    max-width: 85%;
    white-space: wrap;
    line-height: 16px;
    border: 1px solid gray;
    border-radius: 6px;
  }
}
.message-item-left {
  align-items: flex-start;
  .message-content {
    text-align: left;
  }
}
.message-item-right {
  align-items: flex-end;
  .message-content {
    text-align: right;
  }
}
</style>

<script setup lang="ts">
import type { Message } from '~/types'
import { ArrowSync24Regular, Bot24Regular, Copy24Regular, Delete28Regular, PersonFeedback24Regular } from '@vicons/fluent'
import { Role } from '~/composable/constant'
import { useMessagesStore } from '~/store/messages'

const props = defineProps<{ msg: Message }>()
const messageStore = useMessagesStore()
const messageNotice = useMessage()

const isUserRole = computed(() => props.msg.role === 'user')
const messageContainerClass = computed(() => !isUserRole.value ? 'message-item message-item-left' : 'message-item message-item-right')
const roleIcon = computed(() => !isUserRole.value ? Bot24Regular : PersonFeedback24Regular)

function deleteHandler() {
  messageStore.deleteMessage(props.msg.id)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.msg.content)
    messageNotice.info('已复制')
  }
  catch {
    messageNotice.error('复制到剪切板时发生错误❌')
  }
}

async function resend() {
  const [_, tempId] = props.msg.id.split('-')
  messageStore.updateMessageContent(`${Role.ASSISTANT}-${tempId}`, '')
  await messageStore.sendQuestion(props.msg.question, tempId!)
}
</script>

<template>
  <div :class="messageContainerClass">
    <section class="role-avatar-icon">
      <div class="btn-wrapper">
        <i class="btn-icon" @click.stop="copy"><n-icon :component="Copy24Regular" size="20" /></i>
        <template v-if="isUserRole">
          <i class="btn-icon" @click.stop="resend"><n-icon :component="ArrowSync24Regular" size="20" /></i>
          <i class="btn-icon" @click.stop="deleteHandler"><n-icon :component="Delete28Regular" size="20" /></i>
        </template>
      </div>
      <i><n-icon :component="roleIcon" size="36" /></i>
    </section>
    <section class="message-content">
      <p>{{ props.msg.content }}</p>
    </section>
  </div>
</template>

<style scoped lang="less">
.message-item {
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  .role-avatar-icon {
    display: flex;
    align-items: center;
    gap: 0 8px;
    text-align: left;
    .btn-wrapper {
      display: flex;
      gap: 0 2px;
    }
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
  .role-avatar-icon {
    flex-direction: row-reverse;
  }
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

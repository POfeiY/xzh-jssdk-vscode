<script setup lang="ts">
import { Send28Filled } from '@vicons/fluent'
import { AttachOutline } from '@vicons/ionicons5'
import { uniqueId } from 'lodash-es'
import { Role } from '~/composable/constant'
import { useMessagesStore } from '~/store/messages'

onMounted(() => {
  // register
  window.EventCenter = new Map()
})

onUnmounted(() => {
  // dispose
  window.EventCenter = null
})

const messageStore = useMessagesStore()

const question = ref<string>('')

const canDoSend = computed(() => !messageStore.isQuerying && question.value.trim().length > 0)

async function send() {
  if (!canDoSend.value)
    return
  const queryString = question.value.trim()
  question.value = ''
  const id = uniqueId()
  messageStore.addMessage({
    role: Role.USER,
    id: `${Role.USER}-${id}`,
    content: queryString,
    question: queryString,
    timestamp: performance.now(),
  })
  await messageStore.sendQuestion(queryString, id)
}
</script>

<template>
  <div class="input-box">
    <n-input v-model:value="question" :loading="messageStore.isQuerying" round placeholder="请说出你的想法">
      <template #prefix>
        <n-icon :component="AttachOutline" />
      </template>
      <template #suffix>
        <i class="btn-icon" @click.stop="send"><n-icon :component="Send28Filled" :color="canDoSend ? '#63e2b7' : 'grey'" /></i>
      </template>
    </n-input>
  </div>
</template>

<style scoped lang="less">
.input-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

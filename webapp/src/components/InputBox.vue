<script setup lang="ts">
import { Send28Filled } from '@vicons/fluent'
import { AttachOutline } from '@vicons/ionicons5'
import { uniqueId } from 'lodash-es'
import { getMockBotResponse } from '../composable/useMockRequest'
import { useMessagesStore } from '../store/messages'

const { addMessage } = useMessagesStore()
const loading = ref<boolean>(false)

const question = ref<string>('')

const canDoSend = computed(() => !loading.value && question.value.trim().length > 0)

async function sendQuestion() {
  if (!canDoSend.value)
    return
  const id = uniqueId()
  addMessage({
    role: 'user',
    id,
    content: question.value.trim(),
    question: question.value.trim(),
    timestamp: performance.now(),
  })
  loading.value = true
  question.value = ''
  try {
    const content = await getMockBotResponse()
    addMessage({
      role: 'assistant',
      id,
      content,
      question: question.value.trim(),
      timestamp: performance.now(),
    })
  }
  catch {
    // TODO: update user message status
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="input-box">
    <n-input v-model:value="question" :loading="loading" round placeholder="search">
      <template #prefix>
        <n-icon :component="AttachOutline" />
      </template>
      <template #suffix>
        <i class="btn-icon"><n-icon :component="Send28Filled" :color="canDoSend ? '#63e2b7' : 'grey'" @click="sendQuestion" /></i>
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
.btn-icon {
  cursor: pointer;
}
</style>

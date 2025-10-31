import type { Message } from '../types'
import { defineStore } from 'pinia'
import { Role } from '~/composable/constant'
import { getMockBotResponse } from '../composable/useMockRequest'

export const useMessagesStore = defineStore('messages', () => {
  const isQuerying = ref<boolean>(false)
  const messages = ref<Message[]>([])

  function updateIsQuerying(status: boolean) {
    isQuerying.value = status
  }
  /**
   * 新增消息
   * @param msg 消息
   */
  function addMessage(msg: Message) {
    messages.value.push(msg)
  }

  /**
   * 删除消息
   * @param id 消息id
   */
  function deleteMessage(id: string) {
    const idx = messages.value.findIndex(msg => msg.id === id)
    if (idx > -1)
      messages.value.splice(idx, 1)
  }

  function updateMessageContent(id: string, content: string) {
    const msg = messages.value.find(msg => msg.id === id)
    if (msg)
      msg.content = content
  }

  async function sendQuestion(question: string, id: string) {
    updateIsQuerying(true)
    try {
      const content = await getMockBotResponse()
      const isMsgExisted = messages.value.map(m => m.id).includes(`${Role.ASSISTANT}-${id}`)
      // 存量消息更新
      if (isMsgExisted) {
        updateMessageContent(`${Role.ASSISTANT}-${id}`, content)
      }
      // 新增消息
      else {
        addMessage({
          role: Role.ASSISTANT,
          id: `${Role.ASSISTANT}-${id}`,
          content,
          question,
          timestamp: performance.now(),
        })
      }
    }
    catch {
    // TODO: update user message status
    }
    finally {
      updateIsQuerying(false)
    }
  }

  return { isQuerying, updateIsQuerying, messages, addMessage, deleteMessage, sendQuestion, updateMessageContent }
})

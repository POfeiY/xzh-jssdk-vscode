import type { Message } from '../types'
import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])

  function addMessage(msg: Message) {
    messages.value.push(msg)
  }

  function deleteMessage(id: string) {
    const idx = messages.value.findIndex(msg => msg.id === id)
    if (idx > -1)
      messages.value.splice(idx, 1)
  }

  return { messages, addMessage, deleteMessage }
})

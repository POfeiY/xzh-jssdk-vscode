import type { Message } from '../types'
import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])

  function addMessage(msg: Message) {
    messages.value.push(msg)
  }

  return { messages, addMessage }
})

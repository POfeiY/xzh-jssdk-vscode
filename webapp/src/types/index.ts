export interface Message {
  role: 'assistant' | 'user'
  id: string
  question: string
  content: string
  timestamp: number
}

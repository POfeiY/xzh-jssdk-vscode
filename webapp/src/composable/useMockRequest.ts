import { sleep } from './utils'

const UserQuestion = '🚀 Why Gemini CLI?'
const BotResponse = '🎯 Free tier: 60 requests/min and 1,000 requests/day with personal Google account.'

export function getMockUserQuestion() {
  return UserQuestion
}

export async function getMockBotResponse() {
  await sleep(2000)
  return BotResponse
}

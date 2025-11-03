/**
 * sse请求
 * @description 集成FastGPT平台接口
 */
import type { PostMessageType } from '../types'

type Fn = (message: PostMessageType) => void

export async function sseRequest(url: string, body: Record<string, any>, onSuccess: Fn, onFail?: Fn) {
  try {
    const res = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Accept': 'text/event-stream',
          'Content-type': 'application/json',
          'Authorization': '',
        },
        body: JSON.stringify(body),
      },
    )

    // handler sse message
    const reader = res.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader!.read()

      if (done) {
        console.error('sse stream end')
        break
      }

      const chunk = decoder.decode(value, { stream: true })

      const lines = chunk.split('\n')
      lines.forEach((line) => {
        const data = line.slice(6)
        const content = data.match(/"content:"(.*?)"/)?.[1]
        if (content)
          onSuccess({ command: 'invokeAi', params: { content } })
      })
    }
  }
  catch (error) {
    onFail?.({ command: 'error', params: { error } })
  }
}

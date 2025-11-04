/**
 * fetch tool
 */

/**
 *
 * @param url 接口抵制
 * @param body 请求报文体
 * @param onSuccess 成功回调
 * @param onFail 失败回调
 */
export async function useFetch(url: string, auth: string, body: Record<string, any>, onSuccessKey: string, onFailKey?: string) {
  try {
    const res = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Accept': 'text/event-stream',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${auth}`,
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
          window.EventCenter?.get(onSuccessKey)?.({ command: 'invokeAi', params: { content } })
      })
    }
  }
  catch (error) {
    if (typeof onFailKey === 'string')
      window.EventCenter?.get(onFailKey)?.({ command: 'error', params: { error } })
  }
}

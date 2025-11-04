import { uniqueId } from 'lodash-es'
/**
 * vscode & webview 网络通信
 * Dev sync
 * Prod postMessage
 * TODO: 处理AI流式数据
 */
import { useFetch } from './useFetch'

type Fn = (params: any) => void

const isProd = import.meta.env.PROD
const AI_AGENT_AUTH = import.meta.env.PUBLIC_AI_AGENT_AUTH
const AI_AGENT_URL = import.meta.env.PUBLIC_AI_AGENT_URL

export function useRequestAi() {
  function request(messages: { role: string, content: string }[], onSuccess: Fn, onFail?: Fn) {
    const body = {
      chatID: '',
      stream: true,
      detail: false,
      messages,
    }

    const onSuccessKey = uniqueId()
    const onFailKey = uniqueId()
    window.EventCenter?.set(onSuccessKey, onSuccess)
    if (typeof onFail === 'function')
      window.EventCenter?.set(onFailKey, onFail)

    if (isProd) {
      const vscode = window.acquireVsCodeApi()
      vscode.postMessage({
        command: 'invokeAi',
        params: {
          url: AI_AGENT_URL,
          headers: {
            Authorization: AI_AGENT_AUTH,
          },
          body,
          onSuccessKey,
          onFailKey,
        },
      })
    }
    else {
    // env mock
      useFetch(AI_AGENT_URL, AI_AGENT_AUTH, body, onSuccessKey, onFailKey)
    }
  }

  return { request }
}

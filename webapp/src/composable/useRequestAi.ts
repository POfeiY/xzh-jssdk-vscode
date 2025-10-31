/**
 * vscode & webview 网络通信
 * Dev sync
 * Prod postMessage
 * TODO: 处理AI流式数据
 */
const isProd = import.meta.env.PROD
export function useRequestAi() {
  if (isProd) {
    const vscode = window.acquireVsCodeApi()
    vscode.postMessage({
      command: 'invokeAi',
      data: {
        url: '',
        body: {
          chatID: '',
          stream: true,
          detail: false,
          messages: [
            { role: 'user', content: '' },
          ],
        },
      },
    })
  }
  else {
    // env mock
    console.error('axios mock request')
  }
}

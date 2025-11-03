/**
 * RPC通信工具
 */
import type vscode from 'vscode'
import type { PostMessageType } from '../types'
import { sseRequest } from './sseRequest'

export class RpcClass {
  _view: vscode.WebviewView

  constructor(view: vscode.WebviewView) {
    this._view = view
  }

  /**
   * 接收webview发送的消息
   */
  receiveMessageFromWebview(message: PostMessageType) {
    if (!message.command)
      return
    switch (message.command) {
      case 'invokeAi':
        // 发送sse请求
        sseRequest(message.params.url, message.params.body, this.sendMessageToWebview)
        break

      default:
        break
    }
  }

  /**
   * 发送消息
   * @param message
   */
  sendMessageToWebview(message: PostMessageType) {
    this._view.webview.postMessage(message)
  }
}

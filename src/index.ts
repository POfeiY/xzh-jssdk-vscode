import type { PostMessageType } from './types'
import fs from 'node:fs/promises'
import path from 'node:path'
import vscode from 'vscode'
import { sseRequest } from './composable/sseRequest'

export function activate(context: vscode.ExtensionContext) {
  const provider = new JssdkViewProvider(context.extensionUri, context.extensionPath)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(JssdkViewProvider.viewType, provider, { webviewOptions: { retainContextWhenHidden: true } }),
  )
}

class JssdkViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'jssdk-doc-assistant'

  _view?: vscode.WebviewView
  private extensionPath: string

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _extensionPath: string,
  ) {
    this._extensionUri = _extensionUri
    this.extensionPath = _extensionPath
  }

  public async resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): Promise<void> {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      enableCommandUris: true,
      localResourceRoots: [
        this._extensionUri,
      ],
    }

    webviewView.webview.html = this._getHtmlForWebview()
    // webviewView.webview.html = await this._getHtmlForWebview(_context, webviewView.webview!)

    webviewView.webview.onDidReceiveMessage((message) => {
      this.receiveMessageFromWebview(message)
    })
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
    this._view?.webview.postMessage(message)
  }

  private _getHtmlForWebview() {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>xzh-jssdk-vscode</title>
        <style>
          body {
            margin: 0;
            box-sizing: border-box;
            padding: .5em;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          body #jssdk-vscode {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe id="jssdk-vscode" src="http://20.3.245.57:3000/chat/share?shareId=hf87xl6rb9v6xspcbajzt5s0" frameborder="0"></iframe>
      </body>
      </html>
      `
  }
  // private async _getHtmlForWebview(ctx: vscode.WebviewViewResolveContext, webview: vscode.Webview) {
  //   const appDistPath = path.join(this.extensionPath, '/dist/webapp')
  //   const indexPath = path.join(appDistPath, 'index.html')
  //   let indexHtml = await fs.readFile(indexPath, { encoding: 'utf8' })

  //   const matchLinks = /(href|src)="([^"]*)"/g
  //   const toUri = (_: string, prefix: 'href' | 'src', link: string) => {
  //     if (link === '#') {
  //       return `${prefix}="${link}"`
  //     }
  //     const _path = path.join(appDistPath, link)
  //     const uri = vscode.Uri.file(_path)
  //     return `${prefix}="${webview.asWebviewUri(uri)}"`
  //   }
  //   indexHtml = indexHtml.replace(matchLinks, toUri)
  //   return indexHtml
  // }
}

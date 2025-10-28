import { computed, defineService, extensionContext, ref, useFileUri, useWebviewView } from 'reactive-vscode'
import vscode from 'vscode'

export const useDemoWebviewView = defineService(() => {
  const message = ref('')

  const { postMessage, view } = useWebviewView(
    'jssdk-doc-assistant',
    // html,
    'placeholder',
    {
      webviewOptions: {
        enableScripts: true,
        enableCommandUris: true,
        localResourceRoots: [

        ],
      },
      onDidReceiveMessage(ev) {
        if (ev.type === 'updateMessage')
          message.value = ev.message
      },
    },
  )

  setTimeout(() => {
    vscode.window.showInformationMessage(getHtmlForWebview(view.value!.webview))
    if (view.value?.webview)
      view.value!.webview.html = getHtmlForWebview(view.value!.webview)
  }, 1000)

  return { message, postMessage, view }
})

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function getHtmlForWebview(view: vscode.Webview) {
  const nonce = getNonce()
  const entryScript = view.asWebviewUri(useFileUri(vscode.Uri.joinPath(__dirname, 'res/webapp/static/js/lib-vue.2f9000e5.js')))
  const entryScript1 = view.asWebviewUri(useFileUri(vscode.Uri.joinPath(__dirname, 'res/webapp/static/js/index.3a6ae001.js')))
  const cssFile = view.asWebviewUri(useFileUri(vscode.Uri.joinPath(__dirname, 'res/webapp/static/css/index.677e40e0.css')))
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${view.cspSource}; script-src 'nonce-${nonce}';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webapp</title>
    <script defer nonce=${nonce} src=${entryScript}></script>
    <script defer nonce=${nonce} src=${entryScript1}></script>
    <link href=${cssFile} nonce=${nonce} rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`
}

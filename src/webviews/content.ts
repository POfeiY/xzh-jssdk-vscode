import { computed, defineService, ref, useFileUri, useWebviewView } from 'reactive-vscode'
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
        localResourceRoots: [],
      },
      onDidReceiveMessage(ev) {
        if (ev.type === 'updateMessage')
          message.value = ev.message
      },
    },
  )

  if (view.value?.webview)
    view.value!.webview.html = getHtmlForWebview(view.value!.webview)

  return { message, postMessage, view }
})

function getHtmlForWebview(view: vscode.Webview) {
  vscode.window.showInformationMessage('getHtmlForWebview')
  const root = useFileUri('')
  const entryScript = view.asWebviewUri(vscode.Uri.joinPath(root.value, 'res/webapp/static/js/lib-vue.2f9000e5.js'))
  const entryScript1 = view.asWebviewUri(vscode.Uri.joinPath(root.value, 'res/webapp/static/js/index.3a6ae001.js'))
  const cssFile = view.asWebviewUri(vscode.Uri.joinPath(root.value, 'res/webapp/static/css/index.677e40e0.css'))
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webapp</title>
    <script defer src=${entryScript}></script>
    <script defer src=${entryScript1}></script>
    <link href=${cssFile} rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

`
}

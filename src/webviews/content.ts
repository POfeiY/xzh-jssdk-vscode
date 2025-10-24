import { computed, defineService, ref, useWebviewView } from 'reactive-vscode'
import vscode from 'vscode'

export const useDemoWebviewView = defineService(() => {
  const message = ref('')
  // const html = computed(() => `
  // <script>
  //   vscode = acquireVsCodeApi()
  //   function updateMessage() {
  //     vscode.postMessage({
  //       type: 'updateMessage',
  //       message: document.querySelector('input').value,
  //     })
  //   }
  // </script>
  // <p>${message.value}</p>
  // <div style="display:flex; flex-wrap:wrap;">
  //   <input type="text" placeholder="Input Message" />
  //   <button onclick="updateMessage()">Update Message</button>
  // </div>
  // `)

  const { postMessage } = useWebviewView(
    'jssdk-doc-assistant',
    // html,
    getHtmlForWebview(),
    {
      webviewOptions: {
        enableScripts: true,
        enableCommandUris: true,
      },
      onDidReceiveMessage(ev) {
        if (ev.type === 'updateMessage')
          message.value = ev.message
      },
    },
  )

  return { message, postMessage }
})

function getHtmlForWebview() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webapp</title>
  <script defer src="/webapp/static/js/lib-vue.2f9000e5.js"></script><script defer src="/webapp/static/js/index.3a6ae001.js"></script><link href="/webapp/static/css/index.677e40e0.css" rel="stylesheet"></head>
  <body>
    <div id="app"></div>
  </body>
</html>

`
}

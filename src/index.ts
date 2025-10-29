import vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const provider = new JssdkViewProvider(context.extensionUri)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(JssdkViewProvider.viewType, provider),
  )
}

class JssdkViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'jssdk-doc-assistant'

  private _view?: vscode.WebviewView

  constructor(
    private readonly _extensionUri: vscode.Uri,
  ) {}

  public resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken): Thenable<void> | void {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      enableCommandUris: true,
      localResourceRoots: [
        this._extensionUri,
      ],
    }

    vscode.window.showInformationMessage('resolveWebviewView')
    const html = this._getHtmlForWebview(webviewView.webview!)
    vscode.window.showInformationMessage(html)
    webviewView.webview.html = html

    webviewView.webview.onDidReceiveMessage((ev) => {
      console.error(ev)
    })
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri1 = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', 'webapp/static/js/lib-vue.2f9000e5.js'))
    const scriptUri2 = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', 'webapp/static/js/index.3a6ae001.js'))
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', 'webapp/static/css/index.677e40e0.css'))

    const nonce = getNonce()

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script defer nonce="${nonce}" src=${scriptUri1}></script>
        <script defer nonce="${nonce}" src=${scriptUri2}></script>
        <link href=${styleUri} rel="stylesheet">

				<title>jssdk-vscode</title>
			</head>
			<body>
        <div id="app"></div>
      </body>
			</html>`
  }
}

function getNonce() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// import { defineExtension } from 'reactive-vscode'
// import { useDemoWebviewView } from './webviews/content'

// const { activate, deactivate } = defineExtension(() => {
//   useDemoWebviewView()
// })

// export { activate, deactivate }

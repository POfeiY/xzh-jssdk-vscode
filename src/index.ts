import fs from 'node:fs/promises'
import path from 'node:path'
import vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const provider = new JssdkViewProvider(context.extensionUri, context.extensionPath)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(JssdkViewProvider.viewType, provider),
  )
}

class JssdkViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'jssdk-doc-assistant'

  private _view?: vscode.WebviewView
  private extensionPath: string

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _extensionPath: string,
  ) {
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

    webviewView.webview.html = await this._getHtmlForWebview(_context, webviewView.webview!)

    webviewView.webview.onDidReceiveMessage((ev) => {
      console.error(ev)
    })
  }

  private async _getHtmlForWebview(ctx: vscode.WebviewViewResolveContext, webview: vscode.Webview) {
    const appDistPath = path.join(this.extensionPath, '/dist/webapp')
    const indexPath = path.join(appDistPath, 'index.html')
    let indexHtml = await fs.readFile(indexPath, { encoding: 'utf8' })

    const matchLinks = /(href|src)="([^"]*)"/g
    const toUri = (_: string, prefix: 'href' | 'src', link: string) => {
      if (link === '#') {
        return `${prefix}="${link}"`
      }
      const _path = path.join(appDistPath, link)
      const uri = vscode.Uri.file(_path)
      return `${prefix}="${webview.asWebviewUri(uri)}"`
    }
    indexHtml = indexHtml.replace(matchLinks, toUri)
    return indexHtml
  }
}

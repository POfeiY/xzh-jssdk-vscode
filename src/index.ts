import { defineExtension } from 'reactive-vscode'
import { window } from 'vscode'
import { useDemoWebviewView } from './webviews/content'

const { activate, deactivate } = defineExtension(() => {
  window.showInformationMessage('Hello')
  useDemoWebviewView()
})

export { activate, deactivate }

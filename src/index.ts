import { defineExtension } from 'reactive-vscode'
import { useDemoWebviewView } from './webviews/content'

const { activate, deactivate } = defineExtension(() => {
  useDemoWebviewView()
})

export { activate, deactivate }

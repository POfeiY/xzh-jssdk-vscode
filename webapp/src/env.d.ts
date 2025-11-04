/// <reference types="@rsbuild/core/types">

interface Window {
  // wvscode webview api
  acquireVsCodeApi: () => any
  EventCenter: Map<string, (params: any) => void> | null
}

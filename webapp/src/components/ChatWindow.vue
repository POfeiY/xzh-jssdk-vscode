<script setup lang="ts">
import MessageList from './MessageList'
</script>

<template>
  <div class="chat-window">
    <section class="chat-window-header">
      <p>
        JSSDK AI Assistant
      </p>
    </section>
    <section class="chat-window-body">
      <MessageList />
    </section>
    <InputBox />
  </div>
</template>

<style scoped lang="less">
.chat-window {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  .chat-window-body {
    height: calc(100% - 48px);
    overflow-y: hidden;
  }
  .chat-window-header {
    padding: 0 1em;
    height: 48px;
    text-align: left;
    line-height: 48px;
    border-bottom: 1px solid grey;
    font-weight: bolder;
  }
}
</style>

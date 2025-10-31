<script setup lang="ts">
import ChatWindow from './components/ChatWindow.vue'
import SplashScreen from './components/SplashScreen.vue'
</script>

<template>
  <!-- <SplashScreen /> -->
  <n-message-provider>
    <ChatWindow />
  </n-message-provider>
</template>

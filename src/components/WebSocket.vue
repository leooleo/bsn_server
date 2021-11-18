<template>
  <div>
    <h1 v-if="isConnected">We're connected to the server!</h1>
    <h3>Message from server: "{{socketMessage}}"</h3>
    <button @click="pingServer()">Ping Server</button>
  </div>
</template>

<script src="./WebSocket.js"></script>
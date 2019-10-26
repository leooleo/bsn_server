<template>
  <div>
    <h1 v-if="isConnected">We're connected to the server!</h1>
    <h3>Message from server: "{{socketMessage}}"</h3>
    <button @click="pingServer()">Ping Server</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: ""
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    }
  },

  created() {
    this.sockets.subscribe("pingChannel", data => this.handleMessage(data));
  },

  methods: {
    pingServer() {
      this.$socket.emit("pingChannel", "ping");
    },
    handleMessage(data) {
      this.socketMessage = data;
      /* eslint-disable no-console */
      console.log("Handled data: " + data);
    }
  }
};
</script>
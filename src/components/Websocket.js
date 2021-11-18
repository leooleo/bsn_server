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
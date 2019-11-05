<template>
  <div>
    Bsn is currently active: {{this.isBsnActive}}
    <br />
    <b-button @click="start()" variant="success">Start</b-button>
    <br />
    <b-button @click="stop()" variant="danger">Stop</b-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBsnActive: false
    };
  },
  created() {    
    /* eslint-disable no-console */

    this.axios.get("http://localhost:8081/isBsnActive").then(response => {
      this.isBsnActive = response.data;
    });
  },
  methods: {
    start() {
      this.axios.get("http://localhost:8081/startBsn").then(response => {
        alert(response.data);
      });
    },
    stop() {
      this.axios.get("http://localhost:8081/stopBsn").then(response => {
        alert(response.data);
      });
    }
  }
};
</script>
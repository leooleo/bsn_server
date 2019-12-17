<template>
  <div>
    <div id="simple_header" style="margin-top:30px">Remote execution</div>
    <div v-if="bsnStatus == 'load'" id="description">
      Loading Bsn data...
      <b-spinner style="margin-left:15px;" variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else-if="bsnStatus == 'alive'" id="description">
      <div v-if="isBsnActive">
        <p>
          Bsn is currently active.Would tou like to monitor or stop it?
          <b-button id="buttons" @click="start()" variant="success">Start</b-button>
          <b-button id="buttons" @click="monitor()" variant="primary">monitor</b-button>
          <b-button id="buttons" @click="stop()" variant="danger">Stop</b-button>
        </p>
      </div>
      <div v-else>
        <p>
          Bsn is currently inactive. Would you like to start it?
          <b-button id="buttons" @click="start()" variant="success">Start</b-button>
        </p>
      </div>
    </div>
    <div v-else-if="bsnStatus == 'starting'" id="description">
      Starting bsn. This may take a few seconds. Please wait.
      <b-spinner style="margin-left:15px;" variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else-if="bsnStatus == 'dead'" id="description">
      Unfortunately Bsn could not be reached.
      Try again in a few minutes or contact one of the devs if this problem persists.
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBsnActive: false,
      bsnStatus: "load"
    };
  },
  created() {
    /* eslint-disable no-console */

    this.axios
      .get("http://164.41.75.167:8080/isActive")
      .then(response => {
        this.isBsnActive = response.data;
        this.bsnStatus = "alive";
      })
      .catch(error => {
        console.log(error);
        this.bsnStatus = "dead";
      });
  },
  methods: {
    start() {
      this.bsnStatus = "starting";
      this.axios.get("http://164.41.75.167:8080/start").then(response => {
        if (response.data == "started") {
          this.isBsnActive = true;
          this.bsnStatus = "alive";
        }
      });
    },
    stop() {
      this.axios.get("http://164.41.75.167:8080/stop").then(response => {
        if (response.data == "stopped") {
          this.isBsnActive = false;
        }
      });
    },
    monitor() {
      document.location.href = "#/monitor";
    }
  }
};
</script>

<style scoped>
#simple_header {
  text-align: center;
  border-bottom: 6px solid #478dff;
  width: 50%;
  margin-left: 25%;
  font-weight: 800;
  font-size: 270%;
}
#description {
  margin-left: 100px;
  width: 70%;
  font-size: 120%;
  color: #515151;
  margin-top: 80px;
  margin-bottom: 80px;
}
#buttons {
  margin-left: 15px;
}
</style>

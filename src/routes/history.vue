<template>
  <div>
    <navigationBar isRealTime="false"></navigationBar>
    <div v-if="loading">
      <div class="text-center center">
        <b-spinner class="largeSpin" variant="primary" label="Text Centered"></b-spinner>
        <br>
        <h5 class="mt-3">Loading content. Please wait... </h5>
      </div> 
    </div>

    <div v-else>
      <chart :chartData="this.chartData"></chart>
    </div>
  </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import chart from "../components/viewModels/chart_view_model";

export default {
  components: {
    navigationBar,
    chart
  },
  data() {
    return {
      chartData:  [["Time", "Reliability", "Cost"]],
      session: 1,
      loading: true
    }
  },
  created() {
    var routeSession = this.$route.query.session;    
    if(routeSession != null && routeSession != undefined)
      this.session = routeSession;

    /* eslint-disable no-console */
    this.axios
      .get("https://bsnapi.herokuapp.com/getRelCosData?session=" + this.session)
      .then(response => {
        response = response.data;
        var result = []
        for (var i in response) {
          var obj = response[i];
          var reliability = obj.reliability;
          var cost = obj.cost;
          var date = new Date(obj.timeinserted);
          result.push([date, reliability, cost]);
          this.chartData.push([date, reliability, cost])
        }
        this.loading = false;
      });
  }
};
</script>

<style>
body {
  font-family: Arial Black, Arial Bold, Gadget, sans-serif;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.largeSpin {
  width: 3.5rem; 
  height: 3.5rem;
}

.page_title {
  margin-left: 6rem;
  margin-top: 3rem;
  font-size: 150%;
}
</style>
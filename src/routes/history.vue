<template>
  <div>
    <vue-headful title="System History" description="System reliability and cost" />
    <navigationBar page="history"></navigationBar>
    <div v-if="loading">
      <div class="text-center center">
        <b-spinner class="largeSpin" variant="primary" label="Text Centered"></b-spinner>
        <br />
        <h5 class="mt-3">Loading content. Please wait...</h5>
      </div>
    </div>

    <div v-else>
      <div
        id="description"
        style="margin-bottom: 0px !important;margin-top: 15px !important;"
      >This page will automatically reload in {{timeToReload}} seconds.</div>
    </div>
    <div
      v-if="this.reliChartData.length == 1"
      id="description"
    >There is no content to fetch in the last 30 minutes.</div>
    <div v-else>
      <reliChart :chartData="this.reliChartData"></reliChart>
      <costChart :chartData="this.costChartData"></costChart>
    </div>

  </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import reliChart from "../components/viewModels/reli_chart_view_model";
import costChart from "../components/viewModels/cost_chart_view_model";

export default {
  components: {
    navigationBar,
    reliChart,
    costChart
  },
  data() {
    return {
      reliChartData: [["Time", "Reliability"]],
      costChartData: [["Time", "Cost"]],
      session: 1,
      loading: true,
      reloadEverySeconds: 30,
      timeToReload: 30
    };
  },
  created() {
    var routeSession = this.$route.query.session;
    this.interval = setInterval(() => this.updateReloadTime(), 1000);
    if (routeSession != null && routeSession != undefined) {
      this.session = routeSession;
    }
    this.fetchHistoryData();
  },
  methods: {
    formatDate(date) {
      return (
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      );
    },
    updateReloadTime() {
      this.timeToReload -= 1;
      if (this.timeToReload == 0) {
        this.fetchHistoryData();
        this.timeToReload = this.reloadEverySeconds;
        this.reliChartData = [["Time", "Reliability"]];
        this.costChartData = [["Time", "Cost"]];
      }
    },
    fetchHistoryData() {
      /* eslint-disable no-console */
      this.axios
        .get(
          "https://bsnapi.herokuapp.com/getRelCosData?session=" + this.session
        )
        .then(response => {
          response = response.data;
          var result = [];
          for (var i in response) {
            var obj = response[i];
            var reliability = obj.reliability;
            var cost = obj.cost;
            var date = this.formatDate(new Date(obj.timeinserted));
            result.push([date, reliability, cost]);
            this.reliChartData.push([date, reliability]);
            this.costChartData.push([date, cost]);
          }
          // console.log(this.chartData);
          this.loading = false;
        });
    }
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
#description {
  margin-left: 100px;
  width: 70%;
  font-size: 120%;
  color: #515151;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
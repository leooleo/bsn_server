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
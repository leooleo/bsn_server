<template>
  <GChart type="LineChart" :data="chartData" :options="chartOptions" class="chart"/>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  components: {
    GChart
  },
  data() {
    return {      
      chartData: [
        ["Time", "Reliability", "Cost"],
        [new Date(2000, 8, 5, 0, 30, 0), 100, 100],
        [new Date(2000, 8, 5, 0, 33, 0), 90, 80],
        [new Date(2000, 8, 5, 0, 34, 0), 84, 56],
        [new Date(2000, 8, 5, 0, 38, 0), 95, 80]
      ],
      chartOptions: {
        curveType: "function",
        hAxis: {
          title: 'TimeStamp'
        },
        vAxis: {
          title: 'Percentage'
        },
      }
    };
  }
};
</script>
<style scoped>
.chart {    
    width: 100rem !important; 
    height: 50rem !important;
}
</style>
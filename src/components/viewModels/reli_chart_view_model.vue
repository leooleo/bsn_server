<template>
  <GChart type="LineChart" :data="chartData" :options="chartOptions" class="chart"/>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  components: {
    GChart
  },
  props :{
    chartData : Array
  },
  data() {
    return { 
      chartOptions: {
        curveType: "function",
        hAxis: {
          title: 'TimeStamp (hh:mm:ss)'
        },
        vAxis: {
          title: 'Level (%)',
          viewWindowMode:'explicit',
          viewWindow:{
            max:100,
            min:0
          }
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

<template>
  <div>
    <cardTemplate
      :sensorEvalData="sensorEvalData"
      :sensorBattery="sensorBattery"
      :sensorName="sensorName"
      :sensorRawData="sensorRawData"
    ></cardTemplate>
    <button v-on:click="changeVal">Click</button>
  </div>
</template>

<script>
import cardTemplate from "../views/card";
const sensorUnit = "Cº";

export default {
  components: {
    cardTemplate
  },
  data: function() {
    return {
      sensorEvalData: 40,
      sensorBattery: 50,
      sensorName: "Thermometer",
      sensorRawData: "36.5" + ' ' + sensorUnit
    };
  },
  methods: {
    changeVal: function() {
      this.sensorEvalData += 10;
      this.sensorBattery += 10;
    }
  }
};
</script>

<style scoped>
</style>
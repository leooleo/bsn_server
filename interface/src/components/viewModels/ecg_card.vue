<template>
  <div>
    <cardTemplate
      :sensorEvalData="sensorEvalData"
      :sensorBattery="sensorBattery"
      :sensorName="sensorName"
      :sensorRawData="sensorRawData"
    ></cardTemplate>
  </div>
</template>

<script>
import cardTemplate from "../views/card";
const sensorUnit = "bpm";

export default {
  components: {
    cardTemplate
  },
  data: function() {
    return {
      sensorEvalData: 40,
      sensorBattery: 50,
      sensorName: "ECG",
      sensorRawData: "200" + ' ' + sensorUnit
    };
  },
};
</script>
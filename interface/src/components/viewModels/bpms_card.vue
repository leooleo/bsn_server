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
const sensorUnit = "mmhg";

export default {
  components: {
    cardTemplate
  },
  data: function() {
    return {
      sensorEvalData: 40,
      sensorBattery: 50,
      sensorName: "Bpms",
      sensorRawData: "120" + ' ' + sensorUnit
    };
  },
};
</script>
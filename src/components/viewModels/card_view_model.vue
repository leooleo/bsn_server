<template>
  <div>
    <cardTemplate
      :sensorEvalData="this.packet.risk"
      :sensorBattery="this.packet.battery"
      :sensorName="this.sensorName"
      :sensorRawData="this.packet.raw + this.sensorUnit"
    ></cardTemplate>
  </div>
</template>

<script>
import cardTemplate from "../views/card";

export default {
  components: {
    cardTemplate
  },
  props: {
    packet: Object,
    sensorName: String,
    sensorUnit: String
  }
};
</script>
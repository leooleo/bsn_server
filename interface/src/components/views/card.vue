<template>
  <b-card class="card text-center cardShadow" border-variant="primary">
    <b-card-title>{{this.sensorName}}</b-card-title>
    <b-card-body class="text-primary text-center cardBody">{{sensorRawData}}</b-card-body>
    <b-card-footer style="width: 20rem !important; margin-left:-20px !important;">
      <small class="text-muted cardFooterText" style="font-size: 1rem;">Sensor risk status</small>
      <b-progress :value="Number(this.sensorEvalData)" striped></b-progress>
    </b-card-footer>
    <b-card-footer
      class="cardFooter"
      style="width: 20rem !important; margin-left:-20px !important;"
    >
      <small class="text-muted cardFooterText">Sensor battery status</small>
      <b-progress :value="Number(this.sensorBattery)" striped></b-progress>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  props: ['sensorEvalData', 'sensorBattery', 'sensorName', 'sensorRawData']
};
</script>

<style scoped>
.card {
  margin-top: 1.75rem;
  width: 20rem !important;
  border-radius: 15px !important;
  margin-right: 1rem;
}

.cardBody {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-size: 1.75rem;
}

.cardFooterText {
  text-align: left !important;
  font-size: 1rem;
}
.cardShadow {
  box-shadow: 0px 5px 5px #888888;
}
</style>
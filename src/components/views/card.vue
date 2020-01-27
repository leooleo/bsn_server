<template>
  <b-card class="card text-center cardShadow" border-variant="primary">
    <h5>{{this.sensorName}}</h5>    
    <b-card-body class="text-primary text-center cardBody">{{sensorRawData}}</b-card-body>
    <b-card-footer style="width: 15rem !important; margin-left:-20px !important;">
      <small class="text-muted cardFooterText" style="font-size: 1rem;">Sensor risk status</small>
      <b-progress striped>
        <b-progress-bar :value="Number(this.sensorEvalData)" variant="danger"></b-progress-bar>
      </b-progress>
    </b-card-footer>
    <b-card-footer
      class="cardFooter"
      style="width: 15rem !important; margin-left:-20px !important;"
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
  width: 15rem !important;
  border-radius: 15px !important;
  margin-right: 1rem;
}

h5 {
  font-size: 120%;
}

.cardBody {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-size: 130%;
}

.cardFooterText {
  text-align: left !important;
  font-size: 1rem;
}
.cardShadow {
  box-shadow: 0px 5px 5px #888888;
}
</style>
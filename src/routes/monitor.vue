<template>
  <div id="my-monitor">
    <vue-headful title="Monitor" description="Monitor vital signs" />
    <navigationBar page="realTime"></navigationBar>

    <h5 class="page_title">Sensors data (session {{this.session}})</h5>
    <b-card-group deck style="margin-left: 5rem;">
      <cardVM :packet="this.thermometerPacket" sensorName="Thermometer" sensorUnit=" ºC"></cardVM>
      <cardVM :packet="this.ecgPacket" sensorName="ECG" sensorUnit=" bpm"></cardVM>
      <cardVM :packet="this.oximeterPacket" sensorName="Oximeter" sensorUnit="%"></cardVM>
      <cardVM :packet="this.abpsPacket" sensorName="Abps" sensorUnit=" mmHg"></cardVM>
      <cardVM :packet="this.abpdPacket" sensorName="Abpd" sensorUnit=" mmHg"></cardVM>

    </b-card-group>

    <h5 class="page_title">Patient Risk</h5>
    <b-container style="margin-left: 5rem;">
      <b-row>
        <patientRiskCard :packet="patientPacket"></patientRiskCard>
        <covidRiskCard :packet="patientCovidPacket"></covidRiskCard>
      </b-row>
    </b-container>
  </div>
</template>

<script src="./monitor.js"></script>

<style>
body {
  font-family: Arial Black, Arial Bold, Gadget, sans-serif;
}
.page_title {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 130%;
}
</style>
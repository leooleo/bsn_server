<template>
  <div id="my-monitor">
    <navigationBar isRealTime="true"></navigationBar>

    <h5 class="page_title">Sensors data</h5>
    <b-card-group deck style="margin-left: 5rem;">
      <thermometerCard></thermometerCard>
      <ecgCard></ecgCard>
      <oximeterCard></oximeterCard>
      <bpmsCard></bpmsCard>
      <bpmdCard></bpmdCard>
    </b-card-group>

    <h5 class="page_title">System variables and patient risk status</h5>
    <b-container style="margin-left: 5rem;">
      <b-row>
        <reliabilityCard></reliabilityCard>
        <batteryCard></batteryCard>
        <patientRiskCard></patientRiskCard>
      </b-row>      
    </b-container>
  </div>
</template>

<script>
import ecgCard from "../components/viewModels/ecg_card";
import bpmsCard from "../components/viewModels/bpms_card";
import bpmdCard from "../components/viewModels/bpmd_card";
import navigationBar from "../components/views/navigation_bar";
import batteryCard from "../components/viewModels/battery_card";
import oximeterCard from "../components/viewModels/oximeter_card";
import thermometerCard from "../components/viewModels/thermometer_card";
import reliabilityCard from "../components/viewModels/reliability_card";
import patientRiskCard from "../components/viewModels/patient_risk_card";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    thermometerCard,
    ecgCard,
    oximeterCard,
    bpmsCard,
    bpmdCard,
    reliabilityCard,
    batteryCard,
    patientRiskCard
  }
};
</script>

<style>
body {
  font-family: Arial Black, Arial Bold, Gadget, sans-serif;
}
.page_title {
  margin-left: 6rem;
  margin-top: 3rem;
  font-size: 150%;
}
</style>
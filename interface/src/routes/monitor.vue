<template>
  <div id="my-monitor">
    <navigationBar isRealTime="true"></navigationBar>

    <h5 class="page_title">Sensors data</h5>
    <b-card-group deck style="margin-left: 5rem;">
      <cardVM :packet="this.thermometerPacket" sensorName="Thermometer" sensorUnit=" Cº"></cardVM>
      <cardVM :packet="this.ecgPacket" sensorName="ECG" sensorUnit=" bpm"></cardVM>
      <cardVM :packet="this.oximeterPacket" sensorName="Oximeter" sensorUnit="%"></cardVM>
      <cardVM :packet="this.bpmsPacket" sensorName="Bpms" sensorUnit=" mmHg"></cardVM>
      <cardVM :packet="this.bpmdPacket" sensorName="Bpmd" sensorUnit=" mmHg"></cardVM>
    </b-card-group>

    <h5 class="page_title">System variables and patient risk status</h5>
    <b-container style="margin-left: 5rem;">
      <b-row>
        <smallCardVm title="Reliability" subtitle="System reliability" :data="systemReliability"></smallCardVm>
        <smallCardVm title="Battery cost" subtitle="system battery cost" :data="systemCost"></smallCardVm>
        <patientRiskCard :packet="patientPacket"></patientRiskCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import cardVM from "../components/viewModels/card_view_model";
import smallCardVm from "../components/viewModels/small_card_view_model";
import patientRiskCard from "../components/viewModels/patient_risk_card";
import VitalPacket from "../components/models/packet";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    cardVM,
    smallCardVm,
    patientRiskCard
  },
  data: function() {
    return {
      thermometerPacket: new VitalPacket(),
      oximeterPacket: new VitalPacket(),
      bpmsPacket: new VitalPacket(),
      bpmdPacket: new VitalPacket(),
      ecgPacket: new VitalPacket(),
      systemCost: "0",
      systemReliability: "0",
      patientPacket: { data: "0", alert: false },
      isConnected: false
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    thermometerChannel(data) {
      this.thermometerPacket = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    ecgChannel(data) {
      this.ecgPacket = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    oximeterChannel(data) {
      this.oximeterPacket = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    bpmsChannel(data) {
      this.bpmsPacket = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    bpmdChannel(data) {
      this.bpmdPacket = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    patientChannel(data) {
      data.data = Number(data.data).toFixed(1);
      this.patientPacket = data;
    },
    reliabilityChannel(data) {
      this.systemReliability = data;
    },
    costChannel(data) {
      this.systemCost = data;
    }
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
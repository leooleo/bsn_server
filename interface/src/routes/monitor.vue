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
        <smallCardVm title="Reliability" subtitle="System reliability" data="50"></smallCardVm>
        <smallCardVm title="Battery cost" subtitle="system battery cost" data="50"></smallCardVm>
        <patientRiskCard></patientRiskCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import cardVM from "../components/viewModels/card_view_model";
import smallCardVm from "../components/viewModels/small_card_view_model";
import patientRiskCard from "../components/viewModels/patient_risk_card";
import Packet from "../components/models/packet";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    cardVM,
    smallCardVm,
    patientRiskCard,
  },
  data: function() {
    return {
      thermometerPacket: new Packet(),
      oximeterPacket: new Packet(),
      bpmsPacket: new Packet(),
      bpmdPacket: new Packet(),
      ecgPacket: new Packet(),
      isConnected: false,
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
      var obj = JSON.parse(data);
      this.thermometerPacket = new Packet(obj.battery, obj.risk, obj.raw);
    },
    ecgChannel(data) {
      var obj = JSON.parse(data);
      this.ecgPacket = new Packet(obj.battery, obj.risk, obj.raw);
    },
    oximeterChannel(data) {
      var obj = JSON.parse(data);
      this.oximeterPacket = new Packet(obj.battery, obj.risk, obj.raw);
    },
    bpmsChannel(data) {
      var obj = JSON.parse(data);
      this.bpmsPacket = new Packet(obj.battery, obj.risk, obj.raw);
    },
    bpmdChannel(data) {
      var obj = JSON.parse(data);
      this.bpmdPacket = new Packet(obj.battery, obj.risk, obj.raw);
    }
  },
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
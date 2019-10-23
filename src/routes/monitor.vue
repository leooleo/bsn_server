<template>
  <div id="my-monitor">
    <navigationBar isRealTime="true"></navigationBar>

    <h5 class="page_title">Sensors data (session {{this.session}})</h5>
    <b-card-group deck style="margin-left: 5rem;">
      <cardVM :packet="this.thermometerPacket" sensorName="Thermometer" sensorUnit=" Cº"></cardVM>
      <cardVM :packet="this.ecgPacket" sensorName="ECG" sensorUnit=" bpm"></cardVM>
      <cardVM :packet="this.oximeterPacket" sensorName="Oximeter" sensorUnit="%"></cardVM>
      <cardVM :packet="this.bpmsPacket" sensorName="Bpms" sensorUnit=" mmHg"></cardVM>
      <cardVM :packet="this.bpmdPacket" sensorName="Bpmd" sensorUnit=" mmHg"></cardVM>
    </b-card-group>

    <h5 class="page_title">Patient Risk</h5>
    <b-container style="margin-left: 5rem;">
      <b-row>
        <patientRiskCard :packet="patientPacket"></patientRiskCard>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import patientRiskCard from "../components/viewModels/patient_risk_card";
import navigationBar from "../components/views/navigation_bar";
import cardVM from "../components/viewModels/card_view_model";
import VitalPacket from "../components/models/packet";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    cardVM,
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
      isConnected: false,
      session: 1
    };
  },
  sockets: {
    connect() {
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },
    reliabilityChannel(data) {
      this.systemReliability = data;
    },
    costChannel(data) {
      this.systemCost = data;
    }
  },
  methods: {
    handleSensorPacket(data, sensor) {
      this[sensor + "Packet"] = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
    },
    handlePatientPacket(data) {
      data.data = Number(data.data).toFixed(1);
      this.patientPacket = data;
    }
  },
  created() {
    /* eslint-disable no-console */
    var routeSession = this.$route.query.session;    
    if(routeSession != null && routeSession != undefined)
      this.session = routeSession;

    this.sockets.subscribe("thermometerChannel=" + this.session, data =>
      this.handleSensorPacket(data, "thermometer")
    );
    this.sockets.subscribe("ecgChannel=" + this.session, data =>
      this.handleSensorPacket(data, "ecg")
    );
    this.sockets.subscribe("bpmsChannel=" + this.session, data =>
      this.handleSensorPacket(data, "bpms")
    );
    this.sockets.subscribe("bpmdChannel=" + this.session, data =>
      this.handleSensorPacket(data, "bpmd")
    );
    this.sockets.subscribe("oximeterChannel=" + this.session, data =>
      this.handleSensorPacket(data, "oximeter")
    );
    this.sockets.subscribe("patientChannel=" + this.session, data =>
      this.handlePatientPacket(data)
    );
  }
};
</script>

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
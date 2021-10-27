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

<script>
import patientRiskCard from "../components/viewModels/patient_risk_card";
import navigationBar from "../components/views/navigation_bar";
import cardVM from "../components/viewModels/card_view_model";
import VitalPacket from "../components/models/packet";
import covidRiskCard from "../components/viewModels/covid_risk_card";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    cardVM,
    patientRiskCard,
    covidRiskCard
  },
  data: function() {
    return {
      thermometerPacket: new VitalPacket(),
      oximeterPacket: new VitalPacket(),
      abpsPacket: new VitalPacket(),
      abpdPacket: new VitalPacket(),
      ecgPacket: new VitalPacket(),
      systemCost: "0",
      systemReliability: "0",
      patientPacket: { data: "0", alert: false },
      patientCovidPacket: { data: "0", alert: false },
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
      if(data == null || data == undefined) {
        console.log('Null data coming from sensor ' + sensor)
        return;
      }       
      this[sensor + "Packet"] = new VitalPacket(
        data.battery,
        data.risk,
        Number(data.raw).toFixed(1)
      );
      
    },
    handlePatientPacket(data) {
      data = Number(data).toFixed(1);
      this.patientPacket = { data: data, alert: data > 60 };
    },

    handleCovidPacket(oxg, temp) {
      temp = Number(temp).toFixed(1);
      oxg = Number(oxg).toFixed(1);
      this.patientCovidPacket = { alert: ((oxg < 91) && (temp > 37.8)) };
    }
  },
  created() {
    /* eslint-disable no-console */
    var routeSession = this.$route.query.session;
    if (routeSession != null && routeSession != undefined)
      this.session = routeSession;

    this.sockets.subscribe("thermometerChannel=" + this.session, data =>
      this.handleSensorPacket(data, "thermometer")
    );
    this.sockets.subscribe("ecgChannel=" + this.session, data =>
      this.handleSensorPacket(data, "ecg")
    );
    this.sockets.subscribe("ABPSChannel=" + this.session, data =>
      this.handleSensorPacket(data, "abps")
    );
    this.sockets.subscribe("ABPDChannel=" + this.session, data =>
      this.handleSensorPacket(data, "abpd")
    );
    this.sockets.subscribe("oximeterChannel=" + this.session, data =>
      this.handleSensorPacket(data, "oximeter")
    );
    this.sockets.subscribe("patientChannel=" + this.session, data =>
      this.handlePatientPacket(data)
    );
    this.handleCovidPacket(this.oximeterPacket.raw, this.thermometerPacket.raw);
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
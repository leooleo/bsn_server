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
      patientCovidPacket: {alert: true, oxg: 0, temp: 0},
      oxg: {data: "0"},
      temp: {data: "0"},
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
      if( sensor == "oximeter") {
        this.handleCovidOxg(data.raw)
      }
      else if( sensor == "thermometer") {
        this.handleCovidTemp(data.raw)
      }
    },
    handlePatientPacket(data) {
      data = Number(data).toFixed(1);
      this.patientPacket = { data: data, alert: data > 60 };
    },

    handleCovidOxg(oxg) {
      oxg = Number(oxg).toFixed(1);
      this.oxg = { data: oxg }
      this.patientCovidPacket = { alert: ((this.oxg.data < 91) && (this.temp.data > 37.8)) };
      //console.log(this.temp.data)
    },

    handleCovidTemp(temp) {
      temp = Number(temp).toFixed(1);
      this.temp = { data: temp}
      this.patientCovidPacket = { alert: ((this.oxg.data < 91) && (this.temp.data > 37.8)) };
      //console.log(this.oxg.data)
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
  }
};
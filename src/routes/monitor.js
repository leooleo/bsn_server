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
        abpsPacket: new VitalPacket(),
        abpdPacket: new VitalPacket(),
        ecgPacket: new VitalPacket(),
        glucosemeterPacket: new VitalPacket(),
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
      this.sockets.subscribe("glucosemeterChannel=" + this.session, data =>
        this.handleSensorPacket(data, "glucosemeter")
      );
      this.sockets.subscribe("patientChannel=" + this.session, data =>
        this.handlePatientPacket(data)
      );
    }
  };
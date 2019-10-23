<template>
  <riskCard title="Patient Risk" :data="packet.data" :alert="Boolean(packet.alert)"></riskCard>
</template>

<script>
import riskCard from "../views/risk_card";
export default {
  components: {
    riskCard
  },
  props : {
    packet: Object
  }
};
</script>
<template>
  <covidRiskCard title="Covid Risk" :alert="Boolean(packet.alert)"></covidRiskCard>
</template>

<script>
import covidRiskCard from "../views/covid_card";
export default {
  components: {
    covidRiskCard
  },
  props : {
    packet: Object
  }
};
</script>
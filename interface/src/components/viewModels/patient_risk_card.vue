<template>
  <smallCard title="Patient Risk" data="0" :isAlert="Boolean(false)"></smallCard>
</template>

<script>
import smallCard from "../views/risk_card";
export default {
  components: {
    smallCard
  }
};
</script>
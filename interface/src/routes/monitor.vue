<template>
  <div id="my-monitor">
    <navigationBar isRealTime="true"></navigationBar>     

    <h5 class="page_title">Sensors data</h5>
    <!-- <b-card-group deck> -->
      <thermometerCard></thermometerCard>
    <!-- </b-card-group> -->
  </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import thermometerCard from "../components/viewModels/thermometer_card";

export default {
  name: "my-monitor",
  components: {
    navigationBar,
    thermometerCard
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
}
</style>
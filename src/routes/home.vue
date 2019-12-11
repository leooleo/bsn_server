<template>
  <div>
    <navigationBar page="home"></navigationBar>    
    <bsnInterface></bsnInterface>
    <homeDescription></homeDescription>
  </div>
</template>
<script>
import navigationBar from "../components/views/navigation_bar";
import homeDescription from "../components/views/home_description";
import bsnInterface from "../components/views/bsn_interface";

export default {
  components: {
    navigationBar,
    homeDescription,
    bsnInterface
  }
};
</script>
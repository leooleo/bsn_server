<template>
  <div>
    <navigationBar page="home"></navigationBar>    
    <homeDescription></homeDescription>
  </div>
</template>
<script>
import navigationBar from "../components/views/navigation_bar";
import homeDescription from "../components/views/home_description";

export default {
  components: {
    navigationBar,
    homeDescription
  }
};
</script>
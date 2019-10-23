<template>
    <div>
        <navigationBar isRealTime="false"></navigationBar>        
        <chart></chart>
    </div>
</template>

<script>
import navigationBar from "../components/views/navigation_bar";
import chart from "../components/viewModels/chart_view_model";

export default {
    components: {
        navigationBar,
        chart
    }
    
}
</script>

<style>
body {
  font-family: Arial Black, Arial Bold, Gadget, sans-serif;
}
.page_title {
  margin-left: 6rem;
  margin-top: 3rem;
  font-size: 150%;
}
</style>
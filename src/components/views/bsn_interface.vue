<template>
  <div>
    <div id="simple_header" style="margin-top:30px">Remote execution</div>
    <div v-if="bsnStatus == 'load'" id="interface_description">
      Loading data from the BSN...
      <b-spinner style="margin-left:15px;" variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else-if="bsnStatus == 'alive'" id="interface_description">
      <div v-if="isBsnActive">
          The BSN is currently active. Would you like to monitor or stop it? <br /> <br />         
          <b-button id="buttons" @click="monitor()" variant="primary">Monitor</b-button>
          <b-button id="buttons" @click="stop()" variant="danger">Stop</b-button><br /> <br />
          <div style="font-size: 70%;">Obs.: it might take a while to get observable adaptations,
           we have carefully prepared an overview of the BSN while you wait for it (;</div>
      </div>
      <div v-else>
          The BSN is currently inactive. Would you like to start it? <br /> <br /> 
          <b-button id="buttons" @click="start()" variant="success">Start</b-button>
      </div>
    </div>
    <div v-else-if="bsnStatus == 'starting'" id="interface_description">
      Starting the BSN. This may take a few seconds. Please wait.
      <b-spinner style="margin-left:15px;" variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else-if="bsnStatus == 'dead'" id="interface_description">
      Unfortunately the BSN could not be reached.
      Try again in a few minutes or contact one of the devs if this problem persists.
    </div>
  </div>
</template>
<script src="./bsn_interface"></script>

<style scoped>
#simple_header {
  text-align: center;
  border-bottom: 6px solid #478dff;
  width: 50%;
  margin-left: 25%;
  font-weight: 800;
  font-size: 270%;
}
#interface_description {
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  font-size: 130%;
  color: #515151;

}
#buttons {
  margin-left: 15px;
  width: 180px;
}
</style>

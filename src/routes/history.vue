<template>
  <div>
    <vue-headful title="System History" description="System reliability and cost" />
    <navigationBar page="history"></navigationBar>
    <div v-if="loading">
      <div class="text-center center">
        <b-spinner class="largeSpin" variant="primary" label="Text Centered"></b-spinner>
        <br />
        <h5 class="mt-3">Loading content. Please wait...</h5>
      </div>
    </div>

    <div v-else>
      <div
        id="description"
        style="margin-bottom: 0px !important;margin-top: 15px !important;"
      >This page will automatically reload in {{timeToReload}} seconds.</div>
    </div>
    <div
      v-if="this.reliChartData.length == 1"
      id="description"
    >There is no content to fetch in the last 30 minutes.</div>
    <div v-else>
      <reliChart :chartData="this.reliChartData"></reliChart>
      <costChart :chartData="this.costChartData"></costChart>
    </div>

  </div>
</template>

<script src="./history.js"></script>

<style>
body {
  font-family: Arial Black, Arial Bold, Gadget, sans-serif;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.largeSpin {
  width: 3.5rem;
  height: 3.5rem;
}

.page_title {
  margin-left: 6rem;
  margin-top: 3rem;
  font-size: 150%;
}
#description {
  margin-left: 100px;
  width: 70%;
  font-size: 120%;
  color: #515151;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
}
</style>
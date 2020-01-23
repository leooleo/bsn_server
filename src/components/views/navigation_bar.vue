<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand href="#/">
        <h4 style="margin-right: 4rem;">Body Sensor Network</h4>
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/monitor" id="nav_el" :active="realTime">Real time Monitor</b-nav-item>
          <b-nav-item href="#/history" id="nav_el" :active="history">BSN History Monitor</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ['page'],

  data() {
    return {
      realTime: this.page == "realTime",
      history: this.page == "history",
      home: this.page == "home",
    };
  }
};
</script>

<style scoped>
#nav_el {
  font-size: 1.15rem;
  color: white;
}
#nav_brand {
  font-size: 1rem;
  color: white;
}
</style>
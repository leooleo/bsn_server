<template>
  <b-navbar type="dark" variant="primary">
    <b-navbar-brand href="#">
      <h2 style="margin-right: 4rem;">Body Sensor Network</h2>
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" id="nav_el" active>Real time Monitor</b-nav-item>
        <b-nav-item href="#" id="nav_el">Patient History Monitor</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>
#nav_el {
  font-size: 1.5rem;
  color: white;  
}
#nav_brand {
  font-size: 1.5rem;
  color: white;  
}
</style>
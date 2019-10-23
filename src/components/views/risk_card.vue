<template>
  <b-card class="card text-center cardShadow smallCard" border-variant="primary">
    <b-card-title>{{this.title}}</b-card-title>

    <b-card-body style="width: 15rem !important; margin-left:-20px !important;">
      <small class="text-primary cardFooterText" style="font-size: 1.75rem;">{{this.data + '%'}}</small>
    </b-card-body>
    <b-card-footer>
      <alert-icon v-if="this.alert" fillColor="#FF4F4F" :size="Number(50)"></alert-icon>
      <alert-icon v-else fillColor="#b3b1b1" :size="Number(50)"></alert-icon>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  props: { data: String, title: String, alert: Boolean }
};
</script>

<style scoped>
.smallCard {
  margin-top: 1.75rem;
  width: 15rem !important;
  border-radius: 15px !important;
  margin-right: 1rem;
}

.cardFooterText {
  text-align: left !important;
  font-size: 1rem;
}

.cardBody {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
  font-size: 1.75rem;
}
.cardShadow {
  box-shadow: 0px 5px 5px #888888;
}
</style>
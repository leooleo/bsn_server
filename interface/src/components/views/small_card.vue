<template>
  <b-card class="card text-center cardShadow smallCard" border-variant="primary">
    <b-card-title>{{this.title}}</b-card-title>

    <b-card-body style="width: 15rem !important; margin-left:-20px !important;">
      <small class="text-muted cardFooterText" style="font-size: 1rem;">{{this.subtitle}}</small>
      <b-progress :value="Number(this.data)" striped></b-progress>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: ["data", "title", "subtitle"]
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
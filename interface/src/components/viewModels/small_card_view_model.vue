<template>
  <smallCard :title="this.title" :subtitle="this.subtitle" :data="this.data"></smallCard>
</template>

<script>
import smallCard from "../views/small_card";
export default {
  components: {
    smallCard
  },
  props: {
    title: String,
    subtitle: String,
    data: String
  }
};
</script>
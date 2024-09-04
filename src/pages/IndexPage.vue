<template>
  <q-page class="flex flex-center custom-bg">
    <table-companies></table-companies>
  </q-page>
</template>

<script setup>
// import HankoAuth from "src/components/HankoAuth.vue";
import TableCompanies from "src/components/tableCompanies.vue";

defineOptions({
  name: "IndexPage",
});
</script>

<style scoped>
.custom-bg {
  background-color: #ffffff; /* Replace with your preferred color */
}
</style>

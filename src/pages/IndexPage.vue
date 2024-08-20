<template>
  <q-page class="flex flex-center">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
    <table-companies></table-companies>
    <!-- <HankoAuth /> -->
  </q-page>
</template>

<script setup>
// import HankoAuth from "src/components/HankoAuth.vue";
import TableCompanies from "src/components/tableCompanies.vue";

defineOptions({
  name: "IndexPage",
});
</script>

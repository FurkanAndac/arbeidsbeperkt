<template>
  <router-view />
  <cookie-consent />
  <!-- <app /> -->
</template>

<script setup>
import CookieConsent from "src/components/CookieConsent.vue";
import { onMounted } from "vue";

onMounted(async () => {
  // You can also perform other actions with Firebase if needed
  // Example: log a custom event
  // analytics.logEvent('app_loaded');
});

defineOptions({
  name: "App",
});
</script>

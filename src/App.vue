<template>
  <router-view />
  <cookie-consent />
</template>

<script setup>
import CookieConsent from "src/components/CookieConsent.vue";
defineOptions({
  name: "App",
});
</script>

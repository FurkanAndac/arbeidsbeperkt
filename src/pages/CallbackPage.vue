<!-- src/pages/CallbackPage.vue -->
<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { handleRedirectCallback } from "../auth";

export default {
  setup() {
    onMounted(async () => {
      await handleRedirectCallback();
      window.location.replace("/");
    });
  },
};
</script>

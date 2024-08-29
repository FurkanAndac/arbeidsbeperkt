<template>
  <div>Totaal geholpen: {{ count }}</div>
</template>

<script>
import axios from "axios";
// require("dotenv").config();

export default {
  data() {
    return {
      count: 0,
    };
  },
  async created() {
    try {
      // console.log(import.meta.env.VITE_BACKEND_BASE_URL);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/formulieren-count"
      ); // Adjust the URL if necessary
      this.count = response.data;
    } catch (error) {
      console.error("Error fetching form count:", error);
    }
  },
};
</script>

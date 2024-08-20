<template>
  <div>Totaal geholpen: {{ count }}</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      count: 0,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/formulieren-count"
      ); // Adjust the URL if necessary
      this.count = response.data;
    } catch (error) {
      console.error("Error fetching form count:", error);
    }
  },
};
</script>

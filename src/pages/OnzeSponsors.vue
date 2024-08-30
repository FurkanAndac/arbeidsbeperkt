<template>
  <q-page class="sponsors-page">
    <q-page-container>
      <div class="sponsor-section tier-1">
        <h2 class="section-title">Goud Sponsors</h2>
        <div class="sponsor-logos">
          <q-img
            v-for="(sponsor, index) in goldSponsors"
            :key="index"
            :src="sponsor.logo"
            alt="Goud Sponsor Logo"
            class="sponsor-logo tier-1-logo"
            spinner-color="primary"
          />
        </div>
      </div>

      <div class="sponsor-section tier-2">
        <h2 class="section-title">Zilver Sponsors</h2>
        <div class="sponsor-logos">
          <q-img
            v-for="(sponsor, index) in silverSponsors"
            :key="index"
            :src="sponsor.logo"
            alt="Zilver Sponsor Logo"
            class="sponsor-logo tier-2-logo"
            spinner-color="primary"
          />
        </div>
      </div>

      <div class="sponsor-section tier-3">
        <h2 class="section-title">Brons Sponsors</h2>
        <div class="sponsor-logos">
          <q-img
            v-for="(sponsor, index) in bronzeSponsors"
            :key="index"
            :src="sponsor.logo"
            alt="Brons Sponsor Logo"
            class="sponsor-logo tier-3-logo"
            spinner-color="primary"
          />
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// Define sponsors data
const goldSponsors = ref([
  { logo: "src/assets/sponsors/goud/AholdDelhaize.png" },
  // { logo: "/assets/sponsors/goud/sponsor2.svg" },
  // { logo: "/assets/sponsors/goud/sponsor3.svg" },
]);

const silverSponsors = ref([
  // { logo: "src/assets/sponsors/goud/AholdDelhaize.png" },
  // { logo: "/assets/sponsors/zilversponsor2.svg" },
  // { logo: "/assets/sponsors/zilversponsor3.svg" },
]);

const bronzeSponsors = ref([
  // { logo: "src/assets/sponsors/goud/AholdDelhaize.png" },
  // { logo: "/assets/sponsors/bronssponsor2.svg" },
  // { logo: "/assets/sponsors/bronssponsor3.svg" },
]);
</script>

<style scoped>
.sponsors-page {
  padding: 20px;
  background-color: #f9f9f9;
}

.sponsor-section {
  margin-bottom: 50px;
  text-align: center;
}

.section-title {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.sponsor-logos {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.sponsor-logo {
  margin: 10px;
  transition: transform 0.3s ease;
}

.sponsor-logo:hover {
  transform: scale(1.1);
}

.tier-1-logo {
  width: 200px;
  height: auto;
}

.tier-2-logo {
  width: 150px;
  height: auto;
}

.tier-3-logo {
  width: 100px;
  height: auto;
}
</style>

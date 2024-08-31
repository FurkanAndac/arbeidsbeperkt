<template>
  <div v-if="!consentGiven" class="cookie-consent">
    <p>
      We gebruiken cookies om je ervaring te verbeteren en om ons te helpen onze
      site te optimaliseren. Door verder te gaan, accepteer je ons gebruik van
      cookies zoals beschreven in ons
      <router-link :to="{ name: 'GDPRStatement' }">GDPR-beleid</router-link>.
    </p>
    <div class="cookie-consent-buttons">
      <button @click="acceptCookies">Accepteren</button>
      <button @click="declineCookies">Weigeren</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const consentGiven = ref(localStorage.getItem("cookieConsent") === "true");

const acceptCookies = () => {
  localStorage.setItem("cookieConsent", "true");
  consentGiven.value = true;
};

const declineCookies = () => {
  localStorage.setItem("cookieConsent", "false");
  consentGiven.value = true;
};

onMounted(() => {
  if (!localStorage.getItem("cookieConsent")) {
    consentGiven.value = false;
  }
});
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}

.cookie-consent p {
  margin: 0;
  padding: 5px 0;
}

.cookie-consent-buttons {
  margin-top: 10px;
}

.cookie-consent-buttons button {
  margin: 0 10px;
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cookie-consent-buttons button:last-child {
  background-color: #ff0000;
}
</style>

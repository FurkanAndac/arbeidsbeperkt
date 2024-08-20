<template>
  <div class="p-4 max-w-lg mx-auto">
    <form @submit.prevent="handleSubmit">
      <!-- Naam -->
      <div class="mb-4">
        <label for="naam" class="block text-sm font-medium text-gray-700"
          >Naam</label
        >
        <input
          id="naam"
          v-model="formData.naam"
          type="text"
          placeholder="Voer je naam in"
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <!-- Hoogstgenoten Opleiding -->
      <div class="mb-4">
        <label for="opleiding" class="block text-sm font-medium text-gray-700"
          >Hoogstgenoten Opleiding</label
        >
        <select
          id="opleiding"
          v-model="formData.hoogstgenotenOpleiding"
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          <option value="">Selecteer opleiding</option>
          <option
            v-for="opleiding in opleidingenOptions"
            :key="opleiding"
            :value="opleiding"
          >
            {{ opleiding }}
          </option>
        </select>
      </div>

      <!-- Woonplaats -->
      <div class="mb-4">
        <label for="woonplaats" class="block text-sm font-medium text-gray-700"
          >Woonplaats</label
        >
        <input
          id="woonplaats"
          v-model="formData.woonplaats"
          type="text"
          placeholder="Voer je woonplaats in"
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <!-- Bedrijf -->
      <div class="mb-4">
        <label for="bedrijf" class="block text-sm font-medium text-gray-700"
          >Bedrijf waar u (binnenkort) werkt</label
        >
        <input
          id="bedrijf"
          v-model="formData.bedrijf"
          type="text"
          placeholder="Voer het bedrijf in"
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <!-- Geboortedatum -->
      <div class="mb-4">
        <label for="leeftijd" class="block text-sm font-medium text-gray-700"
          >Geboortedatum</label
        >
        <input
          id="leeftijd"
          v-model="formData.leeftijd"
          type="date"
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Verstuur
      </button>
    </form>

    <!-- Alert -->
    <transition name="fade">
      <div
        v-if="showAlert"
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
      >
        Bedankt voor je tijd, verstuurd!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive form data
const formData = ref({
  naam: "",
  hoogstgenotenOpleiding: "",
  woonplaats: "",
  bedrijf: "",
  leeftijd: "",
});

// Alert state
const showAlert = ref(false);

// Options for dropdown
const opleidingenOptions = ["MBO", "HBO", "WO", "Geen"];

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/submit-arbeidsbeperkt-formulier",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.value),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    showAlert.value = true; // Show the alert on success

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);

    console.log("Form submitted successfully:", result);
  } catch (error) {
    console.error("Failed to submit form:", error);
  }
};
</script>

<style scoped>
/* Fade transition for alert */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

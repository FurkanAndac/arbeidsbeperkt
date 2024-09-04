<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="form">
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
          class="input"
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
          class="select"
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
          class="input"
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
          class="input"
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
          class="input"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Verstuur</button>
    </form>

    <!-- Alert -->
    <transition name="fade">
      <div v-if="showAlert" class="alert">Bedankt voor je tijd, verstuurd!</div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../boot/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Reactive form data
const formData = ref({
  naam: "",
  hoogstgenotenOpleiding: "",
  woonplaats: "",
  bedrijf: "",
  leeftijd: "",
});
const user = ref(null);

// Watch for changes in the authentication state
onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

// Alert state
const showAlert = ref(false);

// Options for dropdown
const opleidingenOptions = ["MBO", "HBO", "WO", "Geen"];

// Handle form submission
const handleSubmit = async () => {
  try {
    // Check if the user is logged in
    if (!user.value) {
      console.error("No user is logged in.");
      return; // Optionally, show an error message or redirect to login
    }

    // Combine email address and form data into a single object
    const payload = {
      emailAddress: user.value.email,
      formData: formData.value,
    };

    // Make the API request
    const response = await fetch(
      import.meta.env.VITE_BACKEND_BASE_URL +
        "/api/submit-arbeidsbeperkt-formulier",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Pass the combined object here
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    // Show the alert on success
    showAlert.value = true;

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);

    console.log("Form submitted successfully:", result);

    // Optionally, reset the form
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = Array.isArray(formData.value[key]) ? [] : "";
    });
  } catch (error) {
    console.error("Failed to submit form:", error);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  padding: 1rem; /* Adjust padding as needed */
}

.form {
  width: 100%;
  max-width: 600px; /* Adjust max width as needed */
}

.input,
.select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #1976d2; /* Tailwind CSS blue-600 */
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2563eb; /* Tailwind CSS blue-700 */
}

.alert {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1976d2; /* Tailwind CSS blue-500 */
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

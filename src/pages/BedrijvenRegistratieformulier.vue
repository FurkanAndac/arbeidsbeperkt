<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" id="bedrijf-form" class="form">
      <!-- Naam Bedrijf -->
      <div class="mb-4">
        <label
          for="naamBedrijf"
          class="block text-sm font-medium text-gray-700"
        >
          Naam Bedrijf
        </label>
        <input
          id="naamBedrijf"
          v-model="formData.naamBedrijf"
          type="text"
          placeholder="Voer de naam van het bedrijf in"
          class="input"
          required
        />
      </div>

      <!-- Omschrijving bedrijf -->
      <div class="mb-4">
        <label
          for="omschrijving"
          class="block text-sm font-medium text-gray-700"
        >
          Omschrijving bedrijf
        </label>
        <input
          id="omschrijving"
          v-model="formData.omschrijving"
          type="text"
          placeholder="Schrijf een stukje over het bedrijf"
          maxlength="600"
          class="input"
          required
        />
      </div>

      <!-- Naam Contactpersoon -->
      <div class="mb-4">
        <label
          for="naamContactpersoon"
          class="block text-sm font-medium text-gray-700"
        >
          Naam Contactpersoon
        </label>
        <input
          id="naamContactpersoon"
          v-model="formData.naamContactpersoon"
          type="text"
          placeholder="Voer de naam van de contactpersoon in"
          class="input"
          required
        />
      </div>

      <!-- Gezocht Niveau -->
      <div class="mb-4">
        <label for="niveau" class="block text-sm font-medium text-gray-700">
          Gezocht Niveau
        </label>
        <select
          id="niveau"
          v-model="formData.niveau"
          multiple
          class="select"
          required
        >
          <option
            v-for="niveau in niveausOptions"
            :key="niveau"
            :value="niveau"
          >
            {{ niveau }}
          </option>
        </select>
        (ctrl+klik op gewenste niveau voor meerdere selectie)
      </div>

      <!-- Adres -->
      <div class="mb-4">
        <label for="adres" class="block text-sm font-medium text-gray-700">
          Adres
        </label>
        <input
          id="adres"
          v-model="formData.adres"
          type="text"
          placeholder="Voer het adres in"
          class="input"
          required
        />
      </div>

      <!-- Stad -->
      <div class="mb-4">
        <label for="stad" class="block text-sm font-medium text-gray-700">
          Stad
        </label>
        <input
          id="stad"
          v-model="formData.stad"
          type="text"
          placeholder="Voer de stad in"
          class="input"
          required
        />
      </div>

      <!-- Provincie -->
      <div class="mb-4">
        <label for="provincie" class="block text-sm font-medium text-gray-700">
          Provincie
        </label>
        <select
          id="provincie"
          v-model="formData.provincie"
          class="select"
          required
        >
          <option value="">Selecteer provincie</option>
          <option value="Groningen">Groningen</option>
          <option value="Friesland">Friesland</option>
          <option value="Drenthe">Drenthe</option>
          <option value="Overijssel">Overijssel</option>
          <option value="Flevoland">Flevoland</option>
          <option value="Gelderland">Gelderland</option>
          <option value="Utrecht">Utrecht</option>
          <option value="Noord-Holland">Noord-Holland</option>
          <option value="Zuid-Holland">Zuid-Holland</option>
          <option value="Zeeland">Zeeland</option>
          <option value="Noord-Brabant">Noord-Brabant</option>
          <option value="Limburg">Limburg</option>
        </select>
      </div>

      <!-- Telefoonnummer -->
      <div class="mb-4">
        <label
          for="telefoonnummer"
          class="block text-sm font-medium text-gray-700"
        >
          Telefoonnummer
        </label>
        <input
          id="telefoonnummer"
          v-model="formData.telefoonnummer"
          type="tel"
          placeholder="Voer je telefoonnummer in"
          class="input"
          required
        />
      </div>

      <!-- E-mail -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="Voer je e-mail in"
          class="input"
          required
        />
      </div>

      <!-- Submit Button -->
      <button id="submit-button" type="submit" class="submit-button">
        Verstuur
      </button>
    </form>

    <!-- Alert Box -->
    <div v-if="showAlert" class="alert-box" role="alert">
      Verstuurd! Uw formulier staat in onze wachtrij.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../boot/firebase";
import { onAuthStateChanged } from "firebase/auth";

const formData = ref({
  naamBedrijf: "",
  omschrijving: "",
  naamContactpersoon: "",
  niveau: [],
  adres: "",
  stad: "",
  provincie: "",
  telefoonnummer: "",
  email: "",
});

const niveausOptions = ["Ongeschoold", "MBO", "HBO", "WO"];
const showAlert = ref(false); // Alert box visibility

const user = ref(null);

// Watch for changes in the authentication state
onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

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
      import.meta.env.VITE_BACKEND_BASE_URL + "/api/add-to-wachtlijst",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Form submitted successfully:", result);

    // Show success alert
    showAlert.value = true;

    // Hide the alert box after 5 seconds
    setTimeout(() => {
      showAlert.value = false;
    }, 5000);

    // Optionally, reset the form
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = Array.isArray(formData.value[key]) ? [] : "";
    });
  } catch (error) {
    console.error("Failed to submit form:", error);
    // Handle error (e.g., show an error message)
  }
};
</script>

<style scoped>
/* Container to take up full viewport height and center content */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  padding: 1rem; /* Adjust padding as needed */
  box-sizing: border-box; /* Ensure padding does not affect width/height */
}

.form {
  width: 100%;
  max-width: 600px; /* Adjust max width as needed */
  background: #fff; /* Ensure background is white for contrast */
  padding: 2rem;
  /* padding-top: 300px; */
  border-radius: 0.375rem; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for elevation */
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

.alert-box {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1976d2; /* Tailwind CSS blue-500 */
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem; /* Reduce padding for smaller screens */
  }

  .form {
    padding-top: 10rem;
    border-radius: 0.25rem; /* Slightly smaller border radius for mobile */
  }

  .input,
  .select {
    padding: 0.75rem; /* Slightly larger padding for easier interaction */
  }

  .submit-button {
    padding: 0.75rem 1.25rem; /* Slightly larger padding for easier interaction */
  }
}
</style>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <form @submit.prevent="handleSubmit" id="bedrijf-form">
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        (ctrl+ klik op gewenste niveau voor meerdere selectie)
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        id="submit-button"
        type="submit"
        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Verstuur
      </button>
    </form>

    <!-- Alert Box -->
    <div
      v-if="showAlert"
      class="alert-box fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-md text-white bg-blue-500"
      role="alert"
    >
      Verstuurd! Uw formulier staat in onze wachtrij.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const handleSubmit = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_BASE_URL + "/api/add-to-wachtlijst",
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
/* Add any custom styling here */
.alert-box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
}
</style>

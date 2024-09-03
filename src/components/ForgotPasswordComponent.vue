<template>
  <main
    class="relative z-10 min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <!-- Animated Background -->
    <AnimatedBackground class="absolute inset-0 z-0" />

    <!-- Forgot Password Form -->
    <div class="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Wachtwoord vergeten?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Vul je e-mailadres in om je wachtwoord opnieuw in te stellen.
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="resetPassword" class="space-y-6">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email adres
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Voer je e-mailadres in"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset wachtwoord
              </button>
            </div>

            <!-- Display error message -->
            <div v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </div>

            <!-- Display success message -->
            <div v-if="successMessage" class="text-green-500 text-center">
              {{ successMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../boot/firebase"; // Adjust the path as needed
import AnimatedBackground from "./animatedBackground.vue";

export default {
  name: "ForgotPasswordComponent",
  components: {
    AnimatedBackground,
  },
  setup() {
    const email = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const resetPassword = async () => {
      try {
        // Check if the email is registered in Firebase Authentication
        await sendPasswordResetEmail(auth, email.value);
        successMessage.value =
          "Een wachtwoordherstel-link is verzonden naar je e-mail.";
        errorMessage.value = ""; // Clear any previous error messages
      } catch (error) {
        console.error("Error resetting password:", error);
        if (error.code === "auth/user-not-found") {
          errorMessage.value =
            "Er is geen account gevonden met dit e-mailadres.";
        } else {
          errorMessage.value =
            "Er is een fout opgetreden bij het resetten van je wachtwoord. Probeer het opnieuw.";
        }
        successMessage.value = ""; // Clear any previous success messages
      }
    };

    return {
      email,
      errorMessage,
      successMessage,
      resetPassword,
    };
  },
};
</script>

<style scoped>
.main {
  position: relative;
  min-height: 100vh;
}
</style>

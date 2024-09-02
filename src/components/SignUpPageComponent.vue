<template>
  <main>
    <div
      class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registreer je account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Of
          <a
            href="/authentication/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            login
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="signUp" class="space-y-6">
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
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700"
              >
                Wachtwoord
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Voer je wachtwoord in"
                />
              </div>
            </div>
            <div>
              <label
                for="repeatpassword"
                class="block text-sm font-medium text-gray-700"
              >
                Herhaal wachtwoord
              </label>
              <div class="mt-1">
                <input
                  id="repeatpassword"
                  v-model="repeatpassword"
                  name="repeatpassword"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Herhaal je wachtwoord"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registreer
              </button>
            </div>

            <!-- Display error message -->
            <div v-if="errorMessage" class="text-red-500 text-center">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../boot/firebase"; // Adjust the path as needed
import { useRouter } from "vue-router";

export default {
  name: "SignUpPageComponent",
  setup() {
    const email = ref("");
    const password = ref("");
    const repeatpassword = ref("");

    const errorMessage = ref("");
    const router = useRouter();

    const signUp = async () => {
      try {
        if (password.value === repeatpassword.value) {
          await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          router.push("/authentication/login"); // Redirect to the home page on success
        } else {
          errorMessage.value =
            "Wachtwoord en herhaal wachtwoord komt niet overeen";
        }
      } catch (error) {
        console.error("Error signing up:", error);
        errorMessage.value =
          "Het registreren is niet gelukt. Check je inloggevens opnieuw.";
      }
    };

    return {
      email,
      password,
      repeatpassword,
      errorMessage,
      signUp,
    };
  },
};
</script>

<style scoped></style>

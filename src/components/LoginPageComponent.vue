<template>
  <main>
    <div
      class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in met je account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Of
          <a
            href="/signup"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            registreer nu
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form @submit.prevent="signIn" class="space-y-6">
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember_me"
                  v-model="rememberMe"
                  name="remember_me"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  for="remember_me"
                  class="ml-2 block text-sm text-gray-900"
                >
                  Onthoud me
                </label>
              </div>

              <div class="text-sm">
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:text-blue-500"
                >
                  Wachtwoord vergeten?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
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
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../boot/firebase"; // Adjust the path as needed
import { useRouter } from "vue-router";

export default {
  name: "LoginPageComponent",
  setup() {
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false); // Ref for the "Onthoud me" checkbox
    const errorMessage = ref("");
    const router = useRouter();

    const signIn = async () => {
      try {
        // Set the persistence based on the "Onthoud me" checkbox
        await setPersistence(
          auth,
          rememberMe.value ? browserLocalPersistence : browserSessionPersistence
        );
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/"); // Redirect to the home page on success
      } catch (error) {
        console.error("Error signing in:", error);
        errorMessage.value =
          "Failed to sign in. Please check your email and password and try again.";
      }
    };

    return {
      email,
      password,
      rememberMe,
      errorMessage,
      signIn,
    };
  },
};
</script>

<style scoped></style>

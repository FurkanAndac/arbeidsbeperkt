<template>
  <div>
    <!-- This component will handle the authentication logic and provide necessary UI elements -->
    <SignIn v-if="!isAuthenticated" />
    <UserButton v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClerkProvider } from "vue-clerk";
import { useAuth, SignIn, UserButton } from "vue-clerk";

const clerkApiKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkApiKey) {
  throw new Error(
    "Clerk publishable key is missing. Set VITE_CLERK_PUBLISHABLE_KEY in .env file."
  );
}

// Initialize Clerk
const { isAuthenticated } = useAuth();

onMounted(async () => {
  await useClerkProvider.load({ apiKey: clerkApiKey });
});
</script>

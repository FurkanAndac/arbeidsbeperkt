<template>
  <div>
    <div v-if="user">
      <div ref="userButtonRef"></div>
    </div>
    <div v-else>
      <div ref="signInRef"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Clerk } from "@clerk/clerk-js";

const userButtonRef = ref(null);
const signInRef = ref(null);

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(clerkPubKey);

const user = ref(null);

onMounted(async () => {
  // console.log(clerk);
  await clerk.load();

  if (clerk.user) {
    user.value = clerk.user;
    // console.log(clerk.user);
    // clerk.mountUserButton(userButtonRef.value);
  } else {
    clerk.mountSignIn(signInRef.value);
  }
});
</script>

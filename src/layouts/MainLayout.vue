<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Arbeidsbeperkt </q-toolbar-title>

        <div><ArbeidsbeperktCounter /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in filteredLinksList"
          :key="link.title"
          :title="link.title"
          :caption="link.caption"
          :icon="link.icon"
          :link="link.link"
          @click="handleLinkClick(link)"
        />

        <!-- Mailto Link at the bottom -->
        <q-item clickable @click="handleMailtoClick" class="q-mt-auto">
          <q-item-section>
            <q-item-label class="text-blue-500">Email ons</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="email" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Clerk } from "@clerk/clerk-js";
import ArbeidsbeperktCounter from "components/ArbeidsbeperktCounter.vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter, useRoute } from "vue-router";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(clerkPubKey);

const leftDrawerOpen = ref(false);
const user = ref(null);
const router = useRouter();
const route = useRoute();

const isAuthenticated = computed(
  () => user.value !== null && user.value !== undefined
);

watch(isAuthenticated, (authenticated) => {
  if (authenticated && route.path === "/login") {
    router.push("/");
  }
});

onMounted(async () => {
  await clerk.load();
  user.value = clerk.user;
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function handleAuthButtonClick() {
  if (isAuthenticated.value) {
    clerk.signOut(); // Log out the user
  } else {
    clerk.redirectToSignIn(); // Redirect to sign-in page
  }
}

function handleLinkClick(link) {
  if (link.title === "Login" && !isAuthenticated.value) {
    handleAuthButtonClick();
  } else if (link.title === "Logout" && isAuthenticated.value) {
    handleAuthButtonClick();
  } else {
    if (link.link.startsWith("http://") || link.link.startsWith("https://")) {
      window.open(link.link, "_blank");
    } else {
      router.push(link.link);
    }
  }
}

function handleMailtoClick() {
  window.location.href = "mailto:support@example.com"; // Replace with your email address
}

const linksList = [
  {
    title: "Thuis pagina",
    caption: "Thuis pagina!",
    icon: "home",
    link: "/",
  },
  {
    title: "Bedrijven registratie",
    caption: "Registreer hier uw bedrijf!",
    icon: "assignment",
    link: "/bedrijven-registratieformulier",
  },
  {
    title: "Arbeidsbeperkte",
    caption: "Heeft u een passende functie gevonden?",
    icon: "assignment",
    link: "/arbeidsbeperkte-formulier",
  },
  {
    title: "LinkedIn",
    caption: "Connect met ons op LinkedIn!",
    icon: "link",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Login",
    caption: "",
    icon: "login", // Default icon for login
    link: "/",
  },
];

const filteredLinksList = computed(() => {
  return linksList
    .filter((link) => {
      if (
        link.title === "Bedrijven registratie" ||
        link.title === "Arbeidsbeperkte"
      ) {
        return isAuthenticated.value;
      }
      return true;
    })
    .map((link) => {
      if (isAuthenticated.value) {
        if (link.title === "Login") {
          return { ...link, title: "Logout", icon: "logout", link: "/logout" };
        }
      } else if (link.title === "Logout") {
        return { ...link, title: "Login", icon: "login", link: "/" };
      }
      return link;
    });
});
</script>

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
        <div><ArbeidsbeperktCounter id="arbeidsbeperkt-counter-id" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <EssentialLink
          v-for="link in filteredLinksList"
          :key="link.id"
          :id="link.id"
          :title="link.title"
          :caption="link.caption"
          :icon="link.icon"
          :link="link.link"
          @click="handleLinkClick(link)"
        />
        <!-- Mailto Link at the bottom -->
        <q-item
          clickable
          @click="handleMailtoClick"
          class="q-mt-auto"
          id="E-mail-id"
        >
          <q-item-section>
            <q-item-label class="text-blue-500">Email ons</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="email" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="handleAuthButtonClick"
          class="q-mt-auto"
          id="loginPage-id"
        >
          <q-item-section>
            <q-item-label class="text-blue-500">{{
              isAuthenticated ? "Logout" : "Login"
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="login" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- Add the Wizard component here -->
      <Wizard />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ArbeidsbeperktCounter from "components/ArbeidsbeperktCounter.vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import Wizard from "src/components/FormWizard.vue"; // Import the Wizard component
import { auth } from "../boot/firebase"; // Adjust the path as needed
import { onAuthStateChanged, signOut } from "firebase/auth";

const leftDrawerOpen = ref(false);
const user = ref(null);
const router = useRouter();

// Check if user is authenticated
const isAuthenticated = computed(() => !!user.value);

// Listen to authentication state changes
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    console.log("User: ", user.value); // Debug: check current user
  });
});

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function openLoginPage() {
  router.push("/login");
}

function handleAuthButtonClick() {
  if (isAuthenticated.value) {
    signOut(auth)
      .then(() => {
        // Redirect to login page after logout
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  } else {
    router.push("/login"); // Redirect to login page if not authenticated
  }
}

function handleLinkClick(link) {
  if (link.title === "Login" || link.title === "Logout") {
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
  window.location.href = "mailto:furkan.andac@hotmail.com"; // Replace with your email address
}

const linksList = [
  {
    id: "home-link",
    title: "Thuis pagina",
    caption: "Thuis pagina!",
    icon: "home",
    link: "/",
  },
  {
    id: "bedrijven-registratie-link",
    title: "Bedrijven registratie",
    caption: "Registreer hier uw bedrijf!",
    icon: "assignment",
    link: "/bedrijven-registratieformulier",
  },
  {
    id: "arbeidsbeperkte-link",
    title: "Arbeidsbeperkte",
    caption: "Heeft u een passende functie gevonden?",
    icon: "assignment",
    link: "/arbeidsbeperkte-formulier",
  },
  {
    id: "sponsors-link",
    title: "Onze sponsors",
    caption: "Overzicht van onze sponsors",
    icon: "face",
    link: "/onze-sponsors",
  },
  {
    id: "doneer-link",
    title: "Doneer",
    caption: "Doneer hier!",
    icon: "money",
    link: "/",
  },
  {
    id: "linkedin-link",
    title: "LinkedIn",
    caption: "Connect met ons op LinkedIn!",
    icon: "link",
    link: "https://twitter.quasar.dev",
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

<style scoped>
/* Add styles if needed */
</style>

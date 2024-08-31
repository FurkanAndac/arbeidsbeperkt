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
          :key="link.title"
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
import { ref, computed, onMounted, watch } from "vue";
import { Clerk } from "@clerk/clerk-js";
import ArbeidsbeperktCounter from "components/ArbeidsbeperktCounter.vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter, useRoute } from "vue-router";
import Wizard from "src/components/FormWizard.vue"; // Import the Wizard component
import introJs from "intro.js";
import "intro.js/introjs.css"; // Import Intro.js styles

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

  // Check local storage and start Intro.js if not seen before
  // const firstTourSeen = localStorage.getItem("firstTourSeen");
  // const secondTourSeen = localStorage.getItem("secondTourSeen");
  // if (!firstTourSeen) {
  //   startFirstTour();
  // } else if (!secondTourSeen) {
  //   startSecondTour();
  // }
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
  window.location.href = "mailto:furkan.andac@hotmail.com"; // Replace with your email address
}

const linksList = [
  {
    id: "home-link", // Unique ID for this link
    title: "Thuis pagina",
    caption: "Thuis pagina!",
    icon: "home",
    link: "/",
  },
  {
    id: "bedrijven-registratie-link", // Unique ID for this link
    title: "Bedrijven registratie",
    caption: "Registreer hier uw bedrijf!",
    icon: "assignment",
    link: "/bedrijven-registratieformulier",
  },
  {
    id: "arbeidsbeperkte-link", // Unique ID for this link
    title: "Arbeidsbeperkte",
    caption: "Heeft u een passende functie gevonden?",
    icon: "assignment",
    link: "/arbeidsbeperkte-formulier",
  },

  {
    id: "sponsors-link", // Unique ID for this link
    title: "Onze sponsors",
    caption: "Overzicht van onze sponsors",
    icon: "face", // Default icon for login
    link: "/onze-sponsors",
  },
  {
    id: "doneer-link", // Unique ID for this link
    title: "Doneer",
    caption: "Doneer hier!",
    icon: "money", // Default icon for login
    link: "/",
  },
  {
    id: "linkedin-link", // Unique ID for this link
    title: "LinkedIn",
    caption: "Connect met ons op LinkedIn!",
    icon: "link",
    link: "https://twitter.quasar.dev",
  },
  {
    id: "login-link", // Unique ID for this link
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

// function startFirstTour() {
//   const intro = introJs().setOptions({
//     steps: [
//       {
//         element: "#bedrijven-registratie-link", // Target the specific link
//         intro: "This is the Bedrijven registratie section.",
//         position: "right", // Position of the popover
//       },
//       {
//         element: "#bedrijf-form", // Target the specific link
//         intro: "This is the Bedrijven registratie section.",
//         position: "right", // Position of the popover
//       },
//       // Define more steps as needed
//     ],
//     showStepNumbers: true, // Optionally show step numbers
//   });

//   // Start the tour
//   intro.start();
//   intro.setDontShowAgain(true);

//   // Handle step changes
//   intro.onchange((targetElement) => {
//     console.log(targetElement);
//     setTimeout(1000);
//     if (targetElement.matches("#bedrijven-registratie-link")) {
//       try {
//         console.log(targetElement);
//         // targetElement.preventDefault();
//         router.push("/bedrijven-registratieformulier");
//       } catch (error) {
//         console.error("Failed to navigate:", error);
//       }
//     }

//     if (targetElement.matches("#arbeidsbeperkte-link")) {
//       try {
//         console.log(targetElement);
//         console.log(document.querySelector("#arbeidsbeperkte-link"));
//         // targetElement.preventDefault();
//         router.push("/arbeidsbeperkte-formulier");
//       } catch (error) {
//         console.error("Failed to navigate:", error);
//       }
//     }
//   });

//   intro.oncomplete(() => {
//     finishWizard("firstTourSeen");
//     router.push("/");
//     setTimeout(() => {
//       startSecondTour();
//     }, 1000); // Start the second tour when the first one completes
//   });
// }

// function startSecondTour() {
//   const intro = introJs().setOptions({
//     steps: [
//       {
//         element: window.document.getElementById("arbeidsbeperkte-link"),
//         intro: "This is the first step of the second tour.",
//         position: "top",
//       },
//       {
//         element: "#step2-second-tour",
//         intro: "This is the second step of the second tour.",
//         position: "bottom",
//       },
//     ],
//     showStepNumbers: true,
//   });

//   intro.start();
//   intro.setDontShowAgain(true);

//   intro.oncomplete(() => {
//     finishWizard("secondTourSeen");
//     // You can add more actions here if needed, like redirecting the user.
//   });
// }

// function finishWizard(tourName) {
//   localStorage.setItem(tourName, "true");
// }
</script>

<style scoped>
/* Add styles if needed */
</style>

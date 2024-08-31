<template>
  <div v-if="isVisible" class="wizard">
    <!-- Optioneel basisnavigatie opnemen als gewenst -->
    <!-- <div class="wizard-navigation">
      <button @click="prevStep" :disabled="currentStepIndex === 0">
        Previous
      </button>
      <button
        v-if="currentStepIndex === steps.length - 1"
        @click="finishWizard"
      >
        Finish
      </button>
      <button v-else @click="nextStep">Next</button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Clerk } from "@clerk/clerk-js";
import introJs from "intro.js";
import "intro.js/introjs.css"; // Import Intro.js styles
import { useRouter } from "vue-router";

// Clerk configureren met je public key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(clerkPubKey);

// Een ref om te controleren of de wizard zichtbaar moet zijn
const isVisible = ref(false);
const router = useRouter();

const startIntroJs = () => {
  const intro = introJs().setOptions({
    steps: [
      {
        element: "#bedrijven-registratie-link",
        intro:
          "Welkom! Ben jij HR-medewerker, bedrijfseigenaar, of contactpersoon binnen een organisatie die inclusiviteit hoog in het vaandel heeft staan? Hier kun je jouw bedrijfsgegevens invullen. Dit is het startpunt om jouw bedrijf op de kaart te zetten. Laten we beginnen!",
        position: "right",
      },
      {
        element: "#arbeidsbeperkte-link",
        intro:
          "Geweldig! Ben jij arbeidsbeperkt, jobcoach, of werkconsulent? Als je een passende functie hebt gevonden, kun je hier het formulier invullen. Dit helpt ons om jou verder te begeleiden in je traject naar werk. Samen maken we het verschil!",
        position: "right",
      },
      {
        element: "#arbeidsbeperkt-counter-id",
        intro:
          "Hier zie je onze impact! Dit is de teller die aangeeft hoeveel arbeidsbeperkten we al hebben geholpen. We zijn trots op elke stap vooruit en jij kunt daar deel van uitmaken.",
        position: "left",
      },
      {
        element: "#E-mail-id",
        intro:
          "Heb je vragen over de app, wil je een bug rapporteren, samenwerken of heb je een geweldig idee om onze diensten te verbeteren? Stuur ons een e-mail! We staan altijd open voor feedback en horen graag van je. Laten we kijken hoe je ons kunt bereiken!",
        position: "right",
      },
      {
        element: "#sponsors-link",
        intro:
          "Welkom bij onze sponsorenpagina! Hier vind je de bedrijven en organisaties die ons steunen in het realiseren van onze missie. Van onze trotse gouden partners tot de onmisbare zilveren en bronzen supporters—iedereen draagt bij aan het maken van een verschil. Laten we eens kijken wie er allemaal achter ons staan!",
        position: "right",
      },
      {
        element: "#doneer-link",
        intro:
          "Wil je bijdragen aan onze missie? Elk bedrag, groot of klein, helpt ons enorm. Vanaf een donatie van 1000 euro word je bedrijf een sponsor en krijgt het een plek op onze sponsorspagina. Jouw steun maakt echt het verschil. Laten we eens kijken hoe je kunt doneren!",
        position: "right",
      },
    ],
    showStepNumbers: true,
    floatingElement: true, // Floating element feature inschakelen
  });

  intro.start();

  // Voeg eventueel andere Intro.js events hier toe
  intro.onchange((targetElement) => {
    // console.log("Current step:", intro._currentStep);
    // console.log(targetElement);
    // Vertraging toevoegen om ervoor te zorgen dat het element correct wordt gemarkeerd
    setTimeout(() => {
      if (targetElement.matches("#bedrijven-registratie-link")) {
        router.push("/bedrijven-registratieformulier");
      } else if (targetElement.matches("#arbeidsbeperkte-link")) {
        router.push("/arbeidsbeperkte-formulier");
      } else if (targetElement.matches("#sponsors-link")) {
        router.push("/onze-sponsors");
      }
    }, 500); // Pas vertraging aan indien nodig
  });

  intro.oncomplete(() => {
    finishWizard();
  });
};

const finishWizard = () => {
  localStorage.setItem("wizardSeen", "true");
  isVisible.value = false;
};

onMounted(async () => {
  await clerk.load();

  await nextTick(); // Zorg ervoor dat DOM-updates voltooid zijn

  // Check of de gebruiker is ingelogd
  const isLoggedIn = clerk.user;
  const wizardSeen = localStorage.getItem("wizardSeen");

  if (isLoggedIn && !wizardSeen) {
    isVisible.value = true;
    setTimeout(() => startIntroJs(), 3000); // Uitvoering van startIntroJs met 3000ms vertraging
  }
});
</script>

<style scoped>
.wizard {
  max-width: 600px;
  margin: 0 auto;
}
</style>

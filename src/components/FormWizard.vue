<template>
  <div v-if="isVisible" class="wizard">
    <!-- Optionally include basic navigation if desired -->
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
import introJs from "intro.js";
import "intro.js/introjs.css"; // Import Intro.js styles
import { useRouter } from "vue-router";

const isVisible = ref(false);
const router = useRouter();

const startIntroJs = () => {
  const intro = introJs().setOptions({
    steps: [
      {
        element: "#bedrijven-registratie-link",
        intro:
          "Welkom! Ben jij onderdeel van een bedrijf die inclusiviteit hoog heeft staan? Hier kun je jouw bedrijfsgegevens invullen. Dit is het startpunt om jouw bedrijf op de kaart te zetten. Laten we beginnen!",
        position: "right",
      },
      // {
      //   element: "#bedrijf-form",
      //   intro: "This is the Bedrijven registratie form.",
      //   position: "right",
      // },
      {
        element: "#arbeidsbeperkte-link",
        intro:
          "Geweldig! Als je een passende functie hebt gevonden, kun je hier het formulier invullen. Dit helpt ons om jou verder te begeleiden in je traject naar werk. Samen maken we het verschil!",
        position: "right",
      },
      {
        element: "#arbeidsbeperkt-counter-id",
        intro:
          "Hier zie je onze impact! Dit is de teller die aangeeft hoeveel arbeidsbeperkten we al hebben geholpen. We zijn trots op elke stap vooruit en jij kunt daar deel van uitmaken.",
        position: "left",
      },
    ],
    showStepNumbers: true,
    floatingElement: true, // Enable floating element feature
  });

  intro.start();

  // Refresh the tour to handle dynamic content
  // intro.onbeforechange(() => {
  //   intro.refresh(); // Ensure elements are correctly positioned
  // });

  intro.onchange((targetElement) => {
    console.log("Current step:", intro._currentStep);
    console.log(targetElement);
    // Adding delay to ensure element is highlighted correctly
    setTimeout(() => {
      if (targetElement.matches("#bedrijven-registratie-link")) {
        router.push("/bedrijven-registratieformulier");
      } else if (targetElement.matches("#arbeidsbeperkte-link")) {
        router.push("/arbeidsbeperkte-formulier");
      }
    }, 500); // Adjust delay if needed
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
  await nextTick(); // Ensure DOM updates are complete
  const wizardSeen = localStorage.getItem("wizardSeen");
  if (!wizardSeen) {
    isVisible.value = true;
    setTimeout(() => startIntroJs(), 3000); // Delay execution of startIntroJs by 3000ms
  }
});
</script>

<style scoped>
.wizard {
  max-width: 600px;
  margin: 0 auto;
}
</style>

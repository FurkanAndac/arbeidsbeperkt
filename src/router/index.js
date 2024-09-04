import { createRouter, createWebHistory } from "vue-router";
import { Loading, QSpinnerGears } from "quasar";
import routes from "./routes"; // Adjust the path to your routes file

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Show loading spinner on route change
router.beforeEach((to, from, next) => {
  // Show the loading spinner
  Loading.show({
    spinner: QSpinnerGears, // Use a custom spinner
    message: "Aan het laden...", // Optional message
    spinnerColor: "primary", // Custom spinner color
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional background color
  });
  // Proceed with navigation
  next();
});

// Hide loading spinner after navigation
router.afterEach(() => {
  // Hide the loading spinner
  Loading.hide();
});

export default router;

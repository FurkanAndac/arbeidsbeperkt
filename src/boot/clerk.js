import { boot } from "quasar/wrappers";
import { Clerk } from "@clerk/clerk-js";

// Initialize ClerkJS here
const clerk = new Clerk(process.env.VITE_CLERK_PUBLISHABLE_KEY);

export default boot(async ({ app }) => {
  await clerk.load();

  // Provide Clerk to the Vue app
  app.config.globalProperties.$clerk = clerk;
});

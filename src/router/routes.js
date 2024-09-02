const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "bedrijven-registratieformulier",
        component: () => import("pages/BedrijvenRegistratieformulier.vue"),
      },
      {
        path: "arbeidsbeperkte-formulier",
        component: () => import("pages/ArbeidsbeperktRegistratieformulier.vue"),
      },
      {
        path: "onze-sponsors",
        component: () => import("pages/OnzeSponsors.vue"),
      },
      {
        path: "gdpr",
        name: "GDPRStatement",
        component: () => import("pages/GDPRStatement.vue"),
      },
      {
        path: "cookie-policy",
        name: "CookiePolicy",
        component: () => import("pages/CookiePolicy.vue"),
      },
      {
        path: "doneer",
        name: "Doneer",
        component: () => import("pages/DoneerPage.vue"),
      },
    ],
  },
  {
    path: "/authentication",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "signup",
        name: "Signup",
        component: () => import("pages/SignupPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

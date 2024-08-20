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

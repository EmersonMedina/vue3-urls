import { api } from "src/boot/axios";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "inicio",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      {
        path: "howitworks",
        component: () => import("pages/HowItWorksPage.vue"),
      },
      {
        path: "profile",
        meta: {
          auth: true,
        },
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "/:id",
        component: () => import("src/pages/EditUrlPage.vue"),
        meta: {
          auth: true,
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/InvalidLinkLayout.vue"),
    children: [
      {
        path: "/pblic/:id",
        beforeEnter: redirectLink,
        component: () => import("src/pages/InvalidLinkPage.vue"),
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

async function redirectLink(to, from, next) {
  try {
    const { data } = await api.get(`/links/public/${to.params.id}`);

    window.location.href = data.longLink;
  } catch (e) {
    console.error(e);
    next();
  }
}

export default routes;

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import {
  mdiLogoutVariant,
  mdiHomeOutline,
  mdiAccountPlus,
  mdiHeadQuestionOutline,
} from "@quasar/extras/mdi-v6";

const router = useRouter();

const userStore = useUserStore();

const linksWithouthToken = [
  {
    title: "Login",
    caption: "Ingresa al sistema",
    icon: "login",
    link: "/login",
  },
  {
    title: "Registrarse",
    caption: "Registrate en el sistema",
    icon: mdiAccountPlus,
    link: "/register",
  },
  {
    title: "¿Cómo funciona?",
    icon: mdiHeadQuestionOutline,
    link: "/howitworks",
  },
];

const linksWithToken = [
  {
    title: "Inicio",
    caption: "Administra tus links",
    icon: mdiHomeOutline,
    link: "/inicio",
  },
  {
    title: "¿Cómo funciona?",
    icon: mdiHeadQuestionOutline,
    link: "/howitworks",
  },
  {
    title: "Logout",
    icon: mdiLogoutVariant,
    link: "",
    isLogout: true,
  },
];

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

if (userStore.userInfo != null) {
  if (userStore.userInfo.photoURL != "" && userStore.userInfo.photoURL != null)
    userStore.URLProfileImage = userStore.userInfo.photoURL;

  if (userStore.userInfo.name != "" && userStore.userInfo.name != null) {
    userStore.userName = userStore.userInfo.name;

    const fullName = userStore.userInfo.name.split(" ");

    if (fullName.length > 1)
      userStore.userName = fullName[0] + " " + fullName[1];
    else userStore.userName = fullName[0];
  }
}

if (userStore.userInfo === null) {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

  if (userInfo != null) {
    if (userInfo.photoURL != "" && userInfo.photoURL != null)
      userStore.URLProfileImage = userInfo.photoURL;

    if (userInfo.name != "" && userInfo.name != null) {
      userStore.userName = userInfo.name;
      const fullName = userInfo.name.split(" ");

      if (fullName.length > 1)
        userStore.userName = fullName[0] + " " + fullName[1];
      else userStore.userName = fullName[0];
    }
  }
}

const redirectHome = () => {
  router.push("/inicio");
};

const redirectToEditProfilePage = () => {
  router.push("/profile");
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title style="cursor: pointer" @click="redirectHome">
          NANO LINKS
        </q-toolbar-title>

        <div
          class="q-gutter-sm q-mr-sm"
          v-if="userStore.token && userStore.userName != null"
        >
          <q-chip>
            <q-avatar
              v-if="userStore.token"
              class="q-mr-sm"
              style="cursor: pointer"
            >
              <img
                @click="redirectToEditProfilePage"
                :src="userStore.URLProfileImage"
              />
              <q-tooltip class="bg-indigo" :offset="[10, 10]">
                Editar perfil
              </q-tooltip>
            </q-avatar>
            {{ userStore.userName }}
          </q-chip>
        </div>
        <div
          class="q-gutter-sm q-mr-sm"
          v-if="userStore.token && userStore.userName === null"
        >
          <q-avatar
            v-if="userStore.token"
            class="q-mr-sm"
            style="cursor: pointer"
          >
            <img
              @click="redirectToEditProfilePage"
              :src="userStore.URLProfileImage"
            />
            <q-tooltip class="bg-indigo" :offset="[10, 10]">
              Editar perfil
            </q-tooltip>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list v-if="userStore.token">
        <q-item-label header> Nano Links </q-item-label>

        <EssentialLink
          v-for="link in linksWithToken"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list v-if="!userStore.token">
        <q-item-label header> Nano Links </q-item-label>

        <EssentialLink
          v-for="link in linksWithouthToken"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

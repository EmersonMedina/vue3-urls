<template>
  <q-page padding>
    <q-btn @click="createLink">Crear Link</q-btn>

    <p>token: {{ userStore.token }}</p>
    <p>expiresIn: {{ userStore.expiresIn }}</p>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();

// userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
      data: {
        longLink:
          "https://www.npmjs.com/package/express-session#cookiesamesite",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>

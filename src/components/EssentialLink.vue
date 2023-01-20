<template>
  <q-item v-if="!isLogout" clickable tag="a" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item v-if="isLogout" clickable @click="logout">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },
  isLogout: {
    type: Boolean,
    default: false,
  },
});

const logout = async () => {
  await userStore.logout();
  userStore.URLProfileImage = "https://source.unsplash.com/random";
  userStore.userName = null;
  router.push("/login");
};
</script>

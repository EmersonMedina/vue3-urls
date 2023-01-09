<script setup>
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
</script>

<template>
  <h3>Login</h3>
  {{ userStore.token }}
</template>

<style lang="scss" scoped></style>

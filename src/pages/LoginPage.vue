<script setup>
import FormLogin from "../components/FormEmailPassword.vue";
</script>

<template>
  <q-page padding>
    <FormLogin formName="Login" :showRepassword="false" />
  </q-page>
</template>

<style lang="scss" scoped></style>

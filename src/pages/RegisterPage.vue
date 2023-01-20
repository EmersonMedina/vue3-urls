<script setup>
import FormRegister from "../components/FormEmailPassword.vue";
</script>

<template>
  <q-page padding>
    <FormRegister formName="Register" :showRepassword="true"> </FormRegister>
  </q-page>
</template>

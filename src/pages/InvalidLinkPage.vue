<script setup>
import { mdiLinkVariantRemove } from "@quasar/extras/mdi-v6";
</script>

<template>
  <q-page class="body--dark text-center" padding>
    <q-icon :name="mdiLinkVariantRemove" style="width: 25%; height: auto" />
    <h2>Link no válido</h2>
  </q-page>
</template>

<style scoped>
.body--dark {
  background-color: black;
  color: white;
  font-family: roboto-font;
}
</style>

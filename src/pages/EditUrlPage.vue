<script setup>
import { useRoute } from "vue-router";
import editUrl from "../components/FormUrl.vue";
import { ref } from "vue";

const route = useRoute();

const { id } = route.params;

// const getURL = async () => {
//   URL.value = await URLStore.getURL(id);
// };

// // getURL();
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-10 col-md-8">
      <h3 style="margin: 1rem">Actualizar URL</h3>
      <editUrl formName="UpdateURL" :URLId="id"></editUrl>
    </div>
  </q-page>
</template>

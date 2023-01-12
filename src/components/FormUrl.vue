<script setup>
import { ref } from "vue";
import { useURLStore } from "../stores/url-store";
import { alert } from "src/utils/notifications";
import { useRouter } from "vue-router";

const props = defineProps({
  formName: {
    type: String,
    required: true,
  },
  URLId: {
    type: String,
    required: false,
    default: null,
  },
});

const URLStore = useURLStore();

const router = useRouter();
const URL = ref("");
const regularExpression =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

if (props.URLId) {
  console.log("deberia buscar el link");
  getURL(props.URLId);
}

async function getURL(id) {
  URL.value = await URLStore.getURL(id);
}

const handleSubmit = async () => {
  try {
    if (props.formName == "AddURL") {
      await URLStore.createURL(URL.value);
      alert(`Link creado exitosamente! 🐶`, "positive");
    }

    if (props.formName == "UpdateURL") {
      await URLStore.updateURL(props.URLId, URL.value);
      alert(`Link actualizado exitosamente! 🐶`, "positive");
      router.push("/inicio");
    }

    URL.value = "";
  } catch (error) {
    alert(error?.message, "pink-9");
  }
};
</script>

<template>
  <q-form @submit.prevent="handleSubmit" class="q-mb-md">
    <q-input
      filled
      v-model="URL"
      label="Ingrese una URL"
      type="text"
      :rules="[
        (val) =>
          (val && regularExpression.test(val)) || 'Ingrese una URL válida',
      ]"
    ></q-input>
    <q-btn
      type="submit"
      :loading="URLStore.isCreatingUrl"
      v-if="props.formName === 'AddURL'"
      >Crear</q-btn
    >
    <q-btn
      type="submit"
      :loading="URLStore.isLoadingUrl"
      v-if="props.formName === 'UpdateURL'"
      class="q-mr-sm"
      >Actualizar</q-btn
    >
    <q-btn
      v-if="props.formName === 'UpdateURL'"
      :disable="URLStore.isLoadingUrl"
      to="/inicio"
      >Volver</q-btn
    >
  </q-form>
</template>

<style lang="scss" scoped></style>

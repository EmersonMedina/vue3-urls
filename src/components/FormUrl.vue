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

const formUrl = ref(null);
const router = useRouter();
const URL = ref("");
const name = ref("");

const regularExpression =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

if (props.URLId) {
  getURL(props.URLId);
}

async function getURL(id) {
  const res = await URLStore.getURL(id);

  URL.value = res.link.longLink;
  name.value = res.link.name;
}

const handleSubmit = async () => {
  try {
    if (props.formName == "AddURL") {
      await URLStore.createURL(name.value, URL.value);
      alert(`Link creado exitosamente! 🐶`, "positive");
      formUrl.value.resetValidation();
    }

    if (props.formName == "UpdateURL") {
      await URLStore.updateURL(props.URLId, name.value, URL.value);
      alert(`Link actualizado exitosamente! 🐶`, "positive");
      formUrl.value.resetValidation();
      router.push("/inicio");
    }

    URL.value = "";
    name.value = "";
  } catch (error) {
    alert(error?.message, "pink-9");
  }
};
</script>

<template>
  <q-form @submit.prevent="handleSubmit" class="q-mb-md" ref="formUrl">
    <q-input
      filled
      v-model="name"
      label="Ingrese un nombre"
      type="text"
      :rules="[(val) => (val && val.length > 0) || 'Ingrese un nombre válido']"
      lazy-rules
    ></q-input>
    <q-input
      filled
      v-model="URL"
      label="Ingrese una URL"
      type="text"
      :rules="[
        (val) =>
          (val && regularExpression.test(val)) || 'Ingrese una URL válida',
      ]"
      lazy-rules
    ></q-input>
    <q-btn type="submit" v-if="props.formName === 'AddURL'">Crear</q-btn>
    <q-btn type="submit" v-if="props.formName === 'UpdateURL'" class="q-mr-sm"
      >Actualizar</q-btn
    >
    <q-btn v-if="props.formName === 'UpdateURL'" to="/inicio">Volver</q-btn>
  </q-form>
</template>

<style lang="scss" scoped></style>

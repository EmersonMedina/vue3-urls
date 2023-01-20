<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { alert } from "src/utils/notifications";

const name = ref("");
const email = ref("");
const fileImage = ref(null);

const userStore = useUserStore();

const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

if (userInfo) {
  if (userInfo.photoURL != "" && userInfo.photoURL != null)
    userStore.URLProfileImage = userInfo.photoURL;

  name.value = userInfo.name;
  email.value = userInfo.email;
}

const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("name", name.value);
    data.append("imagen", fileImage.value);

    const res = await userStore.updateProfile(data);

    fileImage.value = null;

    alert(`Usuario actualizado exitosamente! 🦜`, "positive");
  } catch (error) {
    console.error(error);
    alert(error?.message, "pink-9");
  }
};

const onRejected = () => {
  alert("Solo se pueden subir imágenes");
};
</script>

<template>
  <q-page padding class="row items-center justify-center">
    <div class="col-12 col-sm-8 col-md-6">
      <header class="row justify-center">
        <q-avatar size="7rem" class="q-mb-sm">
          <img :src="userStore.URLProfileImage" />
        </q-avatar>
      </header>
      <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
        <q-input filled v-model="email" label="Email" :disable="true" />
        <q-input
          filled
          v-model="name"
          label="Nombre"
          hint="Nombre de perfil público"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor ingresa un valor',
          ]"
        />

        <q-file
          style="max-width: 300px"
          v-model="fileImage"
          filled
          rounded
          label="Seleccione su nueva imagen"
          accept=".jpg, image/*"
          @rejected="onRejected"
        />

        <q-btn type="submit"> Actualizar Información </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped></style>

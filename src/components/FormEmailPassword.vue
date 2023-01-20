<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";
import { alert } from "../utils/notifications.js";

const router = useRouter();
const userStore = useUserStore();
const email = ref("emermedina877@gmail.com");
const password = ref("Davidmedina*2018");
const repassword = ref("Davidmedina*2018");

const props = defineProps({
  formName: {
    type: String,
    required: true,
  },
  showRepassword: {
    type: Boolean,
    required: true,
  },
});

const handleSubmit = async () => {
  try {
    if (props.formName === "Login") {
      await userStore.access(email.value, password.value);
      router.push("/inicio");
      alert(`Bienvenido(a) al sistema 🐻‍❄️`, "positive");
    }
    if (props.formName === "Register") {
      await userStore.register(email.value, password.value, repassword.value);
      router.push("/login");
      alert(`Usuario creado exitosamente! 🦊`, "secondary");
    }

    email.value = "";
    password.value = "";
  } catch (error) {
    alert(`${error.message} 🙊`, "pink-9");
  }
};
</script>

<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-8 col-md-6">
      <h3 class="text-center q-pa-sm bg-info shadow-6">{{ props.formName }}</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          label="Ingrese Email"
          type="email"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Ingrese un email válido',
          ]"
          lazy-rules
        >
        </q-input>
        <q-input
          v-model="password"
          label="Ingrese Contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña minimo 6 caracteres',
          ]"
          lazy-rules
        ></q-input>
        <q-input
          v-if="props.showRepassword"
          v-model="repassword"
          label="Repita Contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val === password) || 'Las contraseñas deben ser iguales',
          ]"
          lazy-rules
        ></q-input>
        <div>
          <q-btn :label="props.formName" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>

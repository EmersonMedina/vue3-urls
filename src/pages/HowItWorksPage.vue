<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const step = ref(1);

const handleFinished = () => {
  // window.location.href = `${window.location.origin}/inicio`;
  router.push("/inicio");
};
</script>

<template>
  <div class="q-pa-md">
    <h1 class="title text-center bg-dark">NANO LINKS</h1>
    <h2 class="subtitle text-center bg-secondary">¿Cómo funciona?</h2>
    <q-stepper
      v-model="step"
      ref="stepper"
      vertical
      dark
      class="bg-grey-10"
      active-color="deep-orange"
      done-color="secondary"
      animated
    >
      <q-step :name="1" title="Registrate" icon="settings" :done="step > 1">
        Ingresa tu correo y contraseña para crear tu cuenta.
      </q-step>

      <q-step
        :name="2"
        title="Ingresa a la aplicación"
        caption="Mediante el Login"
        icon="create_new_folder"
        :done="step > 2"
      >
        Pon tus credenciales e ingresa.
      </q-step>

      <q-step
        :name="3"
        title="Crea tus URLs cortas"
        icon="add_comment"
        :done="step > 3"
      >
        Ingresa un nombre y un link, da click en crear y guarda tu link;
        posteriormente los puedes filtrar por nombre o por URL.
      </q-step>

      <q-step
        :name="4"
        title="Comparte tus URLs cortas"
        icon="add_comment"
        :done="step > 4"
      >
        Selecciona el link que deseas compartir, da click en el botón copiar y
        listo, obtienes un link corto listo para ser compartido.
      </q-step>

      <q-step
        :name="5"
        title="Administra tus URLs"
        icon="add_comment"
        :done="step > 5"
      >
        Puedes editar, crear y eliminar las URLs que desees.
      </q-step>

      <q-step :name="6" title="Extra" icon="add_comment" :done="step > 6">
        También puedes personalizar tu perfil, con la posibilidad de agregar un
        nombre y una imagen.
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step < 6"
            @click="$refs.stepper.next()"
            color="deep-orange"
            :label="'Continuar'"
          />
          <q-btn
            v-if="step > 5"
            @click="handleFinished"
            color="deep-orange"
            label="Finalizar"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="Volver"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<style scoped>
.title {
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0.5rem;
  border-radius: 2rem;
  color: white;
}

.subtitle {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
  border-radius: 2rem 2rem 0 0;
}

.text-center {
  text-align: center;
}
</style>

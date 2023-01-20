<script setup>
import { ref, watch } from "vue";
import { useURLStore } from "../stores/url-store";
import { useUserStore } from "src/stores/user-store";
import { useQuasar } from "quasar";
import { alert } from "src/utils/notifications";
import addUrl from "../components/FormUrl.vue";

const userStore = useUserStore();
const URLStore = useURLStore();
const $q = useQuasar();
const filterValue = ref("");
const currentPage = ref(1);
const medium = ref(false);

const deleteURL = async (id) => {
  $q.dialog({
    dark: true,
    title: "Importante",
    message: "¿Deseas eliminar la URL?",
    cancel: true,
  }).onOk(async () => {
    try {
      await URLStore.deleteURL(id);
      alert("URL borrada satisfactoriamente 🐶", "positive");
    } catch (error) {
      console.error(error);
      alert(error?.message, "pink-9");
    }
  });
};

const copyLink = async (nanoLink) => {
  try {
    const path = `${window.location.origin}/pblic/${nanoLink}`;
    await navigator.clipboard.writeText(path);
    alert("Nano Link copiado correctamente 🐶", "positive");
  } catch (error) {
    alert("Error al intentar copiar", "pink-9");
  }
};

const filterURLS = async (value) => {
  if (value.length != 0) {
    await URLStore.filterURLS(value);
  }

  if (value.length === 0) {
    await URLStore.getAllURLS();
  }
};

const verifyLinks = async () => {
  currentPage.value = URLStore.currentPage;

  if (userStore.isFirstView) {
    await URLStore.getAllURLS();

    const filter = JSON.stringify({
      totalPages: URLStore.totalPages,
      currentPage: URLStore.currentPage,
    });

    window.localStorage.setItem("filter", filter);

    userStore.isFirstView = false;
  }
};

watch(currentPage, async () => {
  URLStore.currentPage = currentPage.value;

  const newFilter = JSON.stringify({
    totalPages: URLStore.totalPages,
    currentPage: URLStore.currentPage,
  });

  window.localStorage.setItem("filter", newFilter);

  URLStore.startIn =
    URLStore.currentPage * URLStore.maxShowedLinks - URLStore.maxShowedLinks;

  await URLStore.getAllURLS();
});

verifyLinks();
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-10 col-md-8">
      <h3 style="margin: 1rem">Home</h3>
      <q-input
        v-model="filterValue"
        @update:modelValue="filterURLS"
        class="q-mb-sm"
        filled
        label="Buscar..."
      >
      </q-input>
      <q-btn
        class="q-mb-sm"
        label="NUEVO"
        color="primary"
        @click="medium = true"
      />
      <q-list bordered separato v-if="!URLStore.isLoadingUrls">
        <q-item
          clickable
          v-ripple
          v-for="item of URLStore.links"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label class="row justify-between items-center">
              {{ item.name }}

              <div class="btns">
                <q-btn
                  round
                  icon="delete"
                  style="background: #ff0080; color: white"
                  class="q-mr-sm"
                  @click="deleteURL(item._id)"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    Eliminar
                  </q-tooltip>
                </q-btn>

                <q-btn
                  round
                  color="purple"
                  icon="edit"
                  class="q-mr-sm"
                  :to="`/${item._id}`"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    Editar
                  </q-tooltip>
                </q-btn>

                <q-btn
                  round
                  color="secondary"
                  icon="file_copy"
                  class="q-mr-sm"
                  @click="copyLink(item.nanoLink)"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    Copiar
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-label>

            <q-item-label caption style="overflow: hidden">{{
              item.longLink
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Nuevo Link</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <addUrl v-if="!URLStore.isLoadingUrls" formName="AddURL" />
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-markup-table v-if="URLStore.isLoadingUrls">
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 5" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>

      <div class="q-pa-lg flex flex-center" v-if="!URLStore.isLoadingUrls">
        <q-pagination
          v-model="currentPage"
          color="purple"
          :max="URLStore.totalPages"
          :max-pages="URLStore.maxShowedPages"
          boundary-numbers
        />
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.btns {
  margin: 0.5rem 0;
}
</style>

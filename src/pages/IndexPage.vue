<script setup>
import { useURLStore } from "../stores/url-store";
import { alert } from "src/utils/notifications";
import addUrl from "../components/FormUrl.vue";
const URLStore = useURLStore();

const deleteURL = async (id) => {
  try {
    await URLStore.deleteURL(id);
    alert("URL borrada satisfactoriamente 🐶", "positive");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-10 col-md-8">
      <h3 style="margin: 1rem">Home</h3>
      <addUrl v-if="!URLStore.isLoadingUrls" formName="AddURL"></addUrl>
      <q-list bordered separato v-if="!URLStore.isLoadingUrls">
        <q-item
          clickable
          v-ripple
          v-for="item of URLStore.links"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label class="row justify-between">
              {{ item.nanoLink }}

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

                <q-btn round color="secondary" icon="file_copy" class="q-mr-sm">
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    Copiar
                  </q-tooltip>
                </q-btn>
              </div>
            </q-item-label>
            <q-item-label caption>{{ item.longLink }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

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
    </div>
  </q-page>
</template>

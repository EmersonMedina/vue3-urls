import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const useURLStore = defineStore("url", () => {
  const userStore = useUserStore();

  const links = ref([]);
  const isLoadingUrls = ref(false);
  const isLoadingUrl = ref(false);
  const isCreatingUrl = ref(true);

  const createURL = async (longLink) => {
    try {
      isCreatingUrl.value = true;
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      links.value.push(res.data.newLink);
    } catch (error) {
      console.log(error.response);
      if (error.response) throw error.response.data;
    } finally {
      isCreatingUrl.value = false;
    }
  };

  const getAllURLS = async () => {
    console.log("llamando a todos los links");
    try {
      isLoadingUrls.value = true;
      const res = await api({
        method: "GET",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      console.log(res.data);

      links.value = res.data.links;
    } catch (error) {
      console.error(error);
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      isLoadingUrls.value = false;
    }
  };

  const getURL = async (id) => {
    try {
      isLoadingUrl.value = true;
      const res = await api({
        method: "GET",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      return res.data?.link.longLink;
    } catch (error) {
      console.error(error);
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      isLoadingUrl.value = false;
    }
  };

  const updateURL = async (id, longLink) => {
    try {
      isLoadingUrl.value = true;
      const res = await api({
        method: "PATCH",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });

      links.value = links.value.map((link) =>
        link._id === id ? { ...link, longLink } : link
      );

      return res.data;
    } catch (error) {
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      isLoadingUrl.value = false;
    }
  };

  const deleteURL = async (id) => {
    try {
      isLoadingUrl.value = true;
      const res = await api({
        method: "DELETE",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = links.value.filter((link) => link._id != id);

      return res.data;
    } catch (error) {
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      isLoadingUrl.value = false;
    }
  };

  getAllURLS();

  return {
    createURL,
    getURL,
    updateURL,
    deleteURL,
    links,
    isLoadingUrls,
    isLoadingUrl,
  };
});

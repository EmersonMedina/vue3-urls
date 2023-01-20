import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { showDefaultLoading, hideLoading } from "src/utils/loadings";

export const useURLStore = defineStore("url", () => {
  const userStore = useUserStore();

  const links = ref([]);
  const isLoadingUrls = ref(false);
  const filter = ref("");
  const currentPage = ref(1);
  const totalPages = ref(0);
  const maxShowedLinks = ref(5);
  const maxShowedPages = ref(5);
  const startIn = ref(0);

  if (window.localStorage.getItem("filter")) {
    const currentFilter = JSON.parse(window.localStorage.getItem("filter"));

    currentPage.value = currentFilter.currentPage;
    totalPages.value = currentFilter.totalPages;

    startIn.value =
      currentPage.value * maxShowedLinks.value - maxShowedLinks.value;
  }

  const createURL = async (name, longLink) => {
    try {
      showDefaultLoading();
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          name,
          longLink,
        },
      });
      links.value.push(res.data.newLink);

      const { totalLinks } = res.data;

      totalPages.value = Math.ceil(totalLinks / maxShowedLinks.value);
    } catch (error) {
      console.log(error.response);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const getAllURLS = async () => {
    try {
      isLoadingUrls.value = true;
      const res = await api({
        method: "GET",
        url: `/links/limit/${startIn.value}/${maxShowedLinks.value}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = res.data.links;

      const { totalLinks } = res.data;

      totalPages.value = Math.ceil(totalLinks / maxShowedLinks.value);
    } catch (error) {
      console.error(error);
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      isLoadingUrls.value = false;
    }
  };

  const filterURLS = async (value) => {
    try {
      isLoadingUrls.value = true;
      const res = await api({
        method: "GET",
        url: `/links/filter/${value}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = res.data.links;

      const { totalLinks } = res.data;

      totalPages.value = Math.ceil(totalLinks / maxShowedLinks.value);
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
      showDefaultLoading();
      const res = await api({
        method: "GET",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      return res?.data;
    } catch (error) {
      console.error(error);
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const updateURL = async (id, name, longLink) => {
    try {
      showDefaultLoading();
      const res = await api({
        method: "PATCH",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          name,
          longLink,
        },
      });

      links.value = links.value.map((link) =>
        link._id === id ? { ...link, longLink, name } : link
      );

      return res.data;
    } catch (error) {
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const deleteURL = async (id) => {
    try {
      showDefaultLoading();
      const res = await api({
        method: "DELETE",
        url: `/links/${id}`,
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });

      links.value = links.value.filter((link) => link._id != id);

      const { totalLinks } = res.data;

      totalPages.value = Math.ceil(totalLinks / maxShowedLinks.value);

      return res.data;
    } catch (error) {
      console.log(error?.response);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  // getAllURLS();

  return {
    createURL,
    getURL,
    updateURL,
    deleteURL,
    getAllURLS,
    filterURLS,
    filter,
    links,
    currentPage,
    totalPages,
    maxShowedLinks,
    maxShowedPages,
    startIn,
    isLoadingUrls,
  };
});

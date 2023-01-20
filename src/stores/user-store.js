import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { showDefaultLoading, hideLoading } from "src/utils/loadings";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);
  const isFirstView = ref(true);
  const userInfo = ref(null);
  const URLProfileImage = ref("https://source.unsplash.com/random");
  const userName = ref(null);

  const register = async (email, password, confirmPassword) => {
    try {
      showDefaultLoading("Registrando...");
      const res = await api.post("/auth/register", {
        email,
        password,
        confirmPassword,
      });
    } catch (error) {
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const access = async (email, password) => {
    showDefaultLoading("Iniciando sesión...");
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = {
        name: res.data.name,
        email: res.data.email,
        photoURL: res.data.photoURL,
      };

      window.localStorage.setItem("userInfo", JSON.stringify(user));

      userInfo.value = user;

      URLProfileImage.value =
        user.photoURL === ""
          ? "https://source.unsplash.com/random"
          : user.photoURL;

      const fullName = user.name.split(" ");

      if (fullName.length > 1) userName.value = fullName[0] + " " + fullName[1];
      else userName.value = fullName[0];

      // userName.value = user.name === "" ? null : user.name;

      isFirstView.value = true;
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      window.localStorage.setItem("user", true);
      setTime();
    } catch (error) {
      console.log(error);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      token.value = null;
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("filter");
      isFirstView.value = false;
    }
  };

  const updateProfile = async (formData) => {
    try {
      showDefaultLoading("Actualizando usuario...");
      const headers = {
        Authorization: "Bearer " + token.value,
      };

      const res = await api.patch("/users/updateProfile", formData, {
        headers: headers,
      });

      const user = {
        name: res.data.name,
        email: res.data.email,
        photoURL: res.data.photoURL,
      };

      window.localStorage.setItem("userInfo", JSON.stringify(user));

      userInfo.value = user;

      if (user.photoURL === "")
        URLProfileImage.value = "https://source.unsplash.com/random";
      else URLProfileImage.value = user.photoURL;

      const fullName = user.name.split(" ");

      if (fullName.length > 1) userName.value = fullName[0] + " " + fullName[1];
      else userName.value = fullName[0];

      return res;
    } catch (error) {
      console.log(error);
      if (error.response) throw error.response.data;
    } finally {
      hideLoading();
    }
  };

  const refreshToken = async () => {
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      localStorage.setItem("user", true);
      setTime();
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };

  return {
    token,
    expiresIn,
    isFirstView,
    userInfo,
    URLProfileImage,
    userName,
    updateProfile,
    access,
    refreshToken,
    logout,
    register,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const register = async (email, password, confirmPassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        confirmPassword,
      });
    } catch (error) {
      if (error.response) throw error.response.data;
    }
  };

  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      localStorage.setItem("user", true);
      setTime();
    } catch (error) {
      if (error.response) throw error.response.data;
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      localStorage.removeItem("user");
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
    access,
    refreshToken,
    logout,
    register,
  };
});

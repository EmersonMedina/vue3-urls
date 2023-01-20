import { Notify } from "quasar";
import { Dialog } from "quasar";

export const alert = (message = "Error en el servidor", color) => {
  Notify.create({
    message: message,
    color,
    position: "top",
  });
};

export const dialog = (message) => {
  Dialog.create({
    dark: true,
    title: "Importante",
    message,
  });
};

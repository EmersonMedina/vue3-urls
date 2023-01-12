import { Notify } from "quasar";

export const alert = (message = "Error en el servidor", color) => {
  Notify.create({
    message: message,
    color,
    position: "top",
  });
};

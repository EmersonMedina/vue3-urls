import { Loading, QSpinnerHourglass } from "quasar";

export const showDefaultLoading = (message = "Cargando...") => {
  Loading.show({
    spinner: QSpinnerHourglass,
    message: message,
    messageColor: "black",
    pinnerColor: "black",
    spinnerSize: 140,
    backgroundColor: "gray",
  });
};

export const hideLoading = (message = "Cargando...") => {
  Loading.hide();
};

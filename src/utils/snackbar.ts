import { useSnackbar } from "notistack";

function success(message: string) {
  useSnackbar().enqueueSnackbar(message, { variant: 'success' });
}

function error(message: string) {
  useSnackbar().enqueueSnackbar(message, { variant: 'error' });
}
export default {success, error}
import { SnackbarAction, useSnackbar } from "notistack";

function success(message: string, action?: SnackbarAction) {
  useSnackbar().enqueueSnackbar(message, { variant: 'success', action });
}

function error(message: string, action?: SnackbarAction) {
  useSnackbar().enqueueSnackbar(message, { variant: 'error', action });
}

function warning(message: string, action?: SnackbarAction) {
  useSnackbar().enqueueSnackbar(message, { variant: 'warning', action });
}

function info(message: string, action?: SnackbarAction) {
  useSnackbar().enqueueSnackbar(message, { variant: 'info', action });
}

export default {success, error, warning, info};
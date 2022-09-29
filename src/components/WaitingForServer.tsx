import { CircularProgress, Stack, Typography } from "@mui/material";

export default function WaitingForServer() {
    return (
        <Stack>
            <CircularProgress />
            <Typography variant="caption">Waiting for the server to finish creating your account.</Typography>
        </Stack>
    );
}
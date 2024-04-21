import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box className="flex items-center justify-center min-h-screen min-w-full">
      <CircularProgress size={80} />
    </Box>
  );
}

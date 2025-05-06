import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
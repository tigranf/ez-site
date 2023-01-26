import { Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";

const Account = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <AnimatedPage>
      <Typography variant="h2">
        Account settings page for {user ? user.username : "NO USER"}
      </Typography>
    </AnimatedPage>
  );
};

export default Account;

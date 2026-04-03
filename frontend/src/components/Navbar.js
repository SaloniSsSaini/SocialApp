import { AppBar, Toolbar, Typography, IconButton,} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>

        {/* 🔥 LOGO */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SocialApp 🚀
        </Typography>

        {/* 🏠 HOME */}
        <IconButton color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>

        {/* 👤 PROFILE */}
        <IconButton color="inherit" onClick={() => navigate("/profile")}>
          <PersonIcon />
        </IconButton>

        {/* 🔓 LOGOUT */}
        <IconButton color="inherit" onClick={logout}>
          <LogoutIcon />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}
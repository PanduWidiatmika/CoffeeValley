import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Link as MuiLink, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CoffeeIcon from "@mui/icons-material/Coffee";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const today = new Date().toDateString();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const username = sessionStorage.getItem("username");
      if (!username) {
        router.push("/login");
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("username");

    router.push("/login");
  };

  return (
    <div className="layout-container">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <CoffeeIcon sx={{ fontSize: "30px", color: "white" }} />
            Coffee Valley
          </Typography>
          <Button sx={{ color: "white", display: { xs: "flex", md: "none" } }} onClick={() => (window.location.href = "/")}>
            <img src="your-logo.svg" alt="Logo" width={32} height={32} />
          </Button>
          <MuiLink underline="none" color="inherit" href="/home">
            Home
          </MuiLink>
          <MuiLink underline="none" color="inherit" href="/catalogue">
            Catalogue
          </MuiLink>
          <MuiLink underline="none" color="inherit" href="/">
            Order Status
          </MuiLink>
          <MuiLink underline="none" color="inherit" href="/distributor">
            Distributor
          </MuiLink>
          <MuiLink underline="none" color="inherit" href="/upload">
            Upload
          </MuiLink>
          <Button variant="text" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <Typography variant="body2" color="text.secondary" align="center">
          Coffee Valley &copy; {today}
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;

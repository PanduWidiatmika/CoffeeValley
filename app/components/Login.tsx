"use client";
import React, { useState } from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import CoffeeIcon from "@mui/icons-material/Coffee";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isLoginSuccessful = username === "adm" && password === "password";

    if (isLoginSuccessful) {
      console.log("Login successful!");
      sessionStorage.setItem("username", username);
      toast.success("Login success!", {
        theme: "light",
        transition: Bounce,
        autoClose: 3000,
        closeButton: true,
      });
      router.push("/users");
    } else {
      console.log("Login failed.");
      toast.warn("Credentials incorrect!", {
        theme: "light",
        transition: Bounce,
        autoClose: 3000,
        closeButton: true,
      });
      return;
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Card sx={{ maxWidth: 450 }} variant="outlined">
        <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <CoffeeIcon sx={{ fontSize: "50px", color: "brown" }} />
          <h1 style={{ textAlign: "center", color: "brown" }}>Coffee Valley</h1>
          <h2 style={{ textAlign: "center", marginTop: "-15px", marginBottom: "-5px" }}>Login</h2>
          <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
            <TextField label="User ID" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" fullWidth required />
            <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" fullWidth required />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;

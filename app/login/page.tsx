"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "../components/Login";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();

  useEffect(() => {
    const username = sessionStorage.getItem("username");

    if (username !== null) {
      router.push("/users");
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Login />
    </div>
  );
};

export default LoginPage;

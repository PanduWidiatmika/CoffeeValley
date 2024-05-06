"use client";
import LoginPage from "./login/page";
import HomePage from "./home/page";

export default function Home() {
  const username = sessionStorage.getItem("username");
  return username !== null ? <HomePage /> : <LoginPage />;
}

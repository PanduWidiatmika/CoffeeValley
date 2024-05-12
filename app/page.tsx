// "use client";
// import LoginPage from "./login/page";
// import HomePage from "./home/page";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   if (typeof window !== "undefined" && window.sessionStorage) {
//     const username = sessionStorage.getItem("username");
//     return username !== null ? <HomePage /> : <LoginPage />;
//   } else {
//     router.push("/login");
//     return null;
//   }
// }

"use client";
import LoginPage from "./login/page";
import HomePage from "./home/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const username = sessionStorage.getItem("username");
      if (username) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }
  }, []);

  return null;
}

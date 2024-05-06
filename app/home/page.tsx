"use client";
import React, { useState, useEffect } from "react";
import { Coffee } from "../api/_utilities/types";
import BeanOfTheDay from "../components/BeanOfTheDay";
import Layout from "../components/Layout";

export default function HomePage() {
  const [data, setData] = useState<Coffee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/coffee");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setData(data.results[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <BeanOfTheDay data={data} />
    </Layout>
  );
}

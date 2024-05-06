"use client";
import React, { useState, useEffect } from "react";
import { Distributor } from "../api/_utilities/types";
import Layout from "../components/Layout";
import DistributorTableComponent from "../components/DistributorTable";

export default function DistributorPage() {
  const [data, setData] = useState<Distributor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/distributors");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setData(data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <DistributorTableComponent data={data} />
    </Layout>
  );
}

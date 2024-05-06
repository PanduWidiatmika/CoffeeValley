// /distributor/[id].tsx

"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import EditForm from "@/app/components/EditDistributor";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface DistributorData {
  id: string;
  distributor_name: string;
  city: string;
  region: string;
  phone: string;
  email: string;
}

export default function DistributorPage() {
  const [data, setData] = useState<DistributorData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/distributors/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch distributor data");
        }

        const distributorData = await res.json();
        setData(distributorData.results[0]);
      } catch (error) {
        console.error("Error fetching distributor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p>Loading distributor data...</p>;
  }

  if (!data) {
    return <p>Distributor not found.</p>;
  }

  const handleFormSubmit = async (values: { distributor_name: string; city: string; region: string; phone: string; email: string }) => {
    console.log("Form submitted with values:", values);

    try {
      const response = await fetch(`/api/distributors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to update distributor: ${await response.text()}`);
      }

      console.log("Distributor data updated successfully!");
      router.push(`/distributor`);
    } catch (error) {
      console.error("Error updating distributor data:", error);
    }
  };

  return (
    <Layout>
      <EditForm initialValues={data} onSubmit={handleFormSubmit} />
    </Layout>
  );
}

// /distributor/[id].tsx

"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/navigation";
import AddForm from "@/app/components/AddDistributor";

export default function DistributorPage() {
  const router = useRouter();

  const handleFormSubmit = async (values: { distributor_name: string; city: string; region: string; phone: string; email: string }) => {
    console.log("Form submitted with values:", values);

    try {
      const response = await fetch(`/api/distributors`, {
        method: "POST",
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
      <AddForm onSubmit={handleFormSubmit} />
    </Layout>
  );
}

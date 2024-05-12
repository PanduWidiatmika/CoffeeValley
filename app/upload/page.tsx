"use client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UploadFormUI from "../components/Upload";
import UploadTableComponent from "../components/UploadTable";
import { Upload } from "../api/_utilities/types";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<Upload[]>([]);

  const handleFormSubmit = async (formData: FormData) => {
    setUploadStatus("uploading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        console.log("File uploaded successfully!");
        setUploadStatus("success");
      } else {
        console.error("Upload failed:", data.data);
        setErrorMessage(data.data || "Upload failed - Please check server logs for details");
        setUploadStatus("failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setUploadStatus("failed");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/upload");
        if (!res.ok) {
          throw new Error("Failed to fetch uploads");
        }
        const data = await res.json();

        setData(data.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {uploadStatus === "idle" && (
        <>
          <UploadFormUI onSubmit={handleFormSubmit} title={title} author={author} onTitleChange={handleTitleChange} onAuthorChange={handleAuthorChange} />
          <br />
          <UploadTableComponent data={data} />
        </>
      )}
      {uploadStatus === "uploading" && <p>Uploading document...</p>}
      {uploadStatus === "success" && <p>File uploaded successfully!</p>}
      {uploadStatus === "failed" && (
        <div>
          <p style={{ color: "red" }}>Upload Failed!</p>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </Layout>
  );
}

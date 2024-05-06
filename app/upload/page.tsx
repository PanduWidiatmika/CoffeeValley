"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import UploadFormUI from "../components/Upload";

export default function HomePage() {
  return (
    <Layout>
      <UploadFormUI />
    </Layout>
  );
}

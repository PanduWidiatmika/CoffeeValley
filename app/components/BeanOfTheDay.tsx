"use client";
import React from "react";
import { Card, CardContent } from "@mui/material";

const BeanOfTheDay: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <h2>Bean of the day</h2>
        <span style={{ fontSize: "20px" }}>{data.bean}</span>
        <h2>Sale Price</h2>
        <span style={{ fontSize: "20px" }}>${data.price}</span>
        <h2>Description</h2>
        <span style={{ fontSize: "20px" }}>{data.description}</span>
      </CardContent>
    </Card>
  );
};

export default BeanOfTheDay;

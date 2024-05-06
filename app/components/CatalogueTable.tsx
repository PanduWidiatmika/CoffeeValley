"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent } from "@mui/material";
import { Coffee } from "../api/_utilities/types";
import Skeleton from "@mui/material/Skeleton";

const CatalogueTableComponent: React.FC<{ data: Coffee[] }> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ backgroundColor: "lightgray" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Bean</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.bean}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>${row.price}.00</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CatalogueTableComponent;

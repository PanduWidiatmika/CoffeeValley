"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent } from "@mui/material";
import { Distributor } from "../api/_utilities/types";
import Skeleton from "@mui/material/Skeleton";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/navigation";
import AddBoxIcon from "@mui/icons-material/AddBox";

const DistributorTableComponent: React.FC<{ data: Distributor[] }> = ({ data }) => {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/distributor/${id}`);
  };

  const handleAdd = () => {
    router.push(`/distributor/add-distributor`);
  };

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ backgroundColor: "lightgray" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Distributor Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell></TableCell>
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
                    <TableCell>{row.distributor_name}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleEdit(row.id)}>
                        <CreateIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" style={{ margin: "20px" }} onClick={() => handleAdd()}>
            <AddBoxIcon />
          </Button>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default DistributorTableComponent;

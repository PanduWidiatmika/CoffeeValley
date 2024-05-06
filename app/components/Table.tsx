"use client";
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent } from "@mui/material";
import { User } from "../api/_utilities/types";
import Skeleton from "@mui/material/Skeleton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";

const TableComponent: React.FC<{ data: User[] }> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Users</h1>
          <Button variant="contained" color="primary" style={{ margin: "20px" }}>
            <AddBoxIcon />
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ backgroundColor: "lightgray" }}>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="center">Action</TableCell>
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
                    <TableCell component="th" scope="row" align="right">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success">
                        <CreateIcon />
                      </Button>
                      <Button sx={{ marginLeft: "10px" }} variant="contained" color="error">
                        <DeleteIcon />
                      </Button>
                    </TableCell>
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

export default TableComponent;

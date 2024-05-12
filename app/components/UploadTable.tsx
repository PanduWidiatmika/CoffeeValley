import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card, CardContent, Typography } from "@mui/material";
import { Upload } from "../api/_utilities/types";
import Skeleton from "@mui/material/Skeleton";
import { Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const UploadTableComponent: React.FC<{ data: Upload[] }> = ({ data }) => {
  const router = useRouter();

  const downloadFile = (base64data: string, fileName: string, fileExtension: string) => {
    const byteCharacters = atob(base64data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + fileExtension;
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  const handleDownload = (id: number, title: string) => () => {
    fetch(`/api/upload/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to download file");
        }

        const results = await response.json();

        const base64data = results.data;
        const fileExtension = results.fileExtension;
        downloadFile(base64data, title, fileExtension);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <Card sx={{ padding: "20px" }}>
      <CardContent>
        <Typography sx={{ marginBottom: "20px", fontWeight: "bold", fontSize: "20px" }}>Uploads</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ backgroundColor: "lightgray" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 && (
                <>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.author}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="info" onClick={handleDownload(row.id, row.title)}>
                          <Download />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              {data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default UploadTableComponent;

import React from "react";
import { Typography, Button, IconButton, InputAdornment, TextField } from "@mui/material";

const UploadFormUI = () => {
  return (
    <form>
      <Typography variant="h6">Upload Document</Typography>
      <TextField label="Title" margin="normal" fullWidth />
      <input type="file" style={{ display: "none" }} />
      <Button variant="contained" component="label" fullWidth>
        Upload Document
        <input type="file" hidden accept=".pdf,.docx,.txt" />
        <span style={{ marginLeft: 10 }}>No file chosen</span>
      </Button>
      <TextField label="Author" margin="normal" fullWidth />
      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default UploadFormUI;

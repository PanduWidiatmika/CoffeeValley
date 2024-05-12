import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";

interface UploadFormUIProps {
  onSubmit: (formData: FormData) => void;
  title: string;
  author: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadFormUI: React.FC<UploadFormUIProps> = ({ onSubmit, title, author, onTitleChange, onAuthorChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected for upload!");
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("author", author);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "10px" }}>
        Upload Document
      </Typography>
      <TextField label="Title" margin="normal" fullWidth name="title" value={title} onChange={onTitleChange} required />
      <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} />
      <label htmlFor="file-input">
        <Button variant="contained" component="span" fullWidth>
          Upload Document
        </Button>
      </label>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <TextField label="Author" margin="normal" fullWidth name="author" value={author} onChange={onAuthorChange} required />
      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default UploadFormUI;

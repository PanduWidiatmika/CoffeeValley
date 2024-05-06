import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";

const cities = [
  { value: "Brisbane", label: "Brisbane" },
  { value: "Bali", label: "Bali" },
];

interface EditFormProps {
  initialValues?: { distributor_name: string; city: string; region: string; phone: string; email: string };
  onSubmit: (values: { distributor_name: string; city: string; region: string; phone: string; email: string }) => void;
}

const EditForm: React.FC<EditFormProps> = ({ initialValues, onSubmit }) => {
  const [distributor_name, setName] = useState(initialValues?.distributor_name || "");
  const [city, setCity] = useState(initialValues?.city || "");
  const [region, setRegion] = useState(initialValues?.region || "");
  const [phone, setPhone] = useState(initialValues?.phone || "");
  const [email, setEmail] = useState(initialValues?.email || "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ distributor_name, city, region, phone, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Distributor Name" variant="outlined" value={distributor_name} onChange={(event) => setName(event.target.value)} fullWidth margin="normal" required />
      <FormControl fullWidth margin="normal">
        <InputLabel id="city-label">City</InputLabel>
        <Select required labelId="city-label" id="city" value={city} label="City" onChange={(event) => setCity(event.target.value)}>
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="State/region" variant="outlined" value={region} onChange={(event) => setRegion(event.target.value)} fullWidth margin="normal" required />
      <TextField label="Phone" variant="outlined" value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth margin="normal" required />
      <TextField type="email" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary">
        Save Changes
      </Button>
    </form>
  );
};

export default EditForm;

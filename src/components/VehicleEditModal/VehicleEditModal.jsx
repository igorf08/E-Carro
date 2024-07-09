/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const VehicleEditModal = ({ open, onClose, vehicle, onSave }) => {
  const [formData, setFormData] = useState(vehicle);

  useEffect(() => {
    setFormData(vehicle);
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://ecarro-db.vercel.app/veiculos/${vehicle.id}`, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to update vehicle:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', md: '40%' },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Editar veículo
        </Typography>
        <TextField
          label="Marca"
          name="marca"
          value={formData.marca || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Modelo"
          name="modelo"
          value={formData.modelo || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ano"
          name="ano"
          value={formData.ano || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Preço"
          name="preco"
          value={formData.preco || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cor"
          name="cor"
          value={formData.cor || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quilometragem"
          name="quilometragem"
          value={formData.quilometragem || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Placa"
          name="placa"
          value={formData.placa || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cidade"
          name="cidade"
          value={formData.cidade || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VehicleEditModal;

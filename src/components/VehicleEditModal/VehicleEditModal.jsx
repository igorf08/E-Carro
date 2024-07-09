/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, IconButton, Stack, Grid, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const handlePhotoDelete = (index) => {
    const updatedPhotos = [...formData.fotos];
    updatedPhotos.splice(index, 1);
    setFormData((prev) => ({ ...prev, fotos: updatedPhotos }));
  };

  const handlePhotoUpload = (e) => {
    const newPhotos = [...formData.fotos, ...Array.from(e.target.files)];
    setFormData((prev) => ({ ...prev, fotos: newPhotos }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://db-e-carro.vercel.app/veiculos/${vehicle.id}`, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar o veículo:", error);
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

        {formData.fotos && (
          <Grid container spacing={1} mt={2}>
            {formData.fotos.map((photo, index) => (
              <Grid item key={index}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img src={photo} alt={`Photo ${index}`} width={100} height={100} />
                  <IconButton onClick={() => handlePhotoDelete(index)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}

        <Input sx={{mt: 2}} type="file" onChange={handlePhotoUpload} multiple />

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

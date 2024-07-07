import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Box, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState, useEffect } from "react";
import VehicleDetailsModal from "../VehicleDetailsModal/VehicleDetailsModal";
import { formatters } from "../../utils/formatters";

const MediaCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [view, setView] = useState('grid');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://igorf08.github.io/souEnergy-DB/db.json');
      const data = await response.json();
      setVehicles(data.veiculos);
    };
    fetchData();
  }, []);

  const handleViewChange = (nextView) => {
    setView(nextView);
  };

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);

    //Faz o incremento das visualizações do veículo com base no selecionado.
    const updatedVehicles = vehicles.map(v => {
      if (v.id === vehicle.id) ({ ...v, numeroVisualizacoes: v.numeroVisualizacoes + 1 })
      
      return v;
    });
    setVehicles(updatedVehicles);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: '2em', backgroundColor: '#f6f6f6' }}>
      <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
        <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} aria-label="view toggle">
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box
        sx={{ display: 'flex', flexDirection: view === 'grid' ? 'row' : 'column', flexWrap: view === 'grid' ? 'wrap' : 'nowrap', gap: '2em', justifyContent: 'center' }}>
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} sx={{ backgroundColor: 'primary.light', maxWidth: view === 'grid' ? 300 : '100%', marginBottom: 2, boxShadow: 2 }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%' }} >
              <CardMedia sx={{ boxShadow: 1, height: view === 'grid' ? 200 : 400 }} component="img" image={vehicle.fotos[0]} />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
                <Typography sx={{ mb: '0.2em' }} variant={view === 'grid' ? 'h5' : 'h2'} component="div">
                  {vehicle.marca} {vehicle.modelo}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'h6'} color="text">
                  {formatters.currencyFormatter(vehicle.preco)}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Ano: {vehicle.ano}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Cor: {vehicle.cor}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Placa: {vehicle.placa}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Cidade: {vehicle.cidade}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Quilometragem: {vehicle.quilometragem}km
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Data de Cadastro: {formatters.formatDate(vehicle.dataCadastro)}
                </Typography>
                <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text.secondary">
                  Nº de visualizações: {vehicle.numeroVisualizacoes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleOpenModal(vehicle)} sx={{ fontSize: view === 'grid' ? '1em' : '1.2em' }} color="secondary">
                  Ir para o anúncio
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default MediaCard;

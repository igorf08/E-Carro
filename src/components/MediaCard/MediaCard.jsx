import { useEffect, useState } from 'react';
import VehicleDetailsModal from "../VehicleDetailsModal/VehicleDetailsModal";
import { formatters } from "../../utils/formatters";
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Box, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const MediaCard = () => {
  const [view, setView] = useState('grid');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
      const fetchData = () => {
        fetch('https://db-e-carro.vercel.app/veiculos')
          .then((response) => response.json())
          .then((data) => {
            setVehicles(data)
            setLoading(false)
          })
          .catch((error) => console.error('Erro ao buscar veículos:', error));
        };
        
        fetchData();
      }, []);  

  const handleViewChange = (event, nextView) => {
    setView(nextView);
  };

  const handleOpenModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);

    const updatedVehicles = vehicles.map(v => {
      if (v.id === vehicle.id) {
        return { ...v, numero_visualizacoes: (v.numero_visualizacoes || 0) + 1 };
      }
      return v;
    });
    setVehicles(updatedVehicles);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: '2em' }}>
      {loading ? (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Stack direction="row" spacing={2} justifyContent="left" mb={4}>
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
            sx={{ display: 'flex', flexDirection: view === 'grid' ? 'row' : 'column', flexWrap: view === 'grid' ? 'wrap' : 'nowrap', gap: { xs: '1em', md: '2em' }, justifyContent: 'center' }}>
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} sx={{ maxWidth: view === 'grid' ? { xs: 145, md: 250 } : '100%', marginBottom: 2, boxShadow: 2 }}>
                <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%' }} >
                  <CardMedia sx={{ boxShadow: 1, height: view === 'grid' ? 200 : 400, width: '100%' }} component="img" image={vehicle.fotos[0]} />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: { xs: '0.5em', md: '0.3em' } }}>
                    <Typography sx={{ mb: '0.2em' }} variant={view === 'grid' ? 'h6' : 'h2'} component="div">
                      {vehicle.marca} {vehicle.modelo}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'h6'} sx={{ fontWeight: '600' }} color="text">
                      {formatters.currencyFormatter(parseInt(vehicle.preco))}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Ano: {vehicle.ano}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Cor: {vehicle.cor}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Placa: {vehicle.placa}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Cidade: {vehicle.cidade}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Quilometragem: {vehicle.quilometragem}km
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Data de Cadastro: {formatters.formatDate(vehicle.data_cadastro)}
                    </Typography>
                    <Typography variant={view === 'grid' ? 'body2' : 'body1'} color="text">
                      Nº de visualizações: {vehicle.numero_visualizacoes}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleOpenModal(vehicle)} sx={{ fontSize: view === 'grid' ? '0.9em' : '1.2em' }} color="secondary">
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
        </>
      )}
    </Box>
  );
};

export default MediaCard;
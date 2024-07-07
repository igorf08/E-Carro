import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions, Box, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState, useEffect } from "react";

const MediaCard = () => {

  const [vehicles, setVehicles] = useState(null);
  const [view, setView] = useState('grid');

  useEffect(() => {
    (async () => {
      const response = await fetch('https://igorf08.github.io/souEnergy-DB/db.json');
      const data = await response.json();
      setVehicles(data.veiculos);
    })();
  });

  const formatters = {

    currencyFormatter: (num) => {
      return num.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
    },
    formatDate: (dateStr) => {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date);
    }
  }

  const handleViewChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <Box sx={{ p: '2em', backgroundColor: '#f6f6f6' }}>
      <Stack direction="row" spacing={2} justifyContent="center" mb={4}>
        <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} aria-label="view toggle" >
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
        {vehicles &&
          vehicles.map((vehicle) => (
            <Card key={vehicle.id} sx={{ backgroundColor: 'primary.light', maxWidth: view === 'grid' ? 300 : '100%', marginBottom: 2, boxShadow: 2 }}>
              <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%' }} >
                <CardMedia sx={{ boxShadow: 1, h: '1em', height: view === 'grid' ? 200 : 400 }} component="img" image={vehicle.fotos[0]} />
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
                  <Typography variant={view === 'grid' ? 'body3' : 'body1'} color="text.secondary">
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
                </CardContent>
                <CardActions>
                  <Button sx={{ fontSize: view === 'grid' ? '1em' : '1.2em' }} color="secondary">
                    Ir para o anúncio
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default MediaCard;

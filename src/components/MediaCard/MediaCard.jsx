import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";

const MediaCard = () => {
  
  const [vehicles, setVehicles] = useState(null);

  useEffect(() => {
    (async () => {
        const response = await fetch('https://igorf08.github.io/souEnergy-DB/db.json');
        const data = await response.json();
        setVehicles(data.veiculos);})();
  });

  const formatters = {
    
    currencyFormatter: (num) => {
      return num.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'})
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

  return (
    <Box sx={{backgroundColor: '#f6f6f6', display: 'flex', flexWrap: 'wrap', gap: {xs: '6em', md: '5em', lg: '4em'}, p: '2em', justifyContent: 'center'}}>
      {vehicles && vehicles.map((vehicle) => (
          <Card key={vehicle.id} sx={{backgroundColor: 'primary.light' ,maxWidth: 250, marginBottom: 2, marginTop: 2, boxShadow: 2}}>
            <CardActionArea sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%'}}>
              <CardMedia
                sx={{boxShadow: 1}}
                component="img"
                height="200"
                image={vehicle.fotos[0]}
                />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.3em' }}>
              <Typography sx={{ mb: '0.2em' }} variant="h3" component="div">
                {vehicle.marca} {vehicle.modelo}
              </Typography>
              <Typography variant="body1" color="text">
                {formatters.currencyFormatter(vehicle.preco)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ano: {vehicle.ano}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cor: {vehicle.cor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Placa: {vehicle.placa}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cidade: {vehicle.cidade}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quilometragem: {vehicle.quilometragem}km
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data de Cadastro: {formatters.formatDate(vehicle.dataCadastro)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button sx={{ fontFamily: "roboto" }} size="medium" color="secondary">Ir para o anúncio</Button>
            </CardActions>
          </CardActionArea>
        </Card>
        ))}
      </Box>
    );
};

export default MediaCard;

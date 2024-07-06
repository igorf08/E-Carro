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
  
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: {xs: '6em', md: '5em', lg: '4em'}, p: '2em', justifyContent: 'center'}}>
      {vehicles && vehicles.map((vehicle) => (
          <Card key={vehicle.id} sx={{ maxWidth: 250, marginBottom: 2, marginTop: 2}}>
            <CardActionArea sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', height: '100%'}}>
              <CardMedia
                component="img"
                height="200"
                image={vehicle.fotos[0]}
                />
              <CardContent sx={{backgroundColor: 'primary.light', flexGrow: 1}}>
                <Typography sx={{mb: '0.2em'}} variant="h3" component="div">
                  {vehicle.marca} {vehicle.modelo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ano: {vehicle.ano}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Preço: R${vehicle.preco}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quilometragem: {vehicle.quilometragem}km
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
                  Visualizações: {vehicle.numeroVisualizacoes}
                </Typography>
              </CardContent>
              <CardActions>
                <Button sx={{ fontFamily: "roboto" }} size="small" color="secondary">
                  Ir para o anúncio
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    );
};

export default MediaCard;

import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

const defaultTheme = createTheme();

export default function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  const onSubmit = (data) => {
    const body = {
      id: `${Math.random().toString(16).slice(2)}id`,
      marca: data.carBrand,
      modelo: data.carModel,
      ano: data.carYear,
      preco: data.carPrice,
      cor: data.carColor,
      quilometragem: data.carMileage,
      placa: data.carPlate,
      cidade: data.carCity,
      fotos: base64Files,
      dataCadastro: new Date().toISOString(),
      numeroVisualizacoes: 0
    };

    console.log('Form data:', body);

    fetch('http://localhost:3000/veiculos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        reset();
        setSelectedFiles([]);
        setBase64Files([]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Criar um novo anúncio
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.carBrand}
                  id="brand"
                  required
                  fullWidth
                  name="carBrand"
                  label="Marca"
                  autoFocus
                  helperText={errors.carBrand?.message}
                  {...register('carBrand', {
                    required: 'Insira a marca do veículo!',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Somente letras são permitidas!',
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.carModel}
                  required
                  fullWidth
                  name="carModel"
                  label="Modelo"
                  id="model"
                  helperText={errors.carModel?.message}
                  {...register('carModel', {
                    required: 'Insira o modelo do veículo!',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carYear}
                  type="number"
                  step="1"
                  required
                  fullWidth
                  id="carYear"
                  label="Ano do veículo"
                  name="year"
                  helperText={errors.carYear?.message}
                  {...register('carYear', {
                    required: 'Insira o ano do veículo!',
                    validate: (value) => {
                      if (value < 1930 || value > 2025 || value.length > 4) {
                        return 'Ano inválido.';
                      }
                      return true;
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carColor}
                  required
                  fullWidth
                  name="carColor"
                  label="Cor do veículo"
                  id="carColor"
                  helperText={errors.carColor?.message}
                  {...register('carColor', {
                    required: 'Insira a cor do veículo!',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Somente letras são permitidas!',
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carPrice}
                  required
                  fullWidth
                  name="carPrice"
                  label="Valor do veículo"
                  id="carPrice"
                  helperText={errors.carPrice?.message}
                  {...register('carPrice', {
                    required: 'Insira o preço desejado!',
                    pattern: {
                      value: /^[0-9\s]+$/,
                      message: 'Somente números são permitidos!',
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carMileage}
                  required
                  fullWidth
                  name="carMileage"
                  label="Quilometragem do veículo"
                  id="carMileage"
                  helperText={errors.carMileage?.message}
                  {...register('carMileage', {
                    required: 'Insira a quilometragem!',
                    pattern: {
                      value: /^[0-9\s]+$/,
                      message: 'Somente números são permitidos!',
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carPlate}
                  required
                  fullWidth
                  name="carPlate"
                  label="Placa do veículo"
                  id="carPlate"
                  helperText={errors.carPlate?.message}
                  {...register('carPlate', {
                    required: 'Insira a placa do veículo!',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carCity}
                  required
                  fullWidth
                  name="carCity"
                  label="Cidade"
                  id="carCity"
                  helperText={errors.carCity?.message}
                  {...register('carCity', {
                    required: 'Insira a cidade do veículo!',
                  })}
                />
              </Grid>
              <Box sx={{ p: 2 }}>
                <input
                  type="file"
                  name="carPhotos"
                  multiple
                  {...register('carPhotos', {
                    required: 'Insira as fotos do veículo!'
                  })}
                />
              </Box>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar anúncio
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

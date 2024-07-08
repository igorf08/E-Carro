import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "../styles/create.css"

const defaultTheme = createTheme();

export default function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    console.log('form data is ', formData);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Criar um novo anúncio
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.carBrand}
                  name="brand"
                  required
                  fullWidth
                  id="carBrand"
                  label="Marca"
                  autoFocus
                  helperText={errors.carBrand?.message}
                  {...register('carBrand', {
                    required: 'Insira a marca do veículo!',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Somente letras são permitidas!'
                    }
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={!!errors.carModel}
                  required
                  fullWidth
                  id="carModel"
                  label="Modelo"
                  name="model"
                  helperText={errors.carModel?.message}
                  {...register('carModel', { required: 'Insira o modelo do veículo!' })}
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
                  {...register('carYear', { required: 'Insira o ano do veículo!', 
                    validate: value => {
                      if (value < 1930 || value > 2025 || value.length > 4) {
                        return 'Ano inválido.'
                      }
                      return true;
                    }
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
                  {...register('carColor', { required: 'Insira a cor do veículo!', 
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Somente letras são permitidas!'
                    }
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
                  {...register('carPrice', { required: 'Insira o preço desejado!', 
                    pattern: {
                      value: /^[0-9\s]+$/,
                      message: 'Somente números são permitidos!'
                    }
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
                  {...register('carMileage', { required: 'Insira a quilometragem!', 
                    pattern: {
                      value: /^[0-9\s]+$/,
                      message: 'Somente números são permitidos!'
                    }
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
                  {...register('carPlate', { required: 'Insira a placa do veículo!' })}
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
                  {...register('carCity', { required: 'Insira a cidade do veículo!' })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!!errors.carPhotos}
                  fullWidth
                  name="carPhotos"
                  label="Insira suas fotos"
                  id="carPhotos"
                  helperText={errors.carPhotos?.message}
                  {...register('carPhotos', { required: 'Insira as fotos do veículo!' })}
                />
              </Grid>
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

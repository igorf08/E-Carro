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
import { useNavigate } from 'react-router-dom'
import { Alert, Snackbar } from '@mui/material';
const defaultTheme = createTheme();
export default function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const body = {
      id: `${Math.random().toString(16).slice(2)}id`,
      marca: data.carBrand,
      modelo: data.carModel,
      ano: data.carYear,
      preco: data.carPrice,
      cor: data.carColor,
      quilometragem: data.carMileage,
      placa: data.carPlate.toUpperCase(),
      cidade: data.carCity,
      fotos: base64Files,
      data_cadastro: new Date().toISOString(),
      numero_visualizacoes: 0
    };
    fetch('https://db-e-carro.vercel.app/veiculos', {
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
        setOpen(true)
        setTimeout(() => {
          navigate("/", { replace: true }) 
          setOpen(false);
        }, 5000)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const onUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const validFiles = files.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });
  
    if (validFiles.length < 2) {
      console.error('É necessário enviar pelo menos 2 fotos em formatos png, jpg ou jpeg.');
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result
        setBase64Files(prevBase64Files => [...prevBase64Files, base64String]);
        console.log(base64Files);
      };
      reader.onerror = (error) => {
        console.error('Error:', error);
      };
    });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{pl: 2, pt: 1, width: '100vw', height: '10vh'}}>
              <Button variant='contained' onClick={() => navigate("/administracao", { replace: true }) }>Voltar</Button>
          </Box>
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
                    validate: (value) => {
                      if (value.length < 2 || value.length > 30) {
                        return 'A marca deve entre 2 e 30 letras.'
                      }
                    }
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
                    validate: (value) => {
                      if (value.length < 2 || value.length > 30) {
                        return 'O modelo deve entre 2 e 30 letras.'
                      }
                    }
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
                  label="Km do veículo"
                  id="carMileage"
                  helperText={errors.carMileage?.message}
                  {...register('carMileage', {
                    required: 'Insira o km!',
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
                    pattern: {
                      value: /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/,
                      message: 'Número de placa inválido.'
                    },
                    validate: (value) => {
                      if (value.length < 7 || value.length > 7) {
                        return 'Número de placa inválido.';
                      }
                      return true;
                    }
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
              <Box sx={{display: 'flex', flexDirection: 'column', p: 2, gap: 1.5 }}>
                
                <input
                  type="file"
                  id="carPhotos"
                  name="carPhotos"
                  multiple
                  {...register('carPhotos', {
                    required: 'Insira as fotos do veículo!',
                    validate: {
                      minFiles: files => files.length >= 2 || 'É necessário enviar pelo menos 2 fotos.',
                      validExtensions: files => {
                        const allowedExtensions = ['png', 'jpg', 'jpeg'];
                        return Array.from(files).every(file => 
                          allowedExtensions.includes(file.name.split('.').pop().toLowerCase())
                        ) || 'Apenas arquivos png, jpg ou jpeg são permitidos.';
                      }
                    }
                  })}
                  onChange={onUpload}
                />
                {errors.carPhotos && <span>{errors.carPhotos.message}</span>}
              </Box>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Enviar anúncio
            </Button>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert 
          onClose={open}
          severity="success"
          variant="filled">
            Anúncio criado, redirecionando em 5 segundos...
          </Alert>
      </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
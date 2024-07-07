/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from "@mui/material";
import { formatters } from "../../utils/formatters";
import CmpntCarousel from "../Carousel/Carousel";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const VehicleDetailsModal = ({ vehicle, open, onClose }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={open} onClose={handleClose}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', maxWidth: '95%', maxHeight: '95%', 
                      overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 3}}>
                <Typography variant="h4" sx={{mb:2}}>{vehicle.marca} {vehicle.modelo}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2}}>
                  {vehicle.fotos && <CmpntCarousel photos={vehicle.fotos} />}
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <Typography variant="subtitle1">Preço: {formatters.currencyFormatter(vehicle.preco)}</Typography>
                    <Typography variant="subtitle1">Ano: {vehicle.ano}</Typography>
                    <Typography variant="subtitle1">Cor: {vehicle.cor}</Typography>
                    <Typography variant="subtitle1">Placa: {vehicle.placa}</Typography>
                    <Typography variant="subtitle1">Cidade: {vehicle.cidade}</Typography>
                    <Typography variant="subtitle1">Quilometragem: {vehicle.quilometragem} km</Typography>
                    <Typography variant="subtitle1">Data de Cadastro: {formatters.formatDate(vehicle.dataCadastro)}</Typography>
                </Box>
                <Button onClick={handleClose} sx={{ mt: 5 }}>Fechar</Button>
            </Box>
        </Modal>
    );
};

export default VehicleDetailsModal;

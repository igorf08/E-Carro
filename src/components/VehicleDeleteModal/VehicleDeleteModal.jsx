/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from "@mui/material";
import CmpntCarousel from "../Carousel/Carousel";

const VehicleDeleteModal = ({ row, open, onClose, confirmDelete }) => {
    const handleClose = () => {
        onClose();
    };

    const handleConfirmDelete = () => {
      confirmDelete();
    }

    return (
      <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={open} onClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', maxWidth: '95%', maxHeight: '95%', 
                overflowY: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 3}}>
          <Typography variant="h4" sx={{mb:2}}>{row.marca} {row.modelo}</Typography>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2}}>
            {row.fotos && <CmpntCarousel photos={row.fotos} />}
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
              <Typography variant="subtitle1">Ano: {row.ano}</Typography>
              <Typography variant="subtitle1">Cor: {row.cor}</Typography>
              <Typography variant="subtitle1">Placa: {row.placa}</Typography>
              <Typography variant="subtitle1">Cidade: {row.cidade}</Typography>
              <Typography variant="subtitle1">Quilometragem: {row.quilometragem} km</Typography>
          </Box>
          <Box sx={{pt: 2, width: '100%'}}>
              <Typography variant="h3" sx={{ display: 'flex', justifyContent: 'center'}}>
                Deseja realmente excluir?
              </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <Button onClick={handleClose} sx={{ mt: 5, fontSize: '1em' }}>Cancelar</Button>
              <Button onClick={handleConfirmDelete} sx={{ mt: 5, fontSize: '1em'}}>Excluir</Button>
            </Box>
          </Box>
      </Box>
  </Modal>
    );
};

export default VehicleDeleteModal;

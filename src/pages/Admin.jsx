import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useVehicleManagement from "../hooks/useVehicleManagement";
import VehicleDeleteModal from "../components/VehicleDeleteModal/VehicleDeleteModal";
import VehicleEditModal from "../components/VehicleEditModal/VehicleEditModal";
import Nav from "../components/Navbar/Nav"
import { useState } from "react";

const Admin = () => {
  const {
    tcolumns,
    trecords,
    selectedRow,
    deleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    setRecords
  } = useVehicleManagement();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTimeout(() => setOpen(false), 3000)
  };

  const handleSaveEdit = (updatedVehicle) => {
    const updatedRecords = trecords.map((v) =>
      v.id === updatedVehicle.id ? updatedVehicle : v
    );
    setRecords(updatedRecords);
    setOpen(true);
  };

  return (
    <Box style={{ height: 550, width: "100%" }}>
      <Nav/>
      <DataGrid
        rows={trecords}
        columns={[
          ...tcolumns,
          {
            headerName: "Ações",
            field: "actions",
            sortable: false,
            width: 120,
            renderCell: (params) => (
              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button color="warning" variant="text">
                  <EditIcon variant="text" onClick={() => handleOpenEditModal(params.row)} />
                </Button>
                <Button variant="text" onClick={() => handleOpenDeleteModal(params)}>
                  <DeleteIcon />
                </Button>
              </Box>
            ),
          },
        ]}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, width: "100%", padding: 2 }}>
        <Button color="success" variant="contained">
          <Link to="/administracao/criar">Criar</Link>
        </Button>
      </Box>
      {selectedRow && (
        <VehicleDeleteModal
          row={selectedRow}
          open={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          confirmDelete={() => handleDelete(selectedRow.id)}
        />
      )}
      {selectedVehicle && (
        <VehicleEditModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          vehicle={selectedVehicle}
          onSave={handleSaveEdit}
        />
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          Anúncio editado com sucesso.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Admin;

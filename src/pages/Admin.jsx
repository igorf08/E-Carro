import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useVehicleManagement from "../hooks/useVehicleManagement";
import VehicleDeleteModal from "../components/VehicleDeleteModal/VehicleDeleteModal";
import VehicleEditModal from "../components/VehicleEditModal/VehicleEditModal";
import Nav from "../components/Navbar/Nav"

const Admin = () => {
  const {
    tcolumns,
    trecords,
    selectedRow,
    deleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    openDeleteToast,
    setOpenDeleteToast,
    editModalOpen,
    selectedVehicle, 
    openEditToast, 
    setOpenEditToast,
    handleOpenEditModal,
    handleCloseEditModal,
    handleSaveEdit
  } = useVehicleManagement();


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
      <Snackbar open={openEditToast} autoHideDuration={3000} onClose={() => setOpenEditToast(false)}>
        <Alert onClose={() => setOpenEditToast(false)} severity="success" variant="filled">
          Anúncio editado com sucesso.
        </Alert>
      </Snackbar>
      <Snackbar open={openDeleteToast} autoHideDuration={3000} onClose={() => setOpenDeleteToast(false)}>
        <Alert onClose={() => setOpenDeleteToast(false)} severity="success" variant="filled">
          Anúncio deletado com sucesso.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Admin;

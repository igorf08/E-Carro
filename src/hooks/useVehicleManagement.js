import { useState, useEffect } from "react";
import axios from "axios";

const useVehicleManagement = () => {
  const [tcolumns, setColumns] = useState([]);
  const [trecords, setRecords] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [openDeleteToast, setOpenDeleteToast] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openEditToast, setOpenEditToast] = useState(false);


  useEffect(() => {
    axios.get("https://db-e-carro.vercel.app/veiculos").then((res) => {
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        const firstRecord = data[0];
        const columns = Object.keys(firstRecord).map((key) => ({
          field: key,
          headerName: key.toUpperCase(),
          width: 150,
        }));
        setColumns(columns);
        setRecords(data);
      } else {
        setColumns([]);
        setRecords([]);
      }
    });
  }, []);

  
  const handleOpenDeleteModal = (params) => {
    setSelectedRow(params.row);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = (id) => {
    console.log(`Excluindo registro com id: ${id}...`);
    setOpenDeleteToast(true)

    axios
      .delete(`https://db-e-carro.vercel.app/veiculos/${id}`)
      .then(() => {
        console.log("Registro deletado com sucesso");
        setRecords(trecords.filter((record) => record.id !== id));
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error("Erro ao deletar registro:", error);
      });
  };


const handleOpenEditModal = (vehicle) => {
  setSelectedVehicle(vehicle);
  setEditModalOpen(true);
};

const handleCloseEditModal = () => {
  setEditModalOpen(false);
  setTimeout(() => setOpenEditToast(false), 3000)
};

const handleSaveEdit = (updatedVehicle) => {
  const updatedRecords = trecords.map((v) =>
    v.id === updatedVehicle.id ? updatedVehicle : v
  );
  setRecords(updatedRecords);
  setOpenEditToast(true);
};


return {
  tcolumns,
  trecords,
  selectedRow,
  deleteModalOpen,
  handleOpenDeleteModal,
  handleCloseDeleteModal,
  handleDelete,
  setRecords,
  openDeleteToast,
  setOpenDeleteToast,
  editModalOpen,
  setEditModalOpen,
  selectedVehicle, 
  setSelectedVehicle,
  openEditToast, 
  setOpenEditToast,
  handleOpenEditModal,
  handleCloseEditModal,
  handleSaveEdit
};
};


export default useVehicleManagement;

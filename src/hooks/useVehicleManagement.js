import { useState, useEffect } from "react";
import axios from "axios";

const useVehicleManagement = () => {
  const [tcolumns, setColumns] = useState([]);
  const [trecords, setRecords] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/veiculos").then((res) => {
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

    axios
      .delete(`http://localhost:3000/veiculos/${id}`)
      .then(() => {
        console.log("Registro deletado com sucesso");
        setRecords(trecords.filter((record) => record.id !== id));
        handleCloseDeleteModal();
      })
      .catch((error) => {
        console.error("Erro ao deletar registro:", error);
      });
  };

  return {
    tcolumns,
    trecords,
    selectedRow,
    deleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    setRecords
  };
};


export default useVehicleManagement;

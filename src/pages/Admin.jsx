import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [tcolumns, setColumns] = useState([]);
  const [trecords, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/veiculos").then((res) => {
      const firstRecord = res.data.length > 0 ? res.data[0] : {};
      const columns = Object.keys(firstRecord).map((key) => ({
        field: key,
        headerName: key.toUpperCase(),
        width: 150,
      }));
      setColumns(columns);
      setRecords(res.data);
    });
  }, []);

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={trecords}
        columns={tcolumns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Box sx={{display: 'flex', justifyContent: 'end', gap: 2, w: '100%', p: 2}}>
        <Button color="success" variant="contained"><Link to="/administracao/criar">Criar</Link></Button>
        <Button color="warning" variant="contained"><Link to="">Editar</Link></Button>
        <Button variant="contained"><Link to="">Deletar</Link></Button>
      </Box>
    </Box>
  );
};

export default Admin;

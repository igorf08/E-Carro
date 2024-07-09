import { useEffect, useState } from 'react';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://ecarro-ol59r2nnt-igorf08s-projects.vercel.app/veiculos')
        .then((response) => response.json())
        .then((data) => setVehicles(data))
        .catch((error) => console.error('Erro ao buscar veículos:', error));
      };
      
      fetchData();
    }, []); 
    
  return { vehicles, setVehicles };
};

export default useVehicles;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Create from "../pages/Create"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/> 
  },
  {
    path: "/administracao",
    element: <Admin/>
  },
  {
    path: "/administracao/criar",
    element: <Create/>
  }
])


export default router;

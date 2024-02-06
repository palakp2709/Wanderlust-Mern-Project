import { Outlet , Navigate, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
     const location = useLocation();
    return(
       localStorage.getItem("token") ? < Outlet /> : < Navigate to="/login" state={{ from: location }}/>
    )
   
 }


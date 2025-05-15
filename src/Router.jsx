import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import UserLayout from "./layout/UserLayout";
import { routes } from "./lib/routes";
import Reservations from "./pages/Reservations";
import Spaces from "./pages/Spaces";
import { CreateReservation } from "./components/reservations/CreateReservation";
// import AdminLayout from "@/layouts/AdminLayout";
// import {
//   inicioRoute,
//   articulosRoute,
//   movimientosRoute,
//   ingresoRoute,
//   egresoRoute,
//   marcaRoute,
// } from "./lib/routes";
// import PublicLayout from "./layouts/PublicLayout";
// import Articulo from "./pages/Articulo";
// import Movimiento from "./pages/Movimiento";
// import Ingreso from "./pages/Ingreso";
// import DashboardPage from "./pages/Dashboard";
// import Egreso from "./pages/Egreso";
// import Marca from "./pages/Marca";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />

        <Route element={<UserLayout />}>
          {/* <Route path="/spaces" element={<Spaces />} /> */}
          <Route path={routes.reservationsFront} element={<Reservations />} />
          <Route
            path={routes.reservationsCrearFront}
            element={<CreateReservation />}
          />
          <Route path={routes.spacesFront} element={<Spaces />} />
        </Route>

        {/* <Route element={<AdminLayout />}>
          <Route path={inicioRoute} element={<DashboardPage />} />
          <Route path={articulosRoute} element={<Articulo />} />
          <Route path={marcaRoute} element={<Marca />} />
          <Route path={movimientosRoute} element={<Movimiento />} />
          <Route path={ingresoRoute} element={<Ingreso />} />
          <Route path={egresoRoute} element={<Egreso />} />
        </Route> */}
        {/* <Route element={<PublicLayout />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

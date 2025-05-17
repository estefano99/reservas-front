import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import UserLayout from "./layout/UserLayout";
import { routes } from "./lib/routes";
import Reservations from "./pages/Reservations";
import Spaces from "./pages/Spaces";
import { CreateReservation } from "./components/reservations/CreateReservation";
import AdminLayout from "./layout/AdminLayout";
import ReservationsAdmin from "./pages/ReservationsAdmin";
import { Register } from "./pages/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/registrar" element={<Register />} />

        <Route element={<UserLayout />}>
          <Route path={routes.reservationsFront} element={<Reservations />} />
          <Route
            path={routes.reservationsCrearFront}
            element={<CreateReservation />}
          />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={routes.spacesFront} element={<Spaces />} />
          <Route
            path={routes.reservationsAdminFront}
            element={<ReservationsAdmin />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

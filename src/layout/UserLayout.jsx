import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useAuth();
  useEffect(() => {
    if (isLoading) return;
    console.log("isError: ", isError);
    console.log("role: ", data.role);
    if ((isError && !data) || (data && data.role !== "user")) {
      navigate("/");
    }
  }, [isLoading, isError, data, navigate]);

  if (isLoading) return "Cargando...";
  return (
    <main className="flex w-full h-screen">
      <Sidebar user={data} />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default UserLayout;

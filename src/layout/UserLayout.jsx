import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const navigate = useNavigate();
  const { isError, isLoading } = useAuth();
  // useEffect(() => {
  //   if (isError) return navigate("/");
  // }, [isError, navigate]);

  if (isLoading) return "Cargando...";
  return (
    <main className="flex w-full h-screen">
      <Sidebar />
      <Outlet />
      <Toaster />
    </main>
  );
};

export default UserLayout;

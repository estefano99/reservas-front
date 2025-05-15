import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { login } from "@/api/Auth.js";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nombre es requerido",
  }),
  email: z.string().min(1, {
    message: "Email es requerido",
  }),
  password: z.string().min(1, {
    message: "Contraseña es requerida",
  }),
});

export function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Hubo un error al iniciar sesión");
    },
    onSuccess: (data) => {
      console.log("dataOnsuccess ", data);
      if (data.user.role === "admin") {
        return navigate(routes.spacesFront);
      }
      return navigate(routes.reservationsFront);
    },
  });

  async function onSubmit(values) {
    await mutation.mutateAsync(values);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Imagen para pantallas grandes */}
      <div className="flex-1 bg-muted hidden md:block relative">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <img
              src="/vite.svg"
              alt="Imagen de la app"
              className="rounded-lg shadow-lg mx-auto w-[600px] h-[400px] object-cover"
            />
            <h2 className="text-2xl font-bold">Reservas App</h2>
            <p className="text-muted-foreground">Sistema de reservas</p>
          </div>
        </div>
      </div>

      {/* Formulario de login */}
      <div className="flex-1 flex items-center justify-center p-6 flex-col">
        {/* Logo para dispositivos móviles */}
        <div className="mb-6 text-center md:hidden">
          <img
            src="/placeholder.svg?height=150&width=150"
            alt="Logo de la app"
            className="rounded-full shadow-md mx-auto w-[150px] h-[150px] object-cover"
          />
          <h2 className="text-xl font-bold mt-3">Reservas App</h2>
          <p className="text-sm text-muted-foreground">Sistema de Pedidos</p>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingrese sus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresar nombre de usuario"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresar Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Ingresar contraseña"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Ingresar
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}

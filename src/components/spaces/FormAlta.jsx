import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HousePlus } from "lucide-react";
import { toast } from "sonner";
import { createSpace } from "@/api/SpacesApi";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido.",
  }),
  description: z.string().min(1, {
    message: "La descripcion es requerido.",
  }),
  available: z.boolean().default(true),
});

const FormAlta = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      available: true,
    },
  });

  const mutation = useMutation({
    mutationFn: createSpace,
    onError: (error) => {
      console.log("Error en mutation: " + error);

      toast.error(error.message || "Error al crear espacio");
    },
    onSuccess: (respuesta) => {
      toast.success(respuesta.message || "Espacio creado correctamente");

      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      form.reset();
      setOpen(false); //Cierra modal
    },
  });

  async function onSubmit(values) {
    await mutation.mutateAsync(values);
  }
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild className="h-8.5 2xl:h-10">
        <Button
          className="flex gap-2 text-xs 2xl:text-sm cursor-pointer"
          variant="secondary"
        >
          <HousePlus className="h-4 w-4 2xl:h-5 2xl:w-5" />
          Crear Espacio
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Crear Espacio</AlertDialogTitle>
          <AlertDialogDescription>
            Complete los campos para crear un nuevo Espacio
          </AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pt-4"
            >
              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>
                        Nombre <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresar nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>
                        Descripcion <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresar descripcion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => form.reset()}>
                  Cancelar
                </AlertDialogCancel>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Cargando..." : "Guardar"}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormAlta;

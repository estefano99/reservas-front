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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSpace } from "@/api/SpacesApi";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre es requerido.",
  }),
  description: z.string().min(1, {
    message: "La descripcion es requerido.",
  }),
  available: z
    .union([z.literal(1), z.literal(0)])
    .transform((val) => val === 1),
});

const FormEditar = ({ spaceEdit, setIsEdit, isEdit, setSpaceEdit }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: spaceEdit?.name,
      description: spaceEdit?.description,
      available: spaceEdit?.available,
    },
  });

  const mutation = useMutation({
    mutationFn: editSpace,
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Error al editar el espacio");
    },
    onSuccess: (respuesta) => {
      console.log(respuesta);
      toast(respuesta.message || "Espacio editado correctamente");

      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      setSpaceEdit(null);
      setIsEdit(false);
    },
  });

  async function onSubmit(values) {
    const data = {
      id: spaceEdit?.id,
      ...values,
    };

    await mutation.mutateAsync(data);
  }
  return (
    <AlertDialog onOpenChange={setIsEdit} open={isEdit}>
      <AlertDialogContent className="w-full h-full md:h-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Espacio</AlertDialogTitle>
          <AlertDialogDescription>
            Edita los campos que deseas modificar.
          </AlertDialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input placeholder="Ingresar Descripcion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>
                      Activo <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
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

export default FormEditar;

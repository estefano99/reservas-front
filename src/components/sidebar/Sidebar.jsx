import { Menu, LogOut, Package, Tag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarNav from "./SidebarNav";
import { Button } from "../ui/button";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ user }) => {
  return (
    <div className="h-14 absolute md:relative md:h-full w-1/5 2xl:w-[22%] md:border-r md:bg-muted/40 md:block">
      <div className="hidden md:flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <p className="flex items-center gap-2 font-semibold">
            {/* <Package2 className="h-6 w-6" /> */}
            <span className="text-base md:text-xl">App Turnos</span>
          </p>
        </div>
        <div className="flex-1">
          {user.role === "user" && (
            <SidebarNav links={[{ title: "Reservas", icon: Package }]} />
          )}
          {user.role === "admin" && (
            <SidebarNav
              links={[
                { title: "Espacios", icon: Tag },
                { title: "Reservas pendientes", icon: Tag },
              ]}
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-center h-20">
          <SidebarLink
            key={`cerrar-sesion`}
            linkTitle={`Cerrar sesión`}
            linkIcon={LogOut}
            redirectTo={`cerrar-sesion`}
          />
        </div>
      </div>
      {/* Menu hamburguesa para mobile */}
      <div className="flex flex-col md:hidden absolute z-50">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SidebarNav
                links={[
                  { title: "Reservas", icon: Package },
                  { title: "Espacios", icon: Tag },
                ]}
              />
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;

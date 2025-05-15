"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function SpaceSelector({ spaces, onSpaceChange }) {
  const [open, setOpen] = useState(false)
  const [selectedSpace, setSelectedSpace] = useState(null)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Espacio</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedSpace ? selectedSpace.name : "Selecciona un espacio..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar espacio..." />
            <CommandList>
              <CommandEmpty>No se encontraron espacios.</CommandEmpty>
              <CommandGroup>
                {spaces.map((space) => (
                  <CommandItem
                    key={space.id}
                    value={space.name}
                    onSelect={() => {
                      setSelectedSpace(space)
                      onSpaceChange(space)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedSpace?.id === space.id ? "opacity-100" : "opacity-0")}
                    />
                    <div className="flex flex-col">
                      <span>{space.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {space.location} - Capacidad: {space.capacity}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

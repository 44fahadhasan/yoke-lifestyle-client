"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus, Settings, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const SEO = ({ newInputSection, setNewInputSection }) => {
  // add a new section
  const handleAddNewSection = () => {
    setNewInputSection([
      ...newInputSection,
      {
        id: uuidv4(),
        name: "",
        property: "",
        content: "",
      },
    ]);
  };

  // delete a section
  const handleDeleteSection = (sectionId) => {
    setNewInputSection(
      newInputSection.filter((section) => section.id !== sectionId)
    );
  };

  // update a specific field in a section
  const handleUpdateSection = (id, field, value) => {
    setNewInputSection((prevSections) =>
      prevSections.map((section) =>
        section.id === id
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0 bg-muted p-4">
        {/* accordion trigger button */}
        <AccordionTrigger className="font-semibold hover:no-underline">
          SEO Management and Optimization
          <Settings className="transition-transform duration-1000" />
        </AccordionTrigger>

        <AccordionContent className="pt-4 pl-1">
          <div className="space-y-5">
            {newInputSection.map((section) => (
              <div
                key={section.id}
                className="grid grid-cols-12 gap-4 items-end"
              >
                {/* name */}
                <div className="col-span-3 w-full space-y-1">
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-full flex justify-between hover:bg-primary-foreground ${
                              !section.name && "text-muted-foreground"
                            }`}
                          >
                            {section.name || "Select name"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  key={language.value}
                                  value={language.label}
                                  onSelect={(value) =>
                                    handleUpdateSection(
                                      section.id,
                                      "name",
                                      value
                                    )
                                  }
                                >
                                  {language.label}
                                  <Check
                                    className={`ml-auto ${
                                      section.name === language.label
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </div>

                {/* property */}
                <div className="col-span-3 w-full space-y-1">
                  <Label htmlFor={`property-${section.id}`}>Property</Label>
                  <Input
                    type="text"
                    id={`property-${section.id}`}
                    className="bg-primary-foreground"
                    placeholder='property="og:any"'
                    onChange={(e) =>
                      handleUpdateSection(
                        section.id,
                        "property",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* content */}
                <div className="col-span-5 w-full space-y-1">
                  <Label htmlFor={`content-${section.id}`}>Content</Label>
                  <Input
                    type="text"
                    id={`content-${section.id}`}
                    value={section.content}
                    onChange={(e) =>
                      handleUpdateSection(section.id, "content", e.target.value)
                    }
                    className="bg-primary-foreground"
                    placeholder='content="any"'
                  />
                </div>

                {/* section delete button */}
                <Button
                  onClick={() => handleDeleteSection(section.id)}
                  variant="destructive"
                  className="col-span-1 w-full"
                >
                  <Trash2 />
                </Button>
              </div>
            ))}

            {/* add new section */}
            <div className="grid w-full items-center gap-1.5">
              <div
                className="bg-primary-foreground p-2 hover:bg-muted cursor-pointer h-11 w-full border"
                onClick={handleAddNewSection}
              >
                <div className="flex items-center justify-center h-full">
                  <Plus />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SEO;

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Settings, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const SEO = ({ newInputSection, setNewInputSection }) => {
  // handle add a new section
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

  // handle delete a section
  const handleDeleteSection = (sectionId) => {
    setNewInputSection(
      newInputSection.filter((section) => section.id !== sectionId)
    );
  };

  // handle update a specific input field
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
                  <Label htmlFor={`name-${section.id}`}>Name</Label>
                  <Input
                    type="text"
                    id={`name-${section.id}`}
                    className="bg-primary-foreground"
                    placeholder='name="any"'
                    onChange={(e) =>
                      handleUpdateSection(section.id, "name", e.target.value)
                    }
                  />
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

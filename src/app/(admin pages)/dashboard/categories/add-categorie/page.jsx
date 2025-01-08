"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Settings, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCategoryPage = () => {
  const [addedImageValue, setAddedImageValue] = useState(null);
  const [newInputSection, setNewInputSection] = useState([
    {
      id: uuidv4(),
      name: "",
      property: "",
      content: "",
    },
  ]);

  // add new section
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

  // Delete section
  const handleDeleteSection = (sectionId) => {
    setNewInputSection(
      newInputSection.filter((section) => section.id !== sectionId)
    );
  };

  // update section fields
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
    <section className="space-y-7">
      <Card className="rounded shadow-none">
        <form>
          {/* category fields */}
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-muted p-4">
              {/* left column */}
              <div className="col-span-1 flex flex-col gap-4 flex-grow">
                {/* img */}
                <div className="relative p-2 h-full w-full border-2	border-dashed border-primary min-h-52 sm:min-h-60 max-h-60">
                  {addedImageValue ? (
                    <div className="relative h-full w-full">
                      {/* img preview */}
                      <Image
                        src={addedImageValue}
                        alt="categorie image preview"
                        layout="fill"
                        objectFit="fill"
                        className="rounded-md"
                      />

                      {/* img add button */}
                      <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                        <ImagePicker setAddedImageValue={setAddedImageValue} />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 h-full">
                      <ImagePicker setAddedImageValue={setAddedImageValue} />
                    </div>
                  )}
                </div>

                {/* img alt text */}
                <div className="">
                  <Input
                    type="text"
                    className="bg-primary-foreground"
                    placeholder="Write image alt text"
                  />
                </div>

                {/* img caption */}
                <div className="">
                  <Textarea
                    className="bg-primary-foreground"
                    placeholder="Write image caption"
                  />
                </div>
              </div>

              {/* right column */}
              <div className="col-span-2 grid gap-4 grid-cols-2">
                {/* categorie name */}
                <div className="space-y-1">
                  <Label htmlFor="categorie-name">Categorie Name</Label>
                  <Input
                    type="text"
                    id="categorie-name"
                    className="bg-primary-foreground"
                    placeholder="Write categorie name"
                  />
                </div>

                {/* slug name */}
                <div className="space-y-1">
                  <Label htmlFor="slug-name">Slug/path Name</Label>
                  <Input
                    type="text"
                    id="slug-name"
                    className="bg-primary-foreground"
                    placeholder="Write slug/path name"
                  />
                </div>

                {/* description */}
                <div className="col-span-2 space-y-1">
                  <Label htmlFor="categorie-description">
                    Categorie Description
                  </Label>
                  <Textarea
                    id="categorie-description"
                    className="bg-primary-foreground"
                    placeholder="Write categorie description"
                    rows={4}
                  />
                </div>

                {/* parent categories */}
                <div className="space-y-1">
                  <Label htmlFor="parent-categorie">Parent Categories</Label>
                  <Select id="parent-categorie">
                    <SelectTrigger className="focus:ring-0 bg-primary-foreground">
                      <SelectValue placeholder="Select parent categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>All parent categories here</SelectLabel>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Saudi Arabia">
                          Saudi Arabia
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* child categories */}
                <div className="space-y-1">
                  <Label htmlFor="child-categorie">Child Categories</Label>
                  <Select id="child-categorie">
                    <SelectTrigger className="focus:ring-0 bg-primary-foreground">
                      <SelectValue placeholder="Select Child Categorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>All child categories here</SelectLabel>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Saudi Arabia">
                          Saudi Arabia
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>

          {/* seo fields */}
          <CardContent>
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
                            onChange={(value) =>
                              handleUpdateSection(section.id, "name", value)
                            }
                          />
                        </div>

                        {/* property */}
                        <div className="col-span-3 w-full space-y-1">
                          <Label htmlFor={`property-${section.id}`}>
                            Property
                          </Label>
                          <Input
                            type="text"
                            id={`property-${section.id}`}
                            className="bg-primary-foreground"
                            placeholder='property="og:any"'
                            onChange={(value) =>
                              handleUpdateSection(section.id, "property", value)
                            }
                          />
                        </div>

                        {/* content */}
                        <div className="col-span-5 w-full space-y-1">
                          <Label htmlFor={`content-${section.id}`}>
                            Content
                          </Label>
                          <Input
                            type="text"
                            id={`content-${section.id}`}
                            value={section.content}
                            onChange={(e) =>
                              handleUpdateSection(
                                section.id,
                                "content",
                                e.target.value
                              )
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
          </CardContent>
        </form>
      </Card>
    </section>
  );
};

export default AddCategoryPage;

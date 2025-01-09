"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import SEO from "@/components/Dashboard/HelperComponent/SEOManager/SEO";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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

const CategoryFrom = () => {
  const [addedImageValue, setAddedImageValue] = useState(null);
  const [newInputSection, setNewInputSection] = useState([
    {
      id: uuidv4(),
      name: "",
      property: "",
      content: "",
    },
  ]);

  console.log("seo", { newInputSection });

  // from schema
  const formSchema = z.object({
    img_alt: z.string(),
    img_caption: z.string(),
    categorie_name: z.string().min(1, "Category name is required."),
    slug_name: z
      .string()
      .min(1, "Slug name is required.")
      .regex(
        /^[a-z-]+$/,
        "Slug name can only contain lowercase letters and hyphens."
      ),
    categorie_description: z.string(),
    parent_categorie: z.string(),
    child_categorie: z.string(),
  });

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img_alt: "",
      img_caption: "",
      categorie_name: "",
      slug_name: "",
      categorie_description: "",
      parent_categorie: "",
      child_categorie: "",
    },
  });

  // handle form submission
  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name="img_alt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-primary-foreground"
                        placeholder="Write image alt text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* img caption */}
              <FormField
                control={form.control}
                name="img_caption"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-primary-foreground"
                        placeholder="Write image caption"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* right column */}
            <div className="col-span-2 grid gap-4 grid-cols-2">
              {/* categorie name */}
              <FormField
                control={form.control}
                name="categorie_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorie Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-primary-foreground"
                        placeholder="Write categorie name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* slug name */}
              <FormField
                control={form.control}
                name="slug_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug/path Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-primary-foreground"
                        placeholder="Write slug/path name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* categorie description */}
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="categorie_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorie Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          className="bg-primary-foreground"
                          placeholder="Write categorie description"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* parent categories */}
              <FormField
                control={form.control}
                name="parent_categorie"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Parent Categories</FormLabel>
                    <Popover>
                      {/* trigger */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-full flex justify-between capitalize hover:bg-primary-foreground 
                                  ${!field.value && "text-muted-foreground"}
                                )`}
                          >
                            {/* selected value */}
                            {field.value
                              ? field.value
                              : "Select parent categorie"}

                            {/* icon */}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0">
                        <Command>
                          {/* search input */}
                          <CommandInput
                            placeholder="Search categorie..."
                            className="h-9"
                          />

                          {/* lists */}
                          <CommandList>
                            <CommandEmpty>No categorie found.</CommandEmpty>

                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "parent_categorie",
                                      language.value
                                    );
                                  }}
                                >
                                  {language.label}
                                  <Check
                                    className={`
                                          ml-auto ${
                                            language.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }
                                        `}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The category you are currently adding. If it has any
                      parent category, please select one parent category.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* child categories */}
              <FormField
                control={form.control}
                name="child_categorie"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Child Categories</FormLabel>
                    <Popover>
                      {/* trigger */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-full flex justify-between capitalize hover:bg-primary-foreground 
                                  ${!field.value && "text-muted-foreground"}
                                )`}
                          >
                            {/* selected value */}
                            {field.value
                              ? field.value
                              : "Select child categorie"}

                            {/* icon */}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0">
                        <Command>
                          {/* search input */}
                          <CommandInput
                            placeholder="Search categorie..."
                            className="h-9"
                          />

                          {/* lists */}
                          <CommandList>
                            <CommandEmpty>No categorie found.</CommandEmpty>

                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "child_categorie",
                                      language.value
                                    );
                                  }}
                                >
                                  {language.label}
                                  <Check
                                    className={`
                                          ml-auto ${
                                            language.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }
                                        `}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The category you are currently adding. If it has any child
                      category, please select one child category.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>

        {/* seo fields */}
        <CardContent>
          <SEO
            newInputSection={newInputSection}
            setNewInputSection={setNewInputSection}
          />
        </CardContent>

        {/* submit button */}
        <CardContent className="text-right">
          <Button type="submit" className="w-1/5 font-medium">
            Submit
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};
export default CategoryFrom;

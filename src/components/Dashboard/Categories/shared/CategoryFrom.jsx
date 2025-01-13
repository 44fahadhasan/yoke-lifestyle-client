"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import SEO from "@/components/Dashboard/HelperComponent/SEOManager/SEO";
import LoadingButton from "@/components/reusable/LoadingButton";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CategoryFrom = ({
  form,
  onSubmit,
  loading,
  setMetaData,
  setParentId,
  addedImageValue,
  setAddedImageValue,
}) => {
  const [categories, setCategories] = useState([]);

  const axiosSecure = useAxiosSecure();

  // fetch categories list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get("/api/categories/list");
        setCategories(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* category fields */}
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-6 bg-muted p-4">
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
            <div className="col-span-1 xs:col-span-2 grid gap-4 xs:grid-cols-2 grid-cols-1">
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
              <div className="col-span-1 xs:col-span-2">
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
                            className="w-full flex justify-between bg-primary-foreground hover:bg-primary-foreground"
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
                              {categories.map(({ value, label, _id }) => (
                                <CommandItem
                                  key={_id}
                                  value={label}
                                  onSelect={() => {
                                    form.setValue("parent_categorie", value);
                                    setParentId(_id);
                                  }}
                                >
                                  {label}
                                  <Check
                                    className={`
                                          ml-auto ${
                                            value === field.value
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

              {/* feature categorie */}
              <FormField
                control={form.control}
                name="featured_categorie"
                render={({ field }) => (
                  <FormItem className="space-y-1 xs:-mt-[5px]">
                    <FormLabel>Featured Categorie</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-primary-foreground">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>

        {/* seo fields */}
        <CardContent>
          <SEO setMetaData={setMetaData} />
        </CardContent>

        {/* submit button & status field */}
        <CardContent className="flex justify-end items-center gap-4">
          {/* status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* submit button */}
          <Button
            disabled={loading}
            type="submit"
            className="xs:w-1/5 font-medium"
          >
            {loading ? <LoadingButton>Please wait</LoadingButton> : "Submit"}
          </Button>
        </CardContent>
      </form>
    </Form>
  );
};

export default CategoryFrom;

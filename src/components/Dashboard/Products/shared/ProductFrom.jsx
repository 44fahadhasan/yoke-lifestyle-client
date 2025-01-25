"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import SEO from "@/components/Dashboard/HelperComponent/SEOManager/SEO";
import LoadingButton from "@/components/reusable/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featureds } from "@/data/data";
import { Check, ChevronsUpDown, CircleX, Plus } from "lucide-react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const ProductFrom = ({
  form,
  onSubmit,
  loading,
  isLoading,
  metaData,
  setMetaData,
  sectionImage,
  setSectionImage,
  categoriesList,
}) => {
  // add a new section
  const handleAddNewSectionImage = () => {
    setSectionImage((prevSectionImage) => [
      ...prevSectionImage,
      {
        _id: uuidv4(),
        image: "",
      },
    ]);
  };

  // update a specific section
  const handleSectionImageSelect = (selectedImages, sectionId) => {
    setSectionImage((prevSectionImage) =>
      prevSectionImage.map((section) => {
        if (section._id === sectionId) {
          return {
            ...section,
            image: selectedImages,
          };
        }
        return section;
      })
    );
  };

  // delete a section
  const handleDeleteSectionImage = (sectionId) => {
    setSectionImage((prevSectionImage) =>
      prevSectionImage.filter((section) => section._id !== sectionId)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* basic info */}
        <CardContent className="pt-6">
          <div className="grid bg-muted p-4">
            <div className="col-span-1 xs:col-span-2 grid gap-4 xs:grid-cols-2 grid-cols-1">
              {/* product name */}
              <div className="col-span-1 xs:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-primary-foreground"
                            placeholder="Write product name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* product category */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="product_category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Product category</FormLabel>
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
                                ? categoriesList?.find(
                                    ({ _id }) => _id === field.value
                                  )?.label || field.value
                                : "Select an category"}

                              {/* icon */}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                          <Command>
                            {/* search input */}
                            <CommandInput
                              placeholder="Search category..."
                              className="h-9"
                            />
                            {/* lists */}
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>

                              <CommandGroup>
                                {categoriesList
                                  .slice(1)
                                  .map(({ label, _id }) => (
                                    <CommandItem
                                      key={_id}
                                      value={label}
                                      onSelect={() => {
                                        form.setValue("product_category", _id);
                                      }}
                                    >
                                      {label}
                                      <Check
                                        className={`ml-auto ${
                                          _id === field.value
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
                  )}
                />
              )}

              {/* feature product */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="featured_product"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Featured Product</FormLabel>
                      <Popover>
                        {/* trigger */}
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full flex justify-between bg-primary-foreground hover:bg-primary-foreground capitalize"
                            >
                              {/* selected value */}
                              {field.value}

                              {/* icon */}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                          <Command>
                            {/* lists */}
                            <CommandList>
                              <CommandGroup>
                                {featureds.map(({ value, label }) => (
                                  <CommandItem
                                    key={value}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("featured_product", value);
                                    }}
                                    className="capitalize"
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
                    </FormItem>
                  )}
                />
              )}

              {/* product images */}
              <div className="col-span-1 xs:col-span-2 space-y-2">
                {isLoading || <FormLabel>Product Images</FormLabel>}

                <div className="grid grid-cols-4 gap-4">
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <Skeleton key={idx} className="w-full h-48 rounded-md" />
                    ))
                  ) : (
                    <>
                      {sectionImage.map((section) => (
                        <div
                          key={section._id}
                          className="relative h-48 w-full border-2 border-dashed border-primary"
                        >
                          {/* remove section button */}
                          <div className="absolute -top-2 -right-2 z-20">
                            <div
                              onClick={() =>
                                handleDeleteSectionImage(section._id)
                              }
                              className="cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full"
                            >
                              <CircleX />
                            </div>
                          </div>

                          {/* single image */}
                          {section?.image ? (
                            <div className="relative h-full w-full">
                              {/* img preview */}
                              <Image
                                src={section?.image}
                                alt="product image preview"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                              />

                              {/* img add button */}
                              <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                                <ImagePicker
                                  setAddedImageValue={(selectedImages) =>
                                    handleSectionImageSelect(
                                      selectedImages,
                                      section._id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 h-full">
                              <ImagePicker
                                setAddedImageValue={(selectedImages) =>
                                  handleSectionImageSelect(
                                    selectedImages,
                                    section._id
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  {/* add section button */}
                  {isLoading || (
                    <div
                      onClick={handleAddNewSectionImage}
                      className={`h-48 w-full cursor-pointer flex items-center justify-center bg-primary-foreground border-2 border-dashed ${
                        sectionImage.length === 8 && "hidden"
                      }`}
                    >
                      <Plus size={33} />
                    </div>
                  )}
                </div>
              </div>

              {/* product video link */}
              <div className="col-span-1 xs:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="product_video_link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Video Link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-primary-foreground"
                            placeholder="Paste product video link"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardContent>
          <div className="bg-muted p-4">
            <Tabs defaultValue="product_variant">
              {/* tab lists */}
              <TabsList className="flex">
                <TabsTrigger className="text-base" value="product_variant">
                  Product Variant
                </TabsTrigger>

                <TabsTrigger className="text-base" value="product_description">
                  Product Description
                </TabsTrigger>

                <TabsTrigger
                  className="text-base"
                  value="additional_information"
                >
                  Additional Information
                </TabsTrigger>

                <TabsTrigger className="text-base" value="shipping_warranty">
                  Shipping & Warranty
                </TabsTrigger>
              </TabsList>

              <TabsContent value="product_variant">
                <Card>jasfjl</Card>
              </TabsContent>

              <TabsContent value="product_description">
                <Card>ksjklfsajdlf</Card>
              </TabsContent>

              <TabsContent value="additional_information">
                <Card>ajflhasf</Card>
              </TabsContent>

              <TabsContent value="shipping_warranty">
                <Card>ajslfjaslkjf</Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>

        {/* seo fields */}
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-28 w-full rounded-none" />
          ) : (
            <SEO metaData={metaData} setMetaData={setMetaData} />
          )}
        </CardContent>

        {/* submit button & status field */}
        <CardContent className="flex justify-end items-center gap-4">
          {/* status */}
          {isLoading ? (
            <Skeleton className="h-10 w-1/5 rounded-md" />
          ) : (
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
          )}

          {/* submit button */}
          {isLoading ? (
            <Skeleton className="h-10 w-32 rounded-md" />
          ) : (
            <Button
              disabled={loading}
              type="submit"
              className="xs:w-1/5 font-medium"
            >
              {loading ? <LoadingButton>Please wait</LoadingButton> : "Submit"}
            </Button>
          )}
        </CardContent>
      </form>
    </Form>
  );
};

export default ProductFrom;

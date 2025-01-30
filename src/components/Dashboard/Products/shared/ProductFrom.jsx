"use client";
import ImagePicker from "@/components/Dashboard/HelperComponent/ImageManager/ImagePicker";
import SEO from "@/components/Dashboard/HelperComponent/SEOManager/SEO";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { discounts, featureds, tabs } from "@/data/data";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, CircleX, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TextEditor from "../../HelperComponent/TextEditor/TextEditor";
import FormFooter from "../../shared/FormFooter/FormFooter";
import ProductVariant from "./ProductVariant";

const ProductFrom = ({
  form,
  onSubmit,
  loading,
  isLoading,
  metaData,
  setMetaData,
  sectionImage,
  setSectionImage,
  productDescription,
  setProductDescription,
  additionalInformation,
  setAdditionalInformation,
  shippingWarranty,
  setShippingWarranty,
  variants,
  setVariants,
}) => {
  const axiosSecure = useAxiosSecure();

  // fetch categories list
  const { data: categoriesList = [] } = useQuery({
    queryKey: ["categories-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/categories/list");
      return data?.data;
    },
  });

  // fetch tags list
  const { data: tagsList = [] } = useQuery({
    queryKey: ["tags-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/tags/list");
      return data?.data;
    },
  });

  // fetch brands list
  const { data: brandsList = [] } = useQuery({
    queryKey: ["brands-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/brands/list");
      return data?.data;
    },
  });

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

  // set value empty string to discount percentage when discount type  selected direct
  useEffect(() => {
    const discountType = form.getValues("discount_type");
    if (discountType.toLowerCase() === "direct") {
      form.setValue("discount_percentage", "");
    }
  }, [form.watch("discount_type")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* product basic fields */}
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
                      <FormLabel>Product Category</FormLabel>
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
                              {field.value ? field.value : "Select an category"}

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
                                        form.setValue(
                                          "product_category",
                                          label,
                                          {
                                            shouldValidate: true,
                                          }
                                        );
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* product tag */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="product_tag"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Product Tag</FormLabel>
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
                              {field.value ? field.value : "Select an tag"}

                              {/* icon */}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                          <Command>
                            {/* search input */}
                            <CommandInput
                              placeholder="Search tag..."
                              className="h-9"
                            />
                            {/* lists */}
                            <CommandList>
                              <CommandEmpty>No tag found.</CommandEmpty>

                              <CommandGroup>
                                {tagsList.map(({ label, _id }) => (
                                  <CommandItem
                                    key={_id}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("product_tag", label);
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

              {/* product brand */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="product_brand"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Product Brand</FormLabel>
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
                              {field.value ? field.value : "Select an brand"}

                              {/* icon */}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                          <Command>
                            {/* search input */}
                            <CommandInput
                              placeholder="Search brand..."
                              className="h-9"
                            />
                            {/* lists */}
                            <CommandList>
                              <CommandEmpty>No brand found.</CommandEmpty>

                              <CommandGroup>
                                {brandsList.map(({ label, _id }) => (
                                  <CommandItem
                                    key={_id}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("product_brand", label);
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
                {isLoading || <TypographySmall>Product Images</TypographySmall>}

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

              {/* discount type */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="discount_type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Discount Type</FormLabel>
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
                                {discounts.map(({ value, label }) => (
                                  <CommandItem
                                    key={value}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("discount_type", value);
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

              {/* discount percentage */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="discount_percentage"
                  render={({ field }) => {
                    const isDisabled =
                      form.getValues("discount_type").toLowerCase() ===
                      "direct";

                    return (
                      <FormItem className="space-y-1 xs:-mt-[5px]">
                        <FormLabel>Discount Percentage</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isDisabled}
                            className="bg-primary-foreground"
                            placeholder="Write discount percentage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>

        {/* product variants & others fields */}
        <CardContent>
          <div className="bg-muted p-4">
            <Tabs defaultValue="product_variant">
              {/* tab lists */}
              <TabsList className="flex gap-4 mb-5">
                {tabs.map((tab) => (
                  <div key={tab.value} className="w-40">
                    {isLoading ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <TabsTrigger className="text-base" value={tab.value}>
                        {tab.label}
                      </TabsTrigger>
                    )}
                  </div>
                ))}
              </TabsList>

              {/* product variant */}
              <TabsContent value="product_variant">
                <Card className="bg-muted shadow-none border-none">
                  <ProductVariant
                    isLoading={isLoading}
                    variants={variants}
                    setVariants={setVariants}
                  />
                </Card>
              </TabsContent>

              {/* product description */}
              <TabsContent value="product_description">
                <Card className="shadow-none border-none">
                  <TextEditor
                    content={productDescription}
                    setContent={setProductDescription}
                  />
                </Card>
              </TabsContent>

              {/* additional information */}
              <TabsContent value="additional_information">
                <Card className="shadow-none border-none">
                  <TextEditor
                    content={additionalInformation}
                    setContent={setAdditionalInformation}
                  />
                </Card>
              </TabsContent>

              {/* shipping & warranty */}
              <TabsContent value="shipping_warranty">
                <Card className="shadow-none border-none">
                  <TextEditor
                    content={shippingWarranty}
                    setContent={setShippingWarranty}
                  />
                </Card>
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
        <FormFooter form={form} loading={loading} isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default ProductFrom;

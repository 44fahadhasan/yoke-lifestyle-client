"use client";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
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
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { customStyles, stocks } from "@/data/data";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronsUpDown,
  CircleChevronDown,
  CirclePlus,
  CopyPlus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ImagePicker from "../../HelperComponent/ImageManager/ImagePicker";

const animatedComponents = makeAnimated();

const ProductVariant = ({ isLoading, variants, setVariants }) => {
  const [attributeValues, setAttributeValues] = useState([]);
  const [selectedStock, setSelectedStock] = useState(stocks[0]?.value || "");

  const axiosSecure = useAxiosSecure();

  // fetch attributes list
  const { data: attributesList = [] } = useQuery({
    queryKey: ["attributes-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/product-attributes/list");
      return data?.data;
    },
  });

  // add a new variant section
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: variants?.length + 1,
        image_url: "",
        sku: "",
        product_quantity: "",
        product_price: "",
        stock_status: "in stock",
        subsections: [{ id: 1, attribute_name: "", attribute_values: [] }],
      },
    ]);
  };

  // delete a variant
  const handleDeleteVariant = (variantId) => {
    setVariants(variants.filter((variant) => variant.id !== variantId));
  };

  // add a new sub section section
  const handleAddSubsection = (variantId) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              subsections: [
                ...variant.subsections,
                {
                  id: variant.subsections.length + 1,
                  attribute_name: "",
                  attribute_values: [],
                },
              ],
            }
          : variant
      )
    );
  };

  // delete a sub section
  const handleDeleteSubsection = (variantId, subsectionId) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              subsections: variant.subsections.filter(
                (subsection) => subsection.id !== subsectionId
              ),
            }
          : variant
      )
    );
  };

  // image select of a specific variant
  const handleImageSelect = (selectedImage, variantId) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? { ...variant, image_url: selectedImage }
          : variant
      )
    );
  };

  // update a specific variant & sub section fileds
  const handleSpecificationChanges = (
    variantId,
    field,
    value,
    subsectionId = null
  ) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? subsectionId
            ? {
                ...variant,
                subsections: variant.subsections.map((subsection) =>
                  subsection.id === subsectionId
                    ? { ...subsection, [field]: value }
                    : subsection
                ),
              }
            : { ...variant, [field]: value }
          : variant
      )
    );
  };

  return (
    <div className="grid gap-[1px] bg-card">
      {variants.map((variant, idx) => (
        <Accordion
          key={`variant${idx}`}
          defaultValue="item-1"
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-b-0 bg-muted">
            {/* accordion trigger button */}
            <AccordionTrigger className="font-semibold hover:no-underline">
              {/* variant number */}
              {isLoading ? (
                <Skeleton className="h-7 w-36 rounded-md" />
              ) : (
                <TypographyH4
                  className={"text-base"}
                >{`Variant ${variant.id}`}</TypographyH4>
              )}

              {/* icon */}
              {isLoading ? (
                <Skeleton className="size-7 rounded-full" />
              ) : (
                <CircleChevronDown className="transition-transform duration-1000" />
              )}
            </AccordionTrigger>

            <AccordionContent className="pt-4 pl-1 space-y-3">
              <div className="first:border-t-0 border-t border-primary">
                {/* top area */}
                <div className="flex justify-end mb-4">
                  {/* remove variant button */}
                  {isLoading ? (
                    <Skeleton className="size-8 rounded-full" />
                  ) : (
                    <Button
                      onClick={() => handleDeleteVariant(variant.id)}
                      disabled={variants.length === 1}
                      size="sm"
                      type="button"
                      variant="destructive"
                      className="rounded-full px-2"
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>

                {/* middle area */}
                <div className="grid grid-cols-3 gap-4">
                  {/* left area (img) */}
                  <div className="col-span-1 relative p-2 h-full w-full border-2 border-dashed border-primary min-h-36 max-h-min-h-36">
                    {variant.image_url ? (
                      <div className="relative h-full w-full">
                        {/* img preview */}
                        <Image
                          src={variant.image_url}
                          alt="image preview"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />

                        {/* img add button */}
                        <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                          <ImagePicker
                            setAddedImageValue={(selectedImage) =>
                              handleImageSelect(selectedImage, variant.id)
                            }
                          />
                        </div>
                      </div>
                    ) : isLoading ? (
                      <Skeleton className="w-full h-full rounded-md" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 h-full">
                        <ImagePicker
                          setAddedImageValue={(selectedImage) =>
                            handleImageSelect(selectedImage, variant.id)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* right area (input fields) */}
                  <div className="col-span-2 space-y-4">
                    <div className="flex gap-4">
                      {/* sku */}
                      <div className="w-full">
                        {isLoading ? (
                          <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                          <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <Input
                              required
                              type="text"
                              value={variant.sku}
                              onChange={(e) =>
                                handleSpecificationChanges(
                                  variant.id,
                                  "sku",
                                  e.target.value
                                )
                              }
                              className="bg-primary-foreground"
                              placeholder="Write product sku"
                            />
                          </FormItem>
                        )}
                      </div>

                      {/* product quantity */}
                      <div className="w-full">
                        {isLoading ? (
                          <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                          <FormItem>
                            <FormLabel>Product Quantity</FormLabel>
                            <Input
                              required
                              type="number"
                              min={0}
                              value={variant.product_quantity}
                              onChange={(e) =>
                                handleSpecificationChanges(
                                  variant.id,
                                  "product_quantity",
                                  e.target.value
                                )
                              }
                              className="bg-primary-foreground"
                              placeholder="Write product quantity"
                            />
                          </FormItem>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {/* product price */}
                      <div className="w-full">
                        {isLoading ? (
                          <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                          <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <Input
                              required
                              type="number"
                              min={0}
                              value={variant.product_price}
                              onChange={(e) =>
                                handleSpecificationChanges(
                                  variant.id,
                                  "product_price",
                                  e.target.value
                                )
                              }
                              className="bg-primary-foreground"
                              placeholder="Write product quantity"
                            />
                          </FormItem>
                        )}
                      </div>

                      {/* stock status */}
                      <div className="w-full">
                        {isLoading ? (
                          <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                          <FormItem>
                            <FormLabel>Stock Status</FormLabel>
                            <Popover>
                              {/* trigger */}
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full flex justify-between bg-primary-foreground hover:bg-primary-foreground capitalize"
                                >
                                  {/* selected value */}
                                  {selectedStock || "Select Status"}

                                  {/* icon */}
                                  <ChevronsUpDown className="opacity-50" />
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent className="p-0">
                                <Command>
                                  {/* lists */}
                                  <CommandList>
                                    <CommandGroup>
                                      {stocks.map(({ value, label }) => (
                                        <CommandItem
                                          key={value}
                                          className="capitalize"
                                          onSelect={() => {
                                            handleSpecificationChanges(
                                              variant.id,
                                              "stock_status",
                                              value
                                            );

                                            setSelectedStock(value);
                                          }}
                                        >
                                          {label}
                                          <Check
                                            className={`ml-auto ${
                                              value === selectedStock
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
                      </div>
                    </div>
                  </div>
                </div>

                {/* bottom area (sub section) */}
                {variant.subsections.map((subsection, idx) => (
                  <div
                    key={`subsections${idx}`}
                    className="grid grid-cols-12 items-end gap-4 my-7"
                  >
                    {/* attribute name */}
                    <div className="col-span-3">
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <FormItem className="flex flex-col">
                          <FormLabel>Attribute Name</FormLabel>

                          <Popover>
                            {/* trigger */}
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full flex justify-between bg-primary-foreground hover:bg-primary-foreground"
                              >
                                {/* selected value */}
                                {subsection?.attribute_name ||
                                  "Select an attribute"}

                                {/* icon */}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-0">
                              <Command>
                                {/* search input */}
                                <CommandInput
                                  placeholder="Search attribute..."
                                  className="h-9"
                                />

                                <CommandList>
                                  <CommandEmpty>
                                    No attribute found.
                                  </CommandEmpty>

                                  {/* lists */}
                                  <CommandGroup>
                                    {attributesList.map(
                                      ({ label, _id, attribute_values }) => (
                                        <CommandItem
                                          key={_id}
                                          value={label}
                                          onSelect={() => {
                                            handleSpecificationChanges(
                                              variant.id,
                                              "attribute_name",
                                              label,
                                              subsection.id
                                            );

                                            setAttributeValues(
                                              attribute_values
                                            );
                                          }}
                                        >
                                          {label}
                                          <Check
                                            className={`ml-auto ${
                                              subsection?.attribute_name ===
                                              label
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                          />
                                        </CommandItem>
                                      )
                                    )}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    </div>

                    {/* attribute values */}
                    <div className="col-span-7 grow">
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <FormItem>
                          <FormLabel>Attribute Values</FormLabel>
                          <Select
                            isMulti
                            menuPosition="fixed"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            options={attributeValues}
                            styles={customStyles}
                            defaultValue={null}
                            onChange={(value) => {
                              handleSpecificationChanges(
                                variant.id,
                                "attribute_values",
                                value,
                                subsection.id
                              );
                            }}
                          />
                        </FormItem>
                      )}
                    </div>

                    {/* add new sub section button  */}
                    <div className="col-span-1">
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            handleAddSubsection(variant.id);
                            setAttributeValues([]);
                          }}
                        >
                          <CopyPlus />
                        </Button>
                      )}
                    </div>

                    {/* attribute section remove button */}
                    <div className="col-span-1">
                      {isLoading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <Button
                          onClick={() =>
                            handleDeleteSubsection(variant.id, subsection.id)
                          }
                          disabled={variant.subsections.length === 1}
                          type="button"
                          variant="destructive"
                          className="w-full"
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* add variant button */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <div
                  onClick={handleAddVariant}
                  className={`bg-primary-foreground p-2 hover:bg-muted cursor-pointer h-10 w-full border-2 border-dashed ${
                    variants.length === 8 && "hidden"
                  }`}
                >
                  <div className="flex gap-[5px] items-center justify-center h-full">
                    <CirclePlus size={18} /> Add Variant
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default ProductVariant;

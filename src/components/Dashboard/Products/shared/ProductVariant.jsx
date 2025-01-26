"use client";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { stocks } from "@/data/data";
import { categorieFormSchema } from "@/data/fromSchema";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  CopyPlus,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import ImagePicker from "../../HelperComponent/ImageManager/ImagePicker";

const ProductVariant = ({ isLoading, variants, setVariants }) => {
  // handle default values of form
  const form = useForm({
    resolver: zodResolver(categorieFormSchema),
    defaultValues: {
      img_alt: "",
      img_caption: "",
      categorie_name: "",
      slug_name: "",
      categorie_description: "",
      priority_number: "0",
      parent_categorie: null,
      featured_categorie: "no",
      status: "published",
    },
  });

  const axiosSecure = useAxiosSecure();

  // fetch categories list
  const { data: categoriesList = [] } = useQuery({
    queryKey: ["categories-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/categories/list");
      return data?.data;
    },
  });

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        _id: uuidv4(),
        price: "",
        qty: "",
        image: "",
      },
    ]);
  };

  const handleDeleteVariant = (variantId) => {
    setVariants(variants.filter((variant) => variant._id !== variantId));
  };

  const handleImageSelect = (selectedImage, variantId) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant._id === variantId
          ? { ...variant, image: selectedImage }
          : variant
      )
    );
  };

  const handleSpecificationChanges = (variantId, field, value) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant._id === variantId
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      )
    );
  };

  return (
    <Form {...form}>
      <div className="grid gap-4">
        {variants.map((variant, idx) => (
          <div
            key={variant._id}
            className="first:border-t-0 border-t border-primary"
          >
            {/* top area */}
            {isLoading || (
              <div className="flex justify-between items-center mb-4 pt-5">
                {/* variant number */}
                <TypographyH4 className={"text-base"}>{`Variant ${
                  idx + 1
                }`}</TypographyH4>

                {/* remove variant button */}
                <X
                  className={`cursor-pointer bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full ${
                    variants.length === 1 ? "hidden" : ""
                  }`}
                  onClick={() => handleDeleteVariant(variant._id)}
                />
              </div>
            )}

            {/* middle area */}
            <div className="grid grid-cols-3 gap-4">
              {/* left area (img) */}
              <div className="col-span-1 relative p-2 h-full w-full border-2 border-dashed border-primary min-h-36 max-h-min-h-36">
                {variant.image ? (
                  <div className="relative h-full w-full">
                    {/* img preview */}
                    <Image
                      src={variant.image}
                      alt="image preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />

                    {/* img add button */}
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                      <ImagePicker
                        setAddedImageValue={(selectedImage) =>
                          handleImageSelect(selectedImage, variant._id)
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
                        handleImageSelect(selectedImage, variant._id)
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
                          type="text"
                          value={variant.sku}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
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
                          type="number"
                          min={0}
                          value={variant.sku}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
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
                      <FormItem className="space-y-1 xs:-mt-[5px]">
                        <FormLabel>Product Price</FormLabel>
                        <Input
                          type="number"
                          min={0}
                          value={variant.sku}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
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
                      <FormField
                        control={form.control}
                        name="stock_status"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Stock Status</FormLabel>
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
                                      {stocks.map(({ value, label }) => (
                                        <CommandItem
                                          key={value}
                                          value={label}
                                          onSelect={() => {
                                            form.setValue(
                                              "stock_status",
                                              value
                                            );
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
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="grid-cols-1">
                    {isLoading ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          type="text"
                          value={variant.qty}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
                              "qty",
                              e.target.value
                            )
                          }
                          className="bg-primary-foreground"
                          placeholder="Write product name"
                        />
                      </FormItem>
                    )}
                  </div>

                  <div className="grid-cols-1">
                    {isLoading ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          type="text"
                          value={variant.qty}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
                              "qty",
                              e.target.value
                            )
                          }
                          className="bg-primary-foreground"
                          placeholder="Write product name"
                        />
                      </FormItem>
                    )}
                  </div>

                  <div className="grid-cols-1">
                    {isLoading ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          type="text"
                          value={variant.qty}
                          onChange={(e) =>
                            handleSpecificationChanges(
                              variant._id,
                              "qty",
                              e.target.value
                            )
                          }
                          className="bg-primary-foreground"
                          placeholder="Write product name"
                        />
                      </FormItem>
                    )}
                  </div>
                </div> */}
              </div>
            </div>

            {/* bottom area (input fields) */}
            <div className="grid grid-cols-12 items-end gap-4 my-7">
              {/* category specific attribute */}
              <div className="col-span-3">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="category_specific_attribute"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
                          <FormLabel>Attribute Name</FormLabel>
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
                                  <CommandEmpty>
                                    No category found.
                                  </CommandEmpty>

                                  <CommandGroup>
                                    {categoriesList
                                      .slice(1)
                                      .map(({ label, _id }) => (
                                        <CommandItem
                                          key={_id}
                                          value={label}
                                          onSelect={() => {
                                            form.setValue(
                                              "category_specific_attribute",
                                              _id
                                            );
                                            setCategorieName(label);
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
                      );
                    }}
                  />
                )}
              </div>

              {/* category specific attribute */}
              <div className="col-span-7 grow">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="category_specific_attribute"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col">
                          <FormLabel>Attribute Values</FormLabel>
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
                                  <CommandEmpty>
                                    No category found.
                                  </CommandEmpty>

                                  <CommandGroup>
                                    {categoriesList
                                      .slice(1)
                                      .map(({ label, _id }) => (
                                        <CommandItem
                                          key={_id}
                                          value={label}
                                          onSelect={() => {
                                            form.setValue(
                                              "category_specific_attribute",
                                              _id
                                            );
                                            setCategorieName(label);
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
                      );
                    }}
                  />
                )}
              </div>

              <Button variant="outline" className="col-span-1">
                <CopyPlus />
              </Button>

              <Button
                // onClick={() => handleDeleteSection(section._id)}
                variant="destructive"
                className="col-span-1"
              >
                <Trash2 />
              </Button>

              {/* add attribute button */}
            </div>

            {/* bottom area (input fields) */}
            {/* <div className="grid grid-cols-12 items-end gap-4 my-7">
              <div className="col-span-3">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormItem>
                    <FormLabel>Attribute Name</FormLabel>
                    <Input
                      type="text"
                      value={variant.sku}
                      onChange={(e) =>
                        handleSpecificationChanges(
                          variant._id,
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

              <div className="col-span-3">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormItem>
                    <FormLabel>Attribute Value</FormLabel>
                    <Input
                      type="text"
                      value={variant.sku}
                      onChange={(e) =>
                        handleSpecificationChanges(
                          variant._id,
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

              <Button variant="outline" className="col-span-3">
                <CopyPlus />
              </Button>

              <Button variant="destructive" className="col-span-3">
                <Trash2 />
              </Button>
            </div> */}
          </div>
        ))}

        {/* add variant button */}
        {isLoading || (
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
      </div>
    </Form>
  );
};

export default ProductVariant;

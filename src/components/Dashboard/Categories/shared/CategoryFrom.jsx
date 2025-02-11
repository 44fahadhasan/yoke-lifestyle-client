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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { featureds } from "@/data/data";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import FormFooter from "../../shared/FormFooter/FormFooter";

const CategoryFrom = ({
  form,
  onSubmit,
  loading,
  isLoading,
  metaData,
  setMetaData,
  addedImageValue,
  setAddedImageValue,
  categoriesList,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* category fields */}
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-6 bg-muted p-4">
            {/* left column */}
            <div className="col-span-1 flex flex-col gap-4 flex-grow">
              {/* img */}
              <div className="relative p-2 h-full w-full border-2 border-dashed border-primary min-h-52 sm:min-h-60 max-h-60">
                {addedImageValue ? (
                  <div className="relative h-full w-full">
                    {/* img preview */}
                    <Image
                      src={addedImageValue}
                      alt="categorie image preview"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />

                    {/* img add button */}
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300">
                      <ImagePicker setAddedImageValue={setAddedImageValue} />
                    </div>
                  </div>
                ) : isLoading ? (
                  <Skeleton className="w-full h-full rounded-md" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 h-full">
                    <ImagePicker setAddedImageValue={setAddedImageValue} />
                  </div>
                )}
              </div>

              {/* img alt text */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
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
              )}

              {/* img caption */}
              {isLoading ? (
                <Skeleton className="h-16 w-full rounded-md" />
              ) : (
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
              )}
            </div>

            {/* right column */}
            <div className="col-span-1 xs:col-span-2 grid gap-4 xs:grid-cols-2 grid-cols-1">
              {/* categorie name */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
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
              )}

              {/* slug name */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
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
              )}

              {/* categorie description */}
              <div className="col-span-1 xs:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-24 w-full rounded-md" />
                ) : (
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
                )}
              </div>

              {/* priority number */}
              <div className="col-span-1 xs:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="priority_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-primary-foreground"
                            placeholder="Write priority number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* parent categories */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
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
                                ? categoriesList?.find(
                                    ({ _id }) => _id === field.value
                                  )?.label || field.value
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
                                {categoriesList?.map(({ label, _id }) => (
                                  <CommandItem
                                    key={_id}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("parent_categorie", _id);
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
                      <FormDescription>
                        The category you are currently adding. If it has any
                        parent category, please select one parent category.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}

              {/* feature categorie */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="featured_categorie"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Featured Categorie</FormLabel>
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
                                      form.setValue(
                                        "featured_categorie",
                                        value
                                      );
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
            </div>
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

export default CategoryFrom;

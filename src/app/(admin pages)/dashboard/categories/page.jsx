"use client";
import CategoriesTable from "@/components/Dashboard/Categories/AllCategoriesPage/CategoriesTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { featureds, sorts, statuss } from "@/data/data";
import { Check, ChevronsUpDown, CirclePlus, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AllCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");

  const router = useRouter();

  // handle default values of form
  const form = useForm({
    defaultValues: {
      search: "",
      status: "",
      featured: "",
      sort: "",
    },
  });

  // handle form submission
  const onSubmit = () => {
    form.reset();

    setSearch("");
    setStatus("");
    setFeatured("");
    setSort("");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 xs:flex-row justify-between">
        {/* content */}
        <div className="space-y-1.5">
          <CardTitle className="sm:text-2xl">
            Available Categories (0)
          </CardTitle>
          <CardDescription>Explore your published categories</CardDescription>
        </div>

        {/* add button */}
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/categories/add-categorie")}
        >
          <CirclePlus />
          Add New Categorie
        </Button>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* filters */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex justify-between gap-4">
              {/* search field */}
              <div className="min-w-28 w-1/3">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setSearch(e.target.value);
                          }}
                          className="text-ellipsis"
                          placeholder="Search by categorie name or slug/path"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* filter by status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      {/* trigger */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-[140px] flex justify-between hover:bg-primary-foreground 
                                  ${!field.value && "text-muted-foreground"}
                                )`}
                          >
                            {/* selected value */}
                            {field.value ? field.value : "Filter by	status"}

                            {/* icon */}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 w-[140px]">
                        <Command>
                          {/* lists */}
                          <CommandList>
                            <CommandGroup>
                              {statuss.map(({ value, label }) => (
                                <CommandItem
                                  key={value}
                                  value={label}
                                  onSelect={() => {
                                    form.setValue("status", value);
                                    setStatus(value);
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

              {/* filter by featured */}
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      {/* trigger */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-[150px] flex justify-between hover:bg-primary-foreground 
                                  ${!field.value && "text-muted-foreground"}
                                )`}
                          >
                            {/* selected value */}
                            {field.value ? field.value : "Filter by	featured"}

                            {/* icon */}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 w-[150px]">
                        <Command>
                          {/* lists */}
                          <CommandList>
                            <CommandGroup>
                              {featureds.map(({ value, label }) => (
                                <CommandItem
                                  key={value}
                                  value={label}
                                  onSelect={() => {
                                    form.setValue("featured", value);
                                    setFeatured(value);
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

              {/* sort */}
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      {/* trigger */}
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={`w-[107px] flex justify-between hover:bg-primary-foreground 
                                  ${!field.value && "text-muted-foreground"}
                                )`}
                          >
                            {/* selected value */}
                            {field.value ? field.value : "Sort here"}

                            {/* icon */}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0 w-[107px]">
                        <Command>
                          {/* lists */}
                          <CommandList>
                            <CommandGroup>
                              {sorts.map(({ value, label }) => (
                                <CommandItem
                                  key={value}
                                  value={label}
                                  onSelect={() => {
                                    form.setValue("sort", value);
                                    setSort(value);
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

              {/* clear all button */}
              {(search || status || featured || sort) && (
                <Button type="submit" variant="outline" className="border-none">
                  Clear All
                  <SearchX />
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* categories table */}
        <CategoriesTable />
      </CardContent>
    </Card>
  );
};

export default AllCategoriesPage;

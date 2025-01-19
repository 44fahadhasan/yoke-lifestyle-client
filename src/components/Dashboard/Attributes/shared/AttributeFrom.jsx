"use client";
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
import { Label } from "@/components/ui/label";
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
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AttributeFrom = ({
  form,
  onSubmit,
  loading,
  isLoading,
  inputs,
  setInputs,
}) => {
  // add a new input
  const handleAddInput = () => {
    setInputs((prev) => [...prev, { _id: uuidv4(), value: "" }]);
  };

  // delete an input
  const handleDeleteInput = (id) => {
    setInputs((prev) => prev.filter((input) => input._id !== id));
  };

  // update an input field
  const handleUpdateInput = (id, value) => {
    setInputs((prev) =>
      prev.map((input) => (input._id === id ? { ...input, value } : input))
    );
  };

  const axiosSecure = useAxiosSecure();

  // fetch categories list
  const { data: categoriesList = [] } = useQuery({
    queryKey: ["categories-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/categories/list");
      return data?.data;
    },
  });

  // set value null to category specific attribute when global attribute selected yes
  useEffect(() => {
    const globalAttributeValue = form.getValues("global_attribute");
    if (globalAttributeValue === "yes") {
      form.setValue("category_specific_attribute", null);
    }
  }, [form.watch("global_attribute")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="pt-6">
          <div className="grid bg-muted p-4">
            <div className="col-span-1 sm:col-span-2 grid gap-4 sm:grid-cols-2 grid-cols-1">
              {/* attribute name */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="attribute_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attribute Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-primary-foreground"
                          placeholder="Write attribute name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* priority number */}
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

              {/* global attribute */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="global_attribute"
                  render={({ field }) => (
                    <FormItem className="space-y-1 sm:-mt-[5px]">
                      <FormLabel>Global Attribute</FormLabel>
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
                      <FormDescription>
                        Select "Yes" to apply this attribute to all categories;
                        otherwise, select "No".
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}

              {/* category specific attribute */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="category_specific_attribute"
                  render={({ field }) => {
                    const isDisabled =
                      form.getValues("global_attribute") === "yes";

                    return (
                      <FormItem className="flex flex-col">
                        <FormLabel>Category specific attribute</FormLabel>
                        <Popover>
                          {/* trigger */}
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={isDisabled}
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
                                placeholder="Search categorie..."
                                className="h-9"
                              />
                              {/* lists */}
                              <CommandList>
                                <CommandEmpty>No categorie found.</CommandEmpty>

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
                          Select "No" for Global Attribute, then choose a
                          specific category to apply the attribute.
                        </FormDescription>
                      </FormItem>
                    );
                  }}
                />
              )}

              {/* attribute value */}
              <div className="col-span-1 sm:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <>
                    {inputs.map(({ _id, value }) => (
                      <div key={_id} className="space-y-1 mb-3">
                        <Label htmlFor={_id}>Attribute value</Label>
                        <div className="flex items-center gap-2 mb-2">
                          {/* input filed */}
                          <Input
                            type="text"
                            required
                            id={_id}
                            value={value}
                            onChange={(e) =>
                              handleUpdateInput(_id, e.target.value)
                            }
                            className="bg-primary-foreground"
                            placeholder="Write attribute value"
                          />

                          {/* delete button  */}
                          <Button
                            onClick={() => handleDeleteInput(_id)}
                            variant="destructive"
                            disabled={inputs.length === 1}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* add new section */}
            <div className="col-span-1 sm:col-span-2">
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md mt-3" />
              ) : (
                <div
                  className="bg-primary-foreground p-2 hover:bg-muted cursor-pointer h-11 w-full border"
                  onClick={handleAddInput}
                >
                  <div className="flex items-center justify-center h-full">
                    <Plus />
                  </div>
                </div>
              )}
            </div>
          </div>
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
              className="sm:w-1/5 font-medium"
            >
              {loading ? <LoadingButton>Please wait</LoadingButton> : "Submit"}
            </Button>
          )}
        </CardContent>
      </form>
    </Form>
  );
};

export default AttributeFrom;

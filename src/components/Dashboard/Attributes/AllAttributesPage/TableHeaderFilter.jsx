import { Button } from "@/components/ui/button";
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
import {
  availabilityScope as availabilityScopeData,
  sorts,
  statuss,
} from "@/data/data";
import { Check, ChevronsUpDown, SearchX } from "lucide-react";
import { useForm } from "react-hook-form";

const TableHeaderFilter = ({
  search,
  setSearch,
  AvailabilityScope,
  setAvailabilityScope,
  status,
  setStatus,
  sort,
  setSort,
}) => {
  // handle default values of form
  const form = useForm({
    defaultValues: {
      search: "",
      availability_scope: "",
      status: "",
      sort: "",
    },
  });

  // handle form submission
  const onSubmit = () => {
    form.reset();

    setSearch("");
    setAvailabilityScope("");
    setStatus("");
    setSort("");
  };

  return (
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
                      placeholder="Search by attribute or  categorie name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* filter by availability scope */}
          <FormField
            control={form.control}
            name="availability_scope"
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
                        {field.value ? (
                          <span className="capitalize">{field.value}</span>
                        ) : (
                          "Filter by	scope"
                        )}

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
                          {availabilityScopeData.map(({ value, label }) => (
                            <CommandItem
                              key={value}
                              value={label}
                              onSelect={() => {
                                form.setValue("availability_scope", value);
                                setAvailabilityScope(value);
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
          {(search || AvailabilityScope || status || sort) && (
            <Button type="submit" variant="outline" className="border-none">
              Clear All
              <SearchX />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default TableHeaderFilter;

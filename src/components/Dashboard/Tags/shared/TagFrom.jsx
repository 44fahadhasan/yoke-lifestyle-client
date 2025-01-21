"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { featureds } from "@/data/data";
import { Check, ChevronsUpDown } from "lucide-react";

const TagFrom = ({
  form,
  onSubmit,
  loading,
  isLoading,
  metaData,
  setMetaData,
  tagsList,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* tag fields */}
        <CardContent className="pt-6">
          <div className="grid bg-muted p-4">
            <div className="col-span-1 xs:col-span-2 grid gap-4 xs:grid-cols-2 grid-cols-1">
              {/* tag name */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="tag_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-primary-foreground"
                          placeholder="Write tag name"
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

              {/* tag description */}
              <div className="col-span-1 xs:col-span-2">
                {isLoading ? (
                  <Skeleton className="h-24 w-full rounded-md" />
                ) : (
                  <FormField
                    control={form.control}
                    name="tag_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tag Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            className="bg-primary-foreground"
                            placeholder="Write tag description"
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

              {/* parent tags */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="parent_tag"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Parent Tags</FormLabel>
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
                                ? tagsList?.find(
                                    ({ _id }) => _id === field.value
                                  )?.label || field.value
                                : "Select parent tag"}

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
                                {tagsList?.map(({ label, _id }) => (
                                  <CommandItem
                                    key={_id}
                                    value={label}
                                    onSelect={() => {
                                      form.setValue("parent_tag", _id);
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
                        The tag you are currently adding. If it has any parent
                        tag, please select one parent tag.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}

              {/* feature tag */}
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <FormField
                  control={form.control}
                  name="featured_tag"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Featured Tag</FormLabel>
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
                                      form.setValue("featured_tag", value);
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

export default TagFrom;

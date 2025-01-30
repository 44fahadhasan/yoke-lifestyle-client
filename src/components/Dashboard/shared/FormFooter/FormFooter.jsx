"use client";
import LoadingButton from "@/components/reusable/LoadingButton";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const FormFooter = ({ loading, isLoading, form }) => {
  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
};

export default FormFooter;

"use client";
import { ToastAction } from "@/components/ui/toast";
import { tagFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TagFrom from "../shared/TagFrom";

const AddTagFrom = () => {
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // fetch tags list
  const { data: tagsList = [], refetch } = useQuery({
    queryKey: ["tags-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/tags/list");
      return data?.data;
    },
  });

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag_name: "",
      slug_name: "",
      tag_description: "",
      priority_number: "0",
      parent_tag: null,
      featured_tag: "no",
      status: "published",
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      priority_number: Number(data.priority_number),
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.post("/api/tags", payload);

      if (data.success) {
        refetch();
        form.reset();

        popupToast({
          title: `Great job! ${data.message}`,
          description: "Make changes whenever you need to.",
          action: <ToastAction altText="ok">Ok</ToastAction>,
        });
      }
    } catch ({ response }) {
      const { keyPattern, keyValue } =
        response?.data?.error?.errorResponse || {};

      if (keyPattern?.tag_name && keyValue?.tag_name) {
        return toast.error(
          `The ${keyValue?.tag_name} tag is already exists. Please choose another name.`
        );
      }

      toast.error(response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TagFrom
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      setMetaData={setMetaData}
      tagsList={tagsList}
    />
  );
};

export default AddTagFrom;

"use client";
import { ToastAction } from "@/components/ui/toast";
import { tagFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TagFrom from "../shared/TagFrom";

const EditTagFrom = () => {
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag_name: "",
      slug_name: "",
      tag_description: "",
      priority_number: "",
      parent_tag: null,
      featured_tag: "",
      status: "",
    },
  });

  // fetch tags list
  const { data: tagsList = [], refetch: refetchTagsList } = useQuery({
    queryKey: ["tags-list"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/tags/list");
      return data?.data;
    },
  });

  // fetch tag
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tag-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/tags/details/${id}`);

      const {
        meta_info,
        tag_name,
        slug_name,
        tag_description,
        priority_number,
        featured_tag,
        parent_tag,
        status,
      } = data?.data || {};

      setMetaData(meta_info);

      // set default values of form input filed
      form.reset({
        tag_name,
        slug_name,
        tag_description,
        priority_number: priority_number.toString(),
        featured_tag,
        parent_tag,
        status,
      });

      return data?.data;
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.put(`/api/tags/${id}`, payload);

      if (data.success) {
        refetchTagsList();
        refetch();

        popupToast({
          title: `Great job! ${data.message}`,
          description: "Make changes whenever you need to.",
          action: <ToastAction altText="ok">Ok</ToastAction>,
        });
      }
    } catch ({ response }) {
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
      isLoading={isLoading}
      metaData={metaData}
      setMetaData={setMetaData}
      tagsList={tagsList}
    />
  );
};

export default EditTagFrom;

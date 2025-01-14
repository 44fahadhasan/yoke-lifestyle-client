"use client";
import { ToastAction } from "@/components/ui/toast";
import { categorieFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CategoryFrom from "../shared/CategoryFrom";

const EditCategorieFrom = () => {
  const [addedImageValue, setAddedImageValue] = useState("");
  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(categorieFormSchema),
    defaultValues: {
      img_alt: "",
      img_caption: "",
      categorie_name: "",
      slug_name: "",
      categorie_description: "",
      parent_categorie: null,
      featured_categorie: "",
      status: "",
    },
  });

  // fetch categorie
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categorie-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/categories/details/${id}`);

      const {
        image_url,
        meta_info,
        img_alt,
        img_caption,
        categorie_name,
        slug_name,
        categorie_description,
        featured_categorie,
        parent_categorie,
        status,
      } = data?.data || {};

      setAddedImageValue(image_url);
      setMetaData(meta_info);

      // set default values of form input filed
      form.reset({
        img_alt,
        img_caption,
        categorie_name,
        slug_name,
        categorie_description,
        featured_categorie,
        parent_categorie,
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
      image_url: addedImageValue,
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.put(`/api/categories/${id}`, payload);

      if (data.success) {
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
    <CategoryFrom
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      isLoading={isLoading}
      metaData={metaData}
      setMetaData={setMetaData}
      addedImageValue={addedImageValue}
      setAddedImageValue={setAddedImageValue}
    />
  );
};

export default EditCategorieFrom;

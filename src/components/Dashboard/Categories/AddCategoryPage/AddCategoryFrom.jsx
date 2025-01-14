"use client";
import { ToastAction } from "@/components/ui/toast";
import { categorieFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CategoryFrom from "../shared/CategoryFrom";

const AddCategoryFrom = () => {
  const [addedImageValue, setAddedImageValue] = useState("");
  const [metaData, setMetaData] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      parent_categorie: "",
      featured_categorie: "no",
      status: "published",
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      parent_categorie: parentId,
      image_url: addedImageValue,
      meta_info: metaData,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.post("/api/categories", payload);

      if (data.success) {
        setAddedImageValue("");
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

      if (keyPattern?.categorie_name && keyValue?.categorie_name) {
        return toast.error(
          `The ${keyValue?.categorie_name} category is already exists. Please choose another name.`
        );
      }

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
      setMetaData={setMetaData}
      setParentId={setParentId}
      addedImageValue={addedImageValue}
      setAddedImageValue={setAddedImageValue}
    />
  );
};

export default AddCategoryFrom;

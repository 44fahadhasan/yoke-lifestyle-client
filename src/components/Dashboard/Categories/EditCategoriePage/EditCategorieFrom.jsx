// "use client";
// import { ToastAction } from "@/components/ui/toast";
// import { categorieFormSchema } from "@/data/fromSchema";
// import { useToast } from "@/hooks/use-toast";
// import useAuth from "@/hooks/useAuth";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import CategoryFrom from "../shared/CategoryFrom";

// const EditCategorieFrom = () => {
//   const [addedImageValue, setAddedImageValue] = useState("");
//   const [metaData, setMetaData] = useState([]);
//   const [parentId, setParentId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { id } = useParams();
//   const { auth } = useAuth();
//   const { toast: popupTost } = useToast();
//   const axiosSecure = useAxiosSecure();

//   // fetch categories
//   const {
//     data: categorie = {},
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["categorie"],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/api/categories/details/${id}`);
//       return data?.data;
//     },
//   });

//   console.log({ categorie });

//   // handle default values of form
//   const form = useForm({
//     resolver: zodResolver(categorieFormSchema),
//     defaultValues: {
//       img_alt: "",
//       img_caption: "",
//       categorie_name: "",
//       slug_name: "",
//       categorie_description: "",
//       parent_categorie: "",
//       featured_categorie: "no",
//       status: "published",
//     },
//   });

//   // handle form submission
//   const onSubmit = async (data) => {
//     // payload data
//     const payload = {
//       ...data,
//       parent_categorie: parentId,
//       image_url: addedImageValue,
//       meta_info: metaData,
//       email: auth.email,
//     };

//     try {
//       setLoading(true);

//       const { data } = await axiosSecure.put(`/api/categories/${id}`, payload);

//       if (data.success) {
//         popupTost({
//           title: `Great job! ${data.message}`,
//           description: "Make changes whenever you need to.",
//           action: <ToastAction altText="ok">Ok</ToastAction>,
//         });
//       }
//     } catch ({ response }) {
//       toast.error(response?.data?.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CategoryFrom
//       form={form}
//       onSubmit={onSubmit}
//       loading={loading}
//       setMetaData={setMetaData}
//       setParentId={setParentId}
//       addedImageValue={addedImageValue}
//       setAddedImageValue={setAddedImageValue}
//     />
//   );
// };

// export default EditCategorieFrom;

"use client";
import { ToastAction } from "@/components/ui/toast";
import { categorieFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CategoryFrom from "../shared/CategoryFrom";

const EditCategorieFrom = () => {
  const [addedImageValue, setAddedImageValue] = useState("");
  const [metaData, setMetaData] = useState([]);
  const [parentId, setParentId] = useState(null);
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
      parent_categorie: "",
      featured_categorie: "no",
      status: "published",
    },
  });

  const { reset } = form;

  // fetch categorie
  const {
    data: categorie = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categorie-details", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/categories/details/${id}`);
      return data?.data;
    },
  });

  useEffect(() => {
    setAddedImageValue(categorie.image_url);
    setParentId(categorie.parent_categorie);
    setMetaData(categorie.meta_info);

    reset({
      img_alt: categorie.img_alt,
      img_caption: categorie.img_caption,
      categorie_name: categorie.categorie_name,
      slug_name: categorie.slug_name,
      categorie_description: categorie.categorie_description,
      parent_categorie: parentId,
      featured_categorie: categorie.featured_categorie,
      status: categorie.status,
    });
  }, []);

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
      setMetaData={setMetaData}
      setParentId={setParentId}
      addedImageValue={addedImageValue}
      setAddedImageValue={setAddedImageValue}
    />
  );
};

export default EditCategorieFrom;

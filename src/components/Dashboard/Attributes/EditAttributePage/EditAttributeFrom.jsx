"use client";
import { ToastAction } from "@/components/ui/toast";
import { attributeFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import AttributeFrom from "../shared/AttributeFrom";

const EditAttributeFrom = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([{ _id: uuidv4(), value: "" }]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [categorieName, setCategorieName] = useState(null);

  const { id } = useParams();
  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      attribute_name: "",
      priority_number: "",
      availability_scope: "",
      category_specific_attribute: null,
      status: "",
    },
  });

  // fetch product attribute
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product-attribute", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/product-attributes/details/${id}`
      );

      const {
        attribute_name,
        priority_number,
        availability_scope,
        category_specific_attribute,
        status,
        categorie_name,
        attribute_values,
      } = data?.data || {};

      setInputs(attribute_values);
      setCategorieName(categorie_name);

      // set default values of form input filed
      form.reset({
        attribute_name,
        priority_number: priority_number.toString(),
        availability_scope,
        category_specific_attribute,
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
      priority_number: Number(data.priority_number),
      categorie_name: categorieName,
      attribute_values: attributeValues,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.put(
        `/api/product-attributes/${id}`,
        payload
      );

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

  // modify attribute values
  useEffect(
    () =>
      setAttributeValues(
        inputs.map(({ value }) => ({
          value,
        }))
      ),
    [inputs]
  );

  return (
    <AttributeFrom
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      isLoading={isLoading}
      inputs={inputs}
      setInputs={setInputs}
      setCategorieName={setCategorieName}
    />
  );
};

export default EditAttributeFrom;

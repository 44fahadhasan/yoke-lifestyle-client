"use client";
import { ToastAction } from "@/components/ui/toast";
import { attributeFormSchema } from "@/data/fromSchema";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import AttributeFrom from "../shared/AttributeFrom";

const AddAttributeFrom = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([{ _id: uuidv4(), value: "" }]);
  const [attributeValues, setAttributeValues] = useState([]);

  const { auth } = useAuth();
  const { toast: popupToast } = useToast();
  const axiosSecure = useAxiosSecure();

  // handle default values of form
  const form = useForm({
    resolver: zodResolver(attributeFormSchema),
    defaultValues: {
      attribute_name: "",
      priority_number: "0",
      global_attribute: "yes",
      category_specific_attribute: null,
      status: "published",
    },
  });

  // handle form submission
  const onSubmit = async (data) => {
    // payload data
    const payload = {
      ...data,
      priority_number: Number(data.priority_number),
      attribute_values: attributeValues,
      email: auth.email,
    };

    try {
      setLoading(true);

      const { data } = await axiosSecure.post(
        "/api/product-attributes",
        payload
      );

      if (data.success) {
        form.reset();
        setInputs([{ _id: uuidv4(), value: "" }]);

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
      inputs={inputs}
      setInputs={setInputs}
    />
  );
};

export default AddAttributeFrom;

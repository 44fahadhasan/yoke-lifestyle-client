import { z } from "zod";

// schema for categorie
const categorieFormSchema = z.object({
  img_alt: z.string(),
  img_caption: z.string(),
  categorie_name: z.string().min(1, "Category name is required."),
  slug_name: z
    .string()
    .min(1, "Slug name is required.")
    .regex(
      /^[a-z-]+$/,
      "Slug name can only contain lowercase letters and hyphens."
    ),
  categorie_description: z.string(),
  priority_number: z
    .string()
    .regex(/^\d+$/, "Priority number must be a valid number.")
    .min(0, "Priority number must be at least 0."),
  parent_categorie: z.union([z.string(), z.literal(null)]).default(null),
  featured_categorie: z.string(),
  status: z.string(),
});

// schema for tag
const tagFormSchema = z.object({
  tag_name: z.string().min(1, "Tag name is required."),
  slug_name: z
    .string()
    .min(1, "Slug name is required.")
    .regex(
      /^[a-z-]+$/,
      "Slug name can only contain lowercase letters and hyphens."
    ),
  tag_description: z.string(),
  priority_number: z
    .string()
    .regex(/^\d+$/, "Priority number must be a valid number.")
    .min(0, "Priority number must be at least 0."),
  parent_tag: z.union([z.string(), z.literal(null)]).default(null),
  featured_tag: z.string(),
  status: z.string(),
});

// schema for brand
const brandFormSchema = z.object({
  img_alt: z.string(),
  brand_name: z.string().min(1, "Brand name is required."),
  slug_name: z
    .string()
    .min(1, "Slug name is required.")
    .regex(
      /^[a-z-]+$/,
      "Slug name can only contain lowercase letters and hyphens."
    ),
  brand_description: z.string(),
  priority_number: z
    .string()
    .regex(/^\d+$/, "Priority number must be a valid number.")
    .min(0, "Priority number must be at least 0."),
  featured_brand: z.string(),
  status: z.string(),
});

// Schema for attribute form
const attributeFormSchema = z.object({
  attribute_name: z.string().min(1, "Attribute name is required."),
  priority_number: z
    .string()
    .regex(/^\d+$/, "Priority number must be a valid number.")
    .min(0, "Priority number must be at least 0."),
  availability_scope: z.string(),
  category_specific_attribute: z
    .union([z.string(), z.literal(null)])
    .default(null),
  status: z.string(),
});

export {
  attributeFormSchema,
  brandFormSchema,
  categorieFormSchema,
  tagFormSchema,
};

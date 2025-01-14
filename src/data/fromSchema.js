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
  parent_categorie: z.union([z.string(), z.literal(null)]).default(null),
  featured_categorie: z.string(),
  status: z.string(),
});

export { categorieFormSchema };

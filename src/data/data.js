const metaTags = [
  // Basic HTML Meta Tags
  { name: "theme-color", content: "#000000" },
  { name: "author", content: "Your Name or Brand" },
  { name: "description", content: "Your webpage description here." },
  {
    name: "keywords",
    content: "HTML, CSS, JavaScript, tutorials, web development",
  },
  { name: "robots", content: "index, follow" },
  { name: "googlebot", content: "index, follow" },
  { name: "copyright", content: "Your Company Name" },
  { name: "application-name", content: "Your App Name" },
  { name: "generator", content: "Your CMS or Framework" },
  { name: "rating", content: "General" },
  { name: "canonical", content: "https://yourwebsite.com/page-url" },
  { name: "referrer", content: "no-referrer-when-downgrade" },
  { name: "language", content: "English" },
  { name: "distribution", content: "global" },
  { name: "reply-to", content: "support@example.com" },
  { name: "subject", content: "Web Development" },
  { name: "expires", content: "never" },
  { name: "coverage", content: "Worldwide" },
  { name: "revisit-after", content: "7 days" },

  // Twitter Meta Tags
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: "Your Page Title" },
  {
    name: "twitter:description",
    content: "Your page description for Twitter sharing.",
  },
  { name: "twitter:image", content: "https://example.com/image.jpg" },
  {
    name: "twitter:image:alt",
    content: "Image description for accessibility.",
  },
  { name: "twitter:site", content: "@YourTwitterHandle" },
  { name: "twitter:creator", content: "@CreatorTwitterHandle" },

  // Open Graph Meta Tags
  { property: "og:title", content: "Your Page Title" },
  {
    property: "og:description",
    content: "Your page description for social sharing.",
  },
  { property: "og:image", content: "https://example.com/image.jpg" },
  { property: "og:image:alt", content: "Image description for accessibility." },
  { property: "og:image:type", content: "image/jpeg" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:url", content: "https://example.com" },
  { property: "og:type", content: "website" },
  { property: "og:locale", content: "en_US" },
  { property: "og:site_name", content: "Your Site Name" },
  { property: "og:updated_time", content: "2025-01-08T12:00:00Z" },

  // Facebook Meta Tags
  { property: "fb:app_id", content: "1234567890" },
  { property: "fb:admins", content: "123456789,987654321" },

  // Application Meta Tags
  { name: "apple-mobile-web-app-capable", content: "yes" },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent",
  },
  { name: "apple-mobile-web-app-title", content: "Your App Name" },
  { name: "msapplication-TileColor", content: "#ffffff" },
  {
    name: "msapplication-TileImage",
    content: "https://example.com/tile-image.png",
  },
  {
    name: "apple-itunes-app",
    content:
      "app-id=your-app-id, app-argument=https://yourwebsite.com/page-url",
  },
  { name: "google-play-app", content: "app-id=com.example.app" },
  { name: "manifest", content: "/manifest.json" },

  // Location Meta Tags
  { name: "geo.region", content: "US-NY" },
  { name: "geo.placename", content: "New York City" },
  { name: "geo.position", content: "40.7128;-74.0060" },
  { name: "ICBM", content: "40.7128, -74.0060" },

  // Security and Privacy
  {
    name: "content-security-policy",
    content: "default-src 'self'; script-src 'self' 'unsafe-inline';",
  },
  { name: "permissions-policy", content: "geolocation=()" },
  { name: "referrer-policy", content: "no-referrer" },
  { name: "x-ua-compatible", content: "IE=edge" },
  {
    name: "strict-transport-security",
    content: "max-age=31536000; includeSubDomains",
  },

  // Alternative Languages
  { property: "og:locale:alternate", content: "es_ES" },

  // App Links Meta Tags
  { property: "al:ios:app_name", content: "Your iOS App" },
  { property: "al:ios:app_store_id", content: "123456789" },
  { property: "al:ios:url", content: "yourapp://content" },
  { property: "al:android:app_name", content: "Your Android App" },
  { property: "al:android:package", content: "com.yourapp" },
  { property: "al:android:url", content: "yourapp://content" },
];

// separate meta tags into two arrays
const nameTags = metaTags.filter(({ name }) => name);
const propertyTags = metaTags.filter(({ property }) => property);

const featureds = [
  { value: "no", label: "no" },
  { value: "yes", label: "yes" },
];

const sorts = [
  { value: "Newest", label: "Newest" },
  { value: "Oldest", label: "Oldest" },
];

const statuss = [
  { value: "Published", label: "Published" },
  { value: "Archived", label: "Archived" },
  { value: "Draft", label: "Draft" },
];

const availabilityScope = [
  { value: "global", label: "global" },
  { value: "category", label: "category" },
];

const tabs = [
  { value: "product_variant", label: "Product Variant" },
  { value: "product_description", label: "Product Description" },
  { value: "additional_information", label: "Additional Information" },
  { value: "shipping_warranty", label: "Shipping & Warranty" },
];

const discounts = [
  { value: "percentage", label: "percentage" },
  { value: "direct", label: "direct" },
];

const stocks = [
  { value: "in stock", label: "in stock" },
  { value: "out of stock", label: "out of stock" },
  { value: "pre order", label: "pre rder" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    borderRadius: "0.375rem",
    backgroundColor: "hsl(var(--primary-foreground))",
    color: "hsl(var(--foreground))",
    boxShadow: "0 0 0 1px hsl(var(--border))",
    padding: "0px",
    minHeight: "0px",
  }),

  menu: (provided) => ({
    ...provided,
    borderWidth: "1px",
    borderColor: "hsl(var(--border))",
    backgroundColor: "hsl(var(--popover))",
    borderRadius: "0.375rem",
    boxShadow: "hsl(var(--shadow)) 0px 4px 16px",
    color: "hsl(var(--popover-foreground))",
    marginTop: "0.5rem",
    zIndex: 9999,
  }),

  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    fontSize: "14px",
    padding: "0.375rem 0.5rem",
    backgroundColor: isFocused
      ? "hsl(var(--accent))"
      : isSelected
      ? "hsl(var(--accent))"
      : "hsl(var(--popover))",
    color: isFocused
      ? "hsl(var(--accent-foreground))"
      : isSelected
      ? "hsl(var(--accent-foreground))"
      : "hsl(var(--foreground))",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--accent))",
    color: "hsl(var(--accent-foreground))",
    padding: "0 0.5rem",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "hsl(var(--accent-foreground))",
    fontSize: "0.875rem",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: "hsl(var(--destructive))",
    color: "hsl(var(--destructive-foreground))",
    cursor: "pointer",
    transition: "color 0.2s",
    ":hover": {
      backgroundColor: "#761E1E",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "hsl(var(--accent-foreground))",
    fontSize: "0.875rem",
  }),
};

export {
  availabilityScope,
  customStyles,
  discounts,
  featureds,
  metaTags,
  nameTags,
  propertyTags,
  sorts,
  statuss,
  stocks,
  tabs,
};

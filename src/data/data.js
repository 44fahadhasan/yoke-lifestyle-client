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
  { value: "In Stock", label: "In Stock" },
  { value: "Stock Out", label: "Stock Out" },
];

export {
  availabilityScope,
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

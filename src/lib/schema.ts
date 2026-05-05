/**
 * JSON-LD Schema Helpers for SEO
 * Provides structured data markup for search engines
 */

const BASE_URL = "https://biotechvet.com.vn";

/**
 * Organization Schema
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "BIOTECH-VET",
  alternateName: "biotechvet",
  description: "Tiên phong sản xuất thuốc thú y công nghệ USA tại Việt Nam. Nhà máy đạt tiêu chuẩn GMP-WHO.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: `${BASE_URL}/images/logo.png`,
    contentUrl: `${BASE_URL}/images/logo.png`,
    width: 512,
    height: 512,
    caption: "BIOTECH-VET Logo",
  },
  image: {
    "@id": `${BASE_URL}/#logo`,
  },
  sameAs: [
    "https://www.facebook.com/biotechvet",
    "https://www.youtube.com/biotechvet",
    "https://zalo.me/biotechvet",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+84-xxx-xxx-xxx",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+84-yyy-yyy-yyy",
      contactType: "technical support",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khu công nghiệp",
    addressLocality: "Hà Nội",
    addressRegion: "Hà Nội",
    postalCode: "100000",
    addressCountry: "VN"
  },
  keywords: "thuốc thú y, biotechvet, chăn nuôi, gmp-who, phòng bệnh vật nuôi, điều trị bệnh thú y",
};

/**
 * Breadcrumb Schema
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Article Schema
 */
export function articleSchema(article: {
  title: string;
  description: string;
  content?: string;
  image?: string;
  author?: string;
  publishDate: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${BASE_URL}/bai-viet/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    image: article.image || `${BASE_URL}/images/default-article.png`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      "@type": "Organization",
      name: article.author || "biotechvet Editorial Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "BIOTECH-VET",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/bai-viet/${article.slug}`,
    },
  };
}

/**
 * Product Schema
 */
export function productSchema(product: {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  slug: string;
  category?: string;
  registrationNumber?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/san-pham/${product.slug}#product`,
    name: product.name,
    description: product.description || product.name,
    image: product.image || `${BASE_URL}/images/default-product.png`,
    sku: product.registrationNumber || product.id,
    brand: {
      "@type": "Brand",
      name: "BIOTECH-VET"
    },
    manufacturer: {
      "@type": "Organization",
      name: "BIOTECH-VET",
      url: BASE_URL,
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/san-pham/${product.slug}`,
      priceCurrency: "VND",
      price: product.price || 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "BIOTECH-VET"
      }
    },
    category: product.category || "Veterinary Medicine",
    url: `${BASE_URL}/san-pham/${product.slug}`,
  };
}

/**
 * Job Posting Schema
 */
export function jobPostingSchema(job: {
  title: string;
  description: string;
  datePosted: string;
  location?: string;
  employmentType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    hiringOrganization: {
      "@type": "Organization",
      name: "BIOTECH-VET",
      sameAs: BASE_URL,
      logo: `${BASE_URL}/images/logo.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Hà Nội",
        addressRegion: "Hà Nội",
        addressCountry: "VN"
      }
    },
    employmentType: job.employmentType || "FULL_TIME"
  };
}

/**
 * FAQ Schema
 */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Local Business Schema
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  name: "BIOTECH-VET",
  image: `${BASE_URL}/images/logo.png`,
  description: "Nhà máy sản xuất thuốc thú y đạt chuẩn GMP-WHO công nghệ USA",
  url: BASE_URL,
  telephone: "+84-xxx-xxx-xxx",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khu công nghiệp",
    addressLocality: "Hà Nội",
    addressRegion: "Hà Nội",
    postalCode: "100000",
    addressCountry: "VN"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 21.0285,
    longitude: 105.8542
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    opens: "08:00",
    closes: "17:30"
  },
  sameAs: [
    "https://www.facebook.com/biotechvet",
    "https://www.youtube.com/biotechvet",
  ],
};

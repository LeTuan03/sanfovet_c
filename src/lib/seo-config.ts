/**
 * SEO Configuration
 * Centralized configuration for SEO-related settings
 */

export const SEO_CONFIG = {
  BASE_URL: "https://biotechvet.com.vn",
  SITE_NAME: "BIOTECH-VET",
  SITE_DESCRIPTION: "BIOTECH-VET - Tiên phong sản xuất thuốc thú y công nghệ USA tại Việt Nam",
  COMPANY_NAME: "Công Ty CP Công Nghệ Sinh Học Thú Y",
  
  // Default Images
  DEFAULT_OG_IMAGE: "/images/about.jpg",
  DEFAULT_ARTICLE_IMAGE: "/images/default-article.png",
  DEFAULT_PRODUCT_IMAGE: "/images/default-product.png",
  LOGO_IMAGE: "/images/logo.png",
  
  // Social Media
  FACEBOOK_URL: "https://www.facebook.com/biotechvet",
  YOUTUBE_URL: "https://www.youtube.com/biotechvet",
  
  // Contact
  PHONE: "+84-xxx-xxx-xxx",
  EMAIL: "contact@biotechvet.com.vn",
  
  // Image Dimensions
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
  
  // Locale
  LOCALE: "vi_VN",
  LANGUAGE: "vi",
  
  // SEO Keywords
  CORE_KEYWORDS: [
    "thuốc thú y",
    "biotechvet",
    "chăn nuôi",
    "gmp-who",
    "phòng bệnh vật nuôi",
    "điều trị bệnh thú y",
    "công nghệ usa",
    "biotech-vet"
  ],
  
  // Pages
  PAGES: {
    HOME: { path: "/", keywords: [] },
    PRODUCTS: { path: "/san-pham", keywords: ["sản phẩm", "thuốc bổ trợ"] },
    ABOUT: { path: "/gioi-thieu", keywords: ["giới thiệu", "về chúng tôi"] },
    NEWS: { path: "/tin-tuc", keywords: ["tin tức", "bài viết"] },
    HANDBOOK: { path: "/cam-nang-chan-nuoi", keywords: ["cẩm nang", "kỹ thuật"] },
    DISEASES: { path: "/benh-va-dieu-tri-benh", keywords: ["bệnh", "điều trị"] },
    CONTACT: { path: "/lien-he", keywords: ["liên hệ", "tư vấn"] },
    RECRUITMENT: { path: "/tuyen-dung", keywords: ["tuyển dụng", "việc làm"] },
    CATALOGUE: { path: "/catalogue", keywords: ["catalogue", "tài liệu"] },
  },
};

/**
 * Generate OpenGraph image URL with dynamic text
 * Can be used with services like og-image-gen or similar
 */
export function generateOGImageUrl(
  title: string,
  description?: string,
  theme?: "primary" | "secondary" | "accent"
): string {
  // Return default image - in production, you could use a dynamic OG image generation service
  return SEO_CONFIG.DEFAULT_OG_IMAGE;
}

/**
 * Get page keywords with core keywords
 */
export function getPageKeywords(pageKeywords: string[]): string {
  return [...new Set([...pageKeywords, ...SEO_CONFIG.CORE_KEYWORDS])].join(", ");
}

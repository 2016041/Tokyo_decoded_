export type {
  Locale,
  LocalizedString,
  NavItem,
  SocialAccount,
  Category,
  Post,
  PostBody,
  AffiliateLink,
  Tool,
  RecommendedCategory,
  RecommendedItem,
  StructuredDataWebSite,
  StructuredDataOrganization,
  StructuredDataArticle,
  StructuredDataBreadcrumb,
} from "@/content/types";

export type SubscribeFormInput = { email: string };
export type ContactFormInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
export type SubscribeRequest = { email: string };
export type ContactRequest = ContactFormInput & { recaptchaToken: string };
export type ApiResult<T = void> = { success: boolean; data?: T; error?: string };
export type OgImageParams = { title: string; category: string };

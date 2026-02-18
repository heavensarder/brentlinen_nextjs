import ContactForm from "@/components/ContactForm";
import { Metadata } from 'next';
import { getSeoSettings } from "@/app/actions/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSeoSettings("/contact");
  
  if (!data) return {};

  return {
    title: data.title || undefined,
    description: data.description || undefined,
    keywords: data.keywords?.split(",").map((k: string) => k.trim()) || undefined,
    metadataBase: new URL("https://brentlinenhire.co.uk"),
    alternates: {
        canonical: data.canonicalUrl || "https://brentlinenhire.co.uk/contact",
    },
    robots: {
        index: data.robots?.includes("noindex") ? false : true,
        follow: data.robots?.includes("nofollow") ? false : true,
    },
    openGraph: {
        title: data.ogTitle || data.title || undefined,
        description: data.ogDescription || data.description || undefined,
        images: data.ogImage ? [{ url: data.ogImage }] : undefined,
        type: "website",
        locale: "en_GB",
        url: "https://brentlinenhire.co.uk/contact",
        siteName: "Brent Linen Hire",
    },
    twitter: {
        card: (data.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
        title: data.ogTitle || data.title || undefined,
        description: data.ogDescription || data.description || undefined,
        images: data.ogImage ? [data.ogImage] : undefined,
    }
  };
}

export default function ContactPage() {
  return <ContactForm />;
}

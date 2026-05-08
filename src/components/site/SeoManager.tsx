import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_IMAGE, SeoConfig, SITE_URL, getDoctorSeo, routeSeo, seoKeywords } from "@/lib/seo";

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!element) {
    if (selector.startsWith("meta")) {
      element = document.createElement("meta");
      const nameMatch = selector.match(/name="([^"]+)"/);
      const propertyMatch = selector.match(/property="([^"]+)"/);
      if (nameMatch) element.setAttribute("name", nameMatch[1]);
      if (propertyMatch) element.setAttribute("property", propertyMatch[1]);
    } else {
      element = document.createElement("link");
      element.setAttribute("rel", "canonical");
    }
    document.head.appendChild(element);
  }

  element.setAttribute(attr, value);
};

const removeStructuredData = () => {
  document.querySelectorAll('script[data-seo="structured-data"]').forEach((node) => node.remove());
};

const addStructuredData = (data?: Record<string, unknown>) => {
  removeStructuredData();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo", "structured-data");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

const applySeo = (seo: SeoConfig, pathname: string) => {
  const canonical = `${SITE_URL}${seo.canonicalPath || pathname}`;
  const image = seo.image || DEFAULT_IMAGE;
  const keywords = seo.keywords || seoKeywords;

  document.title = seo.title;
  setMeta('meta[name="description"]', "content", seo.description);
  setMeta('meta[name="keywords"]', "content", keywords);
  setMeta('meta[name="author"]', "content", "Kamla Hospital");
  setMeta('meta[name="robots"]', "content", "index, follow");
  setMeta('link[rel="canonical"]', "href", canonical);

  setMeta('meta[property="og:title"]', "content", seo.title);
  setMeta('meta[property="og:description"]', "content", seo.description);
  setMeta('meta[property="og:type"]', "content", "website");
  setMeta('meta[property="og:url"]', "content", canonical);
  setMeta('meta[property="og:image"]', "content", image);
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "content", seo.title);
  setMeta('meta[name="twitter:description"]', "content", seo.description);
  setMeta('meta[name="twitter:image"]', "content", image);

  addStructuredData(seo.structuredData);
};

const SeoManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const doctorId = pathname.startsWith("/doctors/") ? pathname.split("/")[2] : undefined;
    const fallbackSeo: SeoConfig = {
      title: "Kamla Hospital Jhansi | Page Not Found",
      description: "The requested page could not be found on Kamla Hospital Jhansi website.",
      canonicalPath: pathname,
    };

    const seo = pathname.startsWith("/doctors/")
      ? getDoctorSeo(doctorId) || fallbackSeo
      : routeSeo[pathname] || fallbackSeo;

    applySeo(seo, pathname);
  }, [pathname]);

  return null;
};

export default SeoManager;

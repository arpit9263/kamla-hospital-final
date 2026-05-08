import { useEffect } from "react";

const CloudflareAnalytics = () => {
  useEffect(() => {
    const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN;

    if (!token || document.querySelector("script[data-cf-beacon]")) return;

    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.setAttribute("data-cf-beacon", JSON.stringify({ token }));
    document.body.appendChild(script);
  }, []);

  return null;
};

export default CloudflareAnalytics;

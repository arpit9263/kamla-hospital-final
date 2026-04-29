import { PhoneCall } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const EmergencyButton = () => {
  return (
    <a
      href={`tel:${hospitalInfo.phone.emergency}`}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Emergency call"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse-ring" />
        <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-[0_8px_30px_-6px_hsl(0_85%_50%/0.6)] flex items-center gap-2 px-4 py-3 md:px-5 md:py-3.5 hover:scale-105 transition-transform duration-200">
          <PhoneCall className="w-5 h-5" />
          <span className="font-bold text-sm hidden sm:inline">Emergency 24/7</span>
        </div>
      </div>
    </a>
  );
};

export default EmergencyButton;

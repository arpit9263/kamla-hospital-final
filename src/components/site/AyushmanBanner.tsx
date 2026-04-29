import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const AyushmanBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#1a6b3a] via-[#1e7d44] to-[#1a6b3a] text-white relative">
          <div className="container-tight py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm font-medium leading-snug">
                <span className="font-bold text-yellow-300">Ayushman Bharat (PM-JAY)</span>
                {" "}— Cashless treatment up to{" "}
                <span className="font-bold">₹5 Lakh/year</span> accepted here.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                asChild
                size="sm"
                className="h-7 px-3 text-xs bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold border-0 shadow-none"
              >
                <a href="https://beneficiary.nha.gov.in/" target="_blank" rel="noopener noreferrer">
                  Check Eligibility <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AyushmanBanner;

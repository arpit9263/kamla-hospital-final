import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, ExternalLink, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AyushmanFloatingWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-72 bg-white rounded-3xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.22)] border border-green-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#1a6b3a] to-[#2a8a4e] p-4 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm leading-tight">Ayushman Bharat</p>
                      <p className="text-white/70 text-[10px] uppercase tracking-wider">PM-JAY Scheme</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close Ayushman Bharat information"
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors mt-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/90 leading-relaxed">
                  Get free cashless treatment up to <strong className="text-yellow-300">₹5 Lakh/year</strong> at our hospital.
                </p>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  {[
                    "Free treatment for eligible families",
                    "No paperwork at the time of admission",
                    "Covers 1500+ medical procedures",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1a6b3a] mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 space-y-2">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-[#1a6b3a] hover:bg-[#155831] text-white text-xs h-8 rounded-xl"
                  >
                    <a href="https://beneficiary.nha.gov.in/" target="_blank" rel="noopener noreferrer">
                      Check Eligibility <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full border-green-200 text-[#1a6b3a] text-xs h-8 rounded-xl hover:bg-green-50"
                  >
                    <a href="tel:14555">
                      <Phone className="w-3 h-3 mr-1" /> Helpline: 14555
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger button */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 bg-[#1a6b3a] hover:bg-[#155831] text-white rounded-full shadow-[0_8px_32px_-8px_rgba(26,107,58,0.55)] px-4 py-2.5 text-xs font-bold transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label="Check Ayushman Eligibility"
        >
          <Shield className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Check Ayushman Eligibility</span>
          <span className="sm:hidden">PM-JAY</span>
        </motion.button>
      </div>
    </>
  );
};

export default AyushmanFloatingWidget;

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield } from "lucide-react";

const ayushmanFaqs = [
  {
    q: "What is Ayushman Bharat PM-JAY?",
    a: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world's largest publicly funded health assurance scheme, providing cashless healthcare coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
  },
  {
    q: "Is Kamla Hospital registered under Ayushman Bharat?",
    a: "Yes, Kamla Hospital is an empaneled hospital under the Ayushman Bharat PM-JAY scheme. Our dedicated Ayushman Mitra desk at the reception assists beneficiaries with eligibility verification, card issuance, and cashless admission.",
  },
  {
    q: "How do I know if I am eligible for the scheme?",
    a: "You can check your eligibility by visiting pmjay.gov.in, calling the toll-free helpline 14555, or simply visiting our hospital with your Aadhaar card. Our Ayushman Mitra will verify your eligibility on the spot using the government portal.",
  },
  {
    q: "What treatments are covered under PM-JAY at Kamla Hospital?",
    a: "The scheme covers over 1,500 medical and surgical packages including cardiology, orthopedics, neurology, general surgery, maternity care, cancer care, and more. ICU charges, medicines, diagnostics, and post-hospitalization follow-up (up to 15 days) are also covered.",
  },
  {
    q: "Do I need to pay anything if I have an Ayushman card?",
    a: "No. Under PM-JAY, treatment is completely cashless and free for eligible beneficiaries. All costs are settled directly between Kamla Hospital and the National Health Authority (NHA). You do not pay anything out of pocket.",
  },
  {
    q: "Can I get the Ayushman card made at Kamla Hospital?",
    a: "Yes. If you are eligible and don't have a card yet, our Ayushman Mitra can help you generate your Ayushman Bharat Golden Card on the spot using your Aadhaar-based eKYC. The card is free of charge.",
  },
  {
    q: "Is there a limit on the number of family members covered?",
    a: "There is no cap on family size or age under PM-JAY. All members of an eligible family are covered, including elderly parents and newborns. Senior citizens aged 70+ are now additionally covered regardless of income level.",
  },
];

const AyushmanFAQ = () => {
  return (
    <section className="section-padding bg-[#f0faf4]">
      <div className="container-tight max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            <Shield className="w-3.5 h-3.5" />
            Ayushman Bharat FAQs
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
            Common questions about the scheme
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before availing Ayushman Bharat benefits at Kamla Hospital.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {ayushmanFaqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`ayushman-${i}`}
              className="border border-green-100 rounded-2xl px-5 bg-white shadow-[0_2px_12px_-2px_rgba(26,107,58,0.08)] data-[state=open]:shadow-[0_6px_24px_-6px_rgba(26,107,58,0.15)] data-[state=open]:border-green-200"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline text-gray-900">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AyushmanFAQ;

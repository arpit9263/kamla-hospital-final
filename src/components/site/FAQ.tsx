import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/hospital";

const FAQ = () => {
  return (
    <section className="section-padding">
      <div className="container-tight max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">FAQ</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need to know before your visit.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-2xl px-5 bg-card shadow-soft data-[state=open]:shadow-medium"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">
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

export default FAQ;

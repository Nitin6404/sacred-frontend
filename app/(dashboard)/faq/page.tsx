import { getUrlMetadataForSeo } from "@/app/utils/functions";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faq } from "@/constants/faq";
import { Metadata } from "next";

interface FAQSectionProps {
  title: string;
  subtitle: string;
  items: { question: string; answer: string | JSX.Element }[];
}

const FAQSection = ({ title, subtitle, items }: FAQSectionProps) => {
  return (
    <div className="w-full space-y-6 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">{subtitle}</p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-0">
            <AccordionTrigger className="flex items-center justify-between rounded-md bg-muted px-4 py-3 text-left font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="bg-muted/50 px-4 py-3 text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default function FAQComp() {
  return (
    <div className="mx-auto flex w-full max-w-[80%] flex-col items-center gap-12 py-12 md:py-20">
      <FAQSection
        items={faq.userfaq}
        title="User Frequently Asked Questions"
        subtitle="Find answers to the most common questions about our product."
      />
      <FAQSection
        items={faq.vendorfaq}
        title="Vendor Frequently Asked Questions"
        subtitle="Find answers to the most common questions about our product."
      />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: "/faq",
    fallbackTitle: "FAQs | Sacred Shadi",
    fallbackDescription:
      "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button"
  });
  return data;
}

export const revalidate = 60;

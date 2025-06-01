import { features } from "./data";
import { spaceGrotesk } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/ui/accordion";

const Features = () => {
  return (
    <Accordion type="single" collapsible>
      {features.map((feature, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className="hover:cursor-pointer focus:outline-none">
            <span className={`${spaceGrotesk.className} text-base font-medium`}>
              {feature.name}
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            {feature.description}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Features;

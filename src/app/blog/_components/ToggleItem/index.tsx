import Image from "next/image";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import type { AccordionProps } from "@mui/material/Accordion";
import "./styles.scss";

export type ToggleItemProps = React.PropsWithChildren<{
  title: string;
  accordionProps?: Partial<AccordionProps>;
}>;

const ExpandIcon = () => <Image src="/images/down-arrow.png" alt="Ícone de seta" width={20} height={20} className="w-5 h-5" />;

export function ToggleItem({ title, accordionProps, children }: ToggleItemProps) {
  return (
    <Accordion square disableGutters className="toggle-item" {...accordionProps}>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <p className="text-lg">{title}</p>
      </AccordionSummary>
      <AccordionDetails>
        <div className="toggle-item__content">{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}

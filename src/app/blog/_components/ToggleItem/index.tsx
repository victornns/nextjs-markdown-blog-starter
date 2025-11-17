import Image from "next/image";

import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import type { AccordionProps } from "@mui/material/Accordion";

import "./ToggleItem.scss";

export type ToggleItemProps = React.PropsWithChildren<{
  title: string;
  accordionProps?: Partial<AccordionProps>;
}>;

const IconToggleItem = () => <Image src="/images/down-arrow.png" alt="Ícone de seta" width={20} height={20} className="w-full" />;

export function ToggleItem({ title, accordionProps, children }: ToggleItemProps) {
  return (
    <Accordion square={true} disableGutters className={`primary-toggle-item`} {...accordionProps}>
      <AccordionSummary expandIcon={<IconToggleItem />} aria-controls="panel1-content" id="panel1-header">
        <p className="primary-toggle-item__title">{title}</p>
      </AccordionSummary>

      <AccordionDetails>
        <div className="common-style-toggle-item-children-components primary">{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}

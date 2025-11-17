import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";

import "./CommonStyleToggleItem.scss";
import "./PrimaryToggleItem.scss";

export type PrimaryToggleItemProps = React.PropsWithChildren<{
  title: string;
  slim?: boolean;
  accordionProps?: Partial<Accordion.AccordionSingleProps>;
}>;

const IconToggleItem = () => <Image src="/images/icons/icon-toggle-item.svg" alt="Ícone de seta" width={20} height={20} className="lg:w-full max-w-[20px] lg:max-w-[25px] accordion-chevron" />;

export function PrimaryToggleItem({ title, slim, accordionProps, children }: PrimaryToggleItemProps) {
  return (
    <Accordion.Root type="single" collapsible className={`primary-toggle-item ${slim ? "slim" : ""}`} {...accordionProps}>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="accordion-trigger">
            <p className="primary-toggle-item__title">{title}</p>
            <IconToggleItem />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="accordion-content">
          <div className="common-style-toggle-item-children-components primary">{children}</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

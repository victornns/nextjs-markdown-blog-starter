interface UITitleProps {
  title: string;
}

export function UITitle({ title }: UITitleProps) {
  return <h1 className="text-4xl xl:text-6xl font-light leading-tight mb-6">{title}</h1>;
}

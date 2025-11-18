interface UISubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function UISubtitle({ children, className = "" }: UISubtitleProps) {
  return <p className={`uppercase font-medium tracking-widest text-primary mt-2 ${className}`}>{children}</p>;
}

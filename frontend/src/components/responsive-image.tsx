"use client";

import Image, { type ImageProps } from "next/image";
import { useBreakpoint } from "@/hooks/use-breakpoint";

type ResponsiveImageProps = Omit<ImageProps, "src"> & {
  name: string;
};

export default function ResponsiveImage({ name, alt, ...props }: ResponsiveImageProps) {
  const breakpoint = useBreakpoint();
  return <Image src={`/images/${breakpoint}/${name}`} alt={alt} {...props} />;
}

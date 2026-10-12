import Link from "next/link";

type Props = Omit<React.ComponentProps<"a">, "href"> & { href: string };

/** In-page anchors and mailto stay plain links (the scroll system handles "#…"); routes go through the router. */
export function SmartLink({ href, ...props }: Props) {
  return href.startsWith("#") || href.startsWith("mailto:") ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}

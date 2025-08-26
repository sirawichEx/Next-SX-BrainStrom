import { getMetadata } from "@/libs/utils";

export async function generateMetadata() {
  return getMetadata({
    title: 'Cart',
    description: 'Cart page',
    openGraph: {
      title: 'Cart',
      description: 'Cart page',
      images: ['/images/og-image.png'],
    },
  })
}
export default function CartPage() {
  return <div>Cart</div>;
}
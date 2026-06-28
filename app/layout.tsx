import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "a little bakery+｜小さなちいさなパン屋さん",
  description:
    "兵庫県尼崎市の商店街で、夫婦ふたりで営む小さなパン屋です。毎日の小さな+になれますように。",
  metadataBase: new URL("https://alittlebakery.com"),
  openGraph: {
    title: "a little bakery+｜小さなちいさなパン屋さん",
    description:
      "兵庫県尼崎市の商店街で、夫婦ふたりで営む小さなパン屋です。毎日の小さな+になれますように。",
    url: "https://alittlebakery.com",
    siteName: "a little bakery+",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "a little bakery+",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "a little bakery+｜小さなちいさなパン屋さん",
    description:
      "兵庫県尼崎市の商店街で、夫婦ふたりで営む小さなパン屋です。毎日の小さな+になれますように。",
    images: ["/ogp.jpg"],
  },
};
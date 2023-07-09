import "@/css/globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.svg";

const poppinsFont = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "World Countries - Jealous",
  description: "Built with NextJS 13 by Jealous",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppinsFont.className}>
        <header>
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo.svg"
              fill={false}
              priority
            />
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

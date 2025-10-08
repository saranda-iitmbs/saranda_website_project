import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./(frontend)/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTAButton from "@/components/ui/CTAButton";
import Image from "next/image";
import bg404_img from "@/public/images/bg404.png";

const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-roboto",
});

const redwood = localFont({
  src: "../public/fonts/Realwood Regular.otf",
  variable: "--font-redwood",
})

export default function LostPage() {
  return (
    <html lang="en" className={`${roboto.variable} ${redwood.variable}`}>
      <body>
        <Header/>
        <main className="
          h-dvh flex justify-center items-center flex-col relative
        ">
          <Image
            src={bg404_img}
            alt=""
            fill
            sizes="100vw"
            className="object-cover -z-1"
          />
          <p>Oops...</p>
          <h1 className="mb-[-0.4ch]">404</h1>
          <p>You might be lost.</p>
          <p>
            <CTAButton href="/" className="mr-[1ch]">
              Click this
            </CTAButton>
            to get back home.
          </p>
        </main>
        <Footer/>
      </body>
    </html>
  )
}
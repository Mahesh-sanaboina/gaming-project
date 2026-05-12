import { Orbitron, Poppins, Exo_2 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata = {
  title: "GamingX | Next-Gen AAA Platform",
  description: "Experience the future of gaming with our high-fidelity, cyberpunk-inspired esports portal.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${poppins.variable} ${exo2.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground font-poppins min-h-full selection:bg-accent-cyan selection:text-black">
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        {children}
      </body>
    </html>
  );
}

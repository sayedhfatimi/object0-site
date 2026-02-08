import Downloads from "@/components/Downloads";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";
import Security from "@/components/Security";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Providers />
        <Features />
        <Security />
        <Downloads />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

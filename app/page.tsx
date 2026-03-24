import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { TrustMetrics } from '@/components/trust-metrics';
import { Features } from '@/components/features';
import { DashboardPreview } from '@/components/dashboard-preview';
import { HowItWorks } from '@/components/how-it-works';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Neural network background */}
      <div className="neural-bg" />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trust Metrics */}
      <TrustMetrics />

      {/* Features */}
      <Features />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}

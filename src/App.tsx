import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EliteContactCard from "./pages/EliteContactCard";
import EliteReviewPlacards from "./pages/EliteReviewPlacards";
import VideosPage from "./pages/Videos";
import AISolutions from "./pages/AISolutions";
import FAQ from "./pages/FAQ";
import { EliteNetwork, VenmoCard, BitcoinWalletCard, Blog, About, OnBoarding, DigitalBusinessCard } from "./pages/ProductPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/elite-contact-card" element={<EliteContactCard />} />
          <Route path="/elite-review-placards" element={<EliteReviewPlacards />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/ai-solutions" element={<AISolutions />} />
          <Route path="/frequently-asked-questions" element={<FAQ />} />
          <Route path="/elite-network" element={<EliteNetwork />} />
          <Route path="/venmo-card" element={<VenmoCard />} />
          <Route path="/bitcoin-elite-wallet-card" element={<BitcoinWalletCard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/nicholasmunn" element={<About />} />
          <Route path="/on-boarding" element={<OnBoarding />} />
          <Route path="/digital-business-card" element={<DigitalBusinessCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

// AUTO-GENERATED — do not edit by hand.
// Source of truth: src/App.tsx  |  Generator: scripts/generate-entry-server.mjs
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import EliteContactCard from "./pages/EliteContactCard";
import EliteReviewPlacards from "./pages/EliteReviewPlacards";
import VideosPage from "./pages/Videos";
import AISolutions from "./pages/AISolutions";
import FAQ from "./pages/FAQ";
import WebDesignServices from "./pages/WebDesignServices";
import CustomSoftwareServices from "./pages/CustomSoftwareServices";
import { EliteNetwork, VenmoCard, BitcoinWalletCard, Blog, About, OnBoarding, DigitalBusinessCard } from "./pages/ProductPages";

export function render(url: string) {
  const queryClient = new QueryClient();

  return ReactDOMServer.renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StaticRouter location={url}>
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
          <Route path="/web-design" element={<WebDesignServices />} />
          <Route path="/custom-software" element={<CustomSoftwareServices />} />
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

import { Link } from 'react-router-dom';

const footerLinks = {
  Products: [
    { label: 'Elite Contact Card', href: '/elite-contact-card' },
    { label: 'Review Placards', href: '/elite-review-placards' },
    { label: 'Venmo Card', href: '/venmo-card' },
    { label: 'Bitcoin Wallet Card', href: '/bitcoin-elite-wallet-card' },
    { label: 'Digital Business Card', href: '/digital-business-card' },
  ],
  Company: [
    { label: 'About Nic', href: '/nicholasmunn' },
    { label: 'Blog', href: '/blog' },
    { label: 'Elite Network', href: '/elite-network' },
    { label: 'FAQ', href: '/frequently-asked-questions' },
    { label: 'Onboarding', href: '/on-boarding' },
  ],
  Solutions: [
    { label: 'AI Solutions', href: '/ai-solutions' },
    { label: 'Videos', href: '/videos' },
  ],
};

export const Footer = () => (
  <footer className="border-t border-border py-20">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl gradient-gold-bg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">EC</span>
            </div>
            <span className="text-lg font-bold tracking-tight">Elite Card Pro</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Changing the way experts connect. Professional NFC contact cards that generate referrals.
          </p>
          <p className="text-xs text-muted-foreground">Munnyman Communications</p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">{title}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-divider mb-8" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Munnyman Communications. All rights reserved.</p>
        <a
          href="https://calendly.com/elitecardpro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground font-medium hover:underline"
        >
          Schedule a Meeting →
        </a>
      </div>
    </div>
  </footer>
);

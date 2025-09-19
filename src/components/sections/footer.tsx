import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8">
      <div className="container flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="https://hyperliquid.statuspage.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-accent px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-muted"
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: 'rgb(9, 98, 153)' }}
            />
            <span className="font-medium">Online</span>
          </a>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <a
              href="https://hyperliquid.gitbook.io/hyperliquid-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              Docs
            </a>
            <a
              href="https://hyperliquid.gitbook.io/hyperliquid-docs/support"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              Support
            </a>
            <a href="/terms" className="transition-colors hover:text-text-primary">
              Terms
            </a>
            <a href="/privacyPolicy" className="transition-colors hover:text-text-primary">
              Privacy Policy
            </a>
          </nav>
        </div>

        <div className="max-w-xs text-left">
          <h2 className="text-lg font-semibold text-text-primary">
            Status embed installed correctly
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            This will be shown if an incident or maintenance is posted on your
            status page.
          </p>
          <a
            href="https://hyperliquid.statuspage.io/?utm_source=embed"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-base font-medium text-secondary transition-opacity hover:opacity-80"
          >
            View latest updates
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
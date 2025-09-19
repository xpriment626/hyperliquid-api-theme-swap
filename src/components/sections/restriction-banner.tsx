import React from 'react';

const RestrictionBanner = () => {
  return (
    <div className="w-full bg-destructive text-destructive-foreground">
      <div className="container mx-auto px-4 py-2.5">
        <p className="text-center text-sm">
          You are accessing our products and services from a restricted jurisdiction. We do not allow access from certain jurisdictions including locations subject to sanctions restrictions and other jurisdictions where our services are ineligible for use. For more information, see our{' '}
          <a href="/terms" className="underline hover:opacity-80">
            Terms of Use
          </a>
          . If you think this is an error, try refreshing the page or opening a support ticket.
        </p>
      </div>
    </div>
  );
};

export default RestrictionBanner;
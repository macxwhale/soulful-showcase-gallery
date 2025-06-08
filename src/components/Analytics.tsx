
import { useEffect } from 'react';

interface AnalyticsProps {
  gaId?: string;
  gscVerification?: string;
}

const Analytics = ({ 
  gaId = "G-XXXXXXXXXX", // Replace with your actual GA4 Measurement ID
  gscVerification = "your-google-search-console-verification-code" // Replace with your GSC verification code
}: AnalyticsProps) => {
  
  useEffect(() => {
    // Google Analytics 4 (GA4) Setup
    if (gaId && gaId !== "G-XXXXXXXXXX") {
      // Load Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      // Initialize Google Analytics
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', {
          page_title: document.title,
          page_location: window.location.href
        });
      `;
      document.head.appendChild(script2);

      console.log('✅ Google Analytics initialized with ID:', gaId);
    }

    // Add Google Search Console verification meta tag
    if (gscVerification && gscVerification !== "your-google-search-console-verification-code") {
      const existingMeta = document.querySelector('meta[name="google-site-verification"]');
      if (!existingMeta) {
        const meta = document.createElement('meta');
        meta.name = 'google-site-verification';
        meta.content = gscVerification;
        document.head.appendChild(meta);
        console.log('✅ Google Search Console verification tag added');
      }
    }
  }, [gaId, gscVerification]);

  // Function to track custom events
  useEffect(() => {
    // Add gtag to window for custom event tracking
    if (typeof window !== 'undefined' && gaId && gaId !== "G-XXXXXXXXXX") {
      (window as any).gtag = (window as any).gtag || function() {
        ((window as any).dataLayer = (window as any).dataLayer || []).push(arguments);
      };
    }
  }, [gaId]);

  return null;
};

export default Analytics;

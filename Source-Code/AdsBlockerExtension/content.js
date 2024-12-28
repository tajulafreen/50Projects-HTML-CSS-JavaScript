/* eslint-disable no-undef */
const adSelectors = [
  'iframe[src*="ads"]',
  'div[class*="ad"]',
  'div[id*="ad"]',
  'ins.adsbygoogle',
  '[data-ad]',
  '.ad-banner',
];

// Normalize domain
const normalizeDomain = (domain) => domain.replace(/^www\./, '');

chrome.storage.local.get(
  { adBlockerEnabled: true, whitelist: [] },
  ({ adBlockerEnabled, whitelist }) => {
    if (!adBlockerEnabled) return;

    const currentSite = normalizeDomain(window.location.hostname);
    const normalizedWhitelist = whitelist.map(normalizeDomain);

    if (normalizedWhitelist.includes(currentSite)) {
      console.log(`Whitelist active: Ads are allowed on ${currentSite}`);
      return; // Skip ad blocking
    }

    // Ad blocking logic
    const blockAds = () => {
      adSelectors.forEach((selector) => {
        const ads = document.querySelectorAll(selector);
        console.log(`Found ${ads.length} ads for selector: ${selector}`);
        ads.forEach((ad) => ad.remove());
      });
    };

    blockAds(); // Initial blocking

    // Observe dynamically loaded ads
    const observer = new MutationObserver(blockAds);
    observer.observe(document.body, { childList: true, subtree: true });
  },
);

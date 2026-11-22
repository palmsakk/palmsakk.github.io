/* ==========================================================================
   PALMSAKK — SITE CONFIGURATION
   --------------------------------------------------------------------------
   This is the only file you need to edit to update the site.

   • Leave a url / email as "" (empty) until it is real.
   • Web links must start with https://
   • Rows appear in the order listed. The counter (01 — 03) updates itself.
   ========================================================================== */

window.PALMSAKK_CONFIG = {
  brand: {
    name: "PalmSakk",       // used in the page title and footer
    line1: "PALM",          // first line of the big title (navy)
    line2: "SAKK.",         // second line of the big title (blue)
    kana: "パームサック"      // small vertical Japanese annotation (set "" to hide)
  },

  /* Photo beside the tagline. Set src: "" to remove it.
     Best as a portrait (3:4) image, around 360 × 480 px. */
  photo: {
    src: "palm.jpg",
    alt: "Palm sitting on a railing outside a convenience store in Japan",
    caption: "Fig. 01 — Palm"
  },

  tagline: "Mostly anime, sometimes life.",
  topics: ["Anime", "Thoughts", "Everyday life"],

  sectionTitle: "Find me elsewhere",

  /* What to do with links that are still empty:
     "auto" → hidden on the live site, shown as "NOT LINKED YET"
              when you preview on your own computer   (recommended)
     true   → always hidden
     false  → always shown as "NOT LINKED YET"                      */
  hideUnlinked: "auto",

  links: [
    {
      label: "Instagram",
      description: "Personal updates, daily life, and content.",
      type: "web",
      url: "https://www.instagram.com/ipalmsakk/"
    },
    {
      label: "TikTok",
      description: "Anime reactions, reviews, and commentary.",
      type: "web",
      url: "https://www.tiktok.com/@palmsakk"
    },
    {
      label: "Contact",
      description: "For business inquiries & collaborations.",
      type: "email",
      email: "palmsakk.contact@gmail.com",
      subject: "Collaboration inquiry — PalmSakk"
    }

    /* Add more later — just copy this shape:
    ,{
      label: "YouTube",
      description: "Longer reviews and commentary.",
      type: "web",
      url: "https://www.youtube.com/@your_handle"
    }
    */
  ],

  footer: {
    left: "Thanks for visiting.",
    jp: "つづく",
    en: "To be continued"
  }
};

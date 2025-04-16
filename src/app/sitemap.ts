import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dashcruisedev.com",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://dashcruisedev.com/en",
          de: "https://dashcruisedev.com/de",
          ro: "https://dashcruisedev.com/ro",
          pl: "https://dashcruisedev.com/pl",
        },
      },
      priority: 1
    },
    {
        url: "https://dashcruisedev.com/contact",
        lastModified: new Date(),
        alternates: {
          languages: {
            en: "https://dashcruisedev.com/en/contact",
            de: "https://dashcruisedev.com/de/contact",
            ro: "https://dashcruisedev.com/ro/contact",
            pl: "https://dashcruisedev.com/pl/contact",
          },
        },
        priority: 0.9
      },
    {
      url: "https://dashcruisedev.com/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://dashcruisedev.com/en/about",
          de: "https://dashcruisedev.com/de/about",
          ro: "https://dashcruisedev.com/ro/about",
          pl: "https://dashcruisedev.com/pl/about",
        },
      },
      priority: 0.8
    },
    {
      url: "https://dashcruisedev.com/blog",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://dashcruisedev.com/en/blog",
          de: "https://dashcruisedev.com/de/blog",
          ro: "https://dashcruisedev.com/ro/blog",
          pl: "https://dashcruisedev.com/pl/blog",
        },
      },
      priority: 0.7
    },
    {
        url: "https://dashcruisedev.com/terms",
        lastModified: new Date(),
        alternates: {
          languages: {
            en: "https://dashcruisedev.com/en/terms",
            de: "https://dashcruisedev.com/de/terms",
            ro: "https://dashcruisedev.com/ro/terms",
            pl: "https://dashcruisedev.com/pl/terms",
          },
        },
        priority: 0.5
      },
  ];
}

import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`@/data/dictionaries/${locale}/home.json`)).default,
      ...(await import(`@/data/dictionaries/${locale}/footer.json`)).default,
      ...(await import(`@/data/dictionaries/${locale}/common.json`)).default,
      ...(await import(`@/data/dictionaries/${locale}/blog.json`)).default,
      ...(await import(`@/data/dictionaries/${locale}/about.json`)).default,
    },
  };
});

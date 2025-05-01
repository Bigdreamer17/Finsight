import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParams = {
  company: parseAsString.withDefault(""),

  metric: parseAsString.withDefault(""),
  companyFilter: parseAsString.withDefault(""),

  sortMetric: parseAsString.withDefault(""),
  sortParam: parseAsString.withDefault(""),

  chart: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache({
  ...searchParams,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;

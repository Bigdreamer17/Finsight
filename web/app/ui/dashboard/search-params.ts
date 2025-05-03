import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

const sortMetric = ["Asc", "Desc"];

export const searchParams = {
  company: parseAsString.withDefault(""),

  metric: parseAsString.withDefault(""),
  companyFilter: parseAsString.withDefault(""),

  sortMetric: parseAsStringLiteral(sortMetric).withDefault("Desc"),
  sortParam: parseAsString.withDefault(""),
  table: parseAsString.withDefault(""),

  chart: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache({
  ...searchParams,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;

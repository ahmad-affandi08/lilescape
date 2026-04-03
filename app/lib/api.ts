const defaultApiBaseUrl = "http://127.0.0.1:8000/api";

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");

const ensureLeadingSlash = (value: string): string =>
  value.startsWith("/") ? value : `/${value}`;

export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!configured) {
    return defaultApiBaseUrl;
  }

  return trimTrailingSlash(configured);
}

export function buildApiUrl(path: string): string {
  const normalizedPath = ensureLeadingSlash(path.trim());
  return `${getApiBaseUrl()}${normalizedPath}`;
}

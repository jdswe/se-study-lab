/**
 * Countries for the footer clock and flag. Each has one representative IANA
 * zone, which gives the legal local time for that country.
 */
export interface Country {
  code: string;
  name: { en: string; es: string };
  zone: string;
}

export const COUNTRIES: Country[] = [
  { code: 'CO', name: { en: 'Colombia', es: 'Colombia' }, zone: 'America/Bogota' },
  { code: 'MX', name: { en: 'Mexico', es: 'México' }, zone: 'America/Mexico_City' },
  { code: 'PE', name: { en: 'Peru', es: 'Perú' }, zone: 'America/Lima' },
  { code: 'EC', name: { en: 'Ecuador', es: 'Ecuador' }, zone: 'America/Guayaquil' },
  { code: 'VE', name: { en: 'Venezuela', es: 'Venezuela' }, zone: 'America/Caracas' },
  { code: 'AR', name: { en: 'Argentina', es: 'Argentina' }, zone: 'America/Argentina/Buenos_Aires' },
  { code: 'CL', name: { en: 'Chile', es: 'Chile' }, zone: 'America/Santiago' },
  { code: 'BR', name: { en: 'Brazil', es: 'Brasil' }, zone: 'America/Sao_Paulo' },
  { code: 'US', name: { en: 'United States (Eastern)', es: 'Estados Unidos (Este)' }, zone: 'America/New_York' },
  { code: 'CA', name: { en: 'Canada (Eastern)', es: 'Canadá (Este)' }, zone: 'America/Toronto' },
  { code: 'ES', name: { en: 'Spain', es: 'España' }, zone: 'Europe/Madrid' },
  { code: 'GB', name: { en: 'United Kingdom', es: 'Reino Unido' }, zone: 'Europe/London' },
  { code: 'FR', name: { en: 'France', es: 'Francia' }, zone: 'Europe/Paris' },
  { code: 'DE', name: { en: 'Germany', es: 'Alemania' }, zone: 'Europe/Berlin' },
  { code: 'JP', name: { en: 'Japan', es: 'Japón' }, zone: 'Asia/Tokyo' },
  { code: 'CN', name: { en: 'China', es: 'China' }, zone: 'Asia/Shanghai' },
  { code: 'AU', name: { en: 'Australia (Eastern)', es: 'Australia (Este)' }, zone: 'Australia/Sydney' },
];

/** Reverse lookup from an IANA zone to a country code, used for automatic detection. */
export function countryForZone(zone: string): Country | undefined {
  return COUNTRIES.find((c) => c.zone === zone);
}

/** Turns an ISO country code into its flag emoji (regional indicator symbols). */
export function flagFor(code: string): string {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('');
}

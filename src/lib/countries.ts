/**
 * Countries for the footer clock and flag. Each has one representative IANA
 * zone, which gives the legal local time for that country.
 */
export interface Country {
  code: string;
  name: { en: string; es: string; pt: string };
  zone: string;
}

/** The countries offered for the footer clock, each with its legal-time zone. */
export const COUNTRIES: Country[] = [
  { code: 'AR', name: { en: 'Argentina', es: 'Argentina', pt: 'Argentina' }, zone: 'America/Argentina/Buenos_Aires' },
  { code: 'BO', name: { en: 'Bolivia', es: 'Bolivia', pt: 'Bolívia' }, zone: 'America/La_Paz' },
  { code: 'BR', name: { en: 'Brazil', es: 'Brasil', pt: 'Brasil' }, zone: 'America/Sao_Paulo' },
  { code: 'CL', name: { en: 'Chile', es: 'Chile', pt: 'Chile' }, zone: 'America/Santiago' },
  { code: 'CO', name: { en: 'Colombia', es: 'Colombia', pt: 'Colômbia' }, zone: 'America/Bogota' },
  { code: 'MX', name: { en: 'Mexico', es: 'México', pt: 'México' }, zone: 'America/Mexico_City' },
  { code: 'PE', name: { en: 'Peru', es: 'Perú', pt: 'Peru' }, zone: 'America/Lima' },
];

/** Other IANA zones inside each country, so automatic detection works outside the capital too. */
const EXTRA_ZONES: Record<string, string[]> = {
  BR: ['America/Manaus', 'America/Recife', 'America/Fortaleza', 'America/Belem', 'America/Bahia', 'America/Cuiaba', 'America/Campo_Grande', 'America/Porto_Velho', 'America/Boa_Vista', 'America/Rio_Branco', 'America/Araguaina', 'America/Maceio', 'America/Santarem', 'America/Noronha', 'America/Eirunepe'],
  MX: ['America/Monterrey', 'America/Merida', 'America/Cancun', 'America/Chihuahua', 'America/Hermosillo', 'America/Mazatlan', 'America/Tijuana', 'America/Matamoros', 'America/Ojinaga', 'America/Bahia_Banderas', 'America/Ciudad_Juarez'],
  CL: ['America/Punta_Arenas', 'Pacific/Easter'],
};

/** Reverse lookup from an IANA zone to a country, used for automatic detection. */
export function countryForZone(zone: string): Country | undefined {
  if (zone.startsWith('America/Argentina/')) return COUNTRIES.find((c) => c.code === 'AR');
  return COUNTRIES.find((c) => c.zone === zone || EXTRA_ZONES[c.code]?.includes(zone));
}

/** Turns an ISO country code into its flag emoji (regional indicator symbols). */
export function flagFor(code: string): string {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(127397 + c.charCodeAt(0))).join('');
}

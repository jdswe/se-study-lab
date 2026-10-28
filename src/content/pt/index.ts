import common from './common.json';
import sd1Week1 from './sd1-week1.json';
import db1Week1 from './db1-week1.json';

/**
 * English source string → Brazilian Portuguese translation, for all content.
 * Regenerate the list of missing strings with `node scripts/i18n-missing.mjs`.
 */
export const PT: Record<string, string> = { ...common, ...sd1Week1, ...db1Week1 };

// Cache für bereits erstellte Intl.NumberFormat-Instanzen, 
// um unnötige Neuberechnungen zu vermeiden und Performance zu verbessern.
const formatterCache = new Map<string, Intl.NumberFormat>();

/**
 * Formatiert einen Zahlenwert als Preis.
 * - Nutzt locale und currency (Standard: de-DE, EUR).
 * - Liefert "—", wenn value null/undefined/NaN ist.
 * - Benutzt einen Cache, um NumberFormat-Instanzen wiederzuverwenden.
 */
export function formatPrice(value?: number, currency = "EUR", locale = "de-DE") {
  if (value == null || Number.isNaN(value)) return "—";
  const key = `${locale}-${currency}`;
  let fmt = formatterCache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: 2 });
    formatterCache.set(key, fmt);
  }
  return fmt.format(value);
}

/**
 * Formatiert eine Zahl als Prozentwert.
 * - Liefert "—", wenn value null/undefined/NaN ist.
 * - Hängt ein "%" an den Wert.
 */
export function formatPercent(value?: number) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value}%`;
}

/**
 * Formatiert einen UNIX-Timestamp (in Sekunden) als Datum.
 * - Nutzt locale (Standard: de-DE).
 * - Liefert "—", wenn Eingabe ungültig ist (null, <=0, NaN).
 * - Gibt das Datum im Format JJ-MM-TT zurück (lokalisiert).
 */
export function formatDate(s?: string, locale = "de-DE") {
  if (!s) return "—";
  const sec = Number(s);
  if (!Number.isFinite(sec) || sec <= 0) return "—";
  return new Date(sec * 1000).toLocaleDateString(locale, { year: "numeric", month: "2-digit", day: "2-digit" });
}

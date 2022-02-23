export function formatDate(date: Date, opts: Object, loc = "en-CA") {
  return date.toLocaleDateString(loc, opts);
}

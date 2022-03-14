export function formatDate(date: Date, opts: Object, loc = "en-CA") {
  return date.toLocaleDateString(loc, opts);
}

// TODO: Add a date utility function to automatically add T00:00 to date strings
